import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamConcat_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      concat (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      여러 이터러블을 순차적으로 지연 결합
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream concat이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        concat
      </strong>{' '}
      은 두 이터러블을 단일 이터러블로 결합하여 두 번째 이터러블의 모든 값을 먼저 yield한 다음 첫 번째 이터러블의 모든 값을 yield합니다. 이 작업은 <strong>지연(lazy)</strong> 방식으로 수행되어 한 번에 모든 값을 생성하지 않고 필요할 때만 생성합니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      시퀀스를 연결하는 것으로 생각할 수 있습니다: 결과를 반복하면 먼저 두 번째 이터러블의 모든 값을 받고, 그 다음 첫 번째 이터러블의 모든 값을 받습니다. 커리 형태는 다음 패턴을 따릅니다: <code>concat(first)(second)</code>는 <code>second...first</code> 순서로 생성합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`// 동기 이터러블
function concat<T>(
  other: Iterable<T>,
  iterable: Iterable<T>
): IterableIterator<T>;

// 비동기 이터러블
function concat<T>(
  other: AnyIterableInput<PromiseLikeValue<T>>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

// 커리된 동기 형태
function concat<T>(
  other: Iterable<T>
): (iterable: Iterable<T>) => IterableIterator<T>;

// 커리된 비동기 형태
function concat<T>(
  other: AnyIterableInput<PromiseLikeValue<T>>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. 단순 결합
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';

// 직접 형태: concat(first, second)
const result1 = concat([3, 4], [1, 2]);
Array.from(result1); // [1, 2, 3, 4]
// 생성 순서: second first

// 커리 형태: concat(first)(second)
const addSuffix = concat([5, 6]);
const result2 = addSuffix([1, 2]);
Array.from(result2); // [1, 2, 5, 6]
// 생성 순서: second first`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. 지연 평가
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';

function* numbers() {
  console.log('숫자 생성 중...');
  yield 1;
  yield 2;
}

function* letters() {
  console.log('문자 생성 중...');
  yield 'a';
  yield 'b';
}

const combined = concat(letters(), numbers());
// 아직 아무것도 로그되지 않음 - 지연!

const iterator = combined[Symbol.iterator]();
iterator.next(); // 로그: "숫자 생성 중...", 반환: { value: 1, done: false }
iterator.next(); // 반환: { value: 2, done: false }
iterator.next(); // 로그: "문자 생성 중...", 반환: { value: 'a', done: false }
iterator.next(); // 반환: { value: 'b', done: false }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. 데이터 소스 결합
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      여러 소스의 데이터를 지연 방식으로 병합:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';

// 캐시된 데이터와 새로운 데이터 결합
const cachedUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' }
];

async function* fetchNewUsers() {
  const response = await fetch('/api/users/new');
  const users = await response.json();
  for (const user of users) {
    yield user;
  }
}

// 사용자가 사용 가능해지는 대로 yield됨
const allUsers = concat(fetchNewUsers(), cachedUsers);

for await (const user of allUsers) {
  // 먼저: 캐시된 사용자 (즉시)
  // 그 다음: 새 사용자 (가져오는 대로)
  displayUser(user);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. 헤더와 푸터 추가
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat, pipe } from 'fp-pack';
import { concat as streamConcat } from 'fp-pack/stream';

const header = ['<!DOCTYPE html>', '<html>', '<head>'];
const footer = ['</body>', '</html>'];

function* generateBody() {
  yield '<body>';
  yield '<h1>환영합니다</h1>';
  yield '<p>콘텐츠가 여기에</p>';
}

// 완전한 HTML 문서 구축
const htmlDocument = pipe(
  generateBody(),
  streamConcat(footer),
  streamConcat(header)
);

// 지연: 반복할 때만 라인 생성
for (const line of htmlDocument) {
  console.log(line);
}
// 출력:
// <!DOCTYPE html>
// <html>
// <head>
// <body>
// <h1>환영합니다</h1>
// <p>콘텐츠가 여기에</p>
// </body>
// </html>`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      3. 여러 파일 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';
import { createReadStream } from 'fs';

async function* readLines(filePath: string) {
  const stream = createReadStream(filePath, 'utf-8');
  let buffer = '';

  for await (const chunk of stream) {
    buffer += chunk;
    const lines = buffer.split('\\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      yield line;
    }
  }
  if (buffer) yield buffer;
}

// 여러 로그 파일을 순차적으로 처리
const allLogs = concat(
  readLines('app.log.2'),
  readLines('app.log.1')
);

// 지연: 필요할 때만 파일 읽기
for await (const line of allLogs) {
  if (line.includes('ERROR')) {
    console.error(line);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      4. 무한 시퀀스 구성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat, take } from 'fp-pack/stream';

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

function* powers() {
  let n = 0;
  while (true) {
    yield 2 ** n;
    n++;
  }
}

// 유한 접두사와 무한 시퀀스 결합
const numbers = concat(
  fibonacci(),
  [100, 200, 300]
);

// 처음 10개 값 가져오기
const first10 = take(10, numbers);
Array.from(first10);
// [100, 200, 300, 0, 1, 1, 2, 3, 5, 8]
//  ^^^ 접두사 ^^^ ^^^ 피보나치... ^^^`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      5. 이벤트 스트림 병합
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat } from 'fp-pack/stream';

