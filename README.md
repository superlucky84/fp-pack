## fp-kit

**A practical, immutable-first functional toolkit for everyday JavaScript.**

fp-kit is a small, focused collection of functional programming utilities designed for real-world JavaScript applications.  
It emphasizes **immutability, purity, and clarity by default**, while remaining approachable for everyday developers.

There’s no framework, no hidden runtime, and no heavy abstractions—just well-chosen helpers that make functional style easier to adopt and maintain in production code.

---

## Why fp-kit?

- ✨ **Immutable by Default**  
  All helpers avoid in-place mutation and favor predictable, immutable transformations.

- 👥 **Designed for JavaScript Developers**  
  No academic FP concepts required. If you know arrays, objects, and functions, you’re good to go.

- 🎯 **Focused on Real Use Cases**  
  Covers the patterns you actually write every day—data transformation, composition, control flow, and safe defaults.

- 📘 **TypeScript-First**  
  Built with TypeScript from the ground up for strong inference and minimal annotation.

- 🪶 **Lightweight & Modular**  
  Zero dependencies, tree-shakeable modules, and a tiny footprint (~5KB).

---

## Design Principles

- **Immutable & Pure by default**  
  Core utilities are synchronous, deterministic, and side-effect free. Any exception is explicitly named (e.g. `tap`).

- **Small, explicit helpers**  
  Each function does one thing well. No magic behavior, no hidden control flow.

- **Async as an extension, not a foundation**  
  Common async patterns (`go`, `pipeAsync`, retries, timing helpers) are provided without turning fp-kit into a framework.

- **Iterable-friendly, not stream-centric**  
  Array helpers remain simple and eager.  
  Lazy / iterable helpers are provided *optionally* for advanced cases, without introducing custom stream abstractions.

## Installation

```bash
npm install fp-kit
# or
pnpm add fp-kit
# or
yarn add fp-kit
```

## Usage

```typescript
import { pipe, map, filter, curry } from 'fp-kit';

// Example: Function composition
const processNumbers = pipe(
  filter((n: number) => n > 0),
  map((n: number) => n * 2),
  sum
);

// Example: Currying
const add = curry((a: number, b: number) => a + b);
const add10 = add(10);
console.log(add10(5)); // 15
```

## API Reference

### Composition

Functions for composing and transforming other functions.

- **pipe** - Compose functions left to right (f → g → h)
- **compose** - Compose functions right to left (h → g → f)
- **curry** - Transform a function to support partial application
- **partial** - Pre-fill function arguments
- **flip** - Reverse the order of function arguments
- **identity** - Return input unchanged
- **constant** - Always return the same value
- **tap** - Execute side effects without changing the value
- **once** - Create a function that only executes once
- **memoize** - Cache function results for same inputs

### Control Flow

Functions for conditional logic and flow control.

- **ifElse** - Execute different functions based on a condition
- **when** - Apply function only when condition is true
- **unless** - Apply function only when condition is false
- **cond** - Multi-way conditional branching (switch alternative)
- **tryCatch** - Handle exceptions functionally
- **guard** - Early return with default value on condition failure

### Array

Functions for working with arrays and iterables.

- **map** - Transform each element
- **filter** - Select elements matching a predicate
- **reduce** - Accumulate values into a single result
- **flatMap** - Map then flatten the result
- **find** - Get first element matching predicate
- **some** - Check if at least one element matches
- **every** - Check if all elements match
- **take** - Take first n elements
- **drop** - Skip first n elements
- **chunk** - Split array into chunks of specified size
- **zip** - Combine two arrays into pairs
- **unzip** - Split array of pairs into two arrays
- **zipIndex** - Pair each element with its index
- **uniq** - Remove duplicate values
- **uniqBy** - Remove duplicates by comparison function
- **sortBy** - Sort by comparison function
- **groupBy** - Group elements by key function

### Object

Functions for working with objects and records.

- **prop** - Safely access object property
- **path** - Safely access nested property path
- **pick** - Select specified properties
- **omit** - Remove specified properties
- **assoc** - Set property immutably
- **dissoc** - Remove property immutably
- **merge** - Shallow merge objects
- **mergeDeep** - Deep merge objects
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
- **isNil** - Check if value is null or undefined
- **isEmpty** - Check if value is empty
- **isType** - Check value type
- **includes** - Check containment (string) or deep equality in arrays
- **gt** - Greater than comparison
- **gte** - Greater than or equal comparison
- **lt** - Less than comparison
- **lte** - Less than or equal comparison
- **clamp** - Constrain value within range

### Math

Mathematical operations and utilities.

- **add** - Addition
- **sub** - Subtraction
- **mul** - Multiplication
- **div** - Division
- **sum** - Sum of array elements
- **mean** - Average of array elements
- **min** - Minimum value in array
- **max** - Maximum value in array
- **round** - Round to nearest integer
- **floor** - Round down
- **ceil** - Round up
- **randomInt** - Random integer in range

### String

Functions for string manipulation.

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

- **pipeAsync** - Compose async functions
- **delay** - Wait for specified milliseconds
- **timeout** - Execute promise with timeout limit
- **retry** - Retry failed operations
- **debounce** - Debounce function calls
- **throttle** - Throttle function calls

### Maybe / Result

Functions for handling nullable values and errors.

- **maybe** - Safely transform nullable values
- **mapMaybe** - Apply function only if value exists
- **getOrElse** - Get value or return default
- **result** - Wrap operation in Result type
- **mapResult** - Transform successful result
- **unwrap** - Safely unwrap value with default
- **fold** - Handle both Some and None cases

### Debug

Functions for debugging and development.

- **assert** - Assert condition with error message
- **invariant** - Check invariant contracts
- **log** - Log value and pass through

## What You Get

- 🔧 **96 Utility Functions** - Organized into 10 practical categories
- 🎨 **Composable Design** - Built for pipes, currying, and function composition
- 📦 **Modern Builds** - ESM and UMD formats for any environment
- 🌳 **Tree-Shakeable** - Import only what you need
- ⚡ **Zero Dependencies** - No bloat, just pure JavaScript/TypeScript

## Development

```bash
# Install dependencies
pnpm install

# Build library
pnpm build

# Run dev server
pnpm dev
```

## License

MIT
