# fp-kit AI Agent Skills

This document provides guidelines for AI coding assistants when working in projects that use fp-kit. Follow these instructions to write clean, declarative, functional code using fp-kit's utilities.

## Project Philosophy

fp-kit is a TypeScript functional programming library focused on:

1. **Function Composition**: Use `pipe` and `pipeAsync` as the primary tools for combining operations
2. **Declarative Code**: Prefer function composition over imperative loops and mutations
3. **No Monad Pattern**: Traditional FP monads (Option, Either, etc.) are NOT used - they don't compose well with `pipe`
4. **SideEffect Pattern**: Handle errors and side effects using the `SideEffect` class within pipe chains
5. **Lazy Evaluation**: Use `stream/*` functions for efficient iterable processing

## Core Composition Functions

### pipe - Synchronous Function Composition

**Always prefer `pipe` for synchronous operations** instead of manual imperative code.

```typescript
import { pipe, map, filter, take } from 'fp-kit';

// GOOD: Declarative pipe composition
const processUsers = pipe(
  filter((user: User) => user.age >= 18),
  map(user => user.name.toUpperCase()),
  take(10)
);

// BAD: Imperative approach
const processUsers = (users: User[]) => {
  const result = [];
  for (const user of users) {
    if (user.age >= 18) {
      result.push(user.name.toUpperCase());
      if (result.length >= 10) break;
    }
  }
  return result;
};
```

### pipeAsync - Asynchronous Function Composition

**Use `pipeAsync` for any async operations** including API calls, database queries, or async transformations.

```typescript
import { pipeAsync } from 'fp-kit';

// GOOD: Async pipe composition
const fetchUserData = pipeAsync(
  async (userId: string) => fetch(`/api/users/${userId}`),
  async (response) => response.json(),
  (data) => data.user
);

// BAD: Manual async handling
const fetchUserData = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return data.user;
};
```

## SideEffect Pattern - Error Handling in Pipes

**DO NOT use try-catch blocks in pipe chains.** Use the `SideEffect` class to handle errors declaratively.

```typescript
import { pipe, SideEffect, runPipeResult } from 'fp-kit';

// GOOD: SideEffect for error handling
const processData = pipe(
  validateInput,
  (data) => {
    if (!data.isValid) {
      return SideEffect.of(() => {
        throw new Error('Invalid data');
      });
    }
    return data;
  },
  transformData
);

const result = processData(input);
const finalValue = runPipeResult(result); // Executes SideEffect if present

// BAD: try-catch in imperative code
const processData = (input: any) => {
  try {
    const validated = validateInput(input);
    if (!validated.isValid) throw new Error('Invalid data');
    return transformData(validated);
  } catch (e) {
    // ...
  }
};
```

**Key SideEffect functions:**
- `SideEffect.of(fn, label?)` - Create a side effect container
- `isSideEffect(value)` - Type guard to check for SideEffect
- `runPipeResult(result)` - Execute SideEffect or return value
- `matchSideEffect(result, { value, effect })` - Pattern match on result

## Stream Functions - Lazy Iterable Processing

**Use `stream/*` functions for lazy, memory-efficient data processing** instead of array methods.

```typescript
import { pipe } from 'fp-kit';
import { map, filter, take, toArray, range } from 'fp-kit/stream';

// GOOD: Lazy stream processing
const processLargeDataset = pipe(
  filter((n: number) => n % 2 === 0),
  map(n => n * n),
  take(100),
  toArray
);

// Processes only what's needed - memory efficient
const result = processLargeDataset(range(1, 1000000));

// BAD: Eager array processing
const result = Array.from({ length: 1000000 }, (_, i) => i + 1)
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .slice(0, 100); // Processed entire dataset!
```

**Stream functions support both sync and async iterables:**
- Sync: `Iterable<T>` → `IterableIterator<R>`
- Async: `AsyncIterable<T>` → `AsyncIterableIterator<R>`

## Available Functions by Category

### Composition
- `pipe` - Left-to-right function composition (sync)
- `compose` - Right-to-left function composition
- `curry` - Curry a function
- `partial` - Partial application
- `flip` - Flip function argument order
- `complement` - Logical negation
- `identity` - Return input unchanged
- `constant` - Always return the same value
- `tap` - Execute side effect and return original value
- `once` - Execute function only once
- `memoize` - Cache function results
- `SideEffect` - Side effect container
- `isSideEffect` - Type guard for SideEffect
- `matchSideEffect` - Pattern match on value/SideEffect
- `runPipeResult` - Execute SideEffect or return value

