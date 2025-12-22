import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Some = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      some
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check if at least one element satisfies a condition
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is some?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        some
      </strong>{' '}
      tests whether at least one element in an array satisfies the provided predicate function.
      <br />
      <br />
      It returns <code>true</code> as soon as it finds an element that matches the condition,
      making it efficient for large arrays. If no elements match, it returns <code>false</code>.
      <br />
      <br />
      This is the functional programming equivalent of the "any" or "exists" operation,
      and is perfect for validation and search scenarios.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

const numbers = [1, 3, 5, 7, 8];

// Check if any number is even
const hasEven = some((n: number) => n % 2 === 0, numbers);
// true (found 8)

const allOdd = [1, 3, 5, 7, 9];
const hasEven2 = some((n: number) => n % 2 === 0, allOdd);
// false (no even numbers)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Checks
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

const ages = [12, 15, 17, 19, 22];

// Check if anyone is adult (18+)
some((age: number) => age >= 18, ages);  // true

// Check if anyone is under 10
some((age: number) => age < 10, ages);   // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Early Exit Optimization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

const largeArray = Array.from({ length: 1000000 }, (_, i) => i);

// Stops immediately when finding 500
const hasTarget = some((n: number) => {
  console.log('Checking:', n);
  return n === 500;
}, largeArray);

// Only logs 0 through 500, not all million items!
// Much faster than checking every element`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      User Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user' | 'guest';
  verified: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', role: 'user', verified: true },
  { id: 2, name: 'Bob', role: 'admin', verified: true },
  { id: 3, name: 'Charlie', role: 'user', verified: false },
];

// Check if there's at least one admin
const hasAdmin = some(
  (user: User) => user.role === 'admin',
  users
);  // true

// Check if any user is unverified
const hasUnverified = some(
  (user: User) => !user.verified,
  users
);  // true

// Authorization check
function canPerformAction(users: User[]): boolean {
  return some(user => user.role === 'admin' && user.verified, users);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Form Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

interface FormField {
  name: string;
  value: string;
  required: boolean;
}

const formFields: FormField[] = [
  { name: 'email', value: 'user@example.com', required: true },
  { name: 'phone', value: '', required: false },
  { name: 'name', value: '', required: true },
];

// Check if any required field is empty
const hasEmptyRequired = some(
  (field: FormField) => field.required && !field.value,
  formFields
);  // true (name is empty and required)

// Show error message if validation fails
if (hasEmptyRequired) {
  console.log('Please fill in all required fields');
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Search and Filter
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  tags: string[];
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, inStock: true, tags: ['electronics', 'computers'] },
  { id: 2, name: 'Mouse', price: 25, inStock: false, tags: ['electronics', 'accessories'] },
  { id: 3, name: 'Desk', price: 300, inStock: true, tags: ['furniture', 'office'] },
];

// Check if any product is out of stock
const hasOutOfStock = some(
  (product: Product) => !product.inStock,
  products
);  // true

// Check if any product has a specific tag
function hasTag(tag: string, products: Product[]): boolean {
  return some(
    product => product.tags.includes(tag),
    products
  );
}

hasTag('electronics', products);  // true
hasTag('clothing', products);     // false

// Check if any affordable item (under $100) is in stock
const hasAffordableInStock = some(
  product => product.price < 100 && product.inStock,
  products
);  // false (Mouse is affordable but out of stock)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Currying
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some, curry } from 'fp-kit';

// Create curried version
const someCurried = curry(some);

// Create reusable predicates
const hasEvenNumber = someCurried((n: number) => n % 2 === 0);
const hasNegative = someCurried((n: number) => n < 0);
const hasLargeNumber = someCurried((n: number) => n > 1000);

const numbers1 = [1, 3, 5, 7];
const numbers2 = [1, 2, 3];
const numbers3 = [-5, 10, 20];

hasEvenNumber(numbers1);    // false
hasEvenNumber(numbers2);    // true
hasNegative(numbers3);      // true
hasLargeNumber(numbers3);   // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Common Patterns
    </h2>

    <div class="space-y-6">
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Existence Check
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { some } from 'fp-kit';

// Check if value exists in array
function includes<T>(value: T, arr: T[]): boolean {
  return some(item => item === value, arr);
}

includes(3, [1, 2, 3, 4]);  // true
includes('x', ['a', 'b', 'c']);  // false`}
        />
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Negation (None)
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { some } from 'fp-kit';

// Check if NO element matches
function none<T>(predicate: (x: T) => boolean, arr: T[]): boolean {
  return !some(predicate, arr);
}

const numbers = [1, 3, 5, 7];
none((n: number) => n % 2 === 0, numbers);  // true (no even numbers)`}
        />
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Complex Conditions
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { some } from 'fp-kit';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
}

const tasks: Task[] = [/* ... */];

// Check for overdue high-priority tasks
const hasUrgent = some(
  task =>
    task.priority === 'high' &&
    !task.completed &&
    task.dueDate < new Date(),
  tasks
);`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      vs. Array.prototype.some
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5];
const isEven = (n: number) => n % 2 === 0;

// Native JavaScript
numbers.some(isEven);  // true

// fp-kit (data-last for composition)
some(isEven, numbers);  // true

// Benefits of fp-kit version:
// 1. Data-last enables currying and composition
// 2. Predicate comes first (easier to read in pipelines)
// 3. Works well with pipe/compose`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Benefits
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Performance
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Stops as soon as a matching element is found. Much faster than checking
          all elements when you just need to know if "any" exist.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Readability
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Expresses intent clearly: "does some element match this condition?"
          More readable than manual loops or filters.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Composition Ready
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Data-last parameter order makes it perfect for currying and use in
          functional pipelines.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. Type Safety
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Full TypeScript support with proper type inference for predicates
          and return values.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          curry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Create reusable predicates by currying some for better composition.
        </p>
      </a>

      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Use some in data transformation pipelines for validation steps.
        </p>
      </a>
    </div>
  </div>
);
