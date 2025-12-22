import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Unzip_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      unzip
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      쌍(pair) 배열을 두 개의 별도 배열로 분리합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      unzip이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        unzip
      </strong>{' '}
      은 쌍(두 요소를 가진 튜플) 배열을 받아서 두 개의 별도 배열로 분리합니다.
      <br />
      <br />
      이는 <code>zip</code>의 역연산입니다. zip이 두 배열을 쌍의 배열로 결합하는 반면,
      unzip은 쌍의 배열을 받아서 다시 두 개의 배열로 분리합니다. 첫 번째 배열은 각 쌍의
      첫 번째 요소들을 모두 포함하고, 두 번째 배열은 두 번째 요소들을 모두 포함합니다.
      <br />
      <br />
      이는 쌍으로 된 데이터를 따로 처리해야 할 때나 zip 연산을 취소해야 할 때 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

const pairs: Array<[number, string]> = [
  [1, 'a'],
  [2, 'b'],
  [3, 'c']
];

const [numbers, letters] = unzip(pairs);

console.log(numbers);  // [1, 2, 3]
console.log(letters);  // ['a', 'b', 'c']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      쌍 분리하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// 숫자와 문자열 쌍
const data: Array<[number, string]> = [
  [1, '일'],
  [2, '이'],
  [3, '삼']
];

const [nums, words] = unzip(data);
// nums: [1, 2, 3]
// words: ['일', '이', '삼']

// 다른 타입
const mixed: Array<[string, boolean]> = [
  ['활성', true],
  ['대기', false],
  ['완료', true]
];

const [statuses, flags] = unzip(mixed);
// statuses: ['활성', '대기', '완료']
// flags: [true, false, true]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      빈 배열
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// 빈 입력은 두 개의 빈 배열을 반환
const [left, right] = unzip([]);
// left: []
// right: []`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      zip과의 관계
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { zip, unzip } from 'fp-kit';

const array1 = [1, 2, 3];
const array2 = ['a', 'b', 'c'];

// zip은 두 배열을 결합
const zipped = zip(array1, array2);
// [[1, 'a'], [2, 'b'], [3, 'c']]

// unzip은 다시 분리
const [first, second] = unzip(zipped);
// first: [1, 2, 3]
// second: ['a', 'b', 'c']

// 역연산 관계
console.log(first);   // 원래 array1과 동일
console.log(second);  // 원래 array2와 동일`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      키-값 쌍 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// Object.entries 결과에서 키와 값 추출
const config = {
  host: 'localhost',
  port: 3000,
  debug: true
};

const entries = Object.entries(config) as Array<[string, string | number | boolean]>;
// [['host', 'localhost'], ['port', 3000], ['debug', true]]

const [keys, values] = unzip(entries);
// keys: ['host', 'port', 'debug']
// values: ['localhost', 3000, true]

console.log('설정 키:', keys.join(', '));
console.log('설정 값:', values);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      좌표 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

interface Point {
  x: number;
  y: number;
}

// 포인트 객체를 좌표 쌍으로 변환
const points: Point[] = [
  { x: 10, y: 20 },
  { x: 30, y: 40 },
  { x: 50, y: 60 }
];

const coordinatePairs: Array<[number, number]> = points.map(p => [p.x, p.y]);

// 처리를 위해 x와 y 배열로 분리
const [xCoords, yCoords] = unzip(coordinatePairs);
// xCoords: [10, 30, 50]
// yCoords: [20, 40, 60]

// 경계 계산
const minX = Math.min(...xCoords);
const maxX = Math.max(...xCoords);
const minY = Math.min(...yCoords);
const maxY = Math.max(...yCoords);

