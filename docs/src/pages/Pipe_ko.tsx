import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Pipe_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipe
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      왼쪽에서 오른쪽으로 함수를 합성 (f → g → h)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipe란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipe
      </strong>{' '}
      는 여러 함수를 왼쪽에서 오른쪽으로 합성하는 함수입니다.
      <br />
      <br />
      한 함수의 출력을 다음 함수의 입력으로 전달하여 가독성 있는 데이터 변환 파이프라인을 만듭니다.
      <br />
      <br />
      변환을 읽는 가장 자연스러운 방법입니다: 데이터로 시작한 다음 변환을 순서대로 적용합니다.
      타입 추론을 위해 value-first <code class="text-xs">pipe(value, ...)</code>를 우선 사용하고,
      재사용이 필요할 때만 함수-우선 형태를 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const result = pipe(
  5,
  double,    // 1. 먼저 숫자를 2배로
  addTen,    // 2. 그 다음 10을 더하고
  toString   // 3. 마지막으로 문자열로 변환
);

result;  // "20"
// 흐름: 5 → double → 10 → addTen → 20 → toString → "20"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 데이터 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

const result = pipe(
  '  John Doe  ',
  (name: string) => name.trim(),
  (name: string) => name.toLowerCase(),
  (name: string) => name.split(' '),
  (parts: string[]) => parts.join('-')
);

result;  // "john-doe"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 다루기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

const numbers = [1, 2, 3, 4, 5];

const result = pipe(
  numbers,
  (nums: number[]) => nums.filter(n => n > 2),
  (nums: number[]) => nums.map(n => n * 2),
  (nums: number[]) => nums.reduce((sum, n) => sum + n, 0)
);

result;  // 24
// 흐름: [1,2,3,4,5] → filter → [3,4,5] → map → [6,8,10] → reduce → 24`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      사용자 데이터 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 17, active: true },
  { id: 3, name: 'Charlie', age: 30, active: false },
  { id: 4, name: 'Diana', age: 22, active: true },
];

const result = pipe(
  users,
  (users: User[]) => users.filter(u => u.active),
  (users: User[]) => users.filter(u => u.age >= 18),
  (users: User[]) => users.map(u => u.name),
  (names: string[]) => names.sort()
);

result;  // ["Alice", "Diana"]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      가격 계산 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

