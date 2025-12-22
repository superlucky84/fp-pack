import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const UniqBy_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      uniqBy
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      커스텀 키 함수를 기준으로 배열에서 중복을 제거합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      uniqBy란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        uniqBy
      </strong>{' '}
      는 고유성을 판단하는 커스텀 키 함수를 기준으로 배열에서 중복된 값을 제거합니다.
      <br />
      <br />
      직접적인 값 비교를 사용하는 <code>uniq</code>와 달리, <code>uniqBy</code>는
      고유성을 어떻게 판단할지 정확하게 지정할 수 있습니다. 각 요소에서 키를 추출하거나
      계산하는 함수를 제공하면, 동일한 키를 가진 요소들이 중복으로 간주됩니다.
      <br />
      <br />
      이는 특정 속성을 기준으로 객체 배열에서 중복을 제거하거나, 대소문자 구분 없는
      문자열 비교와 같은 커스텀 고유성 로직을 구현할 때 특히 유용합니다.
      <br />
      <br />
      uniqBy는 원본 배열을 수정하지 않고 새로운 배열을 생성하므로 함수형 프로그래밍에 안전합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (중복)' },
];

// ID로 중복 제거
uniqBy(user => user.id, users);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      객체 속성으로 중복 제거
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  category: string;
}

const products: Product[] = [
  { id: 1, name: '노트북', category: '전자기기' },
  { id: 2, name: '마우스', category: '전자기기' },
  { id: 3, name: '책상', category: '가구' },
  { id: 4, name: '의자', category: '가구' },
];

// 고유 카테고리 가져오기 (카테고리당 첫 번째 상품)
uniqBy(product => product.category, products);
// [
//   { id: 1, name: '노트북', category: '전자기기' },
//   { id: 3, name: '책상', category: '가구' }
// ]

// ID로 중복 제거
const duplicateProducts = [
  { id: 1, name: '노트북', category: '전자기기' },
  { id: 1, name: '노트북 (중복)', category: '전자기기' },
  { id: 2, name: '마우스', category: '전자기기' },
];

uniqBy(product => product.id, duplicateProducts);
// [
//   { id: 1, name: '노트북', category: '전자기기' },
//   { id: 2, name: '마우스', category: '전자기기' }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      대소문자 구분 없는 문자열
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

const names = ['Alice', 'BOB', 'alice', 'Charlie', 'bob'];

// 대소문자 구분 없이 중복 제거
uniqBy(name => name.toLowerCase(), names);
// ['Alice', 'BOB', 'Charlie']

const emails = [
  'user@example.com',
  'USER@EXAMPLE.COM',
  'admin@example.com',
];

uniqBy(email => email.toLowerCase(), emails);
// ['user@example.com', 'admin@example.com']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      계산된 키
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

const words = ['hello', 'world', 'hi', 'earth'];

// 첫 글자로 고유성 판단
uniqBy(word => word[0], words);
// ['hello', 'world', 'earth']

// 길이로 고유성 판단
uniqBy(word => word.length, words);
// ['hello', 'hi']

const numbers = [1, -1, 2, -2, 3, -3];

// 절대값으로 고유성 판단
uniqBy(n => Math.abs(n), numbers);
// [1, 2, 3]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      여러 속성 결합
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface Point {
  x: number;
  y: number;
  label: string;
}

const points: Point[] = [
  { x: 1, y: 2, label: 'A' },
  { x: 3, y: 4, label: 'B' },
  { x: 1, y: 2, label: 'C' }, // A와 동일한 좌표
];

