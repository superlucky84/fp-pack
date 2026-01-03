<div align="center">
  <img src="https://superlucky84.github.io/fp-pack/fp.png" alt="fp-pack" width="200" />

  # fp-pack

  **A practical functional toolkit for JavaScript and TypeScript.**
</div>

Written in TypeScript with full type safety, fp-pack works seamlessly in both JavaScript and TypeScript projects.

fp-pack is a focused collection of functional programming utilities designed for real-world applications.
It emphasizes **function composition, immutability, and declarative code** through `pipe` and `pipeAsync`, while remaining approachable for everyday developers.

The concept is simple: if you understand functions, pipes, and currying, you can use fp-pack immediately.

There's no framework and no heavy abstractions—just well-chosen helpers that make functional style easier to adopt and maintain in production code.

---

## Custom Utility Authoring Guide (for pipe)

When you write your own helpers that should compose cleanly with `pipe`/`pipeAsync`, follow these conventions:

- **Data-last arguments** so partial application works naturally in pipelines.
- **Curry multi-argument functions** to make them pipe-friendly.
- **Fixed signatures** can use `curry(fn)` directly.
- **Generic or overloaded signatures** should be wrapped with an explicit type alias and a cast to preserve inference.

```typescript
// Fixed signature: curry is enough
function split(separator: string, str: string): string[] {
  return str.split(separator);
}
export default curry(split);

// Generic signature: add a type alias for the curried form
type Chunk = {
  (size: number): <T>(arr: T[]) => T[][];
  <T>(size: number, arr: T[]): T[][];
};

function chunk<T>(size: number, arr: T[]): T[][] {
  // ...
  return [];
}

const curriedChunk = curry(chunk) as Chunk;
export default curriedChunk;
```

## Why fp-pack?

- 🔄 **Pipe-First Philosophy**
  Built around `pipe` and `pipeAsync` for clean, left-to-right function composition.

- ⚡ **SideEffect Pattern**
  Handle errors and side effects declaratively in SideEffect-aware pipelines. Use `pipeSideEffect` / `pipeAsyncSideEffect` to short-circuit on `SideEffect` without breaking composition. Focus on business logic, not error plumbing. For strict effect unions, use `pipeSideEffectStrict` / `pipeAsyncSideEffectStrict`.

- 📘 **JavaScript & TypeScript**
  Works seamlessly in JavaScript. Written in TypeScript for robust type inference when you need it.

- 🎯 **Practical & Production-Ready**
  Covers the patterns you write every day—data transformation, composition, control flow, and async operations.

- 🪶 **Lightweight & Modular**
  Zero dependencies and tree-shakeable modules.

- 💧 **Lazy Stream Processing**
  Efficient iterable processing with `stream/*` functions for memory-conscious operations on large datasets.

---

## Design Principles

- **Pipe-centric composition**
  `pipe` (sync) and `pipeAsync` (async) are the primary composition tools. All utilities are designed to work seamlessly in pipe chains.

- **Pragmatic error handling**
  The `SideEffect` pattern handles errors and side effects declaratively in `pipeSideEffect`/`pipeAsyncSideEffect` pipelines. Write normal functions that compose naturally—these pipelines automatically short-circuit when they encounter a `SideEffect`, eliminating the need for wrapper types everywhere. For strict union typing across branches, use `pipeSideEffectStrict` / `pipeAsyncSideEffectStrict`. Use `runPipeResult<T, R>`/`matchSideEffect` **outside** the pipeline with generics for type safety, and `isSideEffect` for runtime type checking.

- **Immutable & Pure by default**
  Core utilities avoid mutations and side effects. Any exception is explicitly named (e.g. `tap`, `log`).

- **Stream functions**
  Stream helpers (`stream/*`) provide lazy evaluation for large datasets.

