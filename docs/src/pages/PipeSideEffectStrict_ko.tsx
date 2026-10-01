import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeSideEffectStrict_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeSideEffectStrict <span class="text-base align-middle px-2 py-1 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200">deprecated</span>
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      0.15.0부터 deprecated — pipeSideEffect를 사용하세요
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 deprecated 되었나요?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      0.15.0부터 <code class="text-sm">pipeSideEffect</code>가 모든 단계를 컴파일 타임에 검사하고, 정확한 effect 유니온(예: <code class="text-sm">SideEffect&lt;'NOT_FOUND' | 'INVALID'&gt;</code>)을 추적합니다. <code class="text-sm">pipeSideEffectStrict</code>가 제공하던 기능 그대로입니다. 조기 종료 런타임 동작은 바뀌지 않았습니다.
    </p>

    <div class="bg-amber-50 dark:bg-amber-900/20 p-4 mb-6 rounded border border-amber-200 dark:border-amber-800">
      <p class="text-sm md:text-base text-amber-900 dark:text-amber-200 leading-relaxed">
        <code class="text-sm">pipeSideEffectStrict</code>는 <code class="text-sm">pipeSideEffect</code>의 별칭으로 계속 export되므로 기존 코드는 그대로 컴파일됩니다. 1.0에서 제거될 예정입니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      마이그레이션
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      import와 호출만 바꾸면 됩니다. 나머지는 그대로입니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`// before
import { pipeSideEffectStrict, SideEffect } from 'fp-pack';
const check = pipeSideEffectStrict(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'NON_POSITIVE' as const)),
  (n: number) => n * 2
);

// after — same precise effect type: number | SideEffect<'NON_POSITIVE'>
import { pipeSideEffect, SideEffect } from 'fp-pack';
const check = pipeSideEffect(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'NON_POSITIVE' as const)),
  (n: number) => n * 2
);`}
    />

    <div class="flex flex-wrap gap-4 mt-8">
      <a
        href="/ko/composition/pipeSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/composition/pipeSideEffect');
        }}
        class="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        pipeSideEffect로 이동
      </a>
      <a
        href="/ko/guide/pipe-choice-guide"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/guide/pipe-choice-guide');
        }}
        class="inline-block px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        파이프 선택 가이드 보기
      </a>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      별칭은 pipeSideEffect를 감싸는 한 줄짜리 래퍼입니다.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/pipeSideEffectStrict.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      GitHub에서 보기
    </a>
  </div>
);
