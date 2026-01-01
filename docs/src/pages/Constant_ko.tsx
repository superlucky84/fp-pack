import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Constant_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      constant
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      항상 같은 값을 반환
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      constant란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        constant
      </strong>{' '}
      는 받은 인자와 관계없이 (또는 인자를 받지 않더라도) 항상 같은 값을 반환하는 함수를 생성합니다.
      <br />
      <br />
      이 간단한 유틸리티는 함수형 프로그래밍에서 <strong>기본값 제공</strong>,{' '}
      <strong>함수 인자 무시</strong>, 그리고 <strong>플레이스홀더 함수 생성</strong>에
      놀랍도록 유용합니다.
      <br />
      <br />
      일부 함수형 프로그래밍 라이브러리에서는{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">always</code>라고도 불립니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-pack';

const alwaysTrue = constant(true);
const alwaysFive = constant(5);
const alwaysHello = constant('hello');

alwaysTrue();       // true
alwaysTrue(false);  // true (인자 무시됨)
alwaysTrue(1, 2, 3); // true (모든 인자 무시됨)

alwaysFive();       // 5
alwaysHello();      // "hello"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function constant<T>(value: T): () => T;

// 어떤 값이든 받음
// 항상 그 값을 반환하는 함수를 반환`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      반환된 함수는 모든 인자를 무시하고 항상 참조 동일성이 보존된 같은 값을 반환합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 예제
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-pack';

// 원시 값
const alwaysZero = constant(0);
const alwaysEmpty = constant('');
const alwaysNull = constant(null);

alwaysZero();   // 0
alwaysEmpty();  // ""
alwaysNull();   // null

// 객체와 배열
const defaultUser = constant({ id: 0, name: 'Guest' });
const emptyArray = constant([]);

defaultUser();   // { id: 0, name: 'Guest' }
emptyArray();    // []

// 매번 같은 참조
const arr1 = emptyArray();
const arr2 = emptyArray();
console.log(arr1 === arr2);  // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      인자 무시
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-pack';

const alwaysSuccess = constant({ status: 'success' });

// 어떤 개수의 인자에도 작동
alwaysSuccess();                    // { status: 'success' }
alwaysSuccess('ignored');           // { status: 'success' }
alwaysSuccess(1, 2, 3, 'ignored');  // { status: 'success' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      기본값과 폴백
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-pack';

interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
}

const defaultConfig = constant<Config>({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
});

// 기본값 팩토리로 사용
function createClient(config?: Config) {
  const finalConfig = config || defaultConfig();
  // ...
}

// 또는 널 병합 연산자와 함께
function getConfig(userConfig?: Config): Config {
  return userConfig ?? defaultConfig();
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array.map에서 상수 값 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-pack';

// 모든 값을 상수로 교체
const numbers = [1, 2, 3, 4, 5];
const allZeros = numbers.map(constant(0));
// [0, 0, 0, 0, 0]

const allTrue = numbers.map(constant(true));
// [true, true, true, true, true]

// 기본 객체 배열 생성
const users = ['Alice', 'Bob', 'Carol'];
const guestUsers = users.map(constant({ role: 'guest', active: false }));
// [
//   { role: 'guest', active: false },
//   { role: 'guest', active: false },
//   { role: 'guest', active: false }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 로직과 삼항 연산자
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-pack';

// 이렇게 하는 대신:
const getValue = (condition: boolean) => {
  return condition ? () => 'yes' : () => 'no';
};

// constant 사용:
const getValueBetter = (condition: boolean) => {
  return condition ? constant('yes') : constant('no');
};

// 고차 함수에서
function createHandler(isEnabled: boolean) {
  return isEnabled
    ? (data: any) => processData(data)
    : constant(null);  // 비활성화 시 항상 null 반환
}

const handler = createHandler(false);
handler({ important: 'data' });  // null (데이터 무시됨)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      이벤트 핸들러와 콜백
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-pack';

// 항상 같은 액션을 반환하는 간단한 이벤트 핸들러
const createClickHandler = (action: string) => {
  return constant({ type: action, timestamp: Date.now() });
};

const handleSubmit = createClickHandler('FORM_SUBMIT');
const handleCancel = createClickHandler('FORM_CANCEL');

// React/UI 프레임워크에서 사용
function Button({ disabled }: { disabled: boolean }) {
  const onClick = disabled
    ? constant(undefined)  // 비활성화 시 아무것도 안 함
    : () => console.log('클릭됨!');

  return <button onClick={onClick}>클릭하세요</button>;
}

// Promise 콜백
Promise.resolve()
  .then(constant('success'))  // 항상 'success'로 resolve
  .then(value => console.log(value));  // "success"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      기본 함수 인자
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-pack';

// 기본 변환 함수 제공
function processItems<T, U>(
  items: T[],
  transform: (item: T) => U = constant(null) as any
): U[] {
  return items.map(transform);
}

// 기본값 사용 (null 반환)
processItems([1, 2, 3]);
// [null, null, null]

// 커스텀 변환기 사용
processItems([1, 2, 3], x => x * 2);
// [2, 4, 6]

// 기본 에러 핸들러
function fetchData(
  url: string,
  onError: (error: Error) => void = constant(undefined)
) {
  return fetch(url).catch(onError);
}

// 조용한 실패 (에러 무시됨)
fetchData('/api/data');

// 커스텀 에러 처리
fetchData('/api/data', err => console.error(err));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      모킹과 테스팅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant } from 'fp-pack';

