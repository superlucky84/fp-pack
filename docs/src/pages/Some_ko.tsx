import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Some_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      some
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      최소 하나의 요소가 조건을 만족하는지 확인
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      some이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        some
      </strong>{' '}
      은 배열의 요소 중 최소 하나가 제공된 predicate 함수를 만족하는지 테스트합니다.
      <br />
      <br />
      조건을 만족하는 요소를 찾는 즉시 <code>true</code>를 반환하여, 큰 배열에서 효율적입니다.
      요소가 하나도 일치하지 않으면 <code>false</code>를 반환합니다.
      <br />
      <br />
      이것은 함수형 프로그래밍의 "any" 또는 "exists" 연산과 동등하며,
      유효성 검사와 검색 시나리오에 완벽합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

const numbers = [1, 3, 5, 7, 8];

// 짝수가 하나라도 있는지 확인
const hasEven = some((n: number) => n % 2 === 0, numbers);
// true (8을 찾음)

const allOdd = [1, 3, 5, 7, 9];
const hasEven2 = some((n: number) => n % 2 === 0, allOdd);
// false (짝수가 없음)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 확인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

const ages = [12, 15, 17, 19, 22];

// 성인(18세 이상)이 있는지 확인
some((age: number) => age >= 18, ages);  // true

// 10세 미만이 있는지 확인
some((age: number) => age < 10, ages);   // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조기 종료 최적화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

const largeArray = Array.from({ length: 1000000 }, (_, i) => i);

// 500을 찾으면 즉시 중단
const hasTarget = some((n: number) => {
  console.log('확인 중:', n);
  return n === 500;
}, largeArray);

// 0부터 500까지만 로그됨, 백만 개 전부가 아님!
// 모든 요소를 확인하는 것보다 훨씬 빠름`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      사용자 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user' | 'guest';
  verified: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', role: 'user', verified: true },
  { id: 2, name: 'Bob', role: 'admin', verified: true },
  { id: 3, name: 'Charlie', role: 'user', verified: false },
];

// 관리자가 최소 한 명 있는지 확인
const hasAdmin = some(
  (user: User) => user.role === 'admin',
  users
);  // true

// 미인증 사용자가 있는지 확인
const hasUnverified = some(
  (user: User) => !user.verified,
  users
);  // true

// 권한 확인
function canPerformAction(users: User[]): boolean {
  return some(user => user.role === 'admin' && user.verified, users);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      폼 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

interface FormField {
  name: string;
  value: string;
  required: boolean;
}

const formFields: FormField[] = [
  { name: 'email', value: 'user@example.com', required: true },
  { name: 'phone', value: '', required: false },
  { name: 'name', value: '', required: true },
];

// 필수 필드 중 비어있는 것이 있는지 확인
const hasEmptyRequired = some(
  (field: FormField) => field.required && !field.value,
  formFields
);  // true (name이 비어있고 필수임)

// 검증 실패 시 에러 메시지 표시
if (hasEmptyRequired) {
  console.log('모든 필수 필드를 채워주세요');
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      검색과 필터
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  tags: string[];
}

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 1200, inStock: true, tags: ['electronics', 'computers'] },
  { id: 2, name: 'Mouse', price: 25, inStock: false, tags: ['electronics', 'accessories'] },
  { id: 3, name: 'Desk', price: 300, inStock: true, tags: ['furniture', 'office'] },
];

// 재고가 없는 상품이 있는지 확인
const hasOutOfStock = some(
  (product: Product) => !product.inStock,
  products
);  // true

// 특정 태그를 가진 상품이 있는지 확인
function hasTag(tag: string, products: Product[]): boolean {
  return some(
    product => product.tags.includes(tag),
    products
  );
}

hasTag('electronics', products);  // true
hasTag('clothing', products);     // false

// 저렴한($100 미만) 재고 상품이 있는지 확인
const hasAffordableInStock = some(
  product => product.price < 100 && product.inStock,
  products
);  // false (Mouse는 저렴하지만 재고 없음)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      커링과 함께 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { some, curry } from 'fp-kit';

// 커링된 버전 생성
const someCurried = curry(some);

// 재사용 가능한 predicate 생성
const hasEvenNumber = someCurried((n: number) => n % 2 === 0);
const hasNegative = someCurried((n: number) => n < 0);
const hasLargeNumber = someCurried((n: number) => n > 1000);

const numbers1 = [1, 3, 5, 7];
const numbers2 = [1, 2, 3];
const numbers3 = [-5, 10, 20];

hasEvenNumber(numbers1);    // false
hasEvenNumber(numbers2);    // true
hasNegative(numbers3);      // true
hasLargeNumber(numbers3);   // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      일반적인 패턴
    </h2>

    <div class="space-y-6">
      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          존재 확인
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { some } from 'fp-kit';

// 배열에 값이 존재하는지 확인
function includes<T>(value: T, arr: T[]): boolean {
  return some(item => item === value, arr);
}

includes(3, [1, 2, 3, 4]);  // true
includes('x', ['a', 'b', 'c']);  // false`}
        />
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          부정 (None)
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { some } from 'fp-kit';

// 어떤 요소도 일치하지 않는지 확인
function none<T>(predicate: (x: T) => boolean, arr: T[]): boolean {
  return !some(predicate, arr);
}

const numbers = [1, 3, 5, 7];
none((n: number) => n % 2 === 0, numbers);  // true (짝수가 없음)`}
        />
      </div>

      <div>
        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          복잡한 조건
        </h4>
        <CodeBlock
          language="typescript"
          code={`import { some } from 'fp-kit';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
}

const tasks: Task[] = [/* ... */];

// 기한이 지난 높은 우선순위 작업 확인
const hasUrgent = some(
  task =>
    task.priority === 'high' &&
    !task.completed &&
    task.dueDate < new Date(),
  tasks
);`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      vs. Array.prototype.some
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { some } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5];
const isEven = (n: number) => n % 2 === 0;

// 네이티브 JavaScript
numbers.some(isEven);  // true

// fp-kit (조합을 위한 데이터-마지막)
some(isEven, numbers);  // true

// fp-kit 버전의 이점:
// 1. 데이터-마지막으로 커링과 조합 가능
// 2. Predicate가 먼저 (파이프라인에서 읽기 쉬움)
// 3. pipe/compose와 잘 작동`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 장점
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 성능
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          일치하는 요소를 찾는 즉시 중단합니다. "하나라도" 존재하는지만 알면 될 때
          모든 요소를 확인하는 것보다 훨씬 빠릅니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 가독성
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          의도를 명확하게 표현: "어떤 요소가 이 조건을 만족하나요?"
          수동 루프나 필터보다 읽기 쉽습니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 조합 준비
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          데이터-마지막 매개변수 순서로 커링과 함수형 파이프라인에서
          사용하기 완벽합니다.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 타입 안전성
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          predicate와 반환값에 대한 적절한 타입 추론으로 완전한 TypeScript 지원.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          curry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          더 나은 조합을 위해 some을 커링하여 재사용 가능한 predicate를 만드세요.
        </p>
      </a>

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
          데이터 변환 파이프라인에서 검증 단계로 some을 사용하세요.
        </p>
      </a>
    </div>
  </div>
);
