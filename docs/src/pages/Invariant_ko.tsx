import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Invariant_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      invariant
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      코드의 불변식과 계약 강제
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      invariant란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        invariant
      </strong>{' '}
      는 조건이 참인지 검증하고, 거짓이면 에러를 발생시킵니다.{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">assert</code>와 유사하지만,
      특히 코드의 불변식과 계약을 강제하는 데 주로 사용됩니다.
      <br />
      <br />
      이는 <strong>계약 강제</strong>, <strong>상태 검증</strong>,
      <strong>API 경계</strong>, 그리고 <strong>중요한 가정</strong>에 유용합니다.
      <br />
      <br />
      "이 불변식은 항상 참이어야 하며, 그렇지 않으면 프로그램이 유효하지 않은 상태에 있다"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-pack';

function processUser(user: User | null) {
  invariant(user !== null, '이 시점에서 사용자는 반드시 존재해야 합니다');
  // 이제 user를 안전하게 사용할 수 있습니다
  return user.name;
}

processUser({ name: 'John' });  // 'John'
processUser(null);               // Error: 이 시점에서 사용자는 반드시 존재해야 합니다`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function invariant(
  condition: boolean,
  message?: string
): void;

// boolean 조건과 선택적 에러 메시지를 받음
// 조건이 거짓이면 에러를 발생
// 조건이 참이면 아무것도 반환하지 않음 (void)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 불변식
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-pack';

// 메시지 없는 기본 불변식
invariant(true);   // 에러 없음
invariant(false);  // Error: Invariant failed

// 사용자 정의 메시지와 함께
const value = getValue();
invariant(value !== null, '이 시점에서 값은 절대 null이 될 수 없습니다');`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      상태 불변식
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-pack';

class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
    // count는 항상 음수가 아니어야 함 (불변식)
    invariant(this.count >= 0, '카운터 불변식 위반');
  }

  decrement(): void {
    this.count--;
    // count는 항상 음수가 아니어야 함 (불변식)
    invariant(this.count >= 0, '카운터 불변식 위반');
  }

  getCount(): number {
    return this.count;
  }
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      자료구조 불변식
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-pack';

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
    this.checkInvariant();
  }

  pop(): T {
    invariant(this.items.length > 0, '빈 스택에서 pop할 수 없습니다');
    const item = this.items.pop()!;
    this.checkInvariant();
    return item;
  }

  private checkInvariant(): void {
    // 스택의 크기는 절대 음수가 될 수 없음
    invariant(this.items.length >= 0, '스택 크기 불변식 위반');
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.pop();  // 2
stack.pop();  // 1
stack.pop();  // Error: 빈 스택에서 pop할 수 없습니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 계약 강제
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-pack';

interface ApiConfig {
  apiKey: string;
  endpoint: string;
}

class ApiClient {
  private config: ApiConfig | null = null;

  configure(config: ApiConfig): void {
    invariant(config.apiKey.length > 0, 'API 키는 비어있을 수 없습니다');
    invariant(config.endpoint.startsWith('https://'), '엔드포인트는 HTTPS를 사용해야 합니다');
    this.config = config;
  }

  makeRequest(path: string): Promise<any> {
    // 계약: makeRequest 전에 configure가 반드시 호출되어야 함
    invariant(this.config !== null, '요청 전에 클라이언트를 먼저 설정해야 합니다');

    return fetch(\`\${this.config.endpoint}\${path}\`, {
      headers: { 'Authorization': \`Bearer \${this.config.apiKey}\` }
    });
  }
}

const client = new ApiClient();
client.makeRequest('/users');  // Error: 요청 전에 클라이언트를 먼저 설정해야 합니다

client.configure({ apiKey: 'key123', endpoint: 'https://api.example.com' });
client.makeRequest('/users');  // OK`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      pipe로 계약 검증하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant, pipe } from 'fp-pack';

const ensureNonEmpty = (s: string) => {
  invariant(s.length > 0, '입력은 비어 있을 수 없습니다');
  return s;
};

const normalizeUserId = pipe(
  (raw: string) => raw.trim(),
  ensureNonEmpty,
  (raw) => raw.toLowerCase()
);

normalizeUserId(' Alice '); // 'alice'
normalizeUserId('   ');     // Error: 입력은 비어 있을 수 없습니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      상태 머신 불변식
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-pack';

type State = 'idle' | 'loading' | 'success' | 'error';

class StateMachine {
  private state: State = 'idle';
  private data: any = null;
  private error: Error | null = null;

  startLoading(): void {
    invariant(this.state === 'idle', 'idle 상태에서만 로딩을 시작할 수 있습니다');
    this.state = 'loading';
    this.checkInvariant();
  }

  setSuccess(data: any): void {
    invariant(this.state === 'loading', 'loading 상태에서만 성공으로 전환할 수 있습니다');
    this.state = 'success';
    this.data = data;
    this.error = null;
    this.checkInvariant();
  }

