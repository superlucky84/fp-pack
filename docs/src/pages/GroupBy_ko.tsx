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
      code={`import { groupBy } from 'fp-kit';

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
      code={`import { groupBy } from 'fp-kit';

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
      code={`import { groupBy } from 'fp-kit';

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
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/chunk"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/chunk');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          chunk →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          페이지/배치 처리를 위해 고정 크기로 분할합니다.
        </p>
      </a>

      <a
        href="/array/flatMap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/flatMap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          flatMap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          1→N 변환을 위해 매핑 후 평탄화합니다.
        </p>
      </a>
    </div>
  </div>
);

