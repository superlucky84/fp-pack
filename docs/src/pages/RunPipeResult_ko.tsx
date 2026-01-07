import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const RunPipeResult_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      runPipeResult
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      SideEffect 실행 또는 값 반환 - 파이프라인 밖에서 반드시 호출
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      runPipeResult란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
        runPipeResult
      </strong>{' '}
      는 SideEffect의 지연된 함수를 실행하거나 값을 그대로 반환합니다. 이 함수는{' '}
      <code class="text-sm">pipeSideEffect</code> 또는 <code class="text-sm">pipeAsyncSideEffect</code>의
      결과를 풀어내는 표준 방법입니다. 최종 값을 추출하기 위해 파이프라인 <strong>밖에서</strong> 반드시 호출해야 합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        console.log('나이 검증 실패');
        return null;
      });

const processAgePipeline = pipeSideEffect(
  validateAge,
  (age) => age * 2,
  (age) => \`나이: \${age}\`
);

// ❌ 잘못됨 - 파이프라인 안에서 runPipeResult 호출하지 마세요
const wrongPipeline = pipeSideEffect(
  validateAge,
  (age) => runPipeResult(age)  // 에러! 하지 마세요
);

// ✅ 올바름 - 파이프라인 밖에서 runPipeResult 호출
const result = runPipeResult(processAgePipeline(15));
// "나이 검증 실패" 로그, null 반환`}
    />

    <div class="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-red-800 dark:text-red-200 leading-relaxed">
        <span class="font-medium">🚨 중요: 타입 안전성 경고</span>
        <br />
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult&lt;T, R=any&gt;</code>는
        기본 타입 파라미터로 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R=any</code>를 가집니다.
        <br />
        <br />
        ✅ <strong>입력 타입이 정확하면 추론이 유지됩니다.</strong>
        <br />
        ⚠️ <strong>입력이 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> 또는 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>로 넓어지면 결과가 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>가 됩니다.</strong>
        <br />
        ✅ <strong>입력이 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;R&gt;</code>로 좁혀지면 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult</code>는 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R</code>을 반환합니다.</strong>
        <br />
        <br />
        ✅ <strong>정확한 타입 안전성을 위해 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">isSideEffect</code> 타입 가드 사용:</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">if (!isSideEffect(result)) {'{'} /* 정확한 타입 */ {'}'}</code>
        <br />
        <br />
        또는 명시적으로 타입 파라미터 제공:
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">runPipeResult&lt;성공타입, 에러타입&gt;(result)</code>
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function runPipeResult<R>(result: SideEffect<R>): R
function runPipeResult<T>(result: T): T extends SideEffect<infer R> ? R : T
function runPipeResult<T, R = any>(result: T | SideEffect<R>): T | R`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실용 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const validateEmail = (email: string) =>
  email.includes('@')
    ? email
    : SideEffect.of(() => '이메일 형식이 잘못되었습니다');

const processEmailPipeline = pipeSideEffect(
  validateEmail,
  (email) => email.toLowerCase(),
  (email) => \`처리됨: \${email}\`
);

// ✅ 파이프라인 밖에서 runPipeResult 호출
const result1 = runPipeResult(processEmailPipeline('test@example.com'));
// result1: "처리됨: test@example.com"

const result2 = runPipeResult(processEmailPipeline('invalid'));
// result2: "이메일 형식이 잘못되었습니다"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      명시적 타입 지정
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface User {
  id: string;
  email: string;
}

type ValidationError = string;

const findUserPipeline = pipeSideEffect(
  (email: string) => database.findByEmail(email),
  (user) => user ?? SideEffect.of(() => '사용자를 찾을 수 없습니다')
);

const userOrError = findUserPipeline('test@example.com');

// ✅ 더 나은 타입 안전성을 위해 명시적 타입 제공
const result = runPipeResult<User, ValidationError>(userOrError);
// result: User | ValidationError (유니온 타입, 'any'보다 안전)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비동기 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const fetchUserDataPipeline = pipeAsyncSideEffect(
  async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.ok
      ? response.json()
      : SideEffect.of(async () => 'API 요청 실패');
  },
  async (data) => validateData(data) ?? SideEffect.of(() => '데이터가 유효하지 않습니다')
);

const result = await fetchUserDataPipeline('user-123');

// runPipeResult는 비동기 결과에서도 작동
const finalValue = runPipeResult(result);
// finalValue: UserData | string`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      에러 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const processPaymentPipeline = pipeSideEffect(
  (amount: number) => amount > 0
    ? amount
    : SideEffect.of(() => {
        throw new Error('잘못된 금액');
      }),
  (amount) => chargeCard(amount),
  (receipt) => ({ success: true, receipt })
);

