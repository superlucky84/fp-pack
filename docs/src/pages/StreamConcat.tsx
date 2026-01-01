import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamConcat = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      concat (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily concatenate multiple iterables in sequence
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream concat?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        concat
      </strong>{' '}
      combines two iterables into a single iterable that yields all values from the second iterable followed by all values from the first iterable. The operation is <strong>lazy</strong> - values are produced on-demand rather than all at once.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Think of it as chaining sequences together: when you iterate through the result, you first get all values from the second iterable, then all values from the first. The curried form follows the pattern: <code>concat(first)(second)</code> produces <code>second...first</code>.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// Sync iterables
function concat<T>(
  other: Iterable<T>,
  iterable: Iterable<T>
): IterableIterator<T>;

// Async iterables
function concat<T>(
  other: AnyIterableInput<PromiseLikeValue<T>>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

// Curried sync form
function concat<T>(
  other: Iterable<T>
): (iterable: Iterable<T>) => IterableIterator<T>;

// Curried async form
function concat<T>(
  other: AnyIterableInput<PromiseLikeValue<T>>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. Simple Concatenation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';

// Direct form: concat(first, second)
const result1 = concat([3, 4], [1, 2]);
Array.from(result1); // [1, 2, 3, 4]
// Yields: second first

// Curried form: concat(first)(second)
const addSuffix = concat([5, 6]);
const result2 = addSuffix([1, 2]);
Array.from(result2); // [1, 2, 5, 6]
// Yields: second first`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. Lazy Evaluation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';

function* numbers() {
  console.log('Generating numbers...');
  yield 1;
  yield 2;
}

function* letters() {
  console.log('Generating letters...');
  yield 'a';
  yield 'b';
}

const combined = concat(letters(), numbers());
// Nothing logged yet - lazy!

const iterator = combined[Symbol.iterator]();
iterator.next(); // Logs: "Generating numbers...", returns { value: 1, done: false }
iterator.next(); // returns { value: 2, done: false }
iterator.next(); // Logs: "Generating letters...", returns { value: 'a', done: false }
iterator.next(); // returns { value: 'b', done: false }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. Combining Data Sources
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Merge data from multiple sources lazily:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';

// Combine cached and fresh data
const cachedUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

async function* fetchNewUsers() {
  const response = await fetch('/api/users/new');
  const users = await response.json();
  for (const user of users) {
    yield user;
  }
}

// Users are yielded as they're available
const allUsers = concat(fetchNewUsers(), cachedUsers);

for await (const user of allUsers) {
  // First: cached users (immediate)
  // Then: new users (as they're fetched)
  displayUser(user);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. Adding Headers and Footers
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat, pipe } from 'fp-pack';
import { concat as streamConcat } from 'fp-pack/stream';

const header = ['<!DOCTYPE html>', '<html>', '<head>'];
const footer = ['</body>', '</html>'];

function* generateBody() {
  yield '<body>';
  yield '<h1>Welcome</h1>';
  yield '<p>Content here</p>';
}

// Build complete HTML document
const htmlDocument = pipe(
  generateBody(),
  streamConcat(footer),
  streamConcat(header)
);

// Lazy: only generates lines as you iterate
for (const line of htmlDocument) {
  console.log(line);
}
// Output:
// <!DOCTYPE html>
// <html>
// <head>
// <body>
// <h1>Welcome</h1>
// <p>Content here</p>
// </body>
// </html>`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      3. Processing Multiple Files
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';
import { createReadStream } from 'fs';

async function* readLines(filePath: string) {
  const stream = createReadStream(filePath, 'utf-8');
  let buffer = '';

  for await (const chunk of stream) {
    buffer += chunk;
    const lines = buffer.split('\\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      yield line;
    }
  }
  if (buffer) yield buffer;
}

// Process multiple log files in sequence
const allLogs = concat(
  readLines('app.log.2'),
  readLines('app.log.1')
);

// Lazy: reads files only as needed
for await (const line of allLogs) {
  if (line.includes('ERROR')) {
    console.error(line);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      4. Infinite Sequence Composition
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat, take } from 'fp-pack/stream';

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* powers() {
  let n = 0;
  while (true) {
    yield 2 ** n;
    n++;
  }
}

// Combine finite prefix with infinite sequence
const numbers = concat(
  fibonacci(),
  [100, 200, 300]
);

// Take first 10 values
const first10 = take(10, numbers);
Array.from(first10);
// [100, 200, 300, 0, 1, 1, 2, 3, 5, 8]
//  ^^^ prefix ^^^ ^^^ fibonacci... ^^^`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      5. Event Stream Merging
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';

async function* listenToEvents(eventName: string) {
  const queue: Event[] = [];
  const handler = (e: Event) => queue.push(e);

  window.addEventListener(eventName, handler);

  try {
    while (true) {
      if (queue.length > 0) {
        yield queue.shift()!;
      }
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  } finally {
    window.removeEventListener(eventName, handler);
  }
}

// Process historical events, then live events
const historicalEvents = [
  { type: 'click', timestamp: 1000 },
  { type: 'scroll', timestamp: 2000 }
];

const allEvents = concat(
  listenToEvents('click'),
  historicalEvents
);

for await (const event of allEvents) {
  console.log('Event:', event);
  // First: historical events
  // Then: live click events as they happen
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      6. Batch Processing with Separators
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat, map } from 'fp-pack/stream';
import { pipe } from 'fp-pack';

type Record = { id: number; data: string };

function* generateRecords(): Iterable<Record> {
  yield { id: 1, data: 'first' };
  yield { id: 2, data: 'second' };
  yield { id: 3, data: 'third' };
}

// Add separator between batches
const separator = [{ id: -1, data: '---BATCH---' }];

const batch1 = generateRecords();
const batch2 = generateRecords();
const batch3 = generateRecords();

// Chain batches with separators
const allBatches = pipe(
  batch1,
  concat(separator),
  concat(batch2),
  concat(separator),
  concat(batch3)
);

for (const record of allBatches) {
  console.log(record);
}
// Output:
// { id: 1, data: 'first' }
// { id: 2, data: 'second' }
// { id: 3, data: 'third' }
// { id: -1, data: '---BATCH---' }
// { id: 1, data: 'first' }
// ...`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use stream concat?
    </h2>

    <div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        1. Lazy Evaluation
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200">
        Values are produced on-demand, so you can work with infinite sequences or large datasets without loading everything into memory. Only the values you actually consume are generated.
      </p>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
        2. Memory Efficient
      </h3>
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200">
        Unlike array concatenation which creates a new array with all elements, stream concat maintains minimal memory overhead by yielding values one at a time. Perfect for processing large or streaming data.
      </p>
    </div>

    <div class="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
        3. Composable
      </h3>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200">
        Works seamlessly with other stream operations like map, filter, and take. Chain multiple concat operations to build complex data pipelines that remain efficient and lazy.
      </p>
    </div>

    <div class="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
        4. Async Support
      </h3>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        Automatically handles both sync and async iterables. You can concatenate data from APIs, file streams, or any async source without special handling. The result adapts to async when needed.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Here's a simplified version of how <strong>concat</strong> works:
    </p>

    <CodeBlock
      language="typescript"
      code={`// Simplified sync implementation
function* concat<T>(
  other: Iterable<T>,
  iterable: Iterable<T>
): IterableIterator<T> {
  // Yield all values from second argument first
  for (const value of iterable) {
    yield value;
  }

  // Then yield all values from first argument
  for (const value of other) {
    yield value;
  }
}

// The curried form allows partial application
function concat<T>(other: Iterable<T>) {
  return function(iterable: Iterable<T>) {
    return concat(other, iterable);
  };
}`}
    />

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 my-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        How it works:
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong>Generator Function:</strong> Returns an iterator that yields values lazily
        </li>
        <li>
          <strong>Sequential Yielding:</strong> First exhausts the second iterable, then the first iterable
        </li>
        <li>
          <strong>No Intermediate Array:</strong> Values are yielded directly without creating intermediate collections
        </li>
        <li>
          <strong>Parameter Order:</strong> Curried form <code>concat(first)(second)</code> yields values in order: second, then first
        </li>
        <li>
          <strong>Async Detection:</strong> If any iterable is async, the result is an async iterator
        </li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">concat</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/concat.ts"
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
        href="/stream/append"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/append');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          append →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Add values to the end of an iterable
        </p>
      </a>

      <a
        href="/stream/prepend"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/prepend');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          prepend →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Add values to the beginning of an iterable
        </p>
      </a>

      <a
        href="/stream/flatten"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatten');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          flatten →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Flatten nested iterables one level deep
        </p>
      </a>

      <a
        href="/stream/zip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/zip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          zip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Combine multiple iterables element-wise
        </p>
      </a>
    </div>
  </div>
);
