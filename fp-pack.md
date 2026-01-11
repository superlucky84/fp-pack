# fp-pack AI Agent Skills

Document Version: {{version}}

## ⚠️ Activation Condition (Read First)

These guidelines apply **only when `fp-pack` is installed** in the current project.

Before following this document:
- Check `package.json` for `fp-pack` in dependencies/devDependencies
- Check `node_modules/fp-pack` exists
- Check existing code imports from `fp-pack` or `fp-pack/stream`

If `fp-pack` is **not** installed, use the project's existing conventions. Do **not** suggest adding fp-pack unless the user asks.

---

## Core Rules (Keep In Memory)

- Use `pipe`/`pipeAsync` for 2+ steps; for a single step, call the function directly.
- Use `pipeStrict`/`pipeAsyncStrict` when you want stricter mismatch detection; otherwise stick to `pipe`/`pipeAsync`.
- Prefer value-first: `pipe(value, ...)` / `pipeAsync(value, ...)` runs immediately and improves inference (the input anchors types). Use functions-first only when you need a reusable pipeline.
- If the first arg is a function, it's treated as composition; wrap function values with `from()`.
- Keep pipeline functions **unary**; prefer data-last, curried helpers.
- `map`/`filter` are for arrays/iterables, not single values.
- Use `from()` only for constants or 0-arg pipelines (including function values you need to pass as data). Otherwise pass data as the first argument.
- Use `pipeSideEffect*` only when you need early exit; otherwise use `pipe`/`pipeAsync`.
- Never call `runPipeResult`/`matchSideEffect` inside pipelines; call at boundaries.
- Prefer `isSideEffect` for precise narrowing; `runPipeResult` for unwrapping (use generics if widened).
- `SideEffect` is an instance type: use `SideEffect<E>` (not `typeof SideEffect`).
- If TS inference stalls in data-last generics, use `pipeHint` or a tiny wrapper.
- Use `fp-pack/stream` for large/lazy iterables; array/object utils for small/eager data.
- Keep DOM/imperative work at the edge; use fp-pack for data transforms.
- Avoid mutation; return new objects/arrays.
- When unsure, check `dist/index.d.ts` or `dist/stream/index.d.ts`.

Note: For trivial one-liners, using native JS directly is fine.
Reach for fp-pack when composition adds clarity or reuse.
Keep pipelines short and readable.

---

## Common Mistakes & Fixes (Top Issues)

### Don't wrap data in zero-arg functions

```ts
// ❌ BAD
pipe(() => [1, 2, 3], filter((n: number) => n % 2 === 0));

// ✅ GOOD (value-first)
pipe([1, 2, 3], filter((n: number) => n % 2 === 0));

// ✅ GOOD (no-input pipeline)
pipe(from([1, 2, 3]), filter((n: number) => n % 2 === 0))();
```

### `ifElse`/`cond` need total branches

```ts
const status = ifElse((n: number) => n > 0, from('ok'), from('fail'));

const label = cond<number, string>([
  [(n) => n > 0, () => 'positive'],
  [() => true, () => 'non-positive'] // default keeps it total
]);
```

### `map` is for arrays/iterables (not single values)

```ts
const save = pipe(
  (s: AppState) => JSON.stringify({ todos: s.todos, nextId: s.nextId }),
  tap((json) => localStorage.setItem(STORAGE_KEY, json))
);
save(state);
```

### SideEffect pipelines + `runPipeResult` belong at the boundary

```ts
const pipeline = pipeSideEffect(findUser, (user) => user.email);
const result = runPipeResult(pipeline(input)); // outside the pipeline
```

DOM APIs are imperative by nature—keep them outside or at the boundary (use `tap` for final effects).

---

## Troubleshooting Type Errors (Fast Checks)

- Is every step unary? (Pipelines expect one input each.)
- Are you using array/iterable helpers (`map`, `filter`, `reduce`) on non-arrays?
- Did you forget a default case in `cond` (`[() => true, () => ...]`)?
- Are you returning `SideEffect` from a `pipe` pipeline? (Use `pipeSideEffect*`.)
- Are you calling `runPipeResult` inside a pipeline? (Move it to the boundary.)
- Are you mixing async steps in `pipe` instead of `pipeAsync`?
- Did a data-last generic fail to infer? (Use `pipeHint` or a tiny wrapper.)
- Are you using `from()` for constants only, not normal input?
- Is a DOM/imperative step inside the pipeline? (Move it to the edge or use `tap`.)
- Check `dist/index.d.ts` / `dist/stream/index.d.ts` for the expected signature.

If the error persists, reduce the pipeline to the smallest failing step and add types there first.

---

## Quick Examples (3)

### Example 1: User Data Processing Pipeline