// SideEffect는 실행될 때 에러를 던질 수 있습니다
try {
  const result = runPipeResult(processPaymentPipeline(-10));
  console.log('결제 처리됨:', result);
} catch (error) {
  console.error('결제 실패:', error.message);
  // 로그: "결제 실패: 잘못된 금액"
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      isSideEffect와 비교
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const divide = (a: number, b: number) =>
  b !== 0 ? a / b : SideEffect.of(() => '0으로 나눌 수 없습니다');

const result = pipeSideEffect((x: number) => divide(10, x))(2);

// ⚠️ pipeSideEffect는 SideEffect를 any로 넓혀서 runPipeResult가 any가 됨
const value1 = runPipeResult(result);
// value1: any

// ✅ 명시적 타입이 있는 runPipeResult - 더 안전
const value2 = runPipeResult<number, string>(result);
// value2: number | string (유니온 타입이지만 좁혀지지 않음)

// ✅ 분기별 타입 좁히기를 위한 isSideEffect - 최고
if (!isSideEffect(result)) {
  // result는 number (정확한 타입!)
  const doubled: number = result * 2;
  console.log(\`결과: \${doubled}\`);
} else {
  // 비엄격 파이프라인에서는 SideEffect<any>
  const error = runPipeResult(result);
  console.error(\`에러: \${error}\`);
}

// ✅ SideEffect 타입이 정확하면 runPipeResult도 그 타입으로 반환
const strictResult = pipeSideEffectStrict(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'LOW' as const))
)(-1);

if (isSideEffect(strictResult)) {
  const error = runPipeResult(strictResult); // 'LOW'
}

// 권장: 타입 안전 분기를 위해 isSideEffect 사용
// 정확한 타입이 필요 없을 때만 runPipeResult 사용`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ 중요한 규칙:</span>
        <br />
        <br />
        <strong>1. 파이프라인 안에서 runPipeResult 절대 호출 금지:</strong>
        <br />
        SideEffect-aware 파이프라인은 내부적으로 SideEffect를 이미 처리합니다. 안에서 runPipeResult를 호출하면 흐름이 깨집니다.
        <br />
        <br />
        <strong>2. 파이프라인 밖에서 항상 runPipeResult 호출:</strong>
        <br />
        모든 파이프라인 단계가 완료된 후 최종 값을 추출하는 데 사용하세요.
        <br />
        <br />
        <strong>3. 타입 안전성을 위해 runPipeResult보다 isSideEffect 선호:</strong>
        <br />
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">isSideEffect</code>는 정확한 타입 좁히기를 제공합니다.
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult</code>는 입력이 넓어졌을 때 <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">any</code>를 반환합니다. 필요하면 제네릭으로 복구하세요. 입력이 <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">SideEffect&lt;R&gt;</code>로 좁혀지면 <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">R</code>을 반환합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">runPipeResult</code>의 내부 구현을 GitHub에서 확인하세요.
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
        href="/ko/composition/sideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/composition/sideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          SideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          SideEffect-aware 파이프라인을 위한 지연 실행 컨테이너.
        </p>
      </a>

      <a
        href="/ko/composition/isSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/composition/isSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          isSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          정확한 타입 좁히기를 제공하는 SideEffect 런타임 타입 가드.
        </p>
      </a>

      <a
        href="/ko/composition/matchSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/composition/matchSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          matchSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          통일된 반환 타입으로 값 또는 SideEffect를 패턴 매칭.
        </p>
      </a>

      <a
        href="/ko/composition/pipeSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/composition/pipeSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          SideEffect 단축 평가로 왼쪽에서 오른쪽으로 함수 합성.
        </p>
      </a>
    </div>
  </div>
);
