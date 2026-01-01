import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFlatMap = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flatMap (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily map each value to an iterable and flatten the results into a single sequence
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream flatMap?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flatMap
      </strong>{' '}
      is a stream utility that combines mapping and flattening operations in a single, efficient step. It applies a transformation function to each value in the input iterable, where the function returns an iterable, and then flattens all the resulting iterables into a single output sequence. This is particularly useful when working with one-to-many relationships or when each input value should produce multiple output values.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Unlike performing <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">map</code> followed by <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">flatten</code> separately, <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">flatMap</code> performs both operations lazily in a single pass, making it more memory-efficient when working with large or infinite sequences. The function supports both synchronous and asynchronous iterables, automatically handling async operations without additional configuration.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// Sync iterable with sync mapper
function flatMap<T, R>(
  fn: (value: T) => Iterable<R>,
  iterable: Iterable<T>
): IterableIterator<R>;

// Async iterable or async mapper
function flatMap<T, R>(
  fn: (value: T) => Iterable<R> | Promise<Iterable<R>>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<R>;

// Curried sync version
function flatMap<T, R>(
  fn: (value: T) => Iterable<R>
): (iterable: Iterable<T>) => IterableIterator<R>;

// Curried async version
function flatMap<T, R>(
  fn: (value: T) => Iterable<R> | Promise<Iterable<R>>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      Simple Flattening
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-pack/stream';

// Expand each number to a pair of values
const numbers = [1, 2, 3];
const expanded = flatMap((n: number) => [n, n * 10], numbers);

console.log(Array.from(expanded));
// [1, 10, 2, 20, 3, 30]

// Split sentences into words
const sentences = ['Hello world', 'Stream processing'];
const words = flatMap(
  (sentence: string) => sentence.split(' '),
  sentences
);

console.log(Array.from(words));
// ['Hello', 'world', 'Stream', 'processing']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Curried Form for Composition
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, filter, pipe } from 'fp-pack';

interface Category {
  id: number;
  products: string[];
}

const categories: Category[] = [
  { id: 1, products: ['laptop', 'mouse'] },
  { id: 2, products: ['phone', 'tablet'] },
  { id: 3, products: [] },
];

// Extract all products using composition
const getAllProducts = pipe(
  flatMap((cat: Category) => cat.products),
  filter((product: string) => product.length > 0)
);

const allProducts = getAllProducts(categories);
console.log(Array.from(allProducts));
// ['laptop', 'mouse', 'phone', 'tablet']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. Nested Data Expansion
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Expand hierarchical data structures into flat sequences for processing.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, map, pipe } from 'fp-pack';

interface Department {
  name: string;
  employees: { id: number; name: string }[];
}

const departments: Department[] = [
  {
    name: 'Engineering',
    employees: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ],
  },
  {
    name: 'Sales',
    employees: [
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'Diana' },
    ],
  },
];

// Extract all employees with their department
const allEmployees = pipe(
  flatMap((dept: Department) =>
    dept.employees.map(emp => ({
      ...emp,
      department: dept.name,
    }))
  )
)(departments);

for (const emp of allEmployees) {
  console.log(\`\${emp.name} works in \${emp.department}\`);
}
// Alice works in Engineering
// Bob works in Engineering
// Charlie works in Sales
// Diana works in Sales`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. Async API Data Fetching
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Fetch related data for each item and flatten the results into a single stream.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, toArray } from 'fp-pack/stream';

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
}

