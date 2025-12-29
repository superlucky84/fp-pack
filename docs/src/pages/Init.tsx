import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Init = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      init
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Return all elements except the last
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is init?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/20 px-2 py-1 rounded">
        init
      </strong>{' '}
      returns a new array without the last element. If the array has 0 or 1 element,
      it returns an empty array. This pairs naturally with
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">last</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { init } from 'fp-kit';

init([1, 2, 3]);
// [1, 2]

init([1]);
// []`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function init<T>(arr: T[]): T[];`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Remove Trailing Summary
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { init } from 'fp-kit';

const rows = ['A', 'B', 'Total'];
const dataRows = init(rows);
// ['A', 'B']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Split Last Item
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { init, last } from 'fp-kit';

const queue = ['job-1', 'job-2', 'job-3'];
const pending = init(queue);
const current = last(queue);
// pending: ['job-1', 'job-2']
// current: 'job-3'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/last"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/last');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          last →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Get the last element of an array.
        </p>
      </a>

      <a
        href="/array/drop"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/drop');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          drop →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Remove the first n elements from an array.
        </p>
      </a>
    </div>
  </div>
);
