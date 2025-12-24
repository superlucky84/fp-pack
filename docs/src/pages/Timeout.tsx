import { CodeBlock } from '@/components/CodeBlock';

export const Timeout = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      timeout
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Wrap a promise with a timeout; reject if it takes too long
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is timeout?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        timeout
      </strong>{' '}
      rejects with an error if the given promise doesn&apos;t settle within the specified milliseconds. Signature:{' '}
      <code>timeout(ms, promise)</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { timeout } from 'fp-kit';

await timeout(100, fetch('/api/data')); // resolves or rejects within 100ms
// rejects with Error("Timed out after 100ms") if exceeded`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Guard slow operations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { timeout } from 'fp-kit';

const fetchWithTimeout = (url: string) => timeout(5000, fetch(url));

await fetchWithTimeout('https://example.com');`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Combine with retries
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { timeout, retry } from 'fp-kit';

const run = retry(3, () => timeout(200, doWork()));
await run();`}
    />
  </div>
);