- **Curried by design**
  All multi-argument utility functions are curried or behave like curried functions, enabling partial application and point-free style. This design allows elegant composition in pipes without awkward wrapper functions.

  ```typescript
  // Functions are curried - apply arguments one at a time
  const double = map((n: number) => n * 2);
  const evenOnly = filter((n: number) => n % 2 === 0);

  const result = pipe(
    evenOnly,  // Partially applied filter
    double,    // Partially applied map
    take(5)    // Partially applied take
  )([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  // [4, 8, 12, 16, 20]
  ```

- **Data-first with `from`**
  Use `from` to inject constant values in pipelines and enable data-first patterns. Particularly useful with `ifElse` and `cond` for constant branches.

  ```typescript
  import { pipe, ifElse, from, filter, map } from 'fp-pack';

  // Use from to return constant values in conditional branches
  const getStatusLabel = ifElse(
    (score: number) => score >= 60,
    from('pass'),    // Constant value instead of (score) => 'pass'
    from('fail')
  );

  const result = getStatusLabel(75); // 'pass'

  // Data-first pattern: inject data into pipeline
  const processWithData = pipe(
    from([1, 2, 3, 4, 5]),
    filter((n: number) => n % 2 === 0),
    map(n => n * 2)
  );

  const processed = processWithData(); // [4, 8]
  ```

## Installation

```bash
npm install fp-pack
# or
pnpm add fp-pack
# or
yarn add fp-pack
```

## AI Agent Skills (Optional)

fp-pack includes an AI agent skills file that helps AI coding assistants (Claude Code, GitHub Copilot, Cursor, etc.) automatically write fp-pack-style functional code.

When you have this skills file in your project, AI assistants will:
- Default to using `pipe`/`pipeAsync` for pure transformations, and `pipeSideEffect`/`pipeAsyncSideEffect` when SideEffect is involved (use strict variants when you need strict effect unions)
- Use the `SideEffect` pattern instead of try-catch
- Prefer `stream/*` functions for large datasets
- Write declarative, functional code using fp-pack utilities

### Setup for Claude Code

Copy the skills file to your project's `.claude/skills/` directory:

```bash
# Unix/macOS/Linux
cp node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/

# Windows (PowerShell)
Copy-Item node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/

# Or manually create the directory and copy
mkdir -p .claude/skills
cp node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/
```

### Setup for Codex

Copy the Codex skill to your project's `$CODEX_HOME/skills/` directory (default: `~/.codex/skills`):

```bash
# Unix/macOS/Linux
mkdir -p ~/.codex/skills/fp-pack
cp node_modules/fp-pack/dist/skills/fp-pack/SKILL.md ~/.codex/skills/fp-pack/SKILL.md

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "$HOME/.codex/skills/fp-pack"
Copy-Item node_modules/fp-pack/dist/skills/fp-pack/SKILL.md $HOME/.codex/skills/fp-pack/SKILL.md
```

Once configured, AI assistants will automatically apply fp-pack coding patterns when helping you write code.

