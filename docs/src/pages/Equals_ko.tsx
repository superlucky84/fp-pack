import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Equals_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      equals
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      두 값 간의 깊은 동등성 비교를 수행합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      equals란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        equals
      </strong>{' '}
      는 두 값 간의 깊은 동등성 비교를 수행하여, 구조적으로 동일한지 확인합니다.
      <br />
      <br />
      JavaScript의 <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">===</code> 연산자가
      객체에 대해 참조 동등성만 확인하는 것과 달리, <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">equals</code>는
      객체와 배열의 내용을 재귀적으로 비교합니다. NaN, Date 객체, 순환 참조와 같은 특수한 경우도 올바르게 처리합니다.
      <br />
      <br />
      이는 복잡한 데이터 구조 비교, API 응답 검증, 상태 동등성 테스트, 함수형 프로그래밍에서의 값 기반 비교를 구현하는 데 필수적입니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

equals(1, 1);                    // true
equals([1, 2], [1, 2]);          // true
equals({ a: 1 }, { a: 1 });      // true
equals([1, 2], [1, 3]);          // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      기본 타입 값
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

// 숫자
equals(42, 42);        // true
equals(42, 43);        // false

// 문자열
equals('hello', 'hello');  // true
equals('hello', 'world');  // false

// 불리언
equals(true, true);    // true
equals(true, false);   // false

// 특수 케이스: NaN (=== 연산자와 다름)
equals(NaN, NaN);      // true
NaN === NaN;           // false (표준 JavaScript 동작)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

// 단순 배열
equals([1, 2, 3], [1, 2, 3]);           // true
equals([1, 2, 3], [1, 2, 4]);           // false
equals([1, 2], [1, 2, 3]);              // false (길이가 다름)

// 중첩 배열 (깊은 비교)
equals([1, [2, 3]], [1, [2, 3]]);       // true
equals([1, [2, 3]], [1, [2, 4]]);       // false

// 빈 배열
equals([], []);                          // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      객체
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

// 단순 객체
equals({ a: 1, b: 2 }, { a: 1, b: 2 });     // true
equals({ a: 1, b: 2 }, { a: 1, b: 3 });     // false
equals({ a: 1 }, { a: 1, b: 2 });           // false (키가 다름)

// 중첩 객체 (깊은 비교)
equals(
  { user: { name: 'Alice', age: 30 } },
  { user: { name: 'Alice', age: 30 } }
);  // true

equals(
  { user: { name: 'Alice', age: 30 } },
  { user: { name: 'Alice', age: 31 } }
);  // false

// 빈 객체
equals({}, {});                              // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Date 객체
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

const date1 = new Date('2024-01-01');
const date2 = new Date('2024-01-01');
const date3 = new Date('2024-01-02');

equals(date1, date2);  // true (같은 타임스탬프)
equals(date1, date3);  // false (다른 타임스탬프)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      React 상태 비교
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

interface UserState {
  id: number;
  name: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

function shouldUpdateUser(
  prevState: UserState,
  newState: UserState
): boolean {
  // 깊은 동등성을 확인하여 불필요한 재렌더링 방지
  return !equals(prevState, newState);
}

const state1 = {
  id: 1,
  name: 'Alice',
  preferences: { theme: 'dark', notifications: true }
};

const state2 = {
  id: 1,
  name: 'Alice',
  preferences: { theme: 'dark', notifications: true }
};

const state3 = {
  id: 1,
  name: 'Alice',
  preferences: { theme: 'light', notifications: true }
};

shouldUpdateUser(state1, state2);  // false (업데이트 불필요)
shouldUpdateUser(state1, state3);  // true (업데이트 필요)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 응답 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

interface ApiResponse {
  status: number;
  data: {
    users: Array<{ id: number; name: string }>;
  };
}

function validateResponse(
  received: ApiResponse,
  expected: ApiResponse
): boolean {
  return equals(received, expected);
}

const expected = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  }
};

const received = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ]
  }
};

validateResponse(received, expected);  // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 중복 제거
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
}

function deduplicateProducts(products: Product[]): Product[] {
  return products.filter((product, index) =>
    products.findIndex(p => equals(p, product)) === index
  );
}

const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 29 },
  { id: 1, name: 'Laptop', price: 999 },  // 중복
  { id: 3, name: 'Keyboard', price: 79 }
];

deduplicateProducts(products);
// [
//   { id: 1, name: 'Laptop', price: 999 },
//   { id: 2, name: 'Mouse', price: 29 },
//   { id: 3, name: 'Keyboard', price: 79 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      폼 변경 감지
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

interface FormData {
  username: string;
  email: string;
  settings: {
    newsletter: boolean;
    notifications: boolean;
  };
}