```ts
import { pipe, filter, map, take, sortBy } from 'fp-pack';

const result = pipe(
  users,
  filter((user: User) => user.active),
  sortBy((user) => -user.activityScore),
  map((user) => user.name),
  take(10)
);
```

### Example 2: API Request with Early Exit

```ts
import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const result = runPipeResult(
  await pipeAsyncSideEffect(
    'user-123',
    async (userId: string) => {
      const res = await fetch(`/api/users/${userId}`);
      return res.ok ? res : SideEffect.of(() => `HTTP ${res.status}`);
    },
    async (res) => res.json()
  )
);
```

### Example 3: Value-first pipeline

```ts
import { pipe, filter, map } from 'fp-pack';

const result = pipe(
  [1, 2, 3, 4, 5],
  filter((n: number) => n % 2 === 0),
  map((n) => n * 2)
);
```

---

## Core Composition

### `pipe` (sync)

```ts
import { pipe, filter, map, take } from 'fp-pack';

const result = pipe(
  users,
  filter((u: User) => u.active),
  map((u) => u.name),
  take(10)
);
```

### `pipeAsync` (async)

```ts
import { pipeAsync } from 'fp-pack';

const user = await pipeAsync(
  userId,
  async (id: string) => fetch(`/api/users/${id}`),
  async (res) => res.json(),
  (data) => data.user
);
```

---

## Currying & Data-Last

Most multi-arg helpers are **data-last** and **curried**. Pair them with value-first `pipe(value, ...)` to anchor types:
- Good: `map(fn)`, `filter(pred)`, `replace(from, to)`, `assoc('k', v)`, `path(['a','b'])`
- Single-arg helpers are already unary—just use them directly

---

## TypeScript: Data-last Generic Inference

Some data-last helpers return a **generic function** whose type is only determined by the final data argument. Prefer value-first `pipe(value, ...)` so the input anchors generics; use hints when needed.

### Quick fix (pipeHint or wrapper)

```ts
import { pipe, pipeHint, zip, some } from 'fp-pack';

// Prefer value-first to anchor generics
const values: number[] = [1, 2, 3];
const withValueFirst = pipe(
  values,
  zip([1, 2, 3]),
  some(([a, b]) => a > b)
);

const withPipeHint = pipe(
  pipeHint<number[], Array<[number, number]>>(zip([1, 2, 3])),
  some(([a, b]) => a > b)
);
```

If you prefer, a tiny wrapper like `(values) => zip([1, 2, 3], values)` works too.

**Utilities that may need a hint in data-last pipelines:**
- Array: `chunk`, `drop`, `take`, `zip`
- Object: `assoc`, `assocPath`, `dissocPath`, `evolve`, `mapValues`, `merge`, `mergeDeep`, `omit`, `path`, `pick`, `prop`
- Async: `timeout`
- Stream: `chunk`, `drop`, `take`, `zip`

---

## SideEffect Pattern (Use Only When Needed)

Most code should use `pipe` / `pipeAsync`. Use SideEffect-aware pipes only when you need **early termination**:
- validation pipelines that should stop early
- recoverable errors you want to model as data
- branching flows where you want to short-circuit

### SideEffect-aware pipes
- `pipeSideEffect` / `pipeAsyncSideEffect`: convenient, but may widen effects to `any`
- `pipeSideEffectStrict` / `pipeAsyncSideEffectStrict`: preserves strict union effects (recommended)

### Key functions
- `SideEffect.of(effectFn, label?)`
- `isSideEffect(value)` (type guard)
- `runPipeResult(result)` (execute effect or return value; **outside** pipelines)

### Example

```ts
import { pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const validate = (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEG' as const));
const result = pipeSideEffectStrict(
  -1,
  validate,
  (n) => n + 1
); // number | SideEffect<'NEG'>

if (isSideEffect(result)) {
  const err = runPipeResult(result); // 'NEG'
} else {
  // result is number
}
```

### Type Safety Notes

- `pipeSideEffect`/`pipeAsyncSideEffect` can widen effects to `any` in complex pipelines.
- `pipeSideEffectStrict`/`pipeAsyncSideEffectStrict` preserve strict effect unions.
- `runPipeResult` returns `R` when input is `SideEffect<R>`, but becomes `any` if the input is widened to `SideEffect<any>`/`any`.
- Prefer `isSideEffect` for precise branch narrowing.

---

## Stream Functions (`fp-pack/stream`)

Use stream utilities when:
- data is large or unbounded
- you want lazy evaluation
- you want to support `Iterable` and `AsyncIterable`

If any input is async, the output is async. Use `toAsync` to normalize inputs when needed.

