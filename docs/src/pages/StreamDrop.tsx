import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamDrop = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/drop
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily skip the first N values and yield the rest
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
      What is stream/drop?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        drop
      </strong>{' '}
      creates a lazy iterator that skips the first <code class="text-sm">N</code> values from an iterable,
      then yields all remaining values. This is the opposite of <code class="text-sm">take</code>, which
      keeps the first N values and discards the rest.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      This is particularly useful when:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>Skipping header rows or metadata in datasets</li>
      <li>Implementing pagination by skipping to a specific page offset</li>
      <li>Removing warmup or calibration data from streams</li>
      <li>Processing data after a known number of initial items</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, toArray } from 'fp-pack/stream';

// Skip first 2 items
const result = pipe(
  drop(2),
  toArray
)([1, 2, 3, 4, 5]);
// [3, 4, 5]

// Skip nothing (count 0)
const noSkip = pipe(
  drop(0),
  toArray
)([1, 2, 3]);
// [1, 2, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function drop<T>(
  count: number,
  iterable: Iterable<T>
): IterableIterator<T>;

function drop<T>(
  count: number,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

function drop<T>(
  count: number
): (iterable: Iterable<T>) => IterableIterator<T>;

function drop<T>(
  count: number
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The function supports both curried and direct call styles. It handles synchronous and asynchronous
      iterables automatically. The first <code class="text-sm">count</code> values are skipped without
      materializing them, then all remaining values are yielded lazily.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      drop vs take vs dropWhile
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Understanding the differences between these skip/take functions:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { drop, take, dropWhile, toArray } from 'fp-pack/stream';

const data = [1, 2, 3, 4, 5];

// drop: Skip first N (fixed count)
toArray(drop(2, data));
// [3, 4, 5]

// take: Keep first N (fixed count)
toArray(take(2, data));
// [1, 2]

// dropWhile: Skip while condition is true (condition-based)
toArray(dropWhile((n: number) => n < 3, data));
// [3, 4, 5]`}
    />

    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded border border-blue-200 dark:border-blue-800 mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 When to Use Each</span>
        <br />
        <br />
        Use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">drop</code> when you know exactly
        how many items to skip (e.g., header rows, page offset).
        <br /><br />
        Use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">dropWhile</code> when you want to
        skip items based on a condition until it fails.
        <br /><br />
        Use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">take</code> when you want the
        first N items instead of skipping them.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Skip Header Rows
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, map, toArray } from 'fp-pack/stream';

// CSV data with header
const csvLines = [
  'Name,Age,City',           // Header row
  'Alice,30,NYC',
  'Bob,25,LA',
  'Charlie,35,Chicago'
];

const parseData = pipe(
  drop(1),                    // Skip header
  map((line: string) => {
    const [name, age, city] = line.split(',');
    return { name, age: Number(age), city };
  }),
  toArray
);

const data = parseData(csvLines);
// [
//   { name: 'Alice', age: 30, city: 'NYC' },
//   { name: 'Bob', age: 25, city: 'LA' },
//   { name: 'Charlie', age: 35, city: 'Chicago' }
// ]

// Skip multiple header/metadata rows
const dataWithMetadata = [
  '# File: users.csv',
  '# Created: 2024-01-01',
  '# ---',
  'Name,Age',
  'Alice,30',
  'Bob,25'
];

const skipMetadata = pipe(
  drop(3),                    // Skip all metadata
  toArray
)(dataWithMetadata);
// ['Name,Age', 'Alice,30', 'Bob,25']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pagination Implementation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, take, toArray } from 'fp-pack/stream';

// Get specific page of data
function getPage<T>(
  data: Iterable<T>,
  pageNumber: number,
  pageSize: number
): T[] {
  const offset = pageNumber * pageSize;

  return pipe(
    drop(offset),             // Skip to page start
    take(pageSize),           // Take page items
    toArray
  )(data);
}

const allItems = Array.from({ length: 100 }, (_, i) => \`Item \${i}\`);

// Get page 2 (items 20-29)
const page2 = getPage(allItems, 2, 10);
// ['Item 20', 'Item 21', ..., 'Item 29']

// Get page 0 (first page)
const page0 = getPage(allItems, 0, 10);
// ['Item 0', 'Item 1', ..., 'Item 9']

// Efficient: Works with lazy streams too
function* infiniteItems() {
  let i = 0;
  while (true) yield \`Item \${i++}\`;
}

const page5 = getPage(infiniteItems(), 5, 10);
// ['Item 50', 'Item 51', ..., 'Item 59']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Remove Warmup Data
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, map, toArray } from 'fp-pack/stream';

// Sensor readings (first few are calibration)
interface Reading {
  timestamp: number;
  value: number;
}

const sensorReadings: Reading[] = [
  { timestamp: 0, value: 0 },      // Warmup
  { timestamp: 1, value: 2 },      // Warmup
  { timestamp: 2, value: 1 },      // Warmup
  { timestamp: 3, value: 10 },     // Actual data
  { timestamp: 4, value: 12 },
  { timestamp: 5, value: 11 }
];

// Skip first 3 warmup readings
const actualData = pipe(
  drop(3),
  map((r: Reading) => r.value),
  toArray
)(sensorReadings);
// [10, 12, 11]

// Benchmark results (skip warmup runs)
const benchmarkTimes = [150, 145, 140, 100, 98, 102, 99];

const stableResults = pipe(
  drop(3),                   // Skip first 3 warmup runs
  toArray
)(benchmarkTimes);
// [100, 98, 102, 99]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Stream Offset Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, filter, map, toArray } from 'fp-pack/stream';

// Process log entries after a certain point
const logEntries = [
  { id: 1, level: 'info', message: 'Start' },
  { id: 2, level: 'info', message: 'Processing' },
  { id: 3, level: 'warn', message: 'Warning' },
  { id: 4, level: 'error', message: 'Error' },
  { id: 5, level: 'info', message: 'Recovery' },
  { id: 6, level: 'info', message: 'Done' }
];

// Get entries after ID 3
const recentEntries = pipe(
  drop(3),                   // Skip first 3
  toArray
)(logEntries);
// Entries with id 4, 5, 6

// Combine drop with filter
const recentErrors = pipe(
  drop(2),                   // Skip first 2
  filter((log) => log.level === 'error'),
  map((log) => log.message),
  toArray
)(logEntries);
// ['Error']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Split and Process
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, take, toArray } from 'fp-pack/stream';

// Split data into head and tail
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// First 3 items
const head = pipe(take(3), toArray)(data);
// [1, 2, 3]

// After first 3 items
const tail = pipe(drop(3), toArray)(data);
// [4, 5, 6, 7, 8, 9, 10]

// Get middle section
const middle = pipe(
  drop(3),                   // Skip first 3
  take(4),                   // Take next 4
  toArray
)(data);
// [4, 5, 6, 7]

// Sliding window: skip some, take some
function slidingWindows<T>(
  data: T[],
  windowSize: number,
  stride: number
): T[][] {
  const windows: T[][] = [];
  for (let i = 0; i < data.length; i += stride) {
    const window = pipe(
      drop(i),
      take(windowSize),
      toArray
    )(data);
    if (window.length === windowSize) {
      windows.push(window);
    }
  }
  return windows;
}

slidingWindows([1, 2, 3, 4, 5, 6], 3, 2);
// [[1, 2, 3], [3, 4, 5], [5, 6, ...]]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Async Stream Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, take, toArray } from 'fp-pack/stream';

// Skip initial async values
async function* asyncNumbers() {
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 10));
    yield i;
  }
}

const afterFirst5 = await pipe(
  drop(5),
  toArray
)(asyncNumbers());
// [5, 6, 7, 8, 9]

// Works with Promise-wrapped iterables
const result = await pipe(
  drop(2),
  toArray
)(Promise.resolve([1, 2, 3, 4, 5]));
// [3, 4, 5]

// API pagination with offset
async function fetchUsersPage(offset: number, limit: number) {
  async function* fetchAllUsers() {
    // Simulate fetching users
    for (let i = 0; i < 100; i++) {
      yield { id: i, name: \`User \${i}\` };
    }
  }

  return await pipe(
    drop(offset),
    take(limit),
    toArray
  )(fetchAllUsers());
}

const page2Users = await fetchUsersPage(20, 10);
// Users 20-29`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Performance Considerations
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">drop</code> is efficient for skipping values:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>Lazy evaluation:</strong> Doesn't materialize skipped values</li>
      <li><strong>Memory efficient:</strong> Skipped items are immediately discarded</li>
      <li><strong>Works with infinite streams:</strong> Can skip N items from infinite sequences</li>
      <li><strong>Composition friendly:</strong> Combines well with other stream operations</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, drop, take, map, toArray } from 'fp-pack/stream';

// Efficient: Only processes items after skip
const efficientExample = pipe(
  range,
  drop(1000),                // Skip first 1000
  take(10),                  // Take next 10
  map((n: number) => n * n),
  toArray
)(0, Infinity);
// [1000000, 1002001, 1004004, ..., 1018081]

// vs Array approach (creates array of 1M items)
// ❌ Inefficient: Creates entire array first
const inefficientExample = Array.from({ length: 1000000 }, (_, i) => i)
  .slice(1000, 1010)
  .map(n => n * n);

// ✅ Efficient: Only generates what's needed
const efficient = pipe(range, drop(1000), take(10), toArray)(0, Infinity);`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">💡 Performance Tip</span>
        <br />
        <br />
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">drop</code> is more efficient than
        array <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">slice</code> for large datasets
        because it doesn't create intermediate arrays. When combined with <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">take</code>,
        it provides efficient pagination without loading all data into memory.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">drop</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/drop.ts"
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
        href="/stream/take"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/take');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          take →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Keep the first N values (opposite of drop).
        </p>
      </a>

      <a
        href="/stream/dropWhile"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/dropWhile');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          dropWhile →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Skip values while a condition is true (condition-based drop).
        </p>
      </a>

      <a
        href="/stream/takeWhile"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/takeWhile');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          takeWhile →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Take values while a condition is true.
        </p>
      </a>

      <a
        href="/stream/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Filter values based on a predicate (selective removal).
        </p>
      </a>
    </div>
  </div>
);
