import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Maybe_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      maybe
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      nullable 값을 안전하게 변환
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
      <p class="text-sm md:text-base text-blue-900 dark:text-blue-200 leading-relaxed">
        <strong class="font-semibold">참고:</strong> 이것은 실용적인 null-safe 연산을 위해 설계된 가벼운 헬퍼입니다.
        학술적인 함수형 프로그래밍 라이브러리에서 찾을 수 있는 완전한 Maybe 모나드/펑터 구현과는 달리,
        일상적인 JavaScript/TypeScript 사용 사례를 위한 더 간단하고 접근하기 쉬운 도구를 제공합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      maybe란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        maybe
      </strong>{' '}
      는 함수의 null-safe 버전을 생성합니다. 입력 값이{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">null</code> 또는{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">undefined</code>이면,
      함수를 실행하지 않고 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">null</code>을
      반환합니다. 그렇지 않으면 값에 함수를 적용합니다.
      <br />
      <br />
      이는 반복적인 null 검사의 필요성을 제거하고 <strong>선택적 값</strong>,{' '}
      <strong>API 응답</strong>, 그리고 <strong>nullable 데이터</strong> 작업을
      훨씬 안전하고 깔끔하게 만듭니다.
      <br />
      <br />
      nullable 값을 함수형으로 처리하기 위한 Maybe/Result 패턴의 일부입니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

const toUpper = maybe((s: string) => s.toUpperCase());

toUpper('hello');      // "HELLO"
toUpper(null);         // null
toUpper(undefined);    // null

// null 검사가 필요 없습니다!
const processName = maybe((name: string) => {
  return \`안녕하세요, \${name}님!\`;
});

processName('Alice');     // "안녕하세요, Alice님!"
processName(null);        // null
processName(undefined);   // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function maybe<T, R>(
  fn: (value: T) => R
): (value: T | null | undefined) => R | null;

// T를 R로 변환하는 함수를 받음
// T | null | undefined를 받아들이는 함수를 반환
// R | null을 반환`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      래핑된 함수는 값이 null이나 undefined가 아닐 때만 실행됩니다.
      그렇지 않으면 단락(short-circuit)되어 null을 반환합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

// 문자열 연산
const toUpper = maybe((s: string) => s.toUpperCase());
const trim = maybe((s: string) => s.trim());
const getLength = maybe((s: string) => s.length);

toUpper('hello');    // "HELLO"
toUpper(null);       // null

trim('  spaces  '); // "spaces"
trim(undefined);    // null

getLength('test');  // 4
getLength(null);    // null

// 숫자 연산
const double = maybe((n: number) => n * 2);
const increment = maybe((n: number) => n + 1);

double(5);        // 10
double(null);     // null

increment(10);    // 11
increment(null);  // null`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Null 검사 피하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

// maybe 없이 - 장황한 null 검사
function processUser(user: User | null) {
  if (user === null || user === undefined) {
    return null;
  }
  return user.name.toUpperCase();
}

// maybe와 함께 - 깔끔하고 선언적
const processUser = maybe((user: User) => user.name.toUpperCase());

processUser({ name: 'Alice' });  // "ALICE"
processUser(null);               // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      객체 속성 접근
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
  profile?: {
    bio: string;
    avatar: string;
  };
}

// 안전한 속성 접근
const getName = maybe((user: User) => user.name);
const getEmail = maybe((user: User) => user.email);
const getBio = maybe((user: User) => user.profile?.bio);

const user: User | null = getCurrentUser();

getName(user);    // "Alice" 또는 null
getEmail(user);   // "alice@example.com" 또는 null
getBio(user);     // "Software engineer" 또는 null 또는 undefined`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 응답 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

interface ApiResponse {
  data: {
    items: string[];
    total: number;
  };
}

// 데이터를 안전하게 추출
const getItems = maybe((response: ApiResponse) => response.data.items);
const getTotal = maybe((response: ApiResponse) => response.data.total);
const getFirstItem = maybe((response: ApiResponse) => response.data.items[0]);

// 사용
const response: ApiResponse | null = await fetchData();

const items = getItems(response);
// items: string[] | null

const total = getTotal(response);
// total: number | null

const firstItem = getFirstItem(response);
// firstItem: string | null | undefined`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

// nullable 배열 처리
const getFirstElement = maybe((arr: any[]) => arr[0]);
const getLength = maybe((arr: any[]) => arr.length);
const mapDouble = maybe((arr: number[]) => arr.map(x => x * 2));

getFirstElement([1, 2, 3]);    // 1
getFirstElement(null);         // null
getFirstElement([]);           // undefined

getLength([1, 2, 3]);          // 3
getLength(null);               // null

mapDouble([1, 2, 3]);          // [2, 4, 6]
mapDouble(null);               // null`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      pipe와 체이닝
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, maybe } from 'fp-pack';

interface User {
  name: string;
  age: number;
}

// nullable 변환 체인
const processUser = pipe(
  maybe((user: User) => user.name),
  maybe((name: string) => name.toUpperCase()),
  maybe((name: string) => \`안녕하세요, \${name}님!\`)
);

processUser({ name: 'Alice', age: 30 });
// "안녕하세요, ALICE님!"

processUser(null);
// null

// 어떤 단계라도 null을 반환하면 체인이 단락됩니다
const user = { name: '', age: 30 };
const getName = maybe((u: User) => u.name || null);
const greet = maybe((name: string) => \`안녕하세요, \${name}님!\`);

pipe(getName, greet)(user);
// null (이름이 비어있어서 getName이 null 반환)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      폼 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

interface FormData {
  email: string;
  password: string;
}

// 검증 및 변환
const validateEmail = maybe((email: string) => {
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return null;
  }
  return email.toLowerCase();
});

const validatePassword = maybe((password: string) => {
  if (password.length < 8) {
    return null;
  }
  return password;
});

// 사용
const formData: FormData | null = getFormData();

const email = validateEmail(formData?.email);
const password = validatePassword(formData?.password);

if (email && password) {
  // 둘 다 유효함
  submitForm({ email, password });
} else {
  showError('유효하지 않은 폼 데이터');
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      설정 접근
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    darkMode: boolean;
    notifications: boolean;
  };
}

const config: Config | null = loadConfig();

// 안전한 설정 접근자
const getApiUrl = maybe((cfg: Config) => cfg.api.baseUrl);
const getTimeout = maybe((cfg: Config) => cfg.api.timeout);
const isDarkMode = maybe((cfg: Config) => cfg.features.darkMode);

const apiUrl = getApiUrl(config) ?? 'https://default.api.com';
const timeout = getTimeout(config) ?? 5000;
const darkMode = isDarkMode(config) ?? false;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      일반적인 패턴
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      기본값 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

const getUsername = maybe((user: User) => user.name);

// 기본값을 위해 널 병합 연산자 사용
const username = getUsername(user) ?? 'Guest';
const displayName = getUsername(user) ?? 'Unknown User';

// 또는 getOrElse 사용
import { getOrElse } from 'fp-pack';

const username2 = getOrElse('Guest')(getUsername(user));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열에 매핑
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

const users: (User | null)[] = [
  { name: 'Alice', age: 30 },
  null,
  { name: 'Bob', age: 25 },
  undefined,
  { name: 'Carol', age: 35 }
];

const getName = maybe((user: User) => user.name);

const names = users.map(getName);
// ["Alice", null, "Bob", null, "Carol"]

// null 필터링
const validNames = names.filter(name => name !== null);
// ["Alice", "Bob", "Carol"]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

// 조건에 따라 변환
const processIfActive = maybe((user: User) => {
  if (!user.active) {
    return null;  // 비활성이면 null로 변환
  }
  return user.name.toUpperCase();
});

processIfActive({ name: 'Alice', active: true });   // "ALICE"
processIfActive({ name: 'Bob', active: false });    // null
processIfActive(null);                              // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 maybe를 사용하나요?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. Null 검사 제거
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          null이나 undefined를 확인하는 반복적인 if 문이 더 이상 필요 없습니다.
          함수가 자동으로 처리합니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 조합 가능
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          pipe, compose 및 기타 함수형 유틸리티와 원활하게 작동합니다. null 값을
          안전하게 처리하는 복잡한 변환을 구축하세요.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. 타입 안정성
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          TypeScript는 결과가 null일 수 있음을 알고 있어, 두 경우를 모두 명시적으로
          처리하도록 강제합니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. 선언적
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          의도를 명확하게 표현합니다: "값이 존재하면 이 변환을 적용하고,
          그렇지 않으면 null을 반환하라."
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부 사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      maybe는 함수를 적용하기 전에 null/undefined를 확인합니다:
    </p>

    <CodeBlock
      language="typescript"
      code={`function maybe<T, R>(
  fn: (value: T) => R
): (value: T | null | undefined) => R | null {
  return (value: T | null | undefined) => {
    if (value === null || value === undefined) {
      return null;
    }
    return fn(value);
  };
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      함수는 null과 undefined에 대해 엄격한 동등성 검사를 사용한 다음,
      값이 있을 때만 변환 함수를 적용합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">maybe</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/nullable/maybe.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/fold');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          fold
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          null/undefined 값을 처리합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/getOrElse');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          getOrElse
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          값이 없을 때 기본값을 제공합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/mapMaybe');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mapMaybe
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          null/undefined 결과를 제거합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/result');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          result
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          성공/실패를 감싸서 반환합니다
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/nullable/getOrElse"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/getOrElse');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          getOrElse →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          null 결과에 기본값을 제공하는 getOrElse에 대해 알아보세요.
        </p>
      </a>

      <a
        href="/nullable/mapMaybe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/mapMaybe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          mapMaybe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          배열을 매핑하면서 null/undefined 결과를 제거하는 mapMaybe를 확인하세요.
        </p>
      </a>
    </div>
  </div>
);