```ts
import { pipe } from 'fp-pack';
import { range, filter, map, take, toArray } from 'fp-pack/stream';

const result = pipe(
  range(Infinity),
  filter((n: number) => n % 2 === 0),
  map((n) => n * n),
  take(100),
  toArray
);
```

---

## Available Functions (Quick Index)

### Composition
- `pipe`, `pipeStrict`, `pipeAsync`, `pipeAsyncStrict`
- SideEffect-aware: `pipeSideEffect`, `pipeSideEffectStrict`, `pipeAsyncSideEffect`, `pipeAsyncSideEffectStrict`
- Utilities: `from`, `tap`, `tap0`, `once`, `memoize`, `identity`, `constant`, `curry`, `compose`
- SideEffect helpers: `SideEffect`, `isSideEffect`, `matchSideEffect`, `runPipeResult`

### Array
- Transforms: `map`, `filter`, `flatMap`, `reduce`, `scan`
- Queries: `find`, `some`, `every`
- Slicing: `take`, `drop`, `chunk`
- Ordering: `sort`, `sortBy`, `groupBy`, `uniqBy`
- Combining: `zip`, `concat`, `append`, `flatten`

### Object
- Access: `prop`, `path`, `propOr`, `pathOr`
- Pick/drop: `pick`, `omit`
- Updates: `assoc`, `assocPath`, `dissocPath`
- Merge: `merge`, `mergeDeep`
- Transforms: `mapValues`, `evolve`

### Control Flow
- `ifElse`, `when`, `unless`, `cond`, `guard`, `tryCatch`

### Async
- `retry`, `timeout`, `delay`
- `debounce*`, `throttle`

### Stream (Lazy Iterables)
- Building: `range`
- Transforms: `map`, `filter`, `flatMap`, `flatten`
- Slicing: `take`, `drop`, `chunk`
- Queries: `find`, `some`, `every`, `reduce`
- Combining: `zip`, `concat`
- Utilities: `toArray`, `toAsync`

### Others
- Math: `add`, `sub`, `mul`, `div`, `clamp`
- String: `split`, `join`, `replace`, `trim`
- Equality: `equals`, `isNil`
- Debug: `assert`, `invariant`

---

## Micro-Patterns (Optional)

### Boundary handling

```ts
const pipeline = pipeSideEffectStrict(validate, process);

export const handler = (data) => {
  const result = pipeline(data);
  if (isSideEffect(result)) return runPipeResult(result);
  return result;
};
```

### Value-first execution

```ts
const result = pipe(
  [1, 2, 3, 4, 5],
  filter((n: number) => n % 2 === 0),
  map((n) => n * 10)
); // [20, 40]
```

### from() for constants / 0-arg pipelines

```ts
const result = pipe(
  from([1, 2, 3, 4, 5]),
  filter((n: number) => n % 2 === 0),
  map((n) => n * 10)
)(); // [20, 40]
```

### Stream to array

```ts
const toIds = pipe(
  filter((u: User) => u.active),
  map((u) => u.id),
  toArray
);
```

### Object updates

```ts
const updateAccount = pipe(
  assocPath(['profile', 'role'], 'member'),
  merge({ updatedAt: Date.now() })
);
```

---

## Decision Guide

- Is everything sync and pure? → `pipe`
- Any step async? → `pipeAsync`
- Need early-exit + typed effect unions? → `pipeSideEffectStrict` / `pipeAsyncSideEffectStrict`
- Need early-exit but type precision doesn't matter? → `pipeSideEffect` / `pipeAsyncSideEffect`
- Only one step? → call the function directly (no `pipe`)
- Handling result at boundary? → `isSideEffect` for branching, `runPipeResult` to unwrap
- Large/unbounded/iterable data? → `fp-pack/stream`

---

## Import Paths

- Main: `import { pipe, map, filter } from 'fp-pack'`
- SideEffect: `import { pipeSideEffect, SideEffect } from 'fp-pack'`
- Async: `import { pipeAsync, retry, timeout } from 'fp-pack'`
- Stream: `import { map, filter, toArray } from 'fp-pack/stream'`

---

## Quick Signature Lookup (When Unsure)

If TypeScript inference is stuck or you need to verify a function signature:

**In fp-pack project:**
- Main types: `dist/index.d.ts`
- Stream types: `dist/stream/index.d.ts`

**In consumer project:**
- Main types: `node_modules/fp-pack/dist/index.d.ts`
- Stream types: `node_modules/fp-pack/dist/stream/index.d.ts`

---

## Summary

Default to value-first `pipe` / `pipeAsync` for inference, keep helpers data-last and unary, switch to `stream/*` when laziness matters, and reserve SideEffect-aware pipelines for true early-exit flows. Use functions-first only for reusable pipelines. Use `isSideEffect` for precise narrowing and call `runPipeResult` only at the boundary.
