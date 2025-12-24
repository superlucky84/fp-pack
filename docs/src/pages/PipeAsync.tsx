import { CodeBlock } from '@/components/CodeBlock';

export const PipeAsync = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsync
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Compose async (or mixed) functions left-to-right, returning a function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is pipeAsync?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsync
      </strong>{' '}
      takes async/sync functions and returns a new function. Calling it runs each step in order, awaiting promises as
      needed. Signature: <code>pipeAsync(fn1, fn2, ...)(value)</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-kit';

const fn = pipeAsync(
  async (n: number) => n + 1,
  async (n) => n * 2
);

const result = await fn(2); // 6`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Mix sync and async
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-kit';

const fetchUser = async (id: string) => ({ id, name: 'Ada' });
const getName = (u: { name: string }) => u.name;

const getUserName = pipeAsync(fetchUser, getName);

await getUserName('42'); // 'Ada'`}
    />
  </div>
);
