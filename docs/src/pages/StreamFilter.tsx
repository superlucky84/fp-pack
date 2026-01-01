import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFilter = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      filter (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily filter values in an iterable based on a predicate function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream filter?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        filter
      </strong>{' '}
      selects values from an iterable that satisfy a predicate function, creating a new iterable containing only the matching values. The operation is lazy—values are tested and filtered on-demand as you iterate, making it memory-efficient even with large or infinite sequences.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Unlike array's <code class="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">filter</code> method that creates a new array immediately, stream filter works with any iterable and processes values only when needed. This makes it ideal for data filtering pipelines, processing large datasets, and functional compositions where you want to exclude unwanted data without materializing intermediate results.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// Sync version - filter sync iterable with sync predicate
function filter<T>(
  predicate: (value: T) => boolean,
  iterable: Iterable<T>
): IterableIterator<T>;

// Async version - filter with async predicate or async iterable
function filter<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

// Curried sync version - returns function that filters iterable
function filter<T>(
  predicate: (value: T) => boolean
): (iterable: Iterable<T>) => IterableIterator<T>;

// Curried async version - returns function that filters iterable
function filter<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Simple Filtering
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';

// Filter even numbers
const evens = filter((n: number) => n % 2 === 0, [1, 2, 3, 4, 5, 6]);
console.log(Array.from(evens));
// Output: [2, 4, 6]

// Filter active users
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
];

const activeUsers = filter((user: typeof users[0]) => user.active, users);
console.log(Array.from(activeUsers));
// Output: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Curried Form for Composition
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

// Create reusable filter functions
const isPositive = filter((n: number) => n > 0);
const isEven = filter((n: number) => n % 2 === 0);
const isLongString = filter((s: string) => s.length > 5);

// Use in functional pipelines
const processNumbers = pipe(
  isPositive,
  isEven,
  map((n: number) => n * 2)
);

const numbers = [-2, -1, 0, 1, 2, 3, 4, 5];
console.log(Array.from(processNumbers(numbers)));
// Output: [4, 8] (positive evens: 2, 4 doubled)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. Data Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

interface FormData {
  email: string;
  age: number;
  agreed: boolean;
}

const submissions: FormData[] = [
  { email: 'valid@example.com', age: 25, agreed: true },
  { email: 'invalid', age: 15, agreed: true },
  { email: 'another@example.com', age: 30, agreed: false },
  { email: 'good@example.com', age: 22, agreed: true }
];

const isValidEmail = (email: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
const isAdult = (age: number) => age >= 18;

// Filter valid submissions
const validSubmissions = pipe(
  filter((data: FormData) => isValidEmail(data.email)),
  filter((data: FormData) => isAdult(data.age)),
  filter((data: FormData) => data.agreed)
);

const valid = Array.from(validSubmissions(submissions));
console.log(valid);
// Output: [
//   { email: 'valid@example.com', age: 25, agreed: true },
//   { email: 'good@example.com', age: 22, agreed: true }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. Search and Query
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 'P1', name: 'Laptop', category: 'Electronics', price: 1200, inStock: true },
  { id: 'P2', name: 'Mouse', category: 'Electronics', price: 25, inStock: true },
  { id: 'P3', name: 'Desk', category: 'Furniture', price: 350, inStock: false },
  { id: 'P4', name: 'Chair', category: 'Furniture', price: 180, inStock: true }
];

// Search query: Electronics under $500 in stock
const searchProducts = (
  category: string,
  maxPrice: number,
  inStockOnly: boolean
) => pipe(
  filter((p: Product) => p.category === category),
  filter((p: Product) => p.price <= maxPrice),
  filter((p: Product) => !inStockOnly || p.inStock)
);

const results = Array.from(
  searchProducts('Electronics', 500, true)(products)
);

console.log(results);
// Output: [{ id: 'P2', name: 'Mouse', category: 'Electronics', price: 25, inStock: true }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. Log Analysis
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

interface LogEntry {
  timestamp: Date;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  service: string;
  message: string;
}

async function* readLogs(): AsyncIterableIterator<LogEntry> {
  // Simulate streaming logs
  const logs: LogEntry[] = [
    { timestamp: new Date(), level: 'INFO', service: 'api', message: 'Server started' },
    { timestamp: new Date(), level: 'ERROR', service: 'database', message: 'Connection failed' },
    { timestamp: new Date(), level: 'WARN', service: 'api', message: 'High latency' },
    { timestamp: new Date(), level: 'ERROR', service: 'api', message: 'Request timeout' }
  ];

  for (const log of logs) {
    yield log;
  }
}

// Filter critical errors from specific service
const criticalApiErrors = pipe(
  filter((log: LogEntry) => log.service === 'api'),
  filter((log: LogEntry) => log.level === 'ERROR'),
  map((log: LogEntry) => ({
    ...log,
    alert: true
  }))
);

