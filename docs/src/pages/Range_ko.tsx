import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Range_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      range
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      숫자 범위 생성 (end 미포함)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      range란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded">
        range
      </strong>{' '}
      는 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">start</code>부터
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">end</code> 직전까지의 숫자 배열을 만듭니다.
      start가 end보다 크면 감소 방향으로 생성됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { range } from 'fp-kit';

range(0, 5);
// [0, 1, 2, 3, 4]

range(5, 0);
// [5, 4, 3, 2, 1]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function range(start: number, end: number): number[];`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      페이지 번호 만들기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { range } from 'fp-kit';

const totalPages = 4;
const pages = range(1, totalPages + 1);
// [1, 2, 3, 4]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      인덱스 배열 생성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { range, map } from 'fp-kit';

const values = ['a', 'b', 'c'];
const indices = range(0, values.length);
const pairs = map(i => [i, values[i]], indices);
// [[0, 'a'], [1, 'b'], [2, 'c']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          함수를 적용해 값을 변환합니다.
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
