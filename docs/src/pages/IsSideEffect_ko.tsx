import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IsSideEffect_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      정확한 타입 좁히기를 제공하는 SideEffect 런타임 타입 가드
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      isSideEffect란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isSideEffect
      </strong>{' '}
      는 값이 SideEffect 인스턴스인지 확인하는 타입 가드 함수입니다. 양쪽 분기 모두에서{' '}
      <strong>정확한 타입 좁히기</strong>를 제공하여, 성공 및 에러 경로에 대한 정확한 타입 추론을 제공합니다.
      타입 안전한 분기 처리가 필요할 때 권장되는 방법입니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect } from 'fp-pack';

const processNumbers = pipeSideEffect(
  (nums: number[]) => nums.filter(n => n % 2 === 1),
  (odds) => odds.length > 0
    ? odds
    : SideEffect.of(() => '홀수가 없습니다'),
  (odds) => odds.map(n => n * 2)
);

const result = processNumbers([1, 2, 3]);

// ✅ 정확한 추론을 제공하는 타입 안전 분기
if (!isSideEffect(result)) {
  // TypeScript가 인식: result는 number[]
  const sum: number = result.reduce((a, b) => a + b, 0);
  console.log(\`합계: \${sum}\`);
} else {
  // TypeScript가 인식: result는 SideEffect<string>
  const error: string = result.effect();
  console.log(\`에러: \${error}\`);
}`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">✅ 왜 isSideEffect를 사용하나요?</span>
        <br />
        <br />
        <strong>정확한 타입 좁히기:</strong> 유니온 타입을 반환하는 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">runPipeResult</code>와
        달리, <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">isSideEffect</code>는
        성공과 에러 분기 모두에서 타입을 좁혀줍니다.
        <br />
        <br />
        <strong>타입 안전성:</strong> <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">runPipeResult</code>를
        타입 좁히기 없이 사용하면 기본 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">R=any</code> 파라미터로
        인해 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">any</code> 타입을 반환합니다.
        <br />
        <br />
        성공 및 에러 처리 경로 모두에서 정확한 타입이 필요할 때 <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">isSideEffect</code>를
        사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function isSideEffect(value: unknown): value is SideEffect<any>`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실용 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      타입 안전 에러 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect } from 'fp-pack';

interface User {
  id: string;
  email: string;
}

const validateEmail = (email: string) =>
  email.includes('@')
    ? email
    : SideEffect.of(() => '이메일 형식이 잘못되었습니다');

const findUserPipeline = pipeSideEffect(
  validateEmail,
  (email) => database.findByEmail(email),
  (user) => user ?? SideEffect.of(() => '사용자를 찾을 수 없습니다')
);

const userOrError = findUserPipeline('test@example.com');

// ✅ 양쪽 분기에서 정확한 타입 추론
if (!isSideEffect(userOrError)) {
  // userOrError는 User
  console.log(\`사용자 발견: \${userOrError.email}\`);
  sendWelcomeEmail(userOrError);
} else {
  // userOrError는 SideEffect<string>
  const errorMessage = userOrError.effect();
  console.error(\`에러: \${errorMessage}\`);
  showErrorToast(errorMessage);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      runPipeResult와 비교
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const divide = (a: number, b: number) =>
  b !== 0
    ? a / b
    : SideEffect.of(() => '0으로 나눌 수 없습니다');

const calculatePipeline = pipeSideEffect(
  (x: number) => divide(10, x),
  (result) => result * 2
);

const result = calculatePipeline(0);

// ❌ isSideEffect 없이 - 덜 정확한 타입
const value1 = runPipeResult(result);
// value1: any (타입 정보 없음!)

const value2 = runPipeResult<number, string>(result);
// value2: number | string (유니온 타입 - 안전하지만 좁혀지지 않음)

// ✅ isSideEffect 사용 - 정확한 타입 좁히기
if (!isSideEffect(result)) {
  // result는 number (정확한 타입!)
  const doubled: number = result * 2;
  console.log(\`결과: \${doubled}\`);
} else {
  // result는 SideEffect<string> (정확한 타입!)
  const error: string = result.effect();
  console.error(\`에러: \${error}\`);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      옵셔널 체인 패턴
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect } from 'fp-pack';

interface Config {
  api?: {
    endpoint?: string;
  };
}

const getEndpointPipeline = pipeSideEffect(
  (config: Config) => config.api ?? SideEffect.of(() => null),
  (api) => api.endpoint ?? SideEffect.of(() => null)
);

const endpoint = getEndpointPipeline(userConfig);

if (!isSideEffect(endpoint)) {
  // endpoint는 string
  fetch(endpoint).then(/* ... */);
} else {
  // endpoint는 SideEffect<null>
  console.warn('엔드포인트가 설정되지 않았습니다. 기본값 사용');
  fetch(DEFAULT_ENDPOINT).then(/* ... */);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      복잡한 에러 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, isSideEffect } from 'fp-pack';

type ValidationError = {
  field: string;
  message: string;
};

const validateFormPipeline = pipeAsyncSideEffect(
  async (formData: FormData) => {
    const errors = await validateFields(formData);
    return errors.length === 0
      ? formData
      : SideEffect.of(() => errors, 'VALIDATION_ERROR');
  },
  async (data) => submitToAPI(data)
);

const result = await validateFormPipeline(userInput);

if (!isSideEffect(result)) {
  // result는 APIResponse
  showSuccessMessage(\`폼 제출 완료: \${result.id}\`);
  redirectToDashboard();
} else {
  // result는 SideEffect<ValidationError[]>
  const errors: ValidationError[] = result.effect();

  errors.forEach(error => {
    showFieldError(error.field, error.message);
  });
}`}
    />

    <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 모범 사례:</span>
        <br />
        <br />
        정확한 타입으로 성공 및 에러 케이스를 모두 처리해야 할 때는 항상{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code>보다{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">isSideEffect</code>를 선호하세요.
        <br />
        <br />
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code>는 다음의 경우에만 사용:
        <br />
        • SideEffect에 신경 쓰지 않고 단순히 값을 추출하고 싶을 때
        <br />
        • 결과가 항상 성공이거나 항상 에러인 것을 아는 컨텍스트일 때
        <br />
        • 명시적인 타입 파라미터를 제공할 때
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">isSideEffect</code>의 내부 구현을 GitHub에서 확인하세요.
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
        href="/ko/composition/matchSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/composition/matchSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          matchSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          통일된 반환 타입으로 값 또는 SideEffect를 패턴 매칭.
        </p>
      </a>

      <a
        href="/ko/composition/runPipeResult"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/composition/runPipeResult');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          runPipeResult →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          SideEffect 실행 또는 값 반환 - 파이프라인 밖에서 호출.
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
