import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Cond_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      cond
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      여러 분기를 가진 조건부 로직을 생성합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      cond란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        cond
      </strong>{' '}
      는 여러 조건을 순서대로 평가하고 첫 번째로 일치하는 분기의 결과를 반환하는 함수를 생성합니다.
      <br />
      <br />
      이는 <code>switch</code> 문이나 긴 <code>if-else</code> 체인의 함수형 대안입니다.
      조건-핸들러 쌍의 배열을 제공하면, cond는 각 조건을 순서대로 테스트하여 하나가 일치할 때까지 진행합니다.
      조건이 참일 때 해당 핸들러가 입력 값과 함께 실행됩니다.
      <br />
      <br />
      이는 복잡한 조건부 로직을 읽기 쉽고 테스트하기 쉬우며 다른 함수형 유틸리티와 조합하기 쉬운
      깨끗하고 선언적인 방식으로 표현할 수 있게 해줍니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-pack';

const classify = cond<number, string>([
  [n => n < 0,    n => '음수'],
  [n => n === 0,  n => '영'],
  [n => n > 0,    n => '양수']
]);

classify(-5);  // '음수'
classify(0);   // '영'
classify(10);  // '양수'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 조건
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-pack';

// 숫자 분류
const describe = cond<number, string>([
  [n => n > 10,  () => '큼'],
  [n => n > 5,   () => '중간'],
  [n => n > 0,   () => '작음'],
  [() => true,   () => '영 또는 음수']
]);

describe(15);  // '큼'
describe(7);   // '중간'
describe(3);   // '작음'
describe(-1);  // '영 또는 음수'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      핸들러에서 값 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-pack';

// 핸들러는 원본 값을 받음
const calculate = cond<number, number>([
  [n => n % 2 === 0,  n => n * 2],    // 짝수는 두 배
  [n => n % 3 === 0,  n => n * 3],    // 3의 배수는 세 배
  [() => true,        n => n + 1]     // 나머지는 1 더하기
]);

calculate(4);   // 8  (4 * 2)
calculate(9);   // 27 (9 * 3)
calculate(7);   // 8  (7 + 1)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      매치 없을 때 undefined 반환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-pack';

