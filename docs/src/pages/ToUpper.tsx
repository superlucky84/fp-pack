import { CodeBlock } from '@/components/CodeBlock';

export const ToUpper = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      toUpper
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Convert a string to uppercase
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is toUpper?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        toUpper
      </strong>{' '}
      returns an uppercase version of the input string. Useful for normalization, formatting, and case-insensitive
      comparisons.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { toUpper } from 'fp-kit';

toUpper('Hello');   // 'HELLO'
toUpper('fp-kit');  // 'FP-KIT'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Formatting labels
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { toUpper } from 'fp-kit';

const labels = ['draft', 'published', 'archived'];
const display = labels.map(toUpper);
// ['DRAFT', 'PUBLISHED', 'ARCHIVED']`}
    />
  </div>
);
