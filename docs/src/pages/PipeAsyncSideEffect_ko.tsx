import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeAsyncSideEffect_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsyncSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      SideEffect 조기 종료를 지원하는 비동기 파이프라인
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipeAsyncSideEffect란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsyncSideEffect
      </strong>{' '}
      는 <strong>pipeAsync</strong>처럼 비동기/동기 함수를 합성하지만,{' '}
      <strong class="font-semibold">SideEffect</strong>를 만나면 즉시 중단하고 반환합니다.
      입력으로 SideEffect를 받으면 실행 없이 그대로 돌려줍니다.
      타입 추론을 위해 <code class="text-sm">pipeAsyncSideEffect(data, ...)</code> 형태를 우선 사용하세요.
      순수 비동기 파이프라인은 <strong>pipeAsync</strong>를 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const fetchUser = async (id: string) => ({ id, verified: false });

const checkVerified = (user: { id: string; verified: boolean }) =>
  user.verified
    ? user
    : SideEffect.of(() => ({ error: '이메일 미인증', userId: user.id }));

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const result = runPipeResult(
  await pipeAsyncSideEffect('123', fetchUser, checkVerified)
);
// { error: '이메일 미인증', userId: '123' }`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">✅ pipeAsyncSideEffect는 언제 사용하나요?</span>
        <br />
        <br />
        <strong>기본 선택: <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsync</code>를 사용하세요</strong>
        <br />
        <br />
        대부분의 비동기 데이터 변환에는 SideEffect가 필요하지 않습니다. 순수 비동기 작업에는{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsync</code>로 시작하고,{' '}
        <strong>조기 종료나 부수 효과가 있는 에러 처리가 실제로 필요할 때만{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>를 사용하세요</strong>.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`// ✅ 좋음: 99%의 경우 - pipeAsync 사용 (순수 비동기 변환)
import { pipeAsync } from 'fp-pack';

const userId = '123';

const profile = await pipeAsync(
  userId,
  async (id: string) => fetchUser(id),
  (user) => user.profile
);

// ✅ 좋음: SideEffect가 필요할 때만 - pipeAsyncSideEffect 사용
import { pipeAsyncSideEffect, SideEffect } from 'fp-pack';

const result = runPipeResult(
  await pipeAsyncSideEffect(
    userId,
    async (id: string) => fetchUser(id),
    (user) => user.verified ? user : SideEffect.of(() => '미인증')
  )
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function pipeAsyncSideEffect<A, R>(
  a: A,
  ab: (a: A) => R | SideEffect | Promise<R | SideEffect>
): Promise<R | SideEffect>;

function pipeAsyncSideEffect<A, R>(
  ab: (a: A) => R | SideEffect | Promise<R | SideEffect>
): (a: A | SideEffect) => Promise<R | SideEffect>;

function pipeAsyncSideEffect<A, B, R>(
  a: A,
  ab: (a: A) => B | SideEffect | Promise<B | SideEffect>,
  bc: (b: B) => R | SideEffect | Promise<R | SideEffect>
): Promise<R | SideEffect>;

function pipeAsyncSideEffect<A, B, R>(
  ab: (a: A) => B | SideEffect | Promise<B | SideEffect>,
  bc: (b: B) => R | SideEffect | Promise<R | SideEffect>
): (a: A | SideEffect) => Promise<R | SideEffect>;

function pipeAsyncSideEffect(...funcs: Array<(input: any) => any>): (input: any) => Promise<any>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      각 단계는 값, SideEffect, 또는 Promise를 반환할 수 있습니다. SideEffect가 등장하면 즉시 종료됩니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      엄격 버전
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipeAsyncSideEffectStrict</code>는 비동기 파이프라인에서 SideEffect 결과 타입을
      유니온으로 엄격하게 유지합니다. 조기 종료 타입을 정확히 추론하고 싶을 때 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffectStrict, SideEffect } from 'fp-pack';

// 결과 타입: Promise<number | SideEffect<'NEGATIVE' | 0>>
const result = await pipeAsyncSideEffectStrict(
  5,
  async (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEGATIVE' as const)),
  (n) => (n > 10 ? n : SideEffect.of(() => 0 as const))
);`}
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
        ⚠️ <strong>입력이 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> 또는 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>로 넓어지면(<code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>에서 흔함) 결과가 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>가 됩니다.</strong>
        <br />
        ✅ <strong>입력이 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;R&gt;</code>로 좁혀지면 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult</code>는 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R</code>을 반환합니다.</strong>
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
      SideEffect 활용하기
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      조기 종료를 사용한 비동기 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface User {
  id: string;
  email: string;
  verified: boolean;
}

const fetchUser = async (id: string): Promise<User> => {
  // API 호출 시뮬레이션
  return {
    id,
    email: 'user@example.com',
    verified: false
  };
};

const checkVerified = (user: User) => {
  if (!user.verified) {
    return SideEffect.of(() => ({
      error: '이메일 미인증',
      userId: user.id
    }));
  }
  return user;
};

const sendNotification = async (user: User) => {
  console.log(\`\${user.email}로 알림 전송 중\`);
  return { sent: true, userId: user.id };
};

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const result = runPipeResult(
  await pipeAsyncSideEffect(
    '123',
    fetchUser,
    checkVerified,
    sendNotification  // 사용자가 인증되지 않은 경우 실행되지 않음
  )
);
console.log(result);  // { error: '이메일 미인증', userId: '123' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 에러 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    // 에러 처리를 위해 SideEffect 반환
    return SideEffect.of(async () => {
      const error = await response.text();
      throw new Error(\`API 에러: \${error}\`);
    }, 'api-error');
  }
  return response.json();
};

const validateData = (data: any) => {
  if (!data.id) {
    return SideEffect.of(() => {
      throw new Error('잘못된 데이터: id 누락');
    });
  }
  return data;
};

const processData = async (data: any) => {
  console.log('처리 중:', data.id);
  return { processed: true, ...data };
};

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
try {
  const result = runPipeResult(
    await pipeAsyncSideEffect(
      'https://api.example.com/data',
      fetchData,
      validateData,
      processData
    )
  );
  console.log('성공:', result);
} catch (err) {
  console.error('에러 포착:', err.message);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 비동기 작업
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface PaymentRequest {
  amount: number;
  currency: string;
  userId: string;
}

const validatePayment = async (req: PaymentRequest) => {
  if (req.amount <= 0) {
    return SideEffect.of(() => ({
      error: '잘못된 금액',
      amount: req.amount
    }));
  }
  return req;
};

const checkBalance = async (req: PaymentRequest) => {
  // 잔액 확인 시뮬레이션
  const balance = 100;
  if (balance < req.amount) {
    return SideEffect.of(() => ({
      error: '잔액 부족',
      balance,
      required: req.amount
    }));
  }
  return req;
};

const processPayment = async (req: PaymentRequest) => {
  console.log(\`결제 처리 중: \${req.amount} \${req.currency}\`);
  return { success: true, transactionId: 'tx_123', ...req };
};

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const result = runPipeResult(
  await pipeAsyncSideEffect(
    {
      amount: 150,
      currency: 'KRW',
      userId: 'user_1'
    },
    validatePayment,
    checkBalance,
    processPayment
  )
);

console.log(result);
// { error: '잔액 부족', balance: 100, required: 150 }`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ 중요:</span>
        <br />
        <br />
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code>와{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">matchSideEffect()</code>는{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code> 체인{' '}
        <strong>밖에서</strong> 호출해야 합니다.
        <br />
        <br />
        파이프라인 내부에서 사용하면 타입 안전성이 깨지고 <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">unknown</code> 또는{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> 타입을 반환합니다.
        <br />
        <br />
        항상: <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">await runPipeResult(pipeline(input))</code>
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
        한번 <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>를 사용하면, 그 결과는 <strong>항상 <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">Promise&lt;T | SideEffect&gt;</code></strong>입니다.
        <br />
        <br />
        이 결과를 계속 합성하려면, <strong>반드시</strong> <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>를 계속 사용해야 합니다.
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsync</code>로 <strong>돌아갈 수 없습니다</strong>. pipeAsync는 SideEffect를 처리할 수 없기 때문입니다.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync, pipeAsyncSideEffect, SideEffect } from 'fp-pack';

const validateUserPipeline = pipeAsyncSideEffect(
  fetchUser,
  validateAge
);
// 결과 타입: Promise<User | SideEffect>

const userId = '123';

// ❌ 잘못된 방법 - pipeAsync는 SideEffect를 처리 못함
const wrongPipeline = pipeAsync(
  userId,
  validateUserPipeline,  // Promise<User | SideEffect> 반환
  (user) => user.email   // 타입 에러! SideEffect에는 'email' 프로퍼티가 없음
);

// ✅ 올바른 방법 - pipeAsyncSideEffect 계속 사용
const correctPipeline = pipeAsyncSideEffect(
  userId,
  validateUserPipeline,  // Promise<User | SideEffect> - 올바르게 처리됨
  (user) => user.email,  // SideEffect면 자동으로 건너뜀
  sendEmail
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      어떤 파이프를 선택할까?: 유연성 vs 엄격성
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      다른 파이프와 마찬가지로, fp-pack은 두 가지 버전의 비동기 SideEffect 파이프를 제공합니다.
      어떤 것을 선택하는지는 최종{' '}
      <strong class="font-semibold text-orange-600 dark:text-orange-400">SideEffect</strong>의 타입이
      어떻게 추론되는지에 영향을 줍니다.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipeAsyncSideEffect (유연함)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>목표:</strong> 성공 경로에 대한 부드러운 타입 추론.
          </li>
          <li>
            <strong>장점:</strong> 주로 성공 케이스에 관심이 있고 모든 실패 케이스를 비슷하게
            처리할 때 훌륭한 개발 경험을 제공합니다.
          </li>
          <li>
            <strong>단점:</strong> 최종 SideEffect 타입이{' '}
            <code class="text-xs">SideEffect&lt;any&gt;</code>로 넓어져, 각기 다른 실패 원인의
            타입 정보를 잃게 됩니다. 이로 인해 다양한 실패 케이스를 타입-안전하게 처리하기
            어렵습니다.
          </li>
        </ul>
      </div>
      <div class="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-emerald-900 dark:text-emerald-100 mb-2">
          pipeAsyncSideEffectStrict (안전함)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>목표:</strong> 모든 경로에 대한 최대한의 타입 안정성.
          </li>
          <li>
            <strong>장점:</strong> 최종 SideEffect 타입이 파이프라인에서 가능한 모든 이펙트의
            정확한 유니온 타입(예:{' '}
            <code class="text-xs">SideEffect&lt;'A' | 'B'&gt;</code>)임을 보장합니다. 이는
            실패 케이스에 대한 강력한 타입-안전 패턴 매칭을 가능하게 합니다.
          </li>
          <li>
            <strong>단점:</strong> 이 엄격함으로 인해 컴파일러가 모든 가능한 이펙트 타입을 자동으로
            통합하지 못할 경우, 때때로 명시적인 타입 어노테이션이 필요할 수 있습니다.
          </li>
        </ul>
      </div>
    </div>

    <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-yellow-800 dark:text-yellow-200 leading-relaxed">
        <span class="font-medium">💡 추천:</span>
        <br />
        <br />
        실패를 포괄적으로 처리(예: 에러 로깅 후 null 반환)하고 싶을 때는{' '}
        <strong>pipeAsyncSideEffect</strong>를 사용하세요. 각기 다른 실패 타입을 구분하여 타입-안전하게
        처리해야 할 때는{' '}
        <a
          href="/async/pipeAsyncSideEffectStrict"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/async/pipeAsyncSideEffectStrict');
          }}
          class="font-semibold text-emerald-700 dark:text-emerald-300"
        >
          pipeAsyncSideEffectStrict
        </a>
        를 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipeAsyncSideEffect</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/pipeAsyncSideEffect.ts"
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
        href="/async/pipeAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          SideEffect 조기 종료 없이 순수하게 비동기 합성합니다.
        </p>
      </a>

      <a
        href="/async/pipeAsyncSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffectStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeAsyncSideEffectStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          비동기 SideEffect 유니온을 엄격하게 유지합니다.
        </p>
      </a>

      <a
        href="/composition/pipeSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipeSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          동기 파이프라인에서 SideEffect 조기 종료를 지원합니다.
        </p>
      </a>

      <a
        href="/composition/sideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/sideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          sideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건부로 파이프라인을 멈추는 지연 실행 컨테이너.
        </p>
      </a>
    </div>
  </div>
);
