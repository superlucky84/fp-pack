import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Compose_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      compose
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      오른쪽에서 왼쪽으로 함수를 합성 (h ← g ← f)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      compose란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        compose
      </strong>{' '}
      는 여러 함수를 오른쪽에서 왼쪽으로 합성하는 함수입니다.
      <br />
      <br />
      전통적인 수학적 표기법을 따릅니다: f(g(h(x)))는 compose(f, g, h)(x)가 됩니다.
      <br />
      <br />
      목록의 마지막 함수가 먼저 적용되는 고전적인 함수형 프로그래밍 접근 방식입니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-pack';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const transform = compose(
  toString,  // 3. 마지막으로 문자열로 변환
  addTen,    // 2. 그 다음 10을 더하고
  double     // 1. 먼저 숫자를 2배로
);

transform(5);  // "20"
// 흐름: 5 ← double ← 10 ← addTen ← 20 ← toString ← "20"
// 수학적 표기: toString(addTen(double(5)))`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      수학적 스타일
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      compose는 수학적 함수 합성처럼 읽힙니다. 가장 오른쪽 함수가 먼저 적용됩니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-pack';

// 수학적 표기: f(g(h(x)))
const h = (x: number) => x + 1;
const g = (x: number) => x * 2;
const f = (x: number) => x - 3;

const fgh = compose(f, g, h);

fgh(5);  // 9
// 단계별:
// 1. h(5) = 6
// 2. g(6) = 12
// 3. f(12) = 9`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      데이터 추출 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-pack';

interface User {
  profile: {
    name: string;
    age: number;
  };
  settings: {
    notifications: boolean;
  };
}

const getAge = (user: User) => user.profile.age;
const isAdult = (age: number) => age >= 18;
const toYesNo = (bool: boolean) => bool ? '예' : '아니오';

const checkAdultStatus = compose(
  toYesNo,
  isAdult,
  getAge
);

const user: User = {
  profile: { name: 'Alice', age: 25 },
  settings: { notifications: true }
};

checkAdultStatus(user);  // "예"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      compose vs pipe
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      compose와 pipe의 유일한 차이점은 함수 적용 방향입니다:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-purple-900 dark:text-purple-100 mb-2">
          compose (오른쪽에서 왼쪽)
        </h4>
        <CodeBlock
          language="typescript"
          code={`compose(
  toString,  // 3번째
  addTen,    // 2번째
  double     // 1번째
)(5)
// 읽기: f(g(h(x)))`}
        />
        <p class="text-sm text-purple-700 dark:text-purple-300 mt-2">
          전통적인 수학적 표기법
        </p>
      </div>
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipe (왼쪽에서 오른쪽)
        </h4>
        <CodeBlock
          language="typescript"
          code={`pipe(
  double,    // 1번째
  addTen,    // 2번째
  toString   // 3번째
)(5)
// 읽기: 레시피처럼`}
        />
        <p class="text-sm text-blue-700 dark:text-blue-300 mt-2">
          더 직관적인 실행 순서
        </p>
      </div>
    </div>

    <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">💡 compose를 사용해야 할 때:</span>
        <br />
        <br />
        다음과 같은 경우 <strong>compose</strong>를 사용하세요:
        <br />
        • 수학적 함수 합성에 익숙한 경우
        <br />
        • 수학적 규칙을 따르는 코드로 작업하는 경우
        <br />
        • "밖에서 안으로" 생각하는 것을 선호하는 경우
        <br />
        <br />
        대부분의 개발자는 일상적인 사용에서 <strong>pipe</strong>가 더 읽기 쉽다고 생각합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">compose</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/compose.ts"
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
          왼쪽에서 오른쪽 합성 - 더 직관적인 대안.
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
          부분 적용을 위한 함수 변환.
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
    </div>
  </div>
);
