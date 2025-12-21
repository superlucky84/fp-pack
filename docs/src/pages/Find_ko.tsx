import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Find_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      find
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건을 만족하는 첫 요소 찾기
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      find란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        find
      </strong>{' '}
      는 predicate(조건 함수)를 만족하는 첫 요소를 반환합니다. 만족하는 요소가 없으면{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">undefined</code>를 반환합니다.
      <br />
      <br />
      <strong>검색</strong>, <strong>첫 매칭 찾기</strong>, <strong>빠른 스캔</strong>에 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { find } from 'fp-kit';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

find(u => u.id === 2, users);
// { id: 2, name: 'Bob' }

find(u => u.name === 'Zoe', users);
// undefined`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function find<T>(predicate: (value: T) => boolean, arr: T[]): T | undefined;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      키로 찾기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { find } from 'fp-kit';

interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: 'p1', name: 'Laptop', price: 1000 },
  { id: 'p2', name: 'Mouse', price: 25 },
];

const product = find((p: Product) => p.id === 'p2', products);
// { id: 'p2', name: 'Mouse', price: 25 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Optional 값과 함께 쓰기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { find, maybe } from 'fp-kit';

const getUpperName = maybe((u: { name: string }) => u.name.toUpperCase());

const user = find((u: { id: number }) => u.id === 1, [{ id: 1, name: 'alice' }]);
getUpperName(user); // 'ALICE'

const missing = find((u: { id: number }) => u.id === 2, [{ id: 1, name: 'alice' }]);
getUpperName(missing); // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건을 만족하는 요소만 남깁니다.
        </p>
      </a>

      <a
        href="/maybe/maybe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/maybe/maybe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          maybe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          null/undefined에 안전한 변환을 수행합니다.
        </p>
      </a>
    </div>
  </div>
);

