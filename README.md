<div align="center">
  <img src="https://superlucky84.github.io/fp-pack/fp.png" alt="fp-pack" width="200" />

  # fp-pack

  **A practical functional toolkit for JavaScript and TypeScript.**
</div>

The core philosophy of `fp-pack` is simple: **if you know functions, pipes, and currying, you're ready to use it.** It's a pipe-first toolkit for everyday code—approachable, zero-deps, and tree-shakeable.

**No complex monads. No wrapper ceremony.** Just plain functions that compose naturally, with an optional `SideEffect` pattern for early exits and error handling.

At a glance:
- **Composition-first** APIs centered around `pipe` / `pipeAsync`.
- **TypeScript-native** utilities with strong inference (pipelines often work without manual type annotations).
- **SideEffect pattern** for early exits and error handling — write normal functions, mark exceptional paths with `SideEffect.of()`, and let the pipeline handle the rest. No monad wrappers required.

If you want functional composition without a lot of ceremony, `fp-pack` is designed to be a practical starting point that still scales to larger codebases.

---

> **⚠️ Project Status**
>
> fp-pack is actively evolving as we refine its functional patterns in TypeScript. The core API is stable enough for daily use, but some edges may change as we improve the design.

---

<div align="center">

### 📚 [**Full Documentation**](https://superlucky84.github.io/fp-pack/)

</div>

---

## Table of Contents

