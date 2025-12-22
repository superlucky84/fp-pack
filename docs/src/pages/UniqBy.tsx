import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const UniqBy = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      uniqBy
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Remove duplicates from an array based on a custom key function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is uniqBy?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        uniqBy
      </strong>{' '}
      removes duplicate values from an array based on a custom key function that determines uniqueness.
      <br />
      <br />
      Unlike <code>uniq</code> which uses direct value comparison, <code>uniqBy</code> allows you to
      specify exactly how uniqueness should be determined. You provide a function that extracts or
      computes a key from each element, and elements with the same key are considered duplicates.
      <br />
      <br />
      This is particularly useful for removing duplicates from arrays of objects based on specific
      properties, or for implementing custom uniqueness logic like case-insensitive string comparison.
      <br />
      <br />
      uniqBy creates a new array without modifying the original, making it safe for functional programming.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (duplicate)' },
];

// Remove duplicates by id
uniqBy(user => user.id, users);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      By Object Property
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  category: string;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 2, name: 'Mouse', category: 'Electronics' },
  { id: 3, name: 'Desk', category: 'Furniture' },
  { id: 4, name: 'Chair', category: 'Furniture' },
];

// Get unique categories (first product per category)
uniqBy(product => product.category, products);
// [
//   { id: 1, name: 'Laptop', category: 'Electronics' },
//   { id: 3, name: 'Desk', category: 'Furniture' }
// ]

// Remove duplicates by ID
const duplicateProducts = [
  { id: 1, name: 'Laptop', category: 'Electronics' },
  { id: 1, name: 'Laptop (duplicate)', category: 'Electronics' },
  { id: 2, name: 'Mouse', category: 'Electronics' },
];

uniqBy(product => product.id, duplicateProducts);
// [
//   { id: 1, name: 'Laptop', category: 'Electronics' },
//   { id: 2, name: 'Mouse', category: 'Electronics' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Case-Insensitive Strings
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

const names = ['Alice', 'BOB', 'alice', 'Charlie', 'bob'];

// Remove case-insensitive duplicates
uniqBy(name => name.toLowerCase(), names);
// ['Alice', 'BOB', 'Charlie']

const emails = [
  'user@example.com',
  'USER@EXAMPLE.COM',
  'admin@example.com',
];

uniqBy(email => email.toLowerCase(), emails);
// ['user@example.com', 'admin@example.com']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Computed Keys
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

const words = ['hello', 'world', 'hi', 'earth'];

// Unique by first letter
uniqBy(word => word[0], words);
// ['hello', 'world', 'earth']

// Unique by length
uniqBy(word => word.length, words);
// ['hello', 'hi']

const numbers = [1, -1, 2, -2, 3, -3];

// Unique by absolute value
uniqBy(n => Math.abs(n), numbers);
// [1, 2, 3]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Multiple Properties
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface Point {
  x: number;
  y: number;
  label: string;
}

const points: Point[] = [
  { x: 1, y: 2, label: 'A' },
  { x: 3, y: 4, label: 'B' },
  { x: 1, y: 2, label: 'C' }, // Same coordinates as A
];

