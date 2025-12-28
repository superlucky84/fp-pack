import { CodeBlock } from '@/components/CodeBlock';

export const SideEffect_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      SideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      자동 실행되지 않는 사이드 이펙트 컨테이너
    </p>

    <CodeBlock
      language="typescript"
      code={`import { SideEffect, matchSideEffect, runPipeResult, pipe } from 'fp-kit';

const stop = (value: number) => new SideEffect(() => value * 10);
const fn = pipe((n: number) => n + 1, stop, (n) => n + 1);

const result = fn(1); // SideEffect 인스턴스, 이후 파이프는 건너뜀

matchSideEffect(result, {
  value: (v) => v,
  effect: (se) => se, // 자동 실행 없음
});

runPipeResult(result); // 명시적으로 effect 실행`}
    />
  </div>
);
