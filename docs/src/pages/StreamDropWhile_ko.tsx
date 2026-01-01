import { CodeBlock } from '@/components/CodeBlock';

export const StreamDropWhile_ko = () => {
  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
        dropWhile (stream)
      </h1>

      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        조건이 참인 동안 스트림의 시작부분 값들을 건너뛰고, 조건이 거짓이 되는
        순간부터 모든 나머지 값들을 방출합니다. 조건이 거짓을 반환하는 순간,
        해당 값을 포함하여 이후의 모든 값이 포함됩니다.
      </p>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        stream dropWhile 란?
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
          dropWhile
        </strong>{' '}
        은 주어진 조건 함수가 참을 반환하는 동안 시퀀스의 시작부터 요소들을
        건너뛰는 스트림 연산입니다. 조건이 처음으로 거짓을 반환하면, dropWhile은
        테스트를 중단하고 해당 요소와 스트림의 모든 나머지 요소를 방출합니다.
      </p>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        다음과 같은 경우에 특히 유용합니다:
      </p>

      <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
        <li>스트림 시작 부분의 유효하지 않거나 준비 단계의 데이터를 건너뛸 때</li>
        <li>
          특정 조건이나 마커에 도달한 후부터 데이터를 처리하고 싶을 때
        </li>
        <li>
          정렬된 데이터에서 동적 조건에 따라 접두사를 건너뛸 때
        </li>
        <li>데이터가 안정화될 때까지 초기 오류나 노이즈를 제거할 때</li>
      </ul>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        fp-pack의 모든 스트림 연산과 마찬가지로, dropWhile은 지연 평가를
        사용합니다. 즉, 조건이 거짓을 반환할 때까지만 조건을 테스트하며, 그 이후
        불필요한 반복이 발생하지 않습니다.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, toArray } from 'fp-pack/stream';

// 기본 예제: 3보다 작은 값들을 건너뛰기
const data = [1, 2, 3, 4, 2, 1];
const result = toArray(dropWhile((n: number) => n < 3, data));
console.log(result); // [3, 4, 2, 1] - 3과 그 이후의 모든 값 포함`}
      />

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Type Signature
      </h2>

      <CodeBlock
        language="typescript"
        code={`function dropWhile<T>(
  predicate: (value: T) => boolean,
  iterable: Iterable<T>
): IterableIterator<T>;

function dropWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

function dropWhile<T>(
  predicate: (value: T) => boolean
): (iterable: Iterable<T>) => IterableIterator<T>;

function dropWhile<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
      />

      <div class="mt-6 space-y-4">
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          <strong class="font-semibold">매개변수:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              predicate
            </code>
            : 각 값을 테스트하는 함수. 건너뛰기를 계속하려면{' '}
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              true
            </code>
            , 값 방출을 시작하려면{' '}
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              false
            </code>
            를 반환
          </li>
          <li>
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              iterable
            </code>
            : 입력 시퀀스 (동기 또는 비동기 이터러블)
          </li>
        </ul>

        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4">
          <strong class="font-semibold">반환값:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            조건이 거짓을 반환하는 첫 번째 값부터 시작하는 모든 값을 포함하는
            IterableIterator 또는 AsyncIterableIterator
          </li>
          <li>
            커리된 형태 지원: 조건만으로 호출하여 재사용 가능한 함수를 얻을 수
            있습니다
          </li>
        </ul>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        dropWhile vs drop vs takeWhile
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        이 함수들은 비슷해 보일 수 있지만, 서로 다른 목적으로 사용됩니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, drop, takeWhile, toArray } from 'fp-pack/stream';

const data = [1, 2, 3, 4, 5, 2, 1];

// dropWhile: 조건이 참인 동안 건너뛰고, 나머지 방출
toArray(dropWhile((n) => n < 3, data)); // [3, 4, 5, 2, 1]

// drop: 처음 N개 항목 건너뛰기 (개수 기반)
toArray(drop(2, data)); // [3, 4, 5, 2, 1]

// takeWhile: 조건이 참인 동안 방출하고, 중단
toArray(takeWhile((n) => n < 4, data)); // [1, 2, 3]`}
      />

      <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
        <p class="text-sm md:text-base text-blue-900 dark:text-blue-100 font-semibold mb-2">
          주요 차이점
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-blue-800 dark:text-blue-200 space-y-1">
          <li>
            <strong>dropWhile</strong>: 시작 부분에서 조건 기반 건너뛰기, 이후 모든
            나머지 값 방출
          </li>
          <li>
            <strong>drop</strong>: 고정된 개수의 요소를 건너뛰는 개수 기반 방식
          </li>
          <li>
            <strong>takeWhile</strong>: 조건이 실패할 때까지 조건 기반 방출
            (dropWhile의 반대)
          </li>
        </ul>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        실용적인 예제
      </h2>

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 1: 시작 부분의 유효하지 않은 데이터 건너뛰기
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        센서나 데이터 소스는 시작 단계에서 유효하지 않은 읽기 값을 생성하는 경우가
        많습니다. dropWhile을 사용하면 이러한 유효하지 않은 값을 동적으로 건너뛸 수
        있습니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, toArray } from 'fp-pack/stream';

