import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Memoize = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      memoize
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Cache function results for identical inputs
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is memoize?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        memoize
      </strong>{' '}
      is a performance optimization technique that caches the results of expensive function calls.
      <br />
      <br />
      When you call a memoized function with the same arguments, it returns the cached result
      instead of re-computing it. This can dramatically improve performance for pure functions
      with expensive computations.
      <br />
      <br />
      memoize uses <strong>reference equality</strong> for arguments, meaning objects are compared
      by reference, not by value.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

// Expensive computation
const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// Memoized version
const memoFib = memoize(fibonacci);

// First call computes
memoFib(40);  // Takes time...

// Second call returns cached result
memoFib(40);  // Instant!`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Computations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

let callCount = 0;

const add = (a: number, b: number) => {
  callCount++;
  return a + b;
};

const memoAdd = memoize(add);

memoAdd(2, 3);  // 5 (callCount: 1)
memoAdd(2, 3);  // 5 (callCount: 1, cached!)
memoAdd(3, 2);  // 5 (callCount: 2, different args)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Reference Equality
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

const processUser = memoize((user: { name: string; age: number }) => {
  console.log('Processing...');
  return \`\${user.name} is \${user.age} years old\`;
});

const alice = { name: 'Alice', age: 30 };

processUser(alice);  // "Processing..." logged, returns result
processUser(alice);  // No log, cached!

// Different reference, even if same values
processUser({ name: 'Alice', age: 30 });  // "Processing..." logged again`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Data Transformation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

// Expensive data processing
const processDataset = memoize((data: any[]) => {
  console.log('Processing dataset...');
  return data
    .map(item => ({ ...item, processed: true }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);
});

const dataset = [
  { id: 1, value: 10 },
  { id: 2, value: -5 },
  { id: 3, value: 20 },
];

// First call: processes the data
const result1 = processDataset(dataset);

// Second call with same reference: instant
const result2 = processDataset(dataset);

console.log(result1 === result2);  // true (same cached result)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Response Parsing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

interface RawUser {
  id: number;
  first_name: string;
  last_name: string;
}

interface User {
  id: number;
  fullName: string;
}

// Memoize transformation to avoid re-parsing
const parseUsers = memoize((rawUsers: RawUser[]): User[] => {
  console.log('Parsing users...');
  return rawUsers.map(raw => ({
    id: raw.id,
    fullName: \`\${raw.first_name} \${raw.last_name}\`,
  }));
});

const apiResponse = [
  { id: 1, first_name: 'Alice', last_name: 'Smith' },
  { id: 2, first_name: 'Bob', last_name: 'Jones' },
];

// Parse once
const users1 = parseUsers(apiResponse);

// Reuse if same response object
const users2 = parseUsers(apiResponse);

// Only logs "Parsing users..." once`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Expensive Calculations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

// Computationally expensive function
const isPrime = memoize((n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
});

// First check: computes
console.time('first');
isPrime(1000000007);
console.timeEnd('first');  // ~5ms

// Second check: cached
console.time('second');
isPrime(1000000007);
console.timeEnd('second');  // <0.1ms`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Recursive Functions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

// Classic example: Fibonacci
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// Without memoization: O(2^n) - exponential time
// With memoization: O(n) - linear time

fibonacci(10);  // Fast
fibonacci(50);  // Still fast! Without memo, this would hang
fibonacci(100); // Instant (if already computed smaller values)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Important Considerations
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. Pure Functions Only
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Only memoize pure functions (same inputs always produce same outputs).
          Functions with side effects or that depend on external state should not be memoized.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Reference Equality
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Arguments are compared by reference, not value. Two objects with identical
          properties are treated as different if they're different instances.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. Memory Usage
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Memoization trades memory for speed. The cache grows with unique argument
          combinations. Don't memoize functions called with infinite unique inputs.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. When to Use
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Best for expensive computations called repeatedly with the same inputs.
          Profile before optimizing - don't memoize unnecessarily.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      When to Use memoize
    </h2>

    <div class="grid gap-4 mt-6">
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✓ Good Use Cases
        </h4>
        <ul class="text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-1">
          <li>Expensive computations (mathematical calculations, parsing)</li>
          <li>Recursive functions (fibonacci, factorial)</li>
          <li>Data transformations called repeatedly</li>
          <li>Functions with limited, repeated input patterns</li>
        </ul>
      </div>

      <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
        <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">
          ✗ Avoid When
        </h4>
        <ul class="text-sm text-red-800 dark:text-red-200 list-disc list-inside space-y-1">
          <li>Function has side effects (API calls, logging, mutations)</li>
          <li>Infinite or unpredictable input variations</li>
          <li>Function is already fast (overhead not worth it)</li>
          <li>Results change based on time or external state</li>
        </ul>
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
          Combine memoized functions in efficient data transformation pipelines.
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
          Create composed functions with memoized intermediate steps.
        </p>
      </a>
    </div>
  </div>
);