- [Why fp-pack?](#why-fp-pack)
- [Design Principles](#design-principles)
- [Installation](#installation)
- [AI Agent Skills (Optional)](#ai-agent-skills-optional)
- [Quick Start](#quick-start)
  - [Basic Pipe Composition](#basic-pipe-composition)
  - [Async Operations with pipeAsync](#async-operations-with-pipeasync)
  - [Object Transformation](#object-transformation)
  - [Lazy Stream Processing](#lazy-stream-processing)
- [Custom Utility Authoring Guide](#custom-utility-authoring-guide-for-pipe)
- [API Reference](#api-reference)
  - [Composition](#composition)
  - [Control Flow](#control-flow)
  - [Array](#array)
  - [Object](#object)
  - [Equality & Comparison](#equality--comparison)
  - [Math](#math)
  - [String](#string)
  - [Async](#async)
  - [Stream (Lazy Iterables)](#stream-lazy-iterables)
  - [Nullable](#nullable)
  - [Debug](#debug)
- [Key Concepts](#key-concepts)
  - [SideEffect Pattern](#sideeffect-pattern)
  - [Pipe vs PipeAsync](#pipe-vs-pipeasync)
  - [SideEffect Composition Rule](#sideeffect-composition-rule)
  - [Stream vs Array](#stream-vs-array)
- [What You Get](#what-you-get)
- [Import Paths](#import-paths)
- [Development](#development)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

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

- **DX-optimized type inference**
  **"Don't let strictness hinder inference."** fp-pack's standard `pipe` prioritizes **global type stability** over local constraints at connection points. The inference chain, designed without `NoInfer`, lets TypeScript derive perfect result types at the end of your pipeline—even without manual annotations. This **"Global Stability"** approach means you write less, TypeScript infers more, and your pipelines just work.

  Works best in value-first pipelines where the input anchors generics. Function-first or from-start pipelines may need `pipeHint` or a small wrapper.

  When users inappropriately use explicit type annotations, TypeScript's natural inference benefits are reduced, and in some edge cases intermediate type mismatches may be allowed to keep the pipeline flowing. When you need stricter mismatch detection, use `pipeStrict`/`pipeAsyncStrict`; for maximum inference power with minimal friction, stick to `pipe`/`pipeAsync`. → **[Pipe Choice Guide](https://superlucky84.github.io/fp-pack/#/ko/guide/pipe-choice-guide)**

- **Pragmatic error handling**
  The `SideEffect` pattern handles errors declaratively in `pipeSideEffect`/`pipeAsyncSideEffect` and short-circuits on `SideEffect`, so you can keep normal functions.
  For strict union typing across branches, use `pipeSideEffectStrict` / `pipeAsyncSideEffectStrict`.

  **Usage notes:**
  - Call `runPipeResult`/`matchSideEffect` **outside** the pipeline.
  - After `isSideEffect`, `runPipeResult` returns the effect type; if widened (e.g. `SideEffect<any>`), pass generics to recover a safe union.

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

- **Hybrid data-first / data-last**
  `pipe`/`pipeAsync` accept either functions-first (returns a reusable function) or value-first (executes immediately). Value-first improves inference because the first value anchors generics. If the first argument is a function, it is treated as composition; wrap function values with `from` when you need to pass them as data. Use `from` to inject constants (e.g., in `ifElse`/`cond`) or to start a pipeline without input.

  ```typescript
  import { pipe, ifElse, from, filter, map } from 'fp-pack';

  // Use from to return constant values in conditional branches
  const getStatusLabel = ifElse(
    (score: number) => score >= 60,
    from('pass'),    // Constant value instead of (score) => 'pass'
    from('fail')
  );

  const result = getStatusLabel(75); // 'pass'

  // Start a pipeline without input
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

### AI Agent Role Add-on (Global)

For agents with system prompt support (OpenCode, custom agents), fp-pack provides a **reusable behavior module** that conditionally enforces fp-pack patterns when fp-pack is detected in the project.

Unlike skills files which are project-specific, this add-on is attached directly to your agent's system prompt, making it work across all your projects. It automatically activates only when fp-pack is installed.

📖 **[View AI Agent Role Add-on Documentation](https://superlucky84.github.io/fp-pack/#/ai-agent-addon)**

The add-on is located at `node_modules/fp-pack/dist/ai-addons/fp-pack-agent-addon.md` after installation.

## Quick Start

### Basic Pipe Composition

`pipe` composes functions left-to-right. Use functions-first to create a reusable pipeline, or value-first to execute immediately (value-first often improves type inference because the input anchors generics).

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

**Data-first invocation (recommended for inference)**: Pass the input as the first argument to execute immediately.

```typescript
import { pipe, filter, map } from 'fp-pack';

const result = pipe(
  [1, 2, 3, 4, 5],
  filter((n: number) => n % 2 === 0),
  map(n => n * 2)
); // [4, 8]
```

**Constant values with `from` (optional)**: Use `from` to inject constants into pipelines or to start a pipeline with no input.

```typescript
import { pipe, from, filter, map } from 'fp-pack';

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

Need stricter mismatch detection? Use `pipeAsyncStrict`.

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

## API Reference

### Composition

Functions for composing and transforming other functions.

- **pipe** - Compose functions left to right (f → g → h)
- **pipeStrict** - Strict typing for pure pipelines
- **pipeWithDeps** - Bind dependencies once and inject them into pipeline steps
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
- **tap0** - Execute side effects without input
- **once** - Create a function that only executes once
- **memoize** - Cache function results for same inputs
- **SideEffect** - Side effect container for SideEffect-aware pipelines
- **isSideEffect** - Type guard for runtime checking whether a value is a SideEffect
- **matchSideEffect** - Pattern match on value or SideEffect
- **runPipeResult** - Execute SideEffect or return value (call OUTSIDE pipelines). If the input is widened to `SideEffect<any>`/`any`, the result becomes `any`; provide explicit type parameters `runPipeResult<SuccessType, ErrorType>` to recover a safe union. When the input is narrowed to `SideEffect<R>` (e.g. after `isSideEffect`), `runPipeResult` returns `R`. Use `isSideEffect` for precise type narrowing.

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
- **pipeAsyncStrict** - Strict typing for async pipelines
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
import { pipeSideEffect, pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const processNumbers = pipeSideEffect(
  (nums: number[]) => nums.filter(n => n % 2 === 1),
  (odds) => odds.length > 0
    ? odds
    : SideEffect.of(() => 'No odd numbers found'),
  (odds) => odds.map(n => n * 2)
);

const oddsDoubled = processNumbers([1, 2, 3, 4, 5]);

// ✅ CORRECT: Use isSideEffect for type checking
if (!isSideEffect(oddsDoubled)) {
  // TypeScript knows: oddsDoubled is number[]
  const sum: number = oddsDoubled.reduce((a, b) => a + b, 0);
  console.log(`Sum: ${sum}`);  // sum: number
} else {
  // pipeSideEffect widens SideEffect to any, so runPipeResult becomes any here
  const error = runPipeResult(oddsDoubled);
  console.log(`Error: ${error}`);  // error: any
}

// ✅ If you have a precise SideEffect type, runPipeResult returns the effect type
const strictResult = pipeSideEffectStrict(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'LOW' as const))
)(-1);

if (isSideEffect(strictResult)) {
  const error = runPipeResult(strictResult);
  // error: 'LOW'
}

// ⚠️ If the result type is widened, inference is lost
const widened: number[] | SideEffect<any> = oddsDoubled;
const unsafeResult = runPipeResult(widened);  // result: any

// ✅ CORRECT: Provide generics to recover a safe union
const safeResult = runPipeResult<number[], string>(oddsDoubled);  // result: number[] | string (union type - safe but not narrowed)
```

**⚠️ CRITICAL: runPipeResult Type Safety**

`runPipeResult<T, R=any>` has a default type parameter `R=any`. This means:

- ✅ **Precise input types**: `T | SideEffect<'E'>` preserves `T | 'E'` without extra annotations.
- ⚠️ **Widened inputs**: `T | SideEffect<any>` (or `any`) collapses to `any`.
- ✅ **With generics**: `runPipeResult<SuccessType, ErrorType>(result)` restores a safe union when inference is lost.
- ✅ **After narrowing**: If the input is `SideEffect<'E'>` (e.g. inside `if (isSideEffect(...))`), `runPipeResult` returns `'E'`.
- ✅ **With isSideEffect**: Use for runtime checking and precise narrowing.

Provide generics when inference is lost; prefer `isSideEffect` for precise narrowing.

### Pipe vs PipeAsync

**Default choice: Start with `pipe` / `pipeAsync`**

Most data transformations are pure and don't need SideEffect handling. Use `pipe` for sync operations and `pipeAsync` for async operations. **Only switch to SideEffect-aware pipes when you actually need** early termination or error handling with side effects.

**Pure Pipelines:**
- **`pipe`** - Synchronous, **pure** transformations (99% of cases) - **DX-optimized** for global type inference
- **`pipeStrict`** - Sync pipe with stricter type checking (catches mismatches earlier at connection points)
- **`pipeAsync`** - Async, **pure** transformations (99% of cases) - **DX-optimized** for global type inference
- **`pipeAsyncStrict`** - Async pipe with stricter type checking

**SideEffect-Aware Pipelines:**
- **`pipeSideEffect`** - **Only when you need** SideEffect short-circuiting (sync)
- **`pipeSideEffectStrict`** - Sync SideEffect pipelines with strict effect unions
- **`pipeAsyncSideEffect`** - **Only when you need** SideEffect short-circuiting (async)
- **`pipeAsyncSideEffectStrict`** - Async SideEffect pipelines with strict effect unions

**Important:**
- `pipe` and `pipeAsync` are for **pure** functions only—they don't handle `SideEffect`. If your pipeline can return `SideEffect`, use `pipeSideEffect` or `pipeAsyncSideEffect` instead.
- **Inference vs Strictness trade-off**: Standard `pipe`/`pipeAsync` prioritize **global type stability** (TypeScript infers the final result perfectly without manual annotations). Strict variants (`pipeStrict`, `pipeAsyncStrict`) catch type mismatches earlier but may require more type hints. Choose based on your needs: maximum inference power (standard) vs early error detection (strict).

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
- **[Remeda](https://remedajs.com/)** - Strongly influential TypeScript-first utility patterns and ergonomics
- **[lodash/fp](https://lodash.com/docs/4.17.15#fp)** - Data-last, auto-curried utility style for functional composition
- **[fp-ts](https://gcanti.github.io/fp-ts/)** - Advanced functional abstractions (e.g. Reader patterns) that influenced parts of this project
- **[Rambda](https://github.com/selfrefactor/rambda)** - Lightweight Ramda-inspired functional utilities
- **[FxJS](https://github.com/marpple/FxJS)** and **[FxTS](https://github.com/marpple/FxTS)** - Inspired by their exceptional combination of lazy evaluation and functional tooling patterns

## License

MIT
