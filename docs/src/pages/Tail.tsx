import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Tail = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      tail
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Return all elements except the first
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is tail?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        tail
      </strong>{' '}
      returns a new array without the first element. It is useful for skipping headers,
      consuming lists step by step, or pairing with <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">head</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { tail } from 'fp-kit';

tail([1, 2, 3]);
// [2, 3]

tail([]);
// []`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function tail<T>(arr: T[]): T[];`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Skip a Header Row
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tail } from 'fp-kit';

const rows = [
  ['name', 'age'],
  ['Ada', '36'],
  ['Grace', '42'],
];

const dataRows = tail(rows);
// [['Ada', '36'], ['Grace', '42']]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Consume a List
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { head, tail } from 'fp-kit';

const numbers = [10, 20, 30];
const first = head(numbers);
const rest = tail(numbers);
// first: 10
// rest: [20, 30]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/head"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/head');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          head →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Get the first element of an array.
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
