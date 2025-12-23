import { CodeBlock } from '@/components/CodeBlock';

export const Match_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      match
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      정규식을 문자열에 매칭합니다 (커링 없음)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      match란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        match
      </strong>{' '}
      는 <code>RegExp</code>를 문자열에 적용해 <code>String.prototype.match</code>와 같은 결과를 반환합니다. 호출 형태는
      <code>match(pattern, str)</code>이며, 매치 배열이나 <code>null</code>을 돌려줍니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { match } from 'fp-kit';

match(/ba./g, 'banana'); // ['ban']
match(/xyz/, 'banana');  // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      전역 매치
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { match } from 'fp-kit';

match(/\\d+/g, 'a1b22c333'); // ['1', '22', '333']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      선택적 매치
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { match } from 'fp-kit';

const res = match(/foo/, 'bar');
if (res) {
  // res[0] 사용
}`}
    />
  </div>
);
