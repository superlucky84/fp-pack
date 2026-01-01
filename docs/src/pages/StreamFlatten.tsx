import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFlatten = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flatten (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily flatten nested iterables into a single-level sequence
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream flatten?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flatten
      </strong>{' '}
      is a stream utility that takes an iterable of iterables and produces a single flattened sequence by concatenating all nested iterables. Unlike array methods that create intermediate arrays, this function processes values lazily, yielding each item from nested iterables one at a time without materializing the entire result in memory.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The function performs shallow flattening (one level deep), making it perfect for combining results from multiple sources, merging batch processing outputs, or working with data that naturally comes in nested chunks. It supports both synchronous and asynchronous iterables, automatically detecting and handling async sources without additional configuration.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// Sync iterable of iterables
function flatten<T>(
  iterable: Iterable<Iterable<T>>
): IterableIterator<T>;

// Async iterable or async nested iterables
function flatten<T>(
  iterable: AnyIterableInput<PromiseLikeValue<Iterable<T>>>
): AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Simple Flattening
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatten } from 'fp-pack/stream';

// Flatten array of arrays
const nested = [[1, 2], [3, 4], [5]];
const flat = flatten(nested);

console.log(Array.from(flat));
// [1, 2, 3, 4, 5]

// Flatten generator outputs
function* generateBatches() {
  yield [1, 2, 3];
  yield [4, 5];
  yield [6, 7, 8, 9];
}

const numbers = flatten(generateBatches());
console.log(Array.from(numbers));
// [1, 2, 3, 4, 5, 6, 7, 8, 9]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      With Async Iterables
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatten, toArray } from 'fp-pack/stream';

async function* fetchBatches() {
  yield Promise.resolve([1, 2, 3]);
  yield Promise.resolve([4, 5]);
  yield Promise.resolve([6, 7]);
}

const asyncFlat = flatten(fetchBatches());
const result = await toArray(asyncFlat);
console.log(result);
// [1, 2, 3, 4, 5, 6, 7]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. Batch Processing Results
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Merge results from batch operations into a single stream for further processing.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, map, pipe } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
}