// 좌표로 고유성 판단 (x와 y 결합)
uniqBy(point => \`\${point.x},\${point.y}\`, points);
// [
//   { x: 1, y: 2, label: 'A' },
//   { x: 3, y: 4, label: 'B' }
// ]

// 또는 복잡한 객체의 경우 JSON.stringify 사용
uniqBy(point => JSON.stringify({ x: point.x, y: point.y }), points);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      API 응답 중복 제거
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface ApiUser {
  userId: string;
  name: string;
  email: string;
  lastUpdated: Date;
}

// 여러 API 호출이 중복된 사용자를 반환할 수 있음
const response1: ApiUser[] = [
  { userId: 'u1', name: 'Alice', email: 'alice@example.com', lastUpdated: new Date('2024-01-01') },
  { userId: 'u2', name: 'Bob', email: 'bob@example.com', lastUpdated: new Date('2024-01-02') },
];

const response2: ApiUser[] = [
  { userId: 'u1', name: 'Alice', email: 'alice@example.com', lastUpdated: new Date('2024-01-03') },
  { userId: 'u3', name: 'Charlie', email: 'charlie@example.com', lastUpdated: new Date('2024-01-04') },
];

const allUsers = [...response1, ...response2];

// userId로 중복 제거 (첫 번째 발생 유지)
const uniqueUsers = uniqBy(user => user.userId, allUsers);
// [
//   { userId: 'u1', name: 'Alice', ... lastUpdated: 2024-01-01 },
//   { userId: 'u2', name: 'Bob', ... },
//   { userId: 'u3', name: 'Charlie', ... }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      장바구니 아이템
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface CartItem {
  productId: string;
  name: string;
  quantity: number;
  addedAt: Date;
}

const cartItems: CartItem[] = [
  { productId: 'p1', name: '노트북', quantity: 1, addedAt: new Date('2024-01-01') },
  { productId: 'p2', name: '마우스', quantity: 2, addedAt: new Date('2024-01-02') },
  { productId: 'p1', name: '노트북', quantity: 1, addedAt: new Date('2024-01-03') }, // 중복
];

// 중복 상품 제거 (사용자가 실수로 같은 아이템을 두 번 추가함)
const uniqueItems = uniqBy(item => item.productId, cartItems);

console.log(\`장바구니에 \${uniqueItems.length}개의 고유 상품이 있습니다\`);

// 실제 장바구니 병합을 위해서는 수량을 합산해야 할 수 있음
// 이 예제는 단순히 첫 번째 발생을 유지하며 중복을 제거함`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      검색 결과 중복 제거
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface SearchResult {
  url: string;
  title: string;
  source: string;
  score: number;
}

// 여러 검색 엔진이 결과를 반환
const googleResults: SearchResult[] = [
  { url: 'example.com/page1', title: '페이지 1', source: 'google', score: 0.95 },
  { url: 'example.com/page2', title: '페이지 2', source: 'google', score: 0.90 },
];

const bingResults: SearchResult[] = [
  { url: 'example.com/page1', title: '페이지 일', source: 'bing', score: 0.88 },
  { url: 'example.com/page3', title: '페이지 3', source: 'bing', score: 0.85 },
];

const allResults = [...googleResults, ...bingResults];

// URL로 중복 제거 (첫 번째/최고 점수 소스 유지)
const uniqueResults = uniqBy(result => result.url, allResults);
// [
//   { url: 'example.com/page1', title: '페이지 1', source: 'google', score: 0.95 },
//   { url: 'example.com/page2', ... },
//   { url: 'example.com/page3', ... }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      이벤트 중복 제거
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

interface Event {
  eventId: string;
  type: string;
  timestamp: Date;
  data: any;
}

// 이벤트 스트림이 재시도로 인해 중복을 포함할 수 있음
const eventStream: Event[] = [
  { eventId: 'e1', type: 'click', timestamp: new Date('2024-01-01T10:00:00'), data: {} },
  { eventId: 'e2', type: 'view', timestamp: new Date('2024-01-01T10:01:00'), data: {} },
  { eventId: 'e1', type: 'click', timestamp: new Date('2024-01-01T10:00:05'), data: {} }, // 중복
  { eventId: 'e3', type: 'submit', timestamp: new Date('2024-01-01T10:02:00'), data: {} },
];

// eventId로 중복 이벤트 제거
const uniqueEvents = uniqBy(event => event.eventId, eventStream);
// [
//   { eventId: 'e1', type: 'click', ... },
//   { eventId: 'e2', type: 'view', ... },
//   { eventId: 'e3', type: 'submit', ... }
// ]

console.log(\`\${uniqueEvents.length}개의 고유 이벤트 처리됨\`);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      태그 정규화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy } from 'fp-kit';

// 사용자가 제출한 태그는 대소문자가 일관되지 않을 수 있음
const tags = [
  'JavaScript',
  'javascript',
  'TypeScript',
  'JAVASCRIPT',
  'typescript',
  'React',
  'react',
];

// 소문자로 정규화하고 중복 제거
const uniqueTags = uniqBy(tag => tag.toLowerCase(), tags);
// ['JavaScript', 'TypeScript', 'React']
// 주의: 원래 대소문자를 유지한 첫 번째 발생을 유지함

// 실제 소문자 출력을 위해서는 map과 결합
import { pipe, map } from 'fp-kit';

const normalizedTags = pipe(
  uniqBy((tag: string) => tag.toLowerCase()),
  map((tag: string) => tag.toLowerCase())
);

normalizedTags(tags);
// ['javascript', 'typescript', 'react']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      커링과 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniqBy, curry } from 'fp-kit';

// 커링 버전 생성
const uniqByCurried = curry(uniqBy);

// 재사용 가능한 중복 제거 함수 생성
const uniqById = uniqByCurried((item: { id: number }) => item.id);
const uniqByName = uniqByCurried((item: { name: string }) => item.name);
const uniqByEmail = uniqByCurried((user: { email: string }) => user.email.toLowerCase());

const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 1, name: 'Alice (중복)', email: 'alice2@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
];

uniqById(users);     // ID로 중복 제거
uniqByName(users);   // 이름으로 중복 제거
uniqByEmail(users);  // 이메일로 중복 제거

// pipe에서 사용
import { pipe, filter } from 'fp-kit';

const processUsers = pipe(
  filter((user: { id: number; name: string; email: string }) => user.email.includes('@')),
  uniqByEmail
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      uniq vs. uniqBy
    </h2>

    <div class="grid gap-6 mt-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          uniq를 사용하는 경우:
        </h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 list-disc list-inside space-y-2">
          <li>원시 값(숫자, 문자열, 불리언)을 다룰 때</li>
          <li>직접적인 값 비교로 충분할 때</li>
          <li>객체를 참조로 비교해야 할 때</li>
          <li>가장 간단한 솔루션을 원할 때</li>
        </ul>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          uniqBy를 사용하는 경우:
        </h4>
        <ul class="text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-2">
          <li>특정 속성이나 계산된 값으로 객체를 비교할 때</li>
          <li>커스텀 고유성 로직이 필요할 때 (대소문자 구분 없는 등)</li>
          <li>참조 비교 대신 값 기반 비교를 원할 때</li>
          <li>복잡한 데이터 구조를 중복 제거할 때</li>
        </ul>
      </div>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { uniq, uniqBy } from 'fp-kit';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (중복)' },
];

// uniq - 참조로 비교 (모두 고유함)
uniq(users).length;
// 3 (모든 객체가 다른 참조임)

// uniqBy - ID로 비교 (중복 제거)
uniqBy(user => user.id, users).length;
// 2 (같은 ID = 중복)

// 원시 값의 경우 동일하게 작동
const numbers = [1, 2, 2, 3, 1];
uniq(numbers);              // [1, 2, 3]
uniqBy(n => n, numbers);    // [1, 2, 3]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 특징
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 커스텀 키 함수
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          고유성을 판단하는 방법에 대한 완전한 제어를 제공합니다. 속성을 추출하거나,
          값을 계산하거나, 비교 키를 만들기 위해 변환을 적용할 수 있습니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 순서 유지
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          첫 번째 발생 순서를 유지합니다. 중복이 발견되면
          해당 키를 가진 첫 번째 요소가 유지됩니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 성능
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Set을 사용하여 O(n) 시간 복잡도를 가집니다. 키 함수는 요소당 한 번 호출됩니다.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 불변성
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          원본을 수정하지 않고 새로운 배열을 생성하므로
          함수형 프로그래밍 패턴에 안전합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/ko/array/uniq"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/uniq');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          uniq →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          간단한 값 기반 중복 제거를 위한 uniq에 대해 알아보세요.
        </p>
      </a>

      <a
        href="/ko/array/groupBy"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/groupBy');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          groupBy →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          단순히 중복을 제거하는 대신 키로 요소를 그룹화하는 방법을 알아보세요.
        </p>
      </a>
    </div>
  </div>
);
