import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Gt = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      gt
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create a curried function that checks if a value is greater than a threshold
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is gt?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        gt
      </strong>{' '}
      (greater than) creates a curried comparison function that checks if a value is strictly greater than a threshold.
      <br />
      <br />
      Given a threshold value, it returns a predicate function that tests whether another value exceeds that threshold.
      This is particularly useful for filtering, validation, and functional composition where you need reusable
      comparison predicates.
      <br />
      <br />
      The curried design makes it perfect for use with array methods like <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">filter</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">some</code>, and{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">every</code>, as well as in pipelines.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-pack';

const isGreaterThan5 = gt(5);

isGreaterThan5(10);  // true (10 > 5)
isGreaterThan5(5);   // false (5 is not > 5)
isGreaterThan5(3);   // false (3 < 5)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Comparisons
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-pack';

// Create comparison functions
const isGreaterThan10 = gt(10);
const isGreaterThan0 = gt(0);
const isPositive = gt(0);

isGreaterThan10(15);  // true
isGreaterThan10(10);  // false (equal, not greater)
isGreaterThan10(5);   // false

isPositive(5);        // true
isPositive(0);        // false
isPositive(-3);       // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Array Methods
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-pack';

const numbers = [1, 5, 10, 15, 20, 25];

// Filter values greater than 10
numbers.filter(gt(10));
// [15, 20, 25]

// Check if some values are greater than 20
numbers.some(gt(20));
// true

// Check if all values are greater than 0
numbers.every(gt(0));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Negative Numbers
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-pack';

const isGreaterThanNegative5 = gt(-5);

isGreaterThanNegative5(-3);   // true (-3 > -5)
isGreaterThanNegative5(-5);   // false (equal)
isGreaterThanNegative5(-10);  // false (-10 < -5)

// Filter temperatures above freezing
const temperatures = [-10, -5, 0, 5, 10, 15];
temperatures.filter(gt(0));
// [5, 10, 15]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Price Filtering
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-pack';

interface Product {
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { name: 'Laptop', price: 999, stock: 5 },
  { name: 'Mouse', price: 29, stock: 50 },
  { name: 'Keyboard', price: 79, stock: 20 },
  { name: 'Monitor', price: 299, stock: 10 },
  { name: 'Webcam', price: 89, stock: 0 }
];

// Find premium products (price > 100)
const premiumProducts = products.filter(p => gt(100)(p.price));
// [
//   { name: 'Laptop', price: 999, stock: 5 },
//   { name: 'Monitor', price: 299, stock: 10 }
// ]

// Filter products with good stock (stock > 10)
const wellStocked = products.filter(p => gt(10)(p.stock));
// [
//   { name: 'Mouse', price: 29, stock: 50 },
//   { name: 'Keyboard', price: 79, stock: 20 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      User Age Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-pack';

interface User {
  name: string;
  age: number;
  verified: boolean;
}

const users: User[] = [
  { name: 'Alice', age: 25, verified: true },
  { name: 'Bob', age: 17, verified: false },
  { name: 'Charlie', age: 30, verified: true },
  { name: 'Diana', age: 16, verified: false }
];

// Adults only (age > 18)
const isAdult = gt(18);
const adults = users.filter(u => isAdult(u.age));
// [
//   { name: 'Alice', age: 25, verified: true },
//   { name: 'Charlie', age: 30, verified: true }
// ]

// Senior users (age > 65)
const isSenior = gt(65);
const hasAnySeniors = users.some(u => isSenior(u.age));
// false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Performance Metrics
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-pack';

interface Metric {
  timestamp: number;
  responseTime: number;
  statusCode: number;
}

const metrics: Metric[] = [
  { timestamp: 1000, responseTime: 150, statusCode: 200 },
  { timestamp: 2000, responseTime: 800, statusCode: 200 },
  { timestamp: 3000, responseTime: 200, statusCode: 500 },
  { timestamp: 4000, responseTime: 1500, statusCode: 200 }
];

// Find slow requests (response time > 500ms)
const isSlow = gt(500);
const slowRequests = metrics.filter(m => isSlow(m.responseTime));
// [
//   { timestamp: 2000, responseTime: 800, statusCode: 200 },
//   { timestamp: 4000, responseTime: 1500, statusCode: 200 }
// ]

// Check if any request took longer than 1 second
const hasSlowRequest = metrics.some(m => gt(1000)(m.responseTime));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Score Filtering
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-pack';

interface Student {
  name: string;
  score: number;
  attendance: number;
}

const students: Student[] = [
  { name: 'Alice', score: 95, attendance: 100 },
  { name: 'Bob', score: 78, attendance: 85 },
  { name: 'Charlie', score: 88, attendance: 90 },
  { name: 'Diana', score: 65, attendance: 70 }
];

// High achievers (score > 85)
const isHighAchiever = gt(85);
const topStudents = students.filter(s => isHighAchiever(s.score));
// [
//   { name: 'Alice', score: 95, attendance: 100 },
//   { name: 'Charlie', score: 88, attendance: 90 }
// ]

// Good attendance (attendance > 80)
const hasGoodAttendance = gt(80);
const regularAttendees = students.filter(s => hasGoodAttendance(s.attendance));
// [
//   { name: 'Alice', score: 95, attendance: 100 },
//   { name: 'Bob', score: 78, attendance: 85 },
//   { name: 'Charlie', score: 88, attendance: 90 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, gt } from 'fp-pack';

interface Transaction {
  amount: number;
  category: string;
}

const transactions: Transaction[] = [
  { amount: 50, category: 'food' },
  { amount: 200, category: 'electronics' },
  { amount: 30, category: 'food' },
  { amount: 500, category: 'electronics' }
];

// Process large transactions (amount > 100)
const processLargeTransactions = pipe(
  (txs: Transaction[]) => txs.filter(tx => gt(100)(tx.amount)),
  (txs: Transaction[]) => txs.map(tx => ({
    ...tx,
    flagged: true
  }))
);

processLargeTransactions(transactions);
// [
//   { amount: 200, category: 'electronics', flagged: true },
//   { amount: 500, category: 'electronics', flagged: true }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Dynamic Thresholds
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-pack';

interface Config {
  minTemperature: number;
  maxLoad: number;
  alertThreshold: number;
}

interface Sensor {
  temperature: number;
  load: number;
  alertLevel: number;
}

function checkSensorAlerts(sensor: Sensor, config: Config): boolean {
  const isTooHot = gt(config.minTemperature)(sensor.temperature);
  const isOverloaded = gt(config.maxLoad)(sensor.load);
  const isAlertCritical = gt(config.alertThreshold)(sensor.alertLevel);

  return isTooHot || isOverloaded || isAlertCritical;
}

const sensor = {
  temperature: 85,
  load: 90,
  alertLevel: 7
};

const config = {
  minTemperature: 80,
  maxLoad: 95,
  alertThreshold: 5
};

checkSensorAlerts(sensor, config);  // true (temperature and alert level exceeded)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Curried by Default
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Returns a function that can be reused with different values, perfect for
          functional composition and partial application.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Strict Comparison
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Uses strict greater than (&gt;), not greater than or equal (≥). For inclusive
          comparison, use gte instead.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Array-Friendly
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Works seamlessly with array methods like filter, some, and every without
          additional wrapping.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. Type Safe
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Full TypeScript support ensures type safety for numeric comparisons.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">gt</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/equality/gt.ts"
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
          navigateTo('/equality/gte');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          gte
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Greater than or equal to comparison
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/lt');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          lt
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Less than comparison
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/lte');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          lte
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Less than or equal to comparison
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/clamp');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          clamp
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Restrict values to a range
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/equality/gte"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/gte');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          gte →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Check if a value is greater than or equal to a threshold.
        </p>
      </a>

      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Use gt with filter for threshold-based filtering.
        </p>
      </a>
    </div>
  </div>
);
