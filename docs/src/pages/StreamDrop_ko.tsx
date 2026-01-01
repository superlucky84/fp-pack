import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamDrop_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/drop
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      처음 N개 값을 건너뛰고 나머지를 지연으로 산출
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream/drop이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        drop
      </strong>{' '}
      는 이터러블에서 처음 <code class="text-sm">N</code>개 값을 건너뛴 후, 남은 모든 값을 산출하는 지연 이터레이터를 생성합니다.
      이는 처음 N개 값을 유지하고 나머지를 버리는 <code class="text-sm">take</code>의 반대입니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      다음과 같은 경우에 특히 유용합니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>데이터셋에서 헤더 행이나 메타데이터를 건너뛸 때</li>
      <li>특정 페이지 오프셋으로 건너뛰어 페이지네이션을 구현할 때</li>
      <li>스트림에서 워밍업 또는 보정 데이터를 제거할 때</li>
      <li>알려진 수의 초기 아이템 이후의 데이터를 처리할 때</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, toArray } from 'fp-pack/stream';

// 처음 2개 아이템 건너뛰기
const result = pipe(
  drop(2),
  toArray
)([1, 2, 3, 4, 5]);
// [3, 4, 5]

// 아무것도 건너뛰지 않음 (count 0)
const noSkip = pipe(
  drop(0),
  toArray
)([1, 2, 3]);
// [1, 2, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function drop<T>(
  count: number,
  iterable: Iterable<T>
): IterableIterator<T>;