// Unique by coordinates (combine x and y)
uniqBy(point => \`\${point.x},\${point.y}\`, points);
// [
//   { x: 1, y: 2, label: 'A' },
//   { x: 3, y: 4, label: 'B' }
// ]

// Or use JSON.stringify for complex objects
uniqBy(point => JSON.stringify({ x: point.x, y: point.y }), points);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Deduplicating API Responses
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface ApiUser {
  userId: string;
  name: string;
  email: string;
  lastUpdated: Date;
}

// Multiple API calls might return duplicate users
const response1: ApiUser[] = [
  { userId: 'u1', name: 'Alice', email: 'alice@example.com', lastUpdated: new Date('2024-01-01') },
  { userId: 'u2', name: 'Bob', email: 'bob@example.com', lastUpdated: new Date('2024-01-02') },
];

const response2: ApiUser[] = [
  { userId: 'u1', name: 'Alice', email: 'alice@example.com', lastUpdated: new Date('2024-01-03') },
  { userId: 'u3', name: 'Charlie', email: 'charlie@example.com', lastUpdated: new Date('2024-01-04') },
];

const allUsers = [...response1, ...response2];

// Remove duplicates by userId (keeps first occurrence)
const uniqueUsers = uniqBy(user => user.userId, allUsers);
// [
//   { userId: 'u1', name: 'Alice', ... lastUpdated: 2024-01-01 },
//   { userId: 'u2', name: 'Bob', ... },
//   { userId: 'u3', name: 'Charlie', ... }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Shopping Cart Items
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  addedAt: Date;
}

const cartItems: CartItem[] = [
  { productId: 'p1', name: 'Laptop', quantity: 1, addedAt: new Date('2024-01-01') },
  { productId: 'p2', name: 'Mouse', quantity: 2, addedAt: new Date('2024-01-02') },
  { productId: 'p1', name: 'Laptop', quantity: 1, addedAt: new Date('2024-01-03') }, // Duplicate
];

// Remove duplicate products (user accidentally added same item twice)
const uniqueItems = uniqBy(item => item.productId, cartItems);

console.log(\`Cart has \${uniqueItems.length} unique products\`);

// For proper cart merging, you might want to sum quantities
// This example just removes duplicates keeping first occurrence`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Search Results Deduplication
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface SearchResult {
  url: string;
  title: string;
  source: string;
  score: number;
}

// Multiple search engines return results
const googleResults: SearchResult[] = [
  { url: 'example.com/page1', title: 'Page 1', source: 'google', score: 0.95 },
  { url: 'example.com/page2', title: 'Page 2', source: 'google', score: 0.90 },
];

const bingResults: SearchResult[] = [
  { url: 'example.com/page1', title: 'Page One', source: 'bing', score: 0.88 },
  { url: 'example.com/page3', title: 'Page 3', source: 'bing', score: 0.85 },
];

const allResults = [...googleResults, ...bingResults];

// Deduplicate by URL (keeps first/highest scoring source)
const uniqueResults = uniqBy(result => result.url, allResults);
// [
//   { url: 'example.com/page1', title: 'Page 1', source: 'google', score: 0.95 },
//   { url: 'example.com/page2', ... },
//   { url: 'example.com/page3', ... }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Event Deduplication
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface Event {
  eventId: string;
  type: string;
  timestamp: Date;
  data: any;
}

// Event stream might contain duplicates due to retries
const eventStream: Event[] = [
  { eventId: 'e1', type: 'click', timestamp: new Date('2024-01-01T10:00:00'), data: {} },
  { eventId: 'e2', type: 'view', timestamp: new Date('2024-01-01T10:01:00'), data: {} },
  { eventId: 'e1', type: 'click', timestamp: new Date('2024-01-01T10:00:05'), data: {} }, // Duplicate
  { eventId: 'e3', type: 'submit', timestamp: new Date('2024-01-01T10:02:00'), data: {} },
];

// Remove duplicate events by eventId
const uniqueEvents = uniqBy(event => event.eventId, eventStream);
// [
//   { eventId: 'e1', type: 'click', ... },
//   { eventId: 'e2', type: 'view', ... },
//   { eventId: 'e3', type: 'submit', ... }
// ]

console.log(\`Processed \${uniqueEvents.length} unique events\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Tag Normalization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

// User-submitted tags might have inconsistent casing
const tags = [
  'JavaScript',
  'javascript',
  'TypeScript',
  'JAVASCRIPT',
  'typescript',
  'React',
  'react',
];

// Normalize to lowercase and remove duplicates
const uniqueTags = uniqBy(tag => tag.toLowerCase(), tags);
// ['JavaScript', 'TypeScript', 'React']
// Note: Keeps first occurrence with original casing

// For actual lowercase output, combine with map
import { pipe, map } from 'fp-kit';

const normalizedTags = pipe(
  uniqBy((tag: string) => tag.toLowerCase()),
  map((tag: string) => tag.toLowerCase())
);

normalizedTags(tags);
// ['javascript', 'typescript', 'react']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Currying
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy, curry } from 'fp-kit';

// Create curried version
const uniqByCurried = curry(uniqBy);

// Create reusable deduplicators
const uniqById = uniqByCurried((item: { id: number }) => item.id);
const uniqByName = uniqByCurried((item: { name: string }) => item.name);
const uniqByEmail = uniqByCurried((user: { email: string }) => user.email.toLowerCase());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 1, name: 'Alice (dup)', email: 'alice2@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

uniqById(users);     // Removes duplicates by ID
uniqByName(users);   // Removes duplicates by name
uniqByEmail(users);  // Removes duplicates by email

// Use in pipe
import { pipe, filter } from 'fp-kit';

const processUsers = pipe(
  filter((user: { id: number; name: string; email: string }) => user.email.includes('@')),
  uniqByEmail
);`}
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
          <li>Direct value comparison is sufficient</li>
          <li>Objects should be compared by reference</li>
          <li>Want the simplest solution</li>
        </ul>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          Use uniqBy when:
        </h4>
        <ul class="text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-2">
          <li>Comparing objects by specific properties or computed values</li>
          <li>Need custom uniqueness logic (case-insensitive, etc.)</li>
          <li>Want value-based comparison instead of reference comparison</li>
          <li>Deduplicating complex data structures</li>
        </ul>
      </div>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { uniq, uniqBy } from 'fp-kit';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (dup)' },
];

// uniq - compares by reference (all are unique)
uniq(users).length;
// 3 (all objects are different references)

// uniqBy - compares by ID (removes duplicate)
uniqBy(user => user.id, users).length;
// 2 (same ID = duplicate)

// For primitives, they work the same
const numbers = [1, 2, 2, 3, 1];
uniq(numbers);              // [1, 2, 3]
uniqBy(n => n, numbers);    // [1, 2, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Custom Key Function
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Provides full control over how uniqueness is determined. Extract properties,
          compute values, or apply transformations to create comparison keys.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Order Preservation
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Maintains the order of first occurrence. When duplicates are found,
          the first element with that key is kept.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Performance
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Uses Set for O(n) time complexity. The key function is called once per element.
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
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/uniq"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/uniq');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          uniq →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Learn about uniq for simple value-based deduplication.
        </p>
      </a>

      <a
        href="/array/groupBy"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/groupBy');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          groupBy →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Group elements by key instead of just removing duplicates.
        </p>
      </a>
    </div>
  </div>
);
