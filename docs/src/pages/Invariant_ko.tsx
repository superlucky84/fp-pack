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
      code={`import { invariant } from 'fp-kit';

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
      code={`import { invariant } from 'fp-kit';

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
      code={`import { invariant } from 'fp-kit';

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
      code={`import { invariant } from 'fp-kit';

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
      code={`import { invariant } from 'fp-kit';

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
      code={`import { invariant, pipe } from 'fp-kit';

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
      code={`import { invariant } from 'fp-kit';

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
      code={`import { invariant } from 'fp-kit';

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
      code={`import { invariant } from 'fp-kit';

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
      다음 단계
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        관련된 디버깅 및 검증 함수들을 시도해보세요:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/debug/assert');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            assert
          </a>{' '}
          - 일반적인 조건 검사를 위한 유사 함수
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/control/guard');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            guard
          </a>{' '}
          - 조건 실패 시 기본값 반환 (에러를 발생시키지 않는 대안)
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/debug/log');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            log
          </a>{' '}
          - 값을 기록하고 그대로 전달
        </li>
      </ul>
    </div>
  </div>
);
