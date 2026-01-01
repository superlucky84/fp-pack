import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Curry_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      curry
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      부분 적용을 지원하도록 함수를 변환
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      curry란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        curry
      </strong>{' '}
      는 다중 매개변수 함수를 일련의 단일 매개변수 함수로 변환합니다.
      <br />
      <br />
      이를 통해 <strong>부분 적용</strong>이 가능합니다: 한 번에 하나씩 인수를 제공하고
      특수화된 함수를 받을 수 있습니다.
      <br />
      <br />
      커리된 함수는 극도로 조합 가능하며 pipe 및 compose와 완벽하게 작동합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';

// 일반 함수
const add = (a: number, b: number) => a + b;
add(2, 3);  // 5

// 커리된 버전
const curriedAdd = curry(add);
curriedAdd(2)(3);        // 5
curriedAdd(2, 3);        // 5 (이것도 작동합니다!)

// 부분 적용
const add2 = curriedAdd(2);
add2(3);  // 5
add2(10); // 12`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 수학 함수
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';

const multiply = curry((a: number, b: number) => a * b);
const subtract = curry((a: number, b: number) => a - b);
const divide = curry((a: number, b: number) => a / b);

// 완전히 적용하여 사용
multiply(3, 4);     // 12
subtract(10, 3);    // 7
divide(20, 4);      // 5

// 또는 부분 적용
const double = multiply(2);
const triple = multiply(3);
const half = divide(2);

double(5);   // 10
triple(5);   // 15
half(10);    // 5`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      배열 필터링과 매핑
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';

const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));
const filter = curry(<T>(pred: (x: T) => boolean, arr: T[]) => arr.filter(pred));

const double = (n: number) => n * 2;
const isEven = (n: number) => n % 2 === 0;

// 특수화된 함수 생성
const doubleAll = map(double);
const filterEvens = filter(isEven);

const numbers = [1, 2, 3, 4, 5];

doubleAll(numbers);      // [2, 4, 6, 8, 10]
filterEvens(numbers);    // [2, 4]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      객체 속성 접근
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';

const prop = curry(<T, K extends keyof T>(key: K, obj: T) => obj[key]);

interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

// 속성 추출기 생성
const getName = prop('name');
const getEmail = prop('email');

users.map(getName);   // ["Alice", "Bob"]
users.map(getEmail);  // ["alice@example.com", "bob@example.com"]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      curry와 pipe 결합
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      curry는 pipe나 compose와 결합할 때 빛을 발합니다. 부분 적용된 커리 함수는
      파이프라인을 위한 깔끔하고 재사용 가능한 구성 요소를 만듭니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, curry } from 'fp-pack';

const add = curry((a: number, b: number) => a + b);
const multiply = curry((a: number, b: number) => a * b);
const subtract = curry((a: number, b: number) => a - b);

// 계산 파이프라인 구축
const calculate = pipe(
  add(10),        // 10 더하기
  multiply(2),    // 2배로
  subtract(5)     // 5 빼기
);

calculate(5);   // 25
// 흐름: 5 → +10 → 15 → *2 → 30 → -5 → 25`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 Curry를 사용하나요?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. 재사용성
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          일반 함수의 특수화된 버전을 만듭니다. 새로운 함수를 작성하는 대신
          기존 함수를 부분 적용합니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 조합 가능성
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          커리된 함수는 pipe 및 compose와 아름답게 작동합니다. 부분 적용은
          파이프라인에 완벽하게 맞는 함수를 만듭니다.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. 설정
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          공통 매개변수로 함수를 한 번 설정한 다음 코드 전체에서 특수화된
          버전을 사용합니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. 가독성
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          이름이 지정된 부분 적용 함수는 인라인 매개변수보다 코드를 더 자체 문서화합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">curry</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/curry.ts"
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
          커리된 함수를 가독성 있는 파이프라인으로 결합.
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
          부분 적용을 위한 대안적 접근 방식.
        </p>
      </a>

      <a
        href="/composition/flip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/flip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          flip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          더 나은 합성을 위해 인자 순서를 반대로.
        </p>
      </a>
    </div>
  </div>
);
