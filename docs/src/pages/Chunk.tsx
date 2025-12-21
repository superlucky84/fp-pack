import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Chunk = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      chunk
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Split an array into chunks of specified size
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is chunk?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        chunk
      </strong>{' '}
      divides an array into smaller arrays (chunks) of a specified size. The last chunk
      may contain fewer elements if the array length is not evenly divisible by the chunk size.
      <br />
      <br />
      This is useful for <strong>pagination</strong>, <strong>batch processing</strong>,
      <strong>grid layouts</strong>, and <strong>splitting data into groups</strong>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

chunk(3, numbers);
// [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

chunk(4, numbers);
// [[1, 2, 3, 4], [5, 6, 7, 8], [9]]

chunk(2, numbers);
// [[1, 2], [3, 4], [5, 6], [7, 8], [9]]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function chunk<T>(size: number, arr: T[]): T[][];

// Takes chunk size and array
// Returns an array of chunks`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The size is automatically floored to an integer. If size is 0, negative, or not finite,
      an empty array is returned.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Examples
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-kit';

// Split into pairs
const pairs = chunk(2, [1, 2, 3, 4, 5, 6]);
// [[1, 2], [3, 4], [5, 6]]

// Split into triplets
const triplets = chunk(3, ['a', 'b', 'c', 'd', 'e', 'f', 'g']);
// [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]

// Last chunk may be smaller
const groups = chunk(5, [1, 2, 3, 4, 5, 6, 7]);
// [[1, 2, 3, 4, 5], [6, 7]]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Pagination
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 300 },
  { id: 5, name: 'Headphones', price: 150 },
  { id: 6, name: 'Webcam', price: 80 },
  { id: 7, name: 'Microphone', price: 120 },
];

const ITEMS_PER_PAGE = 3;
const pages = chunk(ITEMS_PER_PAGE, products);

// Page 1: [{ id: 1, ... }, { id: 2, ... }, { id: 3, ... }]
// Page 2: [{ id: 4, ... }, { id: 5, ... }, { id: 6, ... }]
// Page 3: [{ id: 7, ... }]

function getPage(pageNumber: number) {
  return pages[pageNumber - 1] || [];
}

getPage(1); // First 3 products
getPage(2); // Next 3 products
getPage(3); // Last product`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Grid Layout
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-kit';

const images = [
  'img1.jpg', 'img2.jpg', 'img3.jpg',
  'img4.jpg', 'img5.jpg', 'img6.jpg',
  'img7.jpg', 'img8.jpg', 'img9.jpg',
  'img10.jpg'
];

const COLUMNS = 3;
const rows = chunk(COLUMNS, images);

// Render as grid
rows.forEach(row => {
  console.log('Row:', row);
});
// Row: ['img1.jpg', 'img2.jpg', 'img3.jpg']
// Row: ['img4.jpg', 'img5.jpg', 'img6.jpg']
// Row: ['img7.jpg', 'img8.jpg', 'img9.jpg']
// Row: ['img10.jpg']

// In React
function ImageGrid({ images }: { images: string[] }) {
  const rows = chunk(3, images);

  return (
    <div>
      {rows.map((row, i) => (
        <div key={i} class="grid grid-cols-3 gap-4">
          {row.map((img, j) => (
            <img key={j} src={img} alt="" />
          ))}
        </div>
      ))}
    </div>
  );
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Batch Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-kit';

async function processInBatches<T>(
  items: T[],
  batchSize: number,
  processor: (batch: T[]) => Promise<void>
) {
  const batches = chunk(batchSize, items);

  for (const batch of batches) {
    await processor(batch);
  }
}

// Process 1000 items in batches of 50
const items = Array.from({ length: 1000 }, (_, i) => i);

await processInBatches(items, 50, async (batch) => {
  console.log(\`Processing batch of \${batch.length} items\`);
  // Send to API, process, etc.
  await fetch('/api/batch', {
    method: 'POST',
    body: JSON.stringify(batch),
  });
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Rate Limiting
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-kit';

async function fetchWithRateLimit(
  urls: string[],
  maxConcurrent: number
): Promise<Response[]> {
  const batches = chunk(maxConcurrent, urls);
  const results: Response[] = [];

  for (const batch of batches) {
    // Process each batch concurrently
    const batchResults = await Promise.all(
      batch.map(url => fetch(url))
    );
    results.push(...batchResults);

    // Optional: delay between batches
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

// Fetch 100 URLs, 10 at a time
const urls = Array.from({ length: 100 }, (_, i) =>
  \`https://api.example.com/item/\${i}\`
);

const responses = await fetchWithRateLimit(urls, 10);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Visualization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-kit';

// Group data points for averaging/smoothing
const temperatures = [
  72, 73, 71, 74, 75, 76, 74, 73,
  72, 71, 70, 69, 68, 67, 66, 65
];

// Average every 4 hours
const hourlyGroups = chunk(4, temperatures);
const averages = hourlyGroups.map(group =>
  group.reduce((sum, temp) => sum + temp, 0) / group.length
);

console.log(averages);
// [72.5, 74.75, 71.5, 66.5]

// Create histogram bins
function createHistogram(data: number[], binSize: number) {
  const sorted = [...data].sort((a, b) => a - b);
  const bins = chunk(binSize, sorted);

  return bins.map((bin, i) => ({
    range: \`\${bin[0]}-\${bin[bin.length - 1]}\`,
    count: bin.length,
    average: bin.reduce((sum, n) => sum + n, 0) / bin.length
  }));
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, chunk } from 'fp-kit';

const processData = pipe(
  (data: number[]) => data.filter(n => n > 0),
  (data: number[]) => chunk(5, data),
  (chunks: number[][]) => chunks.map(chunk => ({
    items: chunk,
    sum: chunk.reduce((a, b) => a + b, 0),
    avg: chunk.reduce((a, b) => a + b, 0) / chunk.length
  }))
);

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const result = processData(data);
// [
//   { items: [1, 2, 3, 4, 5], sum: 15, avg: 3 },
//   { items: [6, 7, 8, 9, 10], sum: 40, avg: 8 },
//   { items: [11, 12], sum: 23, avg: 11.5 }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Edge Cases
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { chunk } from 'fp-kit';

// Empty array
chunk(3, []);
// []

// Size larger than array
chunk(10, [1, 2, 3]);
// [[1, 2, 3]]

// Size of 1
chunk(1, [1, 2, 3]);
// [[1], [2], [3]]

// Invalid sizes return empty array
chunk(0, [1, 2, 3]);      // []
chunk(-5, [1, 2, 3]);     // []
chunk(Infinity, [1, 2]);  // []
chunk(NaN, [1, 2]);       // []

// Decimal sizes are floored
chunk(2.7, [1, 2, 3, 4, 5]);
// [[1, 2], [3, 4], [5]]  (treated as size 2)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      chunk uses array slicing to create chunks efficiently:
    </p>

    <CodeBlock
      language="typescript"
      code={`function chunk<T>(size: number, arr: T[]): T[][] {
  const chunkSize = Math.floor(size);
  if (!Number.isFinite(chunkSize) || chunkSize <= 0) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The function floors the size and validates it before processing. Array.slice is used
      to create new arrays for each chunk, ensuring immutability.
    </p>

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
          Learn about drop for removing the first n elements of an array.
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
          Discover groupBy for grouping array elements by a key function.
        </p>
      </a>
    </div>
  </div>
);
