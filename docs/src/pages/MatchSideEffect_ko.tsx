import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const MatchSideEffect_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      matchSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      통일된 반환 타입으로 값 또는 SideEffect를 패턴 매칭
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      matchSideEffect란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        matchSideEffect
      </strong>{' '}
      는 일반 값과 SideEffect 인스턴스를 모두 처리하는 패턴 매칭을 제공합니다. 값과 두 개의 핸들러 함수를
      받아서, 값이 SideEffect인지 여부에 따라 적절한 핸들러를 실행합니다. 두 핸들러는 모두 같은 타입을
      반환해야 하며, 이를 통해 파이프라인 결과를 통일된 출력으로 깔끔하게 변환할 수 있습니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

const divide = (a: number, b: number) =>
  b !== 0
    ? a / b
    : SideEffect.of(() => '0으로 나눌 수 없습니다', 'DIV_ZERO');

const calculate = pipeSideEffect(
  (x: number) => divide(x, 0),
  (result) => result * 2
);

const result = calculate(10);

// 패턴 매칭 - 두 핸들러 모두 string 반환
const output = matchSideEffect(result, {
  value: (v) => \`결과: \${v}\`,
  effect: (se) => {
    console.log(\`에러: \${se.label}\`);
    return se.effect(); // 실행해서 값 가져오기
  }
});

console.log(output); // "0으로 나눌 수 없습니다"`}
    />

    <div class="bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded border border-purple-200 dark:border-purple-800 mt-6">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">✅ matchSideEffect는 언제 사용하나요?</span>
        <br />
        <br />
        성공과 에러 케이스를 모두 <strong>같은 반환 타입</strong>으로 변환하고 싶을 때{' '}
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">matchSideEffect</code>를 사용하세요.
        <br />
        <br />
        정확한 타입으로 각 분기를 다르게 처리하려면{' '}
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">isSideEffect</code>를 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`type MatchHandlers<T, RValue, REffect> = {
  value: (value: T) => RValue;
  effect: (sideEffect: SideEffect) => REffect;
};

function matchSideEffect<T, RValue, REffect = any>(
  result: T | SideEffect,
  handlers: MatchHandlers<T, RValue, REffect>
): RValue | REffect`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실용 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      통일된 에러 메시지
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

interface User {
  id: string;
  email: string;
}

const validateAndFindUser = pipeSideEffect(
  (email: string) => email.includes('@')
    ? email
    : SideEffect.of(() => \`이메일 형식 오류: \${email}\`),
  (email) => database.findByEmail(email),
  (user) => user ?? SideEffect.of(() => '사용자를 찾을 수 없습니다')
);

const result = validateAndFindUser('invalid');

// 두 분기 모두 표시 메시지(string) 반환
const message = matchSideEffect(result, {
  value: (user: User) => \`환영합니다, \${user.email}님!\`,
  effect: (se) => se.effect() // 에러 메시지 추출
});

showNotification(message);
// 표시: "이메일 형식 오류: invalid"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      응답 포맷팅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const fetchUserDataPipeline = pipeAsyncSideEffect(
  async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.ok
      ? response.json()
      : SideEffect.of(async () => await response.text());
  },
  (data) => validateData(data) ?? SideEffect.of(() => '데이터 형식이 잘못되었습니다')
);

const result = await fetchUserDataPipeline('user-123');

// 두 분기 모두 APIResponse 반환
const response: APIResponse = matchSideEffect(result, {
  value: (data) => ({
    success: true,
    data
  }),
  effect: (se) => ({
    success: false,
    error: se.effect()
  })
});

res.json(response);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 렌더링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

const loadUserProfile = pipeSideEffect(
  (userId: string) => {
    const user = getUser(userId);
    return user ?? SideEffect.of(() => '사용자를 찾을 수 없습니다');
  },
  (user) => user.profile ?? SideEffect.of(() => '프로필을 사용할 수 없습니다')
);

const profileResult = loadUserProfile('user-123');

// 두 분기 모두 JSX/HTML 반환
const content = matchSideEffect(profileResult, {
  value: (profile) => (
    <div class="profile">
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
    </div>
  ),
  effect: (se) => (
    <div class="error">
      <p>{se.effect()}</p>
      <button onClick={retry}>재시도</button>
    </div>
  )
});

render(content);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      레이블을 사용한 로깅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

const processPayment = pipeSideEffect(
  (amount: number) => amount > 0
    ? amount
    : SideEffect.of(() => '잘못된 금액', 'VALIDATION_ERROR'),
  (amount) => getUserBalance() >= amount
    ? amount
    : SideEffect.of(() => '잔액 부족', 'BALANCE_ERROR'),
  (amount) => chargeCard(amount)
);

const result = processPayment(-10);

const logMessage = matchSideEffect(result, {
  value: (receipt) => \`결제 성공: \${receipt.id}\`,
  effect: (se) => {
    // 카테고리별 로깅을 위해 레이블 접근
    const category = se.label ?? 'UNKNOWN_ERROR';
    const message = se.effect();

    analytics.track(category, { message });
    return \`결제 실패: \${message} [\${category}]\`;
  }
});

logger.log(logMessage);
// 로그: "결제 실패: 잘못된 금액 [VALIDATION_ERROR]"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      isSideEffect와 비교
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect, isSideEffect } from 'fp-pack';

const divide = (a: number, b: number) =>
  b !== 0 ? a / b : SideEffect.of(() => '0으로 나눌 수 없습니다');

const result = pipeSideEffect((x: number) => divide(10, x))(0);

// ✅ matchSideEffect - 통일된 반환 타입(string)
const message1 = matchSideEffect(result, {
  value: (v) => \`결과: \${v}\`,
  effect: (se) => \`에러: \${se.effect()}\`
});
// message1: string

// ✅ isSideEffect - 분기별로 다른 처리
if (!isSideEffect(result)) {
  // result는 number - 성공 케이스 처리
  processResult(result);
} else {
  // result는 SideEffect<string> - 에러 케이스 처리
  logError(result.effect());
}

// 같은 반환 타입을 원할 때 matchSideEffect 사용
// 분기별로 다른 타입이나 로직이 필요할 때 isSideEffect 사용`}
    />

    <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 모범 사례:</span>
        <br />
        <br />
        <strong>matchSideEffect 사용 시기:</strong>
        <br />
        • 성공과 에러를 모두 같은 타입으로 변환하고 싶을 때 (string, JSX, APIResponse 등)
        <br />
        • 표시 또는 API를 위한 출력 포맷팅
        <br />
        • 수동 타입 가드 없이 깔끔한 패턴 매칭이 필요할 때
        <br />
        <br />
        <strong>isSideEffect 사용 시기:</strong>
        <br />
        • 양쪽 분기에서 정확한 타입 좁히기가 필요할 때
        <br />
        • 성공 vs 에러 케이스에 다른 로직이 필요할 때
        <br />
        • 완전한 타입 안전성으로 각 케이스를 별도로 처리하고 싶을 때
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">matchSideEffect</code>의 내부 구현을 GitHub에서 확인하세요.
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
