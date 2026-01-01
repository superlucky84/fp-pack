import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamAppend = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      append (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily append a value to the end of an iterable
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream append?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        append
      </strong>{' '}
      adds a single value to the end of an iterable, creating a new iterable that yields all original values followed by the appended value. The operation is lazy—values are generated on-demand as you iterate, making it memory-efficient even with large or infinite sequences.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Unlike array methods like <code class="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">push</code> or spread syntax that create immediate copies, append works with any iterable and processes values only when needed. This makes it ideal for data pipelines, event streams, and functional compositions where you need to add a terminator, footer, or final value without materializing the entire sequence.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// Sync version - append value to sync iterable
function append<T>(value: T, iterable: Iterable<T>): IterableIterator<T>;

// Async version - append value to async iterable
function append<T>(
  value: PromiseLikeValue<T>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

// Curried sync version - returns function that appends value
function append<T>(value: T): (iterable: Iterable<T>) => IterableIterator<T>;

// Curried async version - returns function that appends value
function append<T>(
  value: PromiseLikeValue<T>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Simple Append
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';

// Append a single value to an array
const numbers = append(4, [1, 2, 3]);
console.log(Array.from(numbers));
// Output: [1, 2, 3, 4]

// Works with any iterable
function* countTo3() {
  yield 1;
  yield 2;
  yield 3;
}

const withFour = append(4, countTo3());
console.log(Array.from(withFour));
// Output: [1, 2, 3, 4]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Curried Form for Composition
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

// Create reusable append functions
const addFooter = append('--- End of List ---');
const addTotal = append('Total: $1,234.56');

// Use in functional pipelines
const processItems = pipe(
  map((item: string) => \`• \${item}\`),
  addFooter
);

const items = ['Apple', 'Banana', 'Cherry'];
console.log(Array.from(processItems(items)));
// Output:
// • Apple
// • Banana
// • Cherry
// --- End of List ---`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. Adding Terminators to Streams
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';

// Add EOF marker to file chunks
async function* readFileChunks(filename: string) {
  // Simulate reading file in chunks
  yield 'chunk1';
  yield 'chunk2';
  yield 'chunk3';
}

const withEOF = append({ type: 'EOF' }, readFileChunks('data.txt'));

for await (const chunk of withEOF) {
  if (chunk.type === 'EOF') {
    console.log('File reading complete');
  } else {
    console.log('Processing:', chunk);
  }
}
// Output:
// Processing: chunk1
// Processing: chunk2
// Processing: chunk3
// File reading complete`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. Report Generation with Summary
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

interface Transaction {
  id: string;
  amount: number;
  description: string;
}

function generateReport(transactions: Transaction[]) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  const reportLines = pipe(
    map((t: Transaction) => \`\${t.id}: \${t.description} - $\${t.amount}\`),
    append('─'.repeat(50)),
    append(\`Total: $\${total.toFixed(2)}\`)
  );

  return reportLines(transactions);
}

const transactions = [
  { id: 'T001', amount: 123.45, description: 'Purchase' },
  { id: 'T002', amount: 67.89, description: 'Refund' },
  { id: 'T003', amount: 234.56, description: 'Sale' }
];

for (const line of generateReport(transactions)) {
  console.log(line);
}
// Output:
// T001: Purchase - $123.45
// T002: Refund - $67.89
// T003: Sale - $234.56
// ──────────────────────────────────────────────────
// Total: $425.90`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. Event Stream with Completion Event
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';

interface UserEvent {
  type: 'click' | 'scroll' | 'keypress' | 'complete';
  timestamp: number;
  data?: any;
}

async function* captureUserEvents(duration: number) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    // Simulate capturing events
    yield {
      type: 'click' as const,
      timestamp: Date.now(),
      data: { x: 100, y: 200 }
    };

    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

// Add completion marker
const sessionWithCompletion = append(
  { type: 'complete' as const, timestamp: Date.now() },
  captureUserEvents(500)
);

for await (const event of sessionWithCompletion) {
  if (event.type === 'complete') {
    console.log('Session ended at:', new Date(event.timestamp));
  } else {
    console.log(\`Event: \${event.type} at \${event.timestamp}\`);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. API Pagination with Total Count
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';

interface User {
  id: number;
  name: string;
}

async function* fetchAllUsers() {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(\`/api/users?page=\${page}\`);
    const data = await response.json();

    for (const user of data.users) {
      yield user;
    }

    hasMore = data.hasMore;
    page++;
  }
}

// Add metadata at the end
const usersWithCount = (async function*() {
  let count = 0;
  const users = fetchAllUsers();

  for await (const user of users) {
    count++;
    yield user;
  }

  yield { type: 'metadata', totalCount: count };
})();

for await (const item of usersWithCount) {
  if (item.type === 'metadata') {
    console.log(\`Total users fetched: \${item.totalCount}\`);
  } else {
    console.log(\`User: \${item.name}\`);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. Log File with Timestamp Footer
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';
import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

interface LogEntry {
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  timestamp: number;
}

function formatLogs(logs: LogEntry[]) {
  const now = new Date().toISOString();

  return pipe(
    map((log: LogEntry) =>
      \`[\${new Date(log.timestamp).toISOString()}] \${log.level}: \${log.message}\`
    ),
    append(''),
    append(\`Log generated at: \${now}\`)
  )(logs);
}

const logs: LogEntry[] = [
  { level: 'INFO', message: 'Application started', timestamp: Date.now() },
  { level: 'WARN', message: 'High memory usage', timestamp: Date.now() + 1000 },
  { level: 'ERROR', message: 'Database connection failed', timestamp: Date.now() + 2000 }
];

for (const line of formatLogs(logs)) {
  console.log(line);
}
// Output:
// [2025-12-31T10:00:00.000Z] INFO: Application started
// [2025-12-31T10:00:01.000Z] WARN: High memory usage
// [2025-12-31T10:00:02.000Z] ERROR: Database connection failed
//
// Log generated at: 2025-12-31T10:00:02.500Z`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. Infinite Sequence with Limit Marker
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';
import { take } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// Take first 10 fibonacci numbers and add a marker
const limitedFibonacci = pipe(
  take(10),
  append('... (sequence continues)')
);

const result = limitedFibonacci(fibonacci());

for (const value of result) {
  console.log(value);
}
// Output:
// 0
// 1
// 1
// 2
// 3
// 5
// 8
// 13
// 21
// 34
// ... (sequence continues)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use append?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Lazy Evaluation
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Values are generated on-demand without creating intermediate arrays. Works efficiently with infinite sequences and large datasets.
        </p>
      </div>

      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
          Composable Design
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Curried interface integrates seamlessly with pipe and other functional utilities for building declarative data transformation pipelines.
        </p>
      </div>

      <div class="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          Memory Efficient
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          No array copying or materialization required. Processes one value at a time, making it suitable for streaming large files or real-time data.
        </p>
      </div>

      <div class="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
          Universal Compatibility
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          Works with any iterable (arrays, generators, async iterables, sets, maps) and automatically handles both sync and async contexts.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The append function creates a new iterable that first yields all values from the input iterable, then yields the appended value. Here's a simplified implementation:
    </p>

    <CodeBlock
      language="typescript"
      code={`// Simplified sync implementation
function* append<T>(
  value: T,
  iterable: Iterable<T>
): IterableIterator<T> {
  // First, yield all values from the original iterable
  for (const item of iterable) {
    yield item;
  }

  // Then yield the appended value
  yield value;
}

// Async version works the same way
async function* appendAsync<T>(
  value: T | Promise<T>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncIterableIterator<T> {
  // Yield all values from the original iterable
  for await (const item of iterable) {
    yield item;
  }

  // Yield the appended value (await if it's a promise)
  yield await value;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      The key characteristics:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
      <li><strong>Lazy execution</strong>: Values are only generated when iterated</li>
      <li><strong>Single-pass iteration</strong>: Each value from the source is yielded once</li>
      <li><strong>Preserves order</strong>: All original values come first, then the appended value</li>
      <li><strong>No mutation</strong>: Original iterable remains unchanged</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">append</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/append.ts"
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
          navigateTo('/stream/prepend');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          prepend
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Add a value to the beginning of an iterable instead of the end
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/concat');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          concat
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Combine multiple iterables into a single sequence
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatten');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatten
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Flatten nested iterables into a single-level sequence
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/take');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          take
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Take only the first N values from an iterable
        </p>
      </div>
    </div>
  </div>
);
