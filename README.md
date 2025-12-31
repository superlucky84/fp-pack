# fp-kit

**A practical functional toolkit for JavaScript and TypeScript.**

Written in TypeScript with full type safety, fp-kit works seamlessly in both JavaScript and TypeScript projects.

fp-kit is a focused collection of functional programming utilities designed for real-world applications.
It emphasizes **function composition, immutability, and declarative code** through `pipe` and `pipeAsync`, while remaining approachable for everyday developers.

There's no framework and no heavy abstractions—just well-chosen helpers that make functional style easier to adopt and maintain in production code.

---

## Why fp-kit?

- 🔄 **Pipe-First Philosophy**
  Built around `pipe` and `pipeAsync` for clean, left-to-right function composition.

- ⚡ **SideEffect Pattern**
  Handle errors and side effects declaratively in SideEffect-aware pipelines. Use `pipeSideEffect` / `pipeAsyncSideEffect` to short-circuit on `SideEffect` without breaking composition. Focus on business logic, not error plumbing.

- 💧 **Lazy Stream Processing**
  Efficient iterable processing with `stream/*` functions for memory-conscious operations on large datasets.

- 📘 **JavaScript & TypeScript**
  Works seamlessly in JavaScript. Written in TypeScript for robust type inference when you need it.

- 🎯 **Practical & Production-Ready**
  Covers the patterns you write every day—data transformation, composition, control flow, and async operations.

- 🪶 **Lightweight & Modular**
  Zero dependencies and tree-shakeable modules.

---

## Design Principles

- **Pipe-centric composition**
  `pipe` (sync) and `pipeAsync` (async) are the primary composition tools. All utilities are designed to work seamlessly in pipe chains.

- **Pragmatic error handling**
  The `SideEffect` pattern handles errors and side effects declaratively in `pipeSideEffect`/`pipeAsyncSideEffect` pipelines. Write normal functions that compose naturally—these pipelines automatically short-circuit when they encounter a `SideEffect`, eliminating the need for wrapper types everywhere.

- **Immutable & Pure by default**
  Core utilities avoid mutations and side effects. Any exception is explicitly named (e.g. `tap`, `log`).

- **Lazy evaluation when needed**
  Array helpers are eager and simple. Stream helpers (`stream/*`) provide lazy, memory-efficient alternatives for large datasets.

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

## Installation

```bash
npm install fp-kit
# or
pnpm add fp-kit
# or
yarn add fp-kit
```

## AI Agent Skills (Optional)

fp-kit includes an AI agent skills file that helps AI coding assistants (Claude Code, GitHub Copilot, Cursor, etc.) automatically write fp-kit-style functional code.

When you have this skills file in your project, AI assistants will:
- Default to using `pipe`/`pipeAsync` for pure transformations, and `pipeSideEffect`/`pipeAsyncSideEffect` when SideEffect is involved
- Use the `SideEffect` pattern instead of try-catch
- Prefer `stream/*` functions for large datasets
- Write declarative, functional code using fp-kit utilities

### Setup for Claude Code

Copy the skills file to your project's `.claude/skills/` directory:

```bash
# Unix/macOS/Linux
cp node_modules/fp-kit/dist/skills/fp-kit.md .claude/skills/

# Windows (PowerShell)
Copy-Item node_modules/fp-kit/dist/skills/fp-kit.md .claude/skills/

# Or manually create the directory and copy
mkdir -p .claude/skills
cp node_modules/fp-kit/dist/skills/fp-kit.md .claude/skills/
```

Once configured, AI assistants will automatically apply fp-kit coding patterns when helping you write code.

> **Note:** The skills file is located at `node_modules/fp-kit/dist/skills/fp-kit.md` after installation. You can also view it in the [GitHub repository](https://github.com/yourusername/fp-kit/blob/main/fp-kit.md).

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
import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        alert('Must be 18 or older');
        return null;
      });

const result = pipeSideEffect(
  validateAge,
  (age) => `Age: ${age}`,
  (msg) => console.log(msg),
  runPipeResult
)(15);
// Pipeline stops at SideEffect, alert executes, returns null
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
- **pipeSideEffect** - Compose functions left to right with SideEffect short-circuiting
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
- **SideEffect** - Side effect container for SideEffect-aware pipelines
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

**The SideEffect solution:** Write normal functions that compose naturally. When you need to terminate early (validation failure, missing data, errors), return `SideEffect.of(() => ...)`. `pipeSideEffect`/`pipeAsyncSideEffect` pipelines automatically stop—no ceremony, no wrappers, no plumbing.

```typescript
import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

// Optional chaining pattern - return null to gracefully terminate
const findUser = (id: string) => {
  const user = database.get(id);
  return user ? user : SideEffect.of(() => null);
};

const email = pipeSideEffect(
  findUser,
  (user) => user.email,        // Skipped if user not found
  (email) => email.toLowerCase(),
  runPipeResult
)('unknown-id');
// Returns null without errors - clean optional flow

// Practical: User notification flow
const result = pipeSideEffect(
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
  (receipt) => ({ success: true, receipt }),
  runPipeResult
)(userCard);
// If balance insufficient: shows toast, logs event, returns null
// Otherwise: completes payment and returns success object
```

**Key benefits:**
- Write normal functions—no wrapper types
- Mark exceptional paths explicitly with `SideEffect.of()`
- `pipeSideEffect`/`pipeAsyncSideEffect` automatically short-circuit on `SideEffect`
- Handle effects once at the end with `runPipeResult`
- Focus on business logic, not error infrastructure

### Pipe vs PipeAsync

- Use **`pipe`** for synchronous transformations
- Use **`pipeAsync`** when ANY step involves Promises or AsyncIterables
- Use **`pipeSideEffect`** / **`pipeAsyncSideEffect`** when SideEffect short-circuiting is required

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

## Acknowledgements

fp-kit was inspired by and learned from excellent functional programming libraries in the JavaScript ecosystem:

- **[Ramda](https://ramdajs.com/)** - A practical functional library that pioneered many of the patterns we use today
- **[FxTS](https://github.com/marpple/FxTS)** - TypeScript library whose AsyncIterable implementation and stream processing architecture heavily influenced our design
- **[FxJS](https://github.com/marpple/FxJS)** - JavaScript functional library that demonstrated practical lazy evaluation patterns

While fp-kit's implementation approaches differ (using generator functions, the SideEffect pattern, and pipe-first composition), we're deeply grateful for the influence these projects had on functional programming in JavaScript.

## License

MIT
