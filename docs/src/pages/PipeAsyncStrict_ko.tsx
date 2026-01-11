import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeAsyncStrict_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsyncStrict
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      비동기 파이프라인을 위한 엄격한 타입 검사
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipeAsyncStrict란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsyncStrict
      </strong>{' '}
      는 <strong>pipeAsync</strong>의 엄격 버전입니다. 비동기 단계 간 타입 불일치를 더 빠르게 잡아내며,
      값-우선 <code class="text-sm">pipeAsyncStrict(data, ...)</code> 사용을 권장합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncStrict } from 'fp-pack';

const result = await pipeAsyncStrict(
  2,
  async (n: number) => n + 1,
  (n) => n * 2
); // 6`}
    />

    <div class="bg-amber-50 dark:bg-amber-900/20 p-4 mb-6 rounded border border-amber-200 dark:border-amber-800 mt-6">
      <p class="text-sm md:text-base text-amber-900 dark:text-amber-200 leading-relaxed">
        <span class="font-medium">✅ pipeAsyncStrict는 언제 사용하나요?</span>
        <br />
        <br />
        비동기 파이프라인에서 더 엄격한 타입 검사가 필요하면{' '}
        <code class="bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 rounded">pipeAsyncStrict</code>를 사용하세요.
        대부분의 경우에는 <code class="bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 rounded">pipeAsync</code>로 충분합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function pipeAsyncStrict<A, B, C>(
  value: A,
  ab: (a: A) => B | Promise<B>,
  bc: (b: B) => C | Promise<C>
): Promise<C>;

function pipeAsyncStrict<A, B>(
  ab: (a: A) => B | Promise<B>
): (a: A) => Promise<B>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      값-우선 호출은 추론이 더 안정적이고, 함수-우선 호출은 재사용에 유리합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipeAsyncStrict</code> 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/pipeAsyncStrict.ts"
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
          보다 유연한 추론을 제공하는 비동기 파이프라인.
        </p>
      </a>

      <a
        href="/async/pipeAsyncSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffectStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeAsyncSideEffectStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          엄격한 SideEffect 유니온을 제공하는 비동기 파이프라인.
        </p>
      </a>

      <a
        href="/composition/pipeStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipeStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          동기 파이프라인에 대한 엄격한 타입 검사.
        </p>
      </a>
    </div>
  </div>
);