class FormManager {
  private initialData: FormData;
  private currentData: FormData;

  constructor(data: FormData) {
    this.initialData = data;
    this.currentData = { ...data };
  }

  hasChanges(): boolean {
    return !equals(this.initialData, this.currentData);
  }

  updateField(field: keyof FormData, value: any) {
    this.currentData = { ...this.currentData, [field]: value };
  }

  canSave(): boolean {
    return this.hasChanges();
  }
}

const form = new FormManager({
  username: 'alice',
  email: 'alice@example.com',
  settings: { newsletter: true, notifications: false }
});

form.hasChanges();  // false (아직 변경 없음)

form.updateField('email', 'alice@newdomain.com');
form.hasChanges();  // true (이메일 변경됨)
form.canSave();     // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      메모이제이션 캐시 키
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

interface CacheEntry<T> {
  args: any[];
  result: T;
}

function memoizeDeep<T extends (...args: any[]) => any>(
  fn: T
): T {
  const cache: CacheEntry<ReturnType<T>>[] = [];

  return ((...args: any[]) => {
    // 깊은 동등성으로 캐시된 결과 찾기
    const cached = cache.find(entry => equals(entry.args, args));

    if (cached) {
      return cached.result;
    }

    const result = fn(...args);
    cache.push({ args, result });
    return result;
  }) as T;
}

const expensiveOperation = memoizeDeep(
  (config: { filters: string[]; sort: string }) => {
    console.log('계산 중...');
    return \`\${config.filters.join(',')}의 결과를 \${config.sort}로 정렬\`;
  }
);

expensiveOperation({ filters: ['active', 'premium'], sort: 'date' });
// 로그: "계산 중..."

expensiveOperation({ filters: ['active', 'premium'], sort: 'date' });
// 로그 없음 - 캐시된 결과 반환 (깊은 동등성 일치)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      테스트 단언
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

function assertDeepEqual<T>(actual: T, expected: T, message?: string) {
  if (!equals(actual, expected)) {
    throw new Error(
      message || \`\${JSON.stringify(expected)}를 기대했지만 \${JSON.stringify(actual)}를 받았습니다\`
    );
  }
}

// 테스트에서 사용
const userService = {
  getUser: (id: number) => ({
    id,
    name: 'Alice',
    roles: ['admin', 'user']
  })
};

assertDeepEqual(
  userService.getUser(1),
  { id: 1, name: 'Alice', roles: ['admin', 'user'] }
);  // 통과

assertDeepEqual(
  userService.getUser(1),
  { id: 1, name: 'Bob', roles: ['admin', 'user'] }
);  // 에러 발생`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      순환 참조
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { equals } from 'fp-pack';

// 순환 참조를 안전하게 처리
const obj1: any = { name: 'Alice', age: 30 };
obj1.self = obj1;

const obj2: any = { name: 'Alice', age: 30 };
obj2.self = obj2;

equals(obj1, obj2);  // true (순환 참조 처리)

// 다른 순환 참조
const obj3: any = { name: 'Bob', age: 25 };
obj3.self = obj3;

equals(obj1, obj3);  // false (값이 다름)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 특징
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 깊은 비교
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          참조만 확인하는 ===와 달리, 중첩된 객체와 배열을 재귀적으로 비교합니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. NaN 처리
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          표준 === 연산자와 달리, NaN을 NaN과 동등하게 올바르게 처리합니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Date 지원
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Date 객체를 getTime()을 사용하여 타임스탬프 값으로 비교합니다.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 순환 참조 안전
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          WeakMap을 사용하여 방문한 객체를 추적하고 무한 루프 없이 순환 참조를 안전하게 처리합니다.
        </p>
      </div>

      <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
          5. 구조적 동등성
        </h4>
        <p class="text-sm text-yellow-800 dark:text-yellow-200">
          참조가 아닌 구조와 내용으로 값을 비교합니다.
          동일한 속성을 가진 두 개의 다른 객체는 동등한 것으로 간주됩니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">equals</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/equality/equals.ts"
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
          navigateTo('/ko/equality/includes');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          includes
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          깊은 동등성으로 포함 여부를 확인합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/isNil');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          isNil
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          null 또는 undefined인지 확인합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/isEmpty');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          isEmpty
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          배열/문자열/객체가 비었는지 확인합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/isType');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          isType
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          런타임 타입을 확인합니다
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/ko/equality/clamp"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/clamp');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          clamp →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          값을 지정된 범위로 제한합니다.
        </p>
      </a>

      <a
        href="/ko/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          깊은 동등성 필터링을 위해 equals를 filter와 함께 사용하세요.
        </p>
      </a>
    </div>
  </div>
);
