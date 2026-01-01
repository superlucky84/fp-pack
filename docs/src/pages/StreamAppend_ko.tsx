import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamAppend_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      append (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      이터러블의 마지막에 값을 지연 방식으로 추가합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream append 란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        append
      </strong>{' '}
      는 이터러블의 끝에 하나의 값을 추가하여, 원본의 모든 값 다음에 추가된 값을 방출하는 새로운 이터러블을 만듭니다. 이 연산은 지연 평가 방식으로 동작하며, 반복할 때 필요에 따라 값을 생성하므로 대용량 또는 무한 시퀀스에서도 메모리 효율적입니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">push</code>나 스프레드 구문처럼 즉시 복사본을 만드는 배열 메서드와 달리, append는 모든 이터러블과 함께 작동하며 필요할 때만 값을 처리합니다. 이는 전체 시퀀스를 구체화하지 않고 종료자, 푸터 또는 최종 값을 추가해야 하는 데이터 파이프라인, 이벤트 스트림, 함수형 조합에 이상적입니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// 동기 버전 - 동기 이터러블에 값 추가
function append<T>(value: T, iterable: Iterable<T>): IterableIterator<T>;

// 비동기 버전 - 비동기 이터러블에 값 추가
function append<T>(
  value: PromiseLikeValue<T>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

// 커리된 동기 버전 - 값을 추가하는 함수를 반환
function append<T>(value: T): (iterable: Iterable<T>) => IterableIterator<T>;

// 커리된 비동기 버전 - 값을 추가하는 함수를 반환
function append<T>(
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
      code={`import { append } from 'fp-pack/stream';

// 배열에 단일 값 추가
const numbers = append(4, [1, 2, 3]);
console.log(Array.from(numbers));
// 출력: [1, 2, 3, 4]

// 모든 이터러블과 함께 작동
function* countTo3() {
  yield 1;
  yield 2;
  yield 3;
}

const withFour = append(4, countTo3());
console.log(Array.from(withFour));
// 출력: [1, 2, 3, 4]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      조합을 위한 커리 형태
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

// 재사용 가능한 append 함수 생성
const addFooter = append('--- 리스트 끝 ---');
const addTotal = append('합계: ₩1,234,560');

// 함수형 파이프라인에서 사용
const processItems = pipe(
  map((item: string) => \`• \${item}\`),
  addFooter
);

const items = ['사과', '바나나', '체리'];
console.log(Array.from(processItems(items)));
// 출력:
// • 사과
// • 바나나
// • 체리
// --- 리스트 끝 ---`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. 스트림에 종료자 추가
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';

// 파일 청크에 EOF 마커 추가
async function* readFileChunks(filename: string) {
  // 청크 단위로 파일 읽기 시뮬레이션
  yield 'chunk1';
  yield 'chunk2';
  yield 'chunk3';
}

const withEOF = append({ type: 'EOF' }, readFileChunks('data.txt'));

for await (const chunk of withEOF) {
  if (chunk.type === 'EOF') {
    console.log('파일 읽기 완료');
  } else {
    console.log('처리 중:', chunk);
  }
}
// 출력:
// 처리 중: chunk1
// 처리 중: chunk2
// 처리 중: chunk3
// 파일 읽기 완료`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. 요약이 포함된 보고서 생성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

interface Transaction {
  id: string;
  amount: number;
  description: string;
}

function generateReport(transactions: Transaction[]) {
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);

  const reportLines = pipe(
    map((t: Transaction) => \`\${t.id}: \${t.description} - ₩\${t.amount.toLocaleString()}\`),
    append('─'.repeat(50)),
    append(\`합계: ₩\${total.toLocaleString()}\`)
  );

  return reportLines(transactions);
}

const transactions = [
  { id: 'T001', amount: 123450, description: '구매' },
  { id: 'T002', amount: 67890, description: '환불' },
  { id: 'T003', amount: 234560, description: '판매' }
];

for (const line of generateReport(transactions)) {
  console.log(line);
}
// 출력:
// T001: 구매 - ₩123,450
// T002: 환불 - ₩67,890
// T003: 판매 - ₩234,560
// ──────────────────────────────────────────────────
// 합계: ₩425,900`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. 완료 이벤트가 있는 이벤트 스트림
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';

interface UserEvent {
  type: 'click' | 'scroll' | 'keypress' | 'complete';
  timestamp: number;
  data?: any;
}

async function* captureUserEvents(duration: number) {
  const startTime = Date.now();

  while (Date.now() - startTime < duration) {
    // 이벤트 캡처 시뮬레이션
    yield {
      type: 'click' as const,
      timestamp: Date.now(),
      data: { x: 100, y: 200 }
    };

    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

// 완료 마커 추가
const sessionWithCompletion = append(
  { type: 'complete' as const, timestamp: Date.now() },
  captureUserEvents(500)
);

for await (const event of sessionWithCompletion) {
  if (event.type === 'complete') {
    console.log('세션 종료 시각:', new Date(event.timestamp));
  } else {
    console.log(\`이벤트: \${event.type} at \${event.timestamp}\`);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. 총 개수가 포함된 API 페이지네이션
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';

interface User {
  id: number;
  name: string;
}

async function* fetchAllUsers() {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(\`/api/users?page=\${page}\`);
    const data = await response.json();

    for (const user of data.users) {
      yield user;
    }

    hasMore = data.hasMore;
    page++;
  }
}

// 마지막에 메타데이터 추가
const usersWithCount = (async function*() {
  let count = 0;
  const users = fetchAllUsers();

  for await (const user of users) {
    count++;
    yield user;
  }

  yield { type: 'metadata', totalCount: count };
})();

for await (const item of usersWithCount) {
  if (item.type === 'metadata') {
    console.log(\`총 사용자 수: \${item.totalCount}\`);
  } else {
    console.log(\`사용자: \${item.name}\`);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. 타임스탬프 푸터가 있는 로그 파일
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';
import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

interface LogEntry {
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  timestamp: number;
}

function formatLogs(logs: LogEntry[]) {
  const now = new Date().toISOString();

  return pipe(
    map((log: LogEntry) =>
      \`[\${new Date(log.timestamp).toISOString()}] \${log.level}: \${log.message}\`
    ),
    append(''),
    append(\`로그 생성 시각: \${now}\`)
  )(logs);
}

const logs: LogEntry[] = [
  { level: 'INFO', message: '애플리케이션 시작됨', timestamp: Date.now() },
  { level: 'WARN', message: '높은 메모리 사용량', timestamp: Date.now() + 1000 },
  { level: 'ERROR', message: '데이터베이스 연결 실패', timestamp: Date.now() + 2000 }
];

for (const line of formatLogs(logs)) {
  console.log(line);
}
// 출력:
// [2025-12-31T10:00:00.000Z] INFO: 애플리케이션 시작됨
// [2025-12-31T10:00:01.000Z] WARN: 높은 메모리 사용량
// [2025-12-31T10:00:02.000Z] ERROR: 데이터베이스 연결 실패
//
// 로그 생성 시각: 2025-12-31T10:00:02.500Z`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. 제한 마커가 있는 무한 시퀀스
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { append } from 'fp-pack/stream';
import { take } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

// 처음 10개의 피보나치 수를 가져오고 마커 추가
const limitedFibonacci = pipe(
  take(10),
  append('... (시퀀스 계속됨)')
);

const result = limitedFibonacci(fibonacci());

for (const value of result) {
  console.log(value);
}
// 출력:
// 0
// 1
// 1
// 2
// 3
// 5
// 8
// 13
// 21
// 34
// ... (시퀀스 계속됨)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      append를 사용하는 이유
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
      append 함수는 먼저 입력 이터러블의 모든 값을 방출한 다음 추가된 값을 방출하는 새로운 이터러블을 만듭니다. 다음은 간단한 구현입니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`// 간단한 동기 구현
function* append<T>(
  value: T,
  iterable: Iterable<T>
): IterableIterator<T> {
  // 먼저, 원본 이터러블의 모든 값을 방출
  for (const item of iterable) {
    yield item;
  }

  // 그런 다음 추가된 값을 방출
  yield value;
}

// 비동기 버전도 같은 방식으로 작동
async function* appendAsync<T>(
  value: T | Promise<T>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncIterableIterator<T> {
  // 원본 이터러블의 모든 값을 방출
  for await (const item of iterable) {
    yield item;
  }

  // 추가된 값을 방출 (프로미스인 경우 await)
  yield await value;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      주요 특징:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
      <li><strong>지연 실행</strong>: 반복될 때만 값이 생성됩니다</li>
      <li><strong>단일 패스 반복</strong>: 소스의 각 값은 한 번만 방출됩니다</li>
      <li><strong>순서 보존</strong>: 모든 원본 값이 먼저 나오고 그 다음 추가된 값이 나옵니다</li>
      <li><strong>변경 없음</strong>: 원본 이터러블은 변경되지 않습니다</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">append</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/append.ts"
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
          navigateTo('/stream/prepend');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          prepend
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          끝이 아닌 시작 부분에 값을 추가합니다
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
          navigateTo('/stream/flatten');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatten
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          중첩된 이터러블을 단일 레벨 시퀀스로 평탄화합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/take');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          take
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          이터러블에서 처음 N개의 값만 가져옵니다
        </p>
      </div>
    </div>
  </div>
);
