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
      code={`import { SideEffect, pipeSideEffect, runPipeResult } from 'fp-pack';

// 나중에 실행될 SideEffect 생성
const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        console.log('나이 검증 실패');
        return null;
      });

const processAgePipeline = pipeSideEffect(
  validateAge,
  (age) => age * 2,      // SideEffect 반환 시 건너뜀
  (age) => \`나이: \${age}\`
);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
runPipeResult(processAgePipeline(15)); // "나이 검증 실패" 로그, null 반환`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">✅ SideEffect는 언제 사용하나요?</span>
        <br />
        <br />
        <strong>기본 선택: <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipe</code> 또는 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsync</code>를 사용하세요</strong>
        <br />
        <br />
        대부분의 데이터 변환은 순수하며 SideEffect 처리가 필요하지 않습니다.{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipe</code> 또는{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsync</code>로 시작하고,{' '}
        <strong>실제로 아래가 필요할 때만 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeSideEffect</code> /{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>로 전환하세요</strong>:
        <br />
        • 검증 기반 조기 종료
        <br />
        • 부수 효과가 있는 에러 처리 (로깅, 토스트 등)
        <br />
        • 옵셔널 체이닝 패턴
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`// ✅ 좋음: 99%의 경우 - pipe 사용 (순수 변환)
import { pipe, map, filter, sort } from 'fp-pack';

const processData = pipe(
  filter(isValid),
  map(transform),
  sort(byDate)
);

// ✅ 좋음: SideEffect가 필요할 때만 - pipeSideEffect 사용
import { pipeSideEffect, SideEffect } from 'fp-pack';

const processWithValidation = pipeSideEffect(
  validateOrStop,  // 조기 종료를 위해 SideEffect를 반환할 수 있음
  transform,
  save
);`}
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
function runPipeResult<R>(result: SideEffect<R>): R;
function runPipeResult<T>(result: T): T extends SideEffect<infer R> ? R : T;
function runPipeResult<T, R = any>(result: T | SideEffect<R>): T | R;`}
    />

    <div class="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-red-800 dark:text-red-200 leading-relaxed">
        <span class="font-medium">🚨 중요: runPipeResult 타입 안전성</span>
        <br />
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult&lt;T, R=any&gt;</code>는 기본 타입 매개변수로 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R=any</code>를 사용합니다.
        <br />
        <br />
        ✅ <strong>입력 타입이 정확하면 추론이 유지됩니다.</strong>
        <br />
        ⚠️ <strong>입력이 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> 또는 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>로 넓어지면(비엄격 파이프라인에서 흔함) 결과가 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>가 됩니다.</strong>
        <br />
        ✅ <strong>입력이 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;R&gt;</code>로 좁혀지면(예: <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">isSideEffect</code> 이후), <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult</code>는 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R</code>을 반환합니다.</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">const result = runPipeResult(pipeline(data)); // result: any (입력이 넓어짐)</code>
        <br />
        <br />
        ✅ <strong>정확한 타입 안전성을 위해서는 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">isSideEffect</code> 타입 가드를 사용하세요:</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">if (!isSideEffect(result)) {'{'} /* 정확한 타입 */ {'}'}</code>
        <br />
        <br />
        또는 명시적으로 타입 매개변수를 전달하세요:
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">runPipeResult&lt;성공타입, 에러타입&gt;(result)</code>
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실용적인 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      조기 종료를 사용한 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

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

const processFormPipeline = pipeSideEffect(
  validateEmail,
  validateAge,
  (data) => ({ success: true, data })
);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
try {
  runPipeResult(processFormPipeline({ email: 'test@example.com', age: 25 }));
  // { success: true, data: { email: 'test@example.com', age: 25 } }

  runPipeResult(processFormPipeline({ email: 'invalid', age: 25 }));
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
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

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

const getUserThemePipeline = pipeSideEffect(
  findUser,
  (user) => user.profile ?? SideEffect.of(() => null),
  (profile) => profile.settings ?? SideEffect.of(() => null),
  (settings) => settings.theme
);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
runPipeResult(getUserThemePipeline('user-123')); // 'dark' 또는 단계가 실패하면 null`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      사이드 이펙트를 사용한 에러 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

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

const processPaymentPipeline = pipeSideEffect(
  validateAmount,
  checkBalance,
  (payment) => chargeCard(payment),
  (result) => ({ success: true, ...result })
);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const result = runPipeResult(processPaymentPipeline({ amount: -10, userId: 'user-1' }));
// 에러 로그, 토스트 표시, null 반환`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      matchSideEffect로 패턴 매칭
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

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

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">isSideEffect</code>는 파이프라인 결과 처리를 위한 <strong>정확한 타입 내로잉(Type Narrowing)</strong>을 제공합니다.
      <code class="text-sm">runPipeResult</code>나 <code class="text-sm">matchSideEffect</code>와 달리,
      양쪽 분기에서 타입을 좁혀서 성공 경로와 에러 경로 모두에서 정확한 타입 추론을 제공합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const processNumbers = pipeSideEffect(
  (nums: number[]) => nums.filter(n => n % 2 === 1),
  (odds) => odds.length > 0
    ? odds
    : SideEffect.of(() => '홀수를 찾을 수 없습니다'),
  (odds) => odds.map(n => n * 2)
);

const oddsDoubled = processNumbers([1, 2, 3, 4, 5]);

// ✅ 정확한 추론을 사용한 타입 안전 분기
if (!isSideEffect(oddsDoubled)) {
  // TypeScript가 인식: oddsDoubled는 number[]
  const result: number = oddsDoubled.reduce((a, b) => a + b, 0);
  console.log(\`합계: \${result}\`);  // result: number (정확한 타입!)
} else {
  // TypeScript가 인식: oddsDoubled는 비엄격 파이프라인에서 SideEffect<any>
  const error = oddsDoubled.effect();
  console.log(\`에러: \${error}\`);
}

// ⚠️ isSideEffect 없이 - 비엄격 파이프라인에서 타입이 넓어질 수 있음
const widened = oddsDoubled; // pipeSideEffect는 SideEffect를 any로 넓힘
const unsafeResult = runPipeResult(widened);
// unsafeResult: any

const safeResult = runPipeResult<number[], string>(oddsDoubled);
// safeResult: number[] | string (유니온 타입 - 안전하지만 좁혀지지 않음)

// ✅ 엄격 파이프라인에서는 SideEffect 타입이 보존됨
const strictResult = pipeSideEffectStrict(
  (nums: number[]) => nums.length > 0 ? nums : SideEffect.of(() => 'EMPTY' as const),
  (nums) => nums
)([]);

if (isSideEffect(strictResult)) {
  const error = runPipeResult(strictResult); // 'EMPTY'
}`}
    />

    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded border border-blue-200 dark:border-blue-800">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 isSideEffect 사용 시기:</span>
        <br />
        <br />
        <strong>성공과 에러 경로 모두에서 <strong>정확한 타입 추론</strong>이 필요할 때{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">isSideEffect</code>를 사용하세요.</strong>
        <br />
        <br />
        ⚠️ <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code>는 입력이{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> 또는{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">any</code>로 넓어지면 기본{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">R=any</code> 매개변수 때문에 <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">any</code>를 반환합니다.
        입력이 <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">SideEffect&lt;R&gt;</code>로 좁혀지면 <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">R</code>을 반환합니다.
        <br />
        정확한 타입이 필요하지 않거나 명시적인 타입 매개변수를 제공할 때만 <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code>를 사용하세요.
        <br />
        <br />
        두 경우를 같은 반환 타입으로 변환하고 싶다면{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">matchSideEffect</code>를 사용하세요.
      </p>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      SideEffect 합성 규칙
    </h3>

    <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">🔄 핵심 규칙: SideEffect의 전염성</span>
        <br />
        <br />
        한번 <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeSideEffect</code> 또는{' '}
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>를 사용하면, 그 결과는 <strong>항상 <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">T | SideEffect</code></strong>입니다.
        <br />
        <br />
        이 결과를 계속 합성하려면, <strong>반드시</strong> SideEffect-aware 파이프를 계속 사용해야 합니다.
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipe</code>나{' '}
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsync</code>로 <strong>돌아갈 수 없습니다</strong>. 이들은 SideEffect를 처리할 수 없기 때문입니다.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { pipe, pipeSideEffect, SideEffect } from 'fp-pack';

const validateUserPipeline = pipeSideEffect(
  findUser,           // User | SideEffect
  validateAge         // User | SideEffect
);
// 결과 타입: User | SideEffect

// ❌ 잘못된 방법 - pipe는 SideEffect를 처리 못함
const wrongPipeline = pipe(
  validateUserPipeline,  // User | SideEffect 반환
  (user) => user.email   // 타입 에러! SideEffect에는 'email' 프로퍼티가 없음
);

// ✅ 올바른 방법 - pipeSideEffect 계속 사용
const correctPipeline = pipeSideEffect(
  validateUserPipeline,  // User | SideEffect - 올바르게 처리됨
  (user) => user.email,  // SideEffect면 자동으로 건너뜀
  sendEmail
);

// 핵심 규칙: SideEffect 가능성이 생기면, 끝까지 SideEffect-aware 파이프 사용
const finalPipeline = pipeSideEffect(
  validateUserPipeline,
  processUser,
  saveToDatabase,
  sendNotification
  // 모든 단계가 pipeSideEffect 체인 안에 있어야 함
);`}
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

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      엄격 버전
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      분기별 SideEffect 결과 타입을 정밀한 유니온으로 유지하려면{' '}
      <a
        href="/composition/pipeSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffectStrict');
        }}
        class="font-semibold text-blue-700 dark:text-blue-300"
      >
        pipeSideEffectStrict
      </a>{' '}
      또는{' '}
      <a
        href="/async/pipeAsyncSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffectStrict');
        }}
        class="font-semibold text-blue-700 dark:text-blue-300"
      >
        pipeAsyncSideEffectStrict
      </a>
      를 사용하세요.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">sideEffect</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/sideEffect.ts"
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
        href="/composition/pipeSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffectStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeSideEffectStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          SideEffect 결과 타입을 엄격 유니온으로 유지합니다.
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
        href="/async/pipeAsyncSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffectStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipeAsyncSideEffectStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          비동기 파이프라인에서 엄격한 SideEffect 유니온을 유지합니다.
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
