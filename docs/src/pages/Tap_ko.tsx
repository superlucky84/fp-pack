import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Tap_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      tap
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값을 변경하지 않고 부수 효과 실행
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      tap이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        tap
      </strong>{' '}
      은 파이프라인 중간에 부수 효과(로깅, 디버깅, 검증 등)를 수행하면서 값을
      변경하지 않고 그대로 전달할 수 있게 합니다.
      <br />
      <br />
      값을 받아 어떤 작업을 수행하는 함수를 받은 다음, 원본 값을 수정하지 않고
      반환합니다. 이는 <strong>파이프라인 디버깅</strong>, <strong>중간 값 로깅</strong>,
      그리고 <strong>검증 수행</strong>에 완벽합니다.
      <br />
      <br />
      "tap"이라는 이름은 흐르는 데이터를 방해하지 않고 관찰하거나 작동하기 위해
      파이프라인에 "tap into(탭 연결)"한다는 아이디어에서 유래했습니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { tap, pipe } from 'fp-pack';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;

const calculate = pipe(
  double,
  tap(x => console.log('double 후:', x)),  // 로그만 출력, 값은 변경 안 함
  addTen,
  tap(x => console.log('addTen 후:', x))   // 로그만 출력, 값은 변경 안 함
);

calculate(5);
// 로그: "double 후: 10"
// 로그: "addTen 후: 20"
// 반환: 20`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function tap<T>(fn: (value: T) => void): (value: T) => T;

// 값을 받고 void를 반환하는 함수를 받음
// 값을 변경하지 않고 전달하는 함수를 반환`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      부수 효과 함수는 값을 받지만 반환 값은 무시됩니다. tap은 항상 원본 입력 값을 반환합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 로깅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tap } from 'fp-pack';

const logValue = tap((x: number) => {
  console.log('현재 값:', x);
});

const result = logValue(42);
// 로그: "현재 값: 42"
// 반환: 42

console.log(result);  // 42`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프라인에서 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

const processNumber = pipe(
  (n: number) => n * 2,
  tap(x => console.log('2배:', x)),
  (n: number) => n + 5,
  tap(x => console.log('5 더함:', x)),
  (n: number) => n.toString()
);

const result = processNumber(10);
// 로그: "2배: 20"
// 로그: "5 더함: 25"
// 반환: "25"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      데이터 변환 디버깅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', active: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', active: false },
  { id: 3, name: 'Carol', email: 'carol@example.com', active: true },
];

const processUsers = pipe(
  tap((users: User[]) => console.log('입력 사용자:', users.length)),
  (users: User[]) => users.filter(u => u.active),
  tap((users: User[]) => console.log('활성 사용자:', users.length)),
  (users: User[]) => users.map(u => u.email),
  tap((emails: string[]) => console.log('이메일:', emails))
);

const result = processUsers(users);
// 로그: "입력 사용자: 3"
// 로그: "활성 사용자: 2"
// 로그: "이메일: ['alice@example.com', 'carol@example.com']"
// 반환: ['alice@example.com', 'carol@example.com']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프라인에서 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

