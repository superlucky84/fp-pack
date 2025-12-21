import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Filter = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      filter
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Keep only the elements that match a predicate
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is filter?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        filter
      </strong>{' '}
      creates a new array containing only the elements that satisfy the predicate function.
      It does not mutate the original array.
      <br />
      <br />
      Use it for <strong>search</strong>, <strong>validation</strong>,{' '}
      <strong>removing falsy/invalid entries</strong>, and{' '}
      <strong>building derived views of data</strong>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6];

filter((n: number) => n % 2 === 0, numbers);
// [2, 4, 6]

filter((n: number) => n > 3, numbers);
// [4, 5, 6]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function filter<T>(predicate: (value: T) => boolean, arr: T[]): T[];

// predicate: keep when true
// arr: input array
// returns: filtered array`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Remove Nullable Values
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-kit';

const values: Array<number | null | undefined> = [1, null, 2, undefined, 3];

const isNumber = (v: number | null | undefined): v is number => typeof v === 'number';

filter(isNumber, values);
// [1, 2, 3]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Filter by Field
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-kit';

interface User {
  id: number;
  name: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', active: true },
  { id: 2, name: 'Bob', active: false },
  { id: 3, name: 'Charlie', active: true },
];

const activeUsers = filter((u: User) => u.active, users);
// [{ id: 1, ... }, { id: 3, ... }]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/find"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/find');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          find →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Get the first element that matches a predicate.
        </p>
      </a>

      <a
        href="/array/every"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/every');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          every →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Check if all elements satisfy a predicate.
        </p>
      </a>
    </div>
  </div>
);

