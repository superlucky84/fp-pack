import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Every = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      every
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check if all elements satisfy a condition
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is every?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        every
      </strong>{' '}
      tests whether all elements in an array satisfy a provided predicate function.
      It returns <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">true</code> if
      every element passes the test, and <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">false</code> if
      any element fails. For empty arrays, it returns <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">true</code> (vacuous truth).
      <br />
      <br />
      This is useful for <strong>validation</strong>, <strong>type checking</strong>,
      <strong>data verification</strong>, and <strong>ensuring constraints</strong>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

const numbers = [2, 4, 6, 8, 10];

every((n: number) => n % 2 === 0, numbers);
// true (all are even)

every((n: number) => n > 5, numbers);
// false (not all are greater than 5)

const allPositive = (arr: number[]) => every((n: number) => n > 0, arr);
allPositive([1, 2, 3]);    // true
allPositive([1, -2, 3]);   // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function every<T>(
  predicate: (value: T) => boolean,
  arr: T[]
): boolean;

// Takes a predicate function and an array
// Returns true if all elements satisfy the predicate`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The predicate is called for each element until one returns false, or all elements have been tested.
      Returns true for empty arrays (vacuous truth).
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Checks
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

// Check if all numbers are positive
const allPositive = every((n: number) => n > 0, [1, 2, 3, 4]);
// true

// Check if all strings are non-empty
const allNonEmpty = every((s: string) => s.length > 0, ['a', 'b', 'c']);
// true

// Check if all numbers are even
const allEven = every((n: number) => n % 2 === 0, [2, 4, 6, 8]);
// true

// Empty array returns true
const empty = every((n: number) => n > 100, []);
// true`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Form Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

interface FormField {
  name: string;
  value: string;
  required: boolean;
}

const formFields: FormField[] = [
  { name: 'username', value: 'john_doe', required: true },
  { name: 'email', value: 'john@example.com', required: true },
  { name: 'phone', value: '123-456-7890', required: false },
];

// Check if all required fields are filled
const isFormValid = every(
  (field: FormField) => !field.required || field.value.length > 0,
  formFields
);
// true

// Validate email format in all email fields
const emailFields = formFields.filter(f => f.name.includes('email'));
const allValidEmails = every(
  (field: FormField) => field.value.includes('@') && field.value.includes('.'),
  emailFields
);

console.log(allValidEmails);
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Consistency Check
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000, inStock: true },
  { id: 2, name: 'Mouse', price: 25, inStock: true },
  { id: 3, name: 'Keyboard', price: 75, inStock: true },
];

// Verify all products have valid prices
const allValidPrices = every((p: Product) => p.price > 0 && Number.isFinite(p.price), products);

console.log(allValidPrices);
// true

// Check if all products are in stock
const allInStock = every((p: Product) => p.inStock, products);

console.log(allInStock);
// true

// Verify all products have unique IDs
const hasUniqueIds = (products: Product[]) => {
  const ids = products.map(p => p.id);
  return ids.length === new Set(ids).size;
};

console.log(hasUniqueIds(products));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Permission Checking
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

interface User {
  id: number;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
}

const users: User[] = [
  { id: 1, role: 'admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, role: 'editor', permissions: ['read', 'write'] },
  { id: 3, role: 'viewer', permissions: ['read'] },
];

// Check if all users have read permission
const allCanRead = every((u: User) => u.permissions.includes('read'), users);

console.log(allCanRead);
// true

// Check if all users can write
const allCanWrite = every((u: User) => u.permissions.includes('write'), users);

console.log(allCanWrite);
// false

// Verify all admins have full permissions
const admins = users.filter(u => u.role === 'admin');
const allAdminsHaveFullAccess = every(
  (u: User) => u.permissions.includes('delete'),
  admins
);

console.log(allAdminsHaveFullAccess);
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Type Guard with every
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

// Check if all values are strings
const allStrings = (arr: unknown[]): arr is string[] =>
  every((value: unknown): value is string => typeof value === 'string', arr);

const mixedArray: unknown[] = ['a', 'b', 'c'];
if (allStrings(mixedArray)) {
  // TypeScript now knows mixedArray contains only strings
  mixedArray.forEach(s => console.log(s.toUpperCase()));
}

// Check if all values are numbers
const allNumbers = (arr: unknown[]): arr is number[] =>
  every((value: unknown): value is number => typeof value === 'number' && !isNaN(value), arr);

const data: unknown[] = [1, 2, 3, 4];
if (allNumbers(data)) {
  const sum = data.reduce((a, b) => a + b, 0);
  console.log(sum); // 10
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Common Patterns
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Combining with pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, every } from 'fp-kit';

interface Task {
  id: number;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const tasks: Task[] = [
  { id: 1, completed: true, priority: 'high' },
  { id: 2, completed: true, priority: 'medium' },
  { id: 3, completed: false, priority: 'low' },
];

// Check if all high priority tasks are completed
const allHighPriorityDone = pipe(
  (tasks: Task[]) => tasks.filter(t => t.priority === 'high'),
  (highPriorityTasks: Task[]) => every((t: Task) => t.completed, highPriorityTasks)
);

console.log(allHighPriorityDone(tasks));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Validating Nested Data
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

interface Order {
  items: { price: number; quantity: number }[];
  customer: { email: string; verified: boolean };
}

const orders: Order[] = [
  {
    items: [{ price: 10, quantity: 2 }, { price: 20, quantity: 1 }],
    customer: { email: 'user1@example.com', verified: true }
  },
  {
    items: [{ price: 15, quantity: 3 }],
    customer: { email: 'user2@example.com', verified: true }
  },
];

// Check if all orders are from verified customers
const allFromVerified = every((o: Order) => o.customer.verified, orders);

console.log(allFromVerified);
// true

// Check if all orders have valid items
const allHaveValidItems = every((o: Order) =>
  o.items.length > 0 && o.items.every(item => item.price > 0 && item.quantity > 0),
  orders
);

console.log(allHaveValidItems);
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array of Promises Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

// Check if all promises are settled
const allSettled = async (promises: Promise<any>[]) => {
  const results = await Promise.allSettled(promises);
  return every((r: PromiseSettledResult<any>) => r.status === 'fulfilled', results);
};

// Usage
const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
];

allSettled(promises).then(result => {
  console.log(result); // true
});

// Check if all values are truthy after resolution
const allTruthy = async (promises: Promise<any>[]) => {
  const values = await Promise.all(promises);
  return every((v: any) => Boolean(v), values);
};`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use every?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Declarative Validation
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Express validation logic clearly: "all users are adults" is more readable than manual loops.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Simple and Direct
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Straightforward function signature makes it easy to understand and use without additional cognitive overhead.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Short-Circuit Evaluation
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Stops checking as soon as a false condition is found, improving performance on large arrays.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Composable with Functional Patterns
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Works seamlessly with pipe, compose, and other functional utilities for complex validation pipelines.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function every<T>(predicate: (value: T) => boolean, arr: T[]): boolean {
  return arr.every(predicate);
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a predicate function that tests each element and an array</li>
        <li>Uses native Array.prototype.every for optimal performance</li>
        <li>Short-circuits on first false result</li>
        <li>Returns true for empty arrays (vacuous truth)</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        Try these related array functions:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/array/find');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            find
          </a>{' '}
          - Get the first element that matches a predicate
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/array/filter');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            filter
          </a>{' '}
          - Filter elements that satisfy a condition
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/pipe');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            pipe
          </a>{' '}
          - Chain every with other transformations
        </li>
      </ul>
    </div>
  </div>
);
