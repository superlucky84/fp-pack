# fp-kit

A lightweight functional programming utilities library for TypeScript.

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
- **gt** - Greater than comparison
- **gte** - Greater than or equal comparison
- **lt** - Less than comparison
- **lte** - Less than or equal comparison
- **clamp** - Constrain value within range

### Math

Mathematical operations and utilities.

- **add** - Curried addition
- **sub** - Curried subtraction
- **mul** - Curried multiplication
- **div** - Curried division
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
- **includes** - Check if string contains substring
- **match** - Match string against regex

### Async

Functions for asynchronous operations.

- **go** - Execute async pipeline sequentially
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

- **trace** - Log intermediate values in pipeline
- **assert** - Assert condition with error message
- **invariant** - Check invariant contracts
- **log** - Log value and pass through

## Features

- 🎯 **100% TypeScript** - Full type safety with excellent inference
- 🪶 **Lightweight** - Tree-shakeable, only ~5KB minified
- 🔧 **Functional** - Immutable, pure functions, curried APIs
- 📦 **Modern** - ESM and UMD builds included
- 🎨 **Composable** - Designed for function composition and pipelines

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
