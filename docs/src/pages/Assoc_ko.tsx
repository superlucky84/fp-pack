import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Assoc_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      assoc
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      객체나 배열의 속성을 불변 방식으로 설정
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      assoc란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        assoc
      </strong>{' '}
      는 객체나 배열의 얕은 복사본을 생성하고 단일 속성이나 요소를 업데이트합니다.
      원본 데이터 구조를 절대 변경하지 않아, React, Redux 및 함수형 프로그래밍에서 일반적으로 사용되는
      불변 업데이트 패턴에 완벽합니다.
      <br />
      <br />
      이는 <strong>불변 상태 업데이트</strong>, <strong>함수형 데이터 변환</strong>,
      <strong>Redux 리듀서</strong>, 그리고 <strong>React 상태 관리</strong>에 유용합니다.
      <br />
      <br />
      "이 객체/배열의 하나의 속성만 변경된 새 버전을 만들어라"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

const user = { id: 1, name: 'Alice', age: 25 };

// 기존 속성 업데이트
const updated = assoc('name', 'Bob', user);
// { id: 1, name: 'Bob', age: 25 }

// 원본은 변경되지 않음
console.log(user);
// { id: 1, name: 'Alice', age: 25 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function assoc<T, K extends string | number | symbol, V>(
  key: K,
  value: V,
  obj: T
): AssocResult<T, K, V>;

// 키, 값, 그리고 객체/배열을 받음
// 속성/요소가 업데이트된 새 객체/배열을 반환
// TypeScript 타입 안전성 유지`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      객체 속성 업데이트
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
};

// TypeScript가 반환 타입을 자동으로 추론합니다
const updatedName = assoc('name', 'Bob', user);
//    ^? const updatedName: User

// 변환 과정에서 타입이 유지됩니다
const updatedEmail = assoc('email', 'bob@example.com', user);
//    ^? const updatedEmail: User

// 컴파일 타임에 타입 에러가 감지됩니다
// const wrong = assoc('name', 123, user);
//                              ^^^ Error: Type 'number' is not assignable to type 'string'

// 원본은 변경되지 않음 (불변성)
console.log(user);
// { id: 1, name: 'Alice', email: 'alice@example.com' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      새 속성 추가
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: 'Alice' };

// 새 속성을 추가할 때 TypeScript가 타입을 확장합니다
const withAge = assoc('age', 25, user);
//    ^? const withAge: User & { age: number }

// 확장된 타입을 사용할 수 있습니다
const age: number = withAge.age; // ✓ 타입 안전 접근

// assoc 호출을 체이닝하여 여러 속성 추가
const withMore = assoc('email', 'alice@example.com',
  assoc('age', 25, user)
);
//    ^? const withMore: User & { age: number; email: string }

// 명시적 제네릭 사용 (선택사항)
const withExplicit = assoc<User, 'age', number>('age', 30, user);
//    ^? const withExplicit: User & Record<'age', number>`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      속성 추가로 새로운 타입 생성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface BaseUser {
  id: number;
  name: string;
}

const baseUser: BaseUser = { id: 1, name: 'Alice' };

// 새 속성을 추가하면 확장된 새로운 타입이 생성됩니다
const userWithEmail = assoc('email', 'alice@example.com', baseUser);
//    ^? const userWithEmail: BaseUser & Record<'email', string>

// 새로운 타입은 원본과 다릅니다
type ExtendedUser = typeof userWithEmail;
// ExtendedUser = BaseUser & Record<'email', string>

// 원본과 새로운 속성 모두에 접근할 수 있습니다
const userId: number = userWithEmail.id;        // ✓ BaseUser에서 온 속성
const userName: string = userWithEmail.name;    // ✓ BaseUser에서 온 속성
const email: string = userWithEmail.email;      // ✓ 확장된 타입의 속성

// 하지만 원본 타입에는 새 속성이 없습니다
// const baseEmail: string = baseUser.email;
//                                    ^^^^^ Error: Property 'email' does not exist on type 'BaseUser'

// 여러 속성을 체이닝하여 복잡한 타입 생성
const fullUser = assoc('role', 'admin' as const,
  assoc('verified', true,
    assoc('email', 'alice@example.com', baseUser)
  )
);
//    ^? const fullUser: BaseUser & Record<'email', string> & Record<'verified', boolean> & Record<'role', 'admin'>

