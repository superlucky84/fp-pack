import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Drop = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      drop
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Remove the first n elements from an array
    </p>

    <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
      <p class="text-sm md:text-base text-yellow-900 dark:text-yellow-100">
        <strong class="font-semibold">Note:</strong> In data-last pipelines, TypeScript may not infer the final data type for this utility.
        Use a small type hint or a data-first wrapper. See{' '}
        <a
          href="/guide/type-usage"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/guide/type-usage');
          }}
          class="underline decoration-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-200"
        >
          Type Usage
        </a>{' '}
        and{' '}
        <a
          href="/guide"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/guide');
          }}
          class="underline decoration-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-200"
        >
          Detailed Guide
        </a>.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is drop?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        drop
      </strong>{' '}
      removes the first n elements from an array and returns a new array containing
      the remaining elements. If n is greater than the array length, it returns an empty array.
      If n is 0 or negative, it returns the original array unchanged.
      <br />
      <br />
      This is useful for <strong>skipping items</strong>, <strong>pagination</strong>,
      <strong>removing headers</strong>, and <strong>stream processing</strong>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-pack';

const numbers = [1, 2, 3, 4, 5, 6];

drop(2, numbers);
// [3, 4, 5, 6]

drop(4, numbers);
// [5, 6]

drop(10, numbers);
// []  (exceeds length)

drop(0, numbers);
// [1, 2, 3, 4, 5, 6]  (unchanged)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function drop<T>(n: number, arr: T[]): T[];

// Takes a count of elements to drop and an array
// Returns the array without the first n elements`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The count is automatically floored to an integer. If n is 0, negative, or not finite,
      the original array is returned unchanged.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Examples
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-pack';

// Drop first 3 elements
const skipThree = drop(3, [1, 2, 3, 4, 5, 6, 7]);
// [4, 5, 6, 7]

// Drop first element
const tail = drop(1, ['a', 'b', 'c', 'd']);
// ['b', 'c', 'd']

// Drop more than length
const tooMany = drop(10, [1, 2, 3]);
// []

// Drop nothing
const none = drop(0, [1, 2, 3]);
// [1, 2, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Pagination - Skip Previous Pages
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-pack';
import { chunk } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
}

const allProducts: Product[] = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 300 },
  { id: 5, name: 'Headphones', price: 150 },
  { id: 6, name: 'Webcam', price: 80 },
  { id: 7, name: 'Microphone', price: 120 },
  { id: 8, name: 'Speaker', price: 90 },
];

const ITEMS_PER_PAGE = 3;
const currentPage = 2; // 0-indexed

// Skip items from previous pages
const offset = currentPage * ITEMS_PER_PAGE;
const remainingItems = drop(offset, allProducts);
const currentPageItems = remainingItems.slice(0, ITEMS_PER_PAGE);

console.log(currentPageItems);
// [{ id: 7, name: 'Microphone', ... }, { id: 8, name: 'Speaker', ... }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      CSV Processing - Remove Header Row
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-pack';

const csvLines = [
  'Name,Age,City',        // Header row
  'Alice,30,New York',
  'Bob,25,Los Angeles',
  'Charlie,35,Chicago',
];

// Remove header row
const dataRows = drop(1, csvLines);
// ['Alice,30,New York', 'Bob,25,Los Angeles', 'Charlie,35,Chicago']

// Parse data rows
const users = dataRows.map(line => {
  const [name, age, city] = line.split(',');
  return { name, age: parseInt(age), city };
});

console.log(users);
// [
//   { name: 'Alice', age: 30, city: 'New York' },
//   { name: 'Bob', age: 25, city: 'Los Angeles' },
//   { name: 'Charlie', age: 35, city: 'Chicago' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Processing - Skip Initial Elements
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-pack';
import { pipe } from 'fp-pack';

// Process array by dropping warm-up samples
const sensorReadings = [12, 15, 18, 100, 102, 98, 101, 99, 103];

const WARMUP_SAMPLES = 3;

const processReadings = pipe(
  (readings) => drop(WARMUP_SAMPLES, readings),
  (readings) => readings.reduce((a, b) => a + b, 0) / readings.length
);

const averageReading = processReadings(sensorReadings);
// 100.5 (average of [100, 102, 98, 101, 99, 103])`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Breadcrumb Navigation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-pack';

const fullPath = ['Home', 'Products', 'Electronics', 'Laptops', 'Gaming'];

// Get sub-path from a certain level
const fromProducts = drop(1, fullPath);
// ['Products', 'Electronics', 'Laptops', 'Gaming']

const fromElectronics = drop(2, fullPath);
// ['Electronics', 'Laptops', 'Gaming']

// Build breadcrumb link
const buildBreadcrumb = (pathSegments: string[], dropCount: number) => {
  return drop(dropCount, pathSegments).join(' > ');
};

console.log(buildBreadcrumb(fullPath, 0));
// 'Home > Products > Electronics > Laptops > Gaming'

console.log(buildBreadcrumb(fullPath, 2));
// 'Electronics > Laptops > Gaming'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Common Patterns
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      With pipe for Data Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, drop } from 'fp-pack';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = pipe(
  (arr) => drop(3, arr),                  // Skip first 3
  (arr) => arr.filter(x => x % 2 === 0),  // Keep evens
  (arr) => arr.map(x => x * 2)            // Double them
)(data);

// [6, 8, 10, 12, 14, 16, 18]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Sliding Window Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-pack';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// Process with sliding window of size 3
const WINDOW_SIZE = 3;

for (let i = 0; i <= numbers.length - WINDOW_SIZE; i++) {
  const window = drop(i, numbers).slice(0, WINDOW_SIZE);
  console.log(\`Window \${i + 1}:\`, window);
}

// Window 1: [1, 2, 3]
// Window 2: [2, 3, 4]
// Window 3: [3, 4, 5]
// Window 4: [4, 5, 6]
// Window 5: [5, 6, 7]
// Window 6: [6, 7, 8]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use drop?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Declarative Array Slicing
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Express your intent clearly: "drop 3 items" is more readable than array.slice(3).
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Composable with Other Functions
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Works seamlessly with pipe, compose, and other functional utilities for powerful data transformations.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Safe Edge Case Handling
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Automatically handles edge cases: negative numbers, exceeding array length, non-finite values.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function drop<T>(n: number, arr: T[]): T[] {
  const count = Math.floor(n);
  if (!Number.isFinite(count) || count <= 0) {
    return arr;
  }
  return arr.slice(count);
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Floors the count to ensure it's an integer</li>
        <li>Returns the original array if count is not finite or is 0 or negative</li>
        <li>Uses Array.slice(count) to efficiently remove the first n elements</li>
        <li>Returns a new array without mutating the original</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">drop</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/drop.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/take');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          take
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Take the first N elements
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/dropWhile');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          dropWhile
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Drop values while a predicate is true
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/takeWhile');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          takeWhile
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Take values while a predicate is true
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/tail');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          tail
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Drop just the first element
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        Try these related array functions:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/array/filter');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            filter
          </a>{' '}
          - Keep only the elements that match a predicate
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/array/chunk');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            chunk
          </a>{' '}
          - Split array into chunks
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/pipe');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            pipe
          </a>{' '}
          - Chain drop with other transformations
        </li>
      </ul>
    </div>
  </div>
);
