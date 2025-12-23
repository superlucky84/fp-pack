import { CodeBlock } from '@/components/CodeBlock';

export const ToLower = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      toLower
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Convert a string to lowercase
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is toLower?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        toLower
      </strong>{' '}
      returns a lowercase version of the input string. Useful for normalization, case-insensitive comparisons,
      and search indexing.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { toLower } from 'fp-kit';

toLower('Hello');   // 'hello'
toLower('FP-KIT');  // 'fp-kit'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Normalize user input
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { toLower } from 'fp-kit';

const emails = ['Alice@Example.com', 'BOB@EXAMPLE.COM'];
const normalized = emails.map(toLower);
// ['alice@example.com', 'bob@example.com']`}
    />
  </div>
);
