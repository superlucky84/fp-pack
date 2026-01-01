import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamMap = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      map (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily transform each value in an iterable with a mapping function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream map?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        map
      </strong>{' '}
      transforms each value in an iterable by applying a function to it, creating a new iterable with the transformed values. The operation is lazy—values are transformed on-demand as you iterate, making it memory-efficient even with large or infinite sequences.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Unlike array's <code class="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">map</code> method that creates a new array immediately, stream map works with any iterable and processes values only when needed. This makes it ideal for data transformation pipelines, processing large datasets, and functional compositions where you want to transform data without materializing intermediate results.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// Sync version - transform sync iterable with sync function
function map<T, R>(fn: (value: T) => R, iterable: Iterable<T>): IterableIterator<R>;

// Async version - transform with async function or async iterable
function map<T, R>(
  fn: (value: T) => R | Promise<R>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<R>;

// Curried sync version - returns function that transforms iterable
function map<T, R>(fn: (value: T) => R): (iterable: Iterable<T>) => IterableIterator<R>;

// Curried async version - returns function that transforms iterable
function map<T, R>(
  fn: (value: T) => R | Promise<R>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Simple Transformation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';

// Double each number
const doubled = map((n: number) => n * 2, [1, 2, 3, 4]);
console.log(Array.from(doubled));
// Output: [2, 4, 6, 8]

// Transform objects
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

const names = map((user: typeof users[0]) => user.name, users);
console.log(Array.from(names));
// Output: ['Alice', 'Bob']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Curried Form for Composition
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { filter } from 'fp-pack/stream';

// Create reusable transformation functions
const double = map((n: number) => n * 2);
const toUpperCase = map((s: string) => s.toUpperCase());

// Use in functional pipelines
const processNumbers = pipe(
  filter((n: number) => n > 0),
  double,
  map((n: number) => \`Result: \${n}\`)
);

const numbers = [-1, 2, -3, 4, 5];
console.log(Array.from(processNumbers(numbers)));
// Output: ['Result: 4', 'Result: 8', 'Result: 10']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. Data Normalization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

interface RawUser {
  first_name: string;
  last_name: string;
  email_address: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
}

const rawUsers: RawUser[] = [
  { first_name: 'John', last_name: 'Doe', email_address: 'john@example.com' },
  { first_name: 'Jane', last_name: 'Smith', email_address: 'jane@example.com' }
];

// Normalize data structure
const normalizeUser = map((raw: RawUser): User => ({
  firstName: raw.first_name,
  lastName: raw.last_name,
  email: raw.email_address,
  fullName: \`\${raw.first_name} \${raw.last_name}\`
}));

const users = Array.from(normalizeUser(rawUsers));
console.log(users[0]);
// Output: { firstName: 'John', lastName: 'Doe', email: 'john@example.com', fullName: 'John Doe' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. Async Data Fetching
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';

interface UserId {
  id: number;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

async function fetchUserProfile(userId: number): Promise<UserProfile> {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
}

const userIds = [1, 2, 3, 4, 5];

// Map IDs to user profiles asynchronously
const userProfiles = map(
  async (id: number) => await fetchUserProfile(id),
  userIds
);

// Process each profile as it's fetched
for await (const profile of userProfiles) {
  console.log(\`Loaded: \${profile.name} (\${profile.email})\`);
}
// Output:
// Loaded: Alice (alice@example.com)
// Loaded: Bob (bob@example.com)
// ...`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. File Processing Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { filter } from 'fp-pack/stream';

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

async function* readLogFile(filename: string) {
  // Simulate reading log file line by line
  const lines = [
    '2025-12-31T10:00:00Z INFO Application started',
    '2025-12-31T10:00:01Z WARN High memory usage',
    '2025-12-31T10:00:02Z ERROR Database connection failed',
    '2025-12-31T10:00:03Z INFO Request processed'
  ];

  for (const line of lines) {
    yield line;
  }
}

// Parse log line into structured data
const parseLine = (line: string): LogEntry => {
  const [timestamp, level, ...messageParts] = line.split(' ');
  return {
    timestamp,
    level: level as LogEntry['level'],
    message: messageParts.join(' ')
  };
};

// Process log file
const processLogs = pipe(
  map(parseLine),
  filter((entry: LogEntry) => entry.level === 'ERROR'),
  map((entry: LogEntry) => ({
    ...entry,
    alertSent: true
  }))
);

const logEntries = processLogs(readLogFile('app.log'));

for await (const entry of logEntries) {
  console.log(\`[ALERT] \${entry.timestamp}: \${entry.message}\`);
}
// Output:
// [ALERT] 2025-12-31T10:00:02Z: Database connection failed`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. Price Calculation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

interface Product {
  id: string;
  name: string;
  basePrice: number;
  taxRate: number;
}

interface PricedProduct extends Product {
  tax: number;
  finalPrice: number;
  displayPrice: string;
}

const products: Product[] = [
  { id: 'P1', name: 'Laptop', basePrice: 1000, taxRate: 0.1 },
  { id: 'P2', name: 'Mouse', basePrice: 25, taxRate: 0.1 },
  { id: 'P3', name: 'Keyboard', basePrice: 75, taxRate: 0.1 }
];

const calculatePrices = pipe(
  map((product: Product): PricedProduct => {
    const tax = product.basePrice * product.taxRate;
    const finalPrice = product.basePrice + tax;
    return {
      ...product,
      tax,
      finalPrice,
      displayPrice: \`$\${finalPrice.toFixed(2)}\`
    };
  })
);

const pricedProducts = Array.from(calculatePrices(products));
console.log(pricedProducts[0]);
// Output: { id: 'P1', name: 'Laptop', basePrice: 1000, taxRate: 0.1, tax: 100, finalPrice: 1100, displayPrice: '$1100.00' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. URL Generation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';

interface ImageMetadata {
  id: string;
  filename: string;
  width: number;
  height: number;
}

interface ImageWithUrls extends ImageMetadata {
  thumbnail: string;
  original: string;
  cdn: string;
}

const images: ImageMetadata[] = [
  { id: 'img1', filename: 'photo.jpg', width: 1920, height: 1080 },
  { id: 'img2', filename: 'avatar.png', width: 512, height: 512 }
];

const CDN_BASE = 'https://cdn.example.com';
const API_BASE = 'https://api.example.com';

const addImageUrls = map((img: ImageMetadata): ImageWithUrls => ({
  ...img,
  thumbnail: \`\${API_BASE}/images/\${img.id}/thumbnail\`,
  original: \`\${API_BASE}/images/\${img.id}/original\`,
  cdn: \`\${CDN_BASE}/\${img.filename}\`
}));

const imagesWithUrls = Array.from(addImageUrls(images));
console.log(imagesWithUrls[0]);
// Output: {
//   id: 'img1',
//   filename: 'photo.jpg',
//   width: 1920,
//   height: 1080,
//   thumbnail: 'https://api.example.com/images/img1/thumbnail',
//   original: 'https://api.example.com/images/img1/original',
//   cdn: 'https://cdn.example.com/photo.jpg'
// }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. Infinite Sequence Transformation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { take } from 'fp-pack/stream';

// Infinite sequence of natural numbers
function* naturalNumbers() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

// Transform infinite sequence
const processSequence = pipe(
  map((n: number) => n * n),           // Square each number
  map((n: number) => ({ square: n, isEven: n % 2 === 0 })),
  take(5)                               // Take first 5
);

const result = Array.from(processSequence(naturalNumbers()));
console.log(result);
// Output:
// [
//   { square: 1, isEven: false },
//   { square: 4, isEven: true },
//   { square: 9, isEven: false },
//   { square: 16, isEven: true },
//   { square: 25, isEven: false }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use map?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Lazy Evaluation
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Transformations are applied on-demand without creating intermediate arrays. Works efficiently with infinite sequences and large datasets.
        </p>
      </div>

      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
          Composable Design
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Curried interface integrates seamlessly with pipe and other functional utilities for building declarative transformation pipelines.
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
          Works with any iterable (arrays, generators, async iterables, sets, maps) and automatically handles both sync and async transformations.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The map function creates a new iterable that applies a transformation function to each value from the input iterable. Here's a simplified implementation:
    </p>

    <CodeBlock
      language="typescript"
      code={`// Simplified sync implementation
function* map<T, R>(
  fn: (value: T) => R,
  iterable: Iterable<T>
): IterableIterator<R> {
  // Apply transformation to each value
  for (const value of iterable) {
    yield fn(value);
  }
}

// Async version handles promises
async function* mapAsync<T, R>(
  fn: (value: T) => R | Promise<R>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncIterableIterator<R> {
  // Apply transformation to each value, awaiting if needed
  for await (const value of iterable) {
    yield await fn(value);
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      The key characteristics:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
      <li><strong>Lazy execution</strong>: Transformations are only applied when values are consumed</li>
      <li><strong>One-to-one mapping</strong>: Each input value produces exactly one output value</li>
      <li><strong>Preserves order</strong>: Output values appear in the same order as input values</li>
      <li><strong>No mutation</strong>: Original iterable remains unchanged</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">map</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/map.ts"
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
          navigateTo('/stream/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Filter values based on a predicate function
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatMap
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Map and flatten in a single operation
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/reduce');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          reduce
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Reduce an iterable to a single value
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          pipe
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Compose multiple transformations into a pipeline
        </p>
      </div>
    </div>
  </div>
);
