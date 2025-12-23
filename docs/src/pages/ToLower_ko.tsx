import { CodeBlock } from '@/components/CodeBlock';

export const ToLower_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      toLower
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      문자열을 소문자로 변환
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      toLower란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        toLower
      </strong>{' '}
      는 입력 문자열을 소문자로 변환합니다. 정규화, 대소문자 무시 비교, 검색 인덱싱 등에 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { toLower } from 'fp-kit';

toLower('Hello');   // 'hello'
toLower('FP-KIT');  // 'fp-kit'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      입력 값 정규화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { toLower } from 'fp-kit';

const emails = ['Alice@Example.com', 'BOB@EXAMPLE.COM'];
const normalized = emails.map(toLower);
// ['alice@example.com', 'bob@example.com']`}
    />
  </div>
);
