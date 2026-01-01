import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Uniq_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      uniq
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      배열에서 중복된 값을 제거합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      uniq란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        uniq
      </strong>{' '}
      는 배열에서 중복된 값을 제거하여 고유한 요소만 포함된 새로운 배열을 반환합니다.
      <br />
      <br />
      이 함수는 첫 번째 발생 순서를 유지합니다. 각 고유 값은 원본 배열에서 처음 나타난 위치와
      동일한 위치에 결과에 나타납니다. 숫자나 문자열 같은 원시 값의 경우 값으로 동등성을 판단하고,
      객체의 경우 참조로 동등성을 판단합니다.
      <br />
      <br />
      uniq는 원본 배열을 수정하지 않고 새로운 배열을 생성하므로 함수형 프로그래밍에 안전합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

const numbers = [1, 2, 2, 3, 1, 4];

uniq(numbers);
// [1, 2, 3, 4]

// 원본 배열은 변경되지 않음
console.log(numbers);
// [1, 2, 2, 3, 1, 4]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      중복 제거하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

// 숫자
uniq([1, 2, 2, 3, 1]);
// [1, 2, 3]

// 문자열
uniq(['사과', '바나나', '사과', '체리']);
// ['사과', '바나나', '체리']

// 혼합 타입
uniq([1, '1', 2, '2', 1, '1']);
// [1, '1', 2, '2']

// 불리언
uniq([true, false, true, false]);
// [true, false]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      순서 유지
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

const data = ['c', 'a', 'b', 'a', 'c'];

// 첫 번째 발생 순서가 유지됨
uniq(data);
// ['c', 'a', 'b']
// 주의: 'c'가 먼저 나타났기 때문에 첫 번째로 옴

// 정렬된 고유 값과 비교
import { pipe, sort } from 'fp-pack';

const sortedUnique = pipe(
  uniq,
  sort((a: string, b: string) => a.localeCompare(b))
);

sortedUnique(data);
// ['a', 'b', 'c']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      객체의 참조 동등성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

// 동일한 참조 - 중복으로 처리됨
const obj1 = { id: 1, name: 'Alice' };
const obj2 = { id: 2, name: 'Bob' };

uniq([obj1, obj2, obj1]);
// [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]

// 다른 참조 - 고유한 것으로 처리됨
const a = { id: 1 };
const b = { id: 1 };

uniq([a, b, a]);
// [{ id: 1 }, { id: 1 }]
// 다른 참조이므로 두 객체 모두 유지됨

// 값 기반 고유성이 필요하면 uniqBy 사용
import { uniqBy } from 'fp-pack';

uniqBy((obj: { id: number }) => obj.id, [a, b, a]);
// [{ id: 1 }]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      태그 수집
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

interface Article {
  title: string;
  tags: string[];
}

const articles: Article[] = [
  { title: '포스트 1', tags: ['javascript', 'react', 'typescript'] },
  { title: '포스트 2', tags: ['python', 'django'] },
  { title: '포스트 3', tags: ['javascript', 'nodejs', 'typescript'] },
  { title: '포스트 4', tags: ['react', 'redux'] },
];

// 모든 고유 태그 가져오기
const allTags = articles.flatMap(article => article.tags);
const uniqueTags = uniq(allTags);
// ['javascript', 'react', 'typescript', 'python', 'django', 'nodejs', 'redux']

