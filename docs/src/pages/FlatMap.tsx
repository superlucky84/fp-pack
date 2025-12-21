import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const FlatMap = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flatMap
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Map each element to an array and flatten one level
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is flatMap?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flatMap
      </strong>{' '}
      combines <strong>map</strong> and <strong>flatten</strong> in one pass: it transforms
      each element to an array and then concatenates the results.
      <br />
      <br />
      Use it for <strong>expanding items</strong>, <strong>building lists</strong>, and{' '}
      <strong>one-to-many transformations</strong>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-kit';

flatMap((n: number) => [n, n * 2], [1, 2, 3]);
// [1, 2, 2, 4, 3, 6]

flatMap((s: string) => s.split(''), ['ab', 'cd']);
// ['a', 'b', 'c', 'd']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function flatMap<T, R>(fn: (value: T) => R[], arr: T[]): R[];`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Expand Nested Lists
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-kit';

interface Order {
  id: string;
  items: string[];
}

const orders: Order[] = [
  { id: 'o1', items: ['apple', 'banana'] },
  { id: 'o2', items: ['orange'] },
];

const allItems = flatMap((o: Order) => o.items, orders);
// ['apple', 'banana', 'orange']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Generate Pairs
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-kit';

const letters = ['a', 'b'];
const numbers = [1, 2, 3];

const pairs = flatMap(
  (l: string) => numbers.map(n => [l, n] as const),
  letters
);
// [['a', 1], ['a', 2], ['a', 3], ['b', 1], ['b', 2], ['b', 3]]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/groupBy"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/groupBy');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          groupBy →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Group elements by a key function.
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
          Compose flatMap with other transformations.
        </p>
      </a>
    </div>
  </div>
);

