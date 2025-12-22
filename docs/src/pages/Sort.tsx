import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Sort = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      sort
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Sort an array using a custom comparator function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is sort?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        sort
      </strong>{' '}
      sorts an array using a custom comparator function that defines the sort order.
      <br />
      <br />
      Unlike <code>sortBy</code> which extracts a sort key, <code>sort</code> gives you full control
      over the comparison logic. The comparator function receives two elements and returns a number:
      negative if the first should come before the second, positive if after, or zero if equal.
      <br />
      <br />
      sort creates a new sorted array without modifying the original, making it safe for functional programming.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// Ascending order
const ascending = sort((a, b) => a - b, numbers);
// [1, 1, 2, 3, 4, 5, 6, 9]

// Descending order
const descending = sort((a, b) => b - a, numbers);
// [9, 6, 5, 4, 3, 2, 1, 1]

// Original array unchanged
console.log(numbers);
// [3, 1, 4, 1, 5, 9, 2, 6]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Comparator Function
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The comparator function <code>(a, b) =&gt; number</code> determines the sort order:
    </p>

    <div class="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
      <ul class="space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong class="text-blue-600 dark:text-blue-400">Return negative</strong> (e.g., -1):
          <code>a</code> comes before <code>b</code>
        </li>
        <li>
          <strong class="text-green-600 dark:text-green-400">Return positive</strong> (e.g., 1):
          <code>a</code> comes after <code>b</code>
        </li>
        <li>
          <strong class="text-gray-600 dark:text-gray-400">Return zero</strong> (0):
          <code>a</code> and <code>b</code> are equal (order unchanged)
        </li>
      </ul>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

// For numbers: subtract to compare
const ascending = (a: number, b: number) => a - b;
const descending = (a: number, b: number) => b - a;

sort(ascending, [5, 2, 8, 1]);   // [1, 2, 5, 8]
sort(descending, [5, 2, 8, 1]);  // [8, 5, 2, 1]

// For strings: use localeCompare
const alphabetical = (a: string, b: string) => a.localeCompare(b);
const reverseAlpha = (a: string, b: string) => b.localeCompare(a);

sort(alphabetical, ['Charlie', 'Alice', 'Bob']);
// ['Alice', 'Bob', 'Charlie']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Sorting Objects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

interface User {
  name: string;
  age: number;
  score: number;
}

const users: User[] = [
  { name: 'Alice', age: 30, score: 85 },
  { name: 'Bob', age: 25, score: 92 },
  { name: 'Charlie', age: 35, score: 78 },
];

// Sort by age (ascending)
const byAge = sort((a, b) => a.age - b.age, users);
// [Bob(25), Alice(30), Charlie(35)]

// Sort by score (descending - highest first)
const byScore = sort((a, b) => b.score - a.score, users);
// [Bob(92), Alice(85), Charlie(78)]

// Sort by name (alphabetically)
const byName = sort((a, b) => a.name.localeCompare(b.name), users);
// [Alice, Bob, Charlie]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Multi-level Sorting
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

interface Product {
  category: string;
  price: number;
  name: string;
}

const products: Product[] = [
  { category: 'Electronics', price: 299, name: 'Keyboard' },
  { category: 'Electronics', price: 199, name: 'Mouse' },
  { category: 'Furniture', price: 499, name: 'Chair' },
  { category: 'Electronics', price: 199, name: 'Headset' },
];

// Sort by category, then by price, then by name
const multiSort = sort((a, b) => {
  // First by category
  const categoryComp = a.category.localeCompare(b.category);
  if (categoryComp !== 0) return categoryComp;

  // Then by price
  const priceComp = a.price - b.price;
  if (priceComp !== 0) return priceComp;

  // Finally by name
  return a.name.localeCompare(b.name);
}, products);

// Result: Electronics items first, sorted by price, then name
// [Mouse(199), Headset(199), Keyboard(299), Chair(499)]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Date Sorting
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

interface Event {
  title: string;
  date: Date;
}

const events: Event[] = [
  { title: 'Workshop', date: new Date('2024-03-15') },
  { title: 'Conference', date: new Date('2024-01-20') },
  { title: 'Meetup', date: new Date('2024-02-10') },
];

// Sort by date (earliest first)
const chronological = sort(
  (a, b) => a.date.getTime() - b.date.getTime(),
  events
);
// [Conference(Jan 20), Meetup(Feb 10), Workshop(Mar 15)]

// Sort by date (latest first)
const reverseChron = sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
  events
);
// [Workshop(Mar 15), Meetup(Feb 10), Conference(Jan 20)]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Case-Insensitive Sorting
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort } from 'fp-kit';

const names = ['charlie', 'Alice', 'BOB', 'david'];

// Case-sensitive (default)
sort((a, b) => a.localeCompare(b), names);
// ['Alice', 'BOB', 'charlie', 'david']

// Case-insensitive
sort(
  (a, b) => a.toLowerCase().localeCompare(b.toLowerCase()),
  names
);
// ['Alice', 'BOB', 'charlie', 'david']

// With locale options
sort(
  (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }),
  names
);
// ['Alice', 'BOB', 'charlie', 'david']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Currying
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sort, curry } from 'fp-kit';

// Create curried version
const sortCurried = curry(sort);

// Create reusable comparators
const sortAscending = sortCurried((a: number, b: number) => a - b);
const sortDescending = sortCurried((a: number, b: number) => b - a);
const sortAlphabetically = sortCurried((a: string, b: string) => a.localeCompare(b));

const numbers = [3, 1, 4, 1, 5];
const words = ['zebra', 'apple', 'mango'];

sortAscending(numbers);       // [1, 1, 3, 4, 5]
sortDescending(numbers);      // [5, 4, 3, 1, 1]
sortAlphabetically(words);    // ['apple', 'mango', 'zebra']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      sort vs. sortBy
    </h2>

    <div class="grid gap-6 mt-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Use sort when:
        </h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 list-disc list-inside space-y-2">
          <li>You need complex comparison logic (multi-level sorting)</li>
          <li>Comparing elements directly without extracting keys</li>
          <li>Different comparison rules for different conditions</li>
          <li>Maximum control over sort order</li>
        </ul>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          Use sortBy when:
        </h4>
        <ul class="text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-2">
          <li>Sorting by a single property or computed value</li>
          <li>Simple ascending order is sufficient</li>
          <li>Want more concise code</li>
          <li>Don't need custom comparison logic</li>
        </ul>
      </div>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { sort, sortBy } from 'fp-kit';

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];

// Using sort (explicit comparator)
sort((a, b) => a.age - b.age, users);

// Using sortBy (simpler for single property)
sortBy(user => user.age, users);

// Both produce the same result, but:
// - sort gives you full control
// - sortBy is more concise for simple cases`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Important Notes
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Immutability
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Creates a new sorted array. The original array is never modified,
          making it safe for functional programming patterns.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Stable Sorting
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Elements with equal values maintain their relative order from the original array
          (stable sort behavior).
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Number Comparisons
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          For numbers, use subtraction: <code>(a, b) =&gt; a - b</code> for ascending,
          <code>(a, b) =&gt; b - a</code> for descending.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. String Comparisons
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          For strings, use <code>localeCompare</code> for proper locale-aware sorting
          instead of simple comparisons.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/sortBy"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/sortBy');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          sortBy →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Learn about sortBy for simpler sorting by property or computed value.
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
          Combine sort with filter for sorted, filtered results.
        </p>
      </a>
    </div>
  </div>
);