interface SensorReading {
  timestamp: number;
  value: number;
  isValid: boolean;
}

const readings: SensorReading[] = [
  { timestamp: 1, value: -999, isValid: false },
  { timestamp: 2, value: -999, isValid: false },
  { timestamp: 3, value: 23.5, isValid: true },
  { timestamp: 4, value: 24.1, isValid: true },
  { timestamp: 5, value: 23.8, isValid: true }
];

// 시작 부분의 모든 유효하지 않은 읽기 값 건너뛰기
const validReadings = toArray(
  dropWhile((reading) => !reading.isValid, readings)
);

console.log(validReadings);
// [
//   { timestamp: 3, value: 23.5, isValid: true },
//   { timestamp: 4, value: 24.1, isValid: true },
//   { timestamp: 5, value: 23.8, isValid: true }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 2: 안정화될 때까지 준비 데이터 건너뛰기
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        메트릭이나 성능 데이터를 모니터링할 때, 초기 값들이 불안정할 수 있습니다.
        dropWhile을 사용하여 데이터가 안정화될 때까지 건너뛸 수 있습니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, map, toArray, pipe } from 'fp-pack/stream';

interface Metric {
  timestamp: number;
  responseTime: number;
  variance: number;
}

const metrics: Metric[] = [
  { timestamp: 1, responseTime: 850, variance: 400 }, // 높은 분산
  { timestamp: 2, responseTime: 720, variance: 350 }, // 높은 분산
  { timestamp: 3, responseTime: 520, variance: 180 }, // 안정화 중
  { timestamp: 4, responseTime: 510, variance: 45 },  // 안정
  { timestamp: 5, responseTime: 505, variance: 30 },  // 안정
  { timestamp: 6, responseTime: 512, variance: 35 }   // 안정
];

// 분산이 임계값 이하가 될 때까지(안정) 메트릭 건너뛰기
const VARIANCE_THRESHOLD = 100;

const stableMetrics = pipe(
  dropWhile((m: Metric) => m.variance > VARIANCE_THRESHOLD),
  map((m: Metric) => ({
    timestamp: m.timestamp,
    avgResponseTime: m.responseTime
  })),
  toArray
)(metrics);

console.log(stableMetrics);
// [
//   { timestamp: 4, avgResponseTime: 510 },
//   { timestamp: 5, avgResponseTime: 505 },
//   { timestamp: 6, avgResponseTime: 512 }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 3: 타임스탬프 이후의 로그 항목 처리
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        로그를 분석할 때, 특정 이벤트나 타임스탬프 이전의 항목을 건너뛰고 싶은 경우가
        많습니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, filter, toArray, pipe } from 'fp-pack/stream';

