import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Complement_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      complement
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건 함수의 논리적 부정을 생성합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      complement란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        complement
      </strong>{' '}
      는 조건 함수를 받아서 반대의 불린 값을 반환하는 새로운 함수를 만듭니다.
      반복적인 부정 로직을 작성하지 않고도 부정 조건을 만들 때 유용합니다.
      반환된 함수는 원본 조건 함수와 동일한 인자를 받습니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { complement } from 'fp-pack';

const isEven = (n: number) => n % 2 === 0;
const isOdd = complement(isEven);

isOdd(3); // true
isOdd(4); // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function complement<T extends any[]>(
  predicate: (...args: T) => boolean
): (...args: T) => boolean;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실용적인 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      부정 필터 만들기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { complement, filter } from 'fp-pack';

const isNil = (value: unknown) => value == null;
const isNotNil = complement(isNil);

const data = [1, null, 'hello', undefined, 42];
const cleaned = filter(isNotNil, data);
// [1, 'hello', 42]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      복잡한 조건 반전
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { complement, filter } from 'fp-pack';

interface User {
  name: string;
  active: boolean;
  role: string;
}

const isAdmin = (user: User) => user.role === 'admin';
const isNotAdmin = complement(isAdmin);

const users: User[] = [
  { name: 'Alice', active: true, role: 'admin' },
  { name: 'Bob', active: true, role: 'user' },
  { name: 'Charlie', active: false, role: 'user' },
];

const regularUsers = filter(isNotAdmin, users);
// [{ name: 'Bob', ... }, { name: 'Charlie', ... }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      다중 인자 조건 함수
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { complement } from 'fp-pack';

const inRange = (min: number, max: number, value: number) =>
  value >= min && value <= max;

const outOfRange = complement(inRange);

outOfRange(10, 20, 5);  // true (5는 [10, 20] 범위 밖)
outOfRange(10, 20, 15); // false (15는 [10, 20] 범위 안)
outOfRange(10, 20, 25); // true (25는 [10, 20] 범위 밖)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프와 함께 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, complement, filter, map } from 'fp-pack';

const isEmpty = (str: string) => str.trim().length === 0;
const isNotEmpty = complement(isEmpty);

const processMessages = pipe(
  filter(isNotEmpty),           // 빈 문자열 제거
  map((s: string) => s.trim()), // 공백 정리
  map((s: string) => s.toUpperCase())
);

processMessages(['  ', 'hello', '', 'world', '   ']);
// ['HELLO', 'WORLD']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">complement</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/complement.ts"
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
          조건에 맞는 요소 선택 - complement와 자주 함께 사용됩니다.
        </p>
      </a>

      <a
        href="/control/when"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/when');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          when →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건이 참일 때 함수를 조건부로 적용합니다.
        </p>
      </a>

      <a
        href="/control/unless"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/unless');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          unless →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건이 거짓일 때 함수를 조건부로 적용 - complement의 대안입니다.
        </p>
      </a>
    </div>
  </div>
);
