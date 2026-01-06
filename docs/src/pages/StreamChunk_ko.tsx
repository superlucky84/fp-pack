import { CodeBlock } from '@/components/CodeBlock';

export const StreamChunk_ko = () => {
  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  return (
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
        chunk (stream)
      </h1>

      <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
        전체 입력을 구체화하지 않고 스트림을 고정 크기의 청크(배열)로 지연
        분할합니다. 각 청크는 채워지는 즉시 방출되어 대용량 또는 무한 스트림의
        효율적인 배치 처리를 가능하게 합니다.
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
        stream chunk란?
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
          chunk
        </strong>{' '}
        는 이터러블의 요소를 고정 크기의 배열로 그룹화하는 스트림 연산입니다.
        입력을 지연 처리하여 지정된 크기에 도달하는 즉시 각 청크를 방출합니다.
        입력 길이가 청크 크기로 균등하게 나누어지지 않으면 마지막 청크는 더
        적은 요소를 포함할 수 있습니다.
      </p>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        다음과 같은 경우에 특히 유용합니다:
      </p>

      <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
        <li>효율성을 위해 API 요청이나 데이터베이스 작업을 배치 처리할 때</li>
        <li>
          페이지네이션을 구현하거나 고정 크기 그룹으로 데이터를 처리할 때
        </li>
        <li>작업을 워커에 분산하여 병렬 처리하고 싶을 때</li>
        <li>대용량 파일이나 스트림을 관리 가능한 세그먼트로 처리할 때</li>
      </ul>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        fp-pack의 모든 스트림 연산과 마찬가지로, chunk는 지연 평가를 사용합니다.
        즉, 청크는 한 번에 모두가 아니라 반복할 때 필요에 따라 생성됩니다.
        이로 인해 매우 크거나 무한한 입력에서도 메모리 효율적입니다.
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, toArray } from 'fp-pack/stream';

// 기본 예제: 배열을 크기 2의 청크로 분할
const data = [1, 2, 3, 4, 5];
const chunks = toArray(chunk(2, data));
console.log(chunks); // [[1, 2], [3, 4], [5]]

// 지연 평가 - 필요에 따라 청크 생성
const iter = chunk(2, [1, 2, 3, 4]);
iter.next(); // { done: false, value: [1, 2] }
iter.next(); // { done: false, value: [3, 4] }
iter.next(); // { done: true, value: undefined }`}
      />

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        Type Signature
      </h2>

      <CodeBlock
        language="typescript"
        code={`function chunk<T>(
  size: number,
  iterable: Iterable<T>
): IterableIterator<T[]>;

function chunk<T>(
  size: number,
  iterable: AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>
): AsyncIterableIterator<T[]>;

function chunk<T>(
  size: number
): (iterable: Iterable<T>) => IterableIterator<T[]>;

function chunk<T>(
  size: number
): (iterable: AsyncIterable<T> | Promise<Iterable<T> | AsyncIterable<T>>) => AsyncIterableIterator<T[]>;`}
      />

      <div class="mt-6 space-y-4">
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          <strong class="font-semibold">매개변수:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              size
            </code>
            : 각 청크의 요소 개수. 양의 정수여야 합니다 (자동으로 내림)
          </li>
          <li>
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              iterable
            </code>
            : 청크로 나눌 입력 시퀀스 (동기 또는 비동기 이터러블)
          </li>
        </ul>

        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4">
          <strong class="font-semibold">반환값:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            크기{' '}
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              size
            </code>
            의 배열을 방출하는 IterableIterator 또는 AsyncIterableIterator
          </li>
          <li>
            입력 길이가 크기로 나누어떨어지지 않으면 마지막 청크는 더 적은
            요소를 포함할 수 있습니다
          </li>
          <li>
            커리된 형태 지원: 크기만으로 호출하여 재사용 가능한 함수를 얻을 수
            있습니다
          </li>
        </ul>

        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4">
          <strong class="font-semibold">특수 사례:</strong>
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
          <li>
            크기가 0, 음수 또는 유한하지 않으면 청크가 방출되지 않습니다
          </li>
          <li>크기는 자동으로 가장 가까운 정수로 내림됩니다</li>
        </ul>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        chunk vs partition vs window
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        다양한 그룹화 연산은 서로 다른 목적으로 사용됩니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, toArray } from 'fp-pack/stream';

