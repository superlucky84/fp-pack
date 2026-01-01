import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamTakeWhile_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      stream/takeWhile
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건이 참인 동안 값을 지연으로 가져오기
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream/takeWhile란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        takeWhile
      </strong>{' '}
      는 조건 함수가 <code class="text-sm">true</code>를 반환하는 동안 이터러블에서 값을 산출하는 지연 이터레이터를 생성합니다.
      조건이 <code class="text-sm">false</code>를 반환하는 순간, 반복이 즉시 중단되며 더 이상의 값은 확인되지 않습니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      다음과 같은 경우에 특히 유용합니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>경계 조건이 충족될 때까지 정렬된 데이터를 처리할 때</li>
      <li>임계값까지 정렬된 스트림에서 아이템을 수집할 때</li>
      <li>센티널 또는 종료 값이 나타날 때까지 데이터를 읽을 때</li>
      <li>동적 조건에 따른 조기 종료가 필요할 때</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { takeWhile, toArray } from 'fp-pack/stream';

// 5보다 작은 동안 숫자 가져오기
const result = pipe(
  takeWhile((n: number) => n < 5),
  toArray
)([1, 2, 3, 4, 5, 6, 7]);
// [1, 2, 3, 4]

// 첫 false에서 중단, 이후 확인하지 않음
const stopEarly = pipe(
  takeWhile((n: number) => n < 3),
  toArray
)([1, 2, 3, 1, 2]);
// [1, 2] - 3에서 중단, 그 뒤의 1, 2는 보지 않음`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function takeWhile<T>(
  predicate: (value: T) => boolean,
  iterable: Iterable<T>
): IterableIterator<T>;

function takeWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

function takeWhile<T>(
  predicate: (value: T) => boolean
): (iterable: Iterable<T>) => IterableIterator<T>;

function takeWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      이 함수는 커리된 스타일과 직접 호출 스타일을 모두 지원합니다. 조건은 동기 또는 비동기일 수 있습니다.
      첫 번째 <code class="text-sm">false</code> 결과에서 반복이 즉시 중단되어 불필요한 평가를 방지합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      takeWhile vs take vs filter
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      관련 함수들 간의 차이점 이해하기:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { take, takeWhile, filter, toArray } from 'fp-pack/stream';

const data = [1, 2, 3, 4, 1, 2];

// take: 값에 관계없이 고정 개수
toArray(take(3, data));
// [1, 2, 3]

// takeWhile: 조건이 실패할 때까지 (반복 중단)
toArray(takeWhile((n: number) => n < 4, data));
// [1, 2, 3] - 4를 보고 중단

// filter: 일치하는 모든 값 (반복 계속)
toArray(filter((n: number) => n < 4, data));
// [1, 2, 3, 1, 2] - 전체 배열 처리`}
    />

    <div class="bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded border border-purple-200 dark:border-purple-800 mt-6">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">💡 핵심 차이점</span>
        <br />
        <br />
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">takeWhile</code>은 첫 false 값에서
        반복을 중단하는 반면, <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">filter</code>는{' '}
        모든 값을 계속 확인합니다. 데이터가 정렬되어 있고 조기 종료를 원할 때{' '}
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">takeWhile</code>을 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      경계까지 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { takeWhile, toArray } from 'fp-pack/stream';

// 에러가 나타날 때까지 로그 라인 읽기
const logs = [
  { level: 'info', message: 'Starting' },
  { level: 'info', message: 'Processing' },
  { level: 'warn', message: 'Slow response' },
  { level: 'error', message: 'Failed' },
  { level: 'info', message: 'Recovering' }
];

const beforeError = pipe(
  takeWhile((log) => log.level !== 'error'),
  toArray
)(logs);
// [
//   { level: 'info', message: 'Starting' },
//   { level: 'info', message: 'Processing' },
//   { level: 'warn', message: 'Slow response' }
// ]

// 기준 날짜 이전의 타임스탬프 가져오기
const events = [
  { time: new Date('2024-01-01'), event: 'A' },
  { time: new Date('2024-01-02'), event: 'B' },
  { time: new Date('2024-01-05'), event: 'C' },
  { time: new Date('2024-01-10'), event: 'D' }
];

const cutoff = new Date('2024-01-05');
const beforeCutoff = pipe(
  takeWhile((e) => e.time < cutoff),
  toArray
)(events);
// [
//   { time: 2024-01-01, event: 'A' },
//   { time: 2024-01-02, event: 'B' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      정렬된 데이터 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { takeWhile, map, toArray } from 'fp-pack/stream';

// 가격 임계값 이하의 모든 아이템 가져오기 (정렬되었다고 가정)
interface Product {
  name: string;
  price: number;
}

const sortedProducts: Product[] = [
  { name: 'Pen', price: 5 },
  { name: 'Notebook', price: 10 },
  { name: 'Backpack', price: 50 },
  { name: 'Laptop', price: 1000 }
];

const affordable = pipe(
  takeWhile((p: Product) => p.price <= 50),
  map((p: Product) => p.name),
  toArray
)(sortedProducts);
// ['Pen', 'Notebook', 'Backpack']

// 첫 실패까지 점수 가져오기
const testScores = [85, 92, 78, 88, 55, 90, 95];
const passingGrade = 60;

const beforeFailure = pipe(
  takeWhile((score: number) => score >= passingGrade),
  toArray
)(testScores);
// [85, 92, 78, 88] - 55에서 중단`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      제한이 있는 배치 수집
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { takeWhile, toArray } from 'fp-pack/stream';

// 배치 크기 제한까지 아이템 수집
interface Item {
  name: string;
  size: number;
}

