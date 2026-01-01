import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Unless_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      unless
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건이 거짓일 때만 함수 적용
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      unless란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        unless
      </strong>{' '}
      는{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">when</code>의 반대입니다.
      조건이 false를 반환할 때만 변환을 적용하는 함수를 생성합니다.
      조건이 true를 반환하면 원래 값을 변경하지 않고 반환합니다.
      <br />
      <br />
      이는 <strong>부정 조건</strong>, <strong>대체 변환</strong>,
      <strong>기본값 처리</strong>, 그리고 <strong>오류 수정</strong>에 유용합니다.
      <br />
      <br />
      "이 조건이 아닐 때만 이 값을 변환하라"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

const abs = unless(
  (n: number) => n > 0,
  (n) => n * -1
);

abs(5);    // 5  (양수이므로 변경 없음)
abs(-3);   // 3  (음수이므로 양수로 변환)
abs(0);    // 0  (0이므로 변경 없음)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function unless<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T;

// 조건 함수와 변환 함수를 받음
// 조건이 거짓일 때 변환을 적용하는 함수를 반환`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

// 값이 없을 때만 기본값 제공
const withDefault = unless(
  (s: string) => s.length > 0,
  () => 'default'
);

withDefault('hello');  // 'hello'
withDefault('');       // 'default'

// 양수가 아닐 때만 양수로 변환
const ensurePositive = unless(
  (n: number) => n > 0,
  (n) => Math.abs(n)
);

ensurePositive(5);    // 5
ensurePositive(-3);   // 3`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      기본값 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

interface Config {
  timeout?: number;
  retries?: number;
}

// 지정되지 않았을 때만 기본 타임아웃 설정
const withDefaultTimeout = unless(
  (config: Config) => config.timeout !== undefined,
  (config) => ({ ...config, timeout: 5000 })
);

withDefaultTimeout({ retries: 3 });
// { retries: 3, timeout: 5000 }

withDefaultTimeout({ timeout: 10000, retries: 3 });
// { timeout: 10000, retries: 3 } (변경 없음)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      입력 검증 및 수정
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';
import { pipe } from 'fp-pack';

// 최소값 미만일 때만 최소값으로 설정
const ensureMinimum = (min: number) =>
  unless(
    (n: number) => n >= min,
    () => min
  );

// 최대값 초과일 때만 최대값으로 설정
const ensureMaximum = (max: number) =>
  unless(
    (n: number) => n <= max,
    () => max
  );

// 값을 범위로 제한
const clamp = (min: number, max: number) =>
  pipe(
    ensureMinimum(min),
    ensureMaximum(max)
  );

const clamp0to100 = clamp(0, 100);
clamp0to100(150);   // 100
clamp0to100(-10);   // 0
clamp0to100(50);    // 50`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      오류 복구
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

interface Result {
  success: boolean;
  data?: any;
  error?: string;
}

// 성공하지 않았을 때만 재시도
const retryUnlessSuccess = unless(
  (result: Result) => result.success,
  (result) => ({
    ...result,
    error: '재시도 중...',
    retryCount: (result as any).retryCount ? (result as any).retryCount + 1 : 1
  })
);

retryUnlessSuccess({ success: true, data: 'done' });
// { success: true, data: 'done' }

retryUnlessSuccess({ success: false, error: 'failed' });
// { success: false, error: '재시도 중...', retryCount: 1 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';

// 배열이 아닐 때만 배열로 변환
const ensureArray = unless(
  <T>(value: T | T[]): value is T[] => Array.isArray(value),
  <T>(value: T | T[]): T[] => [value] as T[]
);

ensureArray([1, 2, 3]);   // [1, 2, 3]
ensureArray(42);          // [42]
ensureArray('hello');     // ['hello']

// 빈 배열이 있을 때만 필터링
const removeEmptyArrays = unless(
  (arr: any[][]) => arr.every(a => a.length > 0),
  (arr) => arr.filter(a => a.length > 0)
);

removeEmptyArrays([[1], [2], [3]]);        // [[1], [2], [3]]
removeEmptyArrays([[1], [], [3]]);         // [[1], [3]]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      상태 정규화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { unless } from 'fp-pack';
import { pipe } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
  verified: boolean;
}

const normalizeUser = pipe(
  // verified 플래그가 없을 때만 추가
  unless(
    (user: User) => 'verified' in user,
    (user) => ({ ...user, verified: false })
  ),
  // 이름이 trim되지 않았을 때만 trim
  unless(
    (user: User) => user.name === user.name.trim(),
    (user) => ({ ...user, name: user.name.trim() })
  ),
  // 이메일이 소문자가 아닐 때만 소문자로 변환
  unless(
    (user: User) => user.email === user.email.toLowerCase(),
    (user) => ({ ...user, email: user.email.toLowerCase() })
  )
);

normalizeUser({ id: 1, name: '  John  ', email: 'JOHN@EXAMPLE.COM', verified: false });
// { id: 1, name: 'John', email: 'john@example.com', verified: false }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 unless를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 부정 조건 로직
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          "~이 아닐 때 실행"하는 로직을 자연스럽게 표현하며, 조건을 부정하는 것보다 읽기 쉬운 경우가 많습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. when의 보완
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          when과 반대 동작을 제공하여 조건부 로직 표현에 유연성을 제공합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 기본값 패턴
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          조건이 충족되지 않을 때 기본값이나 대체값을 설정하는 데 완벽합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 조합 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          pipe 및 다른 함수형 유틸리티와 완벽하게 작동하여 복잡한 변환을 만들 수 있습니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function unless<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T {
  return (value: T) => (predicate(value) ? value : fn(value));
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>조건 함수와 변환 함수를 받습니다</li>
        <li>조건을 테스트하는 새 함수를 반환합니다</li>
        <li>조건이 false를 반환하면 변환을 적용합니다</li>
        <li>조건이 true를 반환하면 원래 값을 반환합니다</li>
        <li>부수 효과가 없는 순수 함수입니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">unless</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/control/unless.ts"
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
        href="/control/when"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/when');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          when →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건이 참일 때 함수 적용 - unless의 반대입니다.
        </p>
      </a>

      <a
        href="/control/ifElse"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/ifElse');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          ifElse →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건에 따라 두 가지 변환 중 하나를 선택합니다.
        </p>
      </a>

      <a
        href="/control/guard"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/guard');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          guard →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건 실패 시 기본값 반환 - 유사한 사용 사례입니다.
        </p>
      </a>

      <a
        href="/control/cond"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/cond');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          cond →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          패턴 매칭으로 여러 조건 분기를 처리합니다.
        </p>
      </a>
    </div>
  </div>
);
