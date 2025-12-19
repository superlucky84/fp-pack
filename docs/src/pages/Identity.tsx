import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Identity = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      identity
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Returns the input value unchanged
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is identity?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        identity
      </strong>{' '}
      is the simplest function in functional programming: it takes a value and returns it unchanged.
      <br />
      <br />
      While it may seem trivial, identity is fundamental to many functional patterns.
      It serves as a <strong>neutral element</strong> in composition, a default transformer,
      and a building block for more complex operations.
      <br />
      <br />
      Think of identity as the "do nothing" function that's surprisingly useful in practice.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

identity(5);        // 5
identity('hello');  // 'hello'
identity([1, 2]);   // [1, 2]

const obj = { a: 1 };
identity(obj) === obj;  // true (same reference)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use identity?
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      1. Default Transformation
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      When you need a transformation function but want to keep values unchanged:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

// Conditional transformation
function processData<T>(
  data: T[],
  transform: (x: T) => T = identity
): T[] {
  return data.map(transform);
}

const numbers = [1, 2, 3];

// With transformation
processData(numbers, n => n * 2);  // [2, 4, 6]

// Without transformation (uses identity as default)
processData(numbers);  // [1, 2, 3]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      2. Neutral Element in Composition
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      identity acts as a neutral element with compose and pipe:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { compose, pipe, identity } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;

// identity doesn't affect the pipeline
pipe(identity, double, addTen)(5);       // 20
pipe(double, identity, addTen)(5);       // 20
pipe(double, addTen, identity)(5);       // 20

// Useful when conditionally including transformations
const transforms = condition
  ? [double, addTen]
  : [identity];  // No-op when condition is false

pipe(...transforms)(5);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      3. Placeholder in Higher-Order Functions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

// Extract values from nested structures
interface User {
  id: number;
  profile?: {
    name: string;
  };
}

const users: User[] = [
  { id: 1, profile: { name: 'Alice' } },
  { id: 2, profile: { name: 'Bob' } },
];

// Get profiles, keeping structure
users.map(u => u.profile);  // Extract profiles

// When you want to keep the whole object
users.map(identity);  // Same as [...users]

// Filter with identity as predicate (removes falsy values)
[0, 1, '', 'hello', null, 42].filter(identity);  // [1, 'hello', 42]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Conditional Pipelines
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, identity } from 'fp-kit';

interface Options {
  uppercase?: boolean;
  trim?: boolean;
  reverse?: boolean;
}

function processString(str: string, options: Options = {}) {
  return pipe(
    options.trim ? (s: string) => s.trim() : identity,
    options.uppercase ? (s: string) => s.toUpperCase() : identity,
    options.reverse ? (s: string) => s.split('').reverse().join('') : identity
  )(str);
}

processString('  hello  ', { uppercase: true, trim: true });
// "HELLO"

processString('  hello  ', {});
// "  hello  " (no transformations)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Fallback Transformations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

interface Config<T> {
  data: T[];
  transform?: (x: T) => T;
  filter?: (x: T) => boolean;
}

function processItems<T>(config: Config<T>): T[] {
  const transform = config.transform || identity;
  const filter = config.filter || (() => true);

  return config.data
    .filter(filter)
    .map(transform);
}

const numbers = [1, 2, 3, 4, 5];

// With transformations
processItems({
  data: numbers,
  transform: n => n * 2,
  filter: n => n > 2
});  // [6, 8, 10]

// Without transformations (uses identity)
processItems({ data: numbers });  // [1, 2, 3, 4, 5]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Monadic Operations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

// flatMap with identity flattens one level
const nested = [[1, 2], [3, 4], [5]];
nested.flatMap(identity);  // [1, 2, 3, 4, 5]

// Compared to map (which keeps nesting)
nested.map(identity);  // [[1, 2], [3, 4], [5]]

// Chain optional operations
type Optional<T> = T | null | undefined;

function flatMapOptional<T, U>(
  value: Optional<T>,
  fn: (x: T) => Optional<U>
): Optional<U> {
  return value == null ? null : fn(value);
}

const maybeValue: Optional<number> = 42;

// When you just want to keep the value
flatMapOptional(maybeValue, identity);  // 42

// When you want to transform it
flatMapOptional(maybeValue, n => n * 2);  // 84`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      When to Use identity
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. Default Parameters
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Use identity as a default transformation when functions accept optional transformers.
          It's better than null/undefined checks.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Conditional Transformations
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          When building pipelines conditionally, identity serves as a no-op transformation
          that keeps data flowing through unchanged.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. Testing & Debugging
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Replace complex transformations with identity temporarily to isolate issues
          in data processing pipelines.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. Composition Completeness
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          identity makes function composition algebraically complete, serving as the
          identity element (like 0 for addition or 1 for multiplication).
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Use identity in pipelines as a neutral transformation element.
        </p>
      </a>

      <a
        href="/composition/compose"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/compose');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          compose →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Learn how identity serves as the identity element in function composition.
        </p>
      </a>
    </div>
  </div>
);