function drop<T>(
  count: number,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

function drop<T>(
  count: number
): (iterable: Iterable<T>) => IterableIterator<T>;

function drop<T>(
  count: number
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      이 함수는 커리된 스타일과 직접 호출 스타일을 모두 지원합니다. 동기 및 비동기 이터러블을 자동으로 처리합니다.
      처음 <code class="text-sm">count</code>개 값은 구체화하지 않고 건너뛴 후, 남은 모든 값을 지연으로 산출합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      drop vs take vs dropWhile
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      이러한 건너뛰기/가져오기 함수들 간의 차이점 이해하기:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { drop, take, dropWhile, toArray } from 'fp-pack/stream';

const data = [1, 2, 3, 4, 5];

// drop: 처음 N개 건너뛰기 (고정 개수)
toArray(drop(2, data));
// [3, 4, 5]

// take: 처음 N개 유지 (고정 개수)
toArray(take(2, data));
// [1, 2]

// dropWhile: 조건이 참인 동안 건너뛰기 (조건 기반)
toArray(dropWhile((n: number) => n < 3, data));
// [3, 4, 5]`}
    />

    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded border border-blue-200 dark:border-blue-800 mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 각각 언제 사용할까?</span>
        <br />
        <br />
        정확히 몇 개의 아이템을 건너뛸지 알고 있을 때 (예: 헤더 행, 페이지 오프셋){' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">drop</code>을 사용하세요.
        <br /><br />
        조건이 실패할 때까지 아이템을 건너뛰고 싶을 때{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">dropWhile</code>을 사용하세요.
        <br /><br />
        건너뛰는 대신 처음 N개 아이템을 원할 때{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">take</code>를 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      헤더 행 건너뛰기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, map, toArray } from 'fp-pack/stream';

// 헤더가 있는 CSV 데이터
const csvLines = [
  'Name,Age,City',           // 헤더 행
  'Alice,30,NYC',
  'Bob,25,LA',
  'Charlie,35,Chicago'
];

const parseData = pipe(
  drop(1),                    // 헤더 건너뛰기
  map((line: string) => {
    const [name, age, city] = line.split(',');
    return { name, age: Number(age), city };
  }),
  toArray
);

const data = parseData(csvLines);
// [
//   { name: 'Alice', age: 30, city: 'NYC' },
//   { name: 'Bob', age: 25, city: 'LA' },
//   { name: 'Charlie', age: 35, city: 'Chicago' }
// ]

// 여러 헤더/메타데이터 행 건너뛰기
const dataWithMetadata = [
  '# File: users.csv',
  '# Created: 2024-01-01',
  '# ---',
  'Name,Age',
  'Alice,30',
  'Bob,25'
];

const skipMetadata = pipe(
  drop(3),                    // 모든 메타데이터 건너뛰기
  toArray
)(dataWithMetadata);
// ['Name,Age', 'Alice,30', 'Bob,25']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      페이지네이션 구현
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, take, toArray } from 'fp-pack/stream';

// 특정 페이지의 데이터 가져오기
function getPage<T>(
  data: Iterable<T>,
  pageNumber: number,
  pageSize: number
): T[] {
  const offset = pageNumber * pageSize;

  return pipe(
    drop(offset),             // 페이지 시작으로 건너뛰기
    take(pageSize),           // 페이지 아이템 가져오기
    toArray
  )(data);
}

const allItems = Array.from({ length: 100 }, (_, i) => \`Item \${i}\`);

// 페이지 2 가져오기 (아이템 20-29)
const page2 = getPage(allItems, 2, 10);
// ['Item 20', 'Item 21', ..., 'Item 29']

// 페이지 0 가져오기 (첫 페이지)
const page0 = getPage(allItems, 0, 10);
// ['Item 0', 'Item 1', ..., 'Item 9']

// 효율적: 지연 스트림에서도 작동
function* infiniteItems() {
  let i = 0;
  while (true) yield \`Item \${i++}\`;
}

const page5 = getPage(infiniteItems(), 5, 10);
// ['Item 50', 'Item 51', ..., 'Item 59']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      워밍업 데이터 제거
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, map, toArray } from 'fp-pack/stream';

// 센서 읽기 (처음 몇 개는 보정값)
interface Reading {
  timestamp: number;
  value: number;
}

const sensorReadings: Reading[] = [
  { timestamp: 0, value: 0 },      // 워밍업
  { timestamp: 1, value: 2 },      // 워밍업
  { timestamp: 2, value: 1 },      // 워밍업
  { timestamp: 3, value: 10 },     // 실제 데이터
  { timestamp: 4, value: 12 },
  { timestamp: 5, value: 11 }
];

// 처음 3개 워밍업 읽기 건너뛰기
const actualData = pipe(
  drop(3),
  map((r: Reading) => r.value),
  toArray
)(sensorReadings);
// [10, 12, 11]

// 벤치마크 결과 (워밍업 실행 건너뛰기)
const benchmarkTimes = [150, 145, 140, 100, 98, 102, 99];

const stableResults = pipe(
  drop(3),                   // 처음 3개 워밍업 실행 건너뛰기
  toArray
)(benchmarkTimes);
// [100, 98, 102, 99]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      스트림 오프셋 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, filter, map, toArray } from 'fp-pack/stream';

// 특정 지점 이후의 로그 항목 처리
const logEntries = [
  { id: 1, level: 'info', message: 'Start' },
  { id: 2, level: 'info', message: 'Processing' },
  { id: 3, level: 'warn', message: 'Warning' },
  { id: 4, level: 'error', message: 'Error' },
  { id: 5, level: 'info', message: 'Recovery' },
  { id: 6, level: 'info', message: 'Done' }
];

// ID 3 이후의 항목 가져오기
const recentEntries = pipe(
  drop(3),                   // 처음 3개 건너뛰기
  toArray
)(logEntries);
// id가 4, 5, 6인 항목

// drop과 filter 결합
const recentErrors = pipe(
  drop(2),                   // 처음 2개 건너뛰기
  filter((log) => log.level === 'error'),
  map((log) => log.message),
  toArray
)(logEntries);
// ['Error']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      분할 및 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, take, toArray } from 'fp-pack/stream';

// 데이터를 head와 tail로 분할
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 처음 3개 아이템
const head = pipe(take(3), toArray)(data);
// [1, 2, 3]

// 처음 3개 아이템 이후
const tail = pipe(drop(3), toArray)(data);
// [4, 5, 6, 7, 8, 9, 10]

// 중간 섹션 가져오기
const middle = pipe(
  drop(3),                   // 처음 3개 건너뛰기
  take(4),                   // 다음 4개 가져오기
  toArray
)(data);
// [4, 5, 6, 7]

// 슬라이딩 윈도우: 일부 건너뛰고, 일부 가져오기
function slidingWindows<T>(
  data: T[],
  windowSize: number,
  stride: number
): T[][] {
  const windows: T[][] = [];
  for (let i = 0; i < data.length; i += stride) {
    const window = pipe(
      drop(i),
      take(windowSize),
      toArray
    )(data);
    if (window.length === windowSize) {
      windows.push(window);
    }
  }
  return windows;
}

slidingWindows([1, 2, 3, 4, 5, 6], 3, 2);
// [[1, 2, 3], [3, 4, 5], [5, 6, ...]]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비동기 스트림 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { drop, take, toArray } from 'fp-pack/stream';

// 초기 비동기 값 건너뛰기
async function* asyncNumbers() {
  for (let i = 0; i < 10; i++) {
    await new Promise(resolve => setTimeout(resolve, 10));
    yield i;
  }
}

const afterFirst5 = await pipe(
  drop(5),
  toArray
)(asyncNumbers());
// [5, 6, 7, 8, 9]

// Promise로 감싸진 이터러블에서 작동
const result = await pipe(
  drop(2),
  toArray
)(Promise.resolve([1, 2, 3, 4, 5]));
// [3, 4, 5]

// 오프셋이 있는 API 페이지네이션
async function fetchUsersPage(offset: number, limit: number) {
  async function* fetchAllUsers() {
    // 사용자 가져오기 시뮬레이션
    for (let i = 0; i < 100; i++) {
      yield { id: i, name: \`User \${i}\` };
    }
  }

  return await pipe(
    drop(offset),
    take(limit),
    toArray
  )(fetchAllUsers());
}

const page2Users = await fetchUsersPage(20, 10);
// 사용자 20-29`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      성능 고려사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">drop</code>은 값을 건너뛰는 데 효율적입니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>지연 평가:</strong> 건너뛴 값을 구체화하지 않습니다</li>
      <li><strong>메모리 효율적:</strong> 건너뛴 아이템은 즉시 폐기됩니다</li>
      <li><strong>무한 스트림 작동:</strong> 무한 시퀀스에서 N개 아이템을 건너뛸 수 있습니다</li>
      <li><strong>합성 친화적:</strong> 다른 스트림 연산과 잘 결합됩니다</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, drop, take, map, toArray } from 'fp-pack/stream';

// 효율적: 건너뛴 후의 아이템만 처리
const efficientExample = pipe(
  range,
  drop(1000),                // 처음 1000개 건너뛰기
  take(10),                  // 다음 10개 가져오기
  map((n: number) => n * n),
  toArray
)(0, Infinity);
// [1000000, 1002001, 1004004, ..., 1018081]

// vs 배열 방식 (100만 개 아이템 배열 생성)
// ❌ 비효율적: 전체 배열을 먼저 생성
const inefficientExample = Array.from({ length: 1000000 }, (_, i) => i)
  .slice(1000, 1010)
  .map(n => n * n);

// ✅ 효율적: 필요한 것만 생성
const efficient = pipe(range, drop(1000), take(10), toArray)(0, Infinity);`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">💡 성능 팁</span>
        <br />
        <br />
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">drop</code>은
        중간 배열을 생성하지 않기 때문에 대용량 데이터셋에 대해 배열{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">slice</code>보다 효율적입니다.
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">take</code>와 결합하면
        모든 데이터를 메모리에 로드하지 않고 효율적인 페이지네이션을 제공합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">drop</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/drop.ts"
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
        href="/stream/take"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/take');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          take →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          처음 N개 값을 유지합니다 (drop의 반대).
        </p>
      </a>

      <a
        href="/stream/dropWhile"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/dropWhile');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          dropWhile →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건이 참인 동안 값을 건너뜁니다 (조건 기반 drop).
        </p>
      </a>

      <a
        href="/stream/takeWhile"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/takeWhile');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          takeWhile →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건이 참인 동안 값을 가져옵니다.
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
          조건자에 따라 값을 필터링합니다 (선택적 제거).
        </p>
      </a>
    </div>
  </div>
);
