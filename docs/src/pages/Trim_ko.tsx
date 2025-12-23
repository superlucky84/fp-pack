import { CodeBlock } from '@/components/CodeBlock';

export const Trim_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      trim
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      문자열 양 끝의 공백 제거
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      trim이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        trim
      </strong>{' '}
      은 문자열의 앞뒤 공백을 제거합니다. 사용자 입력 정리, 파싱, 정규화에 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { trim } from 'fp-kit';

trim('  hello  '); // 'hello'
trim('\\n\\tvalue\\t'); // 'value'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      입력 값 정리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { trim } from 'fp-kit';

const raw = '  Alice ';
const normalized = trim(raw);
// 'Alice'`}
    />
  </div>
);
