import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Assert_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      assert
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건을 검증하고 실패 시 에러 발생
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      assert란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        assert
      </strong>{' '}
      는 조건이 참인지 검증합니다. 조건이 거짓이면 사용자 정의 메시지와 함께 에러를 발생시킵니다.
      조건이 참이면 아무것도 하지 않고 실행이 정상적으로 계속됩니다.
      <br />
      <br />
      이는 <strong>사전 조건 검사</strong>, <strong>불변식 검증</strong>,
      <strong>계약 강제</strong>, 그리고 <strong>방어적 프로그래밍</strong>에 유용합니다.
      <br />
      <br />
      "이 조건은 반드시 참이어야 하며, 그렇지 않으면 즉시 실행을 중단한다"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

function divide(a: number, b: number): number {
  assert(b !== 0, '0으로 나눌 수 없습니다');
  return a / b;
}

divide(10, 2);  // 5
divide(10, 0);  // Error: 0으로 나눌 수 없습니다`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function assert(
  condition: boolean,
  message?: string
): void;

// boolean 조건과 선택적 에러 메시지를 받음
// 조건이 거짓이면 에러를 발생
// 조건이 참이면 아무것도 반환하지 않음 (void)`}
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
      code={`import { assert } from 'fp-pack';

// 메시지 없는 기본 검증
assert(true);   // 에러 없음, 실행 계속
assert(false);  // Error: Assertion failed

// 사용자 정의 메시지와 함께 검증
assert(5 > 3, '5는 3보다 커야 합니다');  // 에러 없음
assert(5 < 3, '5는 3보다 커야 합니다');  // Error: 5는 3보다 커야 합니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      함수 사전 조건
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

function withdraw(amount: number, balance: number): number {
  assert(amount > 0, '금액은 양수여야 합니다');
  assert(amount <= balance, '잔액이 부족합니다');
  return balance - amount;
}

withdraw(50, 100);   // 50
withdraw(-10, 100);  // Error: 금액은 양수여야 합니다
withdraw(150, 100);  // Error: 잔액이 부족합니다`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      입력 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(data: Partial<User>): User {
  assert(data.name !== undefined, '이름은 필수입니다');
  assert(data.email !== undefined, '이메일은 필수입니다');
  assert(data.name.length > 0, '이름은 비어있을 수 없습니다');
  assert(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email), '유효하지 않은 이메일 형식입니다');

  return {
    id: Date.now(),
    name: data.name,
    email: data.email,
  };
}

createUser({ name: 'John', email: 'john@example.com' });
// { id: 1234567890, name: 'John', email: 'john@example.com' }

createUser({ name: '' });
// Error: 이름은 비어있을 수 없습니다

createUser({ name: 'John', email: 'invalid' });
// Error: 유효하지 않은 이메일 형식입니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 연산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

function getFirst<T>(arr: T[]): T {
  assert(arr.length > 0, '배열은 비어있을 수 없습니다');
  return arr[0];
}

function getAt<T>(arr: T[], index: number): T {
  assert(index >= 0, '인덱스는 음수가 될 수 없습니다');
  assert(index < arr.length, '인덱스가 범위를 벗어났습니다');
  return arr[index];
}

getFirst([1, 2, 3]);     // 1
getFirst([]);            // Error: 배열은 비어있을 수 없습니다

getAt(['a', 'b', 'c'], 1);   // 'b'
getAt(['a', 'b', 'c'], -1);  // Error: 인덱스는 음수가 될 수 없습니다
getAt(['a', 'b', 'c'], 10);  // Error: 인덱스가 범위를 벗어났습니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      상태 불변식
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

class BankAccount {
  private balance: number = 0;

  deposit(amount: number): void {
    assert(amount > 0, '입금액은 양수여야 합니다');
    this.balance += amount;
    this.checkInvariant();
  }

  withdraw(amount: number): void {
    assert(amount > 0, '출금액은 양수여야 합니다');
    assert(amount <= this.balance, '잔액이 부족합니다');
    this.balance -= amount;
    this.checkInvariant();
  }

