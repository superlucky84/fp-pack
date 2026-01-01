import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Lt = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      lt
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create a curried function that checks if a value is less than a threshold
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is lt?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        lt
      </strong>{' '}
      (less than) creates a curried comparison function that checks if a value is strictly less than a threshold.
      <br />
      <br />
      Given a threshold value, it returns a predicate function that tests whether another value is below that threshold.
      This is particularly useful for filtering, validation, and functional composition where you need reusable
      comparison predicates for upper bounds.
      <br />
      <br />
      The curried design makes it perfect for use with array methods like <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">filter</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">some</code>, and{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">every</code>, as well as in pipelines.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

const isLessThan10 = lt(10);

isLessThan10(5);   // true (5 < 10)
isLessThan10(10);  // false (10 is not < 10)
isLessThan10(15);  // false (15 > 10)`}
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
      code={`import { lt } from 'fp-pack';

// Create comparison functions
const isLessThan100 = lt(100);
const isNegative = lt(0);
const isBelowFreezing = lt(0);

isLessThan100(50);   // true
isLessThan100(100);  // false (equal, not less)
isLessThan100(150);  // false

isNegative(-5);      // true
isNegative(0);       // false
isNegative(5);       // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Array Methods
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

const numbers = [5, 10, 15, 20, 25, 30];

// Filter values less than 20
numbers.filter(lt(20));
// [5, 10, 15]

// Check if some values are less than 10
numbers.some(lt(10));
// true

// Check if all values are less than 100
numbers.every(lt(100));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Negative Numbers
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

const isLessThanNegative5 = lt(-5);

isLessThanNegative5(-10);  // true (-10 < -5)
isLessThanNegative5(-5);   // false (equal)
isLessThanNegative5(-3);   // false (-3 > -5)

// Filter very cold temperatures (below -10°C)
const temperatures = [-15, -10, -5, 0, 5, 10];
temperatures.filter(lt(-10));
// [-15]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Budget Filtering
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface Product {
  name: string;
  price: number;
  rating: number;
}

const products: Product[] = [
  { name: 'Budget Mouse', price: 15, rating: 4.0 },
  { name: 'Premium Mouse', price: 80, rating: 4.8 },
  { name: 'Basic Keyboard', price: 30, rating: 3.5 },
  { name: 'Gaming Keyboard', price: 150, rating: 4.9 },
  { name: 'Cheap Cable', price: 5, rating: 3.0 }
];

// Find budget-friendly items (price < 50)
const isAffordable = lt(50);
const budgetItems = products.filter(p => isAffordable(p.price));
// [
//   { name: 'Budget Mouse', price: 15, rating: 4.0 },
//   { name: 'Basic Keyboard', price: 30, rating: 3.5 },
//   { name: 'Cheap Cable', price: 5, rating: 3.0 }
// ]

// Find items under $10
const isCheap = lt(10);
const cheapItems = products.filter(p => isCheap(p.price));
// [{ name: 'Cheap Cable', price: 5, rating: 3.0 }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Low Stock Alerts
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface Inventory {
  sku: string;
  quantity: number;
  reorderThreshold: number;
}

const inventory: Inventory[] = [
  { sku: 'LAPTOP-001', quantity: 3, reorderThreshold: 5 },
  { sku: 'MOUSE-002', quantity: 25, reorderThreshold: 10 },
  { sku: 'KEYBOARD-003', quantity: 8, reorderThreshold: 10 },
  { sku: 'MONITOR-004', quantity: 2, reorderThreshold: 3 }
];

// Find items with critically low stock (quantity < reorderThreshold)
function findLowStock(items: Inventory[]) {
  return items.filter(item =>
    lt(item.reorderThreshold)(item.quantity)
  );
}

const lowStockItems = findLowStock(inventory);
// [
//   { sku: 'LAPTOP-001', quantity: 3, reorderThreshold: 5 },
//   { sku: 'MONITOR-004', quantity: 2, reorderThreshold: 3 }
// ]

// Critical shortage (quantity < 5)
const isCritical = lt(5);
const criticalItems = inventory.filter(i => isCritical(i.quantity));
// [
//   { sku: 'LAPTOP-001', quantity: 3, reorderThreshold: 5 },
//   { sku: 'MONITOR-004', quantity: 2, reorderThreshold: 3 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Performance Monitoring
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface ServerMetric {
  server: string;
  cpuUsage: number;
  memoryUsage: number;
  diskSpace: number;
}

const metrics: ServerMetric[] = [
  { server: 'web-1', cpuUsage: 45, memoryUsage: 70, diskSpace: 15 },
  { server: 'web-2', cpuUsage: 30, memoryUsage: 55, diskSpace: 8 },
  { server: 'db-1', cpuUsage: 80, memoryUsage: 85, diskSpace: 25 },
  { server: 'cache-1', cpuUsage: 20, memoryUsage: 40, diskSpace: 5 }
];

// Alert when disk space is critically low (< 10GB)
const hasLowDiskSpace = lt(10);
const lowDiskServers = metrics.filter(m => hasLowDiskSpace(m.diskSpace));
// [
//   { server: 'web-2', cpuUsage: 30, memoryUsage: 55, diskSpace: 8 },
//   { server: 'cache-1', cpuUsage: 20, memoryUsage: 40, diskSpace: 5 }
// ]

// Find underutilized servers (CPU < 50%)
const isUnderutilized = lt(50);
const idleServers = metrics.filter(m => isUnderutilized(m.cpuUsage));
// [
//   { server: 'web-1', cpuUsage: 45, memoryUsage: 70, diskSpace: 15 },
//   { server: 'web-2', cpuUsage: 30, memoryUsage: 55, diskSpace: 8 },
//   { server: 'cache-1', cpuUsage: 20, memoryUsage: 40, diskSpace: 5 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Age Restrictions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface User {
  name: string;
  age: number;
  verified: boolean;
}

const users: User[] = [
  { name: 'Alice', age: 15, verified: true },
  { name: 'Bob', age: 25, verified: true },
  { name: 'Charlie', age: 17, verified: false },
  { name: 'Diana', age: 30, verified: true }
];

// Find minors (age < 18)
const isMinor = lt(18);
const minors = users.filter(u => isMinor(u.age));
// [
//   { name: 'Alice', age: 15, verified: true },
//   { name: 'Charlie', age: 17, verified: false }
// ]

// Children under 13
const isChild = lt(13);
const hasChildren = users.some(u => isChild(u.age));
// false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Time Windows
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface Task {
  id: string;
  priority: number;
  estimatedHours: number;
  deadline: number;
}

const tasks: Task[] = [
  { id: 'T1', priority: 1, estimatedHours: 2, deadline: Date.now() + 3600000 },
  { id: 'T2', priority: 2, estimatedHours: 8, deadline: Date.now() + 86400000 },
  { id: 'T3', priority: 3, estimatedHours: 1, deadline: Date.now() + 7200000 },
  { id: 'T4', priority: 1, estimatedHours: 4, deadline: Date.now() + 172800000 }
];

// Quick tasks (estimated hours < 3)
const isQuickTask = lt(3);
const quickTasks = tasks.filter(t => isQuickTask(t.estimatedHours));
// [
//   { id: 'T1', priority: 1, estimatedHours: 2, deadline: ... },
//   { id: 'T3', priority: 3, estimatedHours: 1, deadline: ... }
// ]

// High priority tasks (priority < 2, lower number = higher priority)
const isHighPriority = lt(2);
const urgentTasks = tasks.filter(t => isHighPriority(t.priority));
// [
//   { id: 'T1', priority: 1, estimatedHours: 2, deadline: ... },
//   { id: 'T4', priority: 1, estimatedHours: 4, deadline: ... }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, lt } from 'fp-pack';

interface Student {
  name: string;
  score: number;
  attendance: number;
}

const students: Student[] = [
  { name: 'Alice', score: 95, attendance: 100 },
  { name: 'Bob', score: 55, attendance: 70 },
  { name: 'Charlie', score: 75, attendance: 85 },
  { name: 'Diana', score: 45, attendance: 60 }
];

// Process failing students (score < 60) for intervention
const processFailingStudents = pipe(
  (students: Student[]) => students.filter(s => lt(60)(s.score)),
  (students: Student[]) => students.map(s => ({
    ...s,
    needsIntervention: true,
    counselorAssigned: true
  }))
);

processFailingStudents(students);
// [
//   { name: 'Bob', score: 55, attendance: 70, needsIntervention: true, ... },
//   { name: 'Diana', score: 45, attendance: 60, needsIntervention: true, ... }
// ]`}
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
          Uses strict less than (&lt;), not less than or equal (≤). For inclusive
          comparison, use lte instead.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Upper Bound Checks
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Perfect for maximum limits, capacity checks, and filtering values below
          a threshold.
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
      View the implementation of <code class="text-sm">lt</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/equality/lt.ts"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
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
        href="/equality/lte"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/lte');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          lte →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Check if a value is less than or equal to a threshold.
        </p>
      </a>

      <a
        href="/equality/gt"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/equality/gt');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          gt →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          For opposite comparison (greater than).
        </p>
      </a>
    </div>
  </div>
);
