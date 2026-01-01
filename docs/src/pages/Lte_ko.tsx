import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Lte_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      lte
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값이 임계값보다 작거나 같은지 확인하는 커링된 함수를 생성합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      lte란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        lte
      </strong>{' '}
      (less than or equal)는 값이 임계값보다 작거나 같은지 확인하는 커링된 비교 함수를 생성합니다.
      <br />
      <br />
      임계값이 주어지면, 다른 값이 해당 임계값 이하인지 테스트하는 술어 함수를 반환합니다.
      이는 상한 비교에 경계 값을 포함해야 할 때 유용한 lt의 포함 버전입니다.
      <br />
      <br />
      커링된 설계는 <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">filter</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">some</code>,{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">every</code>와 같은 배열 메서드 및 파이프라인과 검증 로직에서 사용하기에 완벽합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { lte } from 'fp-pack';

const isAtMost10 = lte(10);

isAtMost10(5);   // true (5 <= 10)
isAtMost10(10);  // true (10 <= 10, 같은 것도 포함!)
isAtMost10(15);  // false (15 > 10)`}
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
      code={`import { lte } from 'fp-pack';

// 비교 함수 생성
const isAtMost100 = lte(100);
const isNonPositive = lte(0);
const isAtMost50 = lte(50);

isAtMost100(50);   // true
isAtMost100(100);  // true (같은 것도 포함!)
isAtMost100(150);  // false

isNonPositive(-5); // true
isNonPositive(0);  // true (0 <= 0)
isNonPositive(5);  // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 메서드와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lte } from 'fp-pack';

const scores = [45, 60, 75, 80, 90, 100];

// 허용 가능한 점수 필터링 (<= 80)
scores.filter(lte(80));
// [45, 60, 75, 80]

// 최소 수준 점수가 있는지 확인 (<= 50)
scores.some(lte(50));
// true

// 모든 점수가 제한 내에 있는지 확인 (<= 100)
scores.every(lte(100));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      경계값
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lte } from 'fp-pack';

// lt와 lte의 차이
const isAtMost10 = lte(10);
const numbers = [8, 9, 10, 11, 12];

numbers.filter(isAtMost10);
// [8, 9, 10] - 10 포함!

// lt를 사용하면 10은 제외됨
// [8, 9]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      최대 수용 인원
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lte } from 'fp-pack';

interface Room {
  name: string;
  capacity: number;
  currentOccupants: number;
}

const rooms: Room[] = [
  { name: 'Conference A', capacity: 20, currentOccupants: 18 },
  { name: 'Conference B', capacity: 50, currentOccupants: 50 },
  { name: 'Conference C', capacity: 10, currentOccupants: 12 },
  { name: 'Office D', capacity: 5, currentOccupants: 3 }
];

// 수용 인원 이하의 방 (<= capacity)
const withinCapacity = rooms.filter(r =>
  lte(r.capacity)(r.currentOccupants)
);
// [
//   { name: 'Conference A', capacity: 20, currentOccupants: 18 },
//   { name: 'Conference B', capacity: 50, currentOccupants: 50 },  // 정확히 수용 인원!
//   { name: 'Office D', capacity: 5, currentOccupants: 3 }
// ]

// 소형 회의실 (<= 10 수용)
const isSmallRoom = lte(10);
const smallRooms = rooms.filter(r => isSmallRoom(r.capacity));
// [
//   { name: 'Conference C', capacity: 10, currentOccupants: 12 },
//   { name: 'Office D', capacity: 5, currentOccupants: 3 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파일 크기 제한
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lte } from 'fp-pack';

interface File {
  name: string;
  sizeInMB: number;
  type: string;
}

const files: File[] = [
  { name: 'document.pdf', sizeInMB: 2, type: 'pdf' },
  { name: 'video.mp4', sizeInMB: 50, type: 'video' },
  { name: 'image.jpg', sizeInMB: 5, type: 'image' },
  { name: 'archive.zip', sizeInMB: 100, type: 'archive' }
];

// 최대 이메일 첨부 크기 (<= 10MB)
const canEmailAttach = lte(10);
const emailableFiles = files.filter(f => canEmailAttach(f.sizeInMB));
// [
//   { name: 'document.pdf', sizeInMB: 2, type: 'pdf' },
//   { name: 'image.jpg', sizeInMB: 5, type: 'image' }
// ]

// 무료 등급 업로드 제한 (<= 50MB)
const withinFreeTier = lte(50);
const freeUploadable = files.filter(f => withinFreeTier(f.sizeInMB));
// [
//   { name: 'document.pdf', sizeInMB: 2, type: 'pdf' },
//   { name: 'video.mp4', sizeInMB: 50, type: 'video' },  // 정확히 제한!
//   { name: 'image.jpg', sizeInMB: 5, type: 'image' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      가격 범위
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lte } from 'fp-pack';

interface Product {
  name: string;
  price: number;
  category: string;
}

const products: Product[] = [
  { name: 'Budget Laptop', price: 500, category: 'electronics' },
  { name: 'Mid-range Phone', price: 700, category: 'electronics' },
  { name: 'Premium Headphones', price: 300, category: 'audio' },
  { name: 'Gaming Console', price: 500, category: 'gaming' }
];

// 최대 예산 제약 (<= 500)
const withinBudget = lte(500);
const affordableProducts = products.filter(p => withinBudget(p.price));
// [
//   { name: 'Budget Laptop', price: 500, category: 'electronics' },  // 정확히 제한!
//   { name: 'Premium Headphones', price: 300, category: 'audio' },
//   { name: 'Gaming Console', price: 500, category: 'gaming' }
// ]

// 입문 제품 (<= 350)
const isEntryLevel = lte(350);
const basicProducts = products.filter(p => isEntryLevel(p.price));
// [{ name: 'Premium Headphones', price: 300, category: 'audio' }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      속도 제한
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lte } from 'fp-pack';

interface ApiRequest {
  userId: string;
  endpoint: string;
  timestamp: number;
  requestsInWindow: number;
}

const requests: ApiRequest[] = [
  { userId: 'user1', endpoint: '/api/data', timestamp: Date.now(), requestsInWindow: 95 },
  { userId: 'user2', endpoint: '/api/upload', timestamp: Date.now(), requestsInWindow: 100 },
  { userId: 'user3', endpoint: '/api/query', timestamp: Date.now(), requestsInWindow: 50 },
  { userId: 'user4', endpoint: '/api/data', timestamp: Date.now(), requestsInWindow: 105 }
];

// 속도 제한 내 (<= 100 요청)
const isWithinRateLimit = lte(100);
const allowedRequests = requests.filter(r => isWithinRateLimit(r.requestsInWindow));
// [
//   { userId: 'user1', endpoint: '/api/data', timestamp: ..., requestsInWindow: 95 },
//   { userId: 'user2', endpoint: '/api/upload', timestamp: ..., requestsInWindow: 100 },  // 제한에!
//   { userId: 'user3', endpoint: '/api/query', timestamp: ..., requestsInWindow: 50 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      마감일 필터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { lte } from 'fp-pack';

interface Task {
  title: string;
  priority: number;
  daysUntilDue: number;
}

const tasks: Task[] = [
  { title: 'Fix critical bug', priority: 1, daysUntilDue: 1 },
  { title: 'Write documentation', priority: 3, daysUntilDue: 7 },
  { title: 'Code review', priority: 2, daysUntilDue: 3 },
  { title: 'Update dependencies', priority: 2, daysUntilDue: 14 }
];

// 일주일 이내 마감 (<= 7일)
const isDueThisWeek = lte(7);
const upcomingTasks = tasks.filter(t => isDueThisWeek(t.daysUntilDue));
// [
//   { title: 'Fix critical bug', priority: 1, daysUntilDue: 1 },
//   { title: 'Write documentation', priority: 3, daysUntilDue: 7 },  // 정확히 7일!
//   { title: 'Code review', priority: 2, daysUntilDue: 3 }
// ]

// 긴급 작업 (<= 2일)
const isUrgent = lte(2);
const urgentTasks = tasks.filter(t => isUrgent(t.daysUntilDue));
// [{ title: 'Fix critical bug', priority: 1, daysUntilDue: 1 }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, lte } from 'fp-pack';

interface Employee {
  name: string;
  experience: number;
  salary: number;
}

const employees: Employee[] = [
  { name: 'Alice', experience: 2, salary: 60000 },
  { name: 'Bob', experience: 8, salary: 95000 },
  { name: 'Charlie', experience: 5, salary: 75000 },
  { name: 'Diana', experience: 1, salary: 50000 }
];

// 신입 직원 처리 (경력 <= 3년) 교육 프로그램용
const processJuniorEmployees = pipe(
  (employees: Employee[]) => employees.filter(e => lte(3)(e.experience)),
  (employees: Employee[]) => employees.map(e => ({
    ...e,
    trainingRequired: true,
    mentorAssigned: true
  }))
);

processJuniorEmployees(employees);
// [
//   { name: 'Alice', experience: 2, salary: 60000, trainingRequired: true, ... },
//   { name: 'Diana', experience: 1, salary: 50000, trainingRequired: true, ... }
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
          이하(≤)를 사용하여 경계 값을 포함합니다. lt와 달리, 임계값과 같은 값도 테스트를 통과합니다.
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
          3. 최대 제약
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          최대 한계, 수용 제약, 한계 자체가 허용되는 상한 조건을 표현하기에 완벽합니다.
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
      <code class="text-sm">lte</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/equality/lte.ts"
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
        href="/ko/equality/lt"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/lt');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          lt →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          배타적 비교(엄격하게 미만)를 위해 사용합니다.
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
          최대 임계값 필터링을 위해 lte를 filter와 함께 사용하세요.
        </p>
      </a>
    </div>
  </div>
);
