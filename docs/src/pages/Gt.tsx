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
      code={`import { gt } from 'fp-kit';

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
      code={`import { gt } from 'fp-kit';

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
      code={`import { gt } from 'fp-kit';

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
      code={`import { gt } from 'fp-kit';

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
      code={`import { gt } from 'fp-kit';

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
      code={`import { gt } from 'fp-kit';

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
      code={`import { gt } from 'fp-kit';

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
      code={`import { gt } from 'fp-kit';

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
      code={`import { pipe, gt } from 'fp-kit';

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
      code={`import { gt } from 'fp-kit';

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
