import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const SortBy_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      sortBy
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      계산된 값으로 배열 정렬
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      sortBy란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        sortBy
      </strong>{' '}
      는 제공된 함수를 사용하여 각 요소에서 계산된 값을 기준으로 배열을 정렬합니다.
      <br />
      <br />
      사용자 정의 비교 로직을 작성하는 대신, 각 요소에서 정렬 키를 추출하거나
      계산하는 함수만 제공하면 됩니다. 함수가 자동으로 비교를 처리합니다.
      <br />
      <br />
      sortBy는 원본을 수정하지 않고 새로운 정렬된 배열을 생성하며,
      안정 정렬을 사용하여 동일한 키를 가진 요소의 상대적 순서를 유지합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

interface User {
  name: string;
  age: number;
}

const users: User[] = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
  { name: 'Charlie', age: 25 },
];

// 나이로 정렬
const byAge = sortBy((user: User) => user.age, users);
// [{ name: 'Bob', age: 20 }, { name: 'Charlie', age: 25 }, { name: 'Alice', age: 30 }]

// 이름으로 정렬
const byName = sortBy((user: User) => user.name, users);
// [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 20 }, { name: 'Charlie', age: 25 }]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      숫자 정렬
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// 오름차순 정렬
sortBy((n: number) => n, numbers);
// [1, 1, 2, 3, 4, 5, 6, 9]

// 절댓값으로 정렬
sortBy((n: number) => Math.abs(n), [-5, 3, -1, 4, -2]);
// [-1, -2, 3, 4, -5]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      문자열 정렬
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

const names = ['Charlie', 'Alice', 'Bob', 'David'];

// 알파벳 순서
sortBy((name: string) => name, names);
// ['Alice', 'Bob', 'Charlie', 'David']

// 길이로 정렬
sortBy((name: string) => name.length, names);
// ['Bob', 'Alice', 'David', 'Charlie']

// 대소문자 구분 없이
sortBy((name: string) => name.toLowerCase(), ['charlie', 'Alice', 'BOB']);
// ['Alice', 'BOB', 'charlie']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      객체 정렬
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, rating: 4.5 },
  { id: 2, name: 'Mouse', price: 25, rating: 4.8 },
  { id: 3, name: 'Keyboard', price: 80, rating: 4.3 },
];

// 가격으로 정렬 (저렴한 순)
sortBy((p: Product) => p.price, products);
// [Mouse, Keyboard, Laptop]

// 평점으로 정렬 (높은 순 - 내림차순은 음수로)
sortBy((p: Product) => -p.rating, products);
// [Mouse, Laptop, Keyboard]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      날짜로 정렬
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

interface Event {
  title: string;
  date: Date;
  priority: number;
}

const events: Event[] = [
  { title: 'Meeting', date: new Date('2024-03-15'), priority: 2 },
  { title: 'Conference', date: new Date('2024-02-20'), priority: 1 },
  { title: 'Workshop', date: new Date('2024-04-10'), priority: 3 },
];

// 날짜로 정렬 (빠른 순)
const chronological = sortBy((event: Event) => event.date.getTime(), events);
// [Conference, Meeting, Workshop]

// 우선순위로 정렬
const byPriority = sortBy((event: Event) => event.priority, events);
// [Conference, Meeting, Workshop]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      복잡한 정렬 키
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

interface Student {
  firstName: string;
  lastName: string;
  gpa: number;
  graduationYear: number;
}

const students: Student[] = [
  { firstName: 'Alice', lastName: 'Smith', gpa: 3.8, graduationYear: 2024 },
  { firstName: 'Bob', lastName: 'Johnson', gpa: 3.5, graduationYear: 2023 },
  { firstName: 'Charlie', lastName: 'Williams', gpa: 3.9, graduationYear: 2024 },
];

// 성으로 정렬
sortBy((s: Student) => s.lastName, students);

