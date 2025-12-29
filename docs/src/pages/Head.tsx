import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Head = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      head
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Get the first element of an array
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is head?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        head
      </strong>{' '}
      returns the first element of an array. If the array is empty, it returns
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">undefined</code>.
      This is a simple way to safely peek at the start of a list without mutating it.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { head } from 'fp-kit';

head([1, 2, 3]);
// 1

head([]);
// undefined`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function head<T>(arr: T[]): T | undefined;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Peek at the First Item
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { head } from 'fp-kit';

const users = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Grace' },
];

const firstUser = head(users);
// { id: 1, name: 'Ada' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Safe Access
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { head } from 'fp-kit';

const tokens: string[] = [];
const token = head(tokens) ?? 'anonymous';
// 'anonymous'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/tail"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/tail');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          tail →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Get all elements except the first.
        </p>
      </a>

      <a
        href="/array/take"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/take');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          take →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Take the first n elements from a list.
        </p>
      </a>
    </div>
  </div>
);
