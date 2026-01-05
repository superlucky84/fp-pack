import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const TypeUsage = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      Type Usage Guide
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Leverage fp-pack's helper types to maintain type inference when composing, currying, or building custom utilities
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What are Type Helpers?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack exposes a carefully selected set of public TypeScript helper types that enable you to preserve type inference throughout your functional compositions. These types are designed to work seamlessly with the library's utilities while keeping your code type-safe and maintainable.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      By using <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">import type</code>, these helpers add zero runtime overhead to your bundles while providing robust compile-time guarantees. This guide will walk you through each helper type and show you practical use cases.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Quick Import Reference
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      All type helpers are available as type-only imports from fp-pack. Use <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">import type</code> to ensure they don't add to your runtime bundle size.
    </p>

    <CodeBlock
      language="typescript"
      code={`// Core type helpers
import type { Curried, Curry3, FromFn, MatchHandlers, PathKey } from 'fp-pack';

// Stream type helpers
import type { AnyIterable, AnyIterableInput, PromiseLikeValue } from 'fp-pack/stream';`}
    />

    <div class="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        💡 Type Declaration Files Location
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
        When you need to inspect the generated type declarations directly, you can find them at these paths:
      </p>
      <CodeBlock
        language="text"
        code={`# After package installation
node_modules/fp-pack/dist/index.d.ts
node_modules/fp-pack/dist/stream/index.d.ts

# After building from repository
dist/index.d.ts
dist/stream/index.d.ts`}
      />
      <p class="text-xs text-blue-700 dark:text-blue-300 mt-4">
        These paths are build outputs and may vary slightly between versions.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Curried Function Types
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      When working with curried functions, fp-pack provides specialized types to maintain full type inference across all partial application steps. The <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Curried</code> type works with any function, while specific types like <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Curry3</code> provide optimized inference for functions with a known arity.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Basic Curried Type Usage
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';
import type { Curried, Curry3 } from 'fp-pack';

// Original function with 3 parameters
const add3 = (a: number, b: number, c: number) => a + b + c;

// Using generic Curried type
const curriedAdd3: Curried<typeof add3> = curry(add3);

// Using specific Curry3 type for better inference
const curriedAdd3Alt: Curry3<typeof add3> = curry(add3);

// All of these work with full type safety
const result1 = curriedAdd3(1)(2)(3);     // number
const result2 = curriedAdd3(1, 2)(3);      // number
const result3 = curriedAdd3Alt(1)(2, 3);   // number`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Building Reusable Utilities
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry, pipe } from 'fp-pack';
import type { Curried } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
}

// Create a curried filter function
const filterBy = <T>(
  predicate: (item: T) => boolean,
  items: T[]
): T[] => items.filter(predicate);

const curriedFilter: Curried<typeof filterBy> = curry(filterBy);

// Partially apply to create specialized filters
const filterUsers = curriedFilter<User>((user) => user.id > 100);

const users: User[] = [
  { id: 101, name: 'Alice', email: 'alice@example.com' },
  { id: 99, name: 'Bob', email: 'bob@example.com' },
  { id: 150, name: 'Charlie', email: 'charlie@example.com' },
];

const filteredUsers = filterUsers(users);
// Type: User[]
// Result: [{ id: 101, ... }, { id: 150, ... }]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      from-Based Pipeline Types
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">FromFn</code> type represents functions created with the <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">from</code> utility. When used as the first function in a pipeline, it allows the pipeline to be called without an initial input value, enabling cleaner data-first patterns.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Basic from Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { from, pipe } from 'fp-pack';
import type { FromFn } from 'fp-pack';

// Create a from function with explicit typing
const startWith5: FromFn<number> = from(5);

// Build a pipeline that starts with this value
const calculate = pipe(
  startWith5,
  (n) => n * 2,      // 10
  (n) => n + 3       // 13
);

// Can be called without input!
const result = calculate();  // 13

// Or with input (which will be ignored)
const result2 = calculate(999);  // Still 13`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      from with SideEffect Pipelines
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { from, pipeSideEffectStrict, SideEffect } from 'fp-pack';
import type { FromFn } from 'fp-pack';

