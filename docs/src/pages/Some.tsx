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
      code={`import { some } from 'fp-pack';

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
      code={`import { some } from 'fp-pack';

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
      code={`import { some } from 'fp-pack';

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
      code={`import { some } from 'fp-pack';

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
      code={`import { some } from 'fp-pack';

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
      code={`import { some } from 'fp-pack';

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
      code={`import { some, curry } from 'fp-pack';

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
          code={`import { some } from 'fp-pack';

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
          code={`import { some } from 'fp-pack';

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
          code={`import { some } from 'fp-pack';

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
      code={`import { some } from 'fp-pack';

const numbers = [1, 2, 3, 4, 5];
const isEven = (n: number) => n % 2 === 0;

// Native JavaScript
numbers.some(isEven);  // true

// fp-pack (data-last for composition)
some(isEven, numbers);  // true

// Benefits of fp-pack version:
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
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">some</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/some.ts"
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

    <div class="grid gap-6 mt-6">
      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Get all elements that match.
        </p>
      </a>

      <a
        href="/array/every"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/every');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          every →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Check if all elements match.
        </p>
      </a>

      <a
        href="/array/find"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/find');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          find →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Get the first matching element.
        </p>
      </a>
    </div>
  </div>
);
