import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const GroupBy = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      groupBy
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Group array elements by a key function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is groupBy?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        groupBy
      </strong>{' '}
      transforms an array into an object where each key is derived from the provided function
      and each value is an array of matching items.
      <br />
      <br />
      It’s useful for <strong>categorization</strong>, <strong>reporting</strong>,{' '}
      <strong>indexing</strong>, and <strong>UI sections</strong>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { groupBy } from 'fp-kit';

groupBy((n: number) => (n % 2 === 0 ? 'even' : 'odd'), [1, 2, 3, 4]);
// { odd: [1, 3], even: [2, 4] }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function groupBy<T>(fn: (value: T) => string, arr: T[]): Record<string, T[]>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Keys are strings. If multiple items produce the same key, they are collected into the same group.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Group Users by Role
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { groupBy } from 'fp-kit';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'member';
}

const users: User[] = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'member' },
  { id: 3, name: 'Charlie', role: 'member' },
];

const byRole = groupBy((u: User) => u.role, users);
// { admin: [{...}], member: [{...}, {...}] }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Build Sections for UI
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { groupBy } from 'fp-kit';

interface Message {
  id: string;
  date: string; // 'YYYY-MM-DD'
  text: string;
}

const messages: Message[] = [
  { id: 'm1', date: '2025-01-01', text: 'Happy new year!' },
  { id: 'm2', date: '2025-01-01', text: '🎉' },
  { id: 'm3', date: '2025-01-02', text: 'Back to work' },
];

const byDate = groupBy((m: Message) => m.date, messages);
// Render sections by date keys`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/chunk"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/chunk');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          chunk →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Split arrays into fixed-size chunks for paging or batching.
        </p>
      </a>

      <a
        href="/array/flatMap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/flatMap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          flatMap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          One-to-many transformations by mapping and flattening.
        </p>
      </a>
    </div>
  </div>
);

