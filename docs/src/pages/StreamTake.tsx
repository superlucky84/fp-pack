import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamTake = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/take
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily take the first N values and stop early
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream/take?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        take
      </strong>{' '}
      creates a lazy iterator that yields the first <code class="text-sm">N</code> values from an iterable,
      then immediately stops. This is crucial for working with infinite or very large streams where you only
      need a limited number of items.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      This is particularly useful when:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>Working with infinite streams and need to limit output</li>
      <li>Sampling or previewing data from large datasets</li>
      <li>Implementing pagination or batch processing</li>
      <li>Optimizing performance by stopping iteration early</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, toArray } from 'fp-pack/stream';

// Take first 3 items
const result = pipe(
  take(3),
  toArray
)([1, 2, 3, 4, 5]);
// [1, 2, 3]

// Works with any iterable
const firstTwo = pipe(
  take(2),
  toArray
)('hello');
// ['h', 'e']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function take<T>(
  count: number,
  iterable: Iterable<T>
): IterableIterator<T>;

function take<T>(
  count: number,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

function take<T>(
  count: number
): (iterable: Iterable<T>) => IterableIterator<T>;

function take<T>(
  count: number
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The function supports both curried and direct call styles, and automatically handles synchronous
      and asynchronous iterables. The iterator stops immediately after yielding the specified count,
      preventing unnecessary computation.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Limit Infinite Streams
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, take, map, toArray } from 'fp-pack/stream';

// Create infinite sequence, but only take 5
const first5Squares = pipe(
  range,
  map((n: number) => n * n),
  take(5),
  toArray
)(0, Infinity);
// [0, 1, 4, 9, 16]

// Generate IDs without knowing how many you need upfront
const generateIds = () => pipe(
  range,
  map((n: number) => \`id-\${n}\`),
  take(3),
  toArray
)(1, Infinity);

generateIds();
// ['id-1', 'id-2', 'id-3']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Sampling and Preview
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, toArray } from 'fp-pack/stream';

// Preview first few records from a large dataset
const previewData = (data: any[]) => pipe(
  take(5),
  toArray
)(data);

const largeDataset = Array.from({ length: 1000000 }, (_, i) => ({ id: i }));
const preview = previewData(largeDataset);
// [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

// Sample user comments
interface Comment {
  id: number;
  text: string;
  author: string;
}

const comments: Comment[] = [
  { id: 1, text: 'Great!', author: 'Alice' },
  { id: 2, text: 'Nice work', author: 'Bob' },
  { id: 3, text: 'Awesome', author: 'Charlie' },
  // ... thousands more
];

const firstThreeComments = pipe(take(3), toArray)(comments);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pagination Implementation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, take, map, toArray } from 'fp-pack/stream';

// Fetch only one page of results
const fetchPage = async (pageNumber: number, pageSize: number) => {
  const allData = await fetchAllData(); // Potentially huge dataset

  return pipe(
    // Skip to the right page
    (data) => data.slice(pageNumber * pageSize),
    take(pageSize),
    toArray
  )(allData);
};

// Better: combine with lazy operations
const generatePageNumbers = (totalPages: number) => pipe(
  range,
  take(totalPages),
  map((page: number) => ({
    page,
    label: \`Page \${page + 1}\`,
    url: \`/items?page=\${page}\`
  })),
  toArray
)(0, Infinity);

generatePageNumbers(3);
// [
//   { page: 0, label: 'Page 1', url: '/items?page=0' },
//   { page: 1, label: 'Page 2', url: '/items?page=1' },
//   { page: 2, label: 'Page 3', url: '/items?page=2' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Early Termination for Performance
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, filter, map, toArray } from 'fp-pack/stream';

// Find first 3 valid users (stops after finding 3)
const findValidUsers = (users: User[]) => pipe(
  filter((user: User) => user.active && user.verified),
  map((user: User) => user.email),
  take(3),
  toArray
)(users);

// Without take: processes ALL users even after finding 3
// With take: stops immediately after finding 3 valid users

// Performance comparison
const millionUsers = Array.from({ length: 1000000 }, (_, i) => ({
  id: i,
  active: i % 2 === 0,
  verified: i % 3 === 0,
  email: \`user\${i}@example.com\`
}));

// ❌ Processes all 1M users
const inefficient = millionUsers
  .filter(u => u.active && u.verified)
  .map(u => u.email)
  .slice(0, 3);

// ✅ Stops after finding 3 (much faster)
const efficient = findValidUsers(millionUsers);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Batch Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, toArray } from 'fp-pack/stream';

// Process items in batches
function* getBatch<T>(items: T[], batchSize: number) {
  let offset = 0;
  while (offset < items.length) {
    yield pipe(
      (arr) => arr.slice(offset),
      take(batchSize),
      toArray
    )(items);
    offset += batchSize;
  }
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const batches = Array.from(getBatch(items, 3));
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
//   [10]
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Async Iterables
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, toArray } from 'fp-pack/stream';

// Take first N items from async stream
async function* asyncNumbers() {
  let i = 0;
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i++;
  }
}

const first5 = await pipe(
  take(5),
  toArray
)(asyncNumbers());
// [0, 1, 2, 3, 4]

// Works with Promise-wrapped iterables
const result = await pipe(
  take(2),
  toArray
)(Promise.resolve([1, 2, 3, 4]));
// [1, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Performance Considerations
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">take</code> is highly efficient for early termination:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>Lazy evaluation:</strong> Only processes the number of items you need</li>
      <li><strong>Immediate termination:</strong> Stops iterating as soon as count is reached</li>
      <li><strong>No intermediate arrays:</strong> Doesn't materialize values until consumed</li>
      <li><strong>Infinite stream safe:</strong> Can safely limit infinite sequences</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, take, map, filter, toArray } from 'fp-pack/stream';

// Only processes 100 items, not 1 million
const efficientExample = pipe(
  range,
  filter((n: number) => n % 2 === 0),
  map((n: number) => n * n),
  take(100),
  toArray
)(0, 1000000);

// vs Array approach (processes all 1M items)
const inefficientExample = Array.from({ length: 1000000 }, (_, i) => i)
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .slice(0, 100);`}
    />

    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded border border-blue-200 dark:border-blue-800 mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 Performance Tip</span>
        <br />
        <br />
        Place <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">take</code> as early as possible
        in your pipeline when you know the maximum items needed. This prevents downstream operations from
        processing unnecessary data. However, if you need to filter or transform before taking, place{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">take</code> after those operations.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">take</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/take.ts"
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
        href="/stream/takeWhile"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/takeWhile');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          takeWhile →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Take values while a condition is true (condition-based take).
        </p>
      </a>

      <a
        href="/stream/drop"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/drop');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          drop →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Skip the first N values and yield the rest.
        </p>
      </a>

      <a
        href="/stream/range"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/range');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          range →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Generate numeric sequences (often used with take for limiting).
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
          Filter values lazily based on a predicate.
        </p>
      </a>
    </div>
  </div>
);