### Async
- `pipeAsync` - Async function composition
- `delay` - Delay execution
- `timeout` - Add timeout to promise
- `retry` - Retry failed operations
- `debounce` - Debounce function calls
- `debounceLeading` - Debounce with leading edge
- `debounceLeadingTrailing` - Debounce with both edges
- `throttle` - Throttle function calls

### Array
- `map`, `filter`, `reduce`, `flatMap`
- `find`, `some`, `every`
- `take`, `drop`, `takeWhile`, `dropWhile`
- `chunk`, `zip`, `zipWith`, `unzip`, `zipIndex`
- `uniq`, `uniqBy`, `sort`, `sortBy`, `groupBy`
- `concat`, `append`, `prepend`, `flatten`, `flattenDeep`
- `head`, `tail`, `last`, `init`
- `range`, `partition`, `scan`

### Object
- `prop`, `propOr`, `path`, `pathOr`
- `pick`, `omit`
- `assoc`, `assocPath`, `dissoc`, `dissocPath`
- `merge`, `mergeDeep`, `mergeAll`
- `keys`, `values`, `entries`
- `mapValues`, `evolve`
- `has`, `hasPath`

### Control Flow
- `ifElse` - Conditional branching
- `when`, `unless` - Conditional execution
- `cond` - Multi-branch conditional
- `tryCatch` - Safe function execution
- `guard` - Validation guard

### Stream (Lazy Iterables)
- `append`, `concat`, `prepend`
- `map`, `filter`, `flatMap`, `flatten`, `flattenDeep`
- `take`, `takeWhile`, `drop`, `dropWhile`, `chunk`
- `zip`, `zipWith`, `find`, `some`, `every`
- `reduce`, `scan`
- `range`
- `toArray` - Materialize stream to array
- `toAsync` - Convert to async iterable

### Math
- `add`, `sub`, `mul`, `div`
- `sum`, `mean`, `min`, `max`
- `round`, `floor`, `ceil`, `randomInt`

### String
- `trim`, `split`, `join`, `replace`
- `toUpper`, `toLower`
- `startsWith`, `endsWith`, `match`

### Equality
- `equals`, `includes`
- `isNil`, `isEmpty`, `isType`
- `gt`, `gte`, `lt`, `lte`
- `clamp`

### Nullable
- `maybe`, `mapMaybe`, `getOrElse`, `fold`, `result`

### Debug
- `assert`, `invariant`, `log`

## Coding Guidelines for AI Agents

### 1. Always Prefer pipe/pipeAsync

```typescript
// GOOD
const result = pipe(
  trim,
  split(','),
  map(toNumber),
  filter(isPositive)
)(input);

// BAD
const trimmed = trim(input);
const parts = split(',')(trimmed);
const numbers = map(toNumber)(parts);
const result = filter(isPositive)(numbers);
```

### 2. Use Curried Functions (Where Available)

Most multi-arg functions are curried. Many single-arg utilities are not (e.g. `uniq`, `flatten`, `flattenDeep`, `head`, `tail`, `last`, `init`, `range`, `partition`, `sum`, `mean`, `min`, `max`, `round`, `floor`, `ceil`, `trim`, `toLower`, `toUpper`, `isNil`, `isEmpty`, `isType`). Use those directly.

```typescript
import { pipe, map, filter } from 'fp-kit';

// GOOD: Curried usage in pipe
const processUsers = pipe(
  filter(user => user.active),
  map(user => user.name)
);

// GOOD: Partial application
const filterActive = filter((user: User) => user.active);
const getNames = map((user: User) => user.name);
const processUsers = pipe(filterActive, getNames);
```

### 3. Choose pipe vs pipeAsync

- **Use `pipe`** for synchronous data transformations
- **Use `pipeAsync`** when ANY step involves:
  - API calls
  - Database queries
  - File I/O
  - AsyncIterable processing
  - Any Promise-returning function

```typescript
// Sync: use pipe
const processNumbers = pipe(
  map((n: number) => n * 2),
  filter(n => n > 10)
);

// Async: use pipeAsync
const processUsers = pipeAsync(
  async (ids: string[]) => db.users.findMany(ids),
  map(user => user.profile),
  filter(profile => profile.verified)
);
```

### 4. Use stream/* for Large Datasets

