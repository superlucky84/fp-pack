import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const SideEffect_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      SideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      SideEffect 파이프라인을 위한 지연 실행 컨테이너
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        SideEffect
      </strong>{' '}
      는 지연 실행을 위해 effect(함수)를 감싸는 컨테이너입니다. pipeSideEffect/pipeAsyncSideEffect 내 함수가 SideEffect를 반환하면,
      파이프라인은 즉시 중단되고 실행하지 않은 채로 SideEffect를 반환합니다. effect는 명시적으로
      <code class="text-sm">runPipeResult()</code> 또는 <code class="text-sm">sideEffect.effect()</code>를 호출할 때만 실행됩니다.
      이 패턴은 모든 곳에 래퍼 타입을 사용하지 않고도 함수형 파이프라인에서 깔끔한 에러 처리와 조기 종료를 가능하게 합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { SideEffect, pipeSideEffect, runPipeResult } from 'fp-kit';

// 나중에 실행될 SideEffect 생성
const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        console.log('나이 검증 실패');
        return null;
      });

const processAge = pipeSideEffect(
  validateAge,
  (age) => age * 2,      // SideEffect 반환 시 건너뜀
  (age) => \`나이: \${age}\`,
  runPipeResult          // SideEffect가 있으면 실행
);

processAge(15); // "나이 검증 실패" 로그, null 반환`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`class SideEffect<T = any> {
  constructor(effect: () => T, label?: string);

  static of<T>(effect: () => T, label?: string): SideEffect<T>;

  effect(): T;
  label?: string;
}

// 타입 가드
function isSideEffect(value: unknown): value is SideEffect;

// 패턴 매칭
function matchSideEffect<T, R>(
  value: T | SideEffect,
  handlers: {
    value: (v: T) => R;
    effect: (se: SideEffect) => R;
  }
): R;

// SideEffect 실행 또는 값 반환
function runPipeResult<T, R>(value: T | SideEffect<R>): T | R;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실용적인 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      조기 종료를 사용한 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

interface FormData {
  email: string;
  age: number;
}

const validateEmail = (data: FormData) =>
  data.email.includes('@')
    ? data
    : SideEffect.of(() => {
        throw new Error('유효하지 않은 이메일');
      });

const validateAge = (data: FormData) =>
  data.age >= 18
    ? data
    : SideEffect.of(() => {
        throw new Error('만 18세 이상이어야 합니다');
      });

const processForm = pipeSideEffect(
  validateEmail,
  validateAge,
  (data) => ({ success: true, data }),
  runPipeResult
);

try {
  processForm({ email: 'test@example.com', age: 25 });
  // { success: true, data: { email: 'test@example.com', age: 25 } }

  processForm({ email: 'invalid', age: 25 });
  // 에러 발생: Error: 유효하지 않은 이메일
} catch (err) {
  console.error(err.message);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      옵셔널 체이닝 패턴
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

interface User {
  id: string;
  profile?: {
    settings?: {
      theme: string;
    };
  };
}

const findUser = (id: string): User | SideEffect => {
  const user = database.get(id);
  return user ? user : SideEffect.of(() => null);
};

const getUserTheme = pipeSideEffect(
  findUser,
  (user) => user.profile ?? SideEffect.of(() => null),
  (profile) => profile.settings ?? SideEffect.of(() => null),
  (settings) => settings.theme,
  runPipeResult
);

getUserTheme('user-123'); // 'dark' 또는 단계가 실패하면 null`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      사이드 이펙트를 사용한 에러 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

interface PaymentData {
  amount: number;
  userId: string;
}

const validateAmount = (payment: PaymentData) =>
  payment.amount > 0
    ? payment
    : SideEffect.of(() => {
        logError('잘못된 금액', payment);
        showToast('결제 금액은 양수여야 합니다');
        return null;
      });

const checkBalance = (payment: PaymentData) => {
  const balance = getUserBalance(payment.userId);
  return balance >= payment.amount
    ? payment
    : SideEffect.of(() => {
        logError('잔액 부족', { payment, balance });
        showToast(\`잔액 부족. 잔액: $\${balance}\`);
        return null;
      });
};

const processPayment = pipeSideEffect(
  validateAmount,
  checkBalance,
  (payment) => chargeCard(payment),
  (result) => ({ success: true, ...result }),
  runPipeResult
);

const result = processPayment({ amount: -10, userId: 'user-1' });
// 에러 로그, 토스트 표시, null 반환`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      matchSideEffect로 패턴 매칭
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-kit';

const divide = (a: number, b: number) =>
  b !== 0
    ? a / b
    : SideEffect.of(() => '0으로 나눔', 'DIV_ZERO');

const calculate = pipeSideEffect(
  (x: number) => divide(x, 0),
  (result) => result * 2
);

const result = calculate(10);

// 일반 값과 SideEffect 모두 처리
const output = matchSideEffect(result, {
  value: (v) => \`결과: \${v}\`,
  effect: (se) => {
    console.log(\`에러: \${se.label}\`);
    return se.effect(); // 수동으로 실행하여 값 가져오기
  }
});

console.log(output); // "0으로 나눔"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      isSideEffect로 타입 가드
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect } from 'fp-kit';

const processData = (data: number) =>
  data > 0
    ? data * 2
    : SideEffect.of(() => '잘못된 데이터');

const result = processData(-5);

if (isSideEffect(result)) {
  console.log('파이프라인이 effect와 함께 중단됨');
  const value = result.effect();
  console.log(value); // "잘못된 데이터"
} else {
  console.log('성공:', result);
}`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ 중요:</span>
        <br />
        <br />
        SideEffect는 <strong>절대 자동 실행되지 않습니다</strong>. pipeSideEffect/pipeAsyncSideEffect가 SideEffect를 만나면 중단되고 반환합니다.
        실행하려면{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> 또는{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">sideEffect.effect()</code>를 명시적으로 호출해야 합니다.
        <br />
        <br />
        이를 통해 사이드 이펙트가 언제 어떻게 실행될지 완전히 제어할 수 있으며,
        함수형 합성을 깨뜨리지 않고 깔끔한 에러 처리가 가능합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipeSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          SideEffect 조기 종료를 지원하는 왼쪽→오른쪽 합성입니다.
        </p>
      </a>

      <a
        href="/async/pipeAsyncSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipeAsyncSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          SideEffect 조기 종료를 지원하는 비동기 합성입니다.
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
          함수형으로 예외 처리 - 간단한 경우 SideEffect의 대안입니다.
        </p>
      </a>
    </div>
  </div>
);
