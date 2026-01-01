import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Unless = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      unless
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Apply a function only when a condition is false
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is unless?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        unless
      </strong>{' '}
      is the opposite of{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">when</code>.
      It creates a function that conditionally applies a transformation only when a predicate returns false.
      If the predicate returns true, it returns the original value unchanged.
      <br />
      <br />
      This is useful for <strong>negative conditions</strong>, <strong>fallback transformations</strong>,
      <strong>default value handling</strong>, and <strong>error correction</strong>.
      <br />
      <br />
      Think of it as "transform this value, unless this condition is met."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

const abs = unless(
  (n: number) => n > 0,
  (n) => n * -1
);

abs(5);    // 5  (positive, so unchanged)
abs(-3);   // 3  (negative, so converted to positive)
abs(0);    // 0  (zero, so unchanged)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function unless<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T;

// Takes a predicate and a transformation function
// Returns a function that conditionally applies the transformation when predicate is false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Transformations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

// Provide default value unless value exists
const withDefault = unless(
  (s: string) => s.length > 0,
  () => 'default'
);

withDefault('hello');  // 'hello'
withDefault('');       // 'default'

// Convert to positive unless already positive
const ensurePositive = unless(
  (n: number) => n > 0,
  (n) => Math.abs(n)
);

ensurePositive(5);    // 5
ensurePositive(-3);   // 3`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Default Value Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

interface Config {
  timeout?: number;
  retries?: number;
}

// Set default timeout unless specified
const withDefaultTimeout = unless(
  (config: Config) => config.timeout !== undefined,
  (config) => ({ ...config, timeout: 5000 })
);

withDefaultTimeout({ retries: 3 });
// { retries: 3, timeout: 5000 }

withDefaultTimeout({ timeout: 10000, retries: 3 });
// { timeout: 10000, retries: 3 } (unchanged)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Input Validation and Correction
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';
import { pipe } from 'fp-pack';

// Ensure minimum value unless already meets it
const ensureMinimum = (min: number) =>
  unless(
    (n: number) => n >= min,
    () => min
  );

// Ensure maximum value unless already within limit
const ensureMaximum = (max: number) =>
  unless(
    (n: number) => n <= max,
    () => max
  );

// Clamp value to range
const clamp = (min: number, max: number) =>
  pipe(
    ensureMinimum(min),
    ensureMaximum(max)
  );

const clamp0to100 = clamp(0, 100);
clamp0to100(150);   // 100
clamp0to100(-10);   // 0
clamp0to100(50);    // 50`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Error Recovery
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

interface Result {
  success: boolean;
  data?: any;
  error?: string;
}

// Retry unless successful
const retryUnlessSuccess = unless(
  (result: Result) => result.success,
  (result) => ({
    ...result,
    error: 'Retrying...',
    retryCount: (result as any).retryCount ? (result as any).retryCount + 1 : 1
  })
);

retryUnlessSuccess({ success: true, data: 'done' });
// { success: true, data: 'done' }

retryUnlessSuccess({ success: false, error: 'failed' });
// { success: false, error: 'Retrying...', retryCount: 1 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

// Ensure array unless already is one
const ensureArray = unless(
  <T>(value: T | T[]): value is T[] => Array.isArray(value),
  <T>(value: T | T[]): T[] => [value] as T[]
);

ensureArray([1, 2, 3]);   // [1, 2, 3]
ensureArray(42);          // [42]
ensureArray('hello');     // ['hello']

// Filter out empty arrays unless already filtered
const removeEmptyArrays = unless(
  (arr: any[][]) => arr.every(a => a.length > 0),
  (arr) => arr.filter(a => a.length > 0)
);

removeEmptyArrays([[1], [2], [3]]);        // [[1], [2], [3]]
removeEmptyArrays([[1], [], [3]]);         // [[1], [3]]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      State Normalization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';
import { pipe } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
  verified: boolean;
}

const normalizeUser = pipe(
  // Add verified flag unless it exists
  unless(
    (user: User) => 'verified' in user,
    (user) => ({ ...user, verified: false })
  ),
  // Trim name unless already trimmed
  unless(
    (user: User) => user.name === user.name.trim(),
    (user) => ({ ...user, name: user.name.trim() })
  ),
  // Lowercase email unless already lowercase
  unless(
    (user: User) => user.email === user.email.toLowerCase(),
    (user) => ({ ...user, email: user.email.toLowerCase() })
  )
);

normalizeUser({ id: 1, name: '  John  ', email: 'JOHN@EXAMPLE.COM', verified: false });
// { id: 1, name: 'John', email: 'john@example.com', verified: false }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use unless?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Negative Condition Logic
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Express "do this unless" logic naturally, which is often more readable than negating conditions.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Complementary to when
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Provides the opposite behavior of when, giving you flexibility in expressing conditional logic.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Default Value Patterns
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Perfect for setting default values or fallbacks when a condition is not met.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Composable
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Works seamlessly with pipe and other functional utilities for complex transformations.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function unless<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T {
  return (value: T) => (predicate(value) ? value : fn(value));
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a predicate function and a transformation function</li>
        <li>Returns a new function that tests the predicate</li>
        <li>If predicate returns false, applies the transformation</li>
        <li>If predicate returns true, returns the original value</li>
        <li>Pure function with no side effects</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">unless</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/control/unless.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View on GitHub
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/control/when"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/when');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          when →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Apply function when condition is true - opposite of unless.
        </p>
      </a>

      <a
        href="/control/ifElse"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/ifElse');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          ifElse →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Choose between two transformations based on condition.
        </p>
      </a>

      <a
        href="/control/guard"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/guard');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          guard →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Return default value when condition fails - similar use case.
        </p>
      </a>

      <a
        href="/control/cond"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/cond');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          cond →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Handle multiple conditional branches with pattern matching.
        </p>
      </a>
    </div>
  </div>
);