// Process users in batches of 100
async function* fetchUsersInBatches(
  totalUsers: number,
  batchSize: number = 100
): AsyncIterableIterator<User[]> {
  for (let offset = 0; offset < totalUsers; offset += batchSize) {
    const response = await fetch(
      \`/api/users?offset=\${offset}&limit=\${batchSize}\`
    );
    const batch: User[] = await response.json();
    yield batch;
  }
}

// Flatten batches into a single stream of users
const allUsers = flatten(fetchUsersInBatches(1000));

// Process each user individually without loading all in memory
for await (const user of allUsers) {
  console.log(\`Processing user: \${user.name}\`);
  // Individual user processing logic here
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. Multiple Data Source Merging
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Combine data from multiple independent sources into a unified stream.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten } from 'fp-pack/stream';

interface LogEntry {
  timestamp: Date;
  level: string;
  message: string;
  source: string;
}

async function* readLogsFromDatabase(): AsyncIterableIterator<LogEntry> {
  // Fetch logs from database
  const logs = await fetchDatabaseLogs();
  for (const log of logs) {
    yield log;
  }
}

async function* readLogsFromFiles(): AsyncIterableIterator<LogEntry> {
  // Read logs from log files
  const files = await getLogFiles();
  for (const file of files) {
    const logs = await parseLogFile(file);
    for (const log of logs) {
      yield log;
    }
  }
}

async function* readLogsFromCloudStorage(): AsyncIterableIterator<LogEntry> {
  // Fetch logs from cloud storage
  const cloudLogs = await fetchCloudLogs();
  for (const log of cloudLogs) {
    yield log;
  }
}

// Combine all log sources
const dataSources = [
  readLogsFromDatabase(),
  readLogsFromFiles(),
  readLogsFromCloudStorage(),
];

const allLogs = flatten(dataSources);

// Process logs from all sources uniformly
for await (const log of allLogs) {
  if (log.level === 'ERROR') {
    console.error(\`[\${log.source}] \${log.message}\`);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. Chunked Data Processing
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Process data that arrives in chunks and flatten for uniform handling.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, filter, pipe } from 'fp-pack';

// Simulate reading a large file in chunks
function* readFileInChunks(filePath: string): IterableIterator<string[]> {
  const chunkSize = 1000;

  // In real implementation, read actual file
  const mockLines = Array.from({ length: 5000 }, (_, i) =>
    \`Line \${i + 1}: Some data\`
  );

  for (let i = 0; i < mockLines.length; i += chunkSize) {
    yield mockLines.slice(i, i + chunkSize);
  }
}

// Flatten chunks and process line by line
const processedLines = pipe(
  flatten,
  filter((line: string) => !line.includes('error')),
  function* (lines: Iterable<string>) {
    for (const line of lines) {
      yield line.toUpperCase();
    }
  }
)(readFileInChunks('large-data.txt'));

let lineCount = 0;
for (const line of processedLines) {
  lineCount++;
  // Process each line without loading entire file
}
console.log(\`Processed \${lineCount} lines\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. Multiple File Reading
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Read and merge contents from multiple files into a single stream.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, map, pipe } from 'fp-pack';
import { readFile } from 'fs/promises';

async function* readFileLines(
  filePath: string
): AsyncIterableIterator<string> {
  const content = await readFile(filePath, 'utf-8');
  const lines = content.split('\\n');

  for (const line of lines) {
    if (line.trim()) {
      yield line;
    }
  }
}

const configFiles = [
  './config/development.json',
  './config/production.json',
  './config/test.json',
];

// Create an iterable of async iterables
function* getFileReaders(files: string[]) {
  for (const file of files) {
    yield readFileLines(file);
  }
}

// Flatten all file contents into a single stream
const allConfigLines = flatten(getFileReaders(configFiles));

interface ConfigEntry {
  file: string;
  line: string;
}

const configs: ConfigEntry[] = [];
for await (const line of allConfigLines) {
  try {
    const parsed = JSON.parse(line);
    configs.push(parsed);
  } catch (error) {
    console.warn(\`Skipping invalid JSON line: \${line}\`);
  }
}

console.log(\`Loaded \${configs.length} configuration entries\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. Paginated API Results
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Flatten paginated API responses into a continuous stream of items.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, take, pipe } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface PageResponse {
  items: Product[];
  nextPage: number | null;
}

async function* fetchAllPages(): AsyncIterableIterator<Product[]> {
  let currentPage = 1;

  while (currentPage) {
    const response = await fetch(
      \`/api/products?page=\${currentPage}\`
    );
    const data: PageResponse = await response.json();

    yield data.items;

    currentPage = data.nextPage ?? 0;
  }
}

// Flatten pages into individual products
const allProducts = flatten(fetchAllPages());

// Process products one at a time
const processProducts = pipe(
  take(100) // Only process first 100 products
);

const limitedProducts = processProducts(allProducts);

for await (const product of limitedProducts) {
  console.log(\`Product: \${product.name} - $\${product.price}\`);
}

// Calculate statistics without loading all products
async function calculateAveragePrice() {
  let total = 0;
  let count = 0;

  const products = flatten(fetchAllPages());

  for await (const product of products) {
    total += product.price;
    count++;
  }

  return count > 0 ? total / count : 0;
}

const avgPrice = await calculateAveragePrice();
console.log(\`Average price: $\${avgPrice.toFixed(2)}\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. Stream Combination in Data Pipeline
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Combine multiple processing streams in a data transformation pipeline.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, filter, map, pipe } from 'fp-pack';

interface DataPoint {
  sensor: string;
  value: number;
  timestamp: Date;
}

function* sensorA(): IterableIterator<DataPoint> {
  for (let i = 0; i < 100; i++) {
    yield {
      sensor: 'A',
      value: Math.random() * 100,
      timestamp: new Date(Date.now() + i * 1000),
    };
  }
}

function* sensorB(): IterableIterator<DataPoint> {
  for (let i = 0; i < 100; i++) {
    yield {
      sensor: 'B',
      value: Math.random() * 50,
      timestamp: new Date(Date.now() + i * 1000),
    };
  }
}

function* sensorC(): IterableIterator<DataPoint> {
  for (let i = 0; i < 100; i++) {
    yield {
      sensor: 'C',
      value: Math.random() * 75,
      timestamp: new Date(Date.now() + i * 1000),
    };
  }
}

// Combine all sensor streams
const sensors = [sensorA(), sensorB(), sensorC()];

const processedData = pipe(
  flatten,
  filter((point: DataPoint) => point.value > 25),
  map((point: DataPoint) => ({
    ...point,
    normalized: point.value / 100,
  }))
)(sensors);

const anomalies: DataPoint[] = [];
for (const point of processedData) {
  if (point.normalized > 0.9) {
    anomalies.push(point);
  }
}

console.log(\`Found \${anomalies.length} anomalies\`);
anomalies.forEach(anomaly => {
  console.log(
    \`Sensor \${anomaly.sensor}: \${anomaly.value.toFixed(2)} ` +
    `at \${anomaly.timestamp.toISOString()}\`
  );
});`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use flatten?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Memory Efficient Merging
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Processes nested iterables lazily without creating intermediate arrays, making it ideal for combining large datasets or infinite streams without memory overhead.
        </p>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
          Batch Processing Integration
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Perfect for scenarios where data arrives in batches or chunks, allowing you to process individual items uniformly while maintaining batch efficiency.
        </p>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          Multiple Source Consolidation
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          Seamlessly combines data from multiple independent sources (files, APIs, databases) into a unified stream for consistent processing.
        </p>
      </div>

      <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          Async-Ready Design
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          Automatically handles async iterables, making it easy to work with asynchronous data sources like API calls or file I/O without manual promise management.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      The <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">flatten</code> function is implemented as a lazy iterator that yields items from nested iterables one at a time:
    </p>

    <CodeBlock
      language="typescript"
      code={`// Simplified implementation
function* flatten<T>(
  iterable: Iterable<Iterable<T>>
): IterableIterator<T> {
  for (const nestedIterable of iterable) {
    // Yield each item from the nested iterable
    for (const item of nestedIterable) {
      yield item;
    }
  }
}

// For async support
async function* flattenAsync<T>(
  iterable: AsyncIterable<Iterable<T>>
): AsyncIterableIterator<T> {
  for await (const nestedIterable of iterable) {
    for await (const item of nestedIterable) {
      yield item;
    }
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      The function performs shallow flattening (one level deep). It evaluates lazily, processing only the values that are actually consumed. This makes it highly efficient for large or infinite sequences, and allows early termination when combined with operations like <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">take</code> or <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">find</code>.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">flatten</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/flatten.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatMap
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Combine mapping and flattening in one operation. Use when you need to transform and flatten simultaneously.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/concat');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          concat
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Concatenate multiple iterables sequentially. Use when combining sequences at the same nesting level.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Transform each value without flattening. Often used before flatten to prepare nested structures.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/reduce');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          reduce
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Aggregate values from a flattened stream. Use after flatten to compute summary statistics or combine results.
        </p>
      </div>
    </div>
  </div>
);
