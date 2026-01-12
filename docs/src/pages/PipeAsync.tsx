import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeAsync = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsync
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Compose async (or mixed) functions left-to-right with value-first or functions-first calls
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is pipeAsync?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsync
      </strong>{' '}
      takes async/sync functions and runs each step in order, awaiting promises as needed. Prefer value-first for
      immediate execution and stronger inference: <code>pipeAsync(value, fn1, fn2, ...)</code>. Use functions-first
      only when you need a reusable pipeline.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-pack';

const result = await pipeAsync(
  2,
  async (n: number) => n + 1,
  async (n) => n * 2
); // 6`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-6">
      Need stricter mismatch detection? Use{' '}
      <a
        href="/async/pipeAsyncStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncStrict');
        }}
        class="font-semibold text-blue-700 dark:text-blue-300"
      >
        pipeAsyncStrict
      </a>
      .
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Mix sync and async
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-pack';

const fetchUser = async (id: string) => ({ id, name: 'Ada' });
const getName = (u: { name: string }) => u.name;

const result = await pipeAsync('42', fetchUser, getName); // 'Ada'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Choosing Your Pipe: Flexibility vs. Strictness
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack offers two variants of async pipes to let you choose between type inference
      flexibility and strict type safety.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipeAsync (The Flexible Default)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Goal:</strong> Best-in-class type inference for async operations.
          </li>
          <li>
            <strong>Pro:</strong> Excellent at inferring the final output type of complex,
            generic pipelines with minimal need for manual type annotations. It prioritizes a
            smooth developer experience (DX).
          </li>
          <li>
            <strong>Con:</strong> To achieve this, it is more lenient and may not catch all type
            mismatches between functions, which could lead to runtime errors.
          </li>
        </ul>
      </div>
      <div class="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-emerald-900 dark:text-emerald-100 mb-2">
          pipeAsyncStrict (The Safe Alternative)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Goal:</strong> Maximum type safety in async pipelines.
          </li>
          <li>
            <strong>Pro:</strong> Immediately catches type mismatches between each function in the
            pipeline, preventing a class of bugs at compile time.
          </li>
          <li>
            <strong>Con:</strong> In some advanced generic scenarios, this strictness can get in
            the way of type inference, requiring you to add more explicit type hints.
          </li>
        </ul>
      </div>
    </div>

    <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-yellow-800 dark:text-yellow-200 leading-relaxed">
        <span class="font-medium">💡 Recommendation:</span>
        <br />
        <br />
        Start with <strong>pipeAsync</strong> for its great DX. If you are working on a critical part
        of your application where type safety is paramount, or if you find{' '}
        <strong>pipeAsync</strong> is too lenient, switch to{' '}
        <a
          href="/async/pipeAsyncStrict"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/async/pipeAsyncStrict');
          }}
          class="font-semibold text-emerald-700 dark:text-emerald-300"
        >
          pipeAsyncStrict
        </a>
        .
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect Pipelines
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>pipeAsync</strong> focuses on pure async composition. If you need early exits via{' '}
      <strong class="font-semibold">SideEffect</strong>, use <strong>pipeAsyncSideEffect</strong>. For strict unions, use{' '}
      <a
        href="/async/pipeAsyncSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffectStrict');
        }}
        class="font-semibold text-blue-700 dark:text-blue-300"
      >
        pipeAsyncSideEffectStrict
      </a>
      .
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">pipeAsync</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/pipeAsync.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View on GitHub
    </a>
  </div>
);
