import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Partial_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      partial
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      함수의 인자를 미리 고정하여 특수화된 버전 생성
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      partial이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        partial
      </strong>{' '}
      은 기존 함수의 일부 앞쪽 인자들을 고정하여 새로운 함수를 생성합니다.
      <br />
      <br />
      순차적인 인자 적용을 가능하게 하는 <strong>curry</strong>와 달리, partial은
      <strong>특정 인자들을 한 번에 미리 설정</strong>하여 나머지 매개변수만 필요로 하는
      특수화된 함수를 만듭니다.
      <br />
      <br />
      이는 설정, 의존성 주입, 특수화된 유틸리티 함수 생성에 완벽합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

// 원본 함수
const greet = (greeting: string, name: string, punctuation: string) =>
  \`\${greeting}, \${name}\${punctuation}\`;

greet('Hello', 'Alice', '!');  // "Hello, Alice!"

// 인사말 미리 설정
const sayHello = partial(greet, 'Hello');
sayHello('Bob', '!');      // "Hello, Bob!"

// 인사말과 이름 미리 설정
const sayHelloAlice = partial(greet, 'Hello', 'Alice');
sayHelloAlice('!');        // "Hello, Alice!"
sayHelloAlice('.');        // "Hello, Alice."`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function partial<Args extends any[], Rest extends any[], R>(
  fn: (...args: [...Args, ...Rest]) => R,
  ...preset: Args
): (...rest: Rest) => R;

// Args: 미리 설정할 인자들
// Rest: 새 함수가 받을 나머지 인자들
// R: 반환 타입`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      partial은 미리 설정된 인자와 나머지 인자에 대한 타입 추론을 완벽하게 지원합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 예제
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

// 수학 연산
const add3 = (a: number, b: number, c: number) => a + b + c;
const add5and10 = partial(add3, 5, 10);

add5and10(3);   // 18 (5 + 10 + 3)
add5and10(7);   // 22 (5 + 10 + 7)

// 문자열 포맷팅
const format = (template: string, value1: string, value2: string) =>
  template.replace('{0}', value1).replace('{1}', value2);

const userFormat = partial(format, 'User: {0}, Role: {1}');
userFormat('Alice', 'Admin');    // "User: Alice, Role: Admin"
userFormat('Bob', 'Editor');     // "User: Bob, Role: Editor"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 연산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

// 파이프라인과 함께 사용하기 위해 데이터를 마지막에
const sliceFrom = (start: number, end: number, arr: any[]) =>
  arr.slice(start, end);

const takeFirst3 = partial(sliceFrom, 0, 3);
const skipFirst2 = partial(sliceFrom, 2, 999);

const numbers = [1, 2, 3, 4, 5];

takeFirst3(numbers);    // [1, 2, 3]
skipFirst2(numbers);    // [3, 4, 5]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      API 클라이언트 설정
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