// 졸업 연도 다음 GPA로 정렬 (다중 키는 문자열로 결합)
sortBy((s: Student) => \`\${s.graduationYear}-\${s.gpa}\`, students);

// 전체 이름으로 정렬
sortBy((s: Student) => \`\${s.lastName}, \${s.firstName}\`, students);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      내림차순 정렬
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

const scores = [85, 92, 78, 95, 88];

// 오름차순 (기본)
sortBy((n: number) => n, scores);
// [78, 85, 88, 92, 95]

// 내림차순 (값을 음수로)
sortBy((n: number) => -n, scores);
// [95, 92, 88, 85, 78]

// 문자열은 정렬 후 reverse 사용
const names = ['Alice', 'Charlie', 'Bob'];
sortBy((name: string) => name, names).reverse();
// ['Charlie', 'Bob', 'Alice']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      커링과 함께 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { sortBy, curry } from 'fp-pack';

// 커링된 버전 생성
const sortByCurried = curry(sortBy);

// 재사용 가능한 정렬 함수 생성
const sortByAge = sortByCurried((user: { age: number }) => user.age);
const sortByName = sortByCurried((user: { name: string }) => user.name);
const sortByPrice = sortByCurried((item: { price: number }) => item.price);

const users = [
  { name: 'Charlie', age: 25 },
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
];

sortByAge(users);   // 나이로 정렬
sortByName(users);  // 이름으로 정렬`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      중요한 특성
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 불변성
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          원본을 수정하지 않고 새로운 정렬된 배열을 반환합니다.
          원본 배열은 변경되지 않습니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 안정 정렬
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          동일한 정렬 키를 가진 요소는 원본 배열에서의 상대적 순서를
          유지합니다 (안정 정렬).
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 유연한 키
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          키 함수는 비교 가능한 모든 값을 반환할 수 있습니다: 숫자, 문자열,
          날짜, 또는 계산된 복합 키.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 타입 안전성
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          입력 요소와 정렬 키에 대한 적절한 타입 추론으로 완전한 TypeScript 지원.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      일반적인 패턴
    </h2>

    <div class="space-y-6">
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          역순 정렬
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { sortBy } from 'fp-pack';

// 숫자: 값을 음수로
sortBy((n: number) => -n, [3, 1, 4, 1, 5]);
// [5, 4, 3, 1, 1]

// 문자열/날짜: 정렬 후 reverse
sortBy((s: string) => s, ['c', 'a', 'b']).reverse();
// ['c', 'b', 'a']`}
        />
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          다중 키 정렬
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { sortBy } from 'fp-pack';

interface Person {
  lastName: string;
  firstName: string;
}

const people: Person[] = [
  { lastName: 'Smith', firstName: 'Alice' },
  { lastName: 'Smith', firstName: 'Bob' },
  { lastName: 'Johnson', firstName: 'Charlie' },
];

// 성, 그 다음 이름으로 정렬
sortBy((p: Person) => \`\${p.lastName}|\${p.firstName}\`, people);
// Johnson Charlie, Smith Alice, Smith Bob`}
        />
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Null/Undefined 처리
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { sortBy } from 'fp-pack';

interface Item {
  name: string;
  priority?: number;
}

const items: Item[] = [
  { name: 'A', priority: 2 },
  { name: 'B' },
  { name: 'C', priority: 1 },
];

// undefined 값을 마지막에
sortBy((item: Item) => item.priority ?? Infinity, items);
// [C(1), A(2), B(undefined)]

// undefined 값을 처음에
sortBy((item: Item) => item.priority ?? -Infinity, items);
// [B(undefined), C(1), A(2)]`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      vs. Array.prototype.sort
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { sortBy } from 'fp-pack';

const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 20 },
];

// 네이티브 JavaScript (원본 변경, 장황함)
users.sort((a, b) => {
  if (a.age < b.age) return -1;
  if (a.age > b.age) return 1;
  return 0;
});

// fp-pack (불변, 간결)
sortBy((user) => user.age, users);

// 장점:
// 1. 불변 - 원본을 수정하지 않음
// 2. 간단 - 키 함수만 제공
// 3. 데이터-마지막 - curry/pipe와 작동
// 4. 비교 로직 작성 불필요`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">sortBy</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/array/sortBy.ts"
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
          navigateTo('/ko/array/sort');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          sort
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          값을 직접 정렬합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
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
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/map');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          map
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          정렬 전에 값을 변환합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/uniq');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          uniq
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          중복 값을 제거합니다
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          정렬되고 필터링된 결과를 위해 sortBy와 filter를 결합하세요.
        </p>
      </a>

      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          데이터 변환 파이프라인에서 sortBy를 사용하세요.
        </p>
      </a>
    </div>
  </div>
);