// Start with a fixed configuration value
const defaultConfig: FromFn<{ threshold: number }> = from({ threshold: 10 });

const validateAndProcess = pipeSideEffectStrict(
  defaultConfig,
  (config) => config.threshold,
  (threshold) => threshold * 2,
  (value) => {
    if (value < 15) {
      return SideEffect.of(() => 'TOO_LOW' as const);
    }
    return value;
  }
);

// Execute the pipeline
const result = validateAndProcess();
// Type: number | SideEffect<'TOO_LOW'>
// Result: 20

// Handle the result
const finalValue = result instanceof SideEffect
  ? 0
  : result;  // 20`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Stream Input Types
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack's stream module provides flexible type helpers for working with synchronous and asynchronous iterables. These types enable you to write functions that accept multiple input formats while maintaining type safety.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      AnyIterableInput for Flexible Input
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { toAsync } from 'fp-pack/stream';
import type { AnyIterableInput, PromiseLikeValue } from 'fp-pack/stream';

// Accept any form of iterable input
async function normalize<T>(
  input: AnyIterableInput<PromiseLikeValue<T>>
): Promise<T[]> {
  const result: T[] = [];

  // toAsync handles all input types uniformly
  for await (const item of toAsync(input)) {
    result.push(item);
  }

  return result;
}

// Works with arrays
const arr = await normalize([1, 2, 3]);  // number[]

// Works with promises of arrays
const promiseArr = await normalize(Promise.resolve([4, 5, 6]));  // number[]