// 범용 fetch 함수
const apiFetch = async (
  baseUrl: string,
  headers: Record<string, string>,
  endpoint: string,
  options?: RequestInit
) => {
  return fetch(\`\${baseUrl}\${endpoint}\`, {
    ...options,
    headers: { ...headers, ...options?.headers },
  });
};

// 프로덕션 API 설정
const apiHeaders = {
  'Authorization': 'Bearer token123',
  'Content-Type': 'application/json',
};

const productionApi = partial(
  apiFetch,
  'https://api.example.com',
  apiHeaders
);

// 이제 엔드포인트만 사용하면 됩니다
productionApi('/users');
productionApi('/posts', { method: 'POST', body: '...' });`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      이벤트 핸들러
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

// 범용 핸들러
const handleAction = (
  type: string,
  logger: (msg: string) => void,
  event: Event
) => {
  logger(\`\${type} action triggered\`);
  // 이벤트 처리...
};

const consoleLogger = (msg: string) => console.log(msg);

// 특수화된 핸들러 생성
const handleClick = partial(handleAction, 'click', consoleLogger);
const handleSubmit = partial(handleAction, 'submit', consoleLogger);

// 이벤트 리스너에서 사용
button.addEventListener('click', handleClick);
form.addEventListener('submit', handleSubmit);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      검증 함수
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

const validate = (
  ruleName: string,
  errorMessage: string,
  predicate: (value: any) => boolean,
  value: any
) => {
  if (!predicate(value)) {
    throw new Error(\`[\${ruleName}] \${errorMessage}\`);
  }
  return value;
};

// 검증자 생성
const validateRequired = partial(
  validate,
  'required',
  '이 필드는 필수입니다',
  (v: any) => v != null && v !== ''
);

const validateEmail = partial(
  validate,
  'email',
  '유효하지 않은 이메일 형식',
  (v: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)
);

const validateMinLength = (min: number) => partial(
  validate,
  'minLength',
  \`최소 \${min}자 이상이어야 합니다\`,
  (v: string) => v.length >= min
);

// 검증자 사용
validateRequired('hello');           // "hello"
validateRequired('');                // 에러!
validateEmail('test@example.com');   // "test@example.com"
validateEmail('invalid');            // 에러!

const validate8Chars = validateMinLength(8);
validate8Chars('password');          // "password"
validate8Chars('short');             // 에러!`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      partial과 pipe 결합
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      partial은 데이터 처리 파이프라인을 만드는 데 pipe와 함께 훌륭하게 작동합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, partial } from 'fp-pack';

// 데이터 변환 함수 (참고: 데이터가 마지막에!)
const filterBy = <T>(predicate: (item: T) => boolean, arr: T[]) =>
  arr.filter(predicate);

const mapTo = <T, U>(fn: (item: T) => U, arr: T[]) =>
  arr.map(fn);

const sortBy = <T>(fn: (item: T) => any, arr: T[]) =>
  [...arr].sort((a, b) => {
    const aVal = fn(a);
    const bVal = fn(b);
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  });

interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

// partial로 파이프라인 생성
const processProducts = pipe(
  partial(filterBy, (p: Product) => p.inStock),
  partial(sortBy, (p: Product) => p.price),
  partial(mapTo, (p: Product) => p.name)
);

const products: Product[] = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true },
  { name: 'Monitor', price: 300, inStock: true },
];

processProducts(products);
// ["Keyboard", "Monitor", "Laptop"]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      partial vs curry
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          partial - 인자 미리 설정
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200 mb-2">
          여러 앞쪽 인자를 한 번에 고정합니다. 나머지 인자를 받는 일반 함수를 반환합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`const add3 = (a: number, b: number, c: number) => a + b + c;
const add10and20 = partial(add3, 10, 20);
add10and20(5);  // 35 (10 + 20 + 5)`}
        />
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          curry - 순차적 적용
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200 mb-2">
          인자를 한 번에 하나씩 또는 모두 한 번에 적용합니다. 각 부분 적용은 또 다른 커리된 함수를 반환합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`const add3 = curry((a: number, b: number, c: number) => a + b + c);
add3(10)(20)(5);     // 35
add3(10, 20)(5);     // 35
add3(10)(20, 5);     // 35`}
        />
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          언제 무엇을 사용할까요?
        </h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li><strong>partial 사용</strong>: 설정, 의존성 주입, 여러 인자 고정</li>
          <li><strong>curry 사용</strong>: 유연한 조합, 포인트 프리 스타일, 함수형 파이프라인</li>
        </ul>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부 사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      partial은 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">this</code> 컨텍스트를
      보존하고 미리 설정된 인자와 런타임 인자를 결합합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`function partial<Args extends any[], Rest extends any[], R>(
  fn: (...args: [...Args, ...Rest]) => R,
  ...preset: Args
): (...rest: Rest) => R {
  return function partiallyApplied(this: unknown, ...rest: Rest) {
    const all = [...preset, ...rest] as [...Args, ...Rest];
    return fn.apply(this as any, all);
  };
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">fn.apply(this, ...)</code> 사용으로
      메서드 호출 시 컨텍스트가 보존됩니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">partial</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/partial.ts"
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
          순차적 인자 적용을 위한 대안적 접근 방식.
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
          부분 적용된 함수를 파이프라인으로 결합.
        </p>
      </a>

      <a
        href="/composition/flip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/flip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          flip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          더 나은 합성을 위해 인자 순서를 반대로.
        </p>
      </a>
    </div>
  </div>
);
