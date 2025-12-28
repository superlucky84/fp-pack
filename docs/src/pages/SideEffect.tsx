import { CodeBlock } from '@/components/CodeBlock';

export const SideEffect = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      SideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      SideEffect container that never runs automatically
    </p>

    <CodeBlock
      language="typescript"
      code={`import { SideEffect, matchSideEffect, runPipeResult, pipe } from 'fp-kit';

const stop = (value: number) => new SideEffect(() => value * 10);
const fn = pipe((n: number) => n + 1, stop, (n) => n + 1);

const result = fn(1); // SideEffect instance, rest of pipe skipped

matchSideEffect(result, {
  value: (v) => v,
  effect: (se) => se, // no auto-run
});

runPipeResult(result); // explicitly executes effect`}
    />
  </div>
);