// 태그 필터 UI에 사용
uniqueTags.forEach(tag => {
  console.log(\`<button>\${tag}</button>\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      카테고리 목록
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

interface Product {
  name: string;
  category: string;
  subcategory: string;
}

const products: Product[] = [
  { name: '노트북', category: '전자기기', subcategory: '컴퓨터' },
  { name: '마우스', category: '전자기기', subcategory: '액세서리' },
  { name: '책상', category: '가구', subcategory: '사무실' },
  { name: '의자', category: '가구', subcategory: '사무실' },
  { name: '키보드', category: '전자기기', subcategory: '액세서리' },
];

// 고유 카테고리 가져오기
const categories = uniq(products.map(p => p.category));
// ['전자기기', '가구']

// 고유 서브카테고리 가져오기
const subcategories = uniq(products.map(p => p.subcategory));
// ['컴퓨터', '액세서리', '사무실']

// 네비게이션 메뉴 구성
categories.forEach(category => {
  const items = products.filter(p => p.category === category);
  console.log(\`\${category}: \${items.length}개 상품\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      사용자 권한
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

interface User {
  name: string;
  roles: string[];
}

const users: User[] = [
  { name: 'Alice', roles: ['관리자', '편집자'] },
  { name: 'Bob', roles: ['편집자', '뷰어'] },
  { name: 'Charlie', roles: ['뷰어'] },
  { name: 'David', roles: ['관리자', '뷰어'] },
];

// 시스템의 모든 고유 역할 가져오기
const allRoles = users.flatMap(user => user.roles);
const uniqueRoles = uniq(allRoles);
// ['관리자', '편집자', '뷰어']

// 사용 중인 역할 확인
console.log('시스템 활성 역할:', uniqueRoles.join(', '));

// 역할별 사용자 수 계산
uniqueRoles.forEach(role => {
  const count = users.filter(u => u.roles.includes(role)).length;
  console.log(\`\${role}: \${count}명\`);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 정리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

// 중복 폼 제출 제거
const formSubmissions = [
  'user@example.com',
  'admin@example.com',
  'user@example.com', // 중복
  'test@example.com',
  'admin@example.com', // 중복
];

const uniqueEmails = uniq(formSubmissions);
// ['user@example.com', 'admin@example.com', 'test@example.com']

// 검색 기록 정리
const searchHistory = [
  'react hooks',
  'typescript 튜토리얼',
  'react hooks', // 중복
  'nodejs express',
  'typescript 튜토리얼', // 중복
];

const cleanHistory = uniq(searchHistory);
// ['react hooks', 'typescript 튜토리얼', 'nodejs express']

// 최근 고유 검색어 표시
console.log('최근 검색:', cleanHistory.slice(0, 5).join(', '));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      이벤트 리스너
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { uniq } from 'fp-pack';

interface EventListener {
  event: string;
  handler: () => void;
}

const listeners: string[] = [
  'click',
  'mouseover',
  'click',    // 중복
  'keydown',
  'mouseover', // 중복
  'scroll',
];

// 설정할 고유 이벤트 타입 가져오기
const uniqueEvents = uniq(listeners);
// ['click', 'mouseover', 'keydown', 'scroll']

// 타입당 한 번만 이벤트 리스너 설정
uniqueEvents.forEach(eventType => {
  console.log(\`리스너 설정 중: \${eventType}\`);
  // element.addEventListener(eventType, handler);
});`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, uniq, map, filter } from 'fp-pack';

interface Order {
  customerId: number;
  amount: number;
  status: string;
}

const orders: Order[] = [
  { customerId: 1, amount: 100, status: '완료' },
  { customerId: 2, amount: 200, status: '완료' },
  { customerId: 1, amount: 150, status: '완료' },
  { customerId: 3, amount: 300, status: '대기' },
  { customerId: 2, amount: 250, status: '완료' },
];

// 주문을 완료한 고유 고객 ID 가져오기
const uniqueCompletedCustomers = pipe(
  filter((order: Order) => order.status === '완료'),
  map((order: Order) => order.customerId),
  uniq
);

uniqueCompletedCustomers(orders);
// [1, 2]

console.log('완료 주문 고객 수:', uniqueCompletedCustomers(orders).length);`}
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
          <li>객체에 대해 참조 동등성으로 충분할 때</li>
          <li>커스텀 로직 없이 간단한 중복 제거가 필요할 때</li>
          <li>가장 간단하고 성능이 좋은 솔루션을 원할 때</li>
        </ul>
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          uniqBy를 사용하는 경우:
        </h4>
        <ul class="text-sm text-green-800 dark:text-green-200 list-disc list-inside space-y-2">
          <li>특정 속성으로 객체를 비교해야 할 때</li>
          <li>커스텀 고유성 기준이 필요할 때 (예: 대소문자 구분 없는 문자열)</li>
          <li>계산되거나 변환된 값으로 비교할 때</li>
          <li>참조 동등성 대신 값 기반 동등성이 필요할 때</li>
        </ul>
      </div>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { uniq, uniqBy } from 'fp-pack';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 1, name: 'Alice (중복)' }, // 동일한 ID
];

// uniq - 참조로 비교 (모두 유지)
uniq(users);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 1, name: 'Alice (중복)' }
// ]

// uniqBy - ID로 비교 (중복 제거)
uniqBy((user: { id: number }) => user.id, users);
// [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 특징
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 순서 유지
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          첫 번째 발생 순서를 유지합니다. 각 고유 값은 원본 배열에서
          처음 발견된 위치에 나타납니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 참조 동등성
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          객체의 경우 참조 동등성(===)을 사용합니다. 같은 값을 가진 다른 객체는
          고유한 것으로 취급됩니다. 값 기반 비교가 필요하면 uniqBy를 사용하세요.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 성능
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Set을 사용하여 O(n) 시간 복잡도를 가집니다. 큰 배열에도 효율적입니다.
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
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">uniq</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/uniq.ts"
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
          navigateTo('/ko/array/uniqBy');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          uniqBy
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          키 기준으로 중복을 제거합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/filter');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          filter
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          조건에 맞는 값만 남깁니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/groupBy');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          groupBy
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          키 기준으로 그룹화합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/sort');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          sort
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          정렬 후 중복을 제거합니다
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/ko/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          uniq와 filter를 결합하여 조건에 맞는 고유 요소를 가져오는 방법을 알아보세요.
        </p>
      </a>

      <a
        href="/ko/array/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          uniq 전에 map을 사용하여 특정 속성을 추출하고 중복을 제거하는 방법을 알아보세요.
        </p>
      </a>
    </div>
  </div>
);
