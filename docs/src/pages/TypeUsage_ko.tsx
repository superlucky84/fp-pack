import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const TypeUsage_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      타입 활용 가이드
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      fp-pack의 헬퍼 타입을 활용하여 조합, 커링, 커스텀 유틸리티 작성 시 타입 추론을 유지하세요
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 헬퍼란 무엇인가요?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack은 함수형 조합 전반에 걸쳐 타입 추론을 유지할 수 있도록 신중하게 선별된 공개 TypeScript 헬퍼 타입 세트를 제공합니다. 이러한 타입들은 라이브러리의 유틸리티와 원활하게 작동하도록 설계되었으며, 코드를 타입 안전하고 유지보수 가능하게 만들어줍니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">import type</code>을 사용하면 이러한 헬퍼들이 런타임 오버헤드를 전혀 추가하지 않으면서도 강력한 컴파일 타임 보장을 제공합니다. 이 가이드는 각 헬퍼 타입과 실용적인 사용 사례를 안내합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      빠른 Import 참조
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      모든 타입 헬퍼는 fp-pack에서 타입 전용 import로 사용할 수 있습니다. <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">import type</code>을 사용하여 런타임 번들 크기에 영향을 주지 않도록 하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`// 핵심 타입 헬퍼
import type { Curried, Curry3, FromFn, MatchHandlers, PathKey } from 'fp-pack';

// 스트림 타입 헬퍼
import type { AnyIterable, AnyIterableInput, PromiseLikeValue } from 'fp-pack/stream';`}
    />

    <div class="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        💡 타입 선언 파일 위치
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
        생성된 타입 선언을 직접 확인해야 할 때는 다음 경로에서 찾을 수 있습니다:
      </p>
      <CodeBlock
        language="text"
        code={`# 패키지 설치 후
node_modules/fp-pack/dist/index.d.ts
node_modules/fp-pack/dist/stream/index.d.ts

# 레포지토리에서 빌드 후
dist/index.d.ts
dist/stream/index.d.ts`}
      />
      <p class="text-xs text-blue-700 dark:text-blue-300 mt-4">
        이 경로들은 빌드 산출물이므로 버전에 따라 약간 다를 수 있습니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      커리 함수 타입
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      커리 함수를 다룰 때 fp-pack은 모든 부분 적용 단계에서 완전한 타입 추론을 유지할 수 있는 특수 타입을 제공합니다. <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Curried</code> 타입은 모든 함수와 작동하며, <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">Curry3</code>와 같은 특정 타입은 알려진 인자 수를 가진 함수에 최적화된 추론을 제공합니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      기본 커리 타입 사용법
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';
import type { Curried, Curry3 } from 'fp-pack';

// 3개의 매개변수를 가진 원본 함수
const add3 = (a: number, b: number, c: number) => a + b + c;

// 제네릭 Curried 타입 사용
const curriedAdd3: Curried<typeof add3> = curry(add3);

// 더 나은 추론을 위한 특정 Curry3 타입 사용
const curriedAdd3Alt: Curry3<typeof add3> = curry(add3);

// 모두 완전한 타입 안전성과 함께 작동
const result1 = curriedAdd3(1)(2)(3);     // number
const result2 = curriedAdd3(1, 2)(3);      // number
const result3 = curriedAdd3Alt(1)(2, 3);   // number`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      재사용 가능한 유틸리티 만들기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry, pipe } from 'fp-pack';
import type { Curried } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
}

// 커리된 필터 함수 생성
const filterBy = <T>(
  predicate: (item: T) => boolean,
  items: T[]
): T[] => items.filter(predicate);

const curriedFilter: Curried<typeof filterBy> = curry(filterBy);

// 부분 적용으로 특화된 필터 생성
const filterUsers = curriedFilter<User>((user) => user.id > 100);

const users: User[] = [
  { id: 101, name: 'Alice', email: 'alice@example.com' },
  { id: 99, name: 'Bob', email: 'bob@example.com' },
  { id: 150, name: 'Charlie', email: 'charlie@example.com' },
];

const filteredUsers = filterUsers(users);
// 타입: User[]
// 결과: [{ id: 101, ... }, { id: 150, ... }]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      from 기반 파이프라인 타입
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">FromFn</code> 타입은 <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">from</code> 유틸리티로 생성된 함수를 나타냅니다. 파이프라인의 첫 번째 함수로 사용될 때 초기 입력 값 없이 파이프라인을 호출할 수 있어 더 깔끔한 데이터 우선 패턴을 가능하게 합니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      기본 from 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { from, pipe } from 'fp-pack';
import type { FromFn } from 'fp-pack';

// 명시적 타입으로 from 함수 생성
const startWith5: FromFn<number> = from(5);

// 이 값으로 시작하는 파이프라인 구축
const calculate = pipe(
  startWith5,
  (n) => n * 2,      // 10
  (n) => n + 3       // 13
);

// 입력 없이 호출 가능!
const result = calculate();  // 13

