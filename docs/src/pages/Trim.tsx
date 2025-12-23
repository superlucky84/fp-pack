import { CodeBlock } from '@/components/CodeBlock';

export const Trim = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      trim
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Remove whitespace from both ends of a string
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is trim?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        trim
      </strong>{' '}
      removes whitespace from the start and end of a string. Useful for user input cleanup, parsing,
      and normalization.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { trim } from 'fp-kit';

trim('  hello  '); // 'hello'
trim('\\n\\tvalue\\t'); // 'value'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Clean form input
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trim } from 'fp-kit';

const raw = '  Alice ';
const normalized = trim(raw);
// 'Alice'`}
    />
  </div>
);
