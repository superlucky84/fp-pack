# fp-pack AI Agent Skills

Document Version: {{version}}

## ⚠️ Activation Condition (Read First)

These guidelines apply **only when `fp-pack` is installed** in the current project.

Before following this document:
- Check `package.json` for `fp-pack` in dependencies/devDependencies
- Check `node_modules/fp-pack` exists
- Check existing code imports from `fp-pack` or `fp-pack/stream`

If `fp-pack` is **not** installed, use the project’s existing conventions. Do **not** suggest adding fp-pack unless the user asks.

---

## Agent Checklist (TL;DR)

When writing or editing code in an fp-pack project:
- Prefer `pipe` / `pipeAsync` for composition; keep helpers **unary** in the pipeline.
- Prefer **data-last** utilities (curried) so they compose: `map(fn)`, `prop('k')`, `assoc('k', v)`, etc.
- Use `stream/*` for lazy/large/iterable processing; use array/object utils for small/eager data.
- Use SideEffect-aware pipes only when you need **early exit**: `pipeSideEffect*` / `pipeAsyncSideEffect*`.
- **Never call `runPipeResult` inside a pipeline**; call it at the boundary (event handler, service wrapper, etc.).
- If TypeScript inference gets stuck with a data-last generic, use a small wrapper, an explicit type hint, or `pipeHint`.

## Philosophy (What fp-pack Optimizes For)

fp-pack is a TypeScript FP utility library focused on:
1) Function composition via `pipe` / `pipeAsync`
2) Declarative, immutable transforms (avoid loops and mutations)
3) Practical TypeScript inference (data-last + currying for most helpers)
4) Optional early-exit handling via `SideEffect` (only when needed)
5) Lazy iterable processing via `fp-pack/stream` for performance-sensitive flows

---

## Core Composition

### `pipe` (sync)

Use `pipe` to build a unary function:

```ts
import { pipe, filter, map, take } from 'fp-pack';

const processUsers = pipe(
  filter((u: User) => u.active),
  map((u) => u.name),
  take(10)
);
```

### `pipeAsync` (async)

Use `pipeAsync` when any step is async:

```ts
import { pipeAsync } from 'fp-pack';

const fetchUser = pipeAsync(
  async (id: string) => fetch(`/api/users/${id}`),
  async (res) => res.json(),
  (data) => data.user
);
```

---

## Currying & Data-Last Conventions

Most multi-arg helpers are **data-last** and **curried**, so they work naturally in `pipe`:

- Good: `map(fn)`, `filter(pred)`, `replace(from, to)`, `assoc('k', v)`, `path(['a','b'])`
- Avoid in pipelines: helpers that require you to pass the data first, or that return a function whose type depends on the final data arg (see next section)

Single-arg helpers are already unary; “currying them” adds no value—just use them directly.

---

## TypeScript: Data-last Generic Inference Caveats (Important)

Some data-last helpers return a **generic function** whose type is only determined by the final data argument.
Inside `pipe`/`pipeAsync`, TypeScript sometimes can’t infer that type, so you may need a tiny hint.

### Recommended fixes (choose 1)

```ts
import { pipe, pipeHint, zip, some } from 'fp-pack';

// 1) data-first wrapper (most explicit)
const withWrapper = pipe(
  (values: number[]) => zip([1, 2, 3], values),
  some(([a, b]) => a > b)
);

// 2) explicit function type hint (short, but uses an assertion)
const withHint = pipe(
  zip([1, 2, 3]) as (values: number[]) => Array<[number, number]>,
  some(([a, b]) => a > b)
);

// 3) pipeHint helper (keeps pipeline style)
const withPipeHint = pipe(
  pipeHint<number[], Array<[number, number]>>(zip([1, 2, 3])),
  some(([a, b]) => a > b)
);
```

### Utilities that may need a hint in data-last pipelines

- Array: `chunk`, `drop`, `take`, `zip`
- Object: `assoc`, `assocPath`, `dissocPath`, `evolve`, `mapValues`, `merge`, `mergeDeep`, `omit`, `path`, `pathOr`, `pick`, `prop`, `propOr`, `propStrict`
- Async: `timeout`
- Stream: `chunk`, `drop`, `take`, `zip`

When in doubt: check the `.d.ts` signature (see “Quick Signature Lookup”).

---

## SideEffect Pattern (Use Only When Needed)

Most code should use `pipe` / `pipeAsync`. Use SideEffect-aware pipes only when you truly need **early termination**:
- validation pipelines that should stop early
- recoverable errors you want to model as data
- branching flows where you want to short-circuit

### SideEffect-aware pipes
- `pipeSideEffect` / `pipeAsyncSideEffect`: convenient, but may widen effects to `any`
- `pipeSideEffectStrict` / `pipeAsyncSideEffectStrict`: preserves strict union effects (recommended when you care about types)