// 테스트에서 모의 함수
const mockGetUser = constant({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
});

// 항상 같은 모의 데이터 반환
expect(mockGetUser()).toEqual({ id: 1, name: 'Test User', ... });

// API 응답 모킹
const mockFetch = constant(
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: [] }),
  })
);

// 스텁 함수
const noop = constant(undefined);
const stub = {
  log: noop,
  error: noop,
  warn: noop
};`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      함수형 프로그래밍 패턴
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { constant, pipe } from 'fp-pack';

// 조건부 로직을 위해 pipe에서 사용
const processValue = (shouldDouble: boolean) => pipe(
  (n: number) => n + 10,
  shouldDouble
    ? (n: number) => n * 2
    : constant  // 변경 없이 통과 (항상 입력 반환)
);

// K combinator 패턴 (첫 번째 인자 반환, 두 번째 무시)
const K = <T>(x: T) => constant(x);

const first = K(1)(999);  // 1 (999 무시됨)
const name = K('Alice')('Bob');  // 'Alice' ('Bob' 무시됨)

// 플레이스홀더/더미 구현 생성
interface DataService {
  fetch: () => Promise<any>;
  save: (data: any) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

const mockService: DataService = {
  fetch: constant(Promise.resolve([])),
  save: constant(Promise.resolve()),
  delete: constant(Promise.resolve()),
};`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 constant를 사용하나요?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. 의도의 명확성
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          <code class="px-1 py-0.5 bg-pink-200 dark:bg-pink-800 rounded text-xs">constant(value)</code>를 사용하면
          람다인 <code class="px-1 py-0.5 bg-pink-200 dark:bg-pink-800 rounded text-xs">() =&gt; value</code>보다
          "항상 같은 값을 반환한다"는 것을 더 명확하게 전달합니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 타입 안정성
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          수동으로 작성한 함수보다 더 나은 타입 추론을 제공하며, 특히 복잡한 타입에서 그렇습니다.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. 조합 가능성
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          map, filter와 같은 고차 함수 및 함수 조합 패턴과 원활하게 작동합니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. 참조 안정성
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          매번 같은 값 인스턴스가 반환되므로 React deps 배열 및 동등성 검사에 유용합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      constant vs identity
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          constant - 고정 값 반환
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200 mb-2">
          모든 인자를 무시하고 항상 같은 값을 반환합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fn = constant(5);
fn();       // 5
fn(10);     // 5 (10 무시됨)
fn(100);    // 5 (100 무시됨)`}
        />
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          identity - 입력 반환
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200 mb-2">
          인자로 받은 값을 그대로 반환합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fn = identity;
fn(5);      // 5
fn(10);     // 10
fn(100);    // 100`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부 사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      constant는 우아하게 단순합니다 - 클로저로 값을 캡처합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`function constant<T>(value: T): () => T {
  return () => value;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      값은 클로저에 의해 캡처되므로 함수가 호출될 때마다 같은 참조가 반환됩니다.
      이는 메모리 효율적이고 참조 동등성을 유지합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">constant</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/constant.ts"
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
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/identity"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/identity');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          identity →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          상수 값 대신 입력을 변경하지 않고 반환하는 identity에 대해 알아보세요.
        </p>
      </a>

      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          curry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          유연하고 부분 적용 가능한 함수를 만드는 curry를 알아보세요.
        </p>
      </a>
    </div>
  </div>
);
