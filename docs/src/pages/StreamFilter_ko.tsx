import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamFilter_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      filter (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건 함수를 기반으로 이터러블의 값을 지연 방식으로 필터링합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream filter 란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        filter
      </strong>{' '}
      는 조건 함수를 만족하는 값을 이터러블에서 선택하여, 일치하는 값만 포함하는 새로운 이터러블을 만듭니다. 이 연산은 지연 평가 방식으로 동작하며, 반복할 때 필요에 따라 값을 테스트하고 필터링하므로 대용량 또는 무한 시퀀스에서도 메모리 효율적입니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      즉시 새 배열을 생성하는 배열의 <code class="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">filter</code> 메서드와 달리, stream filter는 모든 이터러블과 함께 작동하며 필요할 때만 값을 처리합니다. 이는 중간 결과를 구체화하지 않고 원하지 않는 데이터를 제외하려는 데이터 필터링 파이프라인, 대용량 데이터셋 처리, 함수형 조합에 이상적입니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// 동기 버전 - 동기 조건으로 동기 이터러블 필터링
function filter<T>(
  predicate: (value: T) => boolean,
  iterable: Iterable<T>
): IterableIterator<T>;

// 비동기 버전 - 비동기 조건 또는 비동기 이터러블로 필터링
function filter<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<T>;

// 커리된 동기 버전 - 이터러블을 필터링하는 함수를 반환
function filter<T>(
  predicate: (value: T) => boolean
): (iterable: Iterable<T>) => IterableIterator<T>;

// 커리된 비동기 버전 - 이터러블을 필터링하는 함수를 반환
function filter<T>(
  predicate: (value: T) => boolean | Promise<boolean>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<T>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      간단한 필터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';

// 짝수만 필터링
const evens = filter((n: number) => n % 2 === 0, [1, 2, 3, 4, 5, 6]);
console.log(Array.from(evens));
// 출력: [2, 4, 6]

// 활성 사용자만 필터링
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
];

const activeUsers = filter((user: typeof users[0]) => user.active, users);
console.log(Array.from(activeUsers));
// 출력: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      조합을 위한 커리 형태
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

// 재사용 가능한 필터 함수 생성
const isPositive = filter((n: number) => n > 0);
const isEven = filter((n: number) => n % 2 === 0);
const isLongString = filter((s: string) => s.length > 5);

// 함수형 파이프라인에서 사용
const processNumbers = pipe(
  isPositive,
  isEven,
  map((n: number) => n * 2)
);

const numbers = [-2, -1, 0, 1, 2, 3, 4, 5];
console.log(Array.from(processNumbers(numbers)));
// 출력: [4, 8] (양수 짝수: 2, 4를 두 배로)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. 데이터 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

interface FormData {
  email: string;
  age: number;
  agreed: boolean;
}

const submissions: FormData[] = [
  { email: 'valid@example.com', age: 25, agreed: true },
  { email: 'invalid', age: 15, agreed: true },
  { email: 'another@example.com', age: 30, agreed: false },
  { email: 'good@example.com', age: 22, agreed: true }
];

const isValidEmail = (email: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
const isAdult = (age: number) => age >= 18;

// 유효한 제출만 필터링
const validSubmissions = pipe(
  filter((data: FormData) => isValidEmail(data.email)),
  filter((data: FormData) => isAdult(data.age)),
  filter((data: FormData) => data.agreed)
);

const valid = Array.from(validSubmissions(submissions));
console.log(valid);
// 출력: [
//   { email: 'valid@example.com', age: 25, agreed: true },
//   { email: 'good@example.com', age: 22, agreed: true }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. 검색 및 쿼리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 'P1', name: '노트북', category: '전자제품', price: 1200000, inStock: true },
  { id: 'P2', name: '마우스', category: '전자제품', price: 25000, inStock: true },
  { id: 'P3', name: '책상', category: '가구', price: 350000, inStock: false },
  { id: 'P4', name: '의자', category: '가구', price: 180000, inStock: true }
];

// 검색 쿼리: 재고 있는 50만원 이하 전자제품
const searchProducts = (
  category: string,
  maxPrice: number,
  inStockOnly: boolean
) => pipe(
  filter((p: Product) => p.category === category),
  filter((p: Product) => p.price <= maxPrice),
  filter((p: Product) => !inStockOnly || p.inStock)
);

const results = Array.from(
  searchProducts('전자제품', 500000, true)(products)
);

console.log(results);
// 출력: [{ id: 'P2', name: '마우스', category: '전자제품', price: 25000, inStock: true }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. 로그 분석
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

interface LogEntry {
  timestamp: Date;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';
  service: string;
  message: string;
}

async function* readLogs(): AsyncIterableIterator<LogEntry> {
  // 로그 스트리밍 시뮬레이션
  const logs: LogEntry[] = [
    { timestamp: new Date(), level: 'INFO', service: 'api', message: '서버 시작됨' },
    { timestamp: new Date(), level: 'ERROR', service: 'database', message: '연결 실패' },
    { timestamp: new Date(), level: 'WARN', service: 'api', message: '높은 지연시간' },
    { timestamp: new Date(), level: 'ERROR', service: 'api', message: '요청 타임아웃' }
  ];

  for (const log of logs) {
    yield log;
  }
}

// 특정 서비스의 중요 오류만 필터링
const criticalApiErrors = pipe(
  filter((log: LogEntry) => log.service === 'api'),
  filter((log: LogEntry) => log.level === 'ERROR'),
  map((log: LogEntry) => ({
    ...log,
    alert: true
  }))
);

for await (const error of criticalApiErrors(readLogs())) {
  console.log(\`[경고] \${error.service}: \${error.message}\`);
}
// 출력:
// [경고] api: 요청 타임아웃`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. 접근 제어
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'user' | 'guest';
  permissions: string[];
  verified: boolean;
}

interface Resource {
  id: string;
  requiredPermission: string;
  requiresVerification: boolean;
}

const users: User[] = [
  { id: 'U1', name: 'Alice', role: 'admin', permissions: ['read', 'write', 'delete'], verified: true },
  { id: 'U2', name: 'Bob', role: 'user', permissions: ['read', 'write'], verified: true },
  { id: 'U3', name: 'Charlie', role: 'user', permissions: ['read'], verified: false }
];

const canAccessResource = (resource: Resource) =>
  filter((user: User) => {
    const hasPermission = user.permissions.includes(resource.requiredPermission);
    const meetsVerification = !resource.requiresVerification || user.verified;
    return hasPermission && meetsVerification;
  });

const sensitiveResource: Resource = {
  id: 'R1',
  requiredPermission: 'write',
  requiresVerification: true
};

const authorizedUsers = Array.from(canAccessResource(sensitiveResource)(users));
console.log(authorizedUsers.map(u => u.name));
// 출력: ['Alice', 'Bob']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. 데이터 정리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { map } from 'fp-pack/stream';

interface RawData {
  id: string | null;
  value: number | null;
  metadata?: string;
}

const rawDataset: RawData[] = [
  { id: 'D1', value: 100, metadata: 'valid' },
  { id: null, value: 200, metadata: 'invalid id' },
  { id: 'D3', value: null, metadata: 'invalid value' },
  { id: 'D4', value: 150 }, // 메타데이터 누락
  { id: 'D5', value: 175, metadata: 'valid' }
];

// null/undefined 값 제거
const cleanData = pipe(
  filter((d: RawData) => d.id !== null && d.id !== undefined),
  filter((d: RawData) => d.value !== null && d.value !== undefined),
  filter((d: RawData) => d.metadata !== undefined),
  map((d: RawData) => ({
    id: d.id as string,
    value: d.value as number,
    metadata: d.metadata as string
  }))
);

const cleaned = Array.from(cleanData(rawDataset));
console.log(cleaned);
// 출력: [
//   { id: 'D1', value: 100, metadata: 'valid' },
//   { id: 'D5', value: 175, metadata: 'valid' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. 무한 스트림 필터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { filter } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { take, map } from 'fp-pack/stream';

// 자연수의 무한 시퀀스
function* naturalNumbers() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

// 에라토스테네스의 체 (간소화)
const isPrime = (n: number): boolean => {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

// 무한 시퀀스에서 소수 필터링
const first10Primes = pipe(
  filter(isPrime),
  take(10),
  map((n: number) => ({ value: n, isPrime: true }))
);

const primes = Array.from(first10Primes(naturalNumbers()));
console.log(primes.map(p => p.value));
// 출력: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      filter를 사용하는 이유
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          지연 평가
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          중간 배열을 만들지 않고 필요에 따라 값을 테스트하고 필터링합니다. 무한 시퀀스 및 대용량 데이터셋과 효율적으로 작동합니다.
        </p>
      </div>

      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
          조합 가능한 설계
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          커리된 인터페이스는 pipe 및 기타 함수형 유틸리티와 완벽하게 통합되어 선언적 필터링 파이프라인을 구축합니다.
        </p>
      </div>

      <div class="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
          메모리 효율성
        </h3>
        <p class="text-sm text-green-800 dark:text-green-200">
          배열 복사나 구체화가 필요 없습니다. 한 번에 하나의 값을 처리하므로 대용량 파일 스트리밍이나 실시간 데이터에 적합합니다.
        </p>
      </div>

      <div class="border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-2">
          범용 호환성
        </h3>
        <p class="text-sm text-orange-800 dark:text-orange-200">
          모든 이터러블(배열, 제너레이터, 비동기 이터러블, Set, Map)과 작동하며 동기 및 비동기 조건을 자동으로 처리합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      filter 함수는 조건 함수를 만족하는 값만 입력 이터러블에서 방출하는 새로운 이터러블을 만듭니다. 다음은 간단한 구현입니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`// 간단한 동기 구현
function* filter<T>(
  predicate: (value: T) => boolean,
  iterable: Iterable<T>
): IterableIterator<T> {
  // 각 값을 테스트하고 통과하는 경우만 방출
  for (const value of iterable) {
    if (predicate(value)) {
      yield value;
    }
  }
}

// 비동기 버전은 프로미스를 처리
async function* filterAsync<T>(
  predicate: (value: T) => boolean | Promise<boolean>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncIterableIterator<T> {
  // 각 값을 테스트, 필요시 await
  for await (const value of iterable) {
    if (await predicate(value)) {
      yield value;
    }
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      주요 특징:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
      <li><strong>지연 실행</strong>: 값이 소비될 때만 조건이 평가됩니다</li>
      <li><strong>선택적 방출</strong>: 조건을 통과한 값만 방출됩니다</li>
      <li><strong>순서 보존</strong>: 일치하는 값은 입력과 동일한 순서로 나타납니다</li>
      <li><strong>변경 없음</strong>: 원본 이터러블은 변경되지 않습니다</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">filter</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/filter.ts"
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
          navigateTo('/stream/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          매핑 함수로 각 값을 변환합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/find');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          find
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건과 일치하는 첫 번째 값을 찾습니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/reject');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          reject
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건과 일치하는 값을 제거합니다 (filter의 반대)
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/partition');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          partition
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건을 기반으로 값을 두 그룹으로 분할합니다
        </p>
      </div>
    </div>
  </div>
);
