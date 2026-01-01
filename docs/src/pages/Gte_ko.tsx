import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Gte_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      gte
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값이 임계값보다 크거나 같은지 확인하는 커링된 함수를 생성합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      gte란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        gte
      </strong>{' '}
      (greater than or equal)는 값이 임계값보다 크거나 같은지 확인하는 커링된 비교 함수를 생성합니다.
      <br />
      <br />
      임계값이 주어지면, 다른 값이 해당 임계값을 충족하거나 초과하는지 테스트하는 술어 함수를 반환합니다.
      이는 비교에 경계 값을 포함해야 할 때 유용한 gt의 포함 버전입니다.
      <br />
      <br />
      커링된 설계는 <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">filter</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">some</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">every</code>와 같은 배열 메서드 및 파이프라인과 검증 로직에서 사용하기에 완벽합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

const isAtLeast18 = gte(18);

isAtLeast18(20);  // true (20 >= 18)
isAtLeast18(18);  // true (18 >= 18, 같은 것도 포함!)
isAtLeast18(15);  // false (15 < 18)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 비교
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

// 비교 함수 생성
const isAtLeast10 = gte(10);
const isNonNegative = gte(0);
const isAtLeast100 = gte(100);

isAtLeast10(15);   // true
isAtLeast10(10);   // true (같은 것도 포함!)
isAtLeast10(5);    // false

isNonNegative(5);  // true
isNonNegative(0);  // true (0 >= 0)
isNonNegative(-3); // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 메서드와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

const scores = [45, 60, 75, 80, 90, 100];

// 합격 점수 필터링 (>= 60)
scores.filter(gte(60));
// [60, 75, 80, 90, 100]

// 만점이 있는지 확인 (>= 100)
scores.some(gte(100));
// true

// 모두 합격했는지 확인 (>= 60)
scores.every(gte(60));
// false (45 < 60)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      경계값
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

// gt와 gte의 차이
const isGreaterThan5 = gte(5);
const numbers = [3, 4, 5, 6, 7];

numbers.filter(isGreaterThan5);
// [5, 6, 7] - 5 포함!

// gt를 사용하면 5는 제외됨
// [6, 7]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      연령 확인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface User {
  name: string;
  age: number;
  country: string;
}

const users: User[] = [
  { name: 'Alice', age: 18, country: 'US' },
  { name: 'Bob', age: 17, country: 'UK' },
  { name: 'Charlie', age: 21, country: 'CA' },
  { name: 'Diana', age: 16, country: 'US' }
];

// 최소 18세 이상 (포함)
const isLegalAge = gte(18);
const eligibleUsers = users.filter(u => isLegalAge(u.age));
// [
//   { name: 'Alice', age: 18, country: 'US' },  // 18 포함!
//   { name: 'Charlie', age: 21, country: 'CA' }
// ]

// 음주 가능 연령 (>= 21)
const canDrink = gte(21);
const drinkers = users.filter(u => canDrink(u.age));
// [{ name: 'Charlie', age: 21, country: 'CA' }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      최소 요구사항
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface Job {
  title: string;
  salary: number;
  experience: number;
}

const jobs: Job[] = [
  { title: 'Junior Dev', salary: 50000, experience: 0 },
  { title: 'Mid Dev', salary: 80000, experience: 3 },
  { title: 'Senior Dev', salary: 120000, experience: 5 },
  { title: 'Lead Dev', salary: 150000, experience: 8 }
];

// 최소 급여 요구사항 (>= 80000)
const meetsMinSalary = gte(80000);
const qualifyingSalaries = jobs.filter(j => meetsMinSalary(j.salary));
// [
//   { title: 'Mid Dev', salary: 80000, experience: 3 },
//   { title: 'Senior Dev', salary: 120000, experience: 5 },
//   { title: 'Lead Dev', salary: 150000, experience: 8 }
// ]

// 최소 5년 경력 필요
const hasExperience = gte(5);
const seniorRoles = jobs.filter(j => hasExperience(j.experience));
// [
//   { title: 'Senior Dev', salary: 120000, experience: 5 },  // 5년 포함!
//   { title: 'Lead Dev', salary: 150000, experience: 8 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      학점 경계
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface Student {
  name: string;
  score: number;
}

const students: Student[] = [
  { name: 'Alice', score: 95 },
  { name: 'Bob', score: 85 },
  { name: 'Charlie', score: 75 },
  { name: 'Diana', score: 65 },
  { name: 'Eve', score: 55 }
];

// 학점 경계 (포함)
const isGradeA = gte(90);  // A: >= 90
const isGradeB = gte(80);  // B: >= 80
const isGradeC = gte(70);  // C: >= 70
const isPassing = gte(60); // 합격: >= 60

