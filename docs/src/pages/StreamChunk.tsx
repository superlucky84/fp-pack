import { CodeBlock } from '@/components/CodeBlock';

export const StreamChunk = () => {
  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
        chunk (stream)
      </h1>

      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Lazily splits a stream into fixed-size chunks (arrays) without
        materializing the entire input. Each chunk is yielded as soon as it's
        filled, enabling efficient batch processing of large or infinite
        streams.
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
        What is stream chunk?
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
          chunk
        </strong>{' '}
        is a stream operation that groups elements from an iterable into
        fixed-size arrays. It processes the input lazily, yielding each chunk as
        soon as it reaches the specified size. The last chunk may contain fewer
        elements if the input length is not evenly divisible by the chunk size.
      </p>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        This is particularly useful when:
      </p>

      <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
        <li>
          You need to batch API requests or database operations for efficiency
        </li>
        <li>
          You're implementing pagination or processing data in fixed-size groups
        </li>
        <li>
          You want to parallelize work by distributing items across workers
        </li>
        <li>
          You're processing large files or streams in manageable segments
        </li>
      </ul>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Like all stream operations in fp-pack, chunk uses lazy evaluation,
        meaning chunks are created on-demand as you iterate, not all at once.
        This makes it memory-efficient even for very large or infinite inputs.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, toArray } from 'fp-pack/stream';

// Basic example: split array into chunks of 2
const data = [1, 2, 3, 4, 5];
const chunks = toArray(chunk(2, data));
console.log(chunks); // [[1, 2], [3, 4], [5]]

// Lazy evaluation - chunks created on demand
const iter = chunk(2, [1, 2, 3, 4]);
iter.next(); // { done: false, value: [1, 2] }
iter.next(); // { done: false, value: [3, 4] }
iter.next(); // { done: true, value: undefined }`}
      />

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Type Signature
      </h2>

      <CodeBlock
        language="typescript"
        code={`function chunk<T>(
  size: number,
  iterable: Iterable<T>
): IterableIterator<T[]>;

function chunk<T>(
  size: number,
  iterable: AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>
): AsyncIterableIterator<T[]>;

function chunk<T>(
  size: number
): (iterable: Iterable<T>) => IterableIterator<T[]>;

function chunk<T>(
  size: number
): (iterable: AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>) => AsyncIterableIterator<T[]>;`}
      />

      <div class="mt-6 space-y-4">
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          <strong class="font-semibold">Parameters:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              size
            </code>
            : The number of elements in each chunk. Must be a positive integer
            (floored automatically)
          </li>
          <li>
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              iterable
            </code>
            : The input sequence to chunk (sync or async iterable)
          </li>
        </ul>

        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4">
          <strong class="font-semibold">Returns:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            An IterableIterator or AsyncIterableIterator that yields arrays of
            size{' '}
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              size
            </code>
          </li>
          <li>
            The last chunk may contain fewer elements if input length is not
            divisible by size
          </li>
          <li>
            Supports curried form: you can call with just the size to get a
            reusable function
          </li>
        </ul>

        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4">
          <strong class="font-semibold">Special cases:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            If size is 0, negative, or not finite, no chunks are yielded
          </li>
          <li>Size is automatically floored to the nearest integer</li>
        </ul>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        chunk vs partition vs window
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Different grouping operations serve different purposes:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, toArray } from 'fp-pack/stream';

const data = [1, 2, 3, 4, 5, 6];

// chunk: fixed-size non-overlapping groups
toArray(chunk(2, data)); // [[1, 2], [3, 4], [5, 6]]

// partition (conceptual): split into two groups by condition
// const [evens, odds] = partition((n) => n % 2 === 0, data);
// evens: [2, 4, 6], odds: [1, 3, 5]

// window (conceptual): sliding windows with overlap
// window(2, data): [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]`}
      />

      <div class="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
        <p class="text-sm md:text-base text-purple-900 dark:text-purple-100 font-semibold mb-2">
          Key Differences
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-purple-800 dark:text-purple-200 space-y-1">
          <li>
            <strong>chunk</strong>: Fixed-size groups, non-overlapping,
            sequential batching
          </li>
          <li>
            <strong>partition</strong>: Two groups based on predicate, processes
            entire input
          </li>
          <li>
            <strong>window</strong>: Sliding groups with overlap, useful for
            moving averages
          </li>
        </ul>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Practical Examples
      </h2>

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 1: Batch API Requests
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        When making many API requests, batching them reduces network overhead and
        respects rate limits:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, toArray, pipe } from 'fp-pack/stream';

interface User {
  id: string;
  name: string;
  email: string;
}

