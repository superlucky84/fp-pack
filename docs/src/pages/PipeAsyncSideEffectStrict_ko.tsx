import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeAsyncSideEffectStrict_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsyncSideEffectStrict
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      비동기 파이프라인용 엄격한 SideEffect 유니온
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipeAsyncSideEffectStrict란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsyncSideEffectStrict
      </strong>{' '}
      는 <strong>pipeAsyncSideEffect</strong>의 엄격 버전입니다. SideEffect 결과 타입을 정확한 유니온으로 유지하면서
      파이프라인을 단락(short-circuit)합니다. 타입 추론을 위해
      <code class="text-sm">pipeAsyncSideEffectStrict(data, ...)</code> 형태를 우선 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffectStrict, SideEffect } from 'fp-pack';

// 결과 타입: Promise<number | SideEffect<'NEGATIVE' | 0>>
const result = await pipeAsyncSideEffectStrict(
  5,
  async (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEGATIVE' as const)),
  (n) => (n > 10 ? n : SideEffect.of(() => 0 as const))
);`}
    />

    <div class="bg-amber-50 dark:bg-amber-900/20 p-4 mb-6 rounded border border-amber-200 dark:border-amber-800 mt-6">
      <p class="text-sm md:text-base text-amber-900 dark:text-amber-200 leading-relaxed">
        <span class="font-medium">✅ pipeAsyncSideEffectStrict는 언제 사용하나요?</span>
        <br />
        <br />
        SideEffect 결과 타입을 정밀하게 유지하고 싶을 때{' '}
        <code class="bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffectStrict</code>를 사용하세요.
        일반적으로는{' '}
        <code class="bg-amber-100 dark:bg-amber-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>가 더 간편합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      어떤 파이프를 선택할까?: 유연성 vs 엄격성
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      다른 파이프와 마찬가지로, fp-pack은 두 가지 버전의 비동기 SideEffect 파이프를 제공합니다.
      어떤 것을 선택하는지는 최종{' '}
      <strong class="font-semibold text-orange-600 dark:text-orange-400">SideEffect</strong>의 타입이
      어떻게 추론되는지에 영향을 줍니다.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipeAsyncSideEffect (유연함)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>목표:</strong> 성공 경로에 대한 부드러운 타입 추론.
          </li>
          <li>
            <strong>장점:</strong> 주로 성공 케이스에 관심이 있고 모든 실패 케이스를 비슷하게
            처리할 때 훌륭한 개발 경험을 제공합니다.
          </li>
          <li>
            <strong>단점:</strong> 최종 SideEffect 타입이{' '}
            <code class="text-xs">SideEffect&lt;any&gt;</code>로 넓어져, 각기 다른 실패 원인의
            타입 정보를 잃게 됩니다. 이로 인해 다양한 실패 케이스를 타입-안전하게 처리하기
            어렵습니다.
          </li>
        </ul>
      </div>
      <div class="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-emerald-900 dark:text-emerald-100 mb-2">
          pipeAsyncSideEffectStrict (안전함)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>목표:</strong> 모든 경로에 대한 최대한의 타입 안정성.
          </li>
          <li>
            <strong>장점:</strong> 최종 SideEffect 타입이 파이프라인에서 가능한 모든 이펙트의
            정확한 유니온 타입(예:{' '}
            <code class="text-xs">SideEffect&lt;'A' | 'B'&gt;</code>)임을 보장합니다. 이는
            실패 케이스에 대한 강력한 타입-안전 패턴 매칭을 가능하게 합니다.
          </li>
          <li>
            <strong>단점:</strong> 이 엄격함으로 인해 컴파일러가 모든 가능한 이펙트 타입을 자동으로
            통합하지 못할 경우, 때때로 명시적인 타입 어노테이션이 필요할 수 있습니다.
          </li>
        </ul>
      </div>
    </div>

    <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-yellow-800 dark:text-yellow-200 leading-relaxed">
        <span class="font-medium">💡 추천:</span>
        <br />
        <br />
        현재 <strong>pipeAsyncSideEffectStrict</strong> 문서를 보고 계십니다. 비동기 파이프라인에서
        각기 다른 실패 타입을 구분하여 타입-안전하게 처리해야 할 때 이 함수를 사용하세요. 만약
        실패를 포괄적으로 처리하고 더 부드러운 개발 경험을 선호한다면,{' '}
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
        사용을 고려해 보세요.
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
      출력 SideEffect 타입은 파이프라인에서 발생 가능한 모든 SideEffect 결과 타입의 유니온입니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipeAsyncSideEffectStrict</code> 구현을 GitHub에서 확인하세요.
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
          any 기반 결과 유니온을 사용하는 기본 버전입니다.
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
          SideEffect가 없는 순수 비동기 파이프라인입니다.
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
          조기 종료를 표현하는 SideEffect 컨테이너입니다.
        </p>
      </a>
    </div>
  </div>
);
