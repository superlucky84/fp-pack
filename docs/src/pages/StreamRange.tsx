import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamRange = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/range
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily generate a numeric range (end excluded)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream/range?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded">
        range
      </strong>{' '}
      creates a lazy iterable of numbers from <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">start</code>
      up to but excluding <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">end</code>.
      It supports descending ranges when start is greater than end.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { range } from 'fp-kit/stream';

Array.from(range(0, 5));
// [0, 1, 2, 3, 4]

Array.from(range(5, 0));
// [5, 4, 3, 2, 1]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function range(start: number, end: number): IterableIterator<number>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Lazy Pagination
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { range, take } from 'fp-kit/stream';

const pages = take(3, range(1, 999));
Array.from(pages);
// [1, 2, 3]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pair with map
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { range, map, toArray } from 'fp-kit/stream';

const labels = map((n: number) => '#' + n, range(1, 4));
await toArray(labels);
// ['#1', '#2', '#3']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
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
          Lazily take the first n values.
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
          Transform values in a lazy stream.
        </p>
      </a>
    </div>
  </div>
);
