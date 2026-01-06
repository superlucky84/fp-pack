import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const AssocPath_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      assocPath
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      중첩 경로에 값을 불변으로 설정합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { assocPath } from 'fp-pack';

assocPath(['a', 'b', 'c'], 42, { a: { b: { c: 0 } } });
// { a: { b: { c: 42 } } }

assocPath(['a', 'b', 'c'], 42, { a: 5 });
// { a: { b: { c: 42 } } }

assocPath(['a', 1, 'c'], 42, { a: [] });
// { a: [undefined, { c: 42 }] }

assocPath(['a', -1], 42, { a: [1, 2] });
// { a: [1, 42] }`}
    />

    <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
      <p class="text-sm md:text-base text-yellow-900 dark:text-yellow-100">
        <strong class="font-semibold">참고:</strong> data-last 파이프라인에서는 TypeScript가 이 유틸의 최종 데이터 타입을 추론하지 못할 수 있습니다.
        간단한 타입 힌트나 data-first 래핑을 사용하세요. 자세한 내용은{' '}
        <a
          href="/guide/type-usage"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/guide/type-usage');
          }}
          class="underline decoration-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-200"
        >
          타입 활용
        </a>{' '}
        과{' '}
        <a
          href="/guide"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/guide');
          }}
          class="underline decoration-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-200"
        >
          상세 가이드
        </a>
        를 참고하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">assocPath</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/object/assocPath.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      GitHub에서 보기
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/assoc');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          assoc
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          최상위 키를 불변으로 설정합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/dissocPath');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          dissocPath
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          중첩 경로를 불변으로 제거합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/path');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          path
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          중첩 경로를 안전하게 읽습니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/pathOr');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          pathOr
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          기본값과 함께 중첩 경로를 읽습니다
        </p>
      </div>
    </div>
  </div>
);
