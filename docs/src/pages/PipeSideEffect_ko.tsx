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
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        throw new Error('18세 이상만 가능합니다');
      });

const processAgePipeline = pipeSideEffect(
  validateAge,
  (age: number) => age * 2,
  (age: number) => \`나이: \${age}\`
);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
runPipeResult(processAgePipeline(15)); // Throws: Error: 18세 이상만 가능합니다`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">✅ pipeSideEffect는 언제 사용하나요?</span>
        <br />
        <br />
        <strong>기본 선택: <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipe</code>를 사용하세요</strong>
        <br />
        <br />
        대부분의 데이터 변환에는 SideEffect가 필요하지 않습니다. 순수 변환에는{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipe</code>로 시작하고,{' '}
        <strong>조기 종료나 부수 효과가 있는 에러 처리가 실제로 필요할 때만{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeSideEffect</code>를 사용하세요</strong>.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`// ✅ 좋음: 99%의 경우 - pipe 사용 (순수 변환)
import { pipe, map, filter } from 'fp-pack';

const processData = pipe(
  filter(isValid),
  map(transform)
);

// ✅ 좋음: SideEffect가 필요할 때만 - pipeSideEffect 사용
import { pipeSideEffect, SideEffect } from 'fp-pack';

const processWithValidation = pipeSideEffect(
  validateOrStop,  // SideEffect를 반환할 수 있음
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
      code={`function pipeSideEffect<A, R>(
  ab: (a: A) => R | SideEffect
): (a: A | SideEffect) => R | SideEffect;

function pipeSideEffect<A, B, R>(
  ab: (a: A) => B | SideEffect,
  bc: (b: B) => R | SideEffect
): (a: A | SideEffect) => R | SideEffect;

function pipeSideEffect(...funcs: Array<(input: any) => any>): (input: any) => any;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      각 단계는 일반 값 또는 SideEffect를 반환할 수 있습니다. SideEffect가 등장하면 파이프라인은 즉시 종료됩니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      엄격 버전
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipeSideEffectStrict</code>는 파이프라인에서 발생 가능한 SideEffect 결과 타입을
      유니온으로 엄격하게 유지합니다. 분기 타입을 더 정확히 추론하고 싶을 때 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffectStrict, SideEffect } from 'fp-pack';

const pipeline = pipeSideEffectStrict(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEGATIVE' as const)),
  (n) => (n > 10 ? n : SideEffect.of(() => 0 as const))
);

// 결과 타입: number | SideEffect<'NEGATIVE' | 0>
const result = pipeline(5);`}
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
        ⚠️ <strong>입력이 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> 또는 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>로 넓어지면(<code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">pipeSideEffect</code>에서 흔함) 결과가 <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>가 됩니다.</strong>
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
      기본 SideEffect 사용법
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const validateAge = (age: number) => {
  if (age < 0) {
    // 파이프라인을 중단하기 위해 SideEffect 반환
    return SideEffect.of(() => {
      throw new Error('나이는 음수일 수 없습니다');
    });
  }
  return age;
};

const processAgePipeline = pipeSideEffect(
  validateAge,
  (age: number) => age * 2,  // SideEffect가 반환되면 실행되지 않음
  (age: number) => \`나이: \${age}\`
);

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
try {
  runPipeResult(processAgePipeline(-5));  // Throws: Error: 나이는 음수일 수 없습니다
} catch (error) {
  console.error(error.message);
}

// 정상 실행 계속
const result = runPipeResult(processAgePipeline(10));
console.log(result);  // "나이: 20"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 조기 종료
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

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

const deleteUserPipeline = pipeSideEffect(
  checkPermission,
  (user: User) => {
    console.log(\`사용자 삭제 중: \${user.name}\`);
    return { success: true, deletedId: user.id };
  }
);

const adminUser = { id: 1, name: 'Alice', role: 'admin' as const };
const normalUser = { id: 2, name: 'Bob', role: 'user' as const };

// 관리자는 진행 가능 - runPipeResult는 밖에서 호출
const result1 = runPipeResult(deleteUserPipeline(adminUser));
// 로그: "사용자 삭제 중: Alice"
console.log(result1);  // { success: true, deletedId: 1 }

// 일반 사용자는 즉시 에러 반환
const result2 = runPipeResult(deleteUserPipeline(normalUser));
console.log(result2);  // { error: '권한 없음', message: '관리자 권한이 필요합니다' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      지연된 로깅 및 부수 효과
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const divide = (a: number, b: number) => {
  if (b === 0) {
    return SideEffect.of(() => {
      console.error('0으로 나눌 수 없습니다!');
      return NaN;
    }, 'division-by-zero');  // 디버깅을 위한 선택적 레이블
  }
  return a / b;
};

const calculatePipeline = pipeSideEffect(
  (input: { a: number; b: number }) => divide(input.a, input.b),
  (result: number) => result * 100,
  (result: number) => Math.round(result)
);

// 정상 계산 - runPipeResult는 밖에서 호출
const result1 = runPipeResult(calculatePipeline({ a: 10, b: 2 }));
console.log(result1);  // 500

// 0으로 나누기는 SideEffect를 실행하고 로그를 출력
const result2 = runPipeResult(calculatePipeline({ a: 10, b: 0 }));
// 로그: "0으로 나눌 수 없습니다!"
console.log(result2);  // NaN`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ 중요:</span>
        <br />
        <br />
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code>와{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">matchSideEffect()</code>는{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">pipeSideEffect</code> 체인{' '}
        <strong>밖에서</strong> 호출해야 합니다.
        <br />
        <br />
        파이프라인 내부에서 사용하면 타입 안전성이 깨지고 <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">unknown</code> 또는{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> 타입을 반환합니다.
        <br />
        <br />
        항상: <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult(pipeline(input))</code>
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
        한번 <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeSideEffect</code>를 사용하면, 그 결과는 <strong>항상 <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">T | SideEffect</code></strong>입니다.
        <br />
        <br />
        이 결과를 계속 합성하려면, <strong>반드시</strong> <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeSideEffect</code>를 계속 사용해야 합니다.
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipe</code>로 <strong>돌아갈 수 없습니다</strong>. pipe는 SideEffect를 처리할 수 없기 때문입니다.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { pipe, pipeSideEffect, SideEffect } from 'fp-pack';

const validateUserPipeline = pipeSideEffect(
  findUser,
  validateAge
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
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipeSideEffect</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/pipeSideEffect.ts"
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
