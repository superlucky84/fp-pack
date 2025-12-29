import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFlattenDeep_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/flattenDeep
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      깊은 중첩 이터러블을 지연 평탄화
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream/flattenDeep란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        flattenDeep
      </strong>{' '}
      는 중첩된 이터러블을 깊이에 상관없이 하나의 지연 스트림으로 평탄화합니다.
      중첩 깊이를 미리 알 수 없을 때 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flattenDeep, toArray } from 'fp-kit/stream';

const input = [1, [2, [3, 4], 5], [[6]]];
const result = await toArray(flattenDeep(input));
// [1, 2, 3, 4, 5, 6]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function flattenDeep<T>(iterable: Iterable<unknown>): IterableIterator<T>;
function flattenDeep<T>(iterable: AnyIterableInput<PromiseLikeValue<unknown>>): AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      중첩 태그 합치기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flattenDeep, toArray } from 'fp-kit/stream';

const tags = [['frontend', ['ui']], ['design'], [['docs']]];
const flatTags = await toArray(flattenDeep(tags));
// ['frontend', 'ui', 'design', 'docs']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비동기 입력 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flattenDeep, toArray } from 'fp-kit/stream';

const nested = Promise.resolve([1, [2, [3]], [[4]]]);
const result = await toArray(flattenDeep(nested));
// [1, 2, 3, 4]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/stream/flatten"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatten');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          flatten →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          한 단계만 평탄화합니다.
        </p>
      </a>

      <a
        href="/stream/flatMap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          flatMap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          매핑과 1단계 평탄화를 지연으로 수행합니다.
        </p>
      </a>
    </div>
  </div>
);