const onlyPositive = cond<number, string>([
  [n => n > 0, n => \`양수: \${n}\`]
]);

onlyPositive(5);   // '양수: 5'
onlyPositive(-5);  // undefined
onlyPositive(0);   // undefined

// 전체 조건으로 기본값 제공
const withDefault = cond<number, string>([
  [n => n > 0,   n => \`양수: \${n}\`],
  [() => true,   n => \`양수 아님: \${n}\`]  // 기본 케이스
]);

withDefault(-5);   // '양수 아님: -5'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      HTTP 상태 코드 핸들러
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-pack';

interface Response {
  status: number;
  data?: any;
  error?: string;
}

const handleResponse = cond<Response, string>([
  [res => res.status === 200,             res => \`성공: \${JSON.stringify(res.data)}\`],
  [res => res.status === 201,             res => '리소스가 성공적으로 생성됨'],
  [res => res.status === 400,             res => \`잘못된 요청: \${res.error}\`],
  [res => res.status === 401,             () => '인증 필요 - 로그인하세요'],
  [res => res.status === 404,             () => '리소스를 찾을 수 없음'],
  [res => res.status >= 500,              res => \`서버 오류: \${res.status}\`],
  [() => true,                            res => \`알 수 없는 상태: \${res.status}\`]
]);

handleResponse({ status: 200, data: { id: 1 } });
// '성공: {"id":1}'

handleResponse({ status: 404 });
// '리소스를 찾을 수 없음'

handleResponse({ status: 500, error: '내부 오류' });
// '서버 오류: 500'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      사용자 역할 권한
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-pack';

interface User {
  role: 'admin' | 'editor' | 'viewer';
  isPremium: boolean;
}

const canEdit = cond<User, boolean>([
  [user => user.role === 'admin',                          () => true],
  [user => user.role === 'editor' && user.isPremium,       () => true],
  [user => user.role === 'editor' && !user.isPremium,      () => false],
  [() => true,                                             () => false]
]);

canEdit({ role: 'admin', isPremium: false });      // true
canEdit({ role: 'editor', isPremium: true });      // true
canEdit({ role: 'editor', isPremium: false });     // false
canEdit({ role: 'viewer', isPremium: true });      // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      할인 계산기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-pack';

interface Order {
  amount: number;
  items: number;
  isVip: boolean;
}

const calculateDiscount = cond<Order, number>([
  [order => order.isVip && order.amount > 1000,    order => order.amount * 0.25],
  [order => order.isVip,                           order => order.amount * 0.15],
  [order => order.amount > 1000,                   order => order.amount * 0.20],
  [order => order.amount > 500,                    order => order.amount * 0.10],
  [order => order.items >= 5,                      order => order.amount * 0.05],
  [() => true,                                     () => 0]
]);

calculateDiscount({ amount: 1500, items: 3, isVip: true });
// 375 (1500의 25%)

calculateDiscount({ amount: 800, items: 10, isVip: false });
// 80 (800의 10%)

calculateDiscount({ amount: 100, items: 6, isVip: false });
// 5 (100의 5%)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      폼 유효성 검사
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-pack';

interface FormData {
  email: string;
  password: string;
  age?: number;
}

const validateForm = cond<FormData, { valid: boolean; error?: string }>([
  [
    data => !data.email,
    () => ({ valid: false, error: '이메일이 필요합니다' })
  ],
  [
    data => !data.email.includes('@'),
    () => ({ valid: false, error: '이메일이 유효해야 합니다' })
  ],
  [
    data => !data.password,
    () => ({ valid: false, error: '비밀번호가 필요합니다' })
  ],
  [
    data => data.password.length < 8,
    () => ({ valid: false, error: '비밀번호는 최소 8자 이상이어야 합니다' })
  ],
  [
    data => data.age !== undefined && data.age < 13,
    () => ({ valid: false, error: '최소 13세 이상이어야 합니다' })
  ],
  [
    () => true,
    () => ({ valid: true })
  ]
]);

validateForm({ email: '', password: 'pass123' });
// { valid: false, error: '이메일이 필요합니다' }

validateForm({ email: 'user@example.com', password: 'short' });
// { valid: false, error: '비밀번호는 최소 8자 이상이어야 합니다' }

validateForm({ email: 'user@example.com', password: 'longpassword', age: 25 });
// { valid: true }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      게임 상태 전환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-pack';

type GameState = 'idle' | 'playing' | 'paused' | 'gameover';

interface Game {
  state: GameState;
  score: number;
  lives: number;
}

const handleAction = cond<{ game: Game; action: string }, Game>([
  [
    ({ game, action }) => game.state === 'idle' && action === 'start',
    ({ game }) => ({ ...game, state: 'playing', lives: 3, score: 0 })
  ],
  [
    ({ game, action }) => game.state === 'playing' && action === 'pause',
    ({ game }) => ({ ...game, state: 'paused' })
  ],
  [
    ({ game, action }) => game.state === 'paused' && action === 'resume',
    ({ game }) => ({ ...game, state: 'playing' })
  ],
  [
    ({ game, action }) => game.state === 'playing' && action === 'hit' && game.lives > 1,
    ({ game }) => ({ ...game, lives: game.lives - 1 })
  ],
  [
    ({ game, action }) => game.state === 'playing' && action === 'hit' && game.lives === 1,
    ({ game }) => ({ ...game, state: 'gameover', lives: 0 })
  ],
  [
    () => true,
    ({ game }) => game  // 변경 없음
  ]
]);

let game: Game = { state: 'idle', score: 0, lives: 0 };

game = handleAction({ game, action: 'start' });
// { state: 'playing', score: 0, lives: 3 }

game = handleAction({ game, action: 'pause' });
// { state: 'paused', score: 0, lives: 3 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, cond } from 'fp-pack';

// 여러 단계를 통해 데이터 처리
const processNumber = pipe(
  (n: number) => n * 2,
  cond<number, number>([
    [n => n > 100,  n => n - 50],
    [n => n > 50,   n => n - 20],
    [() => true,    n => n]
  ]),
  n => Math.floor(n)
);

processNumber(30);   // 60  (30 * 2 = 60, 차감 없음)
processNumber(40);   // 60  (40 * 2 = 80, 80 - 20 = 60)
processNumber(60);   // 70  (60 * 2 = 120, 120 - 50 = 70)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      cond vs. switch/if-else
    </h2>

    <div class="grid gap-6 mt-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          전통적인 switch 문:
        </h4>
        <CodeBlock
          language="typescript"
          code={`function classify(n: number): string {
  switch (true) {
    case n > 10:
      return '큼';
    case n > 5:
      return '중간';
    case n > 0:
      return '작음';
    default:
      return '영 또는 음수';
  }
}`}
        />
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          cond 사용 (함수형):
        </h4>
        <CodeBlock
          language="typescript"
          code={`const classify = cond<number, string>([
  [n => n > 10,  () => '큼'],
  [n => n > 5,   () => '중간'],
  [n => n > 0,   () => '작음'],
  [() => true,   () => '영 또는 음수']
]);`}
        />
      </div>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mt-6">
      <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-3">
        cond의 이점:
      </h4>
      <ul class="text-sm text-purple-800 dark:text-purple-200 list-disc list-inside space-y-2">
        <li>인라인 로직 대신 재사용 가능한 함수 생성</li>
        <li>각 분기를 독립적으로 테스트하기 쉬움</li>
        <li>다른 함수형 유틸리티와 조합 가능</li>
        <li>선언적이고 읽기 쉬움</li>
        <li>변경이나 부작용 없음</li>
      </ul>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 특징
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 첫 번째 매치 우선
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          조건은 순서대로 평가되며, 첫 번째로 참인 조건의 핸들러가 실행됩니다.
          이후 조건은 평가되지 않습니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 함수 반환
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          cond는 다른 값과 함께 재사용할 수 있는 함수를 반환하므로
          설정 가능한 로직을 만드는 데 완벽합니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 타입 안전
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          입력 및 출력 타입에 대한 적절한 타입 추론과 함께 완전한 TypeScript 지원을 제공합니다.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 매치 없을 때 처리
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          조건이 일치하지 않으면 undefined를 반환합니다. 기본값을 제공하려면
          전체 조건 <code>[() =&gt; true, handler]</code>를 사용하세요.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">cond</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/control/cond.ts"
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
      연관된 유틸리티
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/ko/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          강력한 데이터 변환 파이프라인을 위해 cond와 pipe를 결합하세요.
        </p>
      </a>

      <a
        href="/ko/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          유사한 술어 로직을 사용하여 배열을 필터링하세요.
        </p>
      </a>
    </div>
  </div>
);
