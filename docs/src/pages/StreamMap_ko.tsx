import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const StreamMap_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      map (stream)
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      매핑 함수로 이터러블의 각 값을 지연 방식으로 변환합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      stream map 이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        map
      </strong>{' '}
      은 이터러블의 각 값에 함수를 적용하여 변환된 값들로 이루어진 새로운 이터러블을 만듭니다. 이 연산은 지연 평가 방식으로 동작하며, 반복할 때 필요에 따라 값을 변환하므로 대용량 또는 무한 시퀀스에서도 메모리 효율적입니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      즉시 새 배열을 생성하는 배열의 <code class="text-pink-600 dark:text-pink-400 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">map</code> 메서드와 달리, stream map은 모든 이터러블과 함께 작동하며 필요할 때만 값을 처리합니다. 이는 중간 결과를 구체화하지 않고 데이터를 변환하려는 데이터 변환 파이프라인, 대용량 데이터셋 처리, 함수형 조합에 이상적입니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`// 동기 버전 - 동기 함수로 동기 이터러블 변환
function map<T, R>(fn: (value: T) => R, iterable: Iterable<T>): IterableIterator<R>;

// 비동기 버전 - 비동기 함수 또는 비동기 이터러블로 변환
function map<T, R>(
  fn: (value: T) => R | Promise<R>,
  iterable: AnyIterableInput<PromiseLikeValue<T>>
): AsyncIterableIterator<R>;

// 커리된 동기 버전 - 이터러블을 변환하는 함수를 반환
function map<T, R>(fn: (value: T) => R): (iterable: Iterable<T>) => IterableIterator<R>;

// 커리된 비동기 버전 - 이터러블을 변환하는 함수를 반환
function map<T, R>(
  fn: (value: T) => R | Promise<R>
): (iterable: AnyIterableInput<PromiseLikeValue<T>>) => AsyncIterableIterator<R>;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      간단한 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';

// 각 숫자를 두 배로
const doubled = map((n: number) => n * 2, [1, 2, 3, 4]);
console.log(Array.from(doubled));
// 출력: [2, 4, 6, 8]

// 객체 변환
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];

const names = map((user: typeof users[0]) => user.name, users);
console.log(Array.from(names));
// 출력: ['Alice', 'Bob']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      조합을 위한 커리 형태
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { filter } from 'fp-pack/stream';

// 재사용 가능한 변환 함수 생성
const double = map((n: number) => n * 2);
const toUpperCase = map((s: string) => s.toUpperCase());

// 함수형 파이프라인에서 사용
const processNumbers = pipe(
  filter((n: number) => n > 0),
  double,
  map((n: number) => \`결과: \${n}\`)
);

const numbers = [-1, 2, -3, 4, 5];
console.log(Array.from(processNumbers(numbers)));
// 출력: ['결과: 4', '결과: 8', '결과: 10']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3">
      1. 데이터 정규화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

interface RawUser {
  first_name: string;
  last_name: string;
  email_address: string;
}

interface User {
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
}

const rawUsers: RawUser[] = [
  { first_name: '홍길동', last_name: '김', email_address: 'hong@example.com' },
  { first_name: '영희', last_name: '이', email_address: 'younghee@example.com' }
];

// 데이터 구조 정규화
const normalizeUser = map((raw: RawUser): User => ({
  firstName: raw.first_name,
  lastName: raw.last_name,
  email: raw.email_address,
  fullName: \`\${raw.last_name}\${raw.first_name}\`
}));

const users = Array.from(normalizeUser(rawUsers));
console.log(users[0]);
// 출력: { firstName: '홍길동', lastName: '김', email: 'hong@example.com', fullName: '김홍길동' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. 비동기 데이터 가져오기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';

interface UserId {
  id: number;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

async function fetchUserProfile(userId: number): Promise<UserProfile> {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
}

const userIds = [1, 2, 3, 4, 5];

// ID를 사용자 프로필로 비동기 매핑
const userProfiles = map(
  async (id: number) => await fetchUserProfile(id),
  userIds
);

// 가져온 각 프로필 처리
for await (const profile of userProfiles) {
  console.log(\`로드됨: \${profile.name} (\${profile.email})\`);
}
// 출력:
// 로드됨: Alice (alice@example.com)
// 로드됨: Bob (bob@example.com)
// ...`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. 파일 처리 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { filter } from 'fp-pack/stream';

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}

async function* readLogFile(filename: string) {
  // 로그 파일을 한 줄씩 읽기 시뮬레이션
  const lines = [
    '2025-12-31T10:00:00Z INFO 애플리케이션 시작됨',
    '2025-12-31T10:00:01Z WARN 높은 메모리 사용량',
    '2025-12-31T10:00:02Z ERROR 데이터베이스 연결 실패',
    '2025-12-31T10:00:03Z INFO 요청 처리됨'
  ];

  for (const line of lines) {
    yield line;
  }
}

// 로그 라인을 구조화된 데이터로 파싱
const parseLine = (line: string): LogEntry => {
  const [timestamp, level, ...messageParts] = line.split(' ');
  return {
    timestamp,
    level: level as LogEntry['level'],
    message: messageParts.join(' ')
  };
};

// 로그 파일 처리
const processLogs = pipe(
  map(parseLine),
  filter((entry: LogEntry) => entry.level === 'ERROR'),
  map((entry: LogEntry) => ({
    ...entry,
    alertSent: true
  }))
);

const logEntries = processLogs(readLogFile('app.log'));

