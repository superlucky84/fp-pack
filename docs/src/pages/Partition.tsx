import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Partition = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      partition
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Split an array into two groups by a predicate
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is partition?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/20 px-2 py-1 rounded">
        partition
      </strong>{' '}
      splits an array into two arrays: items that satisfy the predicate and items that do not.
      It returns a tuple of <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">[pass, fail]</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { partition } from 'fp-kit';

const [even, odd] = partition((n: number) => n % 2 === 0, [1, 2, 3, 4]);
// even: [2, 4]
// odd: [1, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function partition<T>(predicate: (value: T) => boolean, arr: T[]): [T[], T[]];`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Split by Status
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partition } from 'fp-kit';

const tasks = [
  { title: 'Ship docs', done: true },
  { title: 'Fix tests', done: false },
  { title: 'Release', done: true },
];

const [done, pending] = partition(task => task.done, tasks);
// done: [{...}, {...}]
// pending: [{...}]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Validate Inputs
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partition } from 'fp-kit';

const inputs = ['42', '3.14', 'oops'];
const [valid, invalid] = partition(value => !Number.isNaN(Number(value)), inputs);
// valid: ['42', '3.14']
// invalid: ['oops']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

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
          Keep only items that satisfy a predicate.
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
          Group items by a key function.
        </p>
      </a>
    </div>
  </div>
);
