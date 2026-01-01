import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Guard_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      guard
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건 실패 시 기본값 반환 (조기 반환 패턴)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      guard란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        guard
      </strong>{' '}
      는 입력을 조건 함수로 검증하고 검증에 실패하면 기본값을 반환하는 함수를 생성합니다.
      조건이 true를 반환하면 원래 값을 반환하고, 그렇지 않으면 기본값을 반환합니다.
      <br />
      <br />
      이는 <strong>조기 반환 패턴</strong>을 함수형으로 구현하며,
      <strong>입력 검증</strong>, <strong>경계 검사</strong>, <strong>대체 값</strong>,
      그리고 <strong>제약 조건 보장</strong>에 이상적입니다.
      <br />
      <br />
      "이 값이 유효하면 사용하고, 그렇지 않으면 이 안전한 기본값을 사용하라"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

// 숫자가 양수인지 확인, 기본값은 0
const ensurePositive = guard(
  (n: number) => n > 0,
  0
);

ensurePositive(5);   // 5 (유효, 원래 값 반환)
ensurePositive(-3);  // 0 (무효, 기본값 반환)
ensurePositive(0);   // 0 (무효, 기본값 반환)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function guard<T>(
  predicate: (value: T) => boolean,
  defaultValue: T
): (value: T) => T;

// 조건 함수와 기본값을 받음
// 검증하고 기본값으로 대체하는 함수를 반환
// 항상 같은 타입을 반환`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

// 문자열이 비어있지 않은지 확인
const ensureNonEmpty = guard(
  (s: string) => s.length > 0,
  'default'
);

ensureNonEmpty('hello');  // 'hello'
ensureNonEmpty('');        // 'default'

// 숫자가 범위 내에 있는지 확인
const ensureInRange = guard(
  (n: number) => n >= 0 && n <= 100,
  50
);

ensureInRange(75);   // 75
ensureInRange(150);  // 50 (범위 벗어남)
ensureInRange(-10);  // 50 (범위 벗어남)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      객체 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

interface Config {
  timeout: number;
  retries: number;
}

const defaultConfig: Config = {
  timeout: 5000,
  retries: 3
};

// 설정이 유효한 timeout을 가지는지 확인
const ensureValidConfig = guard(
  (config: Config) => config.timeout > 0 && config.retries > 0,
  defaultConfig
);

ensureValidConfig({ timeout: 3000, retries: 5 });
// { timeout: 3000, retries: 5 }

ensureValidConfig({ timeout: -1, retries: 5 });
// { timeout: 5000, retries: 3 } (무효, 기본값 반환)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      사용자 입력 정제
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

// 나이가 합리적인지 확인
const sanitizeAge = guard(
  (age: number) => age >= 0 && age <= 150,
  18  // 기본값은 성인 나이
);

sanitizeAge(25);    // 25
sanitizeAge(200);   // 18 (비현실적)
sanitizeAge(-5);    // 18 (무효)

// 사용자명이 요구사항을 충족하는지 확인
const sanitizeUsername = guard(
  (username: string) => username.length >= 3 && username.length <= 20,
  'anonymous'
);

sanitizeUsername('john_doe');  // 'john_doe'
sanitizeUsername('ab');         // 'anonymous' (너무 짧음)
sanitizeUsername('a'.repeat(25)); // 'anonymous' (너무 김)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 응답 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

interface ApiResponse {
  status: number;
  data: unknown;
}

const fallbackResponse: ApiResponse = {
  status: 500,
  data: { error: '잘못된 응답' }
};

// 응답이 유효한 상태 코드를 가지는지 확인
const ensureValidResponse = guard(
  (response: ApiResponse) => response.status >= 200 && response.status < 300,
  fallbackResponse
);

ensureValidResponse({ status: 200, data: { user: 'John' } });
// { status: 200, data: { user: 'John' } }

ensureValidResponse({ status: 404, data: null });
// { status: 500, data: { error: '잘못된 응답' } }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      기본값을 가진 설정
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard, pipe } from 'fp-pack';

interface AppSettings {
  theme: 'light' | 'dark';
  fontSize: number;
  language: string;
}

const defaultSettings: AppSettings = {
  theme: 'light',
  fontSize: 14,
  language: 'en'
};

// 여러 제약 조건 검증
const ensureValidSettings = guard(
  (settings: AppSettings) =>
    (settings.theme === 'light' || settings.theme === 'dark') &&
    settings.fontSize >= 10 && settings.fontSize <= 24 &&
    settings.language.length === 2,
  defaultSettings
);

ensureValidSettings({ theme: 'dark', fontSize: 16, language: 'ko' });
// { theme: 'dark', fontSize: 16, language: 'ko' }

