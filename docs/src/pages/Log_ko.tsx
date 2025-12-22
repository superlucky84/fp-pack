import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Log_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      log
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      흐름을 방해하지 않고 파이프라인에서 값 로깅
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      log란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        log
      </strong>{' '}
      는 값을 콘솔에 로깅하고 변경하지 않고 반환하는 tap 기반 로깅 유틸리티입니다.
      데이터 흐름을 방해하지 않으면서 중간 값을 검사하고 싶을 때 함수 조합 파이프라인에서 사용하도록 설계되었습니다.
      <br />
      <br />
      이는 <strong>파이프라인 디버깅</strong>, <strong>데이터 흐름 모니터링</strong>,
      <strong>개발 로깅</strong>, 그리고 <strong>값 검사</strong>에 유용합니다.
      <br />
      <br />
      "이 값을 보여주고, 변경하지 않고 전달하라"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe } from 'fp-kit';

const process = pipe(
  (x: number) => x * 2,
  log('2배 후'),        // 로그: "2배 후 10"
  (x) => x + 5,
  log('더하기 후'),     // 로그: "더하기 후 15"
  (x) => x / 3
);

process(5);  // 반환: 5, 중간에 로그 출력`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function log<T>(label?: string): (value: T) => T;

// 선택적 라벨 문자열을 받음
// 값을 로깅하고 변경하지 않고 반환하는 함수를 반환`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 로깅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log } from 'fp-kit';

// 라벨 없이 로깅
const logValue = log<number>();
logValue(42);  // 로그: 42, 반환: 42

// 라벨과 함께 로깅
const logWithLabel = log<string>('사용자명');
logWithLabel('john');  // 로그: "사용자명 john", 반환: "john"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프라인에서 사용
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe } from 'fp-kit';

const processNumber = pipe(
  (x: number) => x + 10,
  log('더하기 후'),
  (x) => x * 2,
  log('곱하기 후'),
  (x) => x - 5
);

processNumber(5);
// 로그: "더하기 후 15"
// 로그: "곱하기 후 30"
// 반환: 25`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      데이터 변환 디버깅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe, map, filter } from 'fp-kit';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
];

const processUsers = pipe(
  log<User[]>('초기 사용자'),
  filter((user: User) => user.active),
  log('활성 사용자 필터링 후'),
  map((user: User) => ({ ...user, age: user.age + 1 })),
  log('나이 증가 후'),
  map((user: User) => user.name)
);

processUsers(users);
// 각 변환 단계를 로깅
// 반환: ['Alice', 'Charlie']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 응답 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe } from 'fp-kit';

interface ApiResponse {
  status: number;
  data: any;
}

const processApiResponse = pipe(
  log<ApiResponse>('원본 응답'),
  (response) => response.data,
  log('추출된 데이터'),
  (data) => JSON.parse(data),
  log('파싱된 데이터'),
  (parsed) => parsed.items
);

const response = {
  status: 200,
  data: '{"items": [1, 2, 3]}'
};

processApiResponse(response);
// 각 변환 단계를 로깅
// 반환: [1, 2, 3]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      폼 검증 파이프라인
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe } from 'fp-kit';

interface FormData {
  email: string;
  password: string;
}

const validateForm = pipe(
  log<FormData>('폼 입력'),
  (data) => ({ ...data, email: data.email.trim().toLowerCase() }),
  log('이메일 정규화'),
  (data) => {
    if (!data.email.includes('@')) {
      throw new Error('유효하지 않은 이메일');
    }
    return data;
  },
  log('이메일 검증'),
  (data) => {
    if (data.password.length < 8) {
      throw new Error('비밀번호가 너무 짧습니다');
    }
    return data;
  },
  log('비밀번호 검증')
);

validateForm({ email: '  JOHN@EXAMPLE.COM  ', password: 'secret123' });
// 각 검증 단계를 로깅
// 반환: { email: 'john@example.com', password: 'secret123' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      복잡한 데이터 집계
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe, groupBy, map } from 'fp-kit';

interface Sale {
  product: string;
  amount: number;
  category: string;
}

const sales: Sale[] = [
  { product: '노트북', amount: 1000, category: '전자제품' },
  { product: '마우스', amount: 20, category: '전자제품' },
  { product: '책상', amount: 300, category: '가구' },
  { product: '의자', amount: 150, category: '가구' },
];

const getSalesByCategory = pipe(
  log<Sale[]>('원본 판매 데이터'),
  groupBy((sale: Sale) => sale.category),
  log('카테고리별 그룹화'),
  (grouped) => Object.entries(grouped).map(([category, items]) => ({
    category,
    total: items.reduce((sum, item) => sum + item.amount, 0),
    count: items.length,
  })),
  log('총계 계산')
);

getSalesByCategory(sales);
// 중간 결과를 로깅
// 반환: [
//   { category: '전자제품', total: 1020, count: 2 },
//   { category: '가구', total: 450, count: 2 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      조건부 로깅
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe, when } from 'fp-kit';

const isDevelopment = process.env.NODE_ENV === 'development';

// 개발 환경에서만 로깅
const devLog = <T>(label?: string) =>
  isDevelopment ? log<T>(label) : (value: T) => value;

const processData = pipe(
  (x: number) => x * 2,
  devLog('2배'),      // 개발 환경에서만 로깅
  (x) => x + 10,
  devLog('더하기'),   // 개발 환경에서만 로깅
  (x) => x / 2
);

processData(5);  // 개발 환경일 때만 로깅`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 log를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 비침투적 디버깅
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          흐름을 방해하거나 로직을 변경하지 않고 파이프라인 어디에나 로깅을 삽입할 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 파이프라인 가시성
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          변환 파이프라인의 각 단계에서 데이터가 어떻게 생겼는지 정확히 확인할 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 쉬운 추가 및 제거
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          코드 구조를 변경하거나 조합을 깨지 않고 간단히 log 호출을 추가하거나 제거할 수 있습니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 라벨 출력
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          선택적 라벨로 어떤 파이프라인 단계가 각 로그 항목을 생성했는지 명확하게 알 수 있습니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function log<T>(label?: string): (value: T) => T {
  return (value: T) => {
    if (label) {
      console.log(label, value);
    } else {
      console.log(value);
    }
    return value;
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>선택적 라벨 문자열을 받습니다</li>
        <li>값을 받는 함수를 반환합니다</li>
        <li>값을 콘솔에 로깅합니다 (라벨이 제공된 경우 함께)</li>
        <li>값을 변경하지 않고 반환합니다</li>
        <li>pipe와 compose 체인에서 사용하기에 완벽합니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        관련된 디버깅 및 유틸리티 함수들을 시도해보세요:
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
          - 조건 검증과 빠른 실패 처리
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/tap');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            tap
          </a>{' '}
          - 파이프라인에서 부수 효과 실행 (log는 tap 패턴을 기반으로 구축됨)
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/pipe');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            pipe
          </a>{' '}
          - 함수를 왼쪽에서 오른쪽으로 조합 (log가 가장 유용한 곳)
        </li>
      </ul>
    </div>
  </div>
);
