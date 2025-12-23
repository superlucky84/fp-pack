import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IsEmpty_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isEmpty
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값이 비어 있는지 확인합니다 (null/undefined, 길이 0, 키 없음)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      isEmpty란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isEmpty
      </strong>{' '}
      는 <code>null</code>/<code>undefined</code>, 빈 문자열·배열, 빈 객체, 빈 Map/Set에 대해 <code>true</code>를 반환합니다.
      숫자, 불리언, 길이가 있는 문자열/배열, 키가 있는 객체에는 <code>false</code>를 반환합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { isEmpty } from 'fp-kit';

isEmpty(null);                 // true
isEmpty('');                   // true
isEmpty([]);                   // true
isEmpty({});                   // true
isEmpty(new Map());            // true
isEmpty(new Set());            // true

isEmpty([1]);                  // false
isEmpty({ a: 1 });             // false
isEmpty('text');               // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      안전 가드
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isEmpty } from 'fp-kit';

function printFirst(items: string[]) {
  if (isEmpty(items)) return;
  console.log(items[0]);
}

printFirst([]);          // 아무것도 출력 안 함
printFirst(['hello']);   // 'hello'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 정리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isEmpty } from 'fp-kit';

const inputs = ['hi', '', ' ', null, [], ['x']];

const nonEmpty = inputs.filter(v => !isEmpty(v));
// ['hi', ' ', ['x']]`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      <code>null</code>/<code>undefined</code>만 구분하고 싶다면{' '}
      <a
        class="text-blue-600 dark:text-blue-300 underline cursor-pointer"
        onClick={() => navigateTo('/equality/isNil')}
      >
        isNil
      </a>{' '}
      문서를 참고하세요.
    </p>
  </div>
);
