import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeAsync_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsync
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      비동기/동기 함수를 좌→우로 합성하며 value-first 또는 함수-우선 호출을 지원합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipeAsync란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsync
      </strong>{' '}
      는 비동기/동기 함수를 받아 순서대로 실행하며 필요한 곳에서 await합니다. 타입 추론을 위해 value-first를 권장합니다.
      시그니처: <code>pipeAsync(value, fn1, fn2, ...)</code>. 재사용이 필요할 때만 함수-우선을 사용하세요.
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
      더 엄격한 타입 검사가 필요하면{' '}
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
      를 사용하세요.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      동기/비동기 혼합
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
      어떤 파이프를 선택할까?: 유연성 vs 엄격성
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack은 추론의 유연성과 엄격한 타입 안전성 사이에서 선택할 수 있도록 두 가지 버전의 비동기
      파이프를 제공합니다.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipeAsync (유연한 기본 파이프)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>목표:</strong> 비동기 환경에서 최상의 타입 추론 능력.
          </li>
          <li>
            <strong>장점:</strong> 복잡하고 제네릭한 파이프라인에서도 최종 결과 타입을 놀랍도록
            잘 추론해내며, 수동 타입 명시의 필요성을 최소화합니다. 부드러운 개발 경험(DX)을
            우선시합니다.
          </li>
          <li>
            <strong>단점:</strong> 이를 위해 중간 단계의 타입 검사가 다소 너그러워, 함수 간의 모든
            타입 불일치를 잡아내지 못할 수 있으며 이는 런타임 에러로 이어질 수 있습니다.
          </li>
        </ul>
      </div>
      <div class="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-emerald-900 dark:text-emerald-100 mb-2">
          pipeAsyncStrict (안전한 대안)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>목표:</strong> 비동기 파이프라인에서 최대한의 타입 안정성.
          </li>
          <li>
            <strong>장점:</strong> 파이프라인의 각 함수 연결 단계에서 타입 불일치가 발생하면 즉시
            컴파일 에러를 발생시켜 버그를 예방합니다.
          </li>
          <li>
            <strong>단점:</strong> 일부 고급 제네릭 시나리오에서는 이 엄격함이 오히려 타입 추론을
            방해하여, 개발자가 직접 타입 힌트를 더 추가해야 할 수 있습니다.
          </li>
        </ul>
      </div>
    </div>

    <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-yellow-800 dark:text-yellow-200 leading-relaxed">
        <span class="font-medium">💡 추천:</span>
        <br />
        <br />
        훌륭한 개발 경험을 위해 <strong>pipeAsync</strong>로 시작하세요. 만약 타입 안정성이 매우
        중요하거나, <strong>pipeAsync</strong>가 너무 너그럽다고 느껴지는 부분에서는{' '}
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
        로 전환하여 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect 파이프라인
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>pipeAsync</strong>는 순수 비동기 합성에 집중합니다. <strong class="font-semibold">SideEffect</strong>
      조기 종료가 필요하다면 <strong>pipeAsyncSideEffect</strong>를 사용하세요. 엄격한 유니온이 필요하면{' '}
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
      를 사용하세요.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipeAsync</code>의 내부 구현을 GitHub에서 확인하세요.
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
      GitHub에서 보기
    </a>
  </div>
);
