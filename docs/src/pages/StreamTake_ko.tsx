import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamTake_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/take
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      처음 N개 값을 지연으로 가져오고 조기 종료
    </p>

    <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
      <p class="text-sm md:text-base text-yellow-900 dark:text-yellow-100">
        <strong class="font-semibold">참고:</strong> data-last 파이프라인에서는 TypeScript가 이 유틸의 최종 데이터 타입을 추론하지 못할 수 있습니다.
        간단한 타입 힌트나 data-first 래핑을 사용하세요. 자세한 내용은{' '}
        <a
          href="/guide/type-usage"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/guide/type-usage');
          }}
          class="underline decoration-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-200"
        >
          타입 활용
        </a>{' '}
        과{' '}
        <a
          href="/guide"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/guide');
          }}
          class="underline decoration-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-200"
        >
          상세 가이드
        </a>
        를 참고하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream/take란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        take
      </strong>{' '}
      는 이터러블에서 처음 <code class="text-sm">N</code>개 값을 산출한 후 즉시 중단하는 지연 이터레이터를 생성합니다.
      이는 무한 또는 매우 큰 스트림에서 제한된 수의 아이템만 필요할 때 매우 중요합니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      다음과 같은 경우에 특히 유용합니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>무한 스트림으로 작업하면서 출력을 제한해야 할 때</li>
      <li>대용량 데이터셋에서 샘플링하거나 미리보기할 때</li>
      <li>페이지네이션 또는 배치 처리를 구현할 때</li>
      <li>반복을 조기에 중단하여 성능을 최적화할 때</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, toArray } from 'fp-pack/stream';

// 처음 3개 아이템 가져오기
const result = pipe(
  take(3),
  toArray
)([1, 2, 3, 4, 5]);
// [1, 2, 3]

// 모든 이터러블에서 작동
const firstTwo = pipe(
  take(2),
  toArray
)('hello');
// ['h', 'e']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function take<T>(
  count: number,
  iterable: Iterable<T>
): IterableIterator<T>;

