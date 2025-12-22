import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Unzip = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      unzip
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Separate an array of pairs into two separate arrays
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is unzip?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        unzip
      </strong>{' '}
      takes an array of pairs (tuples with two elements) and separates them into two separate arrays.
      <br />
      <br />
      It's the inverse operation of <code>zip</code>. While zip combines two arrays into an array of pairs,
      unzip takes an array of pairs and splits them back into two arrays. The first array contains all
      the first elements from each pair, and the second array contains all the second elements.
      <br />
      <br />
      This is useful when you have paired data that you need to process separately, or when you need
      to undo a zip operation.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

const pairs: Array<[number, string]> = [
  [1, 'a'],
  [2, 'b'],
  [3, 'c']
];

const [numbers, letters] = unzip(pairs);

console.log(numbers);  // [1, 2, 3]
console.log(letters);  // ['a', 'b', 'c']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Separating Pairs
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// Number and string pairs
const data: Array<[number, string]> = [
  [1, 'one'],
  [2, 'two'],
  [3, 'three']
];

const [nums, words] = unzip(data);
// nums: [1, 2, 3]
// words: ['one', 'two', 'three']

// Different types
const mixed: Array<[string, boolean]> = [
  ['active', true],
  ['pending', false],
  ['complete', true]
];

const [statuses, flags] = unzip(mixed);
// statuses: ['active', 'pending', 'complete']
// flags: [true, false, true]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Empty Arrays
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// Empty input returns two empty arrays
const [left, right] = unzip([]);
// left: []
// right: []`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Relationship with zip
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zip, unzip } from 'fp-kit';

const array1 = [1, 2, 3];
const array2 = ['a', 'b', 'c'];

// zip combines two arrays
const zipped = zip(array1, array2);
// [[1, 'a'], [2, 'b'], [3, 'c']]

// unzip separates them back
const [first, second] = unzip(zipped);
// first: [1, 2, 3]
// second: ['a', 'b', 'c']

// They are inverse operations
console.log(first);   // Same as original array1
console.log(second);  // Same as original array2`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Processing Key-Value Pairs
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// Extract keys and values from Object.entries result
const config = {
  host: 'localhost',
  port: 3000,
  debug: true
};

const entries = Object.entries(config) as Array<[string, string | number | boolean]>;
// [['host', 'localhost'], ['port', 3000], ['debug', true]]

const [keys, values] = unzip(entries);
// keys: ['host', 'port', 'debug']
// values: ['localhost', 3000, true]

console.log('Configuration keys:', keys.join(', '));
console.log('Configuration values:', values);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Coordinate Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

interface Point {
  x: number;
  y: number;
}

// Convert point objects to coordinate pairs
const points: Point[] = [
  { x: 10, y: 20 },
  { x: 30, y: 40 },
  { x: 50, y: 60 }
];

const coordinatePairs: Array<[number, number]> = points.map(p => [p.x, p.y]);

// Separate into x and y arrays for processing
const [xCoords, yCoords] = unzip(coordinatePairs);
// xCoords: [10, 30, 50]
// yCoords: [20, 40, 60]

// Calculate bounds
const minX = Math.min(...xCoords);
const maxX = Math.max(...xCoords);
const minY = Math.min(...yCoords);
const maxY = Math.max(...yCoords);

