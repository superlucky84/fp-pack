import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const SortBy = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      sortBy
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Sort an array by a computed value
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is sortBy?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        sortBy
      </strong>{' '}
      sorts an array based on a value computed from each element using a provided function.
      <br />
      <br />
      Instead of writing custom comparison logic, you simply provide a function that extracts
      or computes the sort key from each element. The function handles the comparison automatically.
      <br />
      <br />
      sortBy creates a new sorted array without modifying the original, and uses stable sorting
      to preserve the relative order of elements with equal keys.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
  { name: 'Charlie', age: 25 },
];

// Sort by age
const byAge = sortBy((user: User) => user.age, users);
// [{ name: 'Bob', age: 20 }, { name: 'Charlie', age: 25 }, { name: 'Alice', age: 30 }]

// Sort by name
const byName = sortBy((user: User) => user.name, users);
// [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 20 }, { name: 'Charlie', age: 25 }]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Sorting Numbers
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// Sort in ascending order
sortBy((n: number) => n, numbers);
// [1, 1, 2, 3, 4, 5, 6, 9]

// Sort by absolute value
sortBy((n: number) => Math.abs(n), [-5, 3, -1, 4, -2]);
// [-1, -2, 3, 4, -5]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Sorting Strings
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

const names = ['Charlie', 'Alice', 'Bob', 'David'];

// Alphabetical order
sortBy((name: string) => name, names);
// ['Alice', 'Bob', 'Charlie', 'David']

// By length
sortBy((name: string) => name.length, names);
// ['Bob', 'Alice', 'David', 'Charlie']

// Case-insensitive
sortBy((name: string) => name.toLowerCase(), ['charlie', 'Alice', 'BOB']);
// ['Alice', 'BOB', 'charlie']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Sorting Objects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, rating: 4.5 },
  { id: 2, name: 'Mouse', price: 25, rating: 4.8 },
  { id: 3, name: 'Keyboard', price: 80, rating: 4.3 },
];

// Sort by price (cheapest first)
sortBy((p: Product) => p.price, products);
// [Mouse, Keyboard, Laptop]

// Sort by rating (highest first - negate for descending)
sortBy((p: Product) => -p.rating, products);
// [Mouse, Laptop, Keyboard]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Sorting by Date
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

interface Event {
  title: string;
  date: Date;
  priority: number;
}

const events: Event[] = [
  { title: 'Meeting', date: new Date('2024-03-15'), priority: 2 },
  { title: 'Conference', date: new Date('2024-02-20'), priority: 1 },
  { title: 'Workshop', date: new Date('2024-04-10'), priority: 3 },
];

// Sort by date (earliest first)
const chronological = sortBy((event: Event) => event.date.getTime(), events);
// [Conference, Meeting, Workshop]

// Sort by priority
const byPriority = sortBy((event: Event) => event.priority, events);
// [Conference, Meeting, Workshop]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Complex Sort Keys
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

interface Student {
  firstName: string;
  lastName: string;
  gpa: number;
  graduationYear: number;
}

const students: Student[] = [
  { firstName: 'Alice', lastName: 'Smith', gpa: 3.8, graduationYear: 2024 },
  { firstName: 'Bob', lastName: 'Johnson', gpa: 3.5, graduationYear: 2023 },
  { firstName: 'Charlie', lastName: 'Williams', gpa: 3.9, graduationYear: 2024 },
];

// Sort by last name
sortBy((s: Student) => s.lastName, students);

// Sort by graduation year then GPA (combine into string for multi-key)
sortBy((s: Student) => \`\${s.graduationYear}-\${s.gpa}\`, students);

// Sort by full name
sortBy((s: Student) => \`\${s.lastName}, \${s.firstName}\`, students);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Descending Order
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

const scores = [85, 92, 78, 95, 88];

// Ascending (default)
sortBy((n: number) => n, scores);
// [78, 85, 88, 92, 95]

// Descending (negate the value)
sortBy((n: number) => -n, scores);
// [95, 92, 88, 85, 78]

// For strings, use reverse comparison
const names = ['Alice', 'Charlie', 'Bob'];
sortBy((name: string) => name, names).reverse();
// ['Charlie', 'Bob', 'Alice']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Currying
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy, curry } from 'fp-pack';

// Create curried version
const sortByCurried = curry(sortBy);

// Create reusable sorters
const sortByAge = sortByCurried((user: { age: number }) => user.age);
const sortByName = sortByCurried((user: { name: string }) => user.name);
const sortByPrice = sortByCurried((item: { price: number }) => item.price);

const users = [
  { name: 'Charlie', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
];

sortByAge(users);   // Sorted by age
sortByName(users);  // Sorted by name`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Important Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Immutable
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Returns a new sorted array without modifying the original.
          The original array remains unchanged.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Stable Sort
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Elements with equal sort keys maintain their relative order from
          the original array (stable sorting).
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Flexible Keys
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          The key function can return any comparable value: numbers, strings,
          dates, or even computed composite keys.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. Type Safe
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Full TypeScript support with proper type inference for input elements
          and sort keys.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Common Patterns
    </h2>

    <div class="space-y-6">
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Reverse Sort
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { sortBy } from 'fp-pack';

// For numbers: negate the value
sortBy((n: number) => -n, [3, 1, 4, 1, 5]);
// [5, 4, 3, 1, 1]

// For strings/dates: sort then reverse
sortBy((s: string) => s, ['c', 'a', 'b']).reverse();
// ['c', 'b', 'a']`}
        />
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Multi-key Sorting
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { sortBy } from 'fp-pack';

interface Person {
  lastName: string;
  firstName: string;
}

const people: Person[] = [
  { lastName: 'Smith', firstName: 'Alice' },
  { lastName: 'Smith', firstName: 'Bob' },
  { lastName: 'Johnson', firstName: 'Charlie' },
];

// Sort by last name, then first name
sortBy((p: Person) => \`\${p.lastName}|\${p.firstName}\`, people);
// Johnson Charlie, Smith Alice, Smith Bob`}
        />
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Null/Undefined Handling
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { sortBy } from 'fp-pack';

interface Item {
  name: string;
  priority?: number;
}

const items: Item[] = [
  { name: 'A', priority: 2 },
  { name: 'B' },
  { name: 'C', priority: 1 },
];

// Put undefined values last
sortBy((item: Item) => item.priority ?? Infinity, items);
// [C(1), A(2), B(undefined)]

// Put undefined values first
sortBy((item: Item) => item.priority ?? -Infinity, items);
// [B(undefined), C(1), A(2)]`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      vs. Array.prototype.sort
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
];

// Native JavaScript (mutates original, verbose)
users.sort((a, b) => {
  if (a.age < b.age) return -1;
  if (a.age > b.age) return 1;
  return 0;
});

// fp-pack (immutable, concise)
sortBy((user) => user.age, users);

// Benefits:
// 1. Immutable - doesn't modify original
// 2. Simpler - just provide key function
// 3. Data-last - works with curry/pipe
// 4. No need to write comparison logic`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">sortBy</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/sortBy.ts"
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
          navigateTo('/array/sort');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          sort
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Sort values directly
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/groupBy');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          groupBy
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Group values by a key
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Transform values before sorting
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/uniq');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          uniq
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Remove duplicate values
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
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
          Combine sortBy with filter for sorted, filtered results.
        </p>
      </a>

      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Use sortBy in data transformation pipelines.
        </p>
      </a>
    </div>
  </div>
);
