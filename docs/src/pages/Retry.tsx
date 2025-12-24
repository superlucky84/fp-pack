import { CodeBlock } from '@/components/CodeBlock';

export const Retry = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      retry
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Retry an async function up to a limit (non-curried)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is retry?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        retry
      </strong>{' '}
      runs an async function, retrying up to <code>times</code> on failure, then rethrows. Signature:{' '}
      <code>retry(times, fn, delayMs?)</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-kit';

await retry(3, async () => {
  const res = await fetch('/api');
  if (!res.ok) throw new Error('fail');
  return res.json();
}, 200); // waits 200ms between attempts`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Combining with timeout
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry, timeout } from 'fp-kit';

const fetchSafe = () =>
  retry(2, () => timeout(500, fetch('/api/data')), 100);

await fetchSafe();`}
    />
  </div>
);
