import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Partition_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      partition
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건에 따라 배열을 두 그룹으로 분리
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      partition이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-teal-700 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/20 px-2 py-1 rounded">
        partition
      </strong>{' '}
      은 조건을 만족하는 요소와 그렇지 않은 요소를 분리해
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">[참, 거짓]</code> 형태로 반환합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { partition } from 'fp-kit';

const [even, odd] = partition((n: number) => n % 2 === 0, [1, 2, 3, 4]);
// even: [2, 4]
// odd: [1, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function partition<T>(predicate: (value: T) => boolean, arr: T[]): [T[], T[]];`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      상태로 분리하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partition } from 'fp-kit';

const tasks = [
  { title: 'Ship docs', done: true },
  { title: 'Fix tests', done: false },
  { title: 'Release', done: true },
];

const [done, pending] = partition(task => task.done, tasks);
// done: [{...}, {...}]
// pending: [{...}]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      입력 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partition } from 'fp-kit';

const inputs = ['42', '3.14', 'oops'];
const [valid, invalid] = partition(value => !Number.isNaN(Number(value)), inputs);
// valid: ['42', '3.14']
// invalid: ['oops']`}
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
        href="/array/groupBy"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/groupBy');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          groupBy →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          키 함수로 그룹을 만듭니다.
        </p>
      </a>
    </div>
  </div>
);
