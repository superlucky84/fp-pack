import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Lt_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      lt
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값이 임계값보다 작은지 확인하는 커링된 함수를 생성합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      lt란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        lt
      </strong>{' '}
      (less than)는 값이 임계값보다 엄격하게 작은지 확인하는 커링된 비교 함수를 생성합니다.
      <br />
      <br />
      임계값이 주어지면, 다른 값이 해당 임계값보다 낮은지 테스트하는 술어 함수를 반환합니다.
      이는 상한 경계를 위한 재사용 가능한 비교 술어가 필요한 필터링, 검증, 함수 조합에 특히 유용합니다.
      <br />
      <br />
      커링된 설계는 <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">filter</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">some</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">every</code>와 같은 배열 메서드 및 파이프라인에서 사용하기에 완벽합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

const isLessThan10 = lt(10);

isLessThan10(5);   // true (5 < 10)
isLessThan10(10);  // false (10은 < 10이 아님)
isLessThan10(15);  // false (15 > 10)`}
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
      code={`import { lt } from 'fp-pack';

// 비교 함수 생성
const isLessThan100 = lt(100);
const isNegative = lt(0);
const isBelowFreezing = lt(0);

isLessThan100(50);   // true
isLessThan100(100);  // false (같음, 작지 않음)
isLessThan100(150);  // false

isNegative(-5);      // true
isNegative(0);       // false
isNegative(5);       // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 메서드와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

const numbers = [5, 10, 15, 20, 25, 30];

// 20보다 작은 값 필터링
numbers.filter(lt(20));
// [5, 10, 15]

// 10보다 작은 값이 있는지 확인
numbers.some(lt(10));
// true

// 모든 값이 100보다 작은지 확인
numbers.every(lt(100));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      음수
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

const isLessThanNegative5 = lt(-5);

isLessThanNegative5(-10);  // true (-10 < -5)
isLessThanNegative5(-5);   // false (같음)
isLessThanNegative5(-3);   // false (-3 > -5)

// 매우 추운 온도 필터링 (-10°C 미만)
const temperatures = [-15, -10, -5, 0, 5, 10];
temperatures.filter(lt(-10));
// [-15]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      예산 필터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface Product {
  name: string;
  price: number;
  rating: number;
}

const products: Product[] = [
  { name: 'Budget Mouse', price: 15, rating: 4.0 },
  { name: 'Premium Mouse', price: 80, rating: 4.8 },
  { name: 'Basic Keyboard', price: 30, rating: 3.5 },
  { name: 'Gaming Keyboard', price: 150, rating: 4.9 },
  { name: 'Cheap Cable', price: 5, rating: 3.0 }
];

// 저렴한 아이템 찾기 (가격 < 50)
const isAffordable = lt(50);
const budgetItems = products.filter(p => isAffordable(p.price));
// [
//   { name: 'Budget Mouse', price: 15, rating: 4.0 },
//   { name: 'Basic Keyboard', price: 30, rating: 3.5 },
//   { name: 'Cheap Cable', price: 5, rating: 3.0 }
// ]

// $10 미만 아이템 찾기
const isCheap = lt(10);
const cheapItems = products.filter(p => isCheap(p.price));
// [{ name: 'Cheap Cable', price: 5, rating: 3.0 }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      재고 부족 알림
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface Inventory {
  sku: string;
  quantity: number;
  reorderThreshold: number;
}

const inventory: Inventory[] = [
  { sku: 'LAPTOP-001', quantity: 3, reorderThreshold: 5 },
  { sku: 'MOUSE-002', quantity: 25, reorderThreshold: 10 },
  { sku: 'KEYBOARD-003', quantity: 8, reorderThreshold: 10 },
  { sku: 'MONITOR-004', quantity: 2, reorderThreshold: 3 }
];

// 재고가 위험 수준인 아이템 찾기 (수량 < 재주문 임계값)
function findLowStock(items: Inventory[]) {
  return items.filter(item =>
    lt(item.reorderThreshold)(item.quantity)
  );
}

const lowStockItems = findLowStock(inventory);
// [
//   { sku: 'LAPTOP-001', quantity: 3, reorderThreshold: 5 },
//   { sku: 'MONITOR-004', quantity: 2, reorderThreshold: 3 }
// ]

// 심각한 부족 (수량 < 5)
const isCritical = lt(5);
const criticalItems = inventory.filter(i => isCritical(i.quantity));
// [
//   { sku: 'LAPTOP-001', quantity: 3, reorderThreshold: 5 },
//   { sku: 'MONITOR-004', quantity: 2, reorderThreshold: 3 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      성능 모니터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface ServerMetric {
  server: string;
  cpuUsage: number;
  memoryUsage: number;
  diskSpace: number;
}

const metrics: ServerMetric[] = [
  { server: 'web-1', cpuUsage: 45, memoryUsage: 70, diskSpace: 15 },
  { server: 'web-2', cpuUsage: 30, memoryUsage: 55, diskSpace: 8 },
  { server: 'db-1', cpuUsage: 80, memoryUsage: 85, diskSpace: 25 },
  { server: 'cache-1', cpuUsage: 20, memoryUsage: 40, diskSpace: 5 }
];

// 디스크 공간이 위험하게 낮을 때 알림 (< 10GB)
const hasLowDiskSpace = lt(10);
const lowDiskServers = metrics.filter(m => hasLowDiskSpace(m.diskSpace));
// [
//   { server: 'web-2', cpuUsage: 30, memoryUsage: 55, diskSpace: 8 },
//   { server: 'cache-1', cpuUsage: 20, memoryUsage: 40, diskSpace: 5 }
// ]

// 활용도가 낮은 서버 찾기 (CPU < 50%)
const isUnderutilized = lt(50);
const idleServers = metrics.filter(m => isUnderutilized(m.cpuUsage));
// [
//   { server: 'web-1', cpuUsage: 45, memoryUsage: 70, diskSpace: 15 },
//   { server: 'web-2', cpuUsage: 30, memoryUsage: 55, diskSpace: 8 },
//   { server: 'cache-1', cpuUsage: 20, memoryUsage: 40, diskSpace: 5 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      연령 제한
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface User {
  name: string;
  age: number;
  verified: boolean;
}

const users: User[] = [
  { name: 'Alice', age: 15, verified: true },
  { name: 'Bob', age: 25, verified: true },
  { name: 'Charlie', age: 17, verified: false },
  { name: 'Diana', age: 30, verified: true }
];

// 미성년자 찾기 (나이 < 18)
const isMinor = lt(18);
const minors = users.filter(u => isMinor(u.age));
// [
//   { name: 'Alice', age: 15, verified: true },
//   { name: 'Charlie', age: 17, verified: false }
// ]

// 13세 미만 어린이
const isChild = lt(13);
const hasChildren = users.some(u => isChild(u.age));
// false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      시간 제한
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lt } from 'fp-pack';

interface Task {
  id: string;
  priority: number;
  estimatedHours: number;
  deadline: number;
}

const tasks: Task[] = [
  { id: 'T1', priority: 1, estimatedHours: 2, deadline: Date.now() + 3600000 },
  { id: 'T2', priority: 2, estimatedHours: 8, deadline: Date.now() + 86400000 },
  { id: 'T3', priority: 3, estimatedHours: 1, deadline: Date.now() + 7200000 },
  { id: 'T4', priority: 1, estimatedHours: 4, deadline: Date.now() + 172800000 }
];

// 빠른 작업 (예상 시간 < 3)
const isQuickTask = lt(3);
const quickTasks = tasks.filter(t => isQuickTask(t.estimatedHours));
// [
//   { id: 'T1', priority: 1, estimatedHours: 2, deadline: ... },
//   { id: 'T3', priority: 3, estimatedHours: 1, deadline: ... }
// ]

// 높은 우선순위 작업 (우선순위 < 2, 낮은 숫자 = 높은 우선순위)
const isHighPriority = lt(2);
const urgentTasks = tasks.filter(t => isHighPriority(t.priority));
// [
//   { id: 'T1', priority: 1, estimatedHours: 2, deadline: ... },
//   { id: 'T4', priority: 1, estimatedHours: 4, deadline: ... }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, lt } from 'fp-pack';

interface Student {
  name: string;
  score: number;
  attendance: number;
}

const students: Student[] = [
  { name: 'Alice', score: 95, attendance: 100 },
  { name: 'Bob', score: 55, attendance: 70 },
  { name: 'Charlie', score: 75, attendance: 85 },
  { name: 'Diana', score: 45, attendance: 60 }
];

// 불합격 학생 처리 (점수 < 60) 및 개입
const processFailingStudents = pipe(
  (students: Student[]) => students.filter(s => lt(60)(s.score)),
  (students: Student[]) => students.map(s => ({
    ...s,
    needsIntervention: true,
    counselorAssigned: true
  }))
);

processFailingStudents(students);
// [
//   { name: 'Bob', score: 55, attendance: 70, needsIntervention: true, ... },
//   { name: 'Diana', score: 45, attendance: 60, needsIntervention: true, ... }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 특징
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 기본적으로 커링됨
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          다른 값으로 재사용할 수 있는 함수를 반환하며, 함수 조합 및 부분 적용에 완벽합니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 엄격한 비교
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          엄격한 미만(&lt;)을 사용하며, 이하(≤)가 아닙니다. 포함 비교를 위해서는 lte를 사용하세요.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 상한 경계 확인
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          최대 한계, 용량 확인, 임계값 미만 값 필터링에 완벽합니다.
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
      <code class="text-sm">lt</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/equality/lt.ts"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/gte');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          gte
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          크거나 같은지 비교합니다
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
        href="/ko/equality/lte"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/lte');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          lte →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          값이 임계값보다 작거나 같은지 확인합니다.
        </p>
      </a>

      <a
        href="/ko/equality/gt"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/gt');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          gt →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          반대 비교(초과)를 위해 사용합니다.
        </p>
      </a>
    </div>
  </div>
);