interface LogEntry {
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

const logs: LogEntry[] = [
  { timestamp: new Date('2024-01-01T10:00:00'), level: 'INFO', message: 'App started' },
  { timestamp: new Date('2024-01-01T10:05:00'), level: 'INFO', message: 'User login' },
  { timestamp: new Date('2024-01-01T10:10:00'), level: 'ERROR', message: 'Database connection lost' },
  { timestamp: new Date('2024-01-01T10:12:00'), level: 'WARN', message: 'Retrying connection' },
  { timestamp: new Date('2024-01-01T10:15:00'), level: 'INFO', message: 'Connection restored' },
  { timestamp: new Date('2024-01-01T10:20:00'), level: 'ERROR', message: 'Payment failed' }
];

// 데이터베이스 문제 이후 발생한 오류 분석
const dbIssueTime = new Date('2024-01-01T10:10:00');

const errorsAfterIncident = pipe(
  dropWhile((log: LogEntry) => log.timestamp < dbIssueTime),
  filter((log: LogEntry) => log.level === 'ERROR'),
  toArray
)(logs);

console.log(errorsAfterIncident);
// [
//   { timestamp: ..., level: 'ERROR', message: 'Database connection lost' },
//   { timestamp: ..., level: 'ERROR', message: 'Payment failed' }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 4: 데이터 파일의 주석 라인 건너뛰기
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        데이터 파일은 시작 부분에 주석이나 메타데이터가 있는 경우가 많습니다.
        dropWhile을 사용하여 이를 동적으로 건너뛸 수 있습니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, map, toArray, pipe } from 'fp-pack/stream';

const dataFile = [
  '# Data export from system',
  '# Generated: 2024-01-01',
  '# Format: name,value,unit',
  '#',
  'temperature,23.5,celsius',
  'humidity,65,percent',
  'pressure,1013,hPa'
];

// 시작 부분의 모든 주석 라인 건너뛰기
const parseData = pipe(
  dropWhile((line: string) => line.startsWith('#')),
  map((line: string) => {
    const [name, value, unit] = line.split(',');
    return { name, value: parseFloat(value), unit };
  }),
  toArray
);

const measurements = parseData(dataFile);
console.log(measurements);
// [
//   { name: 'temperature', value: 23.5, unit: 'celsius' },
//   { name: 'humidity', value: 65, unit: 'percent' },
//   { name: 'pressure', value: 1013, unit: 'hPa' }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 5: API 응답을 사용한 비동기 처리
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        API를 폴링할 때, 특정 조건이 충족될 때까지 응답을 건너뛸 수 있습니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, map, toArray, pipe } from 'fp-pack/stream';

interface JobStatus {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  result?: any;
}

async function* pollJobStatus(jobId: string): AsyncGenerator<JobStatus> {
  const statuses: JobStatus[] = [
    { id: jobId, status: 'pending', progress: 0 },
    { id: jobId, status: 'processing', progress: 25 },
    { id: jobId, status: 'processing', progress: 50 },
    { id: jobId, status: 'processing', progress: 75 },
    { id: jobId, status: 'completed', progress: 100, result: { data: 'success' } }
  ];

  for (const status of statuses) {
    await new Promise(resolve => setTimeout(resolve, 100));
    yield status;
  }
}

// 작업이 완료될 때까지 모든 상태 건너뛰기
async function waitForCompletion(jobId: string) {
  const completedStatuses = await pipe(
    dropWhile((status: JobStatus) => status.status !== 'completed'),
    toArray
  )(pollJobStatus(jobId));

  return completedStatuses[0]; // 첫 번째 완료 상태
}

// 사용법
const result = await waitForCompletion('job-123');
console.log(result);
// { id: 'job-123', status: 'completed', progress: 100, result: { data: 'success' } }`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 6: 누적기를 사용한 상태 저장 조건
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        때로는 값을 방출하기 시작할 시점을 결정하기 위해 반복 전반에 걸쳐 상태를
        추적해야 합니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, toArray } from 'fp-pack/stream';

interface Trade {
  timestamp: number;
  price: number;
  volume: number;
}

