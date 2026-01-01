import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Delay = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      delay
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create a promise that resolves after a specified time
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is delay?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        delay
      </strong>{' '}
      creates a promise that resolves after a specified number of milliseconds. It's the async equivalent of <code>setTimeout</code>, designed to work seamlessly with <code>async/await</code> syntax.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Unlike <code>setTimeout</code> which requires callbacks, <code>delay</code> returns a promise that you can await, making it perfect for creating pauses in async workflows, rate limiting, polling with intervals, and implementing backoff strategies.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function delay(ms: number): Promise<void>`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. Simple Delay
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function example() {
  console.log('Start');
  await delay(1000); // Wait 1 second
  console.log('After 1 second');
}

// Output:
// "Start"
// ... 1 second pause ...
// "After 1 second"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. Rate Limiting API Calls
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function fetchMultiplePages(pageIds: number[]) {
  const results = [];

  for (const pageId of pageIds) {
    const data = await fetch(\`/api/page/\${pageId}\`);
    results.push(data);

    // Wait 100ms between requests to avoid rate limiting
    await delay(100);
  }

  return results;
}

// Fetches pages with 100ms gap between each request`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. Polling with Intervals
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Poll a resource until a condition is met:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function waitForJobCompletion(jobId: string): Promise<Job> {
  const maxAttempts = 30;
  const pollInterval = 2000; // 2 seconds

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const job = await fetchJob(jobId);

    if (job.status === 'completed') {
      return job;
    }

    if (job.status === 'failed') {
      throw new Error(\`Job \${jobId} failed\`);
    }

    // Wait before next poll
    await delay(pollInterval);
  }

  throw new Error(\`Job \${jobId} timed out after \${maxAttempts} attempts\`);
}

// Usage
const job = await waitForJobCompletion('job-123');
console.log('Job completed:', job.result);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. Animation Sequencing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function animateSequence(element: HTMLElement) {
  // Fade in
  element.style.opacity = '0';
  element.style.transition = 'opacity 0.3s';
  await delay(10); // Let CSS apply
  element.style.opacity = '1';

  await delay(300); // Wait for fade in

  // Scale up
  element.style.transform = 'scale(1.1)';
  await delay(200);

  // Scale back
  element.style.transform = 'scale(1)';
  await delay(200);

  console.log('Animation complete');
}

// Smooth, sequential animation with delays`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      3. Retry with Exponential Backoff
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function fetchWithBackoff<T>(
  fetchFn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Exponential backoff: 1s, 2s, 4s, 8s...
      const backoffTime = Math.pow(2, attempt) * 1000;
      console.log(\`Retry \${attempt + 1} after \${backoffTime}ms\`);
      await delay(backoffTime);
    }
  }

  throw lastError!;
}

// Usage
const data = await fetchWithBackoff(() => fetch('/api/data').then(r => r.json()));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      4. Simulating Loading States
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function loadDataWithMinimumLoadingTime<T>(
  fetchFn: () => Promise<T>,
  minLoadingMs: number = 500
): Promise<T> {
  const startTime = Date.now();

  // Fetch data
  const data = await fetchFn();

  // Calculate remaining time to reach minimum
  const elapsed = Date.now() - startTime;
  const remaining = minLoadingMs - elapsed;

  // If too fast, delay to show loading indicator
  if (remaining > 0) {
    await delay(remaining);
  }

  return data;
}

// Ensures loading spinner shows for at least 500ms
// Prevents jarring flashes for fast responses
const user = await loadDataWithMinimumLoadingTime(() => fetchUser(userId));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      5. Typing Effect
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function typewriterEffect(
  element: HTMLElement,
  text: string,
  delayPerChar: number = 50
): Promise<void> {
  element.textContent = '';

  for (const char of text) {
    element.textContent += char;
    await delay(delayPerChar);
  }
}

// Usage
const messageEl = document.querySelector('#message')!;
await typewriterEffect(messageEl, 'Hello, World!', 100);
// Characters appear one by one with 100ms delay`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      6. Batch Processing with Delays
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function processBatch<T, R>(
  items: T[],
  batchSize: number,
  batchDelayMs: number,
  processor: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    // Process batch in parallel
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );

    results.push(...batchResults);

    // Delay between batches (except after last batch)
    if (i + batchSize < items.length) {
      await delay(batchDelayMs);
    }
  }

  return results;
}

// Process 100 items in batches of 10, with 1s delay between batches
const userIds = Array.from({ length: 100 }, (_, i) => i + 1);
const users = await processBatch(
  userIds,
  10,
  1000,
  async (id) => fetchUser(id)
);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      7. Debounced Save
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

class AutoSaver {
  private saveTimeout: ReturnType<typeof setTimeout> | null = null;
  private pendingSave: Promise<void> | null = null;

  async scheduleSave(data: any, delayMs: number = 1000): Promise<void> {
    // Cancel previous scheduled save
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    // Wait for any pending save to complete
    if (this.pendingSave) {
      await this.pendingSave;
    }

    // Schedule new save
    this.pendingSave = delay(delayMs).then(() => {
      return this.save(data);
    });

    return this.pendingSave;
  }

  private async save(data: any): Promise<void> {
    console.log('Saving:', data);
    await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

const saver = new AutoSaver();
saver.scheduleSave({ title: 'Draft 1' }); // Will be cancelled
saver.scheduleSave({ title: 'Draft 2' }); // Will be cancelled
saver.scheduleSave({ title: 'Draft 3' }); // Will save after 1s`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use delay?
    </h2>

    <div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        1. Promise-Based API
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200">
        Works seamlessly with async/await syntax, eliminating callback hell and making async code read like synchronous code. Much cleaner than wrapping setTimeout in a promise manually.
      </p>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
        2. Composable
      </h3>
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200">
        Easily combine with other async operations using await, Promise.all, Promise.race, or async pipelines. Perfect for building complex async workflows with clear control flow.
      </p>
    </div>

    <div class="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
        3. Rate Limiting & Backoff
      </h3>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200">
        Essential for implementing rate limiting, exponential backoff, polling intervals, and other timing-based patterns. Helps prevent overwhelming APIs and improves reliability of async operations.
      </p>
    </div>

    <div class="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
        4. Simple & Readable
      </h3>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        One function call that does exactly what it says. No configuration, no hidden behavior. The simplicity makes code easier to understand and maintain.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Here's how <strong>delay</strong> works internally:
    </p>

    <CodeBlock
      language="typescript"
      code={`function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

// Simple wrapper around setTimeout that returns a promise
// When the timer expires, the promise resolves`}
    />

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 my-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        How it works:
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong>Promise Creation:</strong> Creates a new promise that wraps setTimeout
        </li>
        <li>
          <strong>Timer Setup:</strong> setTimeout schedules the resolve callback to run after ms milliseconds
        </li>
        <li>
          <strong>Non-blocking:</strong> Returns immediately, allowing other code to run
        </li>
        <li>
          <strong>Resolution:</strong> After the specified time, the promise resolves with void
        </li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">delay</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/delay.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View on GitHub
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/async/retry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/retry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          retry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Retry async operations with optional delay between attempts
        </p>
      </a>

      <a
        href="/async/debounce"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/debounce');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          debounce →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Delay execution until calls stop for a specified time
        </p>
      </a>

      <a
        href="/async/throttle"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/throttle');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          throttle →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Limit execution frequency to at most once per time period
        </p>
      </a>

      <a
        href="/composition/pipeAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          pipeAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Compose async functions from left to right
        </p>
      </a>
    </div>
  </div>
);