// 확장된 타입을 함수에서 사용
function sendEmail(user: BaseUser & Record<'email', string>) {
  console.log(\`Sending email to \${user.email}\`);
  return user;
}

sendEmail(userWithEmail); // ✓ OK - email 속성이 있음
// sendEmail(baseUser);   // ❌ Error - email 속성이 없음

// 재사용을 위해 타입 추출
type UserWithEmail = BaseUser & Record<'email', string>;
type UserWithRole = UserWithEmail & Record<'role', 'admin' | 'user'>;

const adminUser: UserWithRole = assoc('role', 'admin',
  assoc('email', 'admin@example.com', baseUser)
);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 업데이트
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

// TypeScript가 배열 요소 타입을 유지합니다
const items: string[] = ['a', 'b', 'c', 'd'];

// 인덱스로 업데이트 - 타입이 추론됩니다
const updated = assoc(1, 'B', items);
//    ^? const updated: string[]

// 타입 안전성: 잘못된 타입 할당 불가
// const wrong = assoc(1, 123, items);
//                        ^^^ Error: Type 'number' is not assignable to type 'string'

// readonly 배열에서도 작동합니다
const readonly = ['a', 'b', 'c'] as const;
const changed = assoc(1, 'B', readonly);
//    ^? const changed: ('a' | 'B' | 'c')[]

// 타입이 지정된 배열은 타입 제약을 유지합니다
const numbers: number[] = [1, 2, 3, 4];
const moreNumbers = assoc(1, 99, numbers);
//    ^? const moreNumbers: number[]

// 유니온 타입도 올바르게 작동합니다
const mixed: (string | number)[] = ['a', 1, 'b'];
const updatedMixed = assoc(0, 'x', mixed);
//    ^? const updatedMixed: (string | number)[]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      React 상태 업데이트
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';
import { useState } from 'react';

interface FormState {
  username: string;
  email: string;
  password: string;
}

function LoginForm() {
  const [form, setForm] = useState<FormState>({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (field: keyof FormState, value: string) => {
    // assoc를 사용한 불변 업데이트
    setForm(current => assoc(field, value, current));
  };

  return (
    <div>
      <input
        value={form.username}
        onChange={e => handleChange('username', e.target.value)}
      />
      <input
        value={form.email}
        onChange={e => handleChange('email', e.target.value)}
      />
      <input
        type="password"
        value={form.password}
        onChange={e => handleChange('password', e.target.value)}
      />
    </div>
  );
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Redux 리듀서 패턴
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

interface State {
  users: Record<number, User>;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'UPDATE_USER_NAME'; userId: number; name: string }
  | { type: 'TOGGLE_USER_ACTIVE'; userId: number }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_USER_NAME': {
      const user = state.users[action.userId];
      const updatedUser = assoc('name', action.name, user);
      const updatedUsers = assoc(action.userId, updatedUser, state.users);
      return assoc('users', updatedUsers, state);
    }

    case 'TOGGLE_USER_ACTIVE': {
      const user = state.users[action.userId];
      const updatedUser = assoc('active', !user.active, user);
      const updatedUsers = assoc(action.userId, updatedUser, state.users);
      return assoc('users', updatedUsers, state);
    }

    case 'SET_LOADING':
      return assoc('loading', action.loading, state);

    case 'SET_ERROR':
      return assoc('error', action.error, state);

    default:
      return state;
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      pipe를 사용한 중첩 업데이트
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc, pipe } from 'fp-pack';

interface Address {
  street: string;
  city: string;
  country: string;
}

interface User {
  id: number;
  name: string;
  address: Address;
}

const user: User = {
  id: 1,
  name: 'Alice',
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA'
  }
};

// 중첩된 속성 업데이트
const updateCity = (newCity: string, user: User): User => {
  const updatedAddress = assoc('city', newCity, user.address);
  return assoc('address', updatedAddress, user);
};

const movedUser = updateCity('San Francisco', user);
// {
//   id: 1,
//   name: 'Alice',
//   address: { street: '123 Main St', city: 'San Francisco', country: 'USA' }
// }

// pipe를 사용한 여러 업데이트
const updateUserInfo = pipe(
  (u: User) => assoc('name', 'Bob', u),
  (u: User) => {
    const addr = assoc('city', 'Los Angeles', u.address);
    return assoc('address', addr, u);
  }
);

const updated = updateUserInfo(user);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      불변 배열 업데이트
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 1, text: 'TypeScript 배우기', completed: true },
  { id: 2, text: '앱 만들기', completed: false },
  { id: 3, text: '프로덕션 배포', completed: false }
];

// 두 번째 할 일의 완료 상태 토글
const toggleTodo = (index: number, todos: Todo[]): Todo[] => {
  const todo = todos[index];
  const updated = assoc('completed', !todo.completed, todo);
  return assoc(index, updated, todos);
};

const toggled = toggleTodo(1, todos);
// [
//   { id: 1, text: 'TypeScript 배우기', completed: true },
//   { id: 2, text: '앱 만들기', completed: true },  // 변경됨!
//   { id: 3, text: '프로덕션 배포', completed: false }
// ]

// 원본은 변경되지 않음
console.log(todos[1].completed); // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      설정 업데이트
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  headers: Record<string, string>;
}

const defaultConfig: ApiConfig = {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json'
  }
};

// 개발 설정 생성
const devConfig = assoc('baseUrl', 'http://localhost:3000', defaultConfig);

// 커스텀 타임아웃 설정 생성
const slowConfig = assoc('timeout', 30000, defaultConfig);

// 인증 헤더 추가
const withAuth = (token: string, config: ApiConfig): ApiConfig => {
  const newHeaders = assoc('Authorization', \`Bearer \${token}\`, config.headers);
  return assoc('headers', newHeaders, config);
};

const authenticatedConfig = withAuth('abc123', defaultConfig);
// {
//   baseUrl: 'https://api.example.com',
//   timeout: 5000,
//   retries: 3,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer abc123'
//   }
// }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      타입 안전 속성 업데이트
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const product: Product = {
  id: 1,
  name: '노트북',
  price: 999,
  inStock: true
};

// 컴파일 타임에 TypeScript가 타입 안전성을 보장합니다
const discounted = assoc('price', 799, product);
//    ^? const discounted: Product

const renamed = assoc('name', '게이밍 노트북', product);
//    ^? const renamed: Product

const outOfStock = assoc('inStock', false, product);
//    ^? const outOfStock: Product

// ❌ 컴파일 타임에 타입 에러가 감지됩니다:
// const wrong1 = assoc('price', '무료', product);
//                               ^^^^^^ Error: Argument of type 'string' is not assignable to parameter of type 'number'

// const wrong2 = assoc('inStock', '예', product);
//                                 ^^^^^ Error: Argument of type 'string' is not assignable to parameter of type 'boolean'

// const wrong3 = assoc('nonExistent', 'value', product);
//                      ^^^^^^^^^^^^^ Error: Argument of type '"nonExistent"' is not assignable

// ✓ 새 속성을 추가하면 타입이 확장됩니다
const withCategory = assoc('category', '전자제품', product);
//    ^? const withCategory: Product & Record<'category', string>

// 이제 category는 타입 안전합니다
const cat: string = withCategory.category; // ✓ OK
// const num: number = withCategory.category; // ❌ Error

// 추가 타입 안전성을 위해 satisfies 사용
const validated = assoc('price', 899, product) satisfies Product;
//    ^? const validated: Product

// 명시적 타입 제어를 위한 제네릭
function updateProduct<K extends keyof Product>(
  key: K,
  value: Product[K],
  product: Product
): Product {
  return assoc(key, value, product);
}

const updated = updateProduct('price', 799, product); // ✓ OK
// updateProduct('price', '799', product); // ❌ Error: string을 number에 할당할 수 없음`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 assoc를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 불변성 보장
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          원본 데이터를 절대 변경하지 않아 예상치 못한 부작용으로 인한 버그를 방지하고 상태 변경을 예측 가능하게 만듭니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 타입 안전성
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          완전한 TypeScript 지원으로 속성에 잘못된 타입을 실수로 할당할 수 없습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 객체와 배열 모두 지원
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          단일 함수가 객체 속성과 배열 요소를 모두 처리하여 인지 부하를 줄입니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 함수형 프로그래밍 패턴
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          깔끔한 함수형 업데이트 패턴을 가능하게 하며, Redux 리듀서와 React 상태 관리에 완벽합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          5. 조합 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          여러 assoc 호출을 쉽게 체이닝하거나 pipe와 함께 사용하여 복잡한 변환을 수행할 수 있습니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function assoc<T, K extends string | number | symbol, V>(
  key: K,
  value: V,
  obj: T
): AssocResult<T, K, V> {
  if (Array.isArray(obj)) {
    const result = obj.slice();
    result[key] = value;
    return result;
  }

  if (obj && typeof obj === 'object') {
    return {
      ...(obj as object),
      [key]: value,
    };
  }

  return { [key]: value };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>키, 값, 그리고 업데이트할 객체/배열을 받습니다</li>
        <li>배열의 경우: slice()를 사용하여 얕은 복사본을 생성하고 인덱스를 업데이트합니다</li>
        <li>객체의 경우: 스프레드 연산자를 사용하여 속성이 업데이트된 얕은 복사본을 생성합니다</li>
        <li>원본을 변경하지 않고 새 데이터 구조를 반환합니다</li>
        <li>TypeScript 타입이 전반적으로 타입 안전성을 보장합니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/object/assocPath"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/assocPath');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          assocPath →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          깊이 중첩된 속성을 불변 방식으로 설정.
        </p>
      </a>

      <a
        href="/object/dissoc"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/dissoc');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          dissoc →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          불변 방식으로 속성 제거 - assoc의 반대.
        </p>
      </a>

      <a
        href="/object/path"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/path');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          path →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          중첩된 속성을 안전하게 읽기.
        </p>
      </a>

      <a
        href="/object/merge"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/merge');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          merge →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          불변 방식으로 객체 결합.
        </p>
      </a>
    </div>
  </div>
);