// Works with async generators
async function* generateNumbers() {
  yield 7;
  yield 8;
  yield 9;
}
const asyncGen = await normalize(generateNumbers());  // number[]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      AnyIterable for Return Types
    </h3>

    <CodeBlock
      language="typescript"
      code={`import type { AnyIterable } from 'fp-pack/stream';

// Function that can return either sync or async iterable
function createNumberStream(async: boolean): AnyIterable<number> {
  if (async) {
    // Return async iterable
    return (async function* () {
      yield 1;
      yield 2;
      yield 3;
    })();
  } else {
    // Return sync iterable
    return (function* () {
      yield 1;
      yield 2;
      yield 3;
    })();
  }
}

// Consumer doesn't need to know which type
async function consumeStream(stream: AnyIterable<number>) {
  for await (const num of stream) {
    console.log(num);
  }
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Object Path Types
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">PathKey</code> type represents valid keys for accessing nested object properties. It can be a string, number, or symbol, making it perfect for deep property access and manipulation.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Using PathKey with path and assocPath
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assocPath, path } from 'fp-pack';
import type { PathKey } from 'fp-pack';

interface Database {
  users: Array<{
    id: number;
    name: string;
    settings: {
      theme: string;
      notifications: boolean;
    };
  }>;
}

const db: Database = {
  users: [
    {
      id: 1,
      name: 'Alice',
      settings: { theme: 'dark', notifications: true }
    }
  ]
};

// Define a type-safe path
const themePath: PathKey[] = ['users', 0, 'settings', 'theme'];

// Read a nested value
const currentTheme = path<string>(themePath, db);
console.log(currentTheme);  // 'dark'

// Update a nested value immutably
const updatedDb = assocPath(themePath, 'light', db);
console.log(path<string>(themePath, updatedDb));  // 'light'
console.log(path<string>(themePath, db));  // 'dark' (original unchanged)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Building Reusable Path Utilities
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { path, assocPath, curry } from 'fp-pack';
import type { PathKey } from 'fp-pack';

// Create a path builder utility
function buildPath(...keys: PathKey[]): PathKey[] {
  return keys;
}

// Define common paths
const userNamePath = buildPath('users', 0, 'name');
const userSettingsPath = buildPath('users', 0, 'settings');
const userThemePath = buildPath('users', 0, 'settings', 'theme');

// Create curried accessors
const getName = curry(path<string>)(userNamePath);
const getTheme = curry(path<string>)(userThemePath);

const db = {
  users: [
    {
      name: 'Bob',
      settings: { theme: 'dark', notifications: false }
    }
  ]
};

console.log(getName(db));   // 'Bob'
console.log(getTheme(db));  // 'dark'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect Handler Types
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">MatchHandlers</code> type ensures type-safe handling of union types that may contain <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">SideEffect</code> values. It provides a structured way to handle both value and effect cases.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Basic matchSideEffect Usage
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { matchSideEffect, SideEffect } from 'fp-pack';
import type { MatchHandlers } from 'fp-pack';

type ValidationResult = number | SideEffect<'INVALID' | 'TOO_LOW' | 'TOO_HIGH'>;

function validate(input: string): ValidationResult {
  const num = parseInt(input, 10);

  if (isNaN(num)) {
    return SideEffect.of(() => 'INVALID' as const);
  }
  if (num < 0) {
    return SideEffect.of(() => 'TOO_LOW' as const);
  }
  if (num > 100) {
    return SideEffect.of(() => 'TOO_HIGH' as const);
  }

  return num;
}

// Define handlers with explicit typing
const handlers: MatchHandlers<number, 'INVALID' | 'TOO_LOW' | 'TOO_HIGH', string> = {
  value: (num) => \`Valid: \${num}\`,
  effect: (eff) => \`Error: \${eff.label ?? 'UNKNOWN'}\`
};

// Use matchSideEffect to handle both cases
const result1 = validate('42');
console.log(matchSideEffect(result1, handlers));  // 'Valid: 42'

const result2 = validate('-5');
console.log(matchSideEffect(result2, handlers));  // 'Error: TOO_LOW'

const result3 = validate('abc');
console.log(matchSideEffect(result3, handlers));  // 'Error: INVALID'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Advanced Handler Patterns
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { matchSideEffect, SideEffect, pipe } from 'fp-pack';
import type { MatchHandlers } from 'fp-pack';

type ApiResponse<T> = T | SideEffect<'NETWORK_ERROR' | 'NOT_FOUND' | 'UNAUTHORIZED'>;

interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number): ApiResponse<User> {
  if (id < 0) {
    return SideEffect.of(() => 'UNAUTHORIZED' as const);
  }
  if (id > 1000) {
    return SideEffect.of(() => 'NOT_FOUND' as const);
  }

  return {
    id,
    name: \`User \${id}\`,
    email: \`user\${id}@example.com\`
  };
}

// Create different handlers for different scenarios
const logHandlers: MatchHandlers<User, string, void> = {
  value: (user) => console.log(\`Found user: \${user.name}\`),
  effect: (eff) => console.error(\`Error: \${eff.label}\`)
};

const mapToNameHandlers: MatchHandlers<User, string, string> = {
  value: (user) => user.name,
  effect: (eff) => \`Error: \${eff.label ?? 'UNKNOWN'}\`
};

const response1 = fetchUser(42);
matchSideEffect(response1, logHandlers);  // Logs: 'Found user: User 42'

const response2 = fetchUser(9999);
const userName = matchSideEffect(response2, mapToNameHandlers);
console.log(userName);  // 'Error: NOT_FOUND'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use Type Helpers?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Zero Runtime Cost
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Type helpers are compile-time only constructs that add no code to your final bundle, ensuring optimal performance while maintaining type safety.
        </p>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
          Better IDE Support
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Explicit type annotations provide superior autocomplete, inline documentation, and error messages in your development environment.
        </p>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          Preserved Inference
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          Type helpers ensure that TypeScript can track types through complex compositions, currying, and transformations without losing precision.
        </p>
      </div>

      <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          Reusable Patterns
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          Document and standardize common patterns in your codebase by using explicit type helpers as contracts for your functions and utilities.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Documentation
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          curry
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Learn about currying and data-last patterns with practical examples.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/from');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          from
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Initialize pipelines with fixed values for cleaner functional composition.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/toAsync');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          toAsync
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Convert any iterable input to async iterables for uniform processing.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-pink-400 dark:hover:border-pink-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/guide');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Detailed Guide
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Comprehensive guide to fp-pack concepts and patterns.
        </p>
      </div>
    </div>
  </div>
);
