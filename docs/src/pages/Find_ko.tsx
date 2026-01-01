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
      code={`import { find } from 'fp-pack';

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
      code={`import { find } from 'fp-pack';

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
      code={`import { find, maybe } from 'fp-pack';

const getUpperName = maybe((u: { name: string }) => u.name.toUpperCase());

const user = find((u: { id: number }) => u.id === 1, [{ id: 1, name: 'alice' }]);
getUpperName(user); // 'ALICE'

const missing = find((u: { id: number }) => u.id === 2, [{ id: 1, name: 'alice' }]);
getUpperName(missing); // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">find</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/find.ts"
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
        href="/array/some"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/some');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          some →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          요소가 존재하는지 확인.
        </p>
      </a>

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
          일치하는 모든 요소 찾기.
        </p>
      </a>

      <a
        href="/array/findIndex"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/findIndex');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          findIndex →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          값 대신 인덱스 가져오기.
        </p>
      </a>
    </div>
  </div>
);
