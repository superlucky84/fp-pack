import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeWithDeps = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeWithDeps
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Bind dependencies once and run a pipe with deps-aware steps
    </p>

    <div class="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-900 dark:border-amber-700 dark:bg-amber-900/20 dark:text-amber-100">
      <strong class="font-semibold">Note:</strong> This utility is new and has limited real-world test coverage.
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is pipeWithDeps?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/20 px-2 py-1 rounded">
        pipeWithDeps
      </strong>{' '}
      wraps a pipe function and injects <strong>dependencies</strong> into every step. Each step can be
      either <code class="text-xs">(value) =&gt; result</code> or{' '}
      <code class="text-xs">(value, deps) =&gt; result</code>. The deps type is the intersection of
      all declared dependency types. You can use it in <strong>value-first</strong> or{' '}
      <strong>steps-first</strong> form. If you need to pass a function as input, wrap it with{' '}
      <code class="text-xs">from</code> to avoid data-last detection.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeWithDeps, pipeAsyncSideEffect } from 'fp-pack';

type Db = { query: (id: number) => Promise<{ name: string }> };
type Logger = { log: (message: string) => void };

const withDeps = pipeWithDeps(pipeAsyncSideEffect);

const getUserNameLength = withDeps(
  async (userId: number, deps: Db) => deps.query(userId),
  (user) => user.name,
  (name: string, deps: Logger) => {
    deps.log(name);
    return name.length;
  }
);

const deps: Db & Logger = {
  query: async (id) => ({ name: \`user-\${id}\` }),
  log: console.log
};

getUserNameLength(1)(deps).then(console.log); // 6`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature (Simplified)
    </h2>

    <CodeBlock
      language="typescript"
      code={`function pipeWithDeps<P>(
  pipeFn: P
): (input: any, ...steps: Array<(value: any, deps?: any) => any>) =>
  (deps: unknown) => ReturnType<P>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Use the <strong>value-first</strong> pipe form. When you need a reusable pipeline without
      input, create a wrapper function and call it at the entry point.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Sync Pipeline with Deps
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeWithDeps, pipe } from 'fp-pack';

const withDeps = pipeWithDeps(pipe);

const formatPrice = withDeps(
  100,
  (value: number, deps: { tax: number }) => value * deps.tax,
  (value: number) => \`$\${value.toFixed(2)}\`
);

formatPrice({ tax: 1.1 }); // "$110.00"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Reusable Pipeline (Data-last)
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeWithDeps, pipe } from 'fp-pack';

const withDeps = pipeWithDeps(pipe);

const pipeline = withDeps(
  (value: number, deps: { add: number }) => value + deps.add,
  (value: number) => value * 2
);

pipeline(2)({ add: 3 }); // 10`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Mixed Steps (Pure + Deps)
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeWithDeps, pipe } from 'fp-pack';

const withDeps = pipeWithDeps(pipe);

const label = withDeps(
  '  fp-pack  ',
  (value: string) => value.trim(),
  (value: string, deps: { prefix: string }) => \`\${deps.prefix}\${value}\`,
  (value: string) => value.toUpperCase()
);

label({ prefix: 'lib: ' }); // "LIB: FP-PACK"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">pipeWithDeps</code> on GitHub.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/pipeWithDeps.ts"
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
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Compose functions left to right for pure pipelines.
        </p>
      </a>

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
          Async pipeline that short-circuits on SideEffect values.
        </p>
      </a>

      <a
        href="/composition/from"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/from');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          from →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Create a unary function that always returns a fixed value.
        </p>
      </a>
    </div>
  </div>
);
