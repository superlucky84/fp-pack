import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Retry = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      retry
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Retry a failing async operation with optional delays between attempts
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is retry?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        retry
      </strong>{' '}
      executes an async function and automatically retries it if it fails (throws an error). After the maximum number of retries is exhausted, it throws the last error encountered.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      This is essential for handling transient failures in network requests, database operations, or any async operation that might temporarily fail but could succeed on retry. You can optionally specify a delay between retry attempts.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function retry<T>(
  times: number,                    // Maximum number of retry attempts
  fn: () => Promise<T>,             // Async function to retry
  delayMs?: number                  // Optional delay between attempts (ms)
): Promise<T>`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. Simple Retry
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

// Retry up to 3 times
const data = await retry(3, async () => {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.json();
});

// If all 3 attempts fail, the last error is thrown`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. Retry with Delay
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

// Retry up to 5 times with 1 second delay between attempts
const result = await retry(
  5,
  async () => {
    const res = await fetch('/api/unstable-endpoint');
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
  1000  // 1 second delay between retries
);

// Timeline:
// Attempt 1: Fails → wait 1s
// Attempt 2: Fails → wait 1s
// Attempt 3: Succeeds → return result`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. Resilient API Calls
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Handle temporary network failures automatically:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function fetchUserData(userId: string) {
  return retry(
    3,  // Try 3 times
    async () => {
      const response = await fetch(\`/api/users/\${userId}\`);

      if (!response.ok) {
        throw new Error(\`Failed to fetch user: \${response.statusText}\`);
      }

      return response.json();
    },
    500  // Wait 500ms between retries
  );
}

// Usage
try {
  const user = await fetchUserData('user-123');
  console.log('User:', user);
} catch (error) {
  console.error('Failed after 3 retries:', error);
}

// Handles temporary network glitches gracefully`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. Database Connection with Retry
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function connectToDatabase(config: DbConfig) {
  return retry(
    5,  // Try 5 times
    async () => {
      console.log('Attempting database connection...');
      const connection = await db.connect(config);

      // Test the connection
      await connection.ping();

      return connection;
    },
    2000  // Wait 2 seconds between attempts
  );
}

// Usage
const db = await connectToDatabase({
  host: 'localhost',
  port: 5432,
  database: 'myapp'
});

// Retries automatically if database is temporarily unavailable`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      3. File Upload with Retry
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function uploadFile(file: File): Promise<string> {
  return retry(
    3,
    async () => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(\`Upload failed: \${response.status}\`);
      }

      const { url } = await response.json();
      return url;
    },
    1000
  );
}

// Usage
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

try {
  const uploadedUrl = await uploadFile(file);
  console.log('File uploaded:', uploadedUrl);
} catch (error) {
  alert('Upload failed after 3 attempts. Please try again.');
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      4. External Service Integration
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function sendToSlack(message: string): Promise<void> {
  return retry(
    4,  // Slack can be flaky, retry 4 times
    async () => {
      const response = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
      });

      if (!response.ok) {
        throw new Error(\`Slack API error: \${response.status}\`);
      }
    },
    3000  // Wait 3 seconds between retries
  );
}

// Usage
await sendToSlack('Deployment completed successfully! 🎉');

// Ensures message is delivered even if Slack has temporary issues`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      5. Retry with Custom Error Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

class RetryableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RetryableError';
  }
}

async function processPayment(amount: number): Promise<string> {
  let attemptCount = 0;

  return retry(
    3,
    async () => {
      attemptCount++;
      console.log(\`Payment attempt \${attemptCount}/3\`);

      try {
        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount })
        });

        const result = await response.json();

        // Only retry on specific errors
        if (result.error === 'TEMPORARY_FAILURE') {
          throw new RetryableError('Payment gateway temporarily unavailable');
        }

        // Don't retry on permanent errors
        if (result.error === 'INSUFFICIENT_FUNDS') {
          throw new Error('Insufficient funds - not retrying');
        }

        if (!result.success) {
          throw new RetryableError('Payment failed');
        }

        return result.transactionId;
      } catch (error) {
        // Re-throw to trigger retry
        throw error;
      }
    },
    2000
  );
}

// Usage
try {
  const txId = await processPayment(99.99);
  console.log('Payment successful:', txId);
} catch (error) {
  if (error.message.includes('not retrying')) {
    console.error('Permanent error:', error);
  } else {
    console.error('Failed after retries:', error);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      6. Polling Until Success
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function waitForJobToComplete(jobId: string): Promise<Job> {
  return retry(
    20,  // Poll up to 20 times
    async () => {
      const response = await fetch(\`/api/jobs/\${jobId}\`);
      const job = await response.json();

      if (job.status === 'pending' || job.status === 'running') {
        // Still processing - throw to retry
        throw new Error('Job not complete yet');
      }

      if (job.status === 'failed') {
        // Permanent failure - will exhaust retries
        throw new Error(\`Job failed: \${job.error}\`);
      }

      // Success!
      return job;
    },
    3000  // Check every 3 seconds
  );
}

// Usage
const job = await waitForJobToComplete('job-abc123');
console.log('Job result:', job.result);

// Polls every 3 seconds, up to 20 times (60 seconds total)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      7. Combining with Timeout
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

// Create a timeout wrapper
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

async function fetchWithRetryAndTimeout(url: string) {
  return retry(
    3,
    async () => {
      // Each attempt has 5 second timeout
      return withTimeout(
        fetch(url).then(r => r.json()),
        5000
      );
    },
    1000  // Wait 1 second between retries
  );
}

// Usage
try {
  const data = await fetchWithRetryAndTimeout('/api/slow-endpoint');
  console.log('Data:', data);
} catch (error) {
  if (error.message === 'Timeout') {
    console.error('Request timed out after 3 attempts');
  } else {
    console.error('Request failed:', error);
  }
}

// Each attempt: max 5s
// With retries: 3 attempts × 5s + 2s delay = ~17s total`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use retry?
    </h2>

    <div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        1. Resilience Against Transient Failures
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200">
        Automatically handles temporary network issues, server hiccups, and other transient failures that are common in distributed systems. Makes your application more robust without manual retry logic.
      </p>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
        2. Simple API
      </h3>
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200">
        Clean, declarative syntax that's easy to understand. Just specify how many retries and optional delay - no need to write complex retry loops or error handling logic.
      </p>
    </div>

    <div class="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
        3. Configurable Delays
      </h3>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200">
        Optional delay between retries prevents overwhelming a struggling service. Gives the remote system time to recover before the next attempt.
      </p>
    </div>

    <div class="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
        4. Predictable Error Handling
      </h3>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        After all retries are exhausted, throws the last error - making it easy to catch and handle failures in a consistent way. You always know what to expect.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Here's a simplified version of how <strong>retry</strong> works:
    </p>

    <CodeBlock
      language="typescript"
      code={`async function retry<T>(
  times: number,
  fn: () => Promise<T>,
  delayMs?: number
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < times; attempt++) {
    try {
      // Try to execute the function
      return await fn();
    } catch (error) {
      // Save the error
      lastError = error as Error;

      // If this was the last attempt, give up
      if (attempt === times - 1) {
        throw lastError;
      }

      // Wait before retrying (if delay is specified)
      if (delayMs && delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  // This line is never reached, but TypeScript needs it
  throw lastError!;
}`}
    />

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 my-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        How it works:
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong>Loop Through Attempts:</strong> Tries the function up to <code>times</code> times
        </li>
        <li>
          <strong>Execute Function:</strong> On each attempt, calls the provided async function
        </li>
        <li>
          <strong>Success Case:</strong> If the function succeeds, returns the result immediately
        </li>
        <li>
          <strong>Failure Case:</strong> If the function throws, catches the error and saves it
        </li>
        <li>
          <strong>Retry Logic:</strong> If not the last attempt, waits for <code>delayMs</code> (if specified) then retries
        </li>
        <li>
          <strong>Final Failure:</strong> If all attempts fail, throws the last error encountered
        </li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">retry</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/retry.ts"
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
        href="/async/delay"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/delay');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          delay →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Create a promise that resolves after a specified time
        </p>
      </a>

      <a
        href="/control/tryCatch"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/tryCatch');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          tryCatch →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Handle errors safely with fallback values
        </p>
      </a>

      <a
        href="/composition/pipeAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          pipeAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Compose async functions from left to right
        </p>
      </a>

      <a
        href="/async/debounce"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/debounce');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          debounce →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Delay execution until calls stop for a specified time
        </p>
      </a>
    </div>
  </div>
);