const gradeAStudents = students.filter(s => isGradeA(s.score));
// [{ name: 'Alice', score: 95 }]

const passingStudents = students.filter(s => isPassing(s.score));
// [
//   { name: 'Alice', score: 95 },
//   { name: 'Bob', score: 85 },
//   { name: 'Charlie', score: 75 },
//   { name: 'Diana', score: 65 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      재고 수준 알림
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface Inventory {
  sku: string;
  quantity: number;
  minStock: number;
}

const inventory: Inventory[] = [
  { sku: 'LAPTOP-001', quantity: 15, minStock: 10 },
  { sku: 'MOUSE-002', quantity: 8, minStock: 10 },
  { sku: 'KEYBOARD-003', quantity: 25, minStock: 20 },
  { sku: 'MONITOR-004', quantity: 5, minStock: 5 }
];

function checkStockLevels(items: Inventory[]) {
  return {
    sufficient: items.filter(item =>
      gte(item.minStock)(item.quantity)
    ),
    needsReorder: items.filter(item =>
      !gte(item.minStock)(item.quantity)
    )
  };
}

const stockStatus = checkStockLevels(inventory);
// {
//   sufficient: [
//     { sku: 'LAPTOP-001', quantity: 15, minStock: 10 },
//     { sku: 'KEYBOARD-003', quantity: 25, minStock: 20 },
//     { sku: 'MONITOR-004', quantity: 5, minStock: 5 }  // 정확히 최소값!
//   ],
//   needsReorder: [
//     { sku: 'MOUSE-002', quantity: 8, minStock: 10 }
//   ]
// }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      시간 기반 접근 제어
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gte } from 'fp-pack';

interface AccessToken {
  userId: string;
  expiresAt: number;
  scope: string[];
}

function isTokenValid(token: AccessToken, currentTime: number): boolean {
  // 토큰이 아직 만료되지 않았으면 유효함 (expiresAt >= currentTime)
  return gte(currentTime)(token.expiresAt);
}

const currentTime = Date.now();
const oneHourLater = currentTime + 3600000;

const tokens: AccessToken[] = [
  { userId: 'user1', expiresAt: oneHourLater, scope: ['read', 'write'] },
  { userId: 'user2', expiresAt: currentTime - 1000, scope: ['read'] },
  { userId: 'user3', expiresAt: currentTime, scope: ['admin'] }
];

const validTokens = tokens.filter(t => isTokenValid(t, currentTime));
// [
//   { userId: 'user1', expiresAt: oneHourLater, scope: ['read', 'write'] },
//   { userId: 'user3', expiresAt: currentTime, scope: ['admin'] }  // 정확히 현재 시간도 포함!
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, gte } from 'fp-pack';

interface Order {
  id: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped';
}

const orders: Order[] = [
  { id: '001', total: 150, status: 'paid' },
  { id: '002', total: 50, status: 'pending' },
  { id: '003', total: 200, status: 'shipped' },
  { id: '004', total: 100, status: 'paid' }
];

// 무료 배송 자격이 있는 주문 처리 (>= 100)
const processQualifyingOrders = pipe(
  (orders: Order[]) => orders.filter(o => gte(100)(o.total)),
  (orders: Order[]) => orders.map(o => ({
    ...o,
    freeShipping: true
  }))
);

processQualifyingOrders(orders);
// [
//   { id: '001', total: 150, status: 'paid', freeShipping: true },
//   { id: '003', total: 200, status: 'shipped', freeShipping: true },
//   { id: '004', total: 100, status: 'paid', freeShipping: true }  // 100 자격 있음!
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 특징
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 포함적 비교
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          이상(≥)을 사용하여 경계 값을 포함합니다. gt와 달리, 임계값과 같은 값도 테스트를 통과합니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 기본적으로 커링됨
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          다른 값으로 재사용할 수 있는 함수를 반환하며, 함수 조합 및 부분 적용에 완벽합니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 최소 요구사항
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          최소 임계값, 자격 기준, 경계 자체가 허용되는 경계 조건을 표현하기에 완벽합니다.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 타입 안전
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          완전한 TypeScript 지원으로 숫자 비교에 대한 타입 안전성을 보장합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">gte</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/equality/gte.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/gt');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          gt
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          큰지 비교합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/lt');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          lt
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          작은지 비교합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/lte');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          lte
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          작거나 같은지 비교합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/clamp');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          clamp
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          값을 범위로 제한합니다
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/ko/equality/gt"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/gt');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          gt →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          배타적 비교(엄격하게 초과)를 위해 사용합니다.
        </p>
      </a>

      <a
        href="/ko/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          최소 임계값 필터링을 위해 gte를 filter와 함께 사용하세요.
        </p>
      </a>
    </div>
  </div>
);
