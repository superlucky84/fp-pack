import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const GroupBy_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      groupBy
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      키 함수 기준으로 배열을 그룹화
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      groupBy란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        groupBy
      </strong>{' '}
      는 배열을 객체로 변환합니다. 각 요소에 대해 키 함수를 실행해 문자열 키를 만들고,
      같은 키를 가진 요소들을 하나의 배열로 모아 저장합니다.
      <br />
      <br />
      <strong>분류</strong>, <strong>리포팅</strong>, <strong>인덱싱</strong>,{' '}
      <strong>UI 섹션 구성</strong>에 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { groupBy } from 'fp-pack';

groupBy((n: number) => (n % 2 === 0 ? 'even' : 'odd'), [1, 2, 3, 4]);
// { odd: [1, 3], even: [2, 4] }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function groupBy<T>(fn: (value: T) => string, arr: T[]): Record<string, T[]>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      키는 문자열이며, 같은 키가 나오면 해당 그룹에 계속 누적됩니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      역할별 사용자 그룹
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { groupBy } from 'fp-pack';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'member';
}

const users: User[] = [
  { id: 1, name: 'Alice', role: 'admin' },
  { id: 2, name: 'Bob', role: 'member' },
  { id: 3, name: 'Charlie', role: 'member' },
];

const byRole = groupBy((u: User) => u.role, users);
// { admin: [{...}], member: [{...}, {...}] }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      UI 섹션 만들기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { groupBy } from 'fp-pack';

interface Message {
  id: string;
  date: string; // 'YYYY-MM-DD'
  text: string;
}

const messages: Message[] = [
  { id: 'm1', date: '2025-01-01', text: '새해 복 많이!' },
  { id: 'm2', date: '2025-01-01', text: '🎉' },
  { id: 'm3', date: '2025-01-02', text: '출근...' },
];

const byDate = groupBy((m: Message) => m.date, messages);
// 날짜별 섹션으로 렌더링`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">groupBy</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/groupBy.ts"
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
        href="/array/partition"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/partition');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          partition →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건으로 두 그룹으로 분할.
        </p>
      </a>

      <a
        href="/array/reduce"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/reduce');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          reduce →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          그룹화된 값 변환하기.
        </p>
      </a>

      <a
        href="/array/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          각 그룹 처리하기.
        </p>
      </a>
    </div>
  </div>
);
