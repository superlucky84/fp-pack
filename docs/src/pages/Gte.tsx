import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Gte = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      gte
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create a curried function that checks if a value is greater than or equal to a threshold
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is gte?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        gte
      </strong>{' '}
      (greater than or equal) creates a curried comparison function that checks if a value is greater than or equal to a threshold.
      <br />
      <br />
      Given a threshold value, it returns a predicate function that tests whether another value meets or exceeds that threshold.
      This is the inclusive version of gt, useful when you need to include boundary values in your comparisons.
      <br />
      <br />
      The curried design makes it perfect for use with array methods like <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">filter</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">some</code>, and{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">every</code>, as well as in pipelines and validation logic.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

const isAtLeast18 = gte(18);

isAtLeast18(20);  // true (20 >= 18)
isAtLeast18(18);  // true (18 >= 18, equal counts!)
isAtLeast18(15);  // false (15 < 18)`}
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
      code={`import { gte } from 'fp-pack';

// Create comparison functions
const isAtLeast10 = gte(10);
const isNonNegative = gte(0);
const isAtLeast100 = gte(100);

isAtLeast10(15);   // true
isAtLeast10(10);   // true (equal counts!)
isAtLeast10(5);    // false

isNonNegative(5);  // true
isNonNegative(0);  // true (0 >= 0)
isNonNegative(-3); // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Array Methods
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

const scores = [45, 60, 75, 80, 90, 100];

// Filter passing scores (>= 60)
scores.filter(gte(60));
// [60, 75, 80, 90, 100]

// Check if some scores are perfect (>= 100)
scores.some(gte(100));
// true

// Check if all scores are passing (>= 60)
scores.every(gte(60));
// false (45 < 60)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Boundary Values
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

// The difference between gt and gte
const isGreaterThan5 = gte(5);
const numbers = [3, 4, 5, 6, 7];

numbers.filter(isGreaterThan5);
// [5, 6, 7] - includes 5!

// With gt, 5 would be excluded
// [6, 7]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Age Verification
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface User {
  name: string;
  age: number;
  country: string;
}

const users: User[] = [
  { name: 'Alice', age: 18, country: 'US' },
  { name: 'Bob', age: 17, country: 'UK' },
  { name: 'Charlie', age: 21, country: 'CA' },
  { name: 'Diana', age: 16, country: 'US' }
];

// Must be at least 18 (inclusive)
const isLegalAge = gte(18);
const eligibleUsers = users.filter(u => isLegalAge(u.age));
// [
//   { name: 'Alice', age: 18, country: 'US' },  // 18 is included!
//   { name: 'Charlie', age: 21, country: 'CA' }
// ]

// Drinking age (>= 21)
const canDrink = gte(21);
const drinkers = users.filter(u => canDrink(u.age));
// [{ name: 'Charlie', age: 21, country: 'CA' }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Minimum Requirements
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface Job {
  title: string;
  salary: number;
  experience: number;
}

const jobs: Job[] = [
  { title: 'Junior Dev', salary: 50000, experience: 0 },
  { title: 'Mid Dev', salary: 80000, experience: 3 },
  { title: 'Senior Dev', salary: 120000, experience: 5 },
  { title: 'Lead Dev', salary: 150000, experience: 8 }
];

// Minimum salary requirement (>= 80000)
const meetsMinSalary = gte(80000);
const qualifyingSalaries = jobs.filter(j => meetsMinSalary(j.salary));
// [
//   { title: 'Mid Dev', salary: 80000, experience: 3 },
//   { title: 'Senior Dev', salary: 120000, experience: 5 },
//   { title: 'Lead Dev', salary: 150000, experience: 8 }
// ]

// Requires at least 5 years experience
const hasExperience = gte(5);
const seniorRoles = jobs.filter(j => hasExperience(j.experience));
// [
//   { title: 'Senior Dev', salary: 120000, experience: 5 },  // 5 counts!
//   { title: 'Lead Dev', salary: 150000, experience: 8 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Grade Boundaries
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface Student {
  name: string;
  score: number;
}

const students: Student[] = [
  { name: 'Alice', score: 95 },
  { name: 'Bob', score: 85 },
  { name: 'Charlie', score: 75 },
  { name: 'Diana', score: 65 },
  { name: 'Eve', score: 55 }
];

// Grade boundaries (inclusive)
const isGradeA = gte(90);  // A: >= 90
const isGradeB = gte(80);  // B: >= 80
const isGradeC = gte(70);  // C: >= 70
const isPassing = gte(60); // Pass: >= 60

const gradeAStudents = students.filter(s => isGradeA(s.score));
// [{ name: 'Alice', score: 95 }]

const passingStudents = students.filter(s => isPassing(s.score));
// [
//   { name: 'Alice', score: 95 },
//   { name: 'Bob', score: 85 },
//   { name: 'Charlie', score: 75 },
//   { name: 'Diana', score: 65 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Stock Level Alerts
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface Inventory {
  sku: string;
  quantity: number;
  minStock: number;
}

const inventory: Inventory[] = [
  { sku: 'LAPTOP-001', quantity: 15, minStock: 10 },
  { sku: 'MOUSE-002', quantity: 8, minStock: 10 },
  { sku: 'KEYBOARD-003', quantity: 25, minStock: 20 },
  { sku: 'MONITOR-004', quantity: 5, minStock: 5 }
];

function checkStockLevels(items: Inventory[]) {
  return {
    sufficient: items.filter(item =>
      gte(item.minStock)(item.quantity)
    ),
    needsReorder: items.filter(item =>
      !gte(item.minStock)(item.quantity)
    )
  };
}

const stockStatus = checkStockLevels(inventory);
// {
//   sufficient: [
//     { sku: 'LAPTOP-001', quantity: 15, minStock: 10 },
//     { sku: 'KEYBOARD-003', quantity: 25, minStock: 20 },
//     { sku: 'MONITOR-004', quantity: 5, minStock: 5 }  // exactly at min!
//   ],
//   needsReorder: [
//     { sku: 'MOUSE-002', quantity: 8, minStock: 10 }
//   ]
// }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Time-Based Access Control
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface AccessToken {
  userId: string;
  expiresAt: number;
  scope: string[];
}

function isTokenValid(token: AccessToken, currentTime: number): boolean {
  // Token is valid if it hasn't expired yet (expiresAt >= currentTime)
  return gte(currentTime)(token.expiresAt);
}

const currentTime = Date.now();
const oneHourLater = currentTime + 3600000;

const tokens: AccessToken[] = [
  { userId: 'user1', expiresAt: oneHourLater, scope: ['read', 'write'] },
  { userId: 'user2', expiresAt: currentTime - 1000, scope: ['read'] },
  { userId: 'user3', expiresAt: currentTime, scope: ['admin'] }
];

const validTokens = tokens.filter(t => isTokenValid(t, currentTime));
// [
//   { userId: 'user1', expiresAt: oneHourLater, scope: ['read', 'write'] },
//   { userId: 'user3', expiresAt: currentTime, scope: ['admin'] }  // exactly at current time counts!
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, gte } from 'fp-pack';

interface Order {
  id: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped';
}

const orders: Order[] = [
  { id: '001', total: 150, status: 'paid' },
  { id: '002', total: 50, status: 'pending' },
  { id: '003', total: 200, status: 'shipped' },
  { id: '004', total: 100, status: 'paid' }
];

// Process orders that qualify for free shipping (>= 100)
const processQualifyingOrders = pipe(
  (orders: Order[]) => orders.filter(o => gte(100)(o.total)),
  (orders: Order[]) => orders.map(o => ({
    ...o,
    freeShipping: true
  }))
);

processQualifyingOrders(orders);
// [
//   { id: '001', total: 150, status: 'paid', freeShipping: true },
//   { id: '003', total: 200, status: 'shipped', freeShipping: true },
//   { id: '004', total: 100, status: 'paid', freeShipping: true }  // 100 qualifies!
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Inclusive Comparison
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Uses greater than or equal (≥), including the boundary value. Unlike gt,
          values equal to the threshold will pass the test.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Curried by Default
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Returns a function that can be reused with different values, perfect for
          functional composition and partial application.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Minimum Requirements
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Perfect for expressing minimum thresholds, eligibility criteria, and
          boundary conditions where the limit itself is acceptable.
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
      View the implementation of <code class="text-sm">gte</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/equality/gte.ts"
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
          navigateTo('/equality/gt');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          gt
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Greater than comparison
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
        href="/equality/gt"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/gt');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          gt →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          For exclusive comparison (strictly greater than).
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
          Use gte with filter for minimum threshold filtering.
        </p>
      </a>
    </div>
  </div>
);