for await (const error of criticalApiErrors(readLogs())) {
  console.log(\`[ALERT] \${error.service}: \${error.message}\`);
}
// Output:
// [ALERT] api: Request timeout`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. Access Control
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  permissions: string[];
  verified: boolean;
}

interface Resource {
  id: string;
  requiredPermission: string;
  requiresVerification: boolean;
}

const users: User[] = [
  { id: 'U1', name: 'Alice', role: 'admin', permissions: ['read', 'write', 'delete'], verified: true },
  { id: 'U2', name: 'Bob', role: 'user', permissions: ['read', 'write'], verified: true },
  { id: 'U3', name: 'Charlie', role: 'user', permissions: ['read'], verified: false }
];

const canAccessResource = (resource: Resource) =>
  filter((user: User) => {
    const hasPermission = user.permissions.includes(resource.requiredPermission);
    const meetsVerification = !resource.requiresVerification || user.verified;
    return hasPermission && meetsVerification;
  });

const sensitiveResource: Resource = {
  id: 'R1',
  requiredPermission: 'write',
  requiresVerification: true
};

const authorizedUsers = Array.from(canAccessResource(sensitiveResource)(users));
console.log(authorizedUsers.map(u => u.name));
// Output: ['Alice', 'Bob']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. Data Cleanup
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

interface RawData {
  id: string | null;
  value: number | null;
  metadata?: string;
}

const rawDataset: RawData[] = [
  { id: 'D1', value: 100, metadata: 'valid' },
  { id: null, value: 200, metadata: 'invalid id' },
  { id: 'D3', value: null, metadata: 'invalid value' },
  { id: 'D4', value: 150 }, // missing metadata
  { id: 'D5', value: 175, metadata: 'valid' }
];

// Remove null/undefined values
const cleanData = pipe(
  filter((d: RawData) => d.id !== null && d.id !== undefined),
  filter((d: RawData) => d.value !== null && d.value !== undefined),
  filter((d: RawData) => d.metadata !== undefined),
  map((d: RawData) => ({
    id: d.id as string,
    value: d.value as number,
    metadata: d.metadata as string
  }))
);

const cleaned = Array.from(cleanData(rawDataset));
console.log(cleaned);
// Output: [
//   { id: 'D1', value: 100, metadata: 'valid' },
//   { id: 'D5', value: 175, metadata: 'valid' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. Infinite Stream Filtering
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { take, map } from 'fp-pack/stream';

// Infinite sequence of natural numbers
function* naturalNumbers() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

// Sieve of Eratosthenes (simplified)
const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

// Filter primes from infinite sequence
const first10Primes = pipe(
  filter(isPrime),
  take(10),
  map((n: number) => ({ value: n, isPrime: true }))
);

const primes = Array.from(first10Primes(naturalNumbers()));
console.log(primes.map(p => p.value));
// Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use filter?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Lazy Evaluation
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Values are tested and filtered on-demand without creating intermediate arrays. Works efficiently with infinite sequences and large datasets.
        </p>
      </div>

      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
          Composable Design
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Curried interface integrates seamlessly with pipe and other functional utilities for building declarative filtering pipelines.
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
          Works with any iterable (arrays, generators, async iterables, sets, maps) and automatically handles both sync and async predicates.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The filter function creates a new iterable that yields only values from the input iterable that satisfy the predicate function. Here's a simplified implementation:
    </p>

    <CodeBlock
      language="typescript"
      code={`// Simplified sync implementation
function* filter<T>(
  predicate: (value: T) => boolean,
  iterable: Iterable<T>
): IterableIterator<T> {
  // Test each value and yield only if it passes
  for (const value of iterable) {
    if (predicate(value)) {
      yield value;
    }
  }
}

// Async version handles promises
async function* filterAsync<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncIterableIterator<T> {
  // Test each value, awaiting if needed
  for await (const value of iterable) {
    if (await predicate(value)) {
      yield value;
    }
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      The key characteristics:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
      <li><strong>Lazy execution</strong>: Predicate is only evaluated when values are consumed</li>
      <li><strong>Selective yielding</strong>: Only values that pass the predicate are yielded</li>
      <li><strong>Preserves order</strong>: Matching values appear in the same order as input</li>
      <li><strong>No mutation</strong>: Original iterable remains unchanged</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">filter</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/filter.ts"
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
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Transform each value with a mapping function
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/find');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          find
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Find the first value that matches a predicate
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/reject');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          reject
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Remove values that match a predicate (opposite of filter)
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/partition');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          partition
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Split values into two groups based on a predicate
        </p>
      </div>
    </div>
  </div>
);
