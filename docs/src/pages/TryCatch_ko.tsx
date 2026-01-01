import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const TryCatch_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      tryCatch
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      함수형 방식으로 예외 처리
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      tryCatch란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        tryCatch
      </strong>{' '}
      는 예외를 던질 수 있는 작업을 안전하게 실행하고 오류를 우아하게 처리하는 함수를 생성합니다.
      try-catch 로직을 함수형 인터페이스로 감싸서, 성공 시 try 함수를 실행하고
      오류 시 catch 함수를 실행합니다.
      <br />
      <br />
      이는 <strong>예외를 던지는 코드</strong>를 <strong>안전하고 예측 가능한 함수</strong>로 변환하며,
      <strong>오류 처리</strong>, <strong>파싱 작업</strong>,
      <strong>API 호출</strong>, 그리고 <strong>데이터 검증</strong>에 이상적입니다.
      <br />
      <br />
      "이 작업을 시도하되, 실패하면 이런 식으로 처리하라"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-pack';

// JSON을 안전하게 파싱
const safeJsonParse = tryCatch(
  (json: string) => JSON.parse(json),
  (error, json) => ({ error: error.message, input: json })
);

safeJsonParse('{"valid": true}');
// { valid: true }

safeJsonParse('invalid json');
// { error: 'Unexpected token...', input: 'invalid json' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function tryCatch<T, R>(
  tryFn: (value: T) => R,
  catchFn: (error: Error, value: T) => R
): (value: T) => R;

// 시도할 함수와 오류를 처리할 함수를 받음
// 절대 예외를 던지지 않는 안전한 함수를 반환
// 두 분기 모두 같은 타입 R을 반환`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      안전한 파싱
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-pack';

// 기본값을 사용한 안전한 JSON 파싱
const parseJsonSafe = tryCatch(
  (json: string) => JSON.parse(json),
  () => null
);

parseJsonSafe('{"name": "John"}');  // { name: 'John' }
parseJsonSafe('invalid');            // null

// 오류 세부사항과 함께 파싱
const parseWithError = tryCatch(
  (json: string) => ({ success: true, data: JSON.parse(json) }),
  (error) => ({ success: false, error: error.message })
);

parseWithError('{"valid": true}');
// { success: true, data: { valid: true } }

parseWithError('not json');
// { success: false, error: 'Unexpected token...' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      안전한 숫자 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-pack';

// 기본값을 사용한 문자열을 숫자로 변환
const toNumber = tryCatch(
  (str: string) => {
    const num = Number(str);
    if (isNaN(num)) throw new Error('숫자가 아님');
    return num;
  },
  () => 0
);

toNumber('42');      // 42
toNumber('abc');     // 0
toNumber('3.14');    // 3.14

// 오류 처리를 포함한 나눗셈
const safeDivide = tryCatch(
  ([a, b]: [number, number]) => {
    if (b === 0) throw new Error('0으로 나눔');
    return a / b;
  },
  (error) => ({ error: error.message, result: Infinity })
);

safeDivide([10, 2]);  // 5
safeDivide([10, 0]);  // { error: '0으로 나눔', result: Infinity }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      API 응답 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Success {
  success: true;
  user: User;
}

interface Failure {
  success: false;
  error: string;
}

type Result = Success | Failure;

// API 응답을 안전하게 파싱
const parseUserResponse = tryCatch(
  (response: string): Success => {
    const user = JSON.parse(response) as User;
    if (!user.id || !user.name || !user.email) {
      throw new Error('잘못된 사용자 데이터');
    }
    return { success: true, user };
  },
  (error): Failure => ({
    success: false,
    error: error.message
  })
);

parseUserResponse('{"id": 1, "name": "Alice", "email": "alice@example.com"}');
// { success: true, user: {...} }

parseUserResponse('{"id": 1}');
// { success: false, error: '잘못된 사용자 데이터' }

parseUserResponse('invalid json');
// { success: false, error: 'Unexpected token...' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파일 작업
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-pack';