> **Note:** The skills file is located at `node_modules/fp-pack/dist/skills/fp-pack.md` after installation. You can also view it in the [GitHub repository](https://github.com/superlucky84/fp-pack/blob/main/fp-pack.md).

## Quick Start

### Basic Pipe Composition

`pipe` is a pure function composition tool - it takes functions and returns a new function that applies data to those composed functions.

```typescript
import { pipe, map, filter, take } from 'fp-pack';

// Synchronous data transformation
const processUsers = pipe(
  filter((user: User) => user.age >= 18),
  map(user => user.name.toUpperCase()),
  take(10)
);

const result = processUsers(users);
```

**Data-first with `from` (optional)**: While `pipe` is designed for composing functions, you can optionally use `from` to inject data directly into pipelines for convenience:

```typescript
import { pipe, from, filter, map } from 'fp-pack';

// Optional: data-first pattern with from
const processData = pipe(
  from([1, 2, 3, 4, 5]),
  filter((n: number) => n % 2 === 0),
  map(n => n * 2)
);

const result = processData(); // [4, 8]
```

### Async Operations with pipeAsync

```typescript
import { pipeAsync } from 'fp-pack';

// Async pipe composition
const fetchUserProfile = pipeAsync(
  async (userId: string) => fetch(`/api/users/${userId}`),
  async (response) => response.json(),
  (data) => data.profile
);

const profile = await fetchUserProfile('user-123');
```

### Object Transformation

```typescript
import { pipe, pick, mapValues, assoc } from 'fp-pack';

// Transform and clean data
const prepareUserData = pipe(
  pick(['name', 'email', 'age']),
  mapValues((val) => typeof val === 'string' ? val.trim() : val),
  assoc('timestamp', Date.now())
);

const cleanData = prepareUserData(rawUserInput);
```

### Lazy Stream Processing

```typescript
import { pipe } from 'fp-pack';
import { filter, map, take, toArray, range } from 'fp-pack/stream';

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
- **pipeSideEffect** - Compose functions left to right with SideEffect short-circuiting
- **pipeSideEffectStrict** - SideEffect composition with strict effect unions
- **compose** - Compose functions right to left (h → g → f)
- **curry** - Transform a function to support partial application
- **partial** - Pre-fill function arguments
- **flip** - Reverse the order of function arguments
- **complement** - Logical negation of a predicate
- **identity** - Return input unchanged
- **constant** - Always return the same value
- **from** - Ignore input and return a fixed value
- **tap** - Execute side effects without changing the value
- **once** - Create a function that only executes once
- **memoize** - Cache function results for same inputs
- **SideEffect** - Side effect container for SideEffect-aware pipelines
- **isSideEffect** - Type guard for runtime checking whether a value is a SideEffect
- **matchSideEffect** - Pattern match on value or SideEffect
- **runPipeResult** - Execute SideEffect or return value (call OUTSIDE pipelines). **⚠️ CRITICAL:** `runPipeResult<T, R=any>` has default `R=any`, so using it without generics returns `any` type. Always provide explicit type parameters `runPipeResult<SuccessType, ErrorType>` for type safety. Use `isSideEffect` for runtime type checking

### Control Flow

Functions for conditional logic and flow control.

- **ifElse** - Execute different functions based on a condition
- **when** - Apply function only when condition is true
- **unless** - Apply function only when condition is false
- **cond** - Multi-way conditional branching (switch alternative)
- **tryCatch** - Handle exceptions functionally
- **guard** - Early return with default value on condition failure

### Array

Functions for working with arrays. All operations are immutable and return new arrays.

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
- **propStrict** - Access property and throw if it is null or undefined
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

- **pipeAsync** - Compose async/sync functions (pure)
- **pipeAsyncSideEffect** - Async composition with SideEffect short-circuiting
- **pipeAsyncSideEffectStrict** - Async SideEffect composition with strict effect unions
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

**The JavaScript exception problem:** In functional pipelines, throwing exceptions breaks composition—control jumps out of the pipe. To avoid this, you need `try-catch` (which breaks flow) or wrap every function in `Either`/`Result` (which requires `map`/`chain` everywhere). Both solutions make you think about error plumbing instead of business logic.

**The SideEffect solution:** Write normal functions that compose naturally. When you need to terminate early (validation failure, missing data, errors), return `SideEffect.of(() => ...)`. `pipeSideEffect`/`pipeAsyncSideEffect` pipelines automatically stop—no ceremony, no wrappers, no plumbing. For stricter union typing across branches, use `pipeSideEffectStrict` / `pipeAsyncSideEffectStrict`.

```typescript
import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

// Optional chaining pattern - return null to gracefully terminate
const findUser = (id: string) => {
  const user = database.get(id);
  return user ? user : SideEffect.of(() => null);
};

const emailPipeline = pipeSideEffect(
  findUser,
  (user) => user.email,        // Skipped if user not found
  (email) => email.toLowerCase()
);

// runPipeResult must be called OUTSIDE the pipeline
const email = runPipeResult(emailPipeline('unknown-id'));
// Returns null without errors - clean optional flow

// Practical: User notification flow
const paymentPipeline = pipeSideEffect(
  validateCard,
  (card) => card.balance >= 100
    ? card
    : SideEffect.of(() => {
        showToast('Insufficient balance');
        logEvent('payment_failed', { reason: 'insufficient_funds' });
        return null;
      }),
  chargeCard,
  sendReceipt,
  (receipt) => ({ success: true, receipt })
);

// runPipeResult must be called OUTSIDE the pipeline
const result = runPipeResult(paymentPipeline(userCard));
// If balance insufficient: shows toast, logs event, returns null
// Otherwise: completes payment and returns success object
```

**Key benefits:**
- Write normal functions—no wrapper types
- Mark exceptional paths explicitly with `SideEffect.of()`
- `pipeSideEffect`/`pipeAsyncSideEffect` automatically short-circuit on `SideEffect`
- `runPipeResult` / `matchSideEffect` must be called **OUTSIDE** the pipeline for proper type safety
- Focus on business logic, not error infrastructure

**Type-safe result handling with `isSideEffect`:**

```typescript
import { pipeSideEffect, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const processNumbers = pipeSideEffect(
  (nums: number[]) => nums.filter(n => n % 2 === 1),
  (odds) => odds.length > 0
    ? odds
    : SideEffect.of(() => 'No odd numbers found'),
  (odds) => odds.map(n => n * 2)
);

const oddsDoubled = processNumbers([1, 2, 3, 4, 5]);

// ✅ CORRECT: Use isSideEffect for type checking + provide generics to runPipeResult
if (!isSideEffect(oddsDoubled)) {
  // TypeScript knows: oddsDoubled is number[]
  const sum: number = oddsDoubled.reduce((a, b) => a + b, 0);
  console.log(`Sum: ${sum}`);  // sum: number
} else {
  // TypeScript knows: oddsDoubled is SideEffect<string>
  // But runPipeResult still returns number[] | string (not fully narrowed)
  const error = runPipeResult<number[], string>(oddsDoubled);
  console.log(`Error: ${error}`);  // error: number[] | string
}

// ❌ WRONG: runPipeResult without generics
const result = runPipeResult(oddsDoubled);  // result: any (no type information!)

// ✅ CORRECT: Provide generics to runPipeResult
const result = runPipeResult<number[], string>(oddsDoubled);  // result: number[] | string (union type - safe but not narrowed)
```

**⚠️ CRITICAL: runPipeResult Type Safety**

`runPipeResult<T, R=any>` has a default type parameter `R=any`. This means:

- ❌ **Without generics**: `const result = runPipeResult(pipeline(data));` returns `any` type (unsafe!)
- ✅ **With generics**: `runPipeResult<SuccessType, ErrorType>(result)` returns union type `SuccessType | ErrorType` (type-safe)
- ✅ **With isSideEffect**: Use for runtime checking whether a value is SideEffect

**Always provide generics to `runPipeResult`** for type safety. Use `isSideEffect` for runtime type checking.

### Pipe vs PipeAsync

**Default choice: Start with `pipe` / `pipeAsync`**

Most data transformations are pure and don't need SideEffect handling. Use `pipe` for sync operations and `pipeAsync` for async operations. **Only switch to SideEffect-aware pipes when you actually need** early termination or error handling with side effects.

- **`pipe`** - Synchronous, **pure** transformations (99% of cases)
- **`pipeAsync`** - Async, **pure** transformations (99% of cases)
- **`pipeSideEffect`** - **Only when you need** SideEffect short-circuiting (sync)
- **`pipeAsyncSideEffect`** - **Only when you need** SideEffect short-circuiting (async)
- **`pipeSideEffectStrict`** - Sync SideEffect pipelines with strict effect unions
- **`pipeAsyncSideEffectStrict`** - Async SideEffect pipelines with strict effect unions

**Important:** `pipe` and `pipeAsync` are for **pure** functions only—they don't handle `SideEffect`. If your pipeline can return `SideEffect`, use `pipeSideEffect` or `pipeAsyncSideEffect` instead. Choose the strict variants when you need precise unions for SideEffect results.

```typescript
// Pure sync pipe - no SideEffect handling
const processNumbers = pipe(
  filter((n: number) => n > 0),
  map(n => n * 2),
  sum
);

// Pure async pipe - no SideEffect handling
const fetchAndProcess = pipeAsync(
  async (id: string) => fetchUser(id),
  (user) => user.profile,  // Sync step is OK
  async (profile) => enrichProfile(profile)
);

// SideEffect-aware sync pipe
const validateAndProcess = pipeSideEffect(
  (n: number) => n > 0 ? n : SideEffect.of(() => 'Invalid'),
  (n) => n * 2
);

// SideEffect-aware async pipe
const fetchAndValidate = pipeAsyncSideEffect(
  async (id: string) => fetchUser(id),
  (user) => user.verified ? user : SideEffect.of(() => 'Not verified')
);
```

### SideEffect Composition Rule

**🔄 Critical Rule: SideEffect Contagion**

Once you use `pipeSideEffect` or `pipeAsyncSideEffect`, the result is **always `T | SideEffect`** (or `Promise<T | SideEffect>` for async). The same rule applies to strict variants.

If you want to continue composing this result, you **MUST** keep using SideEffect-aware pipes. You **CANNOT** switch back to `pipe` or `pipeAsync` because they don't handle `SideEffect`.

```typescript
import { pipe, pipeSideEffect, SideEffect } from 'fp-pack';

const validateUserPipeline = pipeSideEffect(
  findUser,
  validateAge
);
// Result type: User | SideEffect

// ❌ WRONG - pipe cannot handle SideEffect
const wrongPipeline = pipe(
  validateUserPipeline,  // Returns User | SideEffect
  (user) => user.email   // Type error! SideEffect has no 'email' property
);

// ✅ CORRECT - Keep using pipeSideEffect
const correctPipeline = pipeSideEffect(
  validateUserPipeline,  // User | SideEffect - handled correctly
  (user) => user.email,  // Automatically skipped if SideEffect
  sendEmail
);

// The same rule applies to async pipes
const asyncPipeline = pipeAsyncSideEffect(
  fetchUser,
  validateUser
);
// Result type: Promise<User | SideEffect>

// You must continue with pipeAsyncSideEffect, not pipeAsync
const extendedAsyncPipeline = pipeAsyncSideEffect(
  asyncPipeline,
  processUser,
  saveToDatabase
);
```

### Stream vs Array

Use `stream/*` for:
- Large datasets that don't fit in memory
- Operations that can short-circuit (take, find)
- Processing iterables without materializing to arrays
- Async data sources (AsyncIterable)

```typescript
import { pipe } from 'fp-pack';
import * as Stream from 'fp-pack/stream';

// Memory efficient - processes only 10 items
const first10Evens = pipe(
  Stream.filter((n: number) => n % 2 === 0),
  Stream.take(10),
  Stream.toArray
);

first10Evens(Stream.range(1, 1000000)); // Only processes ~10 items, not 1 million
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
import { pipe, map, filter, pipeAsync } from 'fp-pack';

// Stream functions (lazy iterables)
import { map, filter, toArray, range } from 'fp-pack/stream';
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

## Acknowledgements

fp-pack draws inspiration from excellent functional programming libraries in the JavaScript ecosystem:

- **[Ramda](https://ramdajs.com/)** - A practical functional library that pioneered many of the patterns we use today
- **[FxJS](https://github.com/marpple/FxJS)** and **[FxTS](https://github.com/marpple/FxTS)** - Inspired by their exceptional combination of lazy evaluation and functional tooling patterns

We're deeply grateful for their influence. Our implementation explores different approaches using generator functions, the SideEffect pattern, and pipe-first composition.

## License

MIT
