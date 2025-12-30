# fp-kit

**A practical, pipe-first functional toolkit for modern TypeScript.**

fp-kit is a focused collection of functional programming utilities designed for real-world TypeScript applications.
It emphasizes **function composition, immutability, and declarative code** through `pipe` and `pipeAsync`, while remaining approachable for everyday developers.

There's no framework, no monads, and no heavy abstractions—just well-chosen helpers that make functional style easier to adopt and maintain in production code.

---

## Why fp-kit?

- 🔄 **Pipe-First Philosophy**
  Built around `pipe` and `pipeAsync` for clean, left-to-right function composition.

- 🚫 **No Monad Pattern**
  Traditional FP monads (Option, Either) don't compose well with pipes. We use the `SideEffect` pattern instead for error handling.

- 💧 **Lazy Stream Processing**
  Efficient iterable processing with `stream/*` functions for memory-conscious operations on large datasets.

- 👥 **Designed for TypeScript Developers**
  No academic FP concepts required. Strong type inference, minimal annotations.

- 🎯 **Practical & Production-Ready**
  Covers the patterns you write every day—data transformation, composition, control flow, and async operations.

- 🪶 **Lightweight & Modular**
  Zero dependencies and tree-shakeable modules.

---

## Design Principles

- **Pipe-centric composition**
  `pipe` (sync) and `pipeAsync` (async) are the primary composition tools. All utilities are designed to work seamlessly in pipe chains.

- **SideEffect pattern over monads**
  Handle errors and side effects declaratively within pipes using the `SideEffect` class, without breaking the composition flow.

- **Immutable & Pure by default**
  Core utilities avoid mutations and side effects. Any exception is explicitly named (e.g. `tap`, `log`).

- **Lazy evaluation when needed**
  Array helpers are eager and simple. Stream helpers (`stream/*`) provide lazy, memory-efficient alternatives for large datasets.

- **Curried where it makes sense**
  Multi-argument functions are curried for easy partial application in pipes.

## Installation

```bash
npm install fp-kit
# or
pnpm add fp-kit
# or
yarn add fp-kit
```

## Quick Start

### Basic Pipe Composition

```typescript
import { pipe, map, filter, take } from 'fp-kit';

// Synchronous data transformation
const processUsers = pipe(
  filter((user: User) => user.age >= 18),
  map(user => user.name.toUpperCase()),
  take(10)
);

const result = processUsers(users);
```

### Async Operations with pipeAsync

```typescript
import { pipeAsync } from 'fp-kit';

// Async pipe composition
const fetchUserProfile = pipeAsync(
  async (userId: string) => fetch(`/api/users/${userId}`),
  async (response) => response.json(),
  (data) => data.profile
);

const profile = await fetchUserProfile('user-123');
```

### Error Handling with SideEffect

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

const result = safeDivide({ a: 10, b: 2 });
const value = runPipeResult(result); // 5
```

### Lazy Stream Processing

```typescript
import { pipe } from 'fp-kit';
import { filter, map, take, toArray, range } from 'fp-kit/stream';

// Process only what you need - memory efficient
const processLargeDataset = pipe(
  filter((n: number) => n % 2 === 0),
  map(n => n * n),
  take(100),
  toArray
);