const data = [1, 2, 3, 4, 5, 6];

// chunk: 고정 크기의 겹치지 않는 그룹
toArray(chunk(2, data)); // [[1, 2], [3, 4], [5, 6]]

// partition (개념적): 조건에 따라 두 그룹으로 분할
// const [evens, odds] = partition((n) => n % 2 === 0, data);
// evens: [2, 4, 6], odds: [1, 3, 5]

// window (개념적): 겹치는 슬라이딩 윈도우
// window(2, data): [[1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]`}
      />

      <div class="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
        <p class="text-sm md:text-base text-purple-900 dark:text-purple-100 font-semibold mb-2">
          주요 차이점
        </p>
        <ul class="list-disc list-inside text-sm md:text-base text-purple-800 dark:text-purple-200 space-y-1">
          <li>
            <strong>chunk</strong>: 고정 크기 그룹, 겹치지 않음, 순차적 배치
          </li>
          <li>
            <strong>partition</strong>: 조건에 따라 두 그룹으로, 전체 입력 처리
          </li>
          <li>
            <strong>window</strong>: 겹치는 슬라이딩 그룹, 이동 평균에 유용
          </li>
        </ul>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        실용적인 예제
      </h2>

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 1: API 요청 배치 처리
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        많은 API 요청을 할 때 배치 처리하면 네트워크 오버헤드가 줄어들고 속도
        제한을 준수할 수 있습니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, toArray, pipe } from 'fp-pack/stream';

interface User {
  id: string;
  name: string;
  email: string;
}

