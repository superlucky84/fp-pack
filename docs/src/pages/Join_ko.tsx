import { CodeBlock } from '@/components/CodeBlock';

export const Join_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      join
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      문자열 배열을 구분자로 결합해 하나의 문자열로 만듭니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      join이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        join
      </strong>{' '}
      은 문자열 배열을 주어진 구분자로 연결해 하나의 문자열을 반환합니다. 빈 배열이면 빈 문자열을 반환하고, 요소가 하나라면
      그대로 반환합니다. 호출 형태는 <code>join(separator, array)</code>입니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { join } from 'fp-kit';

join(',', ['a', 'b', 'c']);       // 'a,b,c'
join(' / ', ['one', 'two']);      // 'one / two'
join('-', []);                    // ''`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      출력 포맷팅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { join } from 'fp-kit';

const tags = ['fp', 'typescript', 'utilities'];
const tagString = join(', ', tags);
// 'fp, typescript, utilities'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      안전한 기본값
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { join } from 'fp-kit';

function renderBreadcrumb(parts: string[]) {
  const path = join(' / ', parts);
  return path || 'Home';
}

renderBreadcrumb([]); // 'Home'
renderBreadcrumb(['Home', 'Docs', 'Join']); // 'Home / Docs / Join'`}
    />
  </div>
);