  private checkInvariant(): void {
    // 잔액이 음수가 되지 않도록 보장 (불변식)
    assert(this.balance >= 0, '잔액 불변식 위반: 잔액이 음수입니다');
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();
account.deposit(100);
account.withdraw(50);
console.log(account.getBalance());  // 50`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      pipe와 함께 검증하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert, pipe } from 'fp-pack';

const ensurePositive = (n: number) => {
  assert(n > 0, '값은 양수여야 합니다');
  return n;
};

const parsePositive = pipe(
  (raw: string) => raw.trim(),
  (raw) => Number(raw),
  ensurePositive
);

parsePositive(' 42 '); // 42
parsePositive(' -3 '); // Error: 값은 양수여야 합니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      타입 가드
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

function assertIsString(value: unknown): asserts value is string {
  assert(typeof value === 'string', '값은 문자열이어야 합니다');
}

function assertIsNumber(value: unknown): asserts value is number {
  assert(typeof value === 'number', '값은 숫자여야 합니다');
}

function processValue(value: unknown): string {
  assertIsString(value);
  // TypeScript는 이제 value가 string임을 알고 있습니다
  return value.toUpperCase();
}

processValue('hello');  // 'HELLO'
processValue(123);      // Error: 값은 문자열이어야 합니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 응답 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

function handleApiResponse(response: ApiResponse): any {
  assert(response.success, \`API 에러: \${response.error ?? '알 수 없는 에러'}\`);
  assert(response.data !== undefined, '응답 데이터가 없습니다');
  return response.data;
}

handleApiResponse({ success: true, data: { id: 1, name: 'John' } });
// { id: 1, name: 'John' }

handleApiResponse({ success: false, error: '찾을 수 없음' });
// Error: API 에러: 찾을 수 없음

handleApiResponse({ success: true });
// Error: 응답 데이터가 없습니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      설정 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

interface Config {
  apiUrl: string;
  timeout: number;
  maxRetries: number;
}

function validateConfig(config: Partial<Config>): Config {
  assert(config.apiUrl !== undefined, 'API URL은 필수입니다');
  assert(config.apiUrl.startsWith('http'), 'API URL은 http로 시작해야 합니다');
  assert(config.timeout !== undefined, '타임아웃은 필수입니다');
  assert(config.timeout > 0, '타임아웃은 양수여야 합니다');
  assert(config.maxRetries !== undefined, '최대 재시도 횟수는 필수입니다');
  assert(config.maxRetries >= 0, '최대 재시도 횟수는 음수가 될 수 없습니다');
  assert(config.maxRetries <= 10, '최대 재시도 횟수는 10을 초과할 수 없습니다');

  return config as Config;
}

validateConfig({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  maxRetries: 3,
});
// 유효한 설정

validateConfig({
  apiUrl: 'ftp://api.example.com',
  timeout: 5000,
  maxRetries: 3,
});
// Error: API URL은 http로 시작해야 합니다`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 assert를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 빠른 실패
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          잘못된 상태와 입력을 즉시 포착하여 버그가 코드베이스 전체로 전파되는 것을 방지합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 자체 문서화
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          검증은 실행 가능한 문서로 작동하여 코드가 기대하는 사전 조건과 불변식을 명확하게 나타냅니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 더 나은 에러 메시지
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          사용자 정의 에러 메시지는 무엇이 잘못되었고 왜 잘못되었는지 정확히 설명하여 디버깅을 쉽게 만듭니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. TypeScript 통합
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          TypeScript의 assertion signature와 잘 작동하여 타입 좁히기와 더 나은 타입 안전성을 가능하게 합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function assert(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message ?? 'Assertion failed');
  }
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>boolean 조건과 선택적 에러 메시지를 받습니다</li>
        <li>조건이 거짓이면 제공된 메시지와 함께 Error를 발생시킵니다</li>
        <li>메시지가 제공되지 않으면 기본값인 "Assertion failed"를 사용합니다</li>
        <li>조건이 참이면 아무것도 하지 않고 void를 반환합니다</li>
        <li>검증이 실패하면 즉시 실행이 중단됩니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">assert</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/debug/assert.ts"
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
        href="/debug/invariant"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/debug/invariant');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          invariant →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          불변식과 계약 강제 - 의미론적으로 집중된 검증입니다.
        </p>
      </a>

      <a
        href="/control/guard"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/guard');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          guard →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          실패 시 기본값 반환 - 에러를 발생시키지 않는 검증 대안입니다.
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
          예외를 안전하게 처리 - 함수형 오류 처리 패턴입니다.
        </p>
      </a>

      <a
        href="/debug/log"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/debug/log');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          log →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          파이프라인에서 값 로깅 - 흐름을 방해하지 않고 데이터 검사합니다.
        </p>
      </a>
    </div>
  </div>
);
