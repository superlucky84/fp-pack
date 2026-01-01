import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const FlatMap_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flatMap
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      매핑 후 1단계 평탄화(flatten)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      flatMap이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flatMap
      </strong>{' '}
      는 <strong>map</strong>과 <strong>flatten</strong>을 한 번에 수행합니다. 각 요소를 배열로 변환한 뒤,
      결과를 한 단계로 이어붙여(flatten) 단일 배열로 만듭니다.
      <br />
      <br />
      <strong>확장(1→N)</strong>, <strong>리스트 생성</strong>, <strong>데이터 전개</strong>에 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-pack';

flatMap((n: number) => [n, n * 2], [1, 2, 3]);
// [1, 2, 2, 4, 3, 6]

flatMap((s: string) => s.split(''), ['ab', 'cd']);
// ['a', 'b', 'c', 'd']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function flatMap<T, R>(fn: (value: T) => R[], arr: T[]): R[];`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      중첩 리스트 펼치기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-pack';

interface Order {
  id: string;
  items: string[];
}

const orders: Order[] = [
  { id: 'o1', items: ['apple', 'banana'] },
  { id: 'o2', items: ['orange'] },
];

const allItems = flatMap((o: Order) => o.items, orders);
// ['apple', 'banana', 'orange']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조합(쌍) 만들기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatMap } from 'fp-pack';

const letters = ['a', 'b'];
const numbers = [1, 2, 3];

const pairs = flatMap(
  (l: string) => numbers.map(n => [l, n] as const),
  letters
);
// [['a', 1], ['a', 2], ['a', 3], ['b', 1], ['b', 2], ['b', 3]]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">flatMap</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/flatMap.ts"
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
          평탄화 없이 변환.
        </p>
      </a>

      <a
        href="/array/flatten"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/flatten');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          flatten →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          중첩 배열 평탄화.
        </p>
      </a>

      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건부 확장을 위해 flatMap과 결합.
        </p>
      </a>
    </div>
  </div>
);