  setError(error: Error): void {
    invariant(this.state === 'loading', 'loading 상태에서만 에러로 전환할 수 있습니다');
    this.state = 'error';
    this.error = error;
    this.data = null;
    this.checkInvariant();
  }

  private checkInvariant(): void {
    // 불변식: success 상태는 반드시 데이터를 가져야 함
    if (this.state === 'success') {
      invariant(this.data !== null, 'success 상태는 데이터를 가져야 합니다');
      invariant(this.error === null, 'success 상태는 에러를 가져서는 안 됩니다');
    }

    // 불변식: error 상태는 반드시 에러를 가져야 함
    if (this.state === 'error') {
      invariant(this.error !== null, 'error 상태는 에러를 가져야 합니다');
      invariant(this.data === null, 'error 상태는 데이터를 가져서는 안 됩니다');
    }
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 연산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-pack';

function partition<T>(arr: T[], size: number): T[][] {
  invariant(size > 0, '파티션 크기는 양수여야 합니다');
  invariant(Number.isInteger(size), '파티션 크기는 정수여야 합니다');

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  // 불변식: 결과는 필요한 것보다 많은 파티션을 가져서는 안 됨
  const maxPartitions = Math.ceil(arr.length / size);
  invariant(result.length <= maxPartitions, '파티션 개수 불변식 위반');

  return result;
}

partition([1, 2, 3, 4, 5], 2);   // [[1, 2], [3, 4], [5]]
partition([1, 2, 3], 0);          // Error: 파티션 크기는 양수여야 합니다
partition([1, 2, 3], 1.5);        // Error: 파티션 크기는 정수여야 합니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비즈니스 로직 불변식
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-pack';

interface Order {
  id: string;
  items: Array<{ price: number; quantity: number }>;
  discount: number;
  total: number;
}

function validateOrder(order: Order): void {
  invariant(order.items.length > 0, '주문은 최소 하나의 상품을 가져야 합니다');
  invariant(order.discount >= 0, '할인은 음수가 될 수 없습니다');
  invariant(order.discount <= 1, '할인은 100%를 초과할 수 없습니다');

  // 예상 총액 계산
  const subtotal = order.items.reduce((sum, item) => {
    invariant(item.price > 0, '상품 가격은 양수여야 합니다');
    invariant(item.quantity > 0, '상품 수량은 양수여야 합니다');
    return sum + item.price * item.quantity;
  }, 0);

  const expectedTotal = subtotal * (1 - order.discount);

  // 불변식: 총액은 계산과 일치해야 함
  invariant(
    Math.abs(order.total - expectedTotal) < 0.01,
    \`주문 총액 불변식 위반: 예상 \${expectedTotal}, 실제 \${order.total}\`
  );
}

validateOrder({
  id: 'order-1',
  items: [{ price: 10, quantity: 2 }],
  discount: 0.1,
  total: 18,
});  // OK

validateOrder({
  id: 'order-2',
  items: [{ price: 10, quantity: 2 }],
  discount: 0.1,
  total: 20,
});  // Error: 주문 총액 불변식 위반`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 invariant를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 계약 강제
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          코드가 의존하는 계약과 가정을 명확하게 표현하고 강제합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 조기 발견
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          위반이 발생하는 즉시 포착하여 버그를 추적하기 쉽게 만듭니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 자체 문서화 코드
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          불변식은 코드의 기대사항과 제약사항에 대한 실행 가능한 문서로 작동합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 의미론적 명확성
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          "assert" 대신 "invariant"를 사용하면 불변식 조건을 확인하고 있음을 명확하게 표현합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function invariant(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message ?? 'Invariant failed');
  }
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>boolean 조건과 선택적 에러 메시지를 받습니다</li>
        <li>조건이 거짓이면 제공된 메시지와 함께 Error를 발생시킵니다</li>
        <li>메시지가 제공되지 않으면 기본값인 "Invariant failed"를 사용합니다</li>
        <li>조건이 참이면 아무것도 하지 않고 void를 반환합니다</li>
        <li>assert와 구현은 동일하지만, 의미론적으로 다른 용도로 사용됩니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">invariant</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/debug/invariant.ts"
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
        href="/debug/assert"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/debug/assert');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          assert →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          일반 조건 검증 - 더 넓은 범위의 검증 유틸리티입니다.
        </p>
      </a>

      <a
        href="/control/guard"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/guard');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          guard →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          실패 시 기본값 반환 - 에러를 발생시키지 않는 안전 패턴입니다.
        </p>
      </a>

      <a
        href="/debug/log"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/debug/log');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          log →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          값을 로깅하고 전달 - 디버깅 동반자입니다.
        </p>
      </a>

      <a
        href="/control/tryCatch"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/tryCatch');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          tryCatch →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          예외를 함수형으로 처리 - 안전한 오류 처리입니다.
        </p>
      </a>
    </div>
  </div>
);
