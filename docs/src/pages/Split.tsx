import { CodeBlock } from '@/components/CodeBlock';

export const Split = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      split
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Split a string by a separator (non-curried)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is split?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        split
      </strong>{' '}
      wraps <code>String.prototype.split</code> as a data-last, non-curried helper: <code>split(separator, str)</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { split } from 'fp-kit';

split(',', 'a,b,c'); // ['a', 'b', 'c']
split('/', 'foo/bar'); // ['foo', 'bar']
split(',', 'abc'); // ['abc']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Paths and tokens
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { split } from 'fp-kit';

const segments = split('/', '/api/v1/users');
// ['', 'api', 'v1', 'users']`}
    />
  </div>
);