### Rules
- Do **not** call `runPipeResult` or `matchSideEffect` **inside** the pipeline.
- Prefer `isSideEffect` for precise runtime narrowing in both branches.
- Use `runPipeResult` only at the boundary, and provide generics if inference is widened.

### Key functions
- `SideEffect.of(effectFn, label?)`
- `isSideEffect(value)` (type guard)
- `runPipeResult(result)` (execute effect or return value; **outside** pipelines)
- `matchSideEffect(result, { value, effect })`

### `runPipeResult` type behavior (important)

- If the input is **narrowed** to `SideEffect<R>` (e.g. inside `if (isSideEffect(x))`), `runPipeResult(x)` returns `R`.
- If the input is **widened** to `SideEffect<any>` or `any` (common with non-strict pipelines), `runPipeResult(x)` becomes `any` unless you provide generics.

```ts
import {
  pipeSideEffect,
  pipeSideEffectStrict,
  SideEffect,
  isSideEffect,
  runPipeResult,
} from 'fp-pack';

const nonStrict = pipeSideEffect(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEG' as const))
);
const widened: number | SideEffect<any> = nonStrict(-1);
const unsafe = runPipeResult(widened); // any

const strict = pipeSideEffectStrict(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEG' as const))
);
const precise = strict(-1); // number | SideEffect<'NEG'>

if (isSideEffect(precise)) {
  const err = runPipeResult(precise); // 'NEG'
}
```

---

## Stream Functions (`fp-pack/stream`) — Lazy Iterables

Use stream utilities when:
- data is large or unbounded (`range`, streams, generators)
- you want lazy evaluation (avoid allocating intermediate arrays)
- you want to support `Iterable` and `AsyncIterable`

Stream utilities are in `fp-pack/stream` and are designed to be pipe-friendly.

```ts
import { pipe } from 'fp-pack';
import { range, filter, map, take, toArray } from 'fp-pack/stream';

const first100SquaresOfEvens = pipe(
  filter((n: number) => n % 2 === 0),
  map((n) => n * n),
  take(100),
  toArray
);

const result = first100SquaresOfEvens(range(Infinity));
```

---

## Available Functions (Practical Index)

This is not a complete API reference; it’s the “what to reach for” index when composing pipelines.

### Composition
- `pipe`, `pipeAsync`
- SideEffect-aware: `pipeSideEffect`, `pipeSideEffectStrict`, `pipeAsyncSideEffect`, `pipeAsyncSideEffectStrict`
- Utilities: `from`, `tap`, `tap0`, `once`, `memoize`, `identity`, `constant`, `flip`, `partial`, `curry`, `compose`, `complement`
- SideEffect helpers: `SideEffect`, `isSideEffect`, `matchSideEffect`, `runPipeResult`

### Array
- Core transforms: `map`, `filter`, `flatMap`, `reduce`, `scan`
- Queries: `find`, `some`, `every`
- Slicing: `take`, `drop`, `takeWhile`, `dropWhile`, `chunk`
- Ordering/grouping: `sort`, `sortBy`, `groupBy`, `uniqBy`
- Pairing: `zip`, `zipWith`
- Combining: `concat`, `append`, `prepend`, `flatten`

### Object
- Access: `prop`, `propOr`, `propStrict`, `path`, `pathOr`
- Pick/drop: `pick`, `omit`
- Updates: `assoc`, `assocPath`, `dissocPath`
- Merge: `merge`, `mergeDeep`
- Transforms: `mapValues`, `evolve`
- Predicates: `has`

### Control Flow
- `ifElse`, `when`, `unless`, `cond`, `guard`, `tryCatch`

### Async
- `retry`, `timeout`, `delay`
- Function-returning helpers: `debounce*`, `throttle`

### Stream (Lazy Iterables)
- Building: `range`
- Transforms: `map`, `filter`, `flatMap`, `flatten`
- Slicing: `take`, `drop`, `takeWhile`, `dropWhile`, `chunk`
- Queries/reductions: `find`, `some`, `every`, `reduce`, `scan`
- Pairing/combining: `zip`, `zipWith`, `concat`, `append`, `prepend`
- Utilities: `toArray`, `toAsync`

### Math / String / Equality / Debug
- Math: `add`, `sub`, `mul`, `div`, `randomInt`, `clamp`
- String: `split`, `join`, `replace`, `match`, `trim`
- Equality: `equals`, `isNil`
- Debug: `assert`, `invariant`

---

## Micro-Patterns (Keep It Short)

### Boundary handling (UI/event/service)

Do the work in a pipeline, unwrap at the boundary:

```ts
import { pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const validate = (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEG' as const));
const pipeline = pipeSideEffectStrict(validate, (n) => n + 1);

export const handler = (n: number) => {
  const result = pipeline(n);
  if (isSideEffect(result)) return runPipeResult(result); // 'NEG'
  return result; // number
};
```

### Data-first style with `from()`

Some agents/users prefer “data-first” pipelines. You can keep `pipe` data-last and still write data-first flows by injecting the initial value with `from()`:

