import { CodeBlock } from '@/components/CodeBlock';

export const Match = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      match
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Run a RegExp match against a string (non-curried)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is match?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        match
      </strong>{' '}
      executes <code>RegExp</code> matching on a string and returns the same result as <code>String.prototype.match</code>.
      Call it as <code>match(pattern, str)</code> and it returns an array of matches or <code>null</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { match } from 'fp-kit';

match(/ba./g, 'banana'); // ['ban']
match(/xyz/, 'banana');  // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Global matches
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { match } from 'fp-kit';

match(/\\d+/g, 'a1b22c333'); // ['1', '22', '333']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Optional matches
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { match } from 'fp-kit';

const res = match(/foo/, 'bar');
if (res) {
  // use res[0]
}`}
    />
  </div>
);