console.log(\`경계 상자: (\${minX}, \${minY})에서 (\${maxX}, \${maxY})까지\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      시계열 데이터
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// 타임스탬프-값 쌍으로 된 시계열 데이터
const timeSeries: Array<[number, number]> = [
  [1609459200000, 100],  // 2021-01-01: 100
  [1609545600000, 120],  // 2021-01-02: 120
  [1609632000000, 115],  // 2021-01-03: 115
  [1609718400000, 130],  // 2021-01-04: 130
];

// 차트를 위해 타임스탬프와 값 분리
const [timestamps, values] = unzip(timeSeries);

// timestamps: [1609459200000, 1609545600000, 1609632000000, 1609718400000]
// values: [100, 120, 115, 130]

// 이제 차트 라이브러리에서 별도로 사용 가능
const chartData = {
  labels: timestamps.map(ts => new Date(ts).toLocaleDateString()),
  datasets: [{
    data: values,
    label: '매출'
  }]
};`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터베이스 쿼리 결과
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

interface UserScore {
  userId: string;
  score: number;
}

// 쿼리가 사용자-점수 쌍을 반환
const results: Array<[string, number]> = [
  ['user1', 85],
  ['user2', 92],
  ['user3', 78],
  ['user4', 95]
];

// 다른 처리를 위해 분리
const [userIds, scores] = unzip(results);

// 점수 통계 계산
const average = scores.reduce((a, b) => a + b, 0) / scores.length;
const highest = Math.max(...scores);

// 최고 점수 사용자 찾기
const topUserIndex = scores.indexOf(highest);
const topUser = userIds[topUserIndex];

console.log(\`평균 점수: \${average}\`);
console.log(\`최고 성적: \${topUser}님 \${highest}점\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      라벨-데이터 분리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unzip } from 'fp-kit';

// 머신러닝 훈련 데이터
const trainingData: Array<[string, number[]]> = [
  ['고양이', [0.2, 0.8, 0.1]],
  ['개', [0.7, 0.1, 0.2]],
  ['새', [0.1, 0.3, 0.9]],
];

// 라벨과 특징 분리
const [labels, features] = unzip(trainingData);

// labels: ['고양이', '개', '새']
// features: [[0.2, 0.8, 0.1], [0.7, 0.1, 0.2], [0.1, 0.3, 0.9]]

// 이제 ML 파이프라인에서 별도로 사용 가능
const model = trainModel(features, labels);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, filter, unzip } from 'fp-kit';

interface Transaction {
  id: string;
  amount: number;
}

const transactions: Transaction[] = [
  { id: 't1', amount: 100 },
  { id: 't2', amount: -50 },
  { id: 't3', amount: 200 },
  { id: 't4', amount: -30 },
];

// 양수 거래만 처리하고 분리
const processTransactions = pipe(
  (txns: Transaction[]) => txns.map(t => [t.id, t.amount] as [string, number]),
  filter(([_, amount]: [string, number]) => amount > 0),
  unzip
);

const [ids, amounts] = processTransactions(transactions);
// ids: ['t1', 't3']
// amounts: [100, 200]

console.log(\`양수 거래 합계: $\${amounts.reduce((a, b) => a + b, 0)}\`);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      zip과 unzip
    </h2>

    <div class="grid gap-6 mt-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          zip: 두 배열 결합
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200 mb-3">
          두 개의 별도 배열을 받아서 쌍의 배열로 결합합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`zip([1, 2, 3], ['a', 'b', 'c'])
// [[1, 'a'], [2, 'b'], [3, 'c']]`}
        />
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          unzip: 쌍 분리
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200 mb-3">
          쌍의 배열을 받아서 두 개의 배열로 분리합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`unzip([[1, 'a'], [2, 'b'], [3, 'c']])
// [[1, 2, 3], ['a', 'b', 'c']]`}
        />
      </div>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { zip, unzip } from 'fp-kit';

// 역연산 관계
const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];

// zip 후 unzip하면 원래 배열 반환
const [result1, result2] = unzip(zip(arr1, arr2));
// result1 === [1, 2, 3]
// result2 === ['a', 'b', 'c']

// unzip 후 zip하면 원래 쌍 반환
const pairs = [[1, 'a'], [2, 'b'], [3, 'c']] as Array<[number, string]>;
const [left, right] = unzip(pairs);
const reconstructed = zip(left, right);
// reconstructed === [[1, 'a'], [2, 'b'], [3, 'c']]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 특징
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. zip의 역연산
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          zip의 반대 연산을 수행합니다. zip된 데이터에서 원래 배열을 재구성할 수 있습니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 타입 안정성
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          변환 과정에서 TypeScript 타입을 유지합니다. 입력과 출력 타입이 올바르게 추론됩니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 튜플 구조 분해
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          배열 구조 분해 문법을 사용하여 두 개의 별도 배열로 구조 분해할 수 있는
          튜플을 반환합니다.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 성능
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          O(n) 시간 복잡도이며, n은 쌍의 개수입니다. 두 개의 새 배열을 생성합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/ko/array/zip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/zip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          zip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          두 배열을 결합하는 역연산인 zip에 대해 알아보세요.
        </p>
      </a>

      <a
        href="/ko/array/zipIndex"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/zipIndex');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          zipIndex →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          배열 요소를 인덱스와 쌍으로 만드는 방법을 알아보세요.
        </p>
      </a>
    </div>
  </div>
);
