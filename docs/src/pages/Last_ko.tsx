import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Last_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      last
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      배열의 마지막 요소를 가져오기
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      last란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
        last
      </strong>{' '}
      는 배열의 마지막 요소를 반환합니다. 배열이 비어 있으면
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">undefined</code>를 반환합니다.
      최근 항목이나 마지막 값을 안전하게 가져올 때 사용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { last } from 'fp-kit';

last([1, 2, 3]);
// 3

last([]);
// undefined`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function last<T>(arr: T[]): T | undefined;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      최근 활동 가져오기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { last } from 'fp-kit';

const events = ['login', 'view', 'logout'];
const latest = last(events);
// 'logout'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      기본값 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { last } from 'fp-kit';

const history: number[] = [];
const value = last(history) ?? 0;
// 0`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/init"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/init');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          init →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          마지막 요소를 제외한 나머지를 가져옵니다.
        </p>
      </a>

      <a
        href="/array/take"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/take');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          take →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          앞에서 n개 요소를 가져옵니다.
        </p>
      </a>
    </div>
  </div>
);
