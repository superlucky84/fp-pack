import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Uniq = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      uniq
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Remove duplicate values from an array
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is uniq?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        uniq
      </strong>{' '}
      removes duplicate values from an array, returning a new array containing only unique elements.
      <br />
      <br />
      The function preserves the order of first occurrence - each unique value appears in the result
      at the same position as its first appearance in the original array. For primitive values like
      numbers and strings, equality is determined by value. For objects, equality is determined by reference.
      <br />
      <br />
      uniq creates a new array without modifying the original, making it safe for functional programming.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

const numbers = [1, 2, 2, 3, 1, 4];

uniq(numbers);
// [1, 2, 3, 4]

// Original array unchanged
console.log(numbers);
// [1, 2, 2, 3, 1, 4]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Removing Duplicates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

// Numbers
uniq([1, 2, 2, 3, 1]);
// [1, 2, 3]

// Strings
uniq(['apple', 'banana', 'apple', 'cherry']);
// ['apple', 'banana', 'cherry']

// Mixed types
uniq([1, '1', 2, '2', 1, '1']);
// [1, '1', 2, '2']

// Booleans
uniq([true, false, true, false]);
// [true, false]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Order Preservation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

const data = ['c', 'a', 'b', 'a', 'c'];

// First occurrence order is preserved
uniq(data);
// ['c', 'a', 'b']
// Notice: 'c' comes first because it appeared first

// Compare with sorted unique
import { pipe, sort } from 'fp-pack';

const sortedUnique = pipe(
  uniq,
  sort((a: string, b: string) => a.localeCompare(b))
);

sortedUnique(data);
// ['a', 'b', 'c']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Reference Equality for Objects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

// Same reference - treated as duplicate
const obj1 = { id: 1, name: 'Alice' };
const obj2 = { id: 2, name: 'Bob' };

uniq([obj1, obj2, obj1]);
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

// Different references - treated as unique
const a = { id: 1 };
const b = { id: 1 };

uniq([a, b, a]);
// [{ id: 1 }, { id: 1 }]
// Both objects remain because they are different references

// For value-based uniqueness, use uniqBy
import { uniqBy } from 'fp-pack';

uniqBy((obj: { id: number }) => obj.id, [a, b, a]);
// [{ id: 1 }]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Tag Collection
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

interface Article {
  title: string;
  tags: string[];
}

const articles: Article[] = [
  { title: 'Post 1', tags: ['javascript', 'react', 'typescript'] },
  { title: 'Post 2', tags: ['python', 'django'] },
  { title: 'Post 3', tags: ['javascript', 'nodejs', 'typescript'] },
  { title: 'Post 4', tags: ['react', 'redux'] },
];

// Get all unique tags
const allTags = articles.flatMap(article => article.tags);
const uniqueTags = uniq(allTags);
// ['javascript', 'react', 'typescript', 'python', 'django', 'nodejs', 'redux']

