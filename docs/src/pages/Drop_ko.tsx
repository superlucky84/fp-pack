import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Drop_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      drop
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      배열의 앞에서 n개의 요소 제거
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      drop이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        drop
      </strong>{' '}
      은 배열의 앞에서 n개의 요소를 제거하고 나머지 요소들을 포함하는 새 배열을 반환합니다.
      n이 배열 길이보다 크면 빈 배열을 반환합니다. n이 0 이하이면 원본 배열을 변경 없이 반환합니다.
      <br />
      <br />
      이는 <strong>항목 건너뛰기</strong>, <strong>페이지네이션</strong>,
      <strong>헤더 제거</strong>, 그리고 <strong>스트림 처리</strong>에 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6];

drop(2, numbers);
// [3, 4, 5, 6]

drop(4, numbers);
// [5, 6]

drop(10, numbers);
// []  (길이 초과)

drop(0, numbers);
// [1, 2, 3, 4, 5, 6]  (변경 없음)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function drop<T>(n: number, arr: T[]): T[];

// 제거할 요소의 개수와 배열을 받음
// 앞의 n개 요소를 제거한 배열을 반환`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      개수는 자동으로 정수로 내림됩니다. n이 0, 음수, 또는 유한하지 않으면
      원본 배열이 변경 없이 반환됩니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 예시
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-kit';

// 첫 3개 요소 제거
const skipThree = drop(3, [1, 2, 3, 4, 5, 6, 7]);
// [4, 5, 6, 7]

// 첫 번째 요소 제거
const tail = drop(1, ['a', 'b', 'c', 'd']);
// ['b', 'c', 'd']

// 길이보다 많이 제거
const tooMany = drop(10, [1, 2, 3]);
// []

// 아무것도 제거하지 않음
const none = drop(0, [1, 2, 3]);
// [1, 2, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      페이지네이션 - 이전 페이지 건너뛰기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-kit';
import { chunk } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
}

const allProducts: Product[] = [
  { id: 1, name: '노트북', price: 1000 },
  { id: 2, name: '마우스', price: 25 },
  { id: 3, name: '키보드', price: 75 },
  { id: 4, name: '모니터', price: 300 },
  { id: 5, name: '헤드폰', price: 150 },
  { id: 6, name: '웹캠', price: 80 },
  { id: 7, name: '마이크', price: 120 },
  { id: 8, name: '스피커', price: 90 },
];

const ITEMS_PER_PAGE = 3;
const currentPage = 2; // 0-based index

// 이전 페이지의 항목들 건너뛰기
const offset = currentPage * ITEMS_PER_PAGE;
const remainingItems = drop(offset, allProducts);
const currentPageItems = remainingItems.slice(0, ITEMS_PER_PAGE);

console.log(currentPageItems);
// [{ id: 7, name: '마이크', ... }, { id: 8, name: '스피커', ... }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      CSV 처리 - 헤더 행 제거
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-kit';

const csvLines = [
  '이름,나이,도시',        // 헤더 행
  'Alice,30,서울',
  'Bob,25,부산',
  'Charlie,35,대구',
];

// 헤더 행 제거
const dataRows = drop(1, csvLines);
// ['Alice,30,서울', 'Bob,25,부산', 'Charlie,35,대구']

// 데이터 행 파싱
const users = dataRows.map(line => {
  const [name, age, city] = line.split(',');
  return { name, age: parseInt(age), city };
});

console.log(users);
// [
//   { name: 'Alice', age: 30, city: '서울' },
//   { name: 'Bob', age: 25, city: '부산' },
//   { name: 'Charlie', age: 35, city: '대구' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 처리 - 초기 요소 건너뛰기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-kit';
import { pipe } from 'fp-kit';

// 워밍업 샘플을 제거하여 배열 처리
const sensorReadings = [12, 15, 18, 100, 102, 98, 101, 99, 103];

const WARMUP_SAMPLES = 3;

const processReadings = pipe(
  (readings) => drop(WARMUP_SAMPLES, readings),
  (readings) => readings.reduce((a, b) => a + b, 0) / readings.length
);

const averageReading = processReadings(sensorReadings);
// 100.5 ([100, 102, 98, 101, 99, 103]의 평균)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      브레드크럼 네비게이션
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-kit';

const fullPath = ['홈', '제품', '전자기기', '노트북', '게이밍'];

// 특정 레벨부터 하위 경로 가져오기
const fromProducts = drop(1, fullPath);
// ['제품', '전자기기', '노트북', '게이밍']

const fromElectronics = drop(2, fullPath);
// ['전자기기', '노트북', '게이밍']

// 브레드크럼 링크 생성
const buildBreadcrumb = (pathSegments: string[], dropCount: number) => {
  return drop(dropCount, pathSegments).join(' > ');
};

console.log(buildBreadcrumb(fullPath, 0));
// '홈 > 제품 > 전자기기 > 노트북 > 게이밍'

console.log(buildBreadcrumb(fullPath, 2));
// '전자기기 > 노트북 > 게이밍'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      일반적인 패턴
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      데이터 처리를 위한 pipe와 함께 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, drop } from 'fp-kit';

const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const result = pipe(
  (arr) => drop(3, arr),                  // 첫 3개 건너뛰기
  (arr) => arr.filter(x => x % 2 === 0),  // 짝수만 유지
  (arr) => arr.map(x => x * 2)            // 2배로 만들기
)(data);

// [6, 8, 10, 12, 14, 16, 18]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      슬라이딩 윈도우 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { drop } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

// 크기 3의 슬라이딩 윈도우로 처리
const WINDOW_SIZE = 3;

for (let i = 0; i <= numbers.length - WINDOW_SIZE; i++) {
  const window = drop(i, numbers).slice(0, WINDOW_SIZE);
  console.log(\`윈도우 \${i + 1}:\`, window);
}

// 윈도우 1: [1, 2, 3]
// 윈도우 2: [2, 3, 4]
// 윈도우 3: [3, 4, 5]
// 윈도우 4: [4, 5, 6]
// 윈도우 5: [5, 6, 7]
// 윈도우 6: [6, 7, 8]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 drop을 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 선언적 배열 슬라이싱
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          의도를 명확하게 표현: "3개 제거"는 array.slice(3)보다 읽기 쉽습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 다른 함수와 조합 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          pipe, compose 및 다른 함수형 유틸리티와 완벽하게 작동하여 강력한 데이터 변환이 가능합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 안전한 엣지 케이스 처리
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          음수, 배열 길이 초과, 유한하지 않은 값 등의 엣지 케이스를 자동으로 처리합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function drop<T>(n: number, arr: T[]): T[] {
  const count = Math.floor(n);
  if (!Number.isFinite(count) || count <= 0) {
    return arr;
  }
  return arr.slice(count);
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>count를 내림하여 정수로 만듭니다</li>
        <li>count가 유한하지 않거나 0 이하이면 원본 배열을 반환합니다</li>
        <li>Array.slice(count)를 사용하여 효율적으로 첫 n개 요소를 제거합니다</li>
        <li>원본을 변경하지 않고 새 배열을 반환합니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        관련된 배열 함수들을 시도해보세요:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/array/filter');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            filter
          </a>{' '}
          - 조건을 만족하는 요소만 남기기
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/array/chunk');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            chunk
          </a>{' '}
          - 배열을 청크로 분할
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/pipe');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            pipe
          </a>{' '}
          - drop을 다른 변환과 연결
        </li>
      </ul>
    </div>
  </div>
);
