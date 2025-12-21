import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Every_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      every
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      모든 요소가 조건을 만족하는지 확인
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      every란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        every
      </strong>{' '}
      는 배열의 모든 요소가 제공된 조건 함수를 만족하는지 테스트합니다.
      모든 요소가 테스트를 통과하면 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">true</code>를,
      어떤 요소라도 실패하면 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">false</code>를 반환합니다.
      빈 배열의 경우 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">true</code>를 반환합니다 (공허한 참).
      <br />
      <br />
      이는 <strong>유효성 검사</strong>, <strong>타입 체크</strong>,
      <strong>데이터 검증</strong>, 그리고 <strong>제약 조건 확인</strong>에 유용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

const numbers = [2, 4, 6, 8, 10];

every((n: number) => n % 2 === 0, numbers);
// true (모두 짝수)

every((n: number) => n > 5, numbers);
// false (모두 5보다 크지 않음)

const allPositive = (arr: number[]) => every((n: number) => n > 0, arr);
allPositive([1, 2, 3]);    // true
allPositive([1, -2, 3]);   // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function every<T>(
  predicate: (value: T) => boolean,
  arr: T[]
): boolean;

// 조건 함수와 배열을 받음
// 모든 요소가 조건을 만족하면 true를 반환`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      조건 함수는 하나가 false를 반환하거나 모든 요소가 테스트될 때까지 각 요소에 대해 호출됩니다.
      빈 배열에 대해서는 true를 반환합니다 (공허한 참).
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 체크
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

// 모든 숫자가 양수인지 확인
const allPositive = every((n: number) => n > 0, [1, 2, 3, 4]);
// true

// 모든 문자열이 비어있지 않은지 확인
const allNonEmpty = every((s: string) => s.length > 0, ['a', 'b', 'c']);
// true

// 모든 숫자가 짝수인지 확인
const allEven = every((n: number) => n % 2 === 0, [2, 4, 6, 8]);
// true

// 빈 배열은 true를 반환
const empty = every((n: number) => n > 100, []);
// true`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      폼 유효성 검사
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

interface FormField {
  name: string;
  value: string;
  required: boolean;
}

const formFields: FormField[] = [
  { name: 'username', value: 'john_doe', required: true },
  { name: 'email', value: 'john@example.com', required: true },
  { name: 'phone', value: '123-456-7890', required: false },
];

// 모든 필수 필드가 채워졌는지 확인
const isFormValid = every(
  (field: FormField) => !field.required || field.value.length > 0,
  formFields
);
// true

// 모든 이메일 필드의 형식 검증
const emailFields = formFields.filter(f => f.name.includes('email'));
const allValidEmails = every(
  (field: FormField) => field.value.includes('@') && field.value.includes('.'),
  emailFields
);

console.log(allValidEmails);
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 일관성 체크
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: 1, name: '노트북', price: 1000, inStock: true },
  { id: 2, name: '마우스', price: 25, inStock: true },
  { id: 3, name: '키보드', price: 75, inStock: true },
];

// 모든 제품이 유효한 가격을 가지는지 확인
const allValidPrices = every((p: Product) => p.price > 0 && Number.isFinite(p.price), products);

console.log(allValidPrices);
// true

// 모든 제품이 재고가 있는지 확인
const allInStock = every((p: Product) => p.inStock, products);

console.log(allInStock);
// true

// 모든 제품이 고유한 ID를 가지는지 확인
const hasUniqueIds = (products: Product[]) => {
  const ids = products.map(p => p.id);
  return ids.length === new Set(ids).size;
};

console.log(hasUniqueIds(products));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      권한 확인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

interface User {
  id: number;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
}

