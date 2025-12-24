import { CodeBlock } from '@/components/CodeBlock';

export const Delay = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      delay
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create a Promise that resolves after a given time (non-curried)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is delay?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        delay
      </strong>{' '}
      returns a Promise that resolves after the specified milliseconds. Call it as <code>delay(ms)</code> and
      <code>await</code> it.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-kit';

await delay(500); // waits 500ms
console.log('done');`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Throttle sequences
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-kit';

for (const id of [1, 2, 3]) {
  await delay(100);
  await fetchData(id);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With async pipelines
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-kit';

const fn = pipeAsync(
  async (v: number) => v + 1,
  async v => {
    await delay(200);
    return v * 2;
  }
);

fn(3); // resolves after ~200ms to 8`}
    />
  </div>
);
