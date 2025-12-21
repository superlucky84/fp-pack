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
      code={`import { flatMap } from 'fp-kit';

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
      code={`import { flatMap } from 'fp-kit';

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
      code={`import { flatMap } from 'fp-kit';

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
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/groupBy"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/groupBy');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          groupBy →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          키 함수로 요소를 그룹화합니다.
        </p>
      </a>

      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          flatMap을 다른 변환과 조합합니다.
        </p>
      </a>
    </div>
  </div>
);

