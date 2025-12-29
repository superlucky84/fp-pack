import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Head_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      head
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      배열의 첫 요소를 가져오기
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      head란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        head
      </strong>{' '}
      는 배열의 첫 요소를 반환합니다. 배열이 비어 있으면
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">undefined</code>를 반환합니다.
      원본 배열을 변경하지 않고 첫 값을 확인할 때 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { head } from 'fp-kit';

head([1, 2, 3]);
// 1

head([]);
// undefined`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function head<T>(arr: T[]): T | undefined;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      첫 항목 미리보기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { head } from 'fp-kit';

const users = [
  { id: 1, name: 'Ada' },
  { id: 2, name: 'Grace' },
];

const firstUser = head(users);
// { id: 1, name: 'Ada' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      안전한 기본값 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { head } from 'fp-kit';

const tokens: string[] = [];
const token = head(tokens) ?? 'anonymous';
// 'anonymous'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/tail"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/tail');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          tail →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          첫 요소를 제외한 나머지를 가져옵니다.
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
