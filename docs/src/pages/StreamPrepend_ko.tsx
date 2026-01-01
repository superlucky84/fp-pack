import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamPrepend_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      prepend (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      이터러블의 시작 부분에 값을 지연 방식으로 추가합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream prepend 란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        prepend
      </strong>{' '}
      는 이터러블의 시작 부분에 하나의 값을 추가하여, 추가된 값을 먼저 방출한 다음 모든 원본 값을 방출하는 새로운 이터러블을 만듭니다. 이 연산은 지연 평가 방식으로 동작하며, 반복할 때 필요에 따라 값을 생성하므로 대용량 또는 무한 시퀀스에서도 메모리 효율적입니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">unshift</code>나 스프레드 구문처럼 즉시 복사본을 만드는 배열 메서드와 달리, prepend는 모든 이터러블과 함께 작동하며 필요할 때만 값을 처리합니다. 이는 전체 시퀀스를 구체화하지 않고 헤더, 접두사 또는 초기 값을 추가해야 하는 데이터 파이프라인, 이벤트 스트림, 함수형 조합에 이상적입니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// 동기 버전 - 동기 이터러블에 값 추가
function prepend<T>(value: T, iterable: Iterable<T>): IterableIterator<T>;

// 비동기 버전 - 비동기 이터러블에 값 추가
function prepend<T>(
  value: PromiseLikeValue<T>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

// 커리된 동기 버전 - 값을 추가하는 함수를 반환
function prepend<T>(value: T): (iterable: Iterable<T>) => IterableIterator<T>;

// 커리된 비동기 버전 - 값을 추가하는 함수를 반환
function prepend<T>(
  value: PromiseLikeValue<T>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      간단한 추가
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-pack/stream';

// 배열에 단일 값 추가
const numbers = prepend(0, [1, 2, 3]);
console.log(Array.from(numbers));
// 출력: [0, 1, 2, 3]

// 모든 이터러블과 함께 작동
function* countFrom2() {
  yield 2;
  yield 3;
  yield 4;
}

const withOne = prepend(1, countFrom2());
console.log(Array.from(withOne));
// 출력: [1, 2, 3, 4]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      조합을 위한 커리 형태
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

// 재사용 가능한 prepend 함수 생성
const addHeader = prepend('=== 보고서 헤더 ===');
const addTimestamp = prepend(\`생성일시: \${new Date().toISOString()}\`);

// 함수형 파이프라인에서 사용
const processItems = pipe(
  map((item: string) => \`  \${item}\`),
  addHeader
);

const items = ['항목 1', '항목 2', '항목 3'];
console.log(Array.from(processItems(items)));
// 출력:
// === 보고서 헤더 ===
//   항목 1
//   항목 2
//   항목 3`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. 데이터 스트림에 헤더 추가
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-pack/stream';

// 데이터 행에 CSV 헤더 추가
async function* fetchDataRows() {
  yield '홍길동,30,개발자';
  yield '김영희,28,디자이너';
  yield '박철수,35,매니저';
}

const csvWithHeader = prepend(
  '이름,나이,직책',
  fetchDataRows()
);

for await (const row of csvWithHeader) {
  console.log(row);
}
// 출력:
// 이름,나이,직책
// 홍길동,30,개발자
// 김영희,28,디자이너
// 박철수,35,매니저`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. 메타데이터가 있는 파일 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

interface FileChunk {
  type: 'metadata' | 'content';
  data: string;
}

async function* readFileContent(filename: string) {
  // 파일 내용 읽기 시뮬레이션
  yield { type: 'content' as const, data: '1번째 줄 내용' };
  yield { type: 'content' as const, data: '2번째 줄 내용' };
  yield { type: 'content' as const, data: '3번째 줄 내용' };
}

// 시작 부분에 파일 메타데이터 추가
const withMetadata = prepend(
  {
    type: 'metadata' as const,
    data: JSON.stringify({
      filename: 'data.txt',
      timestamp: Date.now(),
      encoding: 'utf-8'
    })
  },
  readFileContent('data.txt')
);

for await (const chunk of withMetadata) {
  if (chunk.type === 'metadata') {
    console.log('파일 정보:', JSON.parse(chunk.data));
  } else {
    console.log('내용:', chunk.data);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. 초기화 이벤트가 있는 이벤트 스트림
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-pack/stream';

interface StreamEvent {
  type: 'init' | 'data' | 'update';
  timestamp: number;
  payload?: any;
}

async function* captureEvents() {
  await new Promise(resolve => setTimeout(resolve, 100));
  yield {
    type: 'data' as const,
    timestamp: Date.now(),
    payload: { value: 1 }
  };

  await new Promise(resolve => setTimeout(resolve, 100));
  yield {
    type: 'update' as const,
    timestamp: Date.now(),
    payload: { value: 2 }
  };
}

// 시작 부분에 초기화 이벤트 추가
const eventsWithInit = prepend(
  {
    type: 'init' as const,
    timestamp: Date.now(),
    payload: { version: '1.0.0' }
  },
  captureEvents()
);

for await (const event of eventsWithInit) {
  console.log(\`[\${event.type}] at \${event.timestamp}:, event.payload);
}
// 출력:
// [init] at 1234567890: { version: '1.0.0' }
// [data] at 1234567991: { value: 1 }
// [update] at 1234568091: { value: 2 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. 캐시 표시기가 있는 API 응답
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-pack/stream';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CacheInfo {
  cached: boolean;
  timestamp: number;
}

async function* fetchProducts(): AsyncIterableIterator<Product> {
  const products = [
    { id: 1, name: '노트북', price: 1200000 },
    { id: 2, name: '마우스', price: 35000 },
    { id: 3, name: '키보드', price: 95000 }
  ];

  for (const product of products) {
    yield product;
  }
}

// 첫 번째 항목으로 캐시 정보 추가
const productsWithCacheInfo = (async function*() {
  const cacheInfo: CacheInfo = {
    cached: true,
    timestamp: Date.now()
  };

  // 첫 번째 yield를 위한 타입 단언
  yield cacheInfo as any;

  // 그런 다음 모든 제품을 방출
  for await (const product of fetchProducts()) {
    yield product as any;
  }
})();

for await (const item of productsWithCacheInfo) {
  if ('cached' in item) {
    console.log(\`캐시: \${item.cached}, 시간: \${item.timestamp}\`);
  } else {
    console.log(\`제품: \${item.name} - ₩\${item.price.toLocaleString()}\`);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. 배너가 있는 로그 스트림
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

function* generateLogs() {
  yield '[INFO] 서비스 시작됨';
  yield '[WARN] 설정 누락';
  yield '[ERROR] 데이터베이스 연결 실패';
}

const banner = \`
╔════════════════════════════════╗
║     애플리케이션 로그 스트림      ║
║   \${new Date().toISOString()}   ║
╚════════════════════════════════╝
\`.trim();

const logsWithBanner = prepend(banner, generateLogs());

for (const line of logsWithBanner) {
  console.log(line);
}
// 출력:
// ╔════════════════════════════════╗
// ║     애플리케이션 로그 스트림      ║
// ║   2025-12-31T10:00:00.000Z   ║
// ╚════════════════════════════════╝
// [INFO] 서비스 시작됨
// [WARN] 설정 누락
// [ERROR] 데이터베이스 연결 실패`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. 빈 시퀀스를 위한 기본값
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { prepend } from 'fp-pack/stream';
import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

function* getNumbers() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
}

// 10보다 큰 숫자 필터링 (비어있게 됨)
const largeNumbers = pipe(
  filter((n: number) => n > 10),
  // 기본값 추가
  prepend(-1)
);

const result = Array.from(largeNumbers(getNumbers()));
console.log(result);
// 출력: [-1] (10보다 큰 숫자가 없으므로 기본값만 출력)

// 일치하는 숫자가 있는 경우
const evenNumbers = pipe(
  filter((n: number) => n % 2 === 0),
  prepend(0) // 첫 번째 짝수로 0 추가
);

const result2 = Array.from(evenNumbers(getNumbers()));
console.log(result2);
// 출력: [0, 2, 4]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      prepend를 사용하는 이유
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          지연 평가
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          중간 배열을 만들지 않고 필요에 따라 값을 생성합니다. 무한 시퀀스 및 대용량 데이터셋과 효율적으로 작동합니다.
        </p>
      </div>

      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
          조합 가능한 설계
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          커리된 인터페이스는 pipe 및 기타 함수형 유틸리티와 완벽하게 통합되어 선언적 데이터 변환 파이프라인을 구축합니다.
        </p>
      </div>

      <div class="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          메모리 효율성
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          배열 복사나 구체화가 필요 없습니다. 한 번에 하나의 값을 처리하므로 대용량 파일 스트리밍이나 실시간 데이터에 적합합니다.
        </p>
      </div>

      <div class="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
          범용 호환성
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          모든 이터러블(배열, 제너레이터, 비동기 이터러블, Set, Map)과 작동하며 동기 및 비동기 컨텍스트를 자동으로 처리합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      prepend 함수는 먼저 추가된 값을 방출한 다음 입력 이터러블의 모든 값을 방출하는 새로운 이터러블을 만듭니다. 다음은 간단한 구현입니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`// 간단한 동기 구현
function* prepend<T>(
  value: T,
  iterable: Iterable<T>
): IterableIterator<T> {
  // 먼저, 추가된 값을 방출
  yield value;

  // 그런 다음 원본 이터러블의 모든 값을 방출
  for (const item of iterable) {
    yield item;
  }
}

// 비동기 버전도 같은 방식으로 작동
async function* prependAsync<T>(
  value: T | Promise<T>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncIterableIterator<T> {
  // 추가된 값을 방출 (프로미스인 경우 await)
  yield await value;

  // 그런 다음 원본 이터러블의 모든 값을 방출
  for await (const item of iterable) {
    yield item;
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      주요 특징:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
      <li><strong>지연 실행</strong>: 반복될 때만 값이 생성됩니다</li>
      <li><strong>단일 패스 반복</strong>: 소스의 각 값은 한 번만 방출됩니다</li>
      <li><strong>순서 보존</strong>: 추가된 값이 먼저 나오고 그 다음 모든 원본 값이 나옵니다</li>
      <li><strong>변경 없음</strong>: 원본 이터러블은 변경되지 않습니다</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">prepend</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/prepend.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/append');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          append
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          시작이 아닌 끝 부분에 값을 추가합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/concat');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          concat
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          여러 이터러블을 단일 시퀀스로 결합합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          매핑 함수로 이터러블의 각 값을 변환합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건 함수를 기반으로 이터러블의 값을 필터링합니다
        </p>
      </div>
    </div>
  </div>
);
