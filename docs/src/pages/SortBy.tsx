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
      code={`import { sortBy } from 'fp-kit';

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
      code={`import { sortBy } from 'fp-kit';

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
      code={`import { sortBy } from 'fp-kit';

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
      code={`import { sortBy } from 'fp-kit';

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
      code={`import { sortBy } from 'fp-kit';

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
      code={`import { sortBy } from 'fp-kit';

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
      code={`import { sortBy } from 'fp-kit';

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
      code={`import { sortBy, curry } from 'fp-kit';

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
          code={`import { sortBy } from 'fp-kit';

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
          code={`import { sortBy } from 'fp-kit';

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
          code={`import { sortBy } from 'fp-kit';

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
      code={`import { sortBy } from 'fp-kit';

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

// fp-kit (immutable, concise)
sortBy((user) => user.age, users);

// Benefits:
// 1. Immutable - doesn't modify original
// 2. Simpler - just provide key function
// 3. Data-last - works with curry/pipe
// 4. No need to write comparison logic`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

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