// Only processes 100 items, not 1 million
const result = processLargeDataset(range(1, 1000000));
```

## API Reference

### Composition

Functions for composing and transforming other functions.

- **pipe** - Compose functions left to right (f → g → h)
- **compose** - Compose functions right to left (h → g → f)
- **curry** - Transform a function to support partial application
- **partial** - Pre-fill function arguments
- **flip** - Reverse the order of function arguments
- **complement** - Logical negation of a predicate
- **identity** - Return input unchanged
- **constant** - Always return the same value
- **tap** - Execute side effects without changing the value
- **once** - Create a function that only executes once
- **memoize** - Cache function results for same inputs
- **SideEffect** - Side effect container for pipe error handling
- **isSideEffect** - Type guard to check for SideEffect
- **matchSideEffect** - Pattern match on value or SideEffect
- **runPipeResult** - Execute SideEffect or return value

### Control Flow

Functions for conditional logic and flow control.

- **ifElse** - Execute different functions based on a condition
- **when** - Apply function only when condition is true
- **unless** - Apply function only when condition is false
- **cond** - Multi-way conditional branching (switch alternative)
- **tryCatch** - Handle exceptions functionally
- **guard** - Early return with default value on condition failure

### Array

Functions for working with arrays. Inputs are never mutated, and results return new values or arrays.

- **map** - Transform each element
- **filter** - Select elements matching a predicate
- **reduce** - Accumulate values into a single result
- **flatMap** - Map then flatten the result
- **find** - Get first element matching predicate
- **some** - Check if at least one element matches
- **every** - Check if all elements match
- **take** - Take first n elements
- **drop** - Skip first n elements
- **takeWhile** - Take elements while predicate is true
- **dropWhile** - Skip elements while predicate is true
- **chunk** - Split array into chunks of specified size
- **zip** - Combine two arrays into pairs
- **zipWith** - Combine two arrays with custom function
- **unzip** - Split array of pairs into two arrays
- **zipIndex** - Pair each element with its index
- **uniq** - Remove duplicate values
- **uniqBy** - Remove duplicates by comparison function
- **sort** - Sort array
- **sortBy** - Sort by comparison function
- **groupBy** - Group elements by key function
- **partition** - Split array by predicate into [true, false]
- **concat** - Concatenate arrays
- **append** - Add element to end
- **prepend** - Add element to start
- **flatten** - Flatten one level deep
- **flattenDeep** - Flatten all levels
- **head** - Get first element
- **tail** - Get all but first element
- **last** - Get last element
- **init** - Get all but last element
- **range** - Generate numeric range
- **scan** - Like reduce but emit intermediate values

### Object

Functions for working with objects and records. All operations are immutable.

- **prop** - Safely access object property
- **propOr** - Access property with default value
- **path** - Safely access nested property path
- **pathOr** - Access nested path with default value
- **pick** - Select specified properties
- **omit** - Remove specified properties
- **assoc** - Set property immutably
- **assocPath** - Set nested path immutably
- **dissoc** - Remove property immutably
- **dissocPath** - Remove nested path immutably
- **merge** - Shallow merge objects
- **mergeDeep** - Deep merge objects
- **mergeAll** - Merge multiple objects
- **keys** - Get array of object keys
- **values** - Get array of object values
- **entries** - Get array of [key, value] pairs
- **mapValues** - Transform object values
- **evolve** - Transform object based on schema
- **has** - Check if property exists
- **hasPath** - Check if nested path exists

### Equality & Comparison

Functions for comparing and checking values.

- **equals** - Deep equality comparison
- **includes** - Check containment (string) or deep equality in arrays
- **isNil** - Check if value is null or undefined
- **isEmpty** - Check if value is empty
- **isType** - Check value type
- **gt** - Greater than comparison
- **gte** - Greater than or equal comparison
- **lt** - Less than comparison
- **lte** - Less than or equal comparison
- **clamp** - Constrain value within range

### Math

Mathematical operations and utilities.

- **add** - Addition (curried)
- **sub** - Subtraction (curried)
- **mul** - Multiplication (curried)
- **div** - Division (curried)
- **sum** - Sum of array elements
- **mean** - Average of array elements
- **min** - Minimum value in array
- **max** - Maximum value in array
- **round** - Round to nearest integer
- **floor** - Round down
- **ceil** - Round up
- **randomInt** - Random integer in range

### String

Functions for string manipulation. All operations return new strings.

- **trim** - Remove whitespace from both ends
- **split** - Split string by separator
- **join** - Join array into string
- **replace** - Replace pattern in string
- **toUpper** - Convert to uppercase
- **toLower** - Convert to lowercase
- **startsWith** - Check if string starts with prefix
- **endsWith** - Check if string ends with suffix
- **match** - Match string against regex

### Async

Functions for asynchronous operations.

- **pipeAsync** - Compose async/sync functions (supports SideEffect)
- **delay** - Wait for specified milliseconds
- **timeout** - Execute promise with timeout limit
- **retry** - Retry failed operations with optional delay
- **debounce** - Debounce function calls (trailing)
- **debounceLeading** - Debounce with leading edge
- **debounceLeadingTrailing** - Debounce with both edges
- **throttle** - Throttle function calls

### Stream (Lazy Iterables)

Memory-efficient lazy evaluation for large datasets. Works with both sync and async iterables.

- **map** - Lazy map over iterable
- **filter** - Lazy filter
- **flatMap** - Lazy flatMap
- **flatten** - Lazy flatten (one level)
- **flattenDeep** - Lazy flatten (all levels)
- **take** - Take first n elements
- **takeWhile** - Take while predicate is true
- **drop** - Skip first n elements
- **dropWhile** - Skip while predicate is true
- **chunk** - Split into chunks
- **zip** - Combine two iterables
- **zipWith** - Combine with custom function
- **find** - Find first matching element
- **some** - Check if any element matches
- **every** - Check if all elements match
- **reduce** - Accumulate values
- **scan** - Emit intermediate accumulations
- **concat** - Concatenate iterables
- **append** - Add element to end
- **prepend** - Add element to start
- **range** - Generate lazy numeric range
- **toArray** - Materialize iterable to array
- **toAsync** - Convert to async iterable

### Nullable

Functions for handling nullable values safely.

- **maybe** - Safely transform nullable values
- **mapMaybe** - Apply function only if value exists
- **getOrElse** - Get value or return default
- **fold** - Handle both Some and None cases
- **result** - Wrap operation in Result type

### Debug

Functions for debugging and development.

- **assert** - Assert condition with error message
- **invariant** - Check invariant contracts
- **log** - Log value and pass through (for debugging pipes)

## Key Concepts

### SideEffect Pattern

fp-kit uses the `SideEffect` pattern instead of traditional monads for error handling in pipes:

```typescript
import { pipe, SideEffect, isSideEffect, runPipeResult } from 'fp-kit';

