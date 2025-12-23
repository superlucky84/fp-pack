import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Gt_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      gt
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값이 임계값보다 큰지 확인하는 커링된 함수를 생성합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      gt란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        gt
      </strong>{' '}
      (greater than)는 값이 임계값보다 엄격하게 큰지 확인하는 커링된 비교 함수를 생성합니다.
      <br />
      <br />
      임계값이 주어지면, 다른 값이 해당 임계값을 초과하는지 테스트하는 술어 함수를 반환합니다.
      이는 재사용 가능한 비교 술어가 필요한 필터링, 검증, 함수 조합에 특히 유용합니다.
      <br />
      <br />
      커링된 설계는 <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">filter</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">some</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">every</code>와 같은 배열 메서드 및 파이프라인에서 사용하기에 완벽합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-kit';

const isGreaterThan5 = gt(5);

isGreaterThan5(10);  // true (10 > 5)
isGreaterThan5(5);   // false (5는 > 5가 아님)
isGreaterThan5(3);   // false (3 < 5)`}
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
      code={`import { gt } from 'fp-kit';

// 비교 함수 생성
const isGreaterThan10 = gt(10);
const isGreaterThan0 = gt(0);
const isPositive = gt(0);

isGreaterThan10(15);  // true
isGreaterThan10(10);  // false (같음, 더 크지 않음)
isGreaterThan10(5);   // false

isPositive(5);        // true
isPositive(0);        // false
isPositive(-3);       // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 메서드와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-kit';

const numbers = [1, 5, 10, 15, 20, 25];

// 10보다 큰 값 필터링
numbers.filter(gt(10));
// [15, 20, 25]

// 20보다 큰 값이 있는지 확인
numbers.some(gt(20));
// true

// 모든 값이 0보다 큰지 확인
numbers.every(gt(0));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      음수
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-kit';

const isGreaterThanNegative5 = gt(-5);

isGreaterThanNegative5(-3);   // true (-3 > -5)
isGreaterThanNegative5(-5);   // false (같음)
isGreaterThanNegative5(-10);  // false (-10 < -5)

// 영하 온도 필터링
const temperatures = [-10, -5, 0, 5, 10, 15];
temperatures.filter(gt(0));
// [5, 10, 15]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      가격 필터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-kit';

interface Product {
  name: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { name: 'Laptop', price: 999, stock: 5 },
  { name: 'Mouse', price: 29, stock: 50 },
  { name: 'Keyboard', price: 79, stock: 20 },
  { name: 'Monitor', price: 299, stock: 10 },
  { name: 'Webcam', price: 89, stock: 0 }
];

// 프리미엄 제품 찾기 (가격 > 100)
const premiumProducts = products.filter(p => gt(100)(p.price));
// [
//   { name: 'Laptop', price: 999, stock: 5 },
//   { name: 'Monitor', price: 299, stock: 10 }
// ]

// 재고가 충분한 제품 필터링 (재고 > 10)
const wellStocked = products.filter(p => gt(10)(p.stock));
// [
//   { name: 'Mouse', price: 29, stock: 50 },
//   { name: 'Keyboard', price: 79, stock: 20 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      사용자 나이 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-kit';

interface User {
  name: string;
  age: number;
  verified: boolean;
}

const users: User[] = [
  { name: 'Alice', age: 25, verified: true },
  { name: 'Bob', age: 17, verified: false },
  { name: 'Charlie', age: 30, verified: true },
  { name: 'Diana', age: 16, verified: false }
];

// 성인만 (나이 > 18)
const isAdult = gt(18);
const adults = users.filter(u => isAdult(u.age));
// [
//   { name: 'Alice', age: 25, verified: true },
//   { name: 'Charlie', age: 30, verified: true }
// ]

// 노인 사용자 (나이 > 65)
const isSenior = gt(65);
const hasAnySeniors = users.some(u => isSenior(u.age));
// false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      성능 지표
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-kit';

interface Metric {
  timestamp: number;
  responseTime: number;
  statusCode: number;
}

const metrics: Metric[] = [
  { timestamp: 1000, responseTime: 150, statusCode: 200 },
  { timestamp: 2000, responseTime: 800, statusCode: 200 },
  { timestamp: 3000, responseTime: 200, statusCode: 500 },
  { timestamp: 4000, responseTime: 1500, statusCode: 200 }
];

// 느린 요청 찾기 (응답 시간 > 500ms)
const isSlow = gt(500);
const slowRequests = metrics.filter(m => isSlow(m.responseTime));
// [
//   { timestamp: 2000, responseTime: 800, statusCode: 200 },
//   { timestamp: 4000, responseTime: 1500, statusCode: 200 }
// ]

// 1초보다 오래 걸린 요청이 있는지 확인
const hasSlowRequest = metrics.some(m => gt(1000)(m.responseTime));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      점수 필터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-kit';

interface Student {
  name: string;
  score: number;
  attendance: number;
}

const students: Student[] = [
  { name: 'Alice', score: 95, attendance: 100 },
  { name: 'Bob', score: 78, attendance: 85 },
  { name: 'Charlie', score: 88, attendance: 90 },
  { name: 'Diana', score: 65, attendance: 70 }
];

// 우수 학생 (점수 > 85)
const isHighAchiever = gt(85);
const topStudents = students.filter(s => isHighAchiever(s.score));
// [
//   { name: 'Alice', score: 95, attendance: 100 },
//   { name: 'Charlie', score: 88, attendance: 90 }
// ]

// 출석률 우수 (출석 > 80)
const hasGoodAttendance = gt(80);
const regularAttendees = students.filter(s => hasGoodAttendance(s.attendance));
// [
//   { name: 'Alice', score: 95, attendance: 100 },
//   { name: 'Bob', score: 78, attendance: 85 },
//   { name: 'Charlie', score: 88, attendance: 90 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, gt } from 'fp-kit';

interface Transaction {
  amount: number;
  category: string;
}

const transactions: Transaction[] = [
  { amount: 50, category: 'food' },
  { amount: 200, category: 'electronics' },
  { amount: 30, category: 'food' },
  { amount: 500, category: 'electronics' }
];

// 큰 거래 처리 (금액 > 100)
const processLargeTransactions = pipe(
  (txs: Transaction[]) => txs.filter(tx => gt(100)(tx.amount)),
  (txs: Transaction[]) => txs.map(tx => ({
    ...tx,
    flagged: true
  }))
);

processLargeTransactions(transactions);
// [
//   { amount: 200, category: 'electronics', flagged: true },
//   { amount: 500, category: 'electronics', flagged: true }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      동적 임계값
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { gt } from 'fp-kit';

interface Config {
  minTemperature: number;
  maxLoad: number;
  alertThreshold: number;
}

interface Sensor {
  temperature: number;
  load: number;
  alertLevel: number;
}

function checkSensorAlerts(sensor: Sensor, config: Config): boolean {
  const isTooHot = gt(config.minTemperature)(sensor.temperature);
  const isOverloaded = gt(config.maxLoad)(sensor.load);
  const isAlertCritical = gt(config.alertThreshold)(sensor.alertLevel);

  return isTooHot || isOverloaded || isAlertCritical;
}

const sensor = {
  temperature: 85,
  load: 90,
  alertLevel: 7
};

const config = {
  minTemperature: 80,
  maxLoad: 95,
  alertThreshold: 5
};

checkSensorAlerts(sensor, config);  // true (온도와 경고 수준 초과)`}
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
          엄격한 초과(&gt;)를 사용하며, 이상(≥)이 아닙니다. 포함 비교를 위해서는 gte를 사용하세요.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 배열 친화적
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          추가 래핑 없이 filter, some, every와 같은 배열 메서드와 완벽하게 작동합니다.
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

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/ko/equality/gte"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/gte');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          gte →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          값이 임계값보다 크거나 같은지 확인합니다.
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
          임계값 기반 필터링을 위해 gt를 filter와 함께 사용하세요.
        </p>
      </a>
    </div>
  </div>
);
