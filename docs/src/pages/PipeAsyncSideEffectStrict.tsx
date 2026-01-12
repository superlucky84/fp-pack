import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeAsyncSideEffectStrict = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsyncSideEffectStrict
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Strict SideEffect unions for async pipelines
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is pipeAsyncSideEffectStrict?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsyncSideEffectStrict
      </strong>{' '}
      is the async strict variant of <strong>pipeAsyncSideEffect</strong>. It preserves a precise union of SideEffect
      result types while still short-circuiting the pipeline. Prefer value-first
      <code class="text-sm">pipeAsyncSideEffectStrict(data, ...)</code> for inference.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffectStrict, SideEffect } from 'fp-pack';

// Result type: Promise<number | SideEffect<'NEGATIVE' | 0>>
const result = await pipeAsyncSideEffectStrict(
  5,
  async (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEGATIVE' as const)),
  (n) => (n > 10 ? n : SideEffect.of(() => 0 as const))
);`}
    />

    <div class="bg-amber-50 dark:bg-amber-900/20 p-4 mb-6 rounded border border-amber-200 dark:border-amber-800 mt-6">
      <p class="text-sm md:text-base text-amber-900 dark:text-amber-200 leading-relaxed">
        <span class="font-medium">✅ When to use pipeAsyncSideEffectStrict?</span>
        <br />
        <br />
        Use <code class="bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffectStrict</code> when
        you want exact SideEffect unions for async pipelines. Otherwise use{' '}
        <code class="bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Choosing Your Pipe: Flexibility vs. Strictness
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Just like other pipes, fp-pack offers two variants of async SideEffect pipes. The choice
      impacts how the types of the final{' '}
      <strong class="font-semibold text-orange-600 dark:text-orange-400">SideEffect</strong> are
      inferred.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipeAsyncSideEffect (Flexible)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Goal:</strong> Smooth inference for the success path.
          </li>
          <li>
            <strong>Pro:</strong> Offers a great developer experience when you primarily care about the
            successful result and treat all potential failures similarly.
          </li>
          <li>
            <strong>Con:</strong> The final SideEffect type is often widened to{' '}
            <code class="text-xs">SideEffect&lt;any&gt;</code>, losing the specific types of
            different potential effects. This prevents exhaustive, type-safe handling of
            different failure cases.
          </li>
        </ul>
      </div>
      <div class="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-emerald-900 dark:text-emerald-100 mb-2">
          pipeAsyncSideEffectStrict (Safe)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Goal:</strong> Maximum type safety for all paths.
          </li>
          <li>
            <strong>Pro:</strong> Guarantees the final SideEffect type is a precise union of all
            possible effects from the pipeline (e.g.,{' '}
            <code class="text-xs">SideEffect&lt;'A' | 'B'&gt;</code>). This allows for robust,
            type-safe pattern matching on failure cases.
          </li>
          <li>
            <strong>Con:</strong> This strictness can sometimes require more explicit type
            annotations if the compiler cannot automatically unify all possible effect types.
          </li>
        </ul>
      </div>
    </div>

    <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-yellow-800 dark:text-yellow-200 leading-relaxed">
        <span class="font-medium">💡 Recommendation:</span>
        <br />
        <br />
        You are viewing <strong>pipeAsyncSideEffectStrict</strong>. Use this when you need to programmatically
        distinguish between different failure types in an async pipeline. If you only
        need to handle failures generally and prefer a smoother developer experience, consider using{' '}
        <a
          href="/async/pipeAsyncSideEffect"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/async/pipeAsyncSideEffect');
          }}
          class="font-semibold text-blue-700 dark:text-blue-300"
        >
          pipeAsyncSideEffect
        </a>
        .
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function pipeAsyncSideEffectStrict<A, R>(
  a: A,
  ab: (a: A) => R | SideEffect | Promise<R | SideEffect>
): Promise<R | SideEffect<UnionOfAllEffects>>;

function pipeAsyncSideEffectStrict<A, R>(
  ab: (a: A) => R | SideEffect | Promise<R | SideEffect>
): (a: A | SideEffect) => Promise<R | SideEffect<UnionOfAllEffects>>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The output SideEffect type is the union of every SideEffect produced by the pipeline.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">pipeAsyncSideEffectStrict</code> on GitHub to see how it works
      internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/pipeAsyncSideEffectStrict.ts"
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
        href="/async/pipeAsyncSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeAsyncSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Async SideEffect pipelines with a simpler any-based union.
        </p>
      </a>

      <a
        href="/async/pipeAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          pipeAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Pure async pipelines without SideEffect handling.
        </p>
      </a>

      <a
        href="/composition/sideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/sideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          SideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          The SideEffect container used for early exits.
        </p>
      </a>
    </div>
  </div>
);
