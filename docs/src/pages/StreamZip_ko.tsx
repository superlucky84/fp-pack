import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamZip_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      zip (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      두 이터러블을 지연 평가로 쌍으로 결합하여 병렬로 처리합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream zip이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        zip
      </strong>{' '}
      은 두 이터러블을 요소별로 결합하여 튜플 <code class="text-sm">[A, B]</code>로 만듭니다. 두 소스를 병렬로 처리하며 짧은 이터러블이 소진되면 중지됩니다. 이 함수는 지연 평가를 사용하므로 필요할 때만 쌍이 생성됩니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      다음과 같은 경우에 특히 유용합니다:
    </p>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>열거를 위해 인덱스와 값을 결합해야 할 때</li>
      <li>두 동기화된 소스의 데이터를 병합할 때 (예: 타임스탬프와 값)</li>
      <li>레이블이나 헤더를 해당 데이터에 매핑하고 싶을 때</li>
      <li>쌍으로 묶어야 하는 병렬 데이터 스트림을 처리할 때</li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { zip, toArray } from 'fp-pack/stream';

// 기본 사용법
const names = ['Alice', 'Bob', 'Charlie'];
const ages = [25, 30, 35, 40]; // 추가 요소는 무시됨

const pairs = toArray(zip(ages, names));
// [['Alice', 25], ['Bob', 30], ['Charlie', 35]]
// 짧은 이터러블(names)의 길이에서 중지`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`// 동기 이터러블
function zip<A, B>(
  other: Iterable<B>,
  iterable: Iterable<A>
): IterableIterator<[A, B]>;

// 비동기 이터러블
function zip<A, B>(
  other: AnyIterableInput<PromiseLikeValue<B>>,
  iterable: AnyIterableInput<PromiseLikeValue<A>>
): AsyncIterableIterator<[A, B]>;

// 커리된 동기 버전
function zip<A, B>(
  other: Iterable<B>
): (iterable: Iterable<A>) => IterableIterator<[A, B]>;

// 커리된 비동기 버전
function zip<A, B>(
  other: AnyIterableInput<PromiseLikeValue<B>>
): (iterable: AnyIterableInput<PromiseLikeValue<A>>) => AsyncIterableIterator<[A, B]>;`}
    />

    <div class="mt-6 space-y-3 text-sm md:text-base text-gray-700 dark:text-gray-300">
      <p><strong>매개변수:</strong></p>
      <ul class="list-disc list-inside space-y-2 ml-4">
        <li>
          <code class="text-sm">other: Iterable&lt;B&gt;</code> - 결합할 두 번째 이터러블 (튜플의 두 번째 요소 제공)
        </li>
        <li>
          <code class="text-sm">iterable: Iterable&lt;A&gt;</code> - 첫 번째 이터러블 (튜플의 첫 번째 요소 제공)
        </li>
      </ul>
      <p><strong>반환값:</strong></p>
      <ul class="list-disc list-inside space-y-2 ml-4">
        <li>
          <code class="text-sm">IterableIterator&lt;[A, B]&gt;</code> - 두 이터러블의 요소를 결합한 튜플을 산출하는 이터레이터
        </li>
        <li>
          둘 중 하나의 이터러블이 소진되면 중지 (짧은 이터러블의 길이 사용)
        </li>
      </ul>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      zip vs zipWith vs Object.entries
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      각 페어링 함수를 언제 사용해야 하는지 이해하기:
    </p>

    <div class="mb-6 p-6 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
      <CodeBlock
        language="typescript"
        code={`import { zip, zipWith } from 'fp-pack/stream';

const names = ['Alice', 'Bob', 'Charlie'];
const scores = [95, 87, 92];

// zip: 튜플 [A, B] 생성
toArray(zip(scores, names));
// [['Alice', 95], ['Bob', 87], ['Charlie', 92]]

// zipWith: 사용자 정의 변환 적용
toArray(zipWith((name, score) => \`\${name}: \${score}\`, scores, names));
// ['Alice: 95', 'Bob: 87', 'Charlie: 92']

// Object.entries: 객체 전용, [key, value] 반환
Object.entries({ alice: 95, bob: 87 });
// [['alice', 95], ['bob', 87]]

// zip은 모든 이터러블과 작동
const set1 = new Set([1, 2, 3]);
const set2 = new Set(['a', 'b', 'c']);
toArray(zip(set2, set1));
// [[1, 'a'], [2, 'b'], [3, 'c']]`}
      />
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실용적인 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      1. 인덱스로 열거하기
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      열거를 위해 요소에 인덱스 추가 (Python의 <code class="text-sm">enumerate</code>와 유사):
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, zip, map, toArray } from 'fp-pack/stream';

const items = ['Apple', 'Banana', 'Cherry'];

// 1부터 시작하는 인덱스로 열거 목록 생성
const enumerated = pipe(
  zip(range(1, Infinity), items),
  map(([item, index]) => \`\${index}. \${item}\`),
  toArray
);

console.log(enumerated);
// ['1. Apple', '2. Banana', '3. Cherry']

// 또는 사용자 정의 시작 인덱스
const startFrom5 = pipe(
  zip(range(5, Infinity), items),
  toArray
);
// [['Apple', 5], ['Banana', 6], ['Cherry', 7]]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. 레이블과 데이터 결합
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      구조화된 데이터 처리를 위해 열 헤더를 행 값에 매핑:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { zip, map, toArray } from 'fp-pack/stream';

const headers = ['Name', 'Age', 'City'];
const row1 = ['Alice', 25, 'NYC'];
const row2 = ['Bob', 30, 'LA'];

// 행을 객체로 변환
const parseRow = (row: any[]) =>
  pipe(
    zip(row, headers),
    (pairs) => Object.fromEntries(pairs)
  );

console.log(parseRow(row1));
// { Name: 'Alice', Age: 25, City: 'NYC' }

console.log(parseRow(row2));
// { Name: 'Bob', Age: 30, City: 'LA' }

// CSV 형태 데이터 처리
function* csvRows() {
  yield ['Alice', 25, 'NYC'];
  yield ['Bob', 30, 'LA'];
  yield ['Charlie', 35, 'SF'];
}

const records = pipe(
  csvRows(),
  map(parseRow),
  toArray
);
// [
//   { Name: 'Alice', Age: 25, City: 'NYC' },
//   { Name: 'Bob', Age: 30, City: 'LA' },
//   { Name: 'Charlie', Age: 35, City: 'SF' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. 병렬 API 응답 병합
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      관련 정보를 반환하는 두 API 엔드포인트의 데이터 결합:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-pack';
import { zip, map, toArray } from 'fp-pack/stream';

// 사용자 프로필과 통계를 병렬로 가져오기
async function fetchUserData(userIds: number[]) {
  const [profiles, stats] = await Promise.all([
    fetch('/api/profiles').then(r => r.json()),
    fetch('/api/stats').then(r => r.json())
  ]);

  // 프로필과 통계 결합
  return await pipeAsync(
    zip(stats, profiles),
    map(([profile, stat]) => ({
      ...profile,
      totalPosts: stat.posts,
      followers: stat.followers,
      engagement: stat.likes / stat.posts
    })),
    toArray
  );
}

// 사용법
const userData = await fetchUserData([1, 2, 3]);
// [
//   { id: 1, name: 'Alice', totalPosts: 42, followers: 1200, engagement: 28.5 },
//   { id: 2, name: 'Bob', totalPosts: 38, followers: 890, engagement: 23.4 },
//   ...
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. 타임스탬프와 이벤트 쌍 만들기
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      로깅이나 분석을 위해 이벤트에 타이밍 정보 첨부:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { zip, map, filter, toArray } from 'fp-pack/stream';

// 타임스탬프와 함께 이벤트 생성
function* eventStream() {
  yield { type: 'click', target: 'button' };
  yield { type: 'scroll', position: 100 };
  yield { type: 'click', target: 'link' };
}

function* timestampStream() {
  yield Date.now();
  yield Date.now() + 100;
  yield Date.now() + 250;
}

// 이벤트에 타임스탬프 추가
const timedEvents = pipe(
  zip(timestampStream(), eventStream()),
  map(([event, timestamp]) => ({
    ...event,
    timestamp,
    readableTime: new Date(timestamp).toISOString()
  })),
  toArray
);

// 필터링 및 분석
const clicks = pipe(
  zip(timestampStream(), eventStream()),
  filter(([event]) => event.type === 'click'),
  map(([event, timestamp]) => ({
    target: event.target,
    time: timestamp
  })),
  toArray
);

console.log(clicks);
// [
//   { target: 'button', time: 1704067200000 },
//   { target: 'link', time: 1704067200250 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. 행렬의 행과 열 결합
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      행과 열 정보를 쌍으로 만들어 표 형식 데이터 처리:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { range, zip, map, flatMap, toArray } from 'fp-pack/stream';

// 그리드의 좌표 쌍 생성
const createGrid = (rows: number, cols: number) =>
  pipe(
    range(0, rows),
    flatMap(row =>
      pipe(
        range(0, cols),
        map(col => [row, col] as [number, number])
      )
    ),
    toArray
  );

const grid = createGrid(3, 3);
// [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], ...]

// 좌표와 함께 행렬 값 처리
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const processMatrix = (matrix: number[][]) =>
  pipe(
    matrix,
    flatMap((row, rowIdx) =>
      pipe(
        zip(range(0, row.length), row),
        map(([value, colIdx]) => ({
          row: rowIdx,
          col: colIdx,
          value,
          diagonal: rowIdx === colIdx
        }))
      )
    ),
    toArray
  );

const processed = processMatrix(matrix);
// [
//   { row: 0, col: 0, value: 1, diagonal: true },
//   { row: 0, col: 1, value: 2, diagonal: false },
//   ...
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. 병렬 비동기 스트림 처리
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      자동 Promise 처리로 여러 비동기 데이터 소스 결합:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-pack';
import { zip, map, filter, toArray } from 'fp-pack/stream';

// 실시간 데이터를 위한 비동기 제너레이터
async function* sensorA() {
  yield await Promise.resolve({ temp: 22.5, time: Date.now() });
  yield await Promise.resolve({ temp: 23.1, time: Date.now() + 1000 });
  yield await Promise.resolve({ temp: 22.8, time: Date.now() + 2000 });
}

async function* sensorB() {
  yield await Promise.resolve({ humidity: 45, time: Date.now() });
  yield await Promise.resolve({ humidity: 47, time: Date.now() + 1000 });
  yield await Promise.resolve({ humidity: 46, time: Date.now() + 2000 });
}

// 센서 읽기 결합
const combinedReadings = await pipeAsync(
  zip(sensorB(), sensorA()),
  map(([readingA, readingB]) => ({
    timestamp: readingA.time,
    temperature: readingA.temp,
    humidity: readingB.humidity,
    heatIndex: readingA.temp + (readingB.humidity * 0.1)
  })),
  filter(reading => reading.temperature > 23),
  toArray
);

// Promise로 감싸진 이터러블과도 작동
const dataA = Promise.resolve([1, 2, 3]);
const dataB = Promise.resolve(['a', 'b', 'c']);

const result = await pipeAsync(
  zip(dataB, dataA),
  toArray
);
// [[1, 'a'], [2, 'b'], [3, 'c']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      성능 고려사항
    </h2>

    <div class="p-6 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded mb-6">
      <p class="text-sm md:text-base text-green-900 dark:text-green-100 font-semibold mb-2">
        💡 지연 평가의 장점
      </p>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 mb-3">
        <code class="text-sm">zip</code>은 지연 평가를 사용합니다 - 쌍은 소비될 때만 생성됩니다. 대용량 또는 무한 이터러블에 메모리 효율적입니다.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { pipe } from 'fp-pack';
import { range, zip, take, toArray } from 'fp-pack/stream';

// 효율적: 무한 범위에서도 3개의 쌍만 생성
const first3 = pipe(
  zip(range(0, Infinity), range(100, Infinity)),
  take(3),
  toArray
);
// [[0, 100], [1, 101], [2, 102]]

// 대용량 데이터셋에 메모리 효율적
const largeData1 = range(0, 1000000);
const largeData2 = range(0, 1000000);

// 필요한 것만 구체화
const sample = pipe(
  zip(largeData2, largeData1),
  take(10),  // 100만 개가 아닌 10개의 쌍만 처리
  toArray
);`}
      />
    </div>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>짧은 이터러블에서 중지:</strong> 오류 없이 길이 불일치를 자동 처리</li>
      <li><strong>조합을 위한 커링:</strong> 파이프 체인에 완벽 - <code class="text-sm">pipe(data, zip(labels), ...)</code></li>
      <li><strong>제너레이터와 작동:</strong> 무한 또는 지연 시퀀스를 효율적으로 zip 가능</li>
      <li><strong>비동기 지원:</strong> Promise와 비동기 이터러블을 자동으로 처리</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">zip</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/zip.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => navigateTo('/stream/zipWith')}
        class="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
      >
        <div class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
          zipWith →
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          사용자 정의 변환 함수로 이터러블 결합
        </div>
      </button>

      <button
        onClick={() => navigateTo('/stream/map')}
        class="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
      >
        <div class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
          map →
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          각 요소를 지연 변환 (zip 이후 유용)
        </div>
      </button>

      <button
        onClick={() => navigateTo('/stream/concat')}
        class="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
      >
        <div class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
          concat →
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          이터러블을 순차적으로 연결 (병렬 zipping과 반대)
        </div>
      </button>

      <button
        onClick={() => navigateTo('/stream/toArray')}
        class="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white dark:bg-gray-800"
      >
        <div class="font-semibold text-blue-600 dark:text-blue-400 mb-2">
          toArray →
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          zip된 스트림을 배열로 구체화
        </div>
      </button>
    </div>
  </div>
);