```typescript
import { pipe } from 'fp-kit';
import { filter, map, take, toArray } from 'fp-kit/stream';

// GOOD: Lazy processing
const getFirst100Even = pipe(
  filter((n: number) => n % 2 === 0),
  take(100),
  toArray
);

// Stops after finding 100 items
const result = getFirst100Even(range(1, Infinity));
```

### 5. Handle Errors with SideEffect

```typescript
import { pipe, SideEffect, runPipeResult } from 'fp-kit';

const safeDivide = pipe(
  (input: { a: number; b: number }) => {
    if (input.b === 0) {
      return SideEffect.of(() => {
        throw new Error('Division by zero');
      }, 'DIVISION_ERROR');
    }
    return input;
  },
  ({ a, b }) => a / b
);

const result = runPipeResult(safeDivide({ a: 10, b: 2 })); // 5
```

### 6. Use Control Flow Functions

```typescript
import { pipe, ifElse, when, cond } from 'fp-kit';

// GOOD: Declarative conditionals
const processAge = pipe(
  ifElse(
    (age: number) => age >= 18,
    age => ({ age, status: 'adult' }),
    age => ({ age, status: 'minor' })
  )
);

// GOOD: Multi-branch with cond
const gradeToLetter = cond([
  [(n: number) => n >= 90, () => 'A'],
  [(n: number) => n >= 80, () => 'B'],
  [(n: number) => n >= 70, () => 'C'],
  [() => true, () => 'F']
]);
```

### 7. Object Transformations

```typescript
import { pipe, pick, mapValues, merge } from 'fp-kit';

// GOOD: Declarative object operations
const processUser = pipe(
  pick(['name', 'email', 'age']),
  mapValues((value) => typeof value === 'string' ? value.trim() : value),
  merge({ verified: false })
);
```

## Anti-Patterns to Avoid

### ❌ Don't use imperative loops

```typescript
// BAD
const result = [];
for (const item of items) {
  if (item.active) {
    result.push(item.name);
  }
}

// GOOD
const result = pipe(
  filter((item: Item) => item.active),
  map(item => item.name)
)(items);
```

### ❌ Don't chain array methods

```typescript
// BAD
const result = users
  .filter(u => u.active)
  .map(u => u.name)
  .slice(0, 10);

// GOOD
const result = pipe(
  filter((u: User) => u.active),
  map(u => u.name),
  take(10)
)(users);
```

### ❌ Don't use traditional monads (Option, Either, Maybe)

```typescript
// BAD - Don't implement this pattern
const maybeUser = Option.of(user)
  .map(u => u.profile)
  .flatMap(p => p.email);

// GOOD - Use SideEffect with pipe
const getUserEmail = pipe(
  (user: User) => {
    if (!user.profile) {
      return SideEffect.of(() => null, 'NO_PROFILE');
    }
    return user.profile;
  },
  (profile) => {
    if (!profile.email) {
      return SideEffect.of(() => null, 'NO_EMAIL');
    }
    return profile.email;
  }
);
```

### ❌ Don't mutate data

```typescript
// BAD
const updateUser = (user: User) => {
  user.lastLogin = new Date();
  return user;
};

// GOOD
const updateUser = (user: User) => ({
  ...user,
  lastLogin: new Date()
});

// EVEN BETTER with fp-kit
import { assoc } from 'fp-kit';
const updateUser = assoc('lastLogin', new Date());
```

## Quick Reference

### Import Paths
- Main functions: `import { pipe, map, filter } from 'fp-kit'`
- Async: `import { pipeAsync, delay, retry } from 'fp-kit'`
- Stream: `import { map, filter, toArray } from 'fp-kit/stream'`

### When to Use What
- **Data transformation**: `pipe` + array/object functions
- **Async operations**: `pipeAsync`
- **Large datasets**: `stream/*` functions
- **Error handling**: `SideEffect` pattern
- **Conditionals**: `ifElse`, `when`, `unless`, `cond`
- **Object access**: `prop`, `path`, `pick`, `omit`
- **Object updates**: `assoc`, `merge`, `evolve`

## Summary

As an AI coding assistant working with fp-kit:

1. **Default to `pipe`** for all data transformations
2. **Switch to `pipeAsync`** when async operations are involved
3. **Use `stream/*`** for lazy, memory-efficient processing
4. **Handle errors with `SideEffect`**, not try-catch
5. **Avoid imperative loops** - use fp-kit's declarative functions
6. **Never suggest monads** - use SideEffect pattern instead
7. **Keep code declarative** - describe what, not how

Your goal is to write clean, readable, functional code that leverages fp-kit's full potential.
