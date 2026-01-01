import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Once_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      once
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      한 번만 실행되는 함수 생성
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      once란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        once
      </strong>{' '}
      는 함수를 감싸서 단 한 번만 호출될 수 있도록 합니다. 첫 번째 호출 후에는
      이후 모든 호출이 첫 번째 실행의 캐시된 결과를 반환합니다.
      <br />
      <br />
      이는 <strong>초기화 함수</strong>, <strong>비용이 큰 작업</strong>,
      그리고 <strong>부수 효과가 한 번만 발생</strong>하도록 보장하는 데 유용합니다.
      <br />
      <br />
      첫 번째 반환 값은 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">undefined</code>이더라도 메모이즈됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const initialize = once(() => {
  console.log('초기화 중...');
  return { initialized: true };
});

initialize();  // "초기화 중..." 로그 출력 및 { initialized: true } 반환
initialize();  // { initialized: true } 반환 (로그 없음)
initialize();  // { initialized: true } 반환 (로그 없음)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function once<T extends (...args: any[]) => any>(fn: T): T;

// 입력 함수와 동일한 시그니처를 가진 함수를 반환하지만
// 한 번만 실행됩니다`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      once는 원본 함수의 타입 시그니처와 this 컨텍스트를 보존합니다.
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
      code={`import { once } from 'fp-pack';

const greet = once((name: string) => {
  console.log(\`안녕하세요, \${name}님!\`);
  return \`\${name}님께 인사했습니다\`;
});

greet('Alice');  // "안녕하세요, Alice님!" 로그 출력 및 "Alice님께 인사했습니다" 반환
greet('Bob');    // "Alice님께 인사했습니다" 반환 (로그 없음, Bob은 무시됨)
greet('Carol');  // "Alice님께 인사했습니다" 반환 (로그 없음, Carol은 무시됨)`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      이후 호출은 인자를 무시합니다 - 항상 첫 번째 호출의 결과를 반환합니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비용이 큰 계산
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const calculatePi = once(() => {
  console.log('파이 계산 중...');
  // 비용이 큰 계산
  let pi = 0;
  for (let i = 0; i < 1000000; i++) {
    pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return pi * 4;
});

const pi1 = calculatePi();  // "파이 계산 중..." 로그 출력 및 계산
const pi2 = calculatePi();  // 캐시된 결과를 즉시 반환
const pi3 = calculatePi();  // 캐시된 결과를 즉시 반환

console.log(pi1 === pi2);   // true
console.log(pi2 === pi3);   // true`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      싱글톤 패턴
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

class DatabaseConnection {
  constructor() {
    console.log('데이터베이스에 연결 중...');
  }

  query(sql: string) {
    return \`결과: \${sql}\`;
  }
}

const getConnection = once(() => new DatabaseConnection());

// 애플리케이션 전체에서 사용
const conn1 = getConnection();  // "데이터베이스에 연결 중..." 로그 출력
const conn2 = getConnection();  // 같은 인스턴스 반환
const conn3 = getConnection();  // 같은 인스턴스 반환

console.log(conn1 === conn2);   // true
console.log(conn2 === conn3);   // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      설정 로딩
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

interface Config {
  apiUrl: string;
  apiKey: string;
  timeout: number;
}

const loadConfig = once((): Config => {
  console.log('설정 로딩 중...');

  // 비용이 큼: 파일 읽기, 파싱, 검증
  const config = {
    apiUrl: process.env.API_URL || 'https://api.example.com',
    apiKey: process.env.API_KEY || '',
    timeout: Number(process.env.TIMEOUT) || 5000,
  };

  // 검증
  if (!config.apiKey) {
    throw new Error('API_KEY가 필요합니다');
  }

  return config;
});

// 애플리케이션 전체에서 사용
export const getConfig = loadConfig;

// 첫 번째 호출에서 로드하고 검증
const config1 = getConfig();

// 이후 호출은 캐시된 설정 반환
const config2 = getConfig();
const config3 = getConfig();`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      이벤트 핸들러 등록
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const setupGlobalHandlers = once(() => {
  console.log('전역 이벤트 핸들러 설정 중...');

  window.addEventListener('resize', () => {
    console.log('창 크기 변경됨');
  });

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      console.log('Escape 키 눌림');
    }
  });

  return true;
});

// 여러 곳에서 안전하게 호출
setupGlobalHandlers();  // 핸들러 설정
setupGlobalHandlers();  // 아무것도 안 함
setupGlobalHandlers();  // 아무것도 안 함`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      지연 초기화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

class ExpensiveService {
  private data: string[];

  constructor() {
    console.log('비용이 큰 데이터 로딩 중...');
    // 비용이 큰 초기화 시뮬레이션
    this.data = Array.from({ length: 10000 }, (_, i) => \`항목 \${i}\`);
  }

  search(query: string) {
    return this.data.filter(item => item.includes(query));
  }
}

// 지연 싱글톤 - 처음 접근할 때만 생성
const getService = once(() => new ExpensiveService());

// 아직 초기화되지 않음
console.log('애플리케이션 시작됨');

// 첫 사용 시 서비스 생성
const results1 = getService().search('100');  // "비용이 큰 데이터 로딩 중..." 로그 출력

// 서비스 재사용
const results2 = getService().search('200');  // 로그 없음`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      엣지 케이스
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      undefined 반환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const getNothing = once(() => {
  console.log('호출됨');
  return undefined;
});

getNothing();  // "호출됨" 로그 출력, undefined 반환
getNothing();  // undefined 반환 (로그 없음)
getNothing();  // undefined 반환 (로그 없음)

// undefined도 캐시됩니다!`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      다른 인자들
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const add = once((a: number, b: number) => {
  console.log(\`\${a} + \${b} 더하기\`);
  return a + b;
});

add(2, 3);   // "2 + 3 더하기" 로그 출력, 5 반환
add(10, 20); // 5 반환 (인자 무시됨!)
add(5, 7);   // 5 반환 (인자 무시됨!)

// Once는 첫 번째 인자로만 실행됩니다
// 이후 모든 호출은 같은 캐시된 결과를 반환합니다`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      <strong>중요:</strong> 다른 인자에 대해 다른 결과가 필요하다면,
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">memoize</code>를 대신 사용하세요!
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      once vs memoize
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          once - 단일 실행
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200 mb-2">
          첫 번째 호출에서만 실행됩니다. 이후 모든 호출은 인자에 관계없이 같은
          캐시된 결과를 반환합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fn = once((x: number) => x * 2);
fn(2);  // 4
fn(3);  // 4 (6이 아님!)
fn(5);  // 4 (10이 아님!)`}
        />
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          memoize - 인자 기반 캐싱
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200 mb-2">
          고유한 인자 조합마다 결과를 캐시합니다. 다른 인자는 다른 캐시된 결과를
          생성합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fn = memoize((x: number) => x * 2);
fn(2);  // 4 (계산됨)
fn(3);  // 6 (계산됨)
fn(2);  // 4 (캐시됨)`}
        />
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          언제 무엇을 사용할까요?
        </h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li><strong>once 사용</strong>: 초기화, 싱글톤, 일회성 설정, 부수 효과가 한 번만 발생하도록 보장</li>
          <li><strong>memoize 사용</strong>: 순수 함수, 다양한 입력으로 비용이 큰 계산, API 응답 캐싱</li>
        </ul>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부 사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      once는 클로저를 사용하여 함수가 호출되었는지 추적하고 결과를 저장합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let value: any;

  const wrapped = function (this: any, ...args: any[]) {
    if (!called) {
      called = true;
      value = fn.apply(this, args);
    }
    return value;
  };

  return wrapped as T;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">called</code> 플래그는
      함수가 한 번만 실행되도록 보장하고, <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">value</code>는
      캐시된 결과를 저장합니다. <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">fn.apply(this, args)</code> 사용으로
      this 컨텍스트가 보존됩니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">once</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/once.ts"
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
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/memoize"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/memoize');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          memoize →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          다른 인자에 따라 결과를 캐싱하는 memoize에 대해 알아보세요.
        </p>
      </a>

      <a
        href="/composition/tap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/tap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          tap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          파이프라인에서 값을 전달하면서 부수 효과를 실행하세요.
        </p>
      </a>
    </div>
  </div>
);
