import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Identity_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      identity
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      입력값을 변경 없이 그대로 반환
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      identity란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        identity
      </strong>{' '}
      는 함수형 프로그래밍에서 가장 간단한 함수입니다: 값을 받아서 변경 없이 그대로 반환합니다.
      <br />
      <br />
      사소해 보일 수 있지만, identity는 많은 함수형 패턴의 기초입니다.
      조합에서 <strong>중립 요소</strong>로 작동하고, 기본 변환자 역할을 하며,
      더 복잡한 연산을 위한 빌딩 블록입니다.
      <br />
      <br />
      identity는 실제로는 놀랍도록 유용한 "아무것도 하지 않는" 함수라고 생각하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

identity(5);        // 5
identity('hello');  // 'hello'
identity([1, 2]);   // [1, 2]

const obj = { a: 1 };
identity(obj) === obj;  // true (동일한 참조)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 identity를 사용하나요?
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      1. 기본 변환
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      변환 함수가 필요하지만 값을 변경하지 않고 유지하고 싶을 때:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

// 조건부 변환
function processData<T>(
  data: T[],
  transform: (x: T) => T = identity
): T[] {
  return data.map(transform);
}

const numbers = [1, 2, 3];

// 변환 적용
processData(numbers, n => n * 2);  // [2, 4, 6]

// 변환 없음 (identity를 기본값으로 사용)
processData(numbers);  // [1, 2, 3]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      2. 조합에서의 중립 요소
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      identity는 compose와 pipe에서 중립 요소로 작동합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { compose, pipe, identity } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;

// identity는 파이프라인에 영향을 주지 않습니다
pipe(identity, double, addTen)(5);       // 20
pipe(double, identity, addTen)(5);       // 20
pipe(double, addTen, identity)(5);       // 20

// 조건부로 변환을 포함할 때 유용합니다
const transforms = condition
  ? [double, addTen]
  : [identity];  // condition이 false일 때 no-op

pipe(...transforms)(5);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      3. 고차 함수에서의 플레이스홀더
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

// 중첩된 구조에서 값 추출
interface User {
  id: number;
  profile?: {
    name: string;
  };
}

const users: User[] = [
  { id: 1, profile: { name: 'Alice' } },
  { id: 2, profile: { name: 'Bob' } },
];

// 프로필 추출, 구조 유지
users.map(u => u.profile);  // 프로필 추출

// 전체 객체를 유지하고 싶을 때
users.map(identity);  // [...users]와 동일

// identity를 predicate로 사용하여 필터 (falsy 값 제거)
[0, 1, '', 'hello', null, 42].filter(identity);  // [1, 'hello', 42]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      조건부 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, identity } from 'fp-kit';

interface Options {
  uppercase?: boolean;
  trim?: boolean;
  reverse?: boolean;
}

function processString(str: string, options: Options = {}) {
  return pipe(
    options.trim ? (s: string) => s.trim() : identity,
    options.uppercase ? (s: string) => s.toUpperCase() : identity,
    options.reverse ? (s: string) => s.split('').reverse().join('') : identity
  )(str);
}

processString('  hello  ', { uppercase: true, trim: true });
// "HELLO"

processString('  hello  ', {});
// "  hello  " (변환 없음)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      대체 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

interface Config<T> {
  data: T[];
  transform?: (x: T) => T;
  filter?: (x: T) => boolean;
}

function processItems<T>(config: Config<T>): T[] {
  const transform = config.transform || identity;
  const filter = config.filter || (() => true);

  return config.data
    .filter(filter)
    .map(transform);
}

const numbers = [1, 2, 3, 4, 5];

// 변환 적용
processItems({
  data: numbers,
  transform: n => n * 2,
  filter: n => n > 2
});  // [6, 8, 10]

// 변환 없음 (identity 사용)
processItems({ data: numbers });  // [1, 2, 3, 4, 5]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      모나딕 연산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { identity } from 'fp-kit';

// flatMap과 identity를 사용하여 한 단계 평탄화
const nested = [[1, 2], [3, 4], [5]];
nested.flatMap(identity);  // [1, 2, 3, 4, 5]

// map과 비교 (중첩 유지)
nested.map(identity);  // [[1, 2], [3, 4], [5]]

// 옵셔널 연산 체이닝
type Optional<T> = T | null | undefined;

function flatMapOptional<T, U>(
  value: Optional<T>,
  fn: (x: T) => Optional<U>
): Optional<U> {
  return value == null ? null : fn(value);
}

const maybeValue: Optional<number> = 42;

// 값을 그대로 유지하고 싶을 때
flatMapOptional(maybeValue, identity);  // 42

// 변환하고 싶을 때
flatMapOptional(maybeValue, n => n * 2);  // 84`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      identity를 사용할 때
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. 기본 매개변수
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          함수가 옵셔널 변환자를 받을 때 identity를 기본 변환으로 사용하세요.
          null/undefined 체크보다 낫습니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 조건부 변환
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          파이프라인을 조건부로 구축할 때, identity는 데이터를 변경 없이
          흐르게 하는 no-op 변환으로 사용됩니다.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. 테스트 및 디버깅
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          데이터 처리 파이프라인에서 문제를 격리하기 위해 복잡한 변환을
          일시적으로 identity로 교체하세요.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. 조합 완전성
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          identity는 함수 조합을 대수적으로 완전하게 만들며, 항등원소로 작용합니다
          (덧셈의 0이나 곱셈의 1처럼).
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
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
          파이프라인에서 identity를 중립 변환 요소로 사용하세요.
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
          함수 조합에서 identity가 항등원소로 작동하는 방법을 배우세요.
        </p>
      </a>
    </div>
  </div>
);