const result = pipe(
  100,
  (price: number) => price * 0.9,        // 10% 할인
  (price: number) => price * 1.1,        // 10% 세금 추가
  (price: number) => Math.round(price * 100) / 100,  // 소수점 2자리로
  (price: number) => \`₩\${price.toFixed(2)}\`  // 통화 형식으로
);

result;  // "₩99.00"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다른 유틸리티와 결합
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      pipe는 curry 같은 다른 fp-pack 유틸리티와 함께 사용하면 최대한의 조합 가능성을 제공합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, curry } from 'fp-pack';

// 커리된 헬퍼 함수 생성
const multiply = curry((a: number, b: number) => a * b);
const add = curry((a: number, b: number) => a + b);
const divide = curry((a: number, b: number) => a / b);

// 파이프라인에서 조합
const result = pipe(
  5,
  multiply(2),      // 2배로
  add(10),          // 10 더하기
  divide(4)         // 4로 나누기
);

result;  // 5
// 흐름: 5 → *2 → 10 → +10 → 20 → /4 → 5`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipe vs compose
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      pipe와 compose 모두 함수 합성을 만들지만, 반대 방향으로 흐릅니다:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipe (왼쪽에서 오른쪽)
        </h4>
        <CodeBlock
          language="typescript"
          code={`pipe(
  5,
  double,
  addTen,
  toString
);
// 5 → 10 → 20 → "20"`}
        />
      </div>
      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-purple-900 dark:text-purple-100 mb-2">
          compose (오른쪽에서 왼쪽)
        </h4>
        <CodeBlock
          language="typescript"
          code={`compose(
  toString,
  addTen,
  double
)(5)
// 5 → 10 → 20 → "20"`}
        />
      </div>
    </div>

    <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 pipe를 사용해야 할 때:</span>
        <br />
        <br />
        변환이 실행되는 순서대로 읽고 싶을 때 <strong>pipe</strong>를 사용하세요.
        이것이 대부분의 개발자에게 더 직관적이며 단계별 레시피처럼 읽힙니다.
        <br />
        <br />
        수학적 표기법을 선호하거나 그 규칙을 따르는 코드로 작업할 때는
        <strong>compose</strong>를 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      어떤 파이프를 선택할까?: 유연성 vs 엄격성
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack은 추론의 유연성과 엄격한 타입 안전성 사이에서 선택할 수 있도록 두 가지 버전의 순수
      파이프를 제공합니다.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipe (유연한 기본 파이프)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>목표:</strong> 최상의 타입 추론 능력.
          </li>
          <li>
            <strong>장점:</strong> 복잡하고 제네릭한 파이프라인에서도 최종 결과 타입을 놀랍도록
            잘 추론해내며, 수동 타입 명시의 필요성을 최소화합니다. 부드러운 개발 경험(DX)을
            우선시합니다.
          </li>
          <li>
            <strong>단점:</strong> 이를 위해 중간 단계의 타입 검사가 다소 너그러워, 함수 간의 모든
            타입 불일치를 잡아내지 못할 수 있으며 이는 런타임 에러로 이어질 수 있습니다.
          </li>
        </ul>
      </div>
      <div class="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-emerald-900 dark:text-emerald-100 mb-2">
          pipeStrict (안전한 대안)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>목표:</strong> 최대한의 타입 안정성.
          </li>
          <li>
            <strong>장점:</strong> 파이프라인의 각 함수 연결 단계에서 타입 불일치가 발생하면 즉시
            컴파일 에러를 발생시켜 버그를 예방합니다.
          </li>
          <li>
            <strong>단점:</strong> 일부 고급 제네릭 시나리오에서는 이 엄격함이 오히려 타입 추론을
            방해하여, 개발자가 직접 타입 힌트를 더 추가해야 할 수 있습니다.
          </li>
        </ul>
      </div>
    </div>

    <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-yellow-800 dark:text-yellow-200 leading-relaxed">
        <span class="font-medium">💡 추천:</span>
        <br />
        <br />
        훌륭한 개발 경험을 위해 <strong>pipe</strong>로 시작하세요. 만약 타입 안정성이 매우
        중요하거나, <strong>pipe</strong>가 너무 너그럽다고 느껴지는 부분에서는{' '}
        <a
          href="/composition/pipeStrict"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/composition/pipeStrict');
          }}
          class="font-semibold text-emerald-700 dark:text-emerald-300"
        >
          pipeStrict
        </a>
        로 전환하여 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect 파이프라인
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>pipe</strong>는 순수 합성 도구입니다. <strong class="font-semibold">SideEffect</strong>로
      조기 종료가 필요한 파이프라인은 <strong>pipeSideEffect</strong>를 사용하세요. 엄격한 유니온 타입이 필요하면{' '}
      <a
        href="/composition/pipeSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffectStrict');
        }}
        class="font-semibold text-blue-700 dark:text-blue-300"
      >
        pipeSideEffectStrict
      </a>
      를 사용하세요.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipe</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/pipe.ts"
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
        href="/composition/pipeStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          pipeStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          순수 파이프라인에서 더 엄격한 타입 검사.
        </p>
      </a>

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
          SideEffect 조기 종료를 지원하는 왼쪽→오른쪽 합성.
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
          SideEffect 결과 타입을 엄격 유니온으로 유지하는 합성.
        </p>
      </a>

      <a
        href="/composition/compose"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/compose');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          compose →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          오른쪽에서 왼쪽으로 함수를 합성 - pipe의 대안.
        </p>
      </a>

      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          curry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          파이프라인에서 부분 적용을 위한 함수 변환.
        </p>
      </a>

      <a
        href="/composition/partial"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/partial');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          partial →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          유연한 합성을 위해 함수 인자를 미리 채우기.
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
          조건부 파이프라인 중단을 위한 지연 실행 컨테이너.
        </p>
      </a>
    </div>
  </div>
);
