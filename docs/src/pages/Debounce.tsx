import { CodeBlock } from '@/components/CodeBlock';

export const Debounce = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      debounce
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Run only the last call after a quiet period
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is debounce?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        debounce
      </strong>{' '}
      delays execution until the calls stop for the given time window. Only the last call is executed.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-kit';

const save = debounce((value: string) => {
  console.log('saving', value);
}, 300);

save('a');
save('ab');
save('abc');
// after 300ms, logs: saving abc`}
    />
  </div>
);
