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

## Agent Checklist (TL;DR)

When writing or editing code in an fp-pack project:
- Prefer `pipe` / `pipeAsync` for composition; keep helpers **unary** in the pipeline.
- Prefer **data-last** utilities (curried) so they compose: `map(fn)`, `prop('k')`, `assoc('k', v)`, etc.
- Use `stream/*` for lazy/large/iterable processing; use array/object utils for small/eager data.
- Use SideEffect-aware pipes only when you need **early exit**: `pipeSideEffect*` / `pipeAsyncSideEffect*`.
- **Never call `runPipeResult` inside a pipeline**; call it at the boundary (event handler, service wrapper, etc.).
- If TypeScript inference gets stuck with a data-last generic, use a small wrapper or `pipeHint`.

---

## ⛔ CRITICAL MISTAKES TO AVOID (Read This First!)

Before you write any code, know these anti-patterns. These are the most common mistakes that break fp-pack pipelines:

### ❌ WRONG: Using `() => value` for constants in pipelines

```ts
// ❌ BAD - Type inference fails
const broken = pipe(
  () => [1, 2, 3, 4, 5],
  filter((n: number) => n % 2 === 0)  // Error!
);

// ✅ CORRECT - Use from() for constant values
const works = pipe(
  from([1, 2, 3, 4, 5]),
  filter((n: number) => n % 2 === 0)
);
```

### ❌ WRONG: Using raw values with ifElse/cond

```ts
// ❌ BAD
const broken = ifElse((score: number) => score >= 60, 'pass', 'fail');

// ✅ CORRECT - Use from() to wrap constant values
const works = ifElse((score: number) => score >= 60, from('pass'), from('fail'));
```

### ❌ WRONG: Calling runPipeResult inside a pipeline

```ts
// ❌ BAD
const broken = pipe(validateUser, runPipeResult, processUser);

// ✅ CORRECT - Call runPipeResult OUTSIDE the pipeline
const pipeline = pipeSideEffect(validateUser, processUser);
const result = runPipeResult(pipeline(userData));
```

### ❌ WRONG: Using pipe with SideEffect-returning functions

```ts
// ❌ BAD
const broken = pipe(
  findUser,           // Returns User | SideEffect
  (user) => user.email  // Error! SideEffect has no 'email'
);

// ✅ CORRECT - Use pipeSideEffect for SideEffect handling
const works = pipeSideEffect(
  findUser,
  (user) => user.email  // Automatically skipped if SideEffect
);
```

### ❌ WRONG: Mutating arrays/objects

```ts
// ❌ BAD
users.push(newUser);
user.name = 'Updated';

// ✅ CORRECT - Use immutable operations
const updatedUsers = append(newUser, users);
const updatedUser = assoc('name', 'Updated', user);
```

### ❌ WRONG: Imperative loops instead of declarative transforms

```ts
// ❌ BAD
const results = [];
for (const user of users) {
  if (user.active) results.push(user.name.toUpperCase());
}

// ✅ CORRECT
const results = pipe(
  filter((user: User) => user.active),
  map(user => user.name.toUpperCase())
)(users);
```

**Remember:** If you encounter any of these patterns, STOP and use the correct fp-pack approach instead!

---

## 💡 Real-World Examples (Learn by Doing)

Study these common patterns first:

### Example 1: User Data Processing Pipeline

```ts
import { pipe, filter, map, take, sortBy } from 'fp-pack';

const getTopActiveUsers = pipe(
  filter((user: User) => user.active && user.lastLogin > cutoffDate),
  sortBy((user) => -user.activityScore),
  map(user => ({ id: user.id, name: user.name, score: user.activityScore })),
  take(10)
);

const topUsers = getTopActiveUsers(allUsers);
```

### Example 2: API Request with Error Handling

```ts
import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const fetchUserData = pipeAsyncSideEffect(
  async (userId: string) => {
    const res = await fetch(`/api/users/${userId}`);
    return res.ok ? res : SideEffect.of(() => `HTTP ${res.status}`);
  },
  async (res) => res.json(),
  (data) => data.verified ? data : SideEffect.of(() => 'User not verified')
);

// Call at boundary
const result = runPipeResult(await fetchUserData('user-123'));
```

### Example 3: Data Transformation with from()

```ts
import { pipe, from, ifElse, filter, map } from 'fp-pack';

// Constant value injection
const getStatusMessage = ifElse(
  (count: number) => count > 0,
  from('Items available'),
  from('No items found')
);

// Data-first pattern
const processWithData = pipe(
  from([1, 2, 3, 4, 5]),
  filter((n: number) => n % 2 === 0),
  map(n => n * 2)
);

const result = processWithData(); // [4, 8]
```

**These patterns cover 90% of real-world use cases!**

---

## Core Composition

### `pipe` (sync)

```ts
import { pipe, filter, map, take } from 'fp-pack';

const processUsers = pipe(
  filter((u: User) => u.active),
  map((u) => u.name),
  take(10)
);
```

### `pipeAsync` (async)

```ts
import { pipeAsync } from 'fp-pack';

const fetchUser = pipeAsync(
  async (id: string) => fetch(`/api/users/${id}`),
  async (res) => res.json(),
  (data) => data.user
);
```

---

## Currying & Data-Last

Most multi-arg helpers are **data-last** and **curried**:
- Good: `map(fn)`, `filter(pred)`, `replace(from, to)`, `assoc('k', v)`, `path(['a','b'])`
- Single-arg helpers are already unary—just use them directly

---

## TypeScript: Data-last Generic Inference

Some data-last helpers return a **generic function** whose type is only determined by the final data argument. Inside `pipe`, TypeScript sometimes can't infer that type.

### Quick fixes (choose 1)

```ts
import { pipe, pipeHint, zip, some } from 'fp-pack';

// 1) data-first wrapper
const withWrapper = pipe(
  (values: number[]) => zip([1, 2, 3], values),
  some(([a, b]) => a > b)
);

// 2) pipeHint helper
const withPipeHint = pipe(
  pipeHint<number[], Array<[number, number]>>(zip([1, 2, 3])),
  some(([a, b]) => a > b)
);
```

**Utilities that may need a hint:** `chunk`, `drop`, `take`, `zip`, `assoc`, `path`, `prop`, `timeout`

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
const pipeline = pipeSideEffectStrict(validate, (n) => n + 1);

const result = pipeline(-1); // number | SideEffect<'NEG'>

if (isSideEffect(result)) {
  const err = runPipeResult(result); // 'NEG'
} else {
  // result is number
}
```

---

## Stream Functions (`fp-pack/stream`)

Use stream utilities when:
- data is large or unbounded
- you want lazy evaluation
- you want to support `Iterable` and `AsyncIterable`

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

## Available Functions (Quick Index)

### Composition
- `pipe`, `pipeAsync`
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

## Micro-Patterns

### Boundary handling

```ts
const pipeline = pipeSideEffectStrict(validate, process);

export const handler = (data) => {
  const result = pipeline(data);
  if (isSideEffect(result)) return runPipeResult(result);
  return result;
};
```

### Data-first with from()

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

Default to `pipe` / `pipeAsync`, keep helpers data-last and unary, switch to `stream/*` when laziness matters, and reserve SideEffect-aware pipelines for true early-exit flows. Use `isSideEffect` for precise narrowing and call `runPipeResult` only at the boundary.