function take<T>(
  count: number,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

function take<T>(
  count: number
): (iterable: Iterable<T>) => IterableIterator<T>;

function take<T>(
  count: number
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      이 함수는 커리된 스타일과 직접 호출 스타일을 모두 지원하며, 동기 및 비동기 이터러블을 자동으로 처리합니다.
      이터레이터는 지정된 개수를 산출한 후 즉시 중단되어 불필요한 계산을 방지합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      무한 스트림 제한
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, take, map, toArray } from 'fp-pack/stream';

// 무한 시퀀스를 생성하지만 5개만 가져오기
const first5Squares = pipe(
  range,
  map((n: number) => n * n),
  take(5),
  toArray
)(0, Infinity);
// [0, 1, 4, 9, 16]

// 필요한 개수를 미리 알 수 없을 때 ID 생성
const generateIds = () => pipe(
  range,
  map((n: number) => \`id-\${n}\`),
  take(3),
  toArray
)(1, Infinity);

generateIds();
// ['id-1', 'id-2', 'id-3']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 샘플링 및 미리보기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, toArray } from 'fp-pack/stream';

// 대용량 데이터셋에서 처음 몇 개 레코드 미리보기
const previewData = (data: any[]) => pipe(
  take(5),
  toArray
)(data);

const largeDataset = Array.from({ length: 1000000 }, (_, i) => ({ id: i }));
const preview = previewData(largeDataset);
// [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]

// 사용자 댓글 샘플링
interface Comment {
  id: number;
  text: string;
  author: string;
}

const comments: Comment[] = [
  { id: 1, text: 'Great!', author: 'Alice' },
  { id: 2, text: 'Nice work', author: 'Bob' },
  { id: 3, text: 'Awesome', author: 'Charlie' },
  // ... 수천 개 더
];

const firstThreeComments = pipe(take(3), toArray)(comments);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      페이지네이션 구현
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, take, map, toArray } from 'fp-pack/stream';

// 한 페이지의 결과만 가져오기
const fetchPage = async (pageNumber: number, pageSize: number) => {
  const allData = await fetchAllData(); // 잠재적으로 거대한 데이터셋

  return pipe(
    // 올바른 페이지로 건너뛰기
    (data) => data.slice(pageNumber * pageSize),
    take(pageSize),
    toArray
  )(allData);
};

// 더 나은 방법: 지연 연산과 결합
const generatePageNumbers = (totalPages: number) => pipe(
  range,
  take(totalPages),
  map((page: number) => ({
    page,
    label: \`Page \${page + 1}\`,
    url: \`/items?page=\${page}\`
  })),
  toArray
)(0, Infinity);

generatePageNumbers(3);
// [
//   { page: 0, label: 'Page 1', url: '/items?page=0' },
//   { page: 1, label: 'Page 2', url: '/items?page=1' },
//   { page: 2, label: 'Page 3', url: '/items?page=2' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      성능을 위한 조기 종료
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, filter, map, toArray } from 'fp-pack/stream';

// 처음 3명의 유효한 사용자 찾기 (3명을 찾은 후 중단)
const findValidUsers = (users: User[]) => pipe(
  filter((user: User) => user.active && user.verified),
  map((user: User) => user.email),
  take(3),
  toArray
)(users);

// take 없이: 3명을 찾은 후에도 모든 사용자 처리
// take 사용: 3명의 유효한 사용자를 찾은 즉시 중단

// 성능 비교
const millionUsers = Array.from({ length: 1000000 }, (_, i) => ({
  id: i,
  active: i % 2 === 0,
  verified: i % 3 === 0,
  email: \`user\${i}@example.com\`
}));

// ❌ 모든 100만 사용자 처리
const inefficient = millionUsers
  .filter(u => u.active && u.verified)
  .map(u => u.email)
  .slice(0, 3);

// ✅ 3명을 찾은 후 중단 (훨씬 빠름)
const efficient = findValidUsers(millionUsers);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배치 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, toArray } from 'fp-pack/stream';

// 아이템을 배치로 처리
function* getBatch<T>(items: T[], batchSize: number) {
  let offset = 0;
  while (offset < items.length) {
    yield pipe(
      (arr) => arr.slice(offset),
      take(batchSize),
      toArray
    )(items);
    offset += batchSize;
  }
}

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const batches = Array.from(getBatch(items, 3));
// [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
//   [10]
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비동기 이터러블
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { take, toArray } from 'fp-pack/stream';

// 비동기 스트림에서 처음 N개 아이템 가져오기
async function* asyncNumbers() {
  let i = 0;
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield i++;
  }
}

const first5 = await pipe(
  take(5),
  toArray
)(asyncNumbers());
// [0, 1, 2, 3, 4]

// Promise로 감싸진 이터러블에서 작동
const result = await pipe(
  take(2),
  toArray
)(Promise.resolve([1, 2, 3, 4]));
// [1, 2]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      성능 고려사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">take</code>는 조기 종료에 매우 효율적입니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>지연 평가:</strong> 필요한 만큼만 아이템을 처리합니다</li>
      <li><strong>즉시 종료:</strong> 개수에 도달하는 즉시 반복을 중단합니다</li>
      <li><strong>중간 배열 없음:</strong> 소비될 때까지 값을 구체화하지 않습니다</li>
      <li><strong>무한 스트림 안전:</strong> 무한 시퀀스를 안전하게 제한할 수 있습니다</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, take, map, filter, toArray } from 'fp-pack/stream';

// 100만 개가 아닌 100개만 처리
const efficientExample = pipe(
  range,
  filter((n: number) => n % 2 === 0),
  map((n: number) => n * n),
  take(100),
  toArray
)(0, 1000000);

// vs 배열 방식 (모든 100만 개 아이템 처리)
const inefficientExample = Array.from({ length: 1000000 }, (_, i) => i)
  .filter(n => n % 2 === 0)
  .map(n => n * n)
  .slice(0, 100);`}
    />

    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded border border-blue-200 dark:border-blue-800 mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 성능 팁</span>
        <br />
        <br />
        필요한 최대 아이템 수를 알고 있다면 파이프라인에서 <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">take</code>를
        가능한 한 일찍 배치하세요. 이렇게 하면 다운스트림 작업이 불필요한 데이터를 처리하는 것을 방지합니다.
        하지만 가져오기 전에 필터링하거나 변환해야 한다면,{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">take</code>를 그러한 작업 후에 배치하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">take</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/take.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      GitHub에서 보기
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/stream/takeWhile"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/takeWhile');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          takeWhile →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건이 참인 동안 값을 가져옵니다 (조건 기반 take).
        </p>
      </a>

      <a
        href="/stream/drop"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/drop');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          drop →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          처음 N개 값을 건너뛰고 나머지를 산출합니다.
        </p>
      </a>

      <a
        href="/stream/range"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/range');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          range →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          숫자 시퀀스를 생성합니다 (제한을 위해 take와 자주 사용됨).
        </p>
      </a>

      <a
        href="/stream/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건자에 따라 값을 지연 필터링합니다.
        </p>
      </a>
    </div>
  </div>
);