const trades: Trade[] = [
  { timestamp: 1, price: 100, volume: 50 },
  { timestamp: 2, price: 101, volume: 75 },
  { timestamp: 3, price: 102, volume: 100 },  // 누적 거래량이 225에 도달
  { timestamp: 4, price: 103, volume: 50 },
  { timestamp: 5, price: 104, volume: 80 }
];

// 누적 거래량이 임계값을 초과할 때까지 거래 건너뛰기
const VOLUME_THRESHOLD = 200;

function skipUntilVolumeThreshold(trades: Trade[]) {
  let cumulativeVolume = 0;

  return toArray(
    dropWhile((trade: Trade) => {
      cumulativeVolume += trade.volume;
      return cumulativeVolume <= VOLUME_THRESHOLD;
    }, trades)
  );
}

const significantTrades = skipUntilVolumeThreshold(trades);
console.log(significantTrades);
// [
//   { timestamp: 3, price: 102, volume: 100 },  // 이것이 임계값을 넘게 함
//   { timestamp: 4, price: 103, volume: 50 },
//   { timestamp: 5, price: 104, volume: 80 }
// ]

console.log('건너뛴 거래량:', 50 + 75); // 125
console.log('포함된 거래량:', 100 + 50 + 80); // 230`}
      />

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        성능 고려사항
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        dropWhile 함수는 지연 평가를 활용하여 우수한 성능 특성을 제공합니다:
      </p>

      <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
        <li>
          <strong>최소한의 조건 평가</strong>: 조건이 처음으로 거짓을 반환할
          때까지만 호출됩니다
        </li>
        <li>
          <strong>중간 배열 없음</strong>: 중간 컬렉션을 만들지 않고 한 번에 하나씩
          값을 방출합니다
        </li>
        <li>
          <strong>효율적인 조기 중단</strong>: 조건이 실패하면 더 이상 조건 평가가
          발생하지 않습니다
        </li>
        <li>
          <strong>메모리 효율성</strong>: 언제든지 현재 값만 메모리에 보관됩니다
        </li>
      </ul>

      <CodeBlock
        language="typescript"
        code={`import { dropWhile, toArray, range } from 'fp-pack/stream';

// 효율적: 조건이 실패할 때까지만 검사
const largeDataset = range(0, 1_000_000);
const afterWarmup = toArray(
  dropWhile((n: number) => n < 1000, largeDataset)
);
// 처음 ~1,000개 값만 검사하고, 나머지 999,000개 방출
// 총 조건 호출: ~1,000번

// 배열 접근 방식과 비교 (비효율적)
const arrayApproach = Array.from({ length: 1_000_000 }, (_, i) => i)
  .slice(1000); // 먼저 전체 배열 생성
// 메모리 사용량: 전체 1백만 요소 배열`}
      />

      <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded">
        <p class="text-sm md:text-base text-green-900 dark:text-green-100 font-semibold mb-2">
          성능 팁
        </p>
        <p class="text-sm md:text-base text-green-800 dark:text-green-200">
          조건에 따라 시작 부분에서 값을 건너뛸 때, dropWhile은 전체 스트림을
          필터링하는 것보다 훨씬 더 효율적입니다. 대용량 데이터셋으로 작업하고
          접두사만 건너뛰면 되는 경우, dropWhile은 첫 번째 일치하지 않는 값
          이후에는 검사를 중단하지만, filter는 모든 단일 요소를 검사합니다.
        </p>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        소스 코드
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        <code class="text-sm">dropWhile</code>의 내부 구현을 GitHub에서 확인하세요.
      </p>

      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/dropWhile.ts"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
      >
        <svg
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        GitHub에서 보기
      </a>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        관련 함수
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => navigateTo('/stream/drop')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            drop
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            처음 N개 요소 건너뛰기 (개수 기반)
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/takeWhile')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            takeWhile
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            조건이 유지되는 동안 요소 가져오기 (dropWhile의 반대)
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/take')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            take
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            처음 N개 요소 가져오기 (개수 기반)
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/filter')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            filter
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            조건에 따라 전체 스트림의 요소 필터링
          </p>
        </button>
      </div>
    </div>
  );
};
