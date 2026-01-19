import { CodeBlock } from '@/components/CodeBlock';

export const SideEffectGuide = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      SideEffect Usage Guide
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Use SideEffect pipelines when you need early exits or explicit side-effect handling without wrapper ceremony.
      These pipelines short-circuit as soon as a step returns a <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">SideEffect</code>.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-6 rounded-r-lg mb-8">
      <h2 class="text-2xl md:text-3xl font-medium text-green-900 dark:text-green-100 mb-4">
        When to Use SideEffect Pipelines
      </h2>
      <ul class="text-sm md:text-base text-green-800 dark:text-green-200 space-y-2 list-disc list-inside mb-4">
        <li>Early exit on validation failures or missing data</li>
        <li>Explicit error paths that should stop the pipeline</li>
        <li>Side effects that should happen once and halt the flow</li>
      </ul>
      <p class="text-sm text-green-700 dark:text-green-300 m-0">
        <strong>Note:</strong> For normal error handling, plain <code class="px-1 py-0.5 bg-green-100 dark:bg-green-900/40 rounded">pipe</code>/<code class="px-1 py-0.5 bg-green-100 dark:bg-green-900/40 rounded">pipeAsync</code> with try/catch is still fine.
      </p>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      Choose the Right Variant
    </h2>

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
      <ul class="space-y-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li class="flex items-start">
          <span class="text-blue-500 mr-3 mt-1">▸</span>
          <div>
            <code class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">pipeSideEffect</code> / <code class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">pipeAsyncSideEffect</code>:
            best DX, effect type is widened to <code class="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">SideEffect&lt;any&gt;</code>.
          </div>
        </li>
        <li class="flex items-start">
          <span class="text-purple-500 mr-3 mt-1">▸</span>
          <div>
            <code class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">pipeSideEffectStrict</code> / <code class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">pipeAsyncSideEffectStrict</code>:
            precise union of effect types across branches.
          </div>
        </li>
      </ul>
    </div>

    <div class="border-l-4 border-slate-500 bg-slate-50 dark:bg-slate-900/30 p-6 rounded-r-lg mb-10">
      <p class="text-sm md:text-base text-slate-800 dark:text-slate-200 m-0">
        💡 <strong>Key concept:</strong> <code class="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">SideEffect</code> is lazy. It stores a function and never executes it until you
        explicitly call <code class="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">runPipeResult</code> or invoke <code class="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">effect.effect()</code>.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      Basic Sync Pipeline
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

type User = { id: number; name: string };

const validateUser = (user: User) =>
  user.name.length > 0
    ? user
    : SideEffect.of(() => 'MISSING_NAME' as const);

const normalizeUser = pipeSideEffect(
  validateUser,
  (user) => ({ ...user, name: user.name.trim() })
);

const result = normalizeUser({ id: 1, name: '' });

if (isSideEffect(result)) {
  const reason = runPipeResult(result); // any (non-strict pipeline)
  console.log('Invalid:', reason);
} else {
  console.log('OK:', result.name);
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      Async Pipeline
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect } from 'fp-pack';

const fetchUser = (id: number) => fetch(\`/api/users/\${id}\`).then(res => res.json());

const loadUser = pipeAsyncSideEffect(
  fetchUser,
  (user) => (user ? user : SideEffect.of(() => 'NOT_FOUND' as const)),
  (user) => ({ ...user, loadedAt: Date.now() })
);

const result = await loadUser(123);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      Handling Results Safely
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Always handle SideEffect results outside the pipeline. If the result type is widened to <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">SideEffect&lt;any&gt;</code>,
      provide generics to recover a safe union.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { matchSideEffect, runPipeResult } from 'fp-pack';

const widened: User | SideEffect<any> = result;

const safe = runPipeResult<User, 'MISSING_NAME'>(widened);
// safe: User | 'MISSING_NAME'

const message = matchSideEffect<User, string, string>(result, {
  value: (user) => \`Hello \${user.name}\`,
  effect: (effect) => \`Error: \${String(effect.effect())}\`
});`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      Boundary Handling with isSideEffect
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">isSideEffect</code> is a runtime guard and a TypeScript type guard. Use it at the
      boundary (right after the pipeline) to branch safely. In strict pipelines, the effect union stays precise.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const validate = (value: number) =>
  value > 0 ? value : SideEffect.of(() => 'NEGATIVE' as const);

const result = pipeSideEffectStrict(
  validate,
  (value) => value + 1
)(-1);

if (isSideEffect(result)) {
  const reason = runPipeResult(result);
  // reason: 'NEGATIVE'
} else {
  const value = result;
  // value: number
}`}
    />

    <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-r-lg my-8">
      <p class="text-sm md:text-base text-blue-900 dark:text-blue-100 font-semibold mb-2">
        💡 Non-strict pipelines widen effects
      </p>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 m-0">
        In <code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">pipeSideEffect</code>/<code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">pipeAsyncSideEffect</code>,
        the effect type is <code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">SideEffect&lt;any&gt;</code>. After <code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">isSideEffect</code>,
        call <code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">runPipeResult&lt;T, E&gt;</code> to recover a safe union.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      Strict Union Tracking
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffectStrict, SideEffect } from 'fp-pack';

const pipeline = pipeSideEffectStrict(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEGATIVE' as const)),
  (n) => (n > 10 ? n : SideEffect.of(() => 0 as const))
);

// Result type: number | SideEffect<'NEGATIVE' | 0>
const result = pipeline(5);`}
    />

    <div class="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-r-lg mt-8">
      <p class="text-sm md:text-base text-amber-900 dark:text-amber-100 font-semibold mb-2">
        ⚠️ runPipeResult inside the pipeline is not allowed
      </p>
      <p class="text-sm md:text-base text-amber-800 dark:text-amber-200 m-0">
        <code class="px-2 py-1 bg-amber-100 dark:bg-amber-900/40 rounded">runPipeResult</code> should only be called after the pipeline completes.
        This keeps control flow predictable and preserves type inference.
      </p>
    </div>
  </div>
);