const items: Item[] = [
  { name: 'A', size: 10 },
  { name: 'B', size: 15 },
  { name: 'C', size: 20 },
  { name: 'D', size: 30 },
  { name: 'E', size: 5 }
];

const maxBatchSize = 50;
let currentSize = 0;

const batch = pipe(
  takeWhile((item: Item) => {
    if (currentSize + item.size <= maxBatchSize) {
      currentSize += item.size;
      return true;
    }
    return false;
  }),
  toArray
)(items);
// [
//   { name: 'A', size: 10 },
//   { name: 'B', size: 15 },
//   { name: 'C', size: 20 }
// ] - 합계: 45, 다음은 50을 초과`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      마커까지 문자열 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { takeWhile, toArray } from 'fp-pack/stream';

// 구분자까지 라인 읽기
const lines = [
  'Header: Data',
  'Content: More data',
  'Body: Information',
  '---',
  'Footer: End'
];

const beforeDelimiter = pipe(
  takeWhile((line: string) => line !== '---'),
  toArray
)(lines);
// ['Header: Data', 'Content: More data', 'Body: Information']

// 종료 마커까지 설정 파싱
const config = [
  'setting1=value1',
  'setting2=value2',
  'setting3=value3',
  '[END]',
  'ignored=data'
];

const settings = pipe(
  takeWhile((line: string) => !line.startsWith('[END]')),
  map((line: string) => {
    const [key, value] = line.split('=');
    return { key, value };
  }),
  toArray
)(config);
// [
//   { key: 'setting1', value: 'value1' },
//   { key: 'setting2', value: 'value2' },
//   { key: 'setting3', value: 'value3' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비동기 스트림 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { takeWhile, toArray } from 'fp-pack/stream';

// 조건까지 비동기 스트림 처리
async function* fetchPages() {
  let page = 1;
  while (true) {
    const response = await fetch(\`/api/data?page=\${page}\`);
    const data = await response.json();

    if (data.items.length === 0) break;

    for (const item of data.items) {
      yield item;
    }
    page++;
  }
}

// 특정 아이템을 찾을 때까지 수집
const untilTarget = await pipe(
  takeWhile((item: any) => item.id !== 'target-id'),
  toArray
)(fetchPages());

// 비동기 조건으로 처리
const messages = [
  { id: 1, content: 'Hello' },
  { id: 2, content: 'World' },
  { id: 3, content: 'Spam' },
  { id: 4, content: 'Test' }
];

const beforeSpam = await pipe(
  takeWhile(async (msg: any) => {
    const isSpam = await checkSpam(msg.content);
    return !isSpam;
  }),
  toArray
)(messages);
// 첫 스팸 메시지에서 중단`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      상태 기반 조건
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { takeWhile, toArray } from 'fp-pack/stream';

// 임계값까지 누적 합계 유지
const numbers = [5, 10, 15, 20, 25, 30];
let sum = 0;
const threshold = 50;

const beforeThreshold = pipe(
  takeWhile((n: number) => {
    sum += n;
    return sum <= threshold;
  }),
  toArray
)(numbers);
// [5, 10, 15, 20] - 합계는 50, 다음은 초과

// 연속된 중복 가져오기
const values = [1, 1, 1, 2, 2, 3, 3, 3];
let expected = values[0];

const firstGroup = pipe(
  takeWhile((n: number) => n === expected),
  toArray
)(values);
// [1, 1, 1]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      성능 고려사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">takeWhile</code>은 효율적인 조기 종료를 제공합니다:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>지연 평가:</strong> 조건이 실패할 때까지만 아이템을 처리합니다</li>
      <li><strong>즉시 종료:</strong> 첫 false 조건 결과에서 중단합니다</li>
      <li><strong>후처리 없음:</strong> 중단 후 남은 아이템을 확인하지 않습니다</li>
      <li><strong>정렬된 데이터에 이상적:</strong> 조건에 명확한 경계가 있을 때 가장 효율적입니다</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { takeWhile, filter, toArray } from 'fp-pack/stream';

const largeSortedArray = Array.from({ length: 1000000 }, (_, i) => i);

// ✅ 효율적: 약 1000개 아이템 확인 후 중단
const takeWhileResult = pipe(
  takeWhile((n: number) => n < 1000),
  toArray
)(largeSortedArray);

// ❌ 비효율적: 모든 100만 개 아이템 확인
const filterResult = pipe(
  filter((n: number) => n < 1000),
  toArray
)(largeSortedArray);

// 둘 다 [0, 1, 2, ..., 999]를 생성
// 하지만 takeWhile은 1000에서 중단, filter는 모든 100만 개 아이템 확인`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">💡 성능 팁</span>
        <br />
        <br />
        데이터가 정렬되어 있고 경계 조건이 있을 때 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">takeWhile</code>을
        사용하세요. 모든 아이템을 확인해야 하는 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">filter</code>와 달리
        즉시 반복을 중단합니다. 이는 대용량 데이터셋에서 엄청난 성능 향상을 제공할 수 있습니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">takeWhile</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/takeWhile.ts"
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
          고정된 개수의 값을 가져옵니다 (개수 기반 take).
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
          조건이 참인 동안 값을 건너뜁니다 (takeWhile의 반대).
        </p>
      </a>

      <a
        href="/stream/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건자에 따라 모든 값을 필터링합니다 (반복 계속).
        </p>
      </a>

      <a
        href="/stream/drop"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/drop');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          drop →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          처음 N개 값을 건너뛰고 나머지를 산출합니다.
        </p>
      </a>
    </div>
  </div>
);
