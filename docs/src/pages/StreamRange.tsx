import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamRange = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/range
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily generate numeric sequences with ascending or descending order
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream/range?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded">
        range
      </strong>{' '}
      creates a lazy iterable of numbers from <code class="text-sm">start</code> up to but excluding{' '}
      <code class="text-sm">end</code>. It automatically detects whether to count up or down based on
      the start and end values, making it flexible for both ascending and descending sequences.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      This is particularly useful when:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>You need to iterate a specific number of times without creating an array</li>
      <li>Generating index sequences for data processing or pagination</li>
      <li>Creating test data or placeholder sequences</li>
      <li>Memory efficiency matters when dealing with large ranges</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, toArray } from 'fp-pack/stream';

// Ascending range
const ascending = pipe(
  range,
  toArray
)(0, 5);
// [0, 1, 2, 3, 4]

// Descending range (automatically detected)
const descending = pipe(
  range,
  toArray
)(5, 0);
// [5, 4, 3, 2, 1]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function range(
  start: number,
  end: number
): IterableIterator<number>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The function returns a lazy iterator that generates numbers from start (inclusive) to end (exclusive).
      Direction is automatically determined: ascending when start &lt; end, descending when start &gt; end.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Generate Indexed Items
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, map, toArray } from 'fp-pack/stream';

// Create numbered labels
const labels = pipe(
  range,
  map((n: number) => \`Item #\${n}\`),
  toArray
)(1, 6);
// ['Item #1', 'Item #2', 'Item #3', 'Item #4', 'Item #5']

// Generate placeholder objects
const placeholders = pipe(
  range,
  map((id: number) => ({ id, name: \`User \${id}\`, active: false })),
  toArray
)(1, 4);
// [
//   { id: 1, name: 'User 1', active: false },
//   { id: 2, name: 'User 2', active: false },
//   { id: 3, name: 'User 3', active: false }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Lazy Pagination
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, take, map, toArray } from 'fp-pack/stream';

// Generate page numbers lazily
// Only computes the first 3 pages, not all 1000
const pageNumbers = pipe(
  range,
  take(3),
  toArray
)(1, 1000);
// [1, 2, 3]

// Generate API endpoint URLs for pages
const apiUrls = pipe(
  range,
  take(5),
  map((page: number) => \`https://api.example.com/data?page=\${page}\`),
  toArray
)(1, Infinity);
// [
//   'https://api.example.com/data?page=1',
//   'https://api.example.com/data?page=2',
//   'https://api.example.com/data?page=3',
//   'https://api.example.com/data?page=4',
//   'https://api.example.com/data?page=5'
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Grid Coordinates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, flatMap, map, toArray } from 'fp-pack/stream';

// Generate 2D grid coordinates
const grid = pipe(
  range,
  flatMap((x: number) =>
    pipe(
      range,
      map((y: number) => ({ x, y }))
    )(0, 3)
  ),
  toArray
)(0, 3);
// [
//   { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 },
//   { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
//   { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Countdown Timer
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, map, toArray } from 'fp-pack/stream';

// Create descending countdown
const countdown = pipe(
  range,
  map((n: number) => \`T-minus \${n} seconds\`),
  toArray
)(10, 0);
// [
//   'T-minus 10 seconds',
//   'T-minus 9 seconds',
//   ...
//   'T-minus 1 seconds'
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Combine with Filter
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, filter, map, toArray } from 'fp-pack/stream';

// Get only even numbers and square them
const evenSquares = pipe(
  range,
  filter((n: number) => n % 2 === 0),
  map((n: number) => n * n),
  toArray
)(0, 10);
// [0, 4, 16, 36, 64]

// Find multiples of 3
const multiplesOf3 = pipe(
  range,
  filter((n: number) => n % 3 === 0),
  toArray
)(1, 20);
// [3, 6, 9, 12, 15, 18]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Performance Considerations
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">range</code> is lazy and memory-efficient:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>Lazy evaluation:</strong> Numbers are generated on-demand as you iterate</li>
      <li><strong>Zero memory overhead:</strong> Doesn't create an array in memory</li>
      <li><strong>Early termination:</strong> Combine with <code class="text-sm">take</code> to stop generating early</li>
      <li><strong>Infinite ranges:</strong> Can use <code class="text-sm">Infinity</code> as end with <code class="text-sm">take</code> for controlled generation</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, take, toArray } from 'fp-pack/stream';

// Efficient: Only generates 5 numbers, not 1 million
const first5 = pipe(
  range,
  take(5),
  toArray
)(0, 1000000);
// [0, 1, 2, 3, 4]

// Compare with array approach (creates entire array in memory)
// ❌ Inefficient: Creates array of 1 million numbers
const inefficient = Array.from({ length: 1000000 }, (_, i) => i).slice(0, 5);

// ✅ Efficient: Only generates what's needed
const efficient = pipe(range, take(5), toArray)(0, 1000000);`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">💡 Performance Tip</span>
        <br />
        <br />
        When you need a sequence of numbers, prefer <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">range</code> over{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">Array.from</code> or spreading.
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">range</code> generates values lazily,
        while array methods create the entire sequence in memory upfront.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">range</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/range.ts"
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
        href="/stream/take"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/take');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          take →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Lazily take the first n values from a stream.
        </p>
      </a>

      <a
        href="/stream/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Transform each value lazily.
        </p>
      </a>

      <a
        href="/stream/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Filter values lazily based on a predicate.
        </p>
      </a>

      <a
        href="/stream/flatMap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          flatMap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Map values and flatten one level lazily.
        </p>
      </a>
    </div>
  </div>
);