// 안전한 파일 읽기 (Node.js 예시)
const readFileSafe = tryCatch(
  (path: string) => {
    // 파일이 존재하지 않으면 일반적으로 예외를 던짐
    const fs = require('fs');
    return fs.readFileSync(path, 'utf-8');
  },
  (error, path) => ({
    error: \`\${path} 읽기 실패: \${error.message}\`,
    content: ''
  })
);

// 안전한 localStorage 접근
const getLocalStorage = tryCatch(
  (key: string) => {
    const value = localStorage.getItem(key);
    if (!value) throw new Error('키를 찾을 수 없음');
    return JSON.parse(value);
  },
  (error, key) => ({
    error: \`'\${key}' 가져오기 실패: \${error.message}\`,
    data: null
  })
);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      데이터 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-pack';

interface ValidatedData {
  email: string;
  age: number;
}

const validateUserData = tryCatch(
  (input: unknown): ValidatedData => {
    if (typeof input !== 'object' || input === null) {
      throw new Error('입력은 객체여야 함');
    }

    const data = input as Record<string, unknown>;

    if (typeof data.email !== 'string' || !data.email.includes('@')) {
      throw new Error('잘못된 이메일');
    }

    if (typeof data.age !== 'number' || data.age < 0) {
      throw new Error('잘못된 나이');
    }

    return { email: data.email, age: data.age };
  },
  (error) => ({
    email: '',
    age: 0,
    validationError: error.message
  })
);

validateUserData({ email: 'user@example.com', age: 25 });
// { email: 'user@example.com', age: 25 }

validateUserData({ email: 'invalid', age: 25 });
// { email: '', age: 0, validationError: '잘못된 이메일' }

validateUserData('객체가 아님');
// { email: '', age: 0, validationError: '입력은 객체여야 함' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      URL 파싱
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-pack';

interface ParsedUrl {
  valid: true;
  protocol: string;
  host: string;
  pathname: string;
}

interface InvalidUrl {
  valid: false;
  error: string;
  input: string;
}

const parseUrl = tryCatch(
  (urlString: string): ParsedUrl => {
    const url = new URL(urlString);
    return {
      valid: true,
      protocol: url.protocol,
      host: url.host,
      pathname: url.pathname
    };
  },
  (error, input): InvalidUrl => ({
    valid: false,
    error: error.message,
    input
  })
);

parseUrl('https://example.com/path');
// { valid: true, protocol: 'https:', host: 'example.com', pathname: '/path' }

parseUrl('url이 아님');
// { valid: false, error: 'Invalid URL', input: 'url이 아님' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      처리 체인을 위한 pipe와 함께
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tryCatch } from 'fp-pack';

interface ProcessedData {
  parsed: unknown;
  validated: boolean;
  transformed?: string;
  error?: string;
}

// 실패할 수 있는 여러 작업 체인
const processData = pipe(
  // 1단계: JSON 파싱
  tryCatch(
    (json: string) => ({ parsed: JSON.parse(json), validated: false }),
    (error) => ({ parsed: null, validated: false, error: error.message })
  ),
  // 2단계: 유효하면 변환
  (data: ProcessedData) => {
    if (data.error) return data;

    return tryCatch(
      (d: ProcessedData) => ({
        ...d,
        validated: true,
        transformed: JSON.stringify(d.parsed, null, 2)
      }),
      (error) => ({
        ...data,
        error: error.message
      })
    )(data);
  }
);

processData('{"name": "John"}');
// { parsed: { name: 'John' }, validated: true, transformed: '...'}

processData('invalid');
// { parsed: null, validated: false, error: 'Unexpected token...' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      오류 처리를 포함한 배열 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tryCatch } from 'fp-pack';

// 각 항목을 안전하게 처리
const processItem = tryCatch(
  (item: string) => {
    const parsed = JSON.parse(item);
    if (!parsed.id) throw new Error('id 누락');
    return { success: true, data: parsed };
  },
  (error, item) => ({
    success: false,
    error: error.message,
    original: item
  })
);

const jsonStrings = [
  '{"id": 1, "name": "Alice"}',
  'invalid json',
  '{"id": 2, "name": "Bob"}',
  '{"name": "Charlie"}'  // id 누락
];

jsonStrings.map(processItem);
// [
//   { success: true, data: { id: 1, name: 'Alice' } },
//   { success: false, error: 'Unexpected token...', original: 'invalid json' },
//   { success: true, data: { id: 2, name: 'Bob' } },
//   { success: false, error: 'id 누락', original: '{"name": "Charlie"}' }
// ]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 tryCatch를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 예외를 던지지 않는 함수
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          오류를 던지는 코드를 항상 값을 반환하는 함수로 변환하여,
          코드를 더 예측 가능하고 조합하기 쉽게 만듭니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 명시적 오류 처리
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          오류 처리가 함수 정의에 내장되어 있어, 멀리 떨어진 try-catch 블록을 찾지 않고도
          오류가 어떻게 처리되는지 명확합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 조합 가능
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          절대 예외를 던지지 않으므로 pipe 및 compose와 원활하게 작동하며,
          복잡한 오류 처리 파이프라인을 구축할 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 타입 안전한 오류
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          TypeScript가 반환 타입에 성공과 오류 케이스가 모두 포함되어 있다고 추론할 수 있어,
          오류 처리가 타입 안전하고 명시적입니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function tryCatch<T, R>(
  tryFn: (value: T) => R,
  catchFn: (error: Error, value: T) => R
): (value: T) => R {
  return (value: T) => {
    try {
      return tryFn(value);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      return catchFn(error, value);
    }
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>시도할 함수(tryFn)와 오류를 처리할 함수(catchFn)를 받습니다</li>
        <li>try-catch 로직을 감싸는 새 함수를 반환합니다</li>
        <li>tryFn을 실행하고 성공 시 그 결과를 반환합니다</li>
        <li>오류 발생 시, 예외를 잡아서 필요하면 Error 객체로 변환합니다</li>
        <li>오류와 원래 값으로 catchFn을 호출합니다</li>
        <li>두 분기 모두 같은 타입 R을 반환해야 합니다</li>
        <li>절대 예외를 던지지 않음 - 항상 값을 반환합니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">tryCatch</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/control/tryCatch.ts"
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
        href="/control/guard"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/guard');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          guard →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          검증 실패 시 기본값 반환 - 유사한 안전 패턴입니다.
        </p>
      </a>

      <a
        href="/control/ifElse"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/ifElse');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          ifElse →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          두 가지 변환 중 선택 - 조건 기반 분기입니다.
        </p>
      </a>

      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          왼쪽에서 오른쪽으로 함수 조합 - 오류 처리 체인에 완벽합니다.
        </p>
      </a>

      <a
        href="/composition/sideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/sideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          sideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          지연된 실행 패턴 - 안전한 작업을 위한 또 다른 접근 방식입니다.
        </p>
      </a>
    </div>
  </div>
);