// 또는 입력과 함께 (무시됨)
const result2 = calculate(999);  // 여전히 13`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      SideEffect 파이프라인과 함께 from 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { from, pipeSideEffectStrict, SideEffect } from 'fp-pack';
import type { FromFn } from 'fp-pack';

// 고정 설정 값으로 시작
const defaultConfig: FromFn<{ threshold: number }> = from({ threshold: 10 });

const validateAndProcess = pipeSideEffectStrict(
  defaultConfig,
  (config) => config.threshold,
  (threshold) => threshold * 2,
  (value) => {
    if (value < 15) {
      return SideEffect.of(() => 'TOO_LOW' as const);
    }
    return value;
  }
);

// 파이프라인 실행
const result = validateAndProcess();
// 타입: number | SideEffect<'TOO_LOW'>
// 결과: 20

// 결과 처리
const finalValue = result instanceof SideEffect
  ? 0
  : result;  // 20`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      스트림 입력 타입
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack의 스트림 모듈은 동기 및 비동기 iterable을 다루기 위한 유연한 타입 헬퍼를 제공합니다. 이러한 타입을 사용하면 타입 안전성을 유지하면서 여러 입력 형식을 받는 함수를 작성할 수 있습니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      유연한 입력을 위한 AnyIterableInput
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { toAsync } from 'fp-pack/stream';
import type { AnyIterableInput, PromiseLikeValue } from 'fp-pack/stream';

// 모든 형태의 iterable 입력 수용
async function normalize<T>(
  input: AnyIterableInput<PromiseLikeValue<T>>
): Promise<T[]> {
  const result: T[] = [];

  // toAsync가 모든 입력 타입을 균일하게 처리
  for await (const item of toAsync(input)) {
    result.push(item);
  }

  return result;
}

// 배열과 함께 작동
const arr = await normalize([1, 2, 3]);  // number[]

// 프로미스 배열과 함께 작동
const promiseArr = await normalize(Promise.resolve([4, 5, 6]));  // number[]