// Batch create users to avoid overwhelming the API
async function batchCreateUsers(users: User[]): Promise<void> {
  const BATCH_SIZE = 10;

  const batches = pipe(
    chunk(BATCH_SIZE),
    map(async (batch: User[]) => {
      // Send batch to API
      const response = await fetch('/api/users/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: batch })
      });

      if (!response.ok) {
        throw new Error(\`Batch failed: \${response.statusText}\`);
      }

      return response.json();
    }),
    toArray
  )(users);

  // Wait for all batches to complete
  const results = await Promise.all(batches);
  console.log(\`Created \${results.length} batches\`);
}

// Usage
const users = Array.from({ length: 47 }, (_, i) => ({
  id: \`user-\${i}\`,
  name: \`User \${i}\`,
  email: \`user\${i}@example.com\`
}));

await batchCreateUsers(users);
// Creates 5 batches: [10, 10, 10, 10, 7]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 2: Pagination Display
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Split data into pages for display or navigation:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, toArray, pipe } from 'fp-pack/stream';

interface Product {
  id: string;
  name: string;
  price: number;
}

class ProductCatalog {
  private products: Product[];
  private pageSize: number;

  constructor(products: Product[], pageSize: number = 20) {
    this.products = products;
    this.pageSize = pageSize;
  }

  getPages(): Product[][] {
    return toArray(chunk(this.pageSize, this.products));
  }

  getPage(pageNumber: number): Product[] | undefined {
    const pages = this.getPages();
    return pages[pageNumber];
  }

  getTotalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }
}

// Usage
const products: Product[] = Array.from({ length: 95 }, (_, i) => ({
  id: \`prod-\${i}\`,
  name: \`Product \${i}\`,
  price: Math.random() * 100
}));

const catalog = new ProductCatalog(products, 20);

console.log(catalog.getTotalPages()); // 5
console.log(catalog.getPage(0)?.length); // 20
console.log(catalog.getPage(4)?.length); // 15 (last page)`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 3: Parallel Processing with Worker Pools
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Distribute work across multiple workers or threads efficiently:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, flatMap, toArray, pipe } from 'fp-pack/stream';

interface Task {
  id: string;
  data: any;
}

// Simulate CPU-intensive processing
async function processTask(task: Task): Promise<{ id: string; result: any }> {
  // Simulate work
  await new Promise(resolve => setTimeout(resolve, 100));
  return { id: task.id, result: \`Processed: \${task.data}\` };
}

// Process tasks in parallel batches
async function processTasksInBatches(
  tasks: Task[],
  batchSize: number = 5
): Promise<any[]> {
  return await pipe(
    chunk(batchSize),
    map(async (batch: Task[]) => {
      // Process all tasks in the batch in parallel
      console.log(\`Processing batch of \${batch.length} tasks...\`);
      return await Promise.all(batch.map(processTask));
    }),
    flatMap((x: any) => x), // Flatten results
    toArray
  )(tasks);
}

// Usage: Process 23 tasks in batches of 5
const tasks: Task[] = Array.from({ length: 23 }, (_, i) => ({
  id: \`task-\${i}\`,
  data: \`data-\${i}\`
}));

const results = await processTasksInBatches(tasks, 5);
// Processes in 5 parallel batches: [5, 5, 5, 5, 3]
console.log(\`Processed \${results.length} tasks\`);`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 4: File Upload in Chunks
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Upload large files by splitting them into manageable chunks:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, toArray, pipe } from 'fp-pack/stream';

// Upload a file in chunks for better progress tracking and resumability
async function uploadFileInChunks(
  file: ArrayBuffer,
  chunkSize: number = 1024 * 1024 // 1MB chunks
): Promise<void> {
  const bytes = new Uint8Array(file);

  const uploadChunk = async (
    chunkData: number[],
    index: number,
    total: number
  ): Promise<void> => {
    const chunk = new Uint8Array(chunkData);

    console.log(\`Uploading chunk \${index + 1}/\${total}...\`);

    await fetch('/api/upload/chunk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Chunk-Index': String(index),
        'X-Total-Chunks': String(total)
      },
      body: chunk
    });
  };

  const chunks = toArray(chunk(chunkSize, Array.from(bytes)));

  // Upload chunks sequentially to maintain order
  for (let i = 0; i < chunks.length; i++) {
    await uploadChunk(chunks[i], i, chunks.length);
  }

  console.log('Upload complete!');
}

// Usage
const fileData = new ArrayBuffer(5 * 1024 * 1024); // 5MB file
await uploadFileInChunks(fileData, 1024 * 1024);
// Uploads in 5 chunks of 1MB each`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 5: Data Visualization - Group by Time Windows
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Group time-series data into fixed intervals for aggregation:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, toArray, pipe } from 'fp-pack/stream';

interface DataPoint {
  timestamp: number;
  value: number;
}

// Group data points into time buckets and calculate averages
function aggregateByTimeWindow(
  dataPoints: DataPoint[],
  windowSize: number = 10
): Array<{ bucket: number; average: number; count: number }> {
  return pipe(
    chunk(windowSize),
    map((window: DataPoint[], index: number) => {
      const sum = window.reduce((acc, dp) => acc + dp.value, 0);
      return {
        bucket: index,
        average: sum / window.length,
        count: window.length
      };
    }),
    toArray
  )(dataPoints);
}

// Usage: Process 1000 data points in windows of 50
const dataPoints: DataPoint[] = Array.from({ length: 1000 }, (_, i) => ({
  timestamp: Date.now() + i * 1000,
  value: Math.random() * 100
}));

const aggregated = aggregateByTimeWindow(dataPoints, 50);

console.log(aggregated);
// [
//   { bucket: 0, average: 52.3, count: 50 },
//   { bucket: 1, average: 48.7, count: 50 },
//   ...
//   { bucket: 19, average: 51.2, count: 50 }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 6: Async Stream Processing
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Chunk async iterables like event streams or real-time data:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, toArray, pipe } from 'fp-pack/stream';

// Simulate an async event stream
async function* eventStream(): AsyncGenerator<string> {
  const events = [
    'user-login', 'page-view', 'click', 'scroll', 'click',
    'page-view', 'user-logout', 'user-login', 'click', 'purchase'
  ];

  for (const event of events) {
    await new Promise(resolve => setTimeout(resolve, 50));
    yield event;
  }
}

// Process events in batches for efficient logging/analytics
async function processEventBatches() {
  const batches = await pipe(
    chunk(3),
    map((batch: string[], index: number) => ({
      batchId: index,
      events: batch,
      timestamp: new Date().toISOString()
    })),
    toArray
  )(eventStream());

  console.log('Event batches:', batches);
  // [
  //   { batchId: 0, events: ['user-login', 'page-view', 'click'], timestamp: '...' },
  //   { batchId: 1, events: ['scroll', 'click', 'page-view'], timestamp: '...' },
  //   { batchId: 2, events: ['user-logout', 'user-login', 'click'], timestamp: '...' },
  //   { batchId: 3, events: ['purchase'], timestamp: '...' }
  // ]
}

await processEventBatches();`}
      />

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Performance Considerations
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        The chunk function leverages lazy evaluation for optimal performance:
      </p>

      <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
        <li>
          <strong>Lazy chunking</strong>: Chunks are created on-demand as you
          iterate, not all at once
        </li>
        <li>
          <strong>Memory efficient</strong>: Only one chunk is held in memory at
          a time
        </li>
        <li>
          <strong>Early termination</strong>: Can stop iteration before
          processing the entire input
        </li>
        <li>
          <strong>No upfront cost</strong>: Input is not materialized until
          needed
        </li>
      </ul>

      <CodeBlock
        language="typescript"
        code={`import { chunk, take, toArray, pipe, range } from 'fp-pack/stream';

// Efficient: Only creates chunks as needed
const first3Chunks = pipe(
  range,
  chunk(1000),
  take(3),
  toArray
)(0, Infinity);
// Only processes first 3000 items, creates 3 chunks

// Compare with array approach (inefficient for large/infinite data)
// const arrayApproach = Array.from({ length: Infinity }, (_, i) => i); // Can't do this!

// Chunk + take pattern is very efficient
const largeDataset = range(0, 1_000_000);
const firstBatch = pipe(
  chunk(100),
  take(1), // Take just first chunk
  toArray
)(largeDataset);
// Processes only 100 items, not 1M`}
      />

      <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded">
        <p class="text-sm md:text-base text-green-900 dark:text-green-100 font-semibold mb-2">
          Performance Tip
        </p>
        <p class="text-sm md:text-base text-green-800 dark:text-green-200">
          When processing large datasets, use chunk with other stream operations
          like take, filter, or map to avoid creating intermediate arrays. The
          lazy evaluation ensures you only process what you need. For batch API
          operations, chunking can dramatically reduce network overhead and
          improve throughput by sending multiple items per request.
        </p>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Source Code
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        View the implementation of <code class="text-sm">chunk</code> on GitHub
        to see how it works internally.
      </p>

      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/chunk.ts"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        View on GitHub
      </a>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Related Functions
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigateTo('/stream/flatMap')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            flatMap
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Transform and flatten nested structures (opposite of chunking)
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/map')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">map</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Transform each element individually
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/take')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            take
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Limit the number of chunks to process
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/toArray')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            toArray
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Materialize all chunks into an array
          </p>
        </button>
      </div>
    </div>
  );
};