const validatePositive = tap((n: number) => {
  if (n <= 0) {
    throw new Error(\`양수를 기대했지만 \${n}을 받았습니다\`);
  }
});

const validateNotNaN = tap((n: number) => {
  if (isNaN(n)) {
    throw new Error('값이 NaN입니다');
  }
});

const safeDivide = (divisor: number) => pipe(
  validateNotNaN,
  validatePositive,
  (n: number) => n / divisor
);

safeDivide(2)(10);  // 5
safeDivide(2)(0);   // 에러: 양수를 기대했지만 0을 받았습니다
safeDivide(2)(NaN); // 에러: 값이 NaN입니다`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      분석 및 추적
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

// 모의 분석 함수
const trackEvent = (event: string, data: any) => {
  console.log(\`[분석] \${event}\`, data);
};

interface Order {
  id: string;
  items: string[];
  total: number;
}

const processOrder = pipe(
  tap((order: Order) => trackEvent('order.started', { orderId: order.id })),
  (order: Order) => ({
    ...order,
    total: order.items.length * 10,
  }),
  tap((order: Order) => trackEvent('order.calculated', {
    orderId: order.id,
    total: order.total
  })),
  (order: Order) => {
    // 데이터베이스에 저장
    return { ...order, saved: true };
  },
  tap((order: Order) => trackEvent('order.completed', { orderId: order.id }))
);

const order = {
  id: 'ORD-123',
  items: ['item1', 'item2', 'item3'],
  total: 0,
};

processOrder(order);
// 로그: "[분석] order.started { orderId: 'ORD-123' }"
// 로그: "[분석] order.calculated { orderId: 'ORD-123', total: 30 }"
// 로그: "[분석] order.completed { orderId: 'ORD-123' }"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      캐시 워밍
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

const cache = new Map<string, any>();

const warmCache = <T>(key: string) => tap((data: T) => {
  console.log(\`키로 데이터 캐싱: \${key}\`);
  cache.set(key, data);
});

interface ApiResponse {
  data: any[];
  timestamp: number;
}

const fetchAndCache = (endpoint: string) => pipe(
  (endpoint: string) => fetch(endpoint),
  (response: Response) => response.json(),
  warmCache<ApiResponse>(\`api:\${endpoint}\`),
  (data: ApiResponse) => data.data
);

// 데이터가 흐르는 동안 부수 효과로 캐시됩니다
const data = await fetchAndCache('/api/users');`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      변이 감지 (개발 환경)
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

// 개발 환경에서 변이를 감지하는 헬퍼
const detectMutation = <T extends object>(label: string) => {
  if (process.env.NODE_ENV !== 'development') {
    return tap(() => {});
  }

  let snapshot: string;

  return tap((value: T) => {
    const current = JSON.stringify(value);

    if (!snapshot) {
      snapshot = current;
    } else if (snapshot !== current) {
      console.warn(\`[\${label}] 변이가 감지되었습니다!\`);
      console.warn('이전:', snapshot);
      console.warn('이후:', current);
    }
  });
};

const processData = pipe(
  detectMutation('시작'),
  (data: any[]) => data.map(x => ({ ...x, processed: true })),
  detectMutation('map 후'),
  (data: any[]) => data.filter(x => x.active),
  detectMutation('filter 후')
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      일반적인 패턴
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      조건부 로깅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tap } from 'fp-pack';

const debugLog = <T>(label: string) =>
  tap((value: T) => {
    if (process.env.DEBUG) {
      console.log(\`[DEBUG] \${label}:\`, value);
    }
  });

const verboseLog = <T>(label: string) =>
  tap((value: T) => {
    if (process.env.VERBOSE) {
      console.log(\`[VERBOSE] \${label}:\`, JSON.stringify(value, null, 2));
    }
  });`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      성능 모니터링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

const measureTime = (label: string) => {
  let startTime: number;

  return {
    start: tap(() => {
      startTime = performance.now();
    }),
    end: tap(() => {
      const duration = performance.now() - startTime;
      console.log(\`\${label} 소요 시간: \${duration.toFixed(2)}ms\`);
    }),
  };
};

const timer = measureTime('데이터 처리');

const processData = pipe(
  timer.start,
  (data: number[]) => data.map(x => x * 2),
  (data: number[]) => data.filter(x => x > 10),
  (data: number[]) => data.reduce((sum, x) => sum + x, 0),
  timer.end
);

processData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// 로그: "데이터 처리 소요 시간: 0.23ms"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      상태 업데이트
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

let state = {
  count: 0,
  lastValue: null as any,
};

const updateState = <T>(update: (value: T) => void) => tap(update);

const processValue = pipe(
  (n: number) => n * 2,
  updateState((n: number) => {
    state.count++;
    state.lastValue = n;
  }),
  (n: number) => n + 10
);

processValue(5);  // 20 반환, state = { count: 1, lastValue: 10 }
processValue(3);  // 16 반환, state = { count: 2, lastValue: 6 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 tap을 사용하나요?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. 비침습적 디버깅
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          파이프라인 구조를 변경하지 않고 로깅을 추가하거나 제거할 수 있습니다.
          데이터 흐름을 깨지 않고 중간 값을 디버그할 수 있습니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 관심사 분리
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          부수 효과(로깅, 분석, 캐싱)를 주요 데이터 변환 로직과 분리합니다.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. 파이프라인 관찰성
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          변환 로직을 수정하지 않고 파이프라인을 통과하는 데이터를 모니터링하고
          관찰할 수 있습니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. 불변성 보존
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          값이 변경되지 않고 전달되도록 보장하면서 부수 효과를 수행하여
          함수형 프로그래밍 원칙을 유지합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부 사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      tap은 우아하게 단순합니다 - 부수 효과를 실행하고 원본 값을 반환합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`function tap<T>(fn: (value: T) => void): (value: T) => T {
  return (value: T) => {
    fn(value);
    return value;
  };
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      부수 효과 함수의 반환 값은 완전히 무시됩니다. 원본 값은 항상 변경되지 않고 흐릅니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">tap</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/tap.ts"
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
          디버깅에 tap이 뛰어난 파이프라인 구축.
        </p>
      </a>

      <a
        href="/composition/identity"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/identity');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          identity →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          사이드 이펙트 없이 값을 전달.
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
          빠른 콘솔 로깅 - 특화된 tap.
        </p>
      </a>
    </div>
  </div>
);
