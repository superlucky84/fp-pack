import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Memoize_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      memoize
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      동일한 입력에 대해 함수 결과 캐싱
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      memoize란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        memoize
      </strong>{' '}
      는 비용이 많이 드는 함수 호출의 결과를 캐싱하는 성능 최적화 기법입니다.
      <br />
      <br />
      memoize된 함수를 동일한 인자로 호출하면, 다시 계산하는 대신 캐시된 결과를
      반환합니다. 이는 비용이 많이 드는 계산을 수행하는 순수 함수의 성능을
      극적으로 향상시킬 수 있습니다.
      <br />
      <br />
      memoize는 인자에 대해 <strong>참조 동등성</strong>을 사용합니다.
      즉, 객체는 값이 아닌 참조로 비교됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

// 비용이 많이 드는 계산
const fibonacci = (n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

// Memoize된 버전
const memoFib = memoize(fibonacci);

// 첫 호출은 계산
memoFib(40);  // 시간 소요...

// 두 번째 호출은 캐시된 결과 반환
memoFib(40);  // 즉시!`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 계산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

let callCount = 0;

const add = (a: number, b: number) => {
  callCount++;
  return a + b;
};

const memoAdd = memoize(add);

memoAdd(2, 3);  // 5 (callCount: 1)
memoAdd(2, 3);  // 5 (callCount: 1, 캐시됨!)
memoAdd(3, 2);  // 5 (callCount: 2, 다른 인자)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      참조 동등성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

const processUser = memoize((user: { name: string; age: number }) => {
  console.log('처리 중...');
  return \`\${user.name}은(는) \${user.age}살입니다\`;
});

const alice = { name: 'Alice', age: 30 };

processUser(alice);  // "처리 중..." 로그, 결과 반환
processUser(alice);  // 로그 없음, 캐시됨!

// 값이 같아도 다른 참조면 다시 계산
processUser({ name: 'Alice', age: 30 });  // "처리 중..." 다시 로그`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      데이터 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

// 비용이 많이 드는 데이터 처리
const processDataset = memoize((data: any[]) => {
  console.log('데이터셋 처리 중...');
  return data
    .map(item => ({ ...item, processed: true }))
    .filter(item => item.value > 0)
    .sort((a, b) => b.value - a.value);
});

const dataset = [
  { id: 1, value: 10 },
  { id: 2, value: -5 },
  { id: 3, value: 20 },
];

// 첫 호출: 데이터 처리
const result1 = processDataset(dataset);

// 같은 참조로 두 번째 호출: 즉시
const result2 = processDataset(dataset);

console.log(result1 === result2);  // true (같은 캐시된 결과)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 응답 파싱
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

interface RawUser {
  id: number;
  first_name: string;
  last_name: string;
}

interface User {
  id: number;
  fullName: string;
}

// 변환을 memoize하여 재파싱 방지
const parseUsers = memoize((rawUsers: RawUser[]): User[] => {
  console.log('사용자 파싱 중...');
  return rawUsers.map(raw => ({
    id: raw.id,
    fullName: \`\${raw.first_name} \${raw.last_name}\`,
  }));
});

const apiResponse = [
  { id: 1, first_name: 'Alice', last_name: 'Smith' },
  { id: 2, first_name: 'Bob', last_name: 'Jones' },
];

// 한 번 파싱
const users1 = parseUsers(apiResponse);

// 같은 응답 객체면 재사용
const users2 = parseUsers(apiResponse);

// "사용자 파싱 중..."은 한 번만 로그됨`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비용이 많이 드는 계산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

// 계산 비용이 높은 함수
const isPrime = memoize((n: number): boolean => {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }

  return true;
});

// 첫 확인: 계산
console.time('첫 번째');
isPrime(1000000007);
console.timeEnd('첫 번째');  // ~5ms

// 두 번째 확인: 캐시됨
console.time('두 번째');
isPrime(1000000007);
console.timeEnd('두 번째');  // <0.1ms`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      재귀 함수
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { memoize } from 'fp-kit';

// 전형적인 예제: 피보나치
const fibonacci = memoize((n: number): number => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// memoize 없이: O(2^n) - 지수 시간
// memoize와 함께: O(n) - 선형 시간

fibonacci(10);  // 빠름
fibonacci(50);  // 여전히 빠름! memo 없으면 멈춤
fibonacci(100); // 즉시 (작은 값들이 이미 계산됐다면)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      중요한 고려사항
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. 순수 함수만 사용
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          순수 함수만 memoize하세요 (같은 입력은 항상 같은 출력을 생성).
          부작용이 있거나 외부 상태에 의존하는 함수는 memoize하면 안 됩니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 참조 동등성
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          인자는 값이 아닌 참조로 비교됩니다. 동일한 속성을 가진 두 객체라도
          서로 다른 인스턴스면 다르게 취급됩니다.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. 메모리 사용량
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Memoize는 메모리를 속도와 교환합니다. 캐시는 고유한 인자 조합에 따라
          증가합니다. 무한히 고유한 입력으로 호출되는 함수는 memoize하지 마세요.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. 사용 시기
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          같은 입력으로 반복적으로 호출되는 비용이 많이 드는 계산에 가장 적합합니다.
          최적화하기 전에 프로파일링하세요 - 불필요하게 memoize하지 마세요.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      memoize 사용 시기
    </h2>

    <div class="grid gap-4 mt-6">
      <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          ✓ 좋은 사용 사례
        </h4>
        <ul class="text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-1">
          <li>비용이 많이 드는 계산 (수학 계산, 파싱)</li>
          <li>재귀 함수 (피보나치, 팩토리얼)</li>
          <li>반복적으로 호출되는 데이터 변환</li>
          <li>제한적이고 반복적인 입력 패턴을 가진 함수</li>
        </ul>
      </div>

      <div class="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
        <h4 class="font-semibold text-red-900 dark:text-red-100 mb-2">
          ✗ 피해야 할 경우
        </h4>
        <ul class="text-sm text-red-800 dark:text-red-200 list-disc list-inside space-y-1">
          <li>함수에 부작용이 있는 경우 (API 호출, 로깅, 변이)</li>
          <li>무한하거나 예측 불가능한 입력 변형</li>
          <li>함수가 이미 빠른 경우 (오버헤드가 가치가 없음)</li>
          <li>결과가 시간이나 외부 상태에 따라 변하는 경우</li>
        </ul>
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
          효율적인 데이터 변환 파이프라인에서 memoize된 함수를 결합하세요.
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
          memoize된 중간 단계로 조합된 함수를 만드세요.
        </p>
      </a>
    </div>
  </div>
);
