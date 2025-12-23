import { CodeBlock } from '@/components/CodeBlock';

export const DebounceLeadingTrailing = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      debounceLeadingTrailing
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Run on the first call and the final call in a burst
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is debounceLeadingTrailing?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        debounceLeadingTrailing
      </strong>{' '}
      executes immediately on the first call and once more at the end of the burst.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-kit';

const sync = debounceLeadingTrailing((value: string) => {
  console.log('sync', value);
}, 300);

sync('a'); // runs immediately
sync('b');
sync('c'); // after 300ms, runs once with 'c'`}
    />
  </div>
);
