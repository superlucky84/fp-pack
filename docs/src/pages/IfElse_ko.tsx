import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IfElse_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      ifElse
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      조건에 따라 두 가지 다른 변환 중 선택
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      ifElse란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        ifElse
      </strong>{' '}
      는 조건 함수에 따라 두 가지 다른 변환 중 하나를 적용하는 함수를 생성합니다.
      조건이 true를 반환하면 첫 번째 함수를 적용하고, false를 반환하면 두 번째 함수를 적용합니다.
      <br />
      <br />
      조건이 false일 때 원래 값을 반환하는 <strong>when</strong>과 달리,
      ifElse는 항상 변환을 적용하므로 <strong>분기 로직</strong>,
      <strong>타입 변환</strong>, 그리고 <strong>대체 계산</strong>에 이상적입니다.
      <br />
      <br />
      true와 false 분기는 서로 다른 타입을 반환할 수 있어 최대한의 유연성을 제공합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

const describeNumber = ifElse(
  (n: number) => n > 0,
  (n) => \`양수: \${n}\`,
  (n) => \`비양수: \${n}\`
);

describeNumber(5);   // '양수: 5'
describeNumber(-3);  // '비양수: -3'
describeNumber(0);   // '비양수: 0'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function ifElse<T, RTrue, RFalse>(
  predicate: (value: T) => boolean,
  onTrue: (value: T) => RTrue,
  onFalse: (value: T) => RFalse
): (value: T) => RTrue | RFalse;

// 조건 함수와 두 개의 변환 함수를 받음
// 하나의 변환 또는 다른 변환을 적용하는 함수를 반환
// true와 false 분기에 대해 서로 다른 타입을 반환할 수 있음`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 분기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

// 숫자를 다른 문자열 표현으로 변환
const formatNumber = ifElse(
  (n: number) => n >= 1000,
  (n) => \`\${(n / 1000).toFixed(1)}K\`,
  (n) => n.toString()
);

formatNumber(1500);  // '1.5K'
formatNumber(500);   // '500'

// 문자열 길이에 따라 다른 처리
const processString = ifElse(
  (s: string) => s.length > 10,
  (s) => s.slice(0, 10) + '...',
  (s) => s.toUpperCase()
);

processString('Hello World!');  // 'Hello Worl...'
processString('Hi');             // 'HI'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      타입 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

interface Success<T> {
  status: 'success';
  data: T;
}

interface Error {
  status: 'error';
  message: string;
}

// 검증에 따라 다른 타입 반환
const validateAge = ifElse(
  (age: number) => age >= 18,
  (age): Success<number> => ({ status: 'success', data: age }),
  (age): Error => ({ status: 'error', message: \`나이 \${age}세는 18세 미만입니다\` })
);

validateAge(25);  // { status: 'success', data: 25 }
validateAge(15);  // { status: 'error', message: '나이 15세는 18세 미만입니다' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      사용자 접근 제어
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

interface AdminDashboard {
  type: 'admin';
  user: User;
  adminControls: string[];
}

interface UserDashboard {
  type: 'user';
  user: User;
  limitedFeatures: string[];
}

const getDashboard = ifElse(
  (user: User) => user.role === 'admin',
  (user): AdminDashboard => ({
    type: 'admin',
    user,
    adminControls: ['사용자관리', '분석조회', '설정']
  }),
  (user): UserDashboard => ({
    type: 'user',
    user,
    limitedFeatures: ['프로필보기', '프로필수정']
  })
);

getDashboard({ id: 1, name: 'Alice', role: 'admin' });
// { type: 'admin', user: {...}, adminControls: [...] }

getDashboard({ id: 2, name: 'Bob', role: 'user' });
// { type: 'user', user: {...}, limitedFeatures: [...] }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      가격 계산 전략
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

interface Product {
  name: string;
  basePrice: number;
  isPremium: boolean;
}

interface RegularPrice {
  final: number;
  discount: number;
  type: 'regular';
}

interface PremiumPrice {
  final: number;
  discount: number;
  premiumBonus: number;
  type: 'premium';
}

const calculatePrice = ifElse(
  (product: Product) => product.isPremium,
  (product): PremiumPrice => ({
    final: product.basePrice * 0.8,
    discount: 20,
    premiumBonus: 10,
    type: 'premium'
  }),
  (product): RegularPrice => ({
    final: product.basePrice * 0.9,
    discount: 10,
    type: 'regular'
  })
);

calculatePrice({ name: 'Widget', basePrice: 100, isPremium: true });
// { final: 80, discount: 20, premiumBonus: 10, type: 'premium' }

calculatePrice({ name: 'Gadget', basePrice: 100, isPremium: false });
// { final: 90, discount: 10, type: 'regular' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 검증 및 포맷팅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

const validateEmail = ifElse(
  (email: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email),
  (email) => ({ valid: true, email: email.toLowerCase() }),
  (email) => ({ valid: false, error: \`잘못된 이메일: \${email}\` })
);

validateEmail('user@EXAMPLE.COM');
// { valid: true, email: 'user@example.com' }

validateEmail('invalid-email');
// { valid: false, error: '잘못된 이메일: invalid-email' }

// 전화번호 포맷팅
const formatPhone = ifElse(
  (phone: string) => phone.length === 10,
  (phone) => \`(\${phone.slice(0, 3)}) \${phone.slice(3, 6)}-\${phone.slice(6)}\`,
  (phone) => phone
);

formatPhone('1234567890');  // '(123) 456-7890'
formatPhone('12345');        // '12345'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 처리와 함께
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

interface Item {
  id: number;
  name: string;
  stock: number;
}

// 재고 있음/없음에 따라 다른 처리
const processInventoryItem = ifElse(
  (item: Item) => item.stock > 0,
  (item) => ({
    ...item,
    status: '판매가능',
    message: \`\${item.stock}개 재고 있음\`
  }),
  (item) => ({
    ...item,
    status: '품절',
    message: '재입고 알림 신청',
    notifyMe: true
  })
);

const inventory = [
  { id: 1, name: 'Widget', stock: 10 },
  { id: 2, name: 'Gadget', stock: 0 }
];

inventory.map(processInventoryItem);
// [
//   { id: 1, name: 'Widget', stock: 10, status: '판매가능', message: '10개 재고 있음' },
//   { id: 2, name: 'Gadget', stock: 0, status: '품절', message: '재입고 알림 신청', notifyMe: true }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      복잡한 로직을 위한 pipe와 함께
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, ifElse } from 'fp-pack';

interface Order {
  total: number;
  isPriority: boolean;
  customerId: number;
}

const processOrder = pipe(
  // 우선순위에 따라 배송 속도 선택
  ifElse(
    (order: Order) => order.isPriority,
    (order) => ({ ...order, shipping: '특급', shippingCost: 20 }),
    (order) => ({ ...order, shipping: '일반', shippingCost: 5 })
  ),
  // 주문 총액에 따라 할인 선택
  ifElse(
    (order) => order.total > 100,
    (order) => ({ ...order, discount: order.total * 0.1 }),
    (order) => ({ ...order, discount: 0 })
  )
);

processOrder({ total: 150, isPriority: true, customerId: 1 });
// { total: 150, isPriority: true, customerId: 1, shipping: '특급', shippingCost: 20, discount: 15 }

processOrder({ total: 50, isPriority: false, customerId: 2 });
// { total: 50, isPriority: false, customerId: 2, shipping: '일반', shippingCost: 5, discount: 0 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 ifElse를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 명시적 분기 로직
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          원래 값을 반환할 수 있는 when/unless와 달리, ifElse는 항상 변환을 적용하여
          의도를 명확하게 합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 타입 안전 분기
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          TypeScript가 true와 false 분기에 대해 서로 다른 반환 타입을 추론할 수 있어
          서로 다른 데이터 구조 간의 타입 안전한 변환이 가능합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 조합 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          pipe 및 compose와 원활하게 작동하여 복잡한 의사결정 트리와
          변환 파이프라인을 구축할 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 명령형 If-Else 회피
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          장황한 if-else 문을 테스트하고 추론하기 쉬운 깔끔한 함수형 표현으로
          대체할 수 있습니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function ifElse<T, RTrue, RFalse>(
  predicate: (value: T) => boolean,
  onTrue: (value: T) => RTrue,
  onFalse: (value: T) => RFalse
): (value: T) => RTrue | RFalse {
  return (value: T) => (predicate(value) ? onTrue(value) : onFalse(value));
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>조건 함수와 두 개의 변환 함수(onTrue와 onFalse)를 받습니다</li>
        <li>조건을 평가하는 새 함수를 반환합니다</li>
        <li>조건이 true를 반환하면 onTrue 변환을 적용합니다</li>
        <li>조건이 false를 반환하면 onFalse 변환을 적용합니다</li>
        <li>두 분기 모두 서로 다른 타입(RTrue와 RFalse)을 반환할 수 있습니다</li>
        <li>부수 효과가 없는 순수 함수입니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">ifElse</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/control/ifElse.ts"
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

    <div class="grid gap-6 mt-6">
      <a
        href="/control/when"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/when');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          when →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건이 참일 때 함수 적용 - 더 단순한 대안입니다.
        </p>
      </a>

      <a
        href="/control/unless"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/unless');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          unless →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건이 거짓일 때 함수 적용 - 반대 패턴입니다.
        </p>
      </a>

      <a
        href="/control/cond"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/cond');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          cond →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          여러 조건 분기 처리 - ifElse 개념을 확장합니다.
        </p>
      </a>

      <a
        href="/control/guard"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/guard');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          guard →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          조건 실패 시 기본값 반환 - 조기 반환 패턴입니다.
        </p>
      </a>
    </div>
  </div>
);