console.log(\`Bounding box: (\${minX}, \${minY}) to (\${maxX}, \${maxY})\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Time Series Data
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// Time series data as timestamp-value pairs
const timeSeries: Array<[number, number]> = [
  [1609459200000, 100],  // 2021-01-01: 100
  [1609545600000, 120],  // 2021-01-02: 120
  [1609632000000, 115],  // 2021-01-03: 115
  [1609718400000, 130],  // 2021-01-04: 130
];

// Separate timestamps and values for charting
const [timestamps, values] = unzip(timeSeries);

// timestamps: [1609459200000, 1609545600000, 1609632000000, 1609718400000]
// values: [100, 120, 115, 130]

// Now can use separately in chart library
const chartData = {
  labels: timestamps.map(ts => new Date(ts).toLocaleDateString()),
  datasets: [{
    data: values,
    label: 'Sales'
  }]
};`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Database Query Results
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

interface UserScore {
  userId: string;
  score: number;
}

// Query returns user-score pairs
const results: Array<[string, number]> = [
  ['user1', 85],
  ['user2', 92],
  ['user3', 78],
  ['user4', 95]
];

// Separate for different processing
const [userIds, scores] = unzip(results);

// Calculate statistics on scores
const average = scores.reduce((a, b) => a + b, 0) / scores.length;
const highest = Math.max(...scores);

// Find user with highest score
const topUserIndex = scores.indexOf(highest);
const topUser = userIds[topUserIndex];

console.log(\`Average score: \${average}\`);
console.log(\`Top performer: \${topUser} with \${highest} points\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Label-Data Separation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// Machine learning training data
const trainingData: Array<[string, number[]]> = [
  ['cat', [0.2, 0.8, 0.1]],
  ['dog', [0.7, 0.1, 0.2]],
  ['bird', [0.1, 0.3, 0.9]],
];

// Separate labels and features
const [labels, features] = unzip(trainingData);

// labels: ['cat', 'dog', 'bird']
// features: [[0.2, 0.8, 0.1], [0.7, 0.1, 0.2], [0.1, 0.3, 0.9]]

// Now can use separately in ML pipeline
const model = trainModel(features, labels);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, filter, unzip } from 'fp-kit';

interface Transaction {
  id: string;
  amount: number;
}

const transactions: Transaction[] = [
  { id: 't1', amount: 100 },
  { id: 't2', amount: -50 },
  { id: 't3', amount: 200 },
  { id: 't4', amount: -30 },
];

// Process and separate positive transactions
const processTransactions = pipe(
  (txns: Transaction[]) => txns.map(t => [t.id, t.amount] as [string, number]),
  filter(([_, amount]: [string, number]) => amount > 0),
  unzip
);

const [ids, amounts] = processTransactions(transactions);
// ids: ['t1', 't3']
// amounts: [100, 200]

console.log(\`Total positive: $\${amounts.reduce((a, b) => a + b, 0)}\`);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      zip and unzip
    </h2>

    <div class="grid gap-6 mt-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          zip: Combine two arrays
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200 mb-3">
          Takes two separate arrays and combines them into an array of pairs.
        </p>
        <CodeBlock
          language="typescript"
          code={`zip([1, 2, 3], ['a', 'b', 'c'])
// [[1, 'a'], [2, 'b'], [3, 'c']]`}
        />
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          unzip: Separate pairs
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200 mb-3">
          Takes an array of pairs and separates them into two arrays.
        </p>
        <CodeBlock
          language="typescript"
          code={`unzip([[1, 'a'], [2, 'b'], [3, 'c']])
// [[1, 2, 3], ['a', 'b', 'c']]`}
        />
      </div>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { zip, unzip } from 'fp-kit';

// They are inverse operations
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];

// zip then unzip returns original arrays
const [result1, result2] = unzip(zip(arr1, arr2));
// result1 === [1, 2, 3]
// result2 === ['a', 'b', 'c']

// unzip then zip returns original pairs
const pairs = [[1, 'a'], [2, 'b'], [3, 'c']] as Array<[number, string]>;
const [left, right] = unzip(pairs);
const reconstructed = zip(left, right);
// reconstructed === [[1, 'a'], [2, 'b'], [3, 'c']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Inverse of zip
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Performs the opposite operation of zip. Can reconstruct original arrays
          from zipped data.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Type Safety
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Maintains TypeScript types through the transformation. The input and output
          types are properly inferred.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Tuple Destructuring
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Returns a tuple that can be destructured into two separate arrays
          using array destructuring syntax.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. Performance
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          O(n) time complexity where n is the number of pairs. Creates two new arrays.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/zip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/zip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          zip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Learn about zip, the inverse operation that combines two arrays.
        </p>
      </a>

      <a
        href="/array/zipIndex"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/zipIndex');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          zipIndex →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Pair array elements with their indices.
        </p>
      </a>
    </div>
  </div>
);
