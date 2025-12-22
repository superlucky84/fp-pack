import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Take = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      take
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Extract the first n elements from an array
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is take?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        take
      </strong>{' '}
      extracts the first n elements from an array, returning a new array with those elements.
      <br />
      <br />
      It's commonly used for pagination, limiting results, preview displays, or getting a subset
      of data from the beginning of a collection. If n exceeds the array length, it returns
      a copy of the entire array.
      <br />
      <br />
      take creates a new array without modifying the original, making it safe for functional programming.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5];

// Take first 3 elements
take(3, numbers);
// [1, 2, 3]

// Original array unchanged
console.log(numbers);
// [1, 2, 3, 4, 5]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Taking Elements
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

const data = [10, 20, 30, 40, 50];

// Take first 2 elements
take(2, data);
// [10, 20]

// Take first 1 element
take(1, data);
// [10]

// Take all elements
take(5, data);
// [10, 20, 30, 40, 50]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Edge Cases
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

const items = [1, 2, 3];

// n exceeds array length - returns copy of entire array
take(10, items);
// [1, 2, 3]

// Zero elements
take(0, items);
// []

// Negative n - returns empty array
take(-5, items);
// []

// Empty array
take(3, []);
// []`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Pagination
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

interface Post {
  id: number;
  title: string;
  content: string;
}

const allPosts: Post[] = [
  { id: 1, title: 'First Post', content: '...' },
  { id: 2, title: 'Second Post', content: '...' },
  { id: 3, title: 'Third Post', content: '...' },
  // ... many more posts
];

// Show first page (5 posts per page)
const pageSize = 5;
const firstPage = take(pageSize, allPosts);

// For subsequent pages, combine with drop
import { drop } from 'fp-kit';

const getPage = (pageNumber: number, pageSize: number) => {
  const startIndex = pageNumber * pageSize;
  return take(pageSize, drop(startIndex, allPosts));
};

const page1 = getPage(0, 5); // First 5 posts
const page2 = getPage(1, 5); // Next 5 posts`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Preview Display
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

interface Product {
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { name: 'Laptop', price: 999, category: 'Electronics' },
  { name: 'Mouse', price: 29, category: 'Electronics' },
  { name: 'Keyboard', price: 79, category: 'Electronics' },
  { name: 'Monitor', price: 299, category: 'Electronics' },
  { name: 'Desk', price: 399, category: 'Furniture' },
  // ... many more products
];

// Show top 3 featured products
const featuredProducts = take(3, products);

// Show preview of search results
const searchResults = [...]; // many results
const previewResults = take(10, searchResults);
console.log(\`Showing \${previewResults.length} of \${searchResults.length} results\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Top N Rankings
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take, sortBy } from 'fp-kit';

interface Player {
  name: string;
  score: number;
}

const players: Player[] = [
  { name: 'Alice', score: 850 },
  { name: 'Bob', score: 920 },
  { name: 'Charlie', score: 780 },
  { name: 'David', score: 950 },
  { name: 'Eve', score: 880 },
];

// Get top 3 players
const sortedByScore = sortBy(p => -p.score, players); // Sort descending
const topThree = take(3, sortedByScore);
// [David(950), Bob(920), Eve(880)]

// Leaderboard display
topThree.forEach((player, index) => {
  console.log(\`\${index + 1}. \${player.name}: \${player.score} points\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Recent Items
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take } from 'fp-kit';

interface Activity {
  id: number;
  action: string;
  timestamp: Date;
  user: string;
}

const activities: Activity[] = [
  { id: 101, action: 'Login', timestamp: new Date('2024-03-20T10:30:00'), user: 'Alice' },
  { id: 102, action: 'Edit Profile', timestamp: new Date('2024-03-20T10:45:00'), user: 'Bob' },
  { id: 103, action: 'Upload File', timestamp: new Date('2024-03-20T11:00:00'), user: 'Charlie' },
  { id: 104, action: 'Comment', timestamp: new Date('2024-03-20T11:15:00'), user: 'Alice' },
  // ... more activities
];

// Show 5 most recent activities
const recentActivities = take(5, activities);

// Activity feed
console.log('Recent Activity:');
recentActivities.forEach(activity => {
  console.log(\`\${activity.user} - \${activity.action}\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Currying
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { take, curry } from 'fp-kit';

// Create curried version
const takeCurried = curry(take);

// Create reusable takers
const takeThree = takeCurried(3);
const takeFive = takeCurried(5);
const takeTen = takeCurried(10);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

takeThree(numbers);  // [1, 2, 3]
takeFive(numbers);   // [1, 2, 3, 4, 5]
takeTen(numbers);    // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Use in pipe
import { pipe } from 'fp-kit';

const processData = pipe(
  sortBy((x: number) => x),
  takeThree
);

processData([5, 2, 8, 1, 9]);  // [1, 2, 5]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Immutability
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Always creates a new array. The original array remains unchanged,
          making it safe for functional programming patterns.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Safe Boundaries
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Handles edge cases gracefully: negative n returns empty array,
          n greater than length returns a copy of the full array.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Performance
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Uses efficient slice operation. O(n) time complexity where n is the number
          of elements taken.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. Currying-Friendly
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Works naturally with curry to create reusable partial applications
          for common take operations.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/drop"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/drop');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          drop →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Learn about drop, the complement to take for skipping elements.
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
          Extract elements based on a condition, not just position.
        </p>
      </a>
    </div>
  </div>
);