async function getUserPosts(userId: number): Promise<Post[]> {
  const response = await fetch(
    \`https://api.example.com/users/\${userId}/posts\`
  );
  return response.json();
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

// Fetch all posts for all users
const allPosts = flatMap(
  async (user: User) => await getUserPosts(user.id),
  users
);

const posts = await toArray(allPosts);
console.log(\`Total posts: \${posts.length}\`);
posts.forEach(post => {
  console.log(\`Post: \${post.title}\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. File System Traversal
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Recursively traverse directory structures and flatten all file paths.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, filter, pipe } from 'fp-pack';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

interface FileEntry {
  path: string;
  isDirectory: boolean;
}

async function* getDirectoryEntries(
  dirPath: string
): AsyncIterableIterator<FileEntry> {
  const entries = await readdir(dirPath);

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stats = await stat(fullPath);
    yield {
      path: fullPath,
      isDirectory: stats.isDirectory(),
    };
  }
}

async function* getAllFiles(
  rootPath: string
): AsyncIterableIterator<string> {
  const entries = getDirectoryEntries(rootPath);

  for await (const entry of entries) {
    if (entry.isDirectory) {
      // Recursively get files from subdirectories
      yield* getAllFiles(entry.path);
    } else {
      yield entry.path;
    }
  }
}

// Find all TypeScript files in a project
const projectFiles = pipe(
  filter((path: string) => path.endsWith('.ts'))
)(getAllFiles('./src'));

for await (const file of projectFiles) {
  console.log(\`Found: \${file}\`);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. Text Processing Pipeline
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Process text data by splitting, tokenizing, and analyzing at different granularities.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, filter, map, pipe } from 'fp-pack';

const documents = [
  'The quick brown fox jumps over the lazy dog.',
  'Stream processing enables efficient data transformation.',
  'Functional programming promotes code clarity.',
];

// Split into sentences, then words, then filter and count
const wordCount = pipe(
  // Split documents into sentences
  flatMap((doc: string) => doc.split(/[.!?]+/).filter(s => s.trim())),
  // Split sentences into words
  flatMap((sentence: string) =>
    sentence.toLowerCase().match(/\\b\\w+\\b/g) || []
  ),
  // Filter out common words
  filter((word: string) =>
    !['the', 'a', 'an', 'over', 'and'].includes(word)
  ),
  // Convert to iterable for counting
  (words: Iterable<string>) => {
    const counts = new Map<string, number>();
    for (const word of words) {
      counts.set(word, (counts.get(word) || 0) + 1);
    }
    return counts;
  }
)(documents);

console.log('Word frequencies:');
for (const [word, count] of wordCount) {
  console.log(\`  \${word}: \${count}\`);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. Graph Traversal
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Traverse graph structures by exploring neighbors and flattening the traversal path.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-pack/stream';

interface Node {
  id: string;
  value: number;
  neighbors: string[];
}

const graph: Map<string, Node> = new Map([
  ['A', { id: 'A', value: 1, neighbors: ['B', 'C'] }],
  ['B', { id: 'B', value: 2, neighbors: ['D'] }],
  ['C', { id: 'C', value: 3, neighbors: ['D', 'E'] }],
  ['D', { id: 'D', value: 4, neighbors: [] }],
  ['E', { id: 'E', value: 5, neighbors: [] }],
]);

function* breadthFirstSearch(
  startId: string,
  graph: Map<string, Node>
): IterableIterator<Node> {
  const visited = new Set<string>();
  const queue: string[] = [startId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;

    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const node = graph.get(currentId);
    if (!node) continue;

    yield node;
    queue.push(...node.neighbors);
  }
}

// Find all reachable nodes and sum their values
const startNodes = ['A'];
const allReachableNodes = flatMap(
  (nodeId: string) => breadthFirstSearch(nodeId, graph),
  startNodes
);

let totalValue = 0;
for (const node of allReachableNodes) {
  console.log(\`Visiting node \${node.id} with value \${node.value}\`);
  totalValue += node.value;
}
console.log(\`Total value: \${totalValue}\`);
// Visiting node A with value 1
// Visiting node B with value 2
// Visiting node C with value 3
// Visiting node D with value 4
// Visiting node E with value 5
// Total value: 15`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. Database Query Results Denormalization
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Flatten normalized database results into a denormalized format for reporting.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap, map, pipe } from 'fp-pack';

interface Order {
  orderId: number;
  customerId: number;
  items: { productId: number; quantity: number; price: number }[];
}

const orders: Order[] = [
  {
    orderId: 1,
    customerId: 100,
    items: [
      { productId: 1, quantity: 2, price: 29.99 },
      { productId: 2, quantity: 1, price: 49.99 },
    ],
  },
  {
    orderId: 2,
    customerId: 101,
    items: [
      { productId: 3, quantity: 3, price: 19.99 },
    ],
  },
];

// Flatten orders into individual line items for reporting
const lineItems = pipe(
  flatMap((order: Order) =>
    order.items.map(item => ({
      orderId: order.orderId,
      customerId: order.customerId,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      total: item.quantity * item.price,
    }))
  )
)(orders);

console.log('Order Line Items:');
for (const item of lineItems) {
  console.log(
    \`Order #\${item.orderId}: Product #\${item.productId} - \` +
    \`\${item.quantity}x @ $\${item.price} = $\${item.total.toFixed(2)}\`
  );
}
// Order #1: Product #1 - 2x @ $29.99 = $59.98
// Order #1: Product #2 - 1x @ $49.99 = $49.99
// Order #2: Product #3 - 3x @ $19.99 = $59.97

// Calculate total revenue
const totalRevenue = Array.from(lineItems).reduce(
  (sum, item) => sum + item.total,
  0
);
console.log(\`Total Revenue: $\${totalRevenue.toFixed(2)}\`);
// Total Revenue: $169.94`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use flatMap?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Efficient One-to-Many Mapping
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Combines mapping and flattening in a single lazy operation, avoiding intermediate array allocations and making it ideal for transformations where each input produces multiple outputs.
        </p>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
          Nested Structure Navigation
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Simplifies working with hierarchical or nested data structures by automatically flattening results, making complex data transformations more readable and maintainable.
        </p>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          Async Data Aggregation
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          Seamlessly handles async operations, allowing you to fetch related data for each item and flatten the results into a single stream without managing promises manually.
        </p>
      </div>

      <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          Functional Composition
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          The curried form integrates perfectly with pipe and compose utilities, enabling elegant data transformation pipelines that process complex nested structures.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      The <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">flatMap</code> function is implemented as a lazy iterator that applies the mapping function and flattens in a single pass:
    </p>

    <CodeBlock
      language="typescript"
      code={`// Simplified implementation
function* flatMap<T, R>(
  fn: (value: T) => Iterable<R>,
  iterable: Iterable<T>
): IterableIterator<R> {
  for (const value of iterable) {
    // Apply mapping function to get an iterable
    const mapped = fn(value);

    // Flatten by yielding each item from the mapped iterable
    for (const item of mapped) {
      yield item;
    }
  }
}

// For async support
async function* flatMapAsync<T, R>(
  fn: (value: T) => Iterable<R> | Promise<Iterable<R>>,
  iterable: AsyncIterable<T>
): AsyncIterableIterator<R> {
  for await (const value of iterable) {
    const mapped = await fn(value);

    for await (const item of mapped) {
      yield item;
    }
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      The function evaluates lazily, meaning it only processes values as they are consumed. This makes it memory-efficient for large or infinite sequences, and allows early termination when combined with operations like <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">take</code> or <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">find</code>.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">flatMap</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/flatMap.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Transform each value in an iterable without flattening. Use when you need simple one-to-one transformations.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatten');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatten
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Flatten nested iterables into a single sequence. Use when you already have nested structures to flatten.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Select values that satisfy a predicate. Often combined with flatMap to filter expanded results.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/concat');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          concat
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Concatenate multiple iterables sequentially. Use when combining separate sequences without transformation.
        </p>
      </div>
    </div>
  </div>
);