// Use for tag filter UI
uniqueTags.forEach(tag => {
  console.log(\`<button>\${tag}</button>\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Category List
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

interface Product {
  name: string;
  category: string;
  subcategory: string;
}

const products: Product[] = [
  { name: 'Laptop', category: 'Electronics', subcategory: 'Computers' },
  { name: 'Mouse', category: 'Electronics', subcategory: 'Accessories' },
  { name: 'Desk', category: 'Furniture', subcategory: 'Office' },
  { name: 'Chair', category: 'Furniture', subcategory: 'Office' },
  { name: 'Keyboard', category: 'Electronics', subcategory: 'Accessories' },
];

// Get unique categories
const categories = uniq(products.map(p => p.category));
// ['Electronics', 'Furniture']

// Get unique subcategories
const subcategories = uniq(products.map(p => p.subcategory));
// ['Computers', 'Accessories', 'Office']

// Build navigation menu
categories.forEach(category => {
  const items = products.filter(p => p.category === category);
  console.log(\`\${category}: \${items.length} items\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      User Permissions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

interface User {
  name: string;
  roles: string[];
}

const users: User[] = [
  { name: 'Alice', roles: ['admin', 'editor'] },
  { name: 'Bob', roles: ['editor', 'viewer'] },
  { name: 'Charlie', roles: ['viewer'] },
  { name: 'David', roles: ['admin', 'viewer'] },
];

// Get all unique roles in the system
const allRoles = users.flatMap(user => user.roles);
const uniqueRoles = uniq(allRoles);
// ['admin', 'editor', 'viewer']

// Check which roles are being used
console.log('Active roles in system:', uniqueRoles.join(', '));

// Count users per role
uniqueRoles.forEach(role => {
  const count = users.filter(u => u.roles.includes(role)).length;
  console.log(\`\${role}: \${count} users\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Cleaning
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

// Remove duplicate form submissions
const formSubmissions = [
  'user@example.com',
  'admin@example.com',
  'user@example.com', // duplicate
  'test@example.com',
  'admin@example.com', // duplicate
];

const uniqueEmails = uniq(formSubmissions);
// ['user@example.com', 'admin@example.com', 'test@example.com']

// Clean up search history
const searchHistory = [
  'react hooks',
  'typescript tutorial',
  'react hooks', // duplicate
  'nodejs express',
  'typescript tutorial', // duplicate
];

const cleanHistory = uniq(searchHistory);
// ['react hooks', 'typescript tutorial', 'nodejs express']

// Show recent unique searches
console.log('Recent searches:', cleanHistory.slice(0, 5).join(', '));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Event Listeners
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

interface EventListener {
  event: string;
  handler: () => void;
}

const listeners: string[] = [
  'click',
  'mouseover',
  'click',    // duplicate
  'keydown',
  'mouseover', // duplicate
  'scroll',
];

// Get unique event types to set up
const uniqueEvents = uniq(listeners);
// ['click', 'mouseover', 'keydown', 'scroll']

// Set up event listeners only once per type
uniqueEvents.forEach(eventType => {
  console.log(\`Setting up listener for: \${eventType}\`);
  // element.addEventListener(eventType, handler);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, uniq, map, filter } from 'fp-pack';

interface Order {
  customerId: number;
  amount: number;
  status: string;
}

const orders: Order[] = [
  { customerId: 1, amount: 100, status: 'completed' },
  { customerId: 2, amount: 200, status: 'completed' },
  { customerId: 1, amount: 150, status: 'completed' },
  { customerId: 3, amount: 300, status: 'pending' },
  { customerId: 2, amount: 250, status: 'completed' },
];

// Get unique customer IDs who completed orders
const uniqueCompletedCustomers = pipe(
  filter((order: Order) => order.status === 'completed'),
  map((order: Order) => order.customerId),
  uniq
);

uniqueCompletedCustomers(orders);
// [1, 2]

console.log('Customers with completed orders:', uniqueCompletedCustomers(orders).length);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      uniq vs. uniqBy
    </h2>

    <div class="grid gap-6 mt-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Use uniq when:
        </h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 list-disc list-inside space-y-2">
          <li>Working with primitive values (numbers, strings, booleans)</li>
          <li>Reference equality is sufficient for objects</li>
          <li>Simple deduplication without custom logic</li>
          <li>Want the simplest and most performant solution</li>
        </ul>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          Use uniqBy when:
        </h4>
        <ul class="text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-2">
          <li>Need to compare objects by specific properties</li>
          <li>Custom uniqueness criteria (e.g., case-insensitive strings)</li>
          <li>Comparing by computed or transformed values</li>
          <li>Value-based equality instead of reference equality</li>
        </ul>
      </div>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { uniq, uniqBy } from 'fp-pack';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (duplicate)' }, // Same ID
];

// uniq - compares by reference (keeps all)
uniq(users);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 1, name: 'Alice (duplicate)' }
// ]

// uniqBy - compares by ID (removes duplicate)
uniqBy((user: { id: number }) => user.id, users);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Order Preservation
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Maintains the order of first occurrence. Each unique value appears at the position
          where it was first encountered in the original array.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Reference Equality
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          For objects, uses reference equality (===). Different objects with same values
          are treated as unique. Use uniqBy for value-based comparison.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Performance
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Uses Set for O(n) time complexity. Efficient even for large arrays.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. Immutability
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Creates a new array without modifying the original, making it safe for
          functional programming patterns.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">uniq</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/uniq.ts"
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
          navigateTo('/array/uniqBy');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          uniqBy
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Deduplicate by a derived key
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Filter values by a predicate
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/sort');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          sort
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Sort values before deduping
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
          Combine uniq with filter to get unique elements matching a condition.
        </p>
      </a>

      <a
        href="/array/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Use map before uniq to extract and deduplicate specific properties.
        </p>
      </a>
    </div>
  </div>
);