ensureValidSettings({ theme: 'dark', fontSize: 30, language: 'ko' });
// { theme: 'light', fontSize: 14, language: 'en' } (fontSize가 범위 벗어남)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 경계 검사
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

// 배열 인덱스가 유효한지 확인
const createSafeIndexGetter = <T>(arr: T[], defaultValue: T) =>
  guard(
    (index: number) => index >= 0 && index < arr.length,
    defaultValue
  );

const numbers = [10, 20, 30, 40, 50];
const getSafeNumber = createSafeIndexGetter(numbers, -1);

// map과 함께 사용
const indices = [0, 2, 10, -5, 4];
indices.map(getSafeNumber);
// [10, 30, -1, -1, 50]

// 최소 배열 길이 보장
const ensureMinLength = guard(
  (arr: number[]) => arr.length >= 3,
  [0, 0, 0]
);

ensureMinLength([1, 2, 3, 4]);  // [1, 2, 3, 4]
ensureMinLength([1, 2]);         // [0, 0, 0]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 처리를 위한 pipe와 함께 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, guard } from 'fp-pack';

interface Price {
  amount: number;
  currency: string;
}

const defaultPrice: Price = { amount: 0, currency: 'USD' };

// 검증 체인
const processPrice = pipe(
  // 유효한 통화인지 확인
  guard(
    (price: Price) => ['USD', 'EUR', 'GBP'].includes(price.currency),
    defaultPrice
  ),
  // 양수 금액인지 확인
  guard(
    (price: Price) => price.amount > 0,
    defaultPrice
  )
);

processPrice({ amount: 100, currency: 'USD' });
// { amount: 100, currency: 'USD' }

processPrice({ amount: 100, currency: 'JPY' });
// { amount: 0, currency: 'USD' } (무효한 통화)

processPrice({ amount: -50, currency: 'USD' });
// { amount: 0, currency: 'USD' } (음수 금액)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      폼 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

interface FormData {
  email: string;
  password: string;
  age: number;
}

const emptyForm: FormData = {
  email: '',
  password: '',
  age: 0
};

// 이메일 검증
const ensureValidEmail = guard(
  (form: FormData) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email),
  emptyForm
);

// 비밀번호 강도
const ensureStrongPassword = guard(
  (form: FormData) => form.password.length >= 8,
  emptyForm
);

// guard를 사용한 폼 처리
const validateForm = (form: FormData) => {
  const emailChecked = ensureValidEmail(form);
  if (emailChecked === emptyForm) return { error: '잘못된 이메일' };

  const passwordChecked = ensureStrongPassword(emailChecked);
  if (passwordChecked === emptyForm) return { error: '비밀번호가 너무 약함' };

  return { success: true, data: passwordChecked };
};

validateForm({ email: 'user@example.com', password: 'securepass123', age: 25 });
// { success: true, data: {...} }

validateForm({ email: 'invalid', password: 'securepass123', age: 25 });
// { error: '잘못된 이메일' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 guard를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 안전한 기본값
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          안전한 기본값으로 자동 대체하여 애플리케이션이 절대 잘못된 데이터를
          처리하지 않도록 보장합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 선언적 검증
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          장황한 if-else 체인 대신 단일하고 명확한 함수 호출로 검증 로직과
          대체 동작을 표현합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 조합 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          여러 guard를 pipe와 함께 체인하여 다단계 검증 파이프라인을 만들 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 타입 안전성
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          항상 같은 타입(T)을 반환하므로 해당 타입을 기대하는 모든 컨텍스트에서
          안전하게 사용할 수 있습니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function guard<T>(
  predicate: (value: T) => boolean,
  defaultValue: T
): (value: T) => T {
  return (value: T) => (predicate(value) ? value : defaultValue);
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>조건 함수와 T 타입의 기본값을 받습니다</li>
        <li>입력을 검증하는 새 함수를 반환합니다</li>
        <li>조건이 true를 반환하면 원래 값을 반환합니다</li>
        <li>조건이 false를 반환하면 기본값을 반환합니다</li>
        <li>부수 효과가 없는 순수 함수입니다</li>
        <li>기본값은 T 타입의 안전하고 유효한 인스턴스여야 합니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">guard</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/control/guard.ts"
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
        href="/control/unless"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/unless');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          unless →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건이 거짓일 때 함수 적용 - 유사한 검증 패턴입니다.
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
          두 가지 변환 중 선택 - 더 유연한 분기입니다.
        </p>
      </a>

      <a
        href="/control/tryCatch"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/tryCatch');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          tryCatch →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          예외를 안전하게 처리 - 오류 기반 대체 패턴입니다.
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
          여러 조건 처리 - guard를 여러 규칙으로 확장합니다.
        </p>
      </a>
    </div>
  </div>
);
