import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFlatten_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flatten (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      중첩된 iterable을 단일 레벨 시퀀스로 지연 평탄화합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream flatten이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flatten
      </strong>{' '}
      은 iterable의 iterable을 받아 모든 중첩된 iterable을 연결하여 단일 평탄화된 시퀀스를 생성하는 스트림 유틸리티입니다. 중간 배열을 생성하는 배열 메서드와 달리, 이 함수는 값을 지연 방식으로 처리하여 전체 결과를 메모리에 구체화하지 않고 중첩된 iterable의 각 항목을 한 번에 하나씩 yield합니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      이 함수는 얕은 평탄화(한 레벨 깊이)를 수행하므로 여러 소스의 결과를 결합하거나, 배치 처리 출력을 병합하거나, 자연스럽게 중첩된 청크로 제공되는 데이터를 처리하는 데 적합합니다. 동기 및 비동기 iterable을 모두 지원하며, 추가 설정 없이 비동기 소스를 자동으로 감지하고 처리합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`// 동기 iterable의 iterable
function flatten<T>(
  iterable: Iterable<Iterable<T>>
): IterableIterator<T>;

// 비동기 iterable 또는 비동기 중첩 iterable
function flatten<T>(
  iterable: AnyIterableInput<PromiseLikeValue<Iterable<T>>>
): AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      간단한 평탄화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatten } from 'fp-pack/stream';

// 배열의 배열 평탄화
const nested = [[1, 2], [3, 4], [5]];
const flat = flatten(nested);

console.log(Array.from(flat));
// [1, 2, 3, 4, 5]

// 제너레이터 출력 평탄화
function* generateBatches() {
  yield [1, 2, 3];
  yield [4, 5];
  yield [6, 7, 8, 9];
}

const numbers = flatten(generateBatches());
console.log(Array.from(numbers));
// [1, 2, 3, 4, 5, 6, 7, 8, 9]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      비동기 Iterable과 함께
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flatten, toArray } from 'fp-pack/stream';

async function* fetchBatches() {
  yield Promise.resolve([1, 2, 3]);
  yield Promise.resolve([4, 5]);
  yield Promise.resolve([6, 7]);
}

const asyncFlat = flatten(fetchBatches());
const result = await toArray(asyncFlat);
console.log(result);
// [1, 2, 3, 4, 5, 6, 7]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. 배치 처리 결과 병합
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      배치 작업의 결과를 추가 처리를 위해 단일 스트림으로 병합합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, map, pipe } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
}

// 사용자를 100명씩 배치로 처리
async function* fetchUsersInBatches(
  totalUsers: number,
  batchSize: number = 100
): AsyncIterableIterator<User[]> {
  for (let offset = 0; offset < totalUsers; offset += batchSize) {
    const response = await fetch(
      \`/api/users?offset=\${offset}&limit=\${batchSize}\`
    );
    const batch: User[] = await response.json();
    yield batch;
  }
}

// 배치를 단일 사용자 스트림으로 평탄화
const allUsers = flatten(fetchUsersInBatches(1000));

// 모든 사용자를 메모리에 로드하지 않고 개별적으로 처리
for await (const user of allUsers) {
  console.log(\`사용자 처리 중: \${user.name}\`);
  // 개별 사용자 처리 로직
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. 여러 데이터 소스 병합
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      여러 독립적인 소스의 데이터를 통합된 스트림으로 결합합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten } from 'fp-pack/stream';

interface LogEntry {
  timestamp: Date;
  level: string;
  message: string;
  source: string;
}

async function* readLogsFromDatabase(): AsyncIterableIterator<LogEntry> {
  // 데이터베이스에서 로그 가져오기
  const logs = await fetchDatabaseLogs();
  for (const log of logs) {
    yield log;
  }
}

async function* readLogsFromFiles(): AsyncIterableIterator<LogEntry> {
  // 로그 파일에서 로그 읽기
  const files = await getLogFiles();
  for (const file of files) {
    const logs = await parseLogFile(file);
    for (const log of logs) {
      yield log;
    }
  }
}

async function* readLogsFromCloudStorage(): AsyncIterableIterator<LogEntry> {
  // 클라우드 스토리지에서 로그 가져오기
  const cloudLogs = await fetchCloudLogs();
  for (const log of cloudLogs) {
    yield log;
  }
}

// 모든 로그 소스 결합
const dataSources = [
  readLogsFromDatabase(),
  readLogsFromFiles(),
  readLogsFromCloudStorage(),
];

const allLogs = flatten(dataSources);

// 모든 소스의 로그를 균일하게 처리
for await (const log of allLogs) {
  if (log.level === 'ERROR') {
    console.error(\`[\${log.source}] \${log.message}\`);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. 청크 데이터 처리
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      청크로 도착하는 데이터를 처리하고 균일한 처리를 위해 평탄화합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, filter, pipe } from 'fp-pack';

// 청크 단위로 대용량 파일 읽기 시뮬레이션
function* readFileInChunks(filePath: string): IterableIterator<string[]> {
  const chunkSize = 1000;

  // 실제 구현에서는 실제 파일 읽기
  const mockLines = Array.from({ length: 5000 }, (_, i) =>
    \`Line \${i + 1}: Some data\`
  );

  for (let i = 0; i < mockLines.length; i += chunkSize) {
    yield mockLines.slice(i, i + chunkSize);
  }
}

// 청크를 평탄화하고 라인별로 처리
const processedLines = pipe(
  flatten,
  filter((line: string) => !line.includes('error')),
  function* (lines: Iterable<string>) {
    for (const line of lines) {
      yield line.toUpperCase();
    }
  }
)(readFileInChunks('large-data.txt'));

let lineCount = 0;
for (const line of processedLines) {
  lineCount++;
  // 전체 파일을 로드하지 않고 각 라인 처리
}
console.log(\`\${lineCount}개의 라인 처리 완료\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. 여러 파일 읽기
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      여러 파일의 내용을 읽고 단일 스트림으로 병합합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, map, pipe } from 'fp-pack';
import { readFile } from 'fs/promises';

async function* readFileLines(
  filePath: string
): AsyncIterableIterator<string> {
  const content = await readFile(filePath, 'utf-8');
  const lines = content.split('\\n');

  for (const line of lines) {
    if (line.trim()) {
      yield line;
    }
  }
}

const configFiles = [
  './config/development.json',
  './config/production.json',
  './config/test.json',
];

// 비동기 iterable의 iterable 생성
function* getFileReaders(files: string[]) {
  for (const file of files) {
    yield readFileLines(file);
  }
}

// 모든 파일 내용을 단일 스트림으로 평탄화
const allConfigLines = flatten(getFileReaders(configFiles));

interface ConfigEntry {
  file: string;
  line: string;
}

const configs: ConfigEntry[] = [];
for await (const line of allConfigLines) {
  try {
    const parsed = JSON.parse(line);
    configs.push(parsed);
  } catch (error) {
    console.warn(\`잘못된 JSON 라인 건너뛰기: \${line}\`);
  }
}

console.log(\`\${configs.length}개의 설정 항목 로드 완료\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. 페이지네이션 API 결과
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      페이지네이션된 API 응답을 연속된 항목 스트림으로 평탄화합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, take, pipe } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface PageResponse {
  items: Product[];
  nextPage: number | null;
}

async function* fetchAllPages(): AsyncIterableIterator<Product[]> {
  let currentPage = 1;

  while (currentPage) {
    const response = await fetch(
      \`/api/products?page=\${currentPage}\`
    );
    const data: PageResponse = await response.json();

    yield data.items;

    currentPage = data.nextPage ?? 0;
  }
}

// 페이지를 개별 제품으로 평탄화
const allProducts = flatten(fetchAllPages());

// 제품을 한 번에 하나씩 처리
const processProducts = pipe(
  take(100) // 처음 100개 제품만 처리
);

const limitedProducts = processProducts(allProducts);

for await (const product of limitedProducts) {
  console.log(\`제품: \${product.name} - $\${product.price}\`);
}

// 모든 제품을 로드하지 않고 통계 계산
async function calculateAveragePrice() {
  let total = 0;
  let count = 0;

  const products = flatten(fetchAllPages());

  for await (const product of products) {
    total += product.price;
    count++;
  }

  return count > 0 ? total / count : 0;
}

const avgPrice = await calculateAveragePrice();
console.log(\`평균 가격: $\${avgPrice.toFixed(2)}\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. 데이터 파이프라인에서 스트림 결합
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      데이터 변환 파이프라인에서 여러 처리 스트림을 결합합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flatten, filter, map, pipe } from 'fp-pack';

interface DataPoint {
  sensor: string;
  value: number;
  timestamp: Date;
}

function* sensorA(): IterableIterator<DataPoint> {
  for (let i = 0; i < 100; i++) {
    yield {
      sensor: 'A',
      value: Math.random() * 100,
      timestamp: new Date(Date.now() + i * 1000),
    };
  }
}

function* sensorB(): IterableIterator<DataPoint> {
  for (let i = 0; i < 100; i++) {
    yield {
      sensor: 'B',
      value: Math.random() * 50,
      timestamp: new Date(Date.now() + i * 1000),
    };
  }
}

function* sensorC(): IterableIterator<DataPoint> {
  for (let i = 0; i < 100; i++) {
    yield {
      sensor: 'C',
      value: Math.random() * 75,
      timestamp: new Date(Date.now() + i * 1000),
    };
  }
}

// 모든 센서 스트림 결합
const sensors = [sensorA(), sensorB(), sensorC()];

const processedData = pipe(
  flatten,
  filter((point: DataPoint) => point.value > 25),
  map((point: DataPoint) => ({
    ...point,
    normalized: point.value / 100,
  }))
)(sensors);

const anomalies: DataPoint[] = [];
for (const point of processedData) {
  if (point.normalized > 0.9) {
    anomalies.push(point);
  }
}

console.log(\`\${anomalies.length}개의 이상 징후 발견\`);
anomalies.forEach(anomaly => {
  console.log(
    \`센서 \${anomaly.sensor}: \${anomaly.value.toFixed(2)} ` +
    `at \${anomaly.timestamp.toISOString()}\`
  );
});`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 flatten을 사용할까요?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          메모리 효율적인 병합
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          중간 배열을 생성하지 않고 중첩된 iterable을 지연 방식으로 처리하여 메모리 오버헤드 없이 대용량 데이터셋이나 무한 스트림을 결합하는 데 이상적입니다.
        </p>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
          배치 처리 통합
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          데이터가 배치나 청크로 도착하는 시나리오에 적합하며, 배치 효율성을 유지하면서 개별 항목을 균일하게 처리할 수 있습니다.
        </p>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          다중 소스 통합
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          여러 독립적인 소스(파일, API, 데이터베이스)의 데이터를 일관된 처리를 위해 통합된 스트림으로 원활하게 결합합니다.
        </p>
      </div>

      <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          비동기 준비 설계
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          비동기 iterable을 자동으로 처리하여 수동 프로미스 관리 없이 API 호출이나 파일 I/O 같은 비동기 데이터 소스를 쉽게 다룰 수 있습니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">flatten</code> 함수는 중첩된 iterable의 항목을 한 번에 하나씩 yield하는 지연 이터레이터로 구현됩니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`// 단순화된 구현
function* flatten<T>(
  iterable: Iterable<Iterable<T>>
): IterableIterator<T> {
  for (const nestedIterable of iterable) {
    // 중첩된 iterable의 각 항목 yield
    for (const item of nestedIterable) {
      yield item;
    }
  }
}

// 비동기 지원
async function* flattenAsync<T>(
  iterable: AsyncIterable<Iterable<T>>
): AsyncIterableIterator<T> {
  for await (const nestedIterable of iterable) {
    for await (const item of nestedIterable) {
      yield item;
    }
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      이 함수는 얕은 평탄화(한 레벨 깊이)를 수행합니다. 지연 방식으로 평가되어 실제로 소비되는 값만 처리합니다. 이는 대용량 또는 무한 시퀀스에 대해 매우 효율적이며, <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">take</code> 또는 <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">find</code>와 같은 작업과 결합할 때 조기 종료를 허용합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">flatten</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/flatten.ts"
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
      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatMap
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          매핑과 평탄화를 하나의 작업으로 결합합니다. 변환과 평탄화를 동시에 수행해야 할 때 사용하세요.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/concat');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          concat
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          여러 iterable을 순차적으로 연결합니다. 동일한 중첩 레벨에서 시퀀스를 결합할 때 사용하세요.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          평탄화 없이 각 값을 변환합니다. 중첩 구조를 준비하기 위해 flatten 전에 자주 사용됩니다.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/reduce');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          reduce
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          평탄화된 스트림에서 값을 집계합니다. 요약 통계를 계산하거나 결과를 결합하기 위해 flatten 후에 사용하세요.
        </p>
      </div>
    </div>
  </div>
);