async function* listenToEvents(eventName: string) {
  const queue: Event[] = [];
  const handler = (e: Event) => queue.push(e);

  window.addEventListener(eventName, handler);

  try {
    while (true) {
      if (queue.length > 0) {
        yield queue.shift()!;
      }
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  } finally {
    window.removeEventListener(eventName, handler);
  }
}

// 과거 이벤트 처리 후 실시간 이벤트 처리
const historicalEvents = [
  { type: 'click', timestamp: 1000 },
  { type: 'scroll', timestamp: 2000 }
];

const allEvents = concat(
  listenToEvents('click'),
  historicalEvents
);

for await (const event of allEvents) {
  console.log('이벤트:', event);
  // 먼저: 과거 이벤트
  // 그 다음: 발생하는 대로 실시간 클릭 이벤트
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      6. 구분자가 있는 배치 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { concat, map } from 'fp-pack/stream';
import { pipe } from 'fp-pack';

type Record = { id: number; data: string };

function* generateRecords(): Iterable<Record> {
  yield { id: 1, data: '첫번째' };
  yield { id: 2, data: '두번째' };
  yield { id: 3, data: '세번째' };
}

// 배치 사이에 구분자 추가
const separator = [{ id: -1, data: '---BATCH---' }];

const batch1 = generateRecords();
const batch2 = generateRecords();
const batch3 = generateRecords();

// 구분자와 함께 배치 연결
const allBatches = pipe(
  batch1,
  concat(separator),
  concat(batch2),
  concat(separator),
  concat(batch3)
);

for (const record of allBatches) {
  console.log(record);
}
// 출력:
// { id: 1, data: '첫번째' }
// { id: 2, data: '두번째' }
// { id: 3, data: '세번째' }
// { id: -1, data: '---BATCH---' }
// { id: 1, data: '첫번째' }
// ...`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 stream concat을 사용하나요?
    </h2>

    <div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        1. 지연 평가
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200">
        값이 필요할 때만 생성되므로 모든 것을 메모리에 로드하지 않고도 무한 시퀀스나 대용량 데이터셋을 다룰 수 있습니다. 실제로 소비하는 값만 생성됩니다.
      </p>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
        2. 메모리 효율성
      </h3>
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200">
        모든 요소를 포함하는 새 배열을 만드는 배열 연결과 달리, stream concat은 한 번에 하나씩 값을 yield하여 최소한의 메모리 오버헤드를 유지합니다. 대용량 또는 스트리밍 데이터 처리에 완벽합니다.
      </p>
    </div>

    <div class="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
        3. 조합 가능
      </h3>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200">
        map, filter, take와 같은 다른 스트림 작업과 원활하게 작동합니다. 여러 concat 작업을 연결하여 효율적이고 지연 방식을 유지하는 복잡한 데이터 파이프라인을 구축할 수 있습니다.
      </p>
    </div>

    <div class="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
        4. 비동기 지원
      </h3>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        동기 및 비동기 이터러블을 모두 자동으로 처리합니다. 특별한 처리 없이도 API, 파일 스트림 또는 모든 비동기 소스의 데이터를 연결할 수 있습니다. 필요할 때 결과가 비동기로 적응합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>concat</strong>의 동작 방식을 단순화한 버전:
    </p>

    <CodeBlock
      language="typescript"
      code={`// 단순화된 동기 구현
function* concat<T>(
  other: Iterable<T>,
  iterable: Iterable<T>
): IterableIterator<T> {
  // 두 번째 인자의 모든 값을 먼저 yield
  for (const value of iterable) {
    yield value;
  }

  // 그 다음 첫 번째 인자의 모든 값을 yield
  for (const value of other) {
    yield value;
  }
}

// 커리된 형태는 부분 적용 허용
function concat<T>(other: Iterable<T>) {
  return function(iterable: Iterable<T>) {
    return concat(other, iterable);
  };
}`}
    />

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 my-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        동작 원리:
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong>제너레이터 함수:</strong> 지연 방식으로 값을 yield하는 이터레이터 반환
        </li>
        <li>
          <strong>순차적 yielding:</strong> 먼저 두 번째 이터러블을 소진한 다음 첫 번째 이터러블
        </li>
        <li>
          <strong>중간 배열 없음:</strong> 중간 컬렉션을 만들지 않고 값을 직접 yield
        </li>
        <li>
          <strong>매개변수 순서:</strong> 커리 형태 <code>concat(first)(second)</code>는 순서대로 값을 yield: second, 그 다음 first
        </li>
        <li>
          <strong>비동기 감지:</strong> 이터러블이 비동기이면 결과는 비동기 이터레이터
        </li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">concat</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/concat.ts"
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
        href="/stream/append"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/append');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          append →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          이터러블 끝에 값 추가
        </p>
      </a>

      <a
        href="/stream/prepend"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/prepend');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          prepend →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          이터러블 시작에 값 추가
        </p>
      </a>

      <a
        href="/stream/flatten"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatten');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          flatten →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          중첩된 이터러블을 한 레벨 평탄화
        </p>
      </a>

      <a
        href="/stream/zip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/zip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          zip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          여러 이터러블을 요소별로 결합
        </p>
      </a>
    </div>
  </div>
);
