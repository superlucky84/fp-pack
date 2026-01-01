import { CodeBlock } from '@/components/CodeBlock';

export const StreamDropWhile = () => {
  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
        dropWhile (stream)
      </h1>

      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Lazily skips values from the beginning of a stream while a predicate
        holds, then yields all remaining values. The moment the predicate
        returns false, all subsequent values are included (including the one
        that failed the test).
      </p>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        What is stream dropWhile?
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
          dropWhile
        </strong>{' '}
        is a stream operation that skips elements from the start of a sequence
        as long as a given predicate function returns true. Once the predicate
        returns false for the first time, dropWhile stops testing and yields
        that element along with all remaining elements in the stream.
      </p>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        This is particularly useful when:
      </p>

      <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
        <li>
          You need to skip invalid or warmup data at the beginning of a stream
        </li>
        <li>
          You want to process data only after a certain condition or marker is
          reached
        </li>
        <li>
          You're working with sorted data and need to skip a prefix based on
          dynamic conditions
        </li>
        <li>
          You need to discard initial errors or noise until the data stabilizes
        </li>
      </ul>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Like all stream operations in fp-pack, dropWhile uses lazy evaluation,
        meaning the predicate is only tested until it returns false, and no
        unnecessary iterations occur beyond that point.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, toArray } from 'fp-pack/stream';

// Basic example: skip values less than 3
const data = [1, 2, 3, 4, 2, 1];
const result = toArray(dropWhile((n: number) => n < 3, data));
console.log(result); // [3, 4, 2, 1] - includes 3 and everything after`}
      />

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Type Signature
      </h2>

      <CodeBlock
        language="typescript"
        code={`function dropWhile<T>(
  predicate: (value: T) => boolean,
  iterable: Iterable<T>
): IterableIterator<T>;

function dropWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

function dropWhile<T>(
  predicate: (value: T) => boolean
): (iterable: Iterable<T>) => IterableIterator<T>;

function dropWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
      />

      <div class="mt-6 space-y-4">
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          <strong class="font-semibold">Parameters:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              predicate
            </code>
            : A function that tests each value. Returns{' '}
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              true
            </code>{' '}
            to continue skipping,{' '}
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              false
            </code>{' '}
            to start yielding values
          </li>
          <li>
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              iterable
            </code>
            : The input sequence (sync or async iterable)
          </li>
        </ul>

        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4">
          <strong class="font-semibold">Returns:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            An IterableIterator or AsyncIterableIterator containing all values
            starting from the first value where the predicate returns false
          </li>
          <li>
            Supports curried form: you can call with just the predicate to get a
            reusable function
          </li>
        </ul>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        dropWhile vs drop vs takeWhile
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        While these functions may seem similar, they serve different purposes:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, drop, takeWhile, toArray } from 'fp-pack/stream';

const data = [1, 2, 3, 4, 5, 2, 1];

// dropWhile: skip while condition is true, then yield rest
toArray(dropWhile((n) => n < 3, data)); // [3, 4, 5, 2, 1]

// drop: skip first N items (count-based)
toArray(drop(2, data)); // [3, 4, 5, 2, 1]

// takeWhile: yield while condition is true, then stop
toArray(takeWhile((n) => n < 4, data)); // [1, 2, 3]`}
      />

      <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
        <p class="text-sm md:text-base text-blue-900 dark:text-blue-100 font-semibold mb-2">
          Key Differences
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-blue-800 dark:text-blue-200 space-y-1">
          <li>
            <strong>dropWhile</strong>: condition-based skipping at start, then
            yields all remaining values
          </li>
          <li>
            <strong>drop</strong>: count-based skipping of a fixed number of
            elements
          </li>
          <li>
            <strong>takeWhile</strong>: condition-based yielding until condition
            fails (opposite of dropWhile)
          </li>
        </ul>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Practical Examples
      </h2>

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 1: Skip Invalid Data at Start
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Often sensors or data sources produce invalid readings during startup.
        dropWhile lets you skip these invalid values dynamically:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, toArray } from 'fp-pack/stream';

interface SensorReading {
  timestamp: number;
  value: number;
  isValid: boolean;
}

const readings: SensorReading[] = [
  { timestamp: 1, value: -999, isValid: false },
  { timestamp: 2, value: -999, isValid: false },
  { timestamp: 3, value: 23.5, isValid: true },
  { timestamp: 4, value: 24.1, isValid: true },
  { timestamp: 5, value: 23.8, isValid: true }
];

