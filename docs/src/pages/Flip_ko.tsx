import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Flip_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flip
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      함수의 인자 순서를 뒤집음
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      flip이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flip
      </strong>{' '}
      은 함수를 받아 인자 순서가 뒤집힌 새로운 함수를 반환합니다.
      <br />
      <br />
      조합, 부분 적용, 또는 다른 순서로 인자를 받는 함수와 작업할 때
      인자 순서를 조정해야 할 경우 특히 유용합니다.
      <br />
      <br />
      flip은 2개, 3개 이상의 인자를 가진 함수와 원활하게 작동하며 원래 함수의 동작을 보존합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flip } from 'fp-pack';

// 원래 함수
const divide = (a: number, b: number) => a / b;
divide(10, 2);  // 5

// 뒤집힌 버전
const flippedDivide = flip(divide);
flippedDivide(2, 10);  // 5 (이제 10을 2로 나눔)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      이항 함수
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip } from 'fp-pack';

const subtract = (a: number, b: number) => a - b;
const flippedSubtract = flip(subtract);

subtract(10, 3);          // 7
flippedSubtract(3, 10);   // 7 (subtract(10, 3)과 동일)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      가변 인자 함수
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip } from 'fp-pack';

const concat = (...parts: Array<string | number>) => parts.join('-');
const flippedConcat = flip(concat);

concat('a', 'b', 1, 2);         // "a-b-1-2"
flippedConcat('a', 'b', 1, 2);  // "2-1-b-a"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      조합을 위한 조정
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip, curry, pipe } from 'fp-pack';

// 때때로 API는 불편한 순서로 인자를 받습니다
const appendTo = (suffix: string, text: string) => text + suffix;

// flip을 사용하면 조합하기 쉬워집니다
const addExclamation = flip(appendTo)('!');

const shout = pipe(
  (text: string) => text.toUpperCase(),
  addExclamation
);

shout('hello');  // "HELLO!"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 연산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip, curry } from 'fp-pack';

// Array.prototype.map은 (callback, thisArg)를 기대합니다
// 하지만 조합을 위해 데이터를 마지막에 두고 싶을 때가 많습니다
const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));

// flip을 사용하면 데이터-마지막 버전을 만들 수 있습니다
const mapOver = flip(map);

const double = (n: number) => n * 2;
const numbers = [1, 2, 3, 4];

// 이제 데이터가 먼저 옵니다
mapOver(numbers, double);  // [2, 4, 6, 8]

// 부분 적용에 완벽합니다
const doubleAll = mapOver(numbers);
doubleAll(double);  // [2, 4, 6, 8]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      문자열 연산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip, curry } from 'fp-pack';

const replace = curry(
  (search: string, replacement: string, text: string) =>
    text.replace(search, replacement)
);

// flip으로 text를 첫 번째 인자로 만듭니다
const replaceIn = flip(replace);

const text = "Hello World";
replaceIn(text, "World", "TypeScript");  // "Hello TypeScript"

// 또는 특수화된 replacer를 만듭니다
const sanitize = replaceIn(_, /[<>]/g, "");
sanitize("<script>alert('xss')</script>");  // "scriptalert('xss')/script"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      flip과 curry 함께 사용하기
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      flip과 curry는 함께 아름답게 작동합니다. 뒤집은 후 curry를 사용하면
      새로운 인자 순서로 부분 적용이 가능합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flip, curry, pipe } from 'fp-pack';

const divide = (a: number, b: number) => a / b;

// flip 후 curry로 "제수 우선" 부분 적용
const divideBy = curry(flip(divide));

const half = divideBy(2);      // 2로 나누기
const third = divideBy(3);     // 3으로 나누기

half(10);   // 5
third(12);  // 4

// 파이프라인에서 사용
const calculate = pipe(
  (n: number) => n + 5,
  divideBy(2),
  Math.floor
);

calculate(7);  // 6
// 흐름: 7 → +5 → 12 → ÷2 → 6 → floor → 6`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 flip을 사용하나요?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. 인자 순서 유연성
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          함수를 다시 작성하지 않고도 다양한 조합 스타일에 적응시킵니다.
          데이터-마지막이 데이터-처음으로, 또는 그 반대로.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 더 나은 조합
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          원활한 함수 파이프라인과 조합을 위해 인자 순서를 정렬합니다.
          함수들이 자연스럽게 맞물리게 만듭니다.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. 부분 적용
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          curry와 결합하면 다른 방향에서의 부분 적용이 가능합니다.
          어떤 인자를 먼저 고정할지 선택할 수 있습니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. API 적응
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          래퍼 함수 없이 서드파티 API를 선호하는 함수 시그니처 스타일에 맞게
          조정합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">flip</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/flip.ts"
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
          강력한 합성을 위해 curry와 결합.
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
          순서 뒤집은 후 인자 미리 채우기.
        </p>
      </a>

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
          파이프라인에서 뒤집힌 함수 사용.
        </p>
      </a>
    </div>
  </div>
);
