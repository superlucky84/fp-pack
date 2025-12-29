import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFlattenDeep = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/flattenDeep
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Lazily flatten nested iterables of any depth
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is stream/flattenDeep?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        flattenDeep
      </strong>{' '}
      recursively flattens nested iterables into a single lazy stream. It is useful
      when the nesting depth is not known ahead of time.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flattenDeep, toArray } from 'fp-kit/stream';

const input = [1, [2, [3, 4], 5], [[6]]];
const result = await toArray(flattenDeep(input));
// [1, 2, 3, 4, 5, 6]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function flattenDeep<T>(iterable: Iterable<unknown>): IterableIterator<T>;
function flattenDeep<T>(iterable: AnyIterableInput<PromiseLikeValue<unknown>>): AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Combine Nested Tags
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flattenDeep, toArray } from 'fp-kit/stream';

const tags = [['frontend', ['ui']], ['design'], [['docs']]];
const flatTags = await toArray(flattenDeep(tags));
// ['frontend', 'ui', 'design', 'docs']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Process Async Inputs
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flattenDeep, toArray } from 'fp-kit/stream';

const nested = Promise.resolve([1, [2, [3]], [[4]]]);
const result = await toArray(flattenDeep(nested));
// [1, 2, 3, 4]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/stream/flatten"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatten');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          flatten →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Flatten a single level of nesting.
        </p>
      </a>

      <a
        href="/stream/flatMap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          flatMap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Map values and flatten one level lazily.
        </p>
      </a>
    </div>
  </div>
);