for await (const entry of logEntries) {
  console.log(\`[경고] \${entry.timestamp}: \${entry.message}\`);
}
// 출력:
// [경고] 2025-12-31T10:00:02Z: 데이터베이스 연결 실패`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      4. 가격 계산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';

interface Product {
  id: string;
  name: string;
  basePrice: number;
  taxRate: number;
}

interface PricedProduct extends Product {
  tax: number;
  finalPrice: number;
  displayPrice: string;
}

const products: Product[] = [
  { id: 'P1', name: '노트북', basePrice: 1000000, taxRate: 0.1 },
  { id: 'P2', name: '마우스', basePrice: 25000, taxRate: 0.1 },
  { id: 'P3', name: '키보드', basePrice: 75000, taxRate: 0.1 }
];

const calculatePrices = pipe(
  map((product: Product): PricedProduct => {
    const tax = product.basePrice * product.taxRate;
    const finalPrice = product.basePrice + tax;
    return {
      ...product,
      tax,
      finalPrice,
      displayPrice: \`₩\${finalPrice.toLocaleString()}\`
    };
  })
);

const pricedProducts = Array.from(calculatePrices(products));
console.log(pricedProducts[0]);
// 출력: { id: 'P1', name: '노트북', basePrice: 1000000, taxRate: 0.1, tax: 100000, finalPrice: 1100000, displayPrice: '₩1,100,000' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      5. URL 생성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';

interface ImageMetadata {
  id: string;
  filename: string;
  width: number;
  height: number;
}

interface ImageWithUrls extends ImageMetadata {
  thumbnail: string;
  original: string;
  cdn: string;
}

const images: ImageMetadata[] = [
  { id: 'img1', filename: 'photo.jpg', width: 1920, height: 1080 },
  { id: 'img2', filename: 'avatar.png', width: 512, height: 512 }
];

const CDN_BASE = 'https://cdn.example.com';
const API_BASE = 'https://api.example.com';

const addImageUrls = map((img: ImageMetadata): ImageWithUrls => ({
  ...img,
  thumbnail: \`\${API_BASE}/images/\${img.id}/thumbnail\`,
  original: \`\${API_BASE}/images/\${img.id}/original\`,
  cdn: \`\${CDN_BASE}/\${img.filename}\`
}));

const imagesWithUrls = Array.from(addImageUrls(images));
console.log(imagesWithUrls[0]);
// 출력: {
//   id: 'img1',
//   filename: 'photo.jpg',
//   width: 1920,
//   height: 1080,
//   thumbnail: 'https://api.example.com/images/img1/thumbnail',
//   original: 'https://api.example.com/images/img1/original',
//   cdn: 'https://cdn.example.com/photo.jpg'
// }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      6. 무한 시퀀스 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { map } from 'fp-pack/stream';
import { pipe } from 'fp-pack/composition';
import { take } from 'fp-pack/stream';

// 자연수의 무한 시퀀스
function* naturalNumbers() {
  let n = 1;
  while (true) {
    yield n++;
  }
}

// 무한 시퀀스 변환
const processSequence = pipe(
  map((n: number) => n * n),           // 각 숫자를 제곱
  map((n: number) => ({ square: n, isEven: n % 2 === 0 })),
  take(5)                               // 처음 5개 가져오기
);

const result = Array.from(processSequence(naturalNumbers()));
console.log(result);
// 출력:
// [
//   { square: 1, isEven: false },
//   { square: 4, isEven: true },
//   { square: 9, isEven: false },
//   { square: 16, isEven: true },
//   { square: 25, isEven: false }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      map을 사용하는 이유
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
          지연 평가
        </h3>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          중간 배열을 만들지 않고 필요에 따라 변환을 적용합니다. 무한 시퀀스 및 대용량 데이터셋과 효율적으로 작동합니다.
        </p>
      </div>

      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 rounded-lg p-5">
        <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
          조합 가능한 설계
        </h3>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          커리된 인터페이스는 pipe 및 기타 함수형 유틸리티와 완벽하게 통합되어 선언적 변환 파이프라인을 구축합니다.
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
          모든 이터러블(배열, 제너레이터, 비동기 이터러블, Set, Map)과 작동하며 동기 및 비동기 변환을 자동으로 처리합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      map 함수는 입력 이터러블의 각 값에 변환 함수를 적용하는 새로운 이터러블을 만듭니다. 다음은 간단한 구현입니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`// 간단한 동기 구현
function* map<T, R>(
  fn: (value: T) => R,
  iterable: Iterable<T>
): IterableIterator<R> {
  // 각 값에 변환 적용
  for (const value of iterable) {
    yield fn(value);
  }
}

// 비동기 버전은 프로미스를 처리
async function* mapAsync<T, R>(
  fn: (value: T) => R | Promise<R>,
  iterable: AsyncIterable<T> | Iterable<T>
): AsyncIterableIterator<R> {
  // 각 값에 변환 적용, 필요시 await
  for await (const value of iterable) {
    yield await fn(value);
  }
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      주요 특징:
    </p>

    <ul class="list-disc list-inside text-sm md:text-base text-gray-700 dark:text-gray-300 space-y-2 ml-4">
      <li><strong>지연 실행</strong>: 값이 소비될 때만 변환이 적용됩니다</li>
      <li><strong>일대일 매핑</strong>: 각 입력 값은 정확히 하나의 출력 값을 생성합니다</li>
      <li><strong>순서 보존</strong>: 출력 값은 입력 값과 동일한 순서로 나타납니다</li>
      <li><strong>변경 없음</strong>: 원본 이터러블은 변경되지 않습니다</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">map</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/stream/map.ts"
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
          navigateTo('/stream/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건 함수를 기반으로 값을 필터링합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/flatMap');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          flatMap
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          단일 작업으로 매핑하고 평탄화합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/stream/reduce');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          reduce
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          이터러블을 단일 값으로 축소합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          pipe
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          여러 변환을 파이프라인으로 조합합니다
        </p>
      </div>
    </div>
  </div>
);