// Skip all invalid readings at the start
const validReadings = toArray(
  dropWhile((reading) => !reading.isValid, readings)
);

console.log(validReadings);
// [
//   { timestamp: 3, value: 23.5, isValid: true },
//   { timestamp: 4, value: 24.1, isValid: true },
//   { timestamp: 5, value: 23.8, isValid: true }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 2: Skip Warmup Data Until Stabilized
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        When monitoring metrics or performance data, initial values might be
        unstable. Use dropWhile to skip until the data stabilizes:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, map, toArray, pipe } from 'fp-pack/stream';

interface Metric {
  timestamp: number;
  responseTime: number;
  variance: number;
}

const metrics: Metric[] = [
  { timestamp: 1, responseTime: 850, variance: 400 }, // high variance
  { timestamp: 2, responseTime: 720, variance: 350 }, // high variance
  { timestamp: 3, responseTime: 520, variance: 180 }, // stabilizing
  { timestamp: 4, responseTime: 510, variance: 45 },  // stable
  { timestamp: 5, responseTime: 505, variance: 30 },  // stable
  { timestamp: 6, responseTime: 512, variance: 35 }   // stable
];

// Skip metrics until variance is below threshold (stable)
const VARIANCE_THRESHOLD = 100;

const stableMetrics = pipe(
  dropWhile((m: Metric) => m.variance > VARIANCE_THRESHOLD),
  map((m: Metric) => ({
    timestamp: m.timestamp,
    avgResponseTime: m.responseTime
  })),
  toArray
)(metrics);

console.log(stableMetrics);
// [
//   { timestamp: 4, avgResponseTime: 510 },
//   { timestamp: 5, avgResponseTime: 505 },
//   { timestamp: 6, avgResponseTime: 512 }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 3: Process Log Entries After Timestamp
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        When analyzing logs, you often want to skip entries before a specific
        event or timestamp:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, filter, toArray, pipe } from 'fp-pack/stream';

interface LogEntry {
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

const logs: LogEntry[] = [
  { timestamp: new Date('2024-01-01T10:00:00'), level: 'INFO', message: 'App started' },
  { timestamp: new Date('2024-01-01T10:05:00'), level: 'INFO', message: 'User login' },
  { timestamp: new Date('2024-01-01T10:10:00'), level: 'ERROR', message: 'Database connection lost' },
  { timestamp: new Date('2024-01-01T10:12:00'), level: 'WARN', message: 'Retrying connection' },
  { timestamp: new Date('2024-01-01T10:15:00'), level: 'INFO', message: 'Connection restored' },
  { timestamp: new Date('2024-01-01T10:20:00'), level: 'ERROR', message: 'Payment failed' }
];

// Analyze errors that occurred after the database issue
const dbIssueTime = new Date('2024-01-01T10:10:00');

const errorsAfterIncident = pipe(
  dropWhile((log: LogEntry) => log.timestamp < dbIssueTime),
  filter((log: LogEntry) => log.level === 'ERROR'),
  toArray
)(logs);

console.log(errorsAfterIncident);
// [
//   { timestamp: ..., level: 'ERROR', message: 'Database connection lost' },
//   { timestamp: ..., level: 'ERROR', message: 'Payment failed' }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 4: Skip Comment Lines in Data File
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Data files often have comments or metadata at the beginning. dropWhile
        can skip these dynamically:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, map, toArray, pipe } from 'fp-pack/stream';

const dataFile = [
  '# Data export from system',
  '# Generated: 2024-01-01',
  '# Format: name,value,unit',
  '#',
  'temperature,23.5,celsius',
  'humidity,65,percent',
  'pressure,1013,hPa'
];

// Skip all comment lines at start
const parseData = pipe(
  dropWhile((line: string) => line.startsWith('#')),
  map((line: string) => {
    const [name, value, unit] = line.split(',');
    return { name, value: parseFloat(value), unit };
  }),
  toArray
);

const measurements = parseData(dataFile);
console.log(measurements);
// [
//   { name: 'temperature', value: 23.5, unit: 'celsius' },
//   { name: 'humidity', value: 65, unit: 'percent' },
//   { name: 'pressure', value: 1013, unit: 'hPa' }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 5: Async Processing with API Responses
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        When polling an API, skip responses until a certain condition is met:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, map, toArray, pipe } from 'fp-pack/stream';

interface JobStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: any;
}