// 비동기 제너레이터와 함께 작동
async function* generateNumbers() {
  yield 7;
  yield 8;
  yield 9;
}
const asyncGen = await normalize(generateNumbers());  // number[]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      반환 타입을 위한 AnyIterable
    </h3>

    <CodeBlock
      language="typescript"
      code={`import type { AnyIterable } from 'fp-pack/stream';

// 동기 또는 비동기 iterable을 반환할 수 있는 함수
function createNumberStream(async: boolean): AnyIterable<number> {
  if (async) {
    // 비동기 iterable 반환
    return (async function* () {
      yield 1;
      yield 2;
      yield 3;
    })();
  } else {
    // 동기 iterable 반환
    return (function* () {
      yield 1;
      yield 2;
      yield 3;
    })();
  }
}

// 소비자는 어떤 타입인지 알 필요 없음
async function consumeStream(stream: AnyIterable<number>) {
  for await (const num of stream) {
    console.log(num);
  }
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      객체 경로 타입
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">PathKey</code> 타입은 중첩된 객체 속성에 접근하기 위한 유효한 키를 나타냅니다. 문자열, 숫자 또는 심볼이 될 수 있어 깊은 속성 접근 및 조작에 완벽합니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      path와 assocPath에서 PathKey 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assocPath, path } from 'fp-pack';
import type { PathKey } from 'fp-pack';

interface Database {
  users: Array<{
    id: number;
    name: string;
    settings: {
      theme: string;
      notifications: boolean;
    };
  }>;
}

const db: Database = {
  users: [
    {
      id: 1,
      name: 'Alice',
      settings: { theme: 'dark', notifications: true }
    }
  ]
};

// 타입 안전한 경로 정의
const themePath: PathKey[] = ['users', 0, 'settings', 'theme'];

// 중첩된 값 읽기
const currentTheme = path<string>(themePath, db);
console.log(currentTheme);  // 'dark'

// 중첩된 값을 불변적으로 업데이트
const updatedDb = assocPath(themePath, 'light', db);
console.log(path<string>(themePath, updatedDb));  // 'light'
console.log(path<string>(themePath, db));  // 'dark' (원본은 변경되지 않음)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      재사용 가능한 경로 유틸리티 구축
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { path, assocPath } from 'fp-pack';
import type { PathKey } from 'fp-pack';

// 경로 빌더 유틸리티 생성
function buildPath(...keys: PathKey[]): PathKey[] {
  return keys;
}

// 공통 경로 정의
const userNamePath = buildPath('users', 0, 'name');
const userSettingsPath = buildPath('users', 0, 'settings');
const userThemePath = buildPath('users', 0, 'settings', 'theme');

// 커리된 접근자 생성
const getName = path<string>(userNamePath);
const getTheme = path<string>(userThemePath);

const db = {
  users: [
    {
      name: 'Bob',
      settings: { theme: 'dark', notifications: false }
    }
  ]
};

console.log(getName(db));   // 'Bob'
console.log(getTheme(db));  // 'dark'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect 핸들러 타입
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">MatchHandlers</code> 타입은 <code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm">SideEffect</code> 값을 포함할 수 있는 유니온 타입의 타입 안전한 처리를 보장합니다. 값과 효과 케이스를 모두 처리하는 구조화된 방법을 제공합니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      기본 matchSideEffect 사용법
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { matchSideEffect, SideEffect } from 'fp-pack';
import type { MatchHandlers } from 'fp-pack';

type ValidationResult = number | SideEffect<'INVALID' | 'TOO_LOW' | 'TOO_HIGH'>;

function validate(input: string): ValidationResult {
  const num = parseInt(input, 10);

  if (isNaN(num)) {
    return SideEffect.of(() => 'INVALID' as const, 'INVALID');
  }
  if (num < 0) {
    return SideEffect.of(() => 'TOO_LOW' as const, 'TOO_LOW');
  }
  if (num > 100) {
    return SideEffect.of(() => 'TOO_HIGH' as const, 'TOO_HIGH');
  }

  return num;
}

// 명시적 타입으로 핸들러 정의
const handlers: MatchHandlers<number, string, string> = {
  value: (num) => \`유효: \${num}\`,
  effect: (eff) => \`에러: \${eff.label ?? 'UNKNOWN'}\`
};

// matchSideEffect로 두 케이스 모두 처리
const result1 = validate('42');
console.log(matchSideEffect(result1, handlers));  // '유효: 42'

const result2 = validate('-5');
console.log(matchSideEffect(result2, handlers));  // '에러: TOO_LOW'

const result3 = validate('abc');
console.log(matchSideEffect(result3, handlers));  // '에러: INVALID'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      고급 핸들러 패턴
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { matchSideEffect, SideEffect, pipe } from 'fp-pack';
import type { MatchHandlers } from 'fp-pack';

type ApiResponse<T> = T | SideEffect<'NETWORK_ERROR' | 'NOT_FOUND' | 'UNAUTHORIZED'>;

interface User {
  id: number;
  name: string;
  email: string;
}

function fetchUser(id: number): ApiResponse<User> {
  if (id < 0) {
    return SideEffect.of(() => 'UNAUTHORIZED' as const, 'UNAUTHORIZED');
  }
  if (id > 1000) {
    return SideEffect.of(() => 'NOT_FOUND' as const, 'NOT_FOUND');
  }

  return {
    id,
    name: \`User \${id}\`,
    email: \`user\${id}@example.com\`
  };
}

// 다양한 시나리오를 위한 여러 핸들러 생성
const logHandlers: MatchHandlers<User, void, void> = {
  value: (user) => console.log(\`사용자 발견: \${user.name}\`),
  effect: (eff) => console.error(\`에러: \${eff.label}\`)
};

const mapToNameHandlers: MatchHandlers<User, string, string> = {
  value: (user) => user.name,
  effect: (eff) => \`에러: \${eff.label ?? 'UNKNOWN'}\`
};

const response1 = fetchUser(42);
matchSideEffect(response1, logHandlers);  // 로그: '사용자 발견: User 42'

const response2 = fetchUser(9999);
const userName = matchSideEffect(response2, mapToNameHandlers);
console.log(userName);  // '에러: NOT_FOUND'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 타입 헬퍼를 사용할까요?
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
          런타임 비용 제로
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          타입 헬퍼는 컴파일 타임 전용 구조로 최종 번들에 코드를 추가하지 않아 타입 안전성을 유지하면서 최적의 성능을 보장합니다.
        </p>
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-100 dark:border-purple-800">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
          향상된 IDE 지원
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          명시적 타입 주석은 개발 환경에서 우수한 자동완성, 인라인 문서, 오류 메시지를 제공합니다.
        </p>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-100 dark:border-green-800">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
          타입 추론 유지
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          타입 헬퍼는 TypeScript가 복잡한 조합, 커링, 변환을 통해 정밀도를 잃지 않고 타입을 추적할 수 있도록 보장합니다.
        </p>
      </div>

      <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-100 dark:border-orange-800">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          재사용 가능한 패턴
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          명시적 타입 헬퍼를 함수와 유틸리티의 계약으로 사용하여 코드베이스의 공통 패턴을 문서화하고 표준화하세요.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 문서
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          curry
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          실용적인 예제와 함께 커링 및 데이터-마지막 패턴에 대해 배우세요.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/from');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          from
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          더 깔끔한 함수형 조합을 위해 고정 값으로 파이프라인을 초기화하세요.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/toAsync');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          toAsync
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          모든 iterable 입력을 균일한 처리를 위해 비동기 iterable로 변환하세요.
        </p>
      </div>

      <div
        class="p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-pink-400 dark:hover:border-pink-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/guide');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          상세 가이드
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          fp-pack 개념과 패턴에 대한 종합 가이드입니다.
        </p>
      </div>
    </div>
  </div>
);
