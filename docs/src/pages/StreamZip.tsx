import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamZip = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      zip (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily combine two iterables into pairs, processing elements from both sources in parallel
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream zip?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        zip
      </strong>{' '}
      combines two iterables element-by-element into tuples <code class="text-sm">[A, B]</code>. It processes both sources in parallel and stops when the shorter iterable is exhausted. This function uses lazy evaluation, meaning pairs are created only as needed during iteration.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      This is particularly useful when:
    </p>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>You need to combine indices with values for enumeration</li>
      <li>You're merging data from two synchronized sources (e.g., timestamps and values)</li>
      <li>You want to map labels or headers to corresponding data</li>
      <li>You're processing parallel data streams that need to be paired</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { zip, toArray } from 'fp-pack/stream';

// Basic usage
const names = ['Alice', 'Bob', 'Charlie'];
const ages = [25, 30, 35, 40]; // Extra element ignored

const pairs = toArray(zip(ages, names));
// [['Alice', 25], ['Bob', 30], ['Charlie', 35]]
// Stops at length of shorter iterable (names)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// Sync iterable
function zip<A, B>(
  other: Iterable<B>,
  iterable: Iterable<A>
): IterableIterator<[A, B]>;

// Async iterable
function zip<A, B>(
  other: AnyIterableInput<PromiseLikeValue<B>>,
  iterable: AnyIterableInput<PromiseLikeValue<A>>
): AsyncIterableIterator<[A, B]>;

// Curried sync
function zip<A, B>(
  other: Iterable<B>
): (iterable: Iterable<A>) => IterableIterator<[A, B]>;

// Curried async
function zip<A, B>(
  other: AnyIterableInput<PromiseLikeValue<B>>
): (iterable: AnyIterableInput<PromiseLikeValue<A>>) => AsyncIterableIterator<[A, B]>;`}
    />

    <div class="mt-6 space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
      <p><strong>Parameters:</strong></p>
      <ul class="list-disc list-inside space-y-2 ml-4">
        <li>
          <code class="text-sm">other: Iterable&lt;B&gt;</code> - The second iterable to zip with (provides second element of each tuple)
        </li>
        <li>
          <code class="text-sm">iterable: Iterable&lt;A&gt;</code> - The first iterable (provides first element of each tuple)
        </li>
      </ul>
      <p><strong>Returns:</strong></p>
      <ul class="list-disc list-inside space-y-2 ml-4">
        <li>
          <code class="text-sm">IterableIterator&lt;[A, B]&gt;</code> - Iterator yielding tuples combining elements from both iterables
        </li>
        <li>
          Stops when either iterable is exhausted (uses length of shorter iterable)
        </li>
      </ul>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      zip vs zipWith vs Object.entries
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Understanding when to use each pairing function:
    </p>

    <div class="mb-6 p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
      <CodeBlock
        language="typescript"
        code={`import { zip, zipWith } from 'fp-pack/stream';

const names = ['Alice', 'Bob', 'Charlie'];
const scores = [95, 87, 92];

// zip: Creates tuples [A, B]
toArray(zip(scores, names));
// [['Alice', 95], ['Bob', 87], ['Charlie', 92]]

// zipWith: Applies custom transformation
toArray(zipWith((name, score) => \`\${name}: \${score}\`, scores, names));
// ['Alice: 95', 'Bob: 87', 'Charlie: 92']

// Object.entries: Only for objects, returns [key, value]
Object.entries({ alice: 95, bob: 87 });
// [['alice', 95], ['bob', 87]]

// zip works with any iterables
const set1 = new Set([1, 2, 3]);
const set2 = new Set(['a', 'b', 'c']);
toArray(zip(set2, set1));
// [[1, 'a'], [2, 'b'], [3, 'c']]`}
      />
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      1. Enumerate with Indices
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Add indices to elements for enumeration (like Python's <code class="text-sm">enumerate</code>):
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, zip, map, toArray } from 'fp-pack/stream';

const items = ['Apple', 'Banana', 'Cherry'];

// Create enumerated list with indices starting from 1
const enumerated = pipe(
  zip(range(1, Infinity), items),
  map(([item, index]) => \`\${index}. \${item}\`),
  toArray
);

console.log(enumerated);
// ['1. Apple', '2. Banana', '3. Cherry']

// Or with custom starting index
const startFrom5 = pipe(
  zip(range(5, Infinity), items),
  toArray
);
// [['Apple', 5], ['Banana', 6], ['Cherry', 7]]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. Combine Labels with Data
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Map column headers to row values for structured data processing:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { zip, map, toArray } from 'fp-pack/stream';

const headers = ['Name', 'Age', 'City'];
const row1 = ['Alice', 25, 'NYC'];
const row2 = ['Bob', 30, 'LA'];

// Convert rows to objects
const parseRow = (row: any[]) =>
  pipe(
    zip(row, headers),
    (pairs) => Object.fromEntries(pairs)
  );

console.log(parseRow(row1));
// { Name: 'Alice', Age: 25, City: 'NYC' }

console.log(parseRow(row2));
// { Name: 'Bob', Age: 30, City: 'LA' }

// Process CSV-like data
function* csvRows() {
  yield ['Alice', 25, 'NYC'];
  yield ['Bob', 30, 'LA'];
  yield ['Charlie', 35, 'SF'];
}

const records = pipe(
  csvRows(),
  map(parseRow),
  toArray
);
// [
//   { Name: 'Alice', Age: 25, City: 'NYC' },
//   { Name: 'Bob', Age: 30, City: 'LA' },
//   { Name: 'Charlie', Age: 35, City: 'SF' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. Merge Parallel API Responses
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Combine data from two API endpoints that return related information:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-pack';
import { zip, map, toArray } from 'fp-pack/stream';

// Fetch user profiles and their statistics in parallel
async function fetchUserData(userIds: number[]) {
  const [profiles, stats] = await Promise.all([
    fetch('/api/profiles').then(r => r.json()),
    fetch('/api/stats').then(r => r.json())
  ]);

  // Combine profile with stats
  return await pipeAsync(
    zip(stats, profiles),
    map(([profile, stat]) => ({
      ...profile,
      totalPosts: stat.posts,
      followers: stat.followers,
      engagement: stat.likes / stat.posts
    })),
    toArray
  );
}

// Usage
const userData = await fetchUserData([1, 2, 3]);
// [
//   { id: 1, name: 'Alice', totalPosts: 42, followers: 1200, engagement: 28.5 },
//   { id: 2, name: 'Bob', totalPosts: 38, followers: 890, engagement: 23.4 },
//   ...
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. Pair Timestamps with Events
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Attach timing information to events for logging or analytics:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { zip, map, filter, toArray } from 'fp-pack/stream';

// Generate events with timestamps
function* eventStream() {
  yield { type: 'click', target: 'button' };
  yield { type: 'scroll', position: 100 };
  yield { type: 'click', target: 'link' };
}

function* timestampStream() {
  yield Date.now();
  yield Date.now() + 100;
  yield Date.now() + 250;
}

// Add timestamps to events
const timedEvents = pipe(
  zip(timestampStream(), eventStream()),
  map(([event, timestamp]) => ({
    ...event,
    timestamp,
    readableTime: new Date(timestamp).toISOString()
  })),
  toArray
);

// Filter and analyze
const clicks = pipe(
  zip(timestampStream(), eventStream()),
  filter(([event]) => event.type === 'click'),
  map(([event, timestamp]) => ({
    target: event.target,
    time: timestamp
  })),
  toArray
);

console.log(clicks);
// [
//   { target: 'button', time: 1704067200000 },
//   { target: 'link', time: 1704067200250 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. Combine Matrix Rows and Columns
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Process tabular data by pairing row and column information:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, zip, map, flatMap, toArray } from 'fp-pack/stream';

// Create coordinate pairs for a grid
const createGrid = (rows: number, cols: number) =>
  pipe(
    range(0, rows),
    flatMap(row =>
      pipe(
        range(0, cols),
        map(col => [row, col] as [number, number])
      )
    ),
    toArray
  );

const grid = createGrid(3, 3);
// [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], ...]

// Process matrix values with coordinates
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const processMatrix = (matrix: number[][]) =>
  pipe(
    matrix,
    flatMap((row, rowIdx) =>
      pipe(
        zip(range(0, row.length), row),
        map(([value, colIdx]) => ({
          row: rowIdx,
          col: colIdx,
          value,
          diagonal: rowIdx === colIdx
        }))
      )
    ),
    toArray
  );

const processed = processMatrix(matrix);
// [
//   { row: 0, col: 0, value: 1, diagonal: true },
//   { row: 0, col: 1, value: 2, diagonal: false },
//   ...
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. Process Async Streams in Parallel
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Combine multiple async data sources with automatic Promise handling:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-pack';
import { zip, map, filter, toArray } from 'fp-pack/stream';

// Async generators for real-time data
async function* sensorA() {
  yield await Promise.resolve({ temp: 22.5, time: Date.now() });
  yield await Promise.resolve({ temp: 23.1, time: Date.now() + 1000 });
  yield await Promise.resolve({ temp: 22.8, time: Date.now() + 2000 });
}

async function* sensorB() {
  yield await Promise.resolve({ humidity: 45, time: Date.now() });
  yield await Promise.resolve({ humidity: 47, time: Date.now() + 1000 });
  yield await Promise.resolve({ humidity: 46, time: Date.now() + 2000 });
}

// Combine sensor readings
const combinedReadings = await pipeAsync(
  zip(sensorB(), sensorA()),
  map(([readingA, readingB]) => ({
    timestamp: readingA.time,
    temperature: readingA.temp,
    humidity: readingB.humidity,
    heatIndex: readingA.temp + (readingB.humidity * 0.1)
  })),
  filter(reading => reading.temperature > 23),
  toArray
);

// Works with Promise-wrapped iterables too
const dataA = Promise.resolve([1, 2, 3]);
const dataB = Promise.resolve(['a', 'b', 'c']);

const result = await pipeAsync(
  zip(dataB, dataA),
  toArray
);
// [[1, 'a'], [2, 'b'], [3, 'c']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Performance Considerations
    </h2>

    <div class="p-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded mb-6">
      <p class="text-sm md:text-base text-green-900 dark:text-green-100 font-semibold mb-2">
        💡 Lazy Evaluation Benefits
      </p>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 mb-3">
        <code class="text-sm">zip</code> uses lazy evaluation - pairs are created only as consumed. This is memory-efficient for large or infinite iterables.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { pipe } from 'fp-pack';
import { range, zip, take, toArray } from 'fp-pack/stream';

// Efficient: Only creates 3 pairs even with infinite ranges
const first3 = pipe(
  zip(range(0, Infinity), range(100, Infinity)),
  take(3),
  toArray
);
// [[0, 100], [1, 101], [2, 102]]

// Memory efficient for large datasets
const largeData1 = range(0, 1000000);
const largeData2 = range(0, 1000000);

// Only materializes what you need
const sample = pipe(
  zip(largeData2, largeData1),
  take(10),  // Only processes 10 pairs, not 1 million
  toArray
);`}
      />
    </div>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>Stops at shorter iterable:</strong> Automatically handles mismatched lengths without errors</li>
      <li><strong>Curried for composition:</strong> Perfect for pipe chains - <code class="text-sm">pipe(data, zip(labels), ...)</code></li>
      <li><strong>Works with generators:</strong> Can zip infinite or lazy sequences efficiently</li>
      <li><strong>Async support:</strong> Automatically handles Promises and async iterables</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">zip</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/zip.ts"
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
      <button
        onClick={() => navigateTo('/stream/zipWith')}
        class="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
      >
        <div class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
          zipWith →
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Combine iterables with custom transformation function
        </div>
      </button>

      <button
        onClick={() => navigateTo('/stream/map')}
        class="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
      >
        <div class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
          map →
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Transform each element lazily (useful after zip)
        </div>
      </button>

      <button
        onClick={() => navigateTo('/stream/concat')}
        class="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
      >
        <div class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
          concat →
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Concatenate iterables sequentially (vs parallel zipping)
        </div>
      </button>

      <button
        onClick={() => navigateTo('/stream/toArray')}
        class="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
      >
        <div class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
          toArray →
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          Materialize the zipped stream into an array
        </div>
      </button>
    </div>
  </div>
);
