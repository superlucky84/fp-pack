import { CodeBlock } from '@/components/CodeBlock';

export const Replace_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      replace
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      문자열의 일부를 교체합니다 (커링 없음)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      replace란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        replace
      </strong>{' '}
      는 <code>String.prototype.replace</code>를 데이터-마지막 비커링 형태로 감싼 함수입니다: <code>replace(pattern, replacement, str)</code>.
      문자열/정규식 패턴을 모두 지원하며, 모든 발생을 바꾸려면 전역 정규식을 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

replace('foo', 'bar', 'foo foo');       // 'bar foo' (첫 번째만)
replace(/foo/g, 'bar', 'foo foo');      // 'bar bar' (전역)
replace(/a./g, 'x', 'abcdab');          // 'xcdx'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      단순 치환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

replace('http:', 'https:', 'http://example.com'); // 'https://example.com'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      패턴 기반 치환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { replace } from 'fp-kit';

const snakeToDash = (input: string) => replace(/_/g, '-', input);

snakeToDash('hello_world'); // 'hello-world'`}
    />
  </div>
);
