import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const FlattenDeep = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flattenDeep
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Flatten nested arrays of any depth
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is flattenDeep?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        flattenDeep
      </strong>{' '}
      recursively flattens nested arrays into a single-level array. This is helpful when
      you don't know the nesting depth ahead of time.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flattenDeep } from 'fp-kit';

flattenDeep([1, [2, [3, 4], 5], [[6]]]);
// [1, 2, 3, 4, 5, 6]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function flattenDeep<T>(arr: any[]): T[];`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Merge Tag Lists
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flattenDeep } from 'fp-kit';

const tags = [['frontend', ['ui']], ['design'], [['docs']]];
const flatTags = flattenDeep(tags);
// ['frontend', 'ui', 'design', 'docs']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Normalize Mixed Depth
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flattenDeep } from 'fp-kit';

const inputs = [1, [2, 3], [[4]], [[[5]]]];
const normalized = flattenDeep(inputs);
// [1, 2, 3, 4, 5]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/flatMap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/flatMap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          flatMap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Map and flatten one level in a single step.
        </p>
      </a>

      <a
        href="/array/reduce"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/reduce');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          reduce →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Accumulate values into a single result.
        </p>
      </a>
    </div>
  </div>
);