const users: User[] = [
  { id: 1, role: 'admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, role: 'editor', permissions: ['read', 'write'] },
  { id: 3, role: 'viewer', permissions: ['read'] },
];

// 모든 사용자가 읽기 권한이 있는지 확인
const allCanRead = every((u: User) => u.permissions.includes('read'), users);

console.log(allCanRead);
// true

// 모든 사용자가 쓰기 권한이 있는지 확인
const allCanWrite = every((u: User) => u.permissions.includes('write'), users);

console.log(allCanWrite);
// false

// 모든 관리자가 전체 권한을 가지는지 확인
const admins = users.filter(u => u.role === 'admin');
const allAdminsHaveFullAccess = every(
  (u: User) => u.permissions.includes('delete'),
  admins
);

console.log(allAdminsHaveFullAccess);
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      타입 가드와 함께 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

// 모든 값이 문자열인지 확인
const allStrings = (arr: unknown[]): arr is string[] =>
  every((value: unknown): value is string => typeof value === 'string', arr);

const mixedArray: unknown[] = ['a', 'b', 'c'];
if (allStrings(mixedArray)) {
  // TypeScript는 이제 mixedArray가 문자열만 포함한다는 것을 알고 있습니다
  mixedArray.forEach(s => console.log(s.toUpperCase()));
}

// 모든 값이 숫자인지 확인
const allNumbers = (arr: unknown[]): arr is number[] =>
  every((value: unknown): value is number => typeof value === 'number' && !isNaN(value), arr);

const data: unknown[] = [1, 2, 3, 4];
if (allNumbers(data)) {
  const sum = data.reduce((a, b) => a + b, 0);
  console.log(sum); // 10
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      일반적인 패턴
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      pipe와 조합
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, every } from 'fp-kit';

interface Task {
  id: number;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const tasks: Task[] = [
  { id: 1, completed: true, priority: 'high' },
  { id: 2, completed: true, priority: 'medium' },
  { id: 3, completed: false, priority: 'low' },
];

// 모든 높은 우선순위 작업이 완료되었는지 확인
const allHighPriorityDone = pipe(
  (tasks: Task[]) => tasks.filter(t => t.priority === 'high'),
  (highPriorityTasks: Task[]) => every((t: Task) => t.completed, highPriorityTasks)
);

console.log(allHighPriorityDone(tasks));
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      중첩된 데이터 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

interface Order {
  items: { price: number; quantity: number }[];
  customer: { email: string; verified: boolean };
}

const orders: Order[] = [
  {
    items: [{ price: 10, quantity: 2 }, { price: 20, quantity: 1 }],
    customer: { email: 'user1@example.com', verified: true }
  },
  {
    items: [{ price: 15, quantity: 3 }],
    customer: { email: 'user2@example.com', verified: true }
  },
];

// 모든 주문이 인증된 고객으로부터 온 것인지 확인
const allFromVerified = every((o: Order) => o.customer.verified, orders);

console.log(allFromVerified);
// true

// 모든 주문이 유효한 항목을 가지는지 확인
const allHaveValidItems = every((o: Order) =>
  o.items.length > 0 && o.items.every(item => item.price > 0 && item.quantity > 0),
  orders
);

console.log(allHaveValidItems);
// true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Promise 배열 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { every } from 'fp-kit';

// 모든 promise가 완료되었는지 확인
const allSettled = async (promises: Promise<any>[]) => {
  const results = await Promise.allSettled(promises);
  return every((r: PromiseSettledResult<any>) => r.status === 'fulfilled', results);
};

// 사용법
const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
];

allSettled(promises).then(result => {
  console.log(result); // true
});

// 모든 값이 해결 후 truthy인지 확인
const allTruthy = async (promises: Promise<any>[]) => {
  const values = await Promise.all(promises);
  return every((v: any) => Boolean(v), values);
};`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 every를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 선언적 유효성 검사
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          검증 로직을 명확하게 표현: "모든 사용자가 성인"이 수동 루프보다 읽기 쉽습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 간단하고 직관적
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          직관적인 함수 시그니처로 추가적인 인지 부담 없이 쉽게 이해하고 사용할 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 단락 평가
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          거짓 조건을 찾는 즉시 검사를 중단하여 큰 배열에서 성능을 향상시킵니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 함수형 패턴과 조합 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          pipe, compose 및 다른 함수형 유틸리티와 완벽하게 작동하여 복잡한 검증 파이프라인을 만들 수 있습니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function every<T>(predicate: (value: T) => boolean, arr: T[]): boolean {
  return arr.every(predicate);
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>각 요소를 테스트하는 조건 함수와 배열을 받습니다</li>
        <li>최적의 성능을 위해 네이티브 Array.prototype.every를 사용합니다</li>
        <li>첫 번째 false 결과에서 단락됩니다</li>
        <li>빈 배열에 대해 true를 반환합니다 (공허한 참)</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        관련된 배열 함수들을 시도해보세요:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/array/find');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            find
          </a>{' '}
          - 조건을 만족하는 첫 요소 찾기
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/array/filter');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            filter
          </a>{' '}
          - 조건을 만족하는 요소 필터링
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/pipe');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            pipe
          </a>{' '}
          - every를 다른 변환과 연결
        </li>
      </ul>
    </div>
  </div>
);