const validateAge = (age: number) => {
  if (age < 0) {
    return SideEffect.of(() => {
      throw new Error('Age cannot be negative');
    }, 'INVALID_AGE');
  }
  return age;
};

const processAge = pipe(
  validateAge,
  (age) => age * 2,  // This won't run if SideEffect is returned
  (age) => ({ age })
);

const result = processAge(-5);

if (isSideEffect(result)) {
  console.log('Error:', result.label); // 'INVALID_AGE'
} else {
  console.log('Success:', result);
}

// Or use runPipeResult to execute the side effect
const value = runPipeResult(result); // Throws error
```

### Pipe vs PipeAsync

- Use **`pipe`** for synchronous transformations
- Use **`pipeAsync`** when ANY step involves Promises or AsyncIterables

```typescript
// Sync pipe
const processNumbers = pipe(
  filter((n: number) => n > 0),
  map(n => n * 2),
  sum
);

// Async pipe
const fetchAndProcess = pipeAsync(
  async (id: string) => fetchUser(id),
  (user) => user.profile,  // Sync step is OK
  async (profile) => enrichProfile(profile)
);
```

### Stream vs Array

Use `stream/*` for:
- Large datasets that don't fit in memory
- Operations that can short-circuit (take, find)
- Processing iterables without materializing to arrays
- Async data sources (AsyncIterable)

```typescript
import { pipe } from 'fp-kit';
import * as Stream from 'fp-kit/stream';

// Memory efficient - processes only 10 items
const first10Evens = pipe(
  Stream.filter((n: number) => n % 2 === 0),
  Stream.take(10),
  Stream.toArray
);

first10Evens(Stream.range(1, 1000000)); // Only processes ~20 items
```

## What You Get

- 🔧 **96+ Utility Functions** - Organized into 10 practical categories
- 🎨 **Composable Design** - Built for pipes, currying, and function composition
- 📦 **Modern Builds** - ESM and UMD formats for any environment
- 🌳 **Tree-Shakeable** - Import only what you need
- ⚡ **Zero Dependencies** - No bloat, just pure TypeScript
- 💪 **Full Type Safety** - Strong inference with minimal annotations

## Import Paths

```typescript
// Main library (implement/*)
import { pipe, map, filter, pipeAsync } from 'fp-kit';

// Stream functions (lazy iterables)
import { map, filter, toArray, range } from 'fp-kit/stream';
```

## Development

```bash
# Install dependencies
pnpm install

# Build library
pnpm build

# Run tests
pnpm test

# Run dev server
pnpm dev
```

## License

MIT