```ts
import { pipe, from, map, filter, take } from 'fp-pack';

// data-first feeling: start with data, then compose transforms
const result = pipe(
  from([1, 2, 3, 4, 5]),
  filter((n: number) => n % 2 === 0),
  map((n) => n * 10),
  take(2)
)(); // [20, 40]

// same idea when you already have an input (normal usage)
const process = pipe(
  filter((n: number) => n % 2 === 0),
  map((n) => n * 10)
);
const result2 = process([1, 2, 3, 4, 5]); // [20, 40]
```

### `ifElse` uses functions (not values)

```ts
import { ifElse, from } from 'fp-pack';

const label = ifElse(
  (n: number) => n >= 60,
  from('pass'),
  from('fail')
);
```

### Stream pipeline to array

```ts
import { pipe } from 'fp-pack';
import { map, filter, toArray } from 'fp-pack/stream';

const toIds = pipe(
  filter((u: User) => u.active),
  map((u) => u.id),
  toArray
);
```

### Data-last inference workaround (when needed)

Use a wrapper or `pipeHint` when a data-last generic won’t infer inside `pipe`:

```ts
import { pipe, pipeHint, zip } from 'fp-pack';

// wrapper
const zipUsers = pipe((xs: User[]) => zip(['a', 'b', 'c'], xs));

// pipeHint
const zipUsers2 = pipe(
  pipeHint<User[], Array<[string, User]>>(zip(['a', 'b', 'c']))
);
```

### Async pipelines (retry/timeout)

Keep async steps inside `pipeAsync` and push configuration (like `timeout`) via currying:

```ts
import { pipeAsync, retry, timeout } from 'fp-pack';

const fetchJson = pipeAsync(
  (url: string) => fetch(url),
  (res) => res.json()
);

const fetchJsonWithGuards = pipeAsync(
  fetchJson,
  timeout(5_000),
  retry(3)
);
```

### Object updates (avoid mutation)

```ts
import { pipe, assocPath, merge } from 'fp-pack';

const updateAccount = pipe(
  assocPath(['profile', 'role'], 'member'),
  merge({ updatedAt: Date.now() })
);
```

---

## Decision Guide (What Should the Agent Pick?)

- Is everything sync and pure? → `pipe`
- Any step async? → `pipeAsync`
- Need early-exit + typed effect unions? → `pipeSideEffectStrict` / `pipeAsyncSideEffectStrict`
- Need early-exit but type precision doesn’t matter? → `pipeSideEffect` / `pipeAsyncSideEffect`
- Handling result at boundary?
  - Need exact branch types? → `isSideEffect` + separate branches
  - Just want to “unwrap” and don’t care about precision? → `runPipeResult` (provide generics if widened)
- Large/unbounded/iterable data? → `fp-pack/stream`

---

## Quick Reference

### Import Paths

- Main: `import { pipe, map, filter } from 'fp-pack'`
- SideEffect pipes: `import { pipeSideEffect, pipeSideEffectStrict, SideEffect } from 'fp-pack'`
- Async: `import { pipeAsync, retry, timeout } from 'fp-pack'`
- Stream: `import { map, filter, toArray } from 'fp-pack/stream'`

### When to Use What

- Pure sync transforms: `pipe`
- Pure async transforms: `pipeAsync`
- Early-exit pipelines: `pipeSideEffect*` / `pipeAsyncSideEffect*`
- Strict effect unions: prefer `pipeSideEffectStrict` / `pipeAsyncSideEffectStrict`
- Runtime branching: prefer `isSideEffect`
- Boundary unwrapping: `runPipeResult` (provide generics if inference is widened)
- Large/unbounded data: `fp-pack/stream`

---

## Anti-Patterns (Avoid)

- Imperative loops when a pipeline is clearer
- Mutating inputs (prefer immutable transforms)
- Chaining `Array.prototype.*` in complex transforms (prefer `pipe`)
- Calling `runPipeResult` inside a SideEffect-aware pipeline
- Adding “classic monads” to emulate Option/Either instead of using `SideEffect` pipes when necessary

---

## Quick Signature Lookup (When Unsure)

Prefer local types first:
- Main types: `dist/index.d.ts`
- Stream types: `dist/stream/index.d.ts`

If you’re in a consumer project:
- `node_modules/fp-pack/dist/index.d.ts`
- `node_modules/fp-pack/dist/stream/index.d.ts`

---

## Writing New Helpers (If Needed)

If you add your own utilities that should compose well:
- Keep them **unary** for pipelines (or return a unary function via currying).
- Prefer **data-last** argument order.
- For generic/overloaded helpers, consider providing an explicit type alias to preserve inference in TypeScript.

---

## Summary

Default to `pipe` / `pipeAsync`, keep helpers data-last and unary, switch to `stream/*` when laziness matters, and reserve SideEffect-aware pipelines for true early-exit flows. Use `isSideEffect` for precise narrowing and call `runPipeResult` only at the boundary (with generics if inference widens to `any`).