async function* pollJobStatus(jobId: string): AsyncGenerator<JobStatus> {
  const statuses: JobStatus[] = [
    { id: jobId, status: 'pending', progress: 0 },
    { id: jobId, status: 'processing', progress: 25 },
    { id: jobId, status: 'processing', progress: 50 },
    { id: jobId, status: 'processing', progress: 75 },
    { id: jobId, status: 'completed', progress: 100, result: { data: 'success' } }
  ];

  for (const status of statuses) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield status;
  }
}

// Skip all statuses until job is completed
async function waitForCompletion(jobId: string) {
  const completedStatuses = await pipe(
    dropWhile((status: JobStatus) => status.status !== 'completed'),
    toArray
  )(pollJobStatus(jobId));

  return completedStatuses[0]; // First completed status
}

// Usage
const result = await waitForCompletion('job-123');
console.log(result);
// { id: 'job-123', status: 'completed', progress: 100, result: { data: 'success' } }`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        Example 6: Stateful Condition with Accumulator
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        Sometimes you need to track state across iterations to determine when to
        start yielding values:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, toArray } from 'fp-pack/stream';

interface Trade {
  timestamp: number;
  price: number;
  volume: number;
}

const trades: Trade[] = [
  { timestamp: 1, price: 100, volume: 50 },
  { timestamp: 2, price: 101, volume: 75 },
  { timestamp: 3, price: 102, volume: 100 },  // cumulative volume reaches 225
  { timestamp: 4, price: 103, volume: 50 },
  { timestamp: 5, price: 104, volume: 80 }
];

// Skip trades until cumulative volume exceeds threshold
const VOLUME_THRESHOLD = 200;

function skipUntilVolumeThreshold(trades: Trade[]) {
  let cumulativeVolume = 0;

  return toArray(
    dropWhile((trade: Trade) => {
      cumulativeVolume += trade.volume;
      return cumulativeVolume <= VOLUME_THRESHOLD;
    }, trades)
  );
}

const significantTrades = skipUntilVolumeThreshold(trades);
console.log(significantTrades);
// [
//   { timestamp: 3, price: 102, volume: 100 },  // This pushed us over threshold
//   { timestamp: 4, price: 103, volume: 50 },
//   { timestamp: 5, price: 104, volume: 80 }
// ]

console.log('Skipped volume:', 50 + 75); // 125
console.log('Included volume:', 100 + 50 + 80); // 230`}
      />

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Performance Considerations
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        The dropWhile function leverages lazy evaluation to provide excellent
        performance characteristics:
      </p>

      <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
        <li>
          <strong>Minimal predicate evaluations</strong>: The predicate is only
          called until it returns false for the first time
        </li>
        <li>
          <strong>No intermediate arrays</strong>: Values are yielded one at a
          time without creating intermediate collections
        </li>
        <li>
          <strong>Efficient early stopping</strong>: Once the condition fails,
          no more predicate evaluations occur
        </li>
        <li>
          <strong>Memory efficient</strong>: Only the current value is held in
          memory at any time
        </li>
      </ul>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, toArray, range } from 'fp-pack/stream';

// Efficient: Only checks until condition fails
const largeDataset = range(0, 1_000_000);
const afterWarmup = toArray(
  dropWhile((n: number) => n < 1000, largeDataset)
);
// Checks only first ~1,000 values, then yields remaining 999,000
// Total predicate calls: ~1,000

// Compare with array approach (inefficient)
const arrayApproach = Array.from({ length: 1_000_000 }, (_, i) => i)
  .slice(1000); // Creates full array first
// Memory usage: entire 1M element array`}
      />

      <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded">
        <p class="text-sm md:text-base text-green-900 dark:text-green-100 font-semibold mb-2">
          Performance Tip
        </p>
        <p class="text-sm md:text-base text-green-800 dark:text-green-200">
          When skipping values from the start based on a condition, dropWhile
          is significantly more efficient than filtering the entire stream. If
          you're working with large datasets and only need to skip a prefix,
          dropWhile will stop checking after the first non-matching value,
          while filter would check every single element.
        </p>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Source Code
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        View the implementation of <code class="text-sm">dropWhile</code> on
        GitHub to see how it works internally.
      </p>

      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/dropWhile.ts"
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
          onClick={() => navigateTo('/stream/drop')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            drop
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Skip the first N elements (count-based)
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/takeWhile')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            takeWhile
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Take elements while a condition holds (opposite of dropWhile)
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
            Take the first N elements (count-based)
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/filter')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            filter
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            Filter elements throughout the entire stream based on a condition
          </p>
        </button>
      </div>
    </div>
  );
};