// API를 압도하지 않도록 사용자를 배치로 생성
async function batchCreateUsers(users: User[]): Promise<void> {
  const BATCH_SIZE = 10;

  const batches = pipe(
    chunk(BATCH_SIZE),
    map(async (batch: User[]) => {
      // 배치를 API로 전송
      const response = await fetch('/api/users/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: batch })
      });

      if (!response.ok) {
        throw new Error(\`Batch failed: \${response.statusText}\`);
      }

      return response.json();
    }),
    toArray
  )(users);

  // 모든 배치가 완료될 때까지 대기
  const results = await Promise.all(batches);
  console.log(\`Created \${results.length} batches\`);
}

// 사용법
const users = Array.from({ length: 47 }, (_, i) => ({
  id: \`user-\${i}\`,
  name: \`User \${i}\`,
  email: \`user\${i}@example.com\`
}));

await batchCreateUsers(users);
// 5개 배치 생성: [10, 10, 10, 10, 7]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 2: 페이지네이션 표시
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        표시나 탐색을 위해 데이터를 페이지로 분할합니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, toArray, pipe } from 'fp-pack/stream';

interface Product {
  id: string;
  name: string;
  price: number;
}

class ProductCatalog {
  private products: Product[];
  private pageSize: number;

  constructor(products: Product[], pageSize: number = 20) {
    this.products = products;
    this.pageSize = pageSize;
  }

  getPages(): Product[][] {
    return toArray(chunk(this.pageSize, this.products));
  }

  getPage(pageNumber: number): Product[] | undefined {
    const pages = this.getPages();
    return pages[pageNumber];
  }

  getTotalPages(): number {
    return Math.ceil(this.products.length / this.pageSize);
  }
}

// 사용법
const products: Product[] = Array.from({ length: 95 }, (_, i) => ({
  id: \`prod-\${i}\`,
  name: \`Product \${i}\`,
  price: Math.random() * 100
}));

const catalog = new ProductCatalog(products, 20);

console.log(catalog.getTotalPages()); // 5
console.log(catalog.getPage(0)?.length); // 20
console.log(catalog.getPage(4)?.length); // 15 (마지막 페이지)`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 3: 워커 풀을 사용한 병렬 처리
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        여러 워커나 스레드에 작업을 효율적으로 분산합니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, flatMap, toArray, pipe } from 'fp-pack/stream';

interface Task {
  id: string;
  data: any;
}

// CPU 집약적 처리 시뮬레이션
async function processTask(task: Task): Promise<{ id: string; result: any }> {
  // 작업 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 100));
  return { id: task.id, result: \`Processed: \${task.data}\` };
}

// 병렬 배치로 작업 처리
async function processTasksInBatches(
  tasks: Task[],
  batchSize: number = 5
): Promise<any[]> {
  return await pipe(
    chunk(batchSize),
    map(async (batch: Task[]) => {
      // 배치의 모든 작업을 병렬로 처리
      console.log(\`Processing batch of \${batch.length} tasks...\`);
      return await Promise.all(batch.map(processTask));
    }),
    flatMap((x: any) => x), // 결과 평탄화
    toArray
  )(tasks);
}

// 사용법: 23개 작업을 크기 5의 배치로 처리
const tasks: Task[] = Array.from({ length: 23 }, (_, i) => ({
  id: \`task-\${i}\`,
  data: \`data-\${i}\`
}));

const results = await processTasksInBatches(tasks, 5);
// 5개의 병렬 배치로 처리: [5, 5, 5, 5, 3]
console.log(\`Processed \${results.length} tasks\`);`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 4: 청크 단위로 파일 업로드
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        대용량 파일을 관리 가능한 청크로 나누어 업로드합니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, toArray, pipe } from 'fp-pack/stream';

// 진행률 추적 및 재개 가능성을 위해 청크 단위로 파일 업로드
async function uploadFileInChunks(
  file: ArrayBuffer,
  chunkSize: number = 1024 * 1024 // 1MB 청크
): Promise<void> {
  const bytes = new Uint8Array(file);

  const uploadChunk = async (
    chunkData: number[],
    index: number,
    total: number
  ): Promise<void> => {
    const chunk = new Uint8Array(chunkData);

    console.log(\`Uploading chunk \${index + 1}/\${total}...\`);

    await fetch('/api/upload/chunk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Chunk-Index': String(index),
        'X-Total-Chunks': String(total)
      },
      body: chunk
    });
  };

  const chunks = toArray(chunk(chunkSize, Array.from(bytes)));

  // 순서를 유지하기 위해 청크를 순차적으로 업로드
  for (let i = 0; i < chunks.length; i++) {
    await uploadChunk(chunks[i], i, chunks.length);
  }

  console.log('Upload complete!');
}

// 사용법
const fileData = new ArrayBuffer(5 * 1024 * 1024); // 5MB 파일
await uploadFileInChunks(fileData, 1024 * 1024);
// 각 1MB씩 5개 청크로 업로드`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 5: 데이터 시각화 - 시간 윈도우별 그룹화
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        시계열 데이터를 고정 간격으로 그룹화하여 집계합니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, toArray, pipe } from 'fp-pack/stream';

interface DataPoint {
  timestamp: number;
  value: number;
}

// 데이터 포인트를 시간 버킷으로 그룹화하고 평균 계산
function aggregateByTimeWindow(
  dataPoints: DataPoint[],
  windowSize: number = 10
): Array<{ bucket: number; average: number; count: number }> {
  return pipe(
    chunk(windowSize),
    map((window: DataPoint[], index: number) => {
      const sum = window.reduce((acc, dp) => acc + dp.value, 0);
      return {
        bucket: index,
        average: sum / window.length,
        count: window.length
      };
    }),
    toArray
  )(dataPoints);
}

// 사용법: 1000개의 데이터 포인트를 크기 50의 윈도우로 처리
const dataPoints: DataPoint[] = Array.from({ length: 1000 }, (_, i) => ({
  timestamp: Date.now() + i * 1000,
  value: Math.random() * 100
}));

const aggregated = aggregateByTimeWindow(dataPoints, 50);

console.log(aggregated);
// [
//   { bucket: 0, average: 52.3, count: 50 },
//   { bucket: 1, average: 48.7, count: 50 },
//   ...
//   { bucket: 19, average: 51.2, count: 50 }
// ]`}
      />

      <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
        예제 6: 비동기 스트림 처리
      </h3>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        이벤트 스트림이나 실시간 데이터와 같은 비동기 이터러블을 청크로
        나눕니다:
      </p>

      <CodeBlock
        language="typescript"
        code={`import { chunk, map, toArray, pipe } from 'fp-pack/stream';

// 비동기 이벤트 스트림 시뮬레이션
async function* eventStream(): AsyncGenerator<string> {
  const events = [
    'user-login', 'page-view', 'click', 'scroll', 'click',
    'page-view', 'user-logout', 'user-login', 'click', 'purchase'
  ];

  for (const event of events) {
    await new Promise(resolve => setTimeout(resolve, 50));
    yield event;
  }
}

// 효율적인 로깅/분석을 위해 이벤트를 배치로 처리
async function processEventBatches() {
  const batches = await pipe(
    chunk(3),
    map((batch: string[], index: number) => ({
      batchId: index,
      events: batch,
      timestamp: new Date().toISOString()
    })),
    toArray
  )(eventStream());

  console.log('Event batches:', batches);
  // [
  //   { batchId: 0, events: ['user-login', 'page-view', 'click'], timestamp: '...' },
  //   { batchId: 1, events: ['scroll', 'click', 'page-view'], timestamp: '...' },
  //   { batchId: 2, events: ['user-logout', 'user-login', 'click'], timestamp: '...' },
  //   { batchId: 3, events: ['purchase'], timestamp: '...' }
  // ]
}

await processEventBatches();`}
      />

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        성능 고려사항
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
        chunk 함수는 지연 평가를 활용하여 최적의 성능을 제공합니다:
      </p>

      <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6 space-y-2">
        <li>
          <strong>지연 청킹</strong>: 청크는 한 번에 모두가 아니라 반복할 때
          필요에 따라 생성됩니다
        </li>
        <li>
          <strong>메모리 효율성</strong>: 한 번에 하나의 청크만 메모리에
          보관됩니다
        </li>
        <li>
          <strong>조기 종료</strong>: 전체 입력을 처리하기 전에 반복을 중지할 수
          있습니다
        </li>
        <li>
          <strong>선불 비용 없음</strong>: 필요할 때까지 입력이 구체화되지
          않습니다
        </li>
      </ul>

      <CodeBlock
        language="typescript"
        code={`import { chunk, take, toArray, pipe, range } from 'fp-pack/stream';

// 효율적: 필요에 따라서만 청크 생성
const first3Chunks = pipe(
  range,
  chunk(1000),
  take(3),
  toArray
)(0, Infinity);
// 처음 3000개 항목만 처리하고, 3개 청크 생성

// 배열 접근 방식과 비교 (대용량/무한 데이터에 비효율적)
// const arrayApproach = Array.from({ length: Infinity }, (_, i) => i); // 불가능!

// chunk + take 패턴은 매우 효율적
const largeDataset = range(0, 1_000_000);
const firstBatch = pipe(
  chunk(100),
  take(1), // 첫 번째 청크만 가져오기
  toArray
)(largeDataset);
// 1M이 아닌 100개 항목만 처리`}
      />

      <div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded">
        <p class="text-sm md:text-base text-green-900 dark:text-green-100 font-semibold mb-2">
          성능 팁
        </p>
        <p class="text-sm md:text-base text-green-800 dark:text-green-200">
          대용량 데이터셋을 처리할 때는 중간 배열 생성을 피하기 위해 chunk를
          take, filter, map과 같은 다른 스트림 연산과 함께 사용하세요. 지연
          평가는 필요한 것만 처리하도록 보장합니다. 배치 API 작업의 경우,
          청킹은 요청당 여러 항목을 전송하여 네트워크 오버헤드를 크게 줄이고
          처리량을 향상시킬 수 있습니다.
        </p>
      </div>

      <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

      <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
        소스 코드
      </h2>

      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        <code class="text-sm">chunk</code>의 내부 구현을 GitHub에서 확인하세요.
      </p>

      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/chunk.ts"
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
          onClick={() => navigateTo('/stream/flatMap')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            flatMap
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            중첩된 구조를 변환하고 평탄화 (청킹의 반대)
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/map')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">map</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            각 요소를 개별적으로 변환
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
            처리할 청크 수 제한
          </p>
        </button>

        <button
          onClick={() => navigateTo('/stream/toArray')}
          class="text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-pink-500 dark:hover:border-pink-400 transition-colors"
        >
          <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
            toArray
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            모든 청크를 배열로 구체화
          </p>
        </button>
      </div>
    </div>
  );
};
