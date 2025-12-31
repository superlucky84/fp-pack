import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeSideEffect_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      SideEffect 조기 종료를 지원하는 왼쪽→오른쪽 합성
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipeSideEffect란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeSideEffect
      </strong>{' '}
      는 <strong>pipe</strong>처럼 함수를 왼쪽에서 오른쪽으로 합성하지만,
      <strong class="font-semibold">SideEffect</strong>를 반환하면 즉시 중단하고 그대로 반환합니다.
      입력으로 SideEffect를 받으면 실행 없이 그대로 돌려줍니다.
      순수 파이프라인은 <strong>pipe</strong>를 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        throw new Error('18세 이상만 가능합니다');
      });

const processAge = pipeSideEffect(
  validateAge,
  (age: number) => age * 2,
  (age: number) => \`나이: \${age}\`,
  runPipeResult
);

processAge(15); // Throws: Error: 18세 이상만 가능합니다`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function pipeSideEffect<A, R>(
  ab: (a: A) => R | SideEffect
): (a: A | SideEffect) => R | SideEffect;

function pipeSideEffect<A, B, R>(
  ab: (a: A) => B | SideEffect,
  bc: (b: B) => R | SideEffect
): (a: A | SideEffect) => R | SideEffect;

// ... 최대 5개 함수
function pipeSideEffect(...funcs: Array<(input: any) => any>): (input: any) => any;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      각 단계는 일반 값 또는 SideEffect를 반환할 수 있습니다. SideEffect가 등장하면 파이프라인은 즉시 종료됩니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect 활용하기
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      기본 SideEffect 사용법
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const validateAge = (age: number) => {
  if (age < 0) {
    // 파이프라인을 중단하기 위해 SideEffect 반환
    return SideEffect.of(() => {
      throw new Error('나이는 음수일 수 없습니다');
    });
  }
  return age;
};

const processAge = pipeSideEffect(
  validateAge,
  (age: number) => age * 2,  // SideEffect가 반환되면 실행되지 않음
  (age: number) => \`나이: \${age}\`,
  runPipeResult  // SideEffect가 있으면 자동 실행
);

// SideEffect가 자동으로 실행됨
try {
  processAge(-5);  // Throws: Error: 나이는 음수일 수 없습니다
} catch (error) {
  console.error(error.message);
}

// 정상 실행 계속
const result = processAge(10);
console.log(result);  // "나이: 20"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 조기 종료
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

const checkPermission = (user: User) => {
  if (user.role !== 'admin') {
    return SideEffect.of(() => ({
      error: '권한 없음',
      message: '관리자 권한이 필요합니다'
    }));
  }
  return user;
};

const deleteUser = pipeSideEffect(
  checkPermission,
  (user: User) => {
    console.log(\`사용자 삭제 중: \${user.name}\`);
    return { success: true, deletedId: user.id };
  },
  runPipeResult  // SideEffect가 있으면 자동 실행
);

const adminUser = { id: 1, name: 'Alice', role: 'admin' as const };
const normalUser = { id: 2, name: 'Bob', role: 'user' as const };

// 관리자는 진행 가능
const result1 = deleteUser(adminUser);
// 로그: "사용자 삭제 중: Alice"
console.log(result1);  // { success: true, deletedId: 1 }

// 일반 사용자는 즉시 에러 반환
const result2 = deleteUser(normalUser);
console.log(result2);  // { error: '권한 없음', message: '관리자 권한이 필요합니다' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      지연된 로깅 및 부수 효과
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const divide = (a: number, b: number) => {
  if (b === 0) {
    return SideEffect.of(() => {
      console.error('0으로 나눌 수 없습니다!');
      return NaN;
    }, 'division-by-zero');  // 디버깅을 위한 선택적 레이블
  }
  return a / b;
};

const calculate = pipeSideEffect(
  (input: { a: number; b: number }) => divide(input.a, input.b),
  (result: number) => result * 100,
  (result: number) => Math.round(result),
  runPipeResult  // SideEffect가 있으면 자동 실행
);

// 정상 계산
const result1 = calculate({ a: 10, b: 2 });
console.log(result1);  // 500

// 0으로 나누기는 SideEffect를 실행하고 로그를 출력
const result2 = calculate({ a: 10, b: 0 });
// 로그: "0으로 나눌 수 없습니다!"
console.log(result2);  // NaN`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ 중요:</span>
        <br />
        <br />
        SideEffect 컨테이너는 <strong>절대 자동 실행되지 않습니다</strong>. 지연된 작업을 실행하려면{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> 또는{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">sideEffect.effect()</code>를 명시적으로 호출해야 합니다.
        <br />
        <br />
        이를 통해 부수 효과가 실행되는 시점과 위치를 완전히 제어할 수 있습니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          SideEffect 조기 종료 없이 순수하게 합성합니다.
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
          비동기 파이프라인에서 SideEffect 조기 종료를 지원합니다.
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
