import { CodeBlock } from '@/components/CodeBlock';

export const Replace = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      replace
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Replace occurrences in a string (non-curried)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is replace?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        replace
      </strong>{' '}
      wraps <code>String.prototype.replace</code> with a data-last, non-curried call: <code>replace(pattern, replacement, str)</code>.
      Supports both string and RegExp patterns. Use a global regex to replace all occurrences.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

replace('foo', 'bar', 'foo foo');       // 'bar foo' (first only)
replace(/foo/g, 'bar', 'foo foo');      // 'bar bar' (global)
replace(/a./g, 'x', 'abcdab');          // 'xcdx'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple substitutions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

replace('http:', 'https:', 'http://example.com'); // 'https://example.com'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pattern-based
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

const snakeToDash = (input: string) => replace(/_/g, '-', input);

snakeToDash('hello_world'); // 'hello-world'`}
    />
  </div>
);
