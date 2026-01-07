import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Guide_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      상세 가이드
    </h1>

    <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
      이 가이드는 fp-pack 유틸리티를 사용하여 깔끔하고 선언적인 함수형 코드를 작성하기 위한 포괄적인 지침을 제공합니다.
    </p>

    <div class="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
        목차
      </h2>
      <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
        <li><strong>프로젝트 철학</strong></li>
        <li>
          <strong>핵심 조합 함수</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>pipe</li>
            <li>pipeAsync</li>
          </ul>
        </li>
        <li><strong>SideEffect 패턴</strong></li>
        <li>
          <strong>코딩 가이드라인</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>pipe / pipeAsync</li>
            <li>커리된 함수</li>
            <li>커스텀 유틸 작성</li>
            <li>pipe vs pipeSideEffect</li>
          </ul>
        </li>
        <li>
          <strong>React 통합</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>이벤트 핸들러</li>
            <li>useMemo</li>
            <li>useEffect</li>
            <li>상태 업데이트</li>
          </ul>
        </li>
        <li>
          <strong>피해야 할 안티패턴</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>루프</li>
            <li>체이닝</li>
            <li>변이</li>
          </ul>
        </li>
        <li><strong>스트림 함수</strong></li>
        <li>
          <strong>빠른 참고</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>import 경로</li>
            <li>언제 무엇을 쓸지</li>
          </ul>
        </li>
        <li><strong>핵심 원칙 요약</strong></li>
        <li><strong>탐색 준비</strong></li>
      </ul>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      프로젝트 철학
    </h2>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      fp-pack은 다음에 중점을 둔 TypeScript 함수형 프로그래밍 라이브러리입니다:
    </p>

    <ol class="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside mb-8">
      <li><strong>함수 조합</strong>: <code class="text-sm">pipe</code>와 <code class="text-sm">pipeAsync</code>를 연산 결합의 주요 도구로 사용</li>
      <li><strong>선언적 코드</strong>: 명령형 루프 및 변이보다 함수 조합 선호</li>
      <li><strong>모나드 패턴 없음</strong>: 전통적인 FP 모나드(Option, Either 등)는 사용하지 않음 - <code class="text-sm">pipe</code>와 잘 조합되지 않음</li>
      <li><strong>SideEffect 패턴</strong>: <code class="text-sm">pipeSideEffect</code> / <code class="text-sm">pipeAsyncSideEffect</code> 파이프라인과 함께 <code class="text-sm">SideEffect</code>를 사용하여 에러 및 부수 효과 처리. 엄격한 유니온 타입이 필요하면 <code class="text-sm">pipeSideEffectStrict</code> / <code class="text-sm">pipeAsyncSideEffectStrict</code> 사용</li>
      <li><strong>지연 평가</strong>: 효율적인 이터러블 처리를 위해 <code class="text-sm">stream/*</code> 함수 사용</li>
    </ol>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      핵심 조합 함수
    </h2>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      pipe - 동기 함수 조합
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong>동기 연산에는 항상 <code class="text-sm">pipe</code>를 선호하세요</strong> - 수동 명령형 코드 대신 사용합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, map, filter, take } from 'fp-pack';

// 좋음: 선언적 파이프 조합
const processUsers = pipe(
  filter((user: User) => user.age >= 18),
  map(user => user.name.toUpperCase()),
  take(10)
);

// 나쁨: 명령형 접근
const processUsers = (users: User[]) => {
  const result = [];
  for (const user of users) {
    if (user.age >= 18) {
      result.push(user.name.toUpperCase());
      if (result.length >= 10) break;
    }
  }
  return result;
};`}
    />

    <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
      <p class="text-sm md:text-base text-blue-900 dark:text-blue-100">
        SideEffect 기반 조기 종료의 경우 <code class="text-sm">pipeSideEffect</code>를 사용하세요. 타입 유니온을 엄격히 유지하려면 <code class="text-sm">pipeSideEffectStrict</code>가 적합합니다.
      </p>
    </div>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      pipeAsync - 비동기 함수 조합
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong>API 호출, 데이터베이스 쿼리 또는 비동기 변환을 포함한 모든 비동기 연산에는 <code class="text-sm">pipeAsync</code>를 사용하세요</strong>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-pack';

// 좋음: 비동기 파이프 조합
const fetchUserData = pipeAsync(
  async (userId: string) => fetch(\`/api/users/\${userId}\`),
  async (response) => response.json(),
  (data) => data.user
);

// 나쁨: 수동 비동기 처리
const fetchUserData = async (userId: string) => {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();
  return data.user;
};`}
    />

    <div class="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
      <p class="text-sm md:text-base text-purple-900 dark:text-purple-100">
        SideEffect를 인식하는 비동기 파이프라인의 경우 <code class="text-sm">pipeAsyncSideEffect</code>를 사용하세요. 엄격한 유니온이 필요하면 <code class="text-sm">pipeAsyncSideEffectStrict</code>를 사용하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      SideEffect 패턴 - 특수한 경우에만
    </h2>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong>대부분의 경우: <code class="text-sm">pipe</code> / <code class="text-sm">pipeAsync</code>를 사용하세요 - 더 간단하며 99%의 사용 사례에 충분합니다.</strong>
    </p>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <code class="text-sm">pipe</code>와 <code class="text-sm">pipeAsync</code>는 <strong>순수</strong> 함수를 위한 것이며 <code class="text-sm">SideEffect</code>를 처리하지 않습니다. <strong>다음이 특별히 필요한 경우에만 <code class="text-sm">pipeSideEffect</code>/<code class="text-sm">pipeAsyncSideEffect</code>를 사용하세요</strong>:
    </p>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>검증 기반 조기 종료</li>
      <li>부수 효과(로깅, 토스트 등)가 있는 에러 처리</li>
      <li>옵셔널 체이닝 패턴</li>
    </ul>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      일반 에러 처리의 경우 표준 try-catch 또는 에러 전파가 완벽하게 괜찮습니다.
    </p>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      분기별 SideEffect 결과 타입을 정밀하게 유지하려면 <code class="text-sm">pipeSideEffectStrict</code> /{' '}
      <code class="text-sm">pipeAsyncSideEffectStrict</code>를 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`// 대부분의 경우: 일반 에러 처리와 함께 pipe만 사용
import { pipe, map, filter } from 'fp-pack';

const processData = pipe(
  validateInput,
  transformData,
  saveData
);

try {
  const result = processData(input);
} catch (error) {
  console.error('Processing failed:', error);
}

// 특수 사례: 부수 효과와 함께 조기 종료가 필요한 경우 pipeSideEffect 사용
import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const processDataPipeline = pipeSideEffect(
  validateInput,
  (data) => {
    if (!data.isValid) {
      return SideEffect.of(() => {
        showToast('Invalid data');  // 부수 효과
        logError('validation_failed');  // 부수 효과
        return null;
      });
    }
    return data;
  },
  transformData
);

// runPipeResult는 파이프라인 외부에서 호출해야 함
const finalValue = runPipeResult(processDataPipeline(input));`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      엄격한 SideEffect 유니온
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      분기별 SideEffect 결과 타입을 정확한 유니온으로 유지하고 싶다면 strict 버전을 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffectStrict, SideEffect } from 'fp-pack';

const pipeline = pipeSideEffectStrict(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEGATIVE' as const)),
  (n) => (n > 10 ? n : SideEffect.of(() => 0 as const))
);

// 결과 타입: number | SideEffect<'NEGATIVE' | 0>
const result = pipeline(5);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      주요 SideEffect 함수
    </h3>

    <ul class="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
      <li><code class="text-sm">SideEffect.of(fn, label?)</code> - 부수 효과 컨테이너 생성</li>
      <li><code class="text-sm">isSideEffect(value)</code> - 값이 SideEffect인지 <strong>런타임 체크</strong>하는 타입 가드</li>
      <li><code class="text-sm">runPipeResult&lt;T, R&gt;(result)</code> - SideEffect 실행 또는 값 반환 (파이프라인 <strong>외부</strong>에서 호출). 입력이 <code class="text-sm">SideEffect&lt;R&gt;</code>로 좁혀지면 <code class="text-sm">R</code>을 반환합니다. 입력 타입이 <code class="text-sm">SideEffect&lt;any&gt;</code>로 넓어졌다면 제네릭으로 안전한 유니온을 복구하세요.</li>
      <li><code class="text-sm">matchSideEffect(result, {'{'} value, effect {'}'})</code> - 결과에 대한 패턴 매치</li>
    </ul>

    <div class="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded">
      <p class="text-sm md:text-base text-orange-900 dark:text-orange-100 font-semibold mb-2">
        ⚠️ 중요: runPipeResult 타입 안전성
      </p>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        <code class="text-sm">runPipeResult&lt;T, R=any&gt;</code>는 기본값 <code class="text-sm">R=any</code>를 가집니다. 입력 타입이 정확하면 추론이 유지되고, 입력이 <code class="text-sm">SideEffect&lt;any&gt;</code>(또는 <code class="text-sm">any</code>)로 넓어지면 결과가 <code class="text-sm">any</code>가 됩니다. 입력이 <code class="text-sm">SideEffect&lt;R&gt;</code>로 좁혀지면 <code class="text-sm">R</code>을 반환합니다. 이때 제네릭을 제공해 유니온을 복구하세요. 정확한 내로잉은 <code class="text-sm">isSideEffect</code>를 사용하세요.
      </p>
    </div>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      타입 안전 결과 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const processNumbers = pipeSideEffect(
  (nums: number[]) => nums.filter(n => n % 2 === 1),
  (odds) => {
    if (odds.length === 0) {
      return SideEffect.of(() => '홀수가 없습니다');
    }
    return odds.map(n => n * 2);
  }
);

const oddsDoubled = processNumbers([1, 2, 3, 4, 5]);

// ✅ 올바름: isSideEffect로 타입 체크
if (!isSideEffect(oddsDoubled)) {
  // TypeScript 인식: oddsDoubled는 number[]
  const sum: number = oddsDoubled.reduce((a, b) => a + b, 0);
  console.log(\`합계: \${sum}\`);  // sum: number
} else {
  // pipeSideEffect는 SideEffect를 any로 넓혀서 runPipeResult가 any가 됨
  const result = runPipeResult(oddsDoubled);
  console.log(\`에러: \${result}\`);  // result: any
}

// ⚠️ 결과 타입이 넓어지면 추론이 깨짐
const widened: number[] | SideEffect<any> = oddsDoubled;
const unsafeResult = runPipeResult(widened);
// unsafeResult: any

// ✅ 올바름: 제네릭으로 안전한 유니온 복구
const safeResult = runPipeResult<number[], string>(oddsDoubled);
// safeResult: number[] | string (유니온 타입 - 안전하지만 좁혀지지 않음)

// ✅ 엄격 파이프라인에서는 SideEffect 타입이 보존됨
const strictResult = pipeSideEffectStrict(
  (nums: number[]) => nums.length > 0 ? nums : SideEffect.of(() => 'EMPTY' as const),
  (nums) => nums
)([]);

if (isSideEffect(strictResult)) {
  const error = runPipeResult(strictResult); // 'EMPTY'
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      코딩 가이드라인
    </h2>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      1. 항상 pipe/pipeAsync를 선호
    </h3>

    <CodeBlock
      language="typescript"
      code={`// 좋음
const result = pipe(
  trim,
  split(','),
  map(toNumber),
  filter(isPositive)
)(input);

// 나쁨
const trimmed = trim(input);
const parts = split(',')(trimmed);
const numbers = map(toNumber)(parts);
const result = filter(isPositive)(numbers);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. 커리된 함수 사용
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      모든 함수는 파이프와 연결하기 쉽게 설계되었습니다. 다중 인수 함수는 커링 스타일로 제공되며, 단일 인수 유틸은 이미 unary라 커링 이점이 없으니 그대로 사용하세요(예: <code class="text-sm">uniq</code>, <code class="text-sm">flatten</code>, <code class="text-sm">trim</code> 등).
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, map, filter } from 'fp-pack';

// 좋음: 파이프에서 커리된 사용
const processUsers = pipe(
  filter(user => user.active),
  map(user => user.name)
);

// 좋음: 부분 적용
const filterActive = filter((user: User) => user.active);
const getNames = map((user: User) => user.name);
const processUsers = pipe(filterActive, getNames);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2.1 커스텀 유틸리티 작성 (커링 타입)
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      커스텀 함수를 추가할 때는 data-last 인수 순서를 유지하고 다중 인수 함수는
      커링하세요. 고정 시그니처는 <code class="text-sm">curry(fn)</code>만으로 충분합니다.
      제네릭/오버로드 시그니처는 타입 별칭과 캐스팅으로 추론을 보강해야 합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';

// 고정 시그니처: curry만으로 충분
function split(separator: string, str: string): string[] {
  return str.split(separator);
}
export default curry(split);

// 제네릭 시그니처: 커리된 형태를 타입 별칭으로 명시
type Chunk = {
  (size: number): <T>(arr: T[]) => T[][];
  <T>(size: number, arr: T[]): T[][];
};

function chunk<T>(size: number, arr: T[]): T[][] {
  // ...
  return [];
}

const curriedChunk = curry(chunk) as Chunk;
export default curriedChunk;`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2.2 타입 안전 팁
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      일부 유틸리티는 안전을 위해 더 넓은 타입을 반환합니다. 기본값/가드를 추가해 타입을 좁혀서
      파이프라인이 불필요하게 넓어지지 않게 하세요.
    </p>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>
        <code class="text-sm">prop</code>는 <code class="text-sm">T[K] | undefined</code>를 반환합니다. 배열
        연산 전에는 <code class="text-sm">propOr</code>나 가드를 사용하세요.
      </li>
      <li>
        <code class="text-sm">ifElse</code>는 양쪽 분기에 <strong>함수</strong>를 기대합니다. 이미 값이 있다면{' '}
        <code class="text-sm">() =&gt; value</code>로 감싸거나, 더 깔끔하게{' '}
        <code class="text-sm">from(value)</code>를 사용하세요.
      </li>
      <li>
        <code class="text-sm">from</code>은 <code class="text-sm">ifElse</code>와{' '}
        <code class="text-sm">cond</code>의 상수 분기에 유용하며, 파이프라인에 데이터를 주입하는 데에도 사용됩니다 (data-first 패턴).
      </li>
      <li>
        <code class="text-sm">cond</code>는 <code class="text-sm">R | undefined</code>를 반환합니다. 기본 분기를 두고
        필요하면 <code class="text-sm">??</code>로 보정하세요.
      </li>
      <li>
        <code class="text-sm">pipeSideEffect</code>에서는 단계별 반환 타입을 가급적 동일하게 유지하세요.
      </li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe, propOr, append, assoc, ifElse, cond, from } from 'fp-pack';

// propOr로 배열 타입을 유지
const addTodo = (text: string, state: AppState) =>
  pipe(
    propOr([], 'todos'),
    append(createTodo(text)),
    (todos) => assoc('todos', todos, state)
  )(state);

// ifElse는 값이 아니라 함수가 필요
const toggleTodo = (id: string) => ifElse(
  (todo: Todo) => todo.id === id,
  assoc('completed', true),
  (todo) => todo
);

// from()으로 상수 분기 표현 - () => value보다 깔끔
const getStatusLabel = ifElse(
  (score: number) => score >= 60,
  from('pass'),    // 상수 값
  from('fail')
);

// from을 사용한 data-first 패턴: 파이프라인에 데이터 주입
const processData = pipe(
  from([1, 2, 3, 4, 5]),
  filter((n: number) => n % 2 === 0),
  map(n => n * 2)
);
const result = processData(); // [4, 8]

// cond는 R | undefined이므로 보정
const grade = (score: number) =>
  cond([
    [(n: number) => n >= 90, () => 'A'],
    [() => true, () => 'F']
  ])(score) ?? 'F';`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2.3 data-last 제네릭 주의사항
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      data-last 유틸이 마지막 데이터 입력에서만 타입이 결정되는 제네릭 함수를 반환하는 경우,
      <code class="text-sm">pipe</code>/<code class="text-sm">pipeAsync</code> 안에서는 TypeScript가 타입을 역추론하지 못합니다.
      필요하면 <code class="text-sm">pipeHint</code>, data-first 래핑, 또는 타입 힌트를 사용하세요.
    </p>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>
        <strong>Array</strong>: <code class="text-sm">chunk</code>, <code class="text-sm">drop</code>, <code class="text-sm">take</code>, <code class="text-sm">zip</code>
      </li>
      <li>
        <strong>Object</strong>: <code class="text-sm">assoc</code>, <code class="text-sm">assocPath</code>, <code class="text-sm">dissocPath</code>, <code class="text-sm">evolve</code>, <code class="text-sm">mapValues</code>, <code class="text-sm">merge</code>, <code class="text-sm">mergeDeep</code>, <code class="text-sm">omit</code>, <code class="text-sm">path</code>, <code class="text-sm">pathOr</code>, <code class="text-sm">pick</code>, <code class="text-sm">prop</code>, <code class="text-sm">propOr</code>, <code class="text-sm">propStrict</code>
      </li>
      <li><strong>Async</strong>: <code class="text-sm">timeout</code></li>
      <li><strong>Stream</strong>: <code class="text-sm">chunk</code>, <code class="text-sm">drop</code>, <code class="text-sm">take</code>, <code class="text-sm">zip</code></li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe, pipeHint, zip, some } from 'fp-pack';

// 방법 1: data-first 래핑
const withWrapper = pipe(
  (values: number[]) => zip([1, 2, 3], values),
  some(([a, b]) => a > b)
);

// 방법 2: 명시적 타입 힌트
const withHint = pipe(
  zip([1, 2, 3]) as (values: number[]) => Array<[number, number]>,
  some(([a, b]) => a > b)
);

// 방법 3: pipeHint 헬퍼
const withPipeHint = pipe(
  pipeHint<number[], Array<[number, number]>>(zip([1, 2, 3])),
  some(([a, b]) => a > b)
);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      타입 안전성을 위한 from()
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      파이프라인 시작에 <code class="text-sm">() =&gt; value</code>를 사용하면 <code class="text-sm">pipe</code>가 unary 함수를 기대하기 때문에 타입 추론이 깨집니다. 대신 <code class="text-sm">from(value)</code>를 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, from, filter, map } from 'fp-pack';

// ❌ 잘못됨: 타입 추론 실패
const broken = pipe(
  () => [1, 2, 3, 4, 5],    // 타입: () => number[]
  filter((n: number) => n % 2 === 0)  // 에러! (input) => output을 기대
);

// ✅ 올바름: from()이 올바른 unary 함수 생성
const works = pipe(
  from([1, 2, 3, 4, 5]),    // 타입: <I>(_: I) => number[]
  filter((n: number) => n % 2 === 0),  // 완벽하게 작동
  map(n => n * 2)
);

works(); // [4, 8] - 타입 에러 없음, 깔끔한 추론`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. pipe vs pipeSideEffect 선택
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong>기본 선택: <code class="text-sm">pipe</code> / <code class="text-sm">pipeAsync</code>로 시작하세요</strong>
    </p>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      대부분의 데이터 변환은 순수하며 SideEffect 처리가 필요하지 않습니다. 다음 선택 가이드를 활용하세요:
    </p>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-gray-300 dark:border-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              상황
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              선택
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              이유
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900">
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              순수한 데이터 변환 (동기)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipe</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              SideEffect 처리 불필요
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              순수한 데이터 변환 (비동기)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipeAsync</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              SideEffect 처리 불필요
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              조기 종료 + 부수 효과 (동기)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeSideEffect</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              SideEffect에서 자동 단락
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              조기 종료 + 부수 효과 (비동기)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeAsyncSideEffect</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              SideEffect에서 자동 단락
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              정확한 SideEffect 유니온 타입 (동기)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeSideEffectStrict</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              분기별 정확한 유니온 추적
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              정확한 SideEffect 유니온 타입 (비동기)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeAsyncSideEffectStrict</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              분기별 정확한 유니온 추적
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>요약:</strong> 99%의 경우 <code class="text-sm">pipe</code>/<code class="text-sm">pipeAsync</code>를 사용하세요. 부수 효과가 있는 조기 종료가 필요한 경우에만 SideEffect 버전으로 전환하세요.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      React 통합
    </h2>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack은 React와 완벽하게 통합됩니다. React 애플리케이션에서 fp-pack을 활용하는 일반적인 패턴들을 소개합니다.
    </p>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      이벤트 핸들러
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, prop, trim, tap, assoc } from 'fp-pack';

// 폼 입력 변경 처리
const handleNameChange = pipe(
  prop('currentTarget'),
  (el) => (el as HTMLInputElement).value,
  trim,
  tap((value) => {
    // 오래된 상태를 피하기 위해 업데이터 형식 사용
    setFormState(prev => assoc('name', value, prev));
  })
);

// JSX에서 사용
<input onChange={handleNameChange} />

// 폼 제출 처리
const handleSubmit = pipe(
  tap((e: Event) => e.preventDefault()),
  () => formState,
  validateForm,
  tap(submitToAPI)
);

<form onSubmit={handleSubmit}>...</form>`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      입력 없이 부수 효과만 실행하려면 <code class="text-sm">tap0</code>를 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { tap0 } from 'fp-pack';

tap0(() => console.log('init'))();`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      useMemo를 활용한 데이터 변환
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { useMemo } from 'react';
import { pipe, filter, sortBy, map, take } from 'fp-pack';

function UserList({ users }: { users: User[] }) {
  // 비용이 큰 변환을 메모이제이션
  const processedUsers = useMemo(
    () => pipe(
      filter((u: User) => u.active),
      sortBy(u => u.name),
      map(u => ({ ...u, displayName: \`\${u.firstName} \${u.lastName}\` })),
      take(50)
    )(users),
    [users]
  );

  return <div>{processedUsers.map(u => ...)}</div>;
}`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      useEffect를 활용한 비동기 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { useEffect } from 'react';
import { pipeAsync, tap } from 'fp-pack';

function UserProfile({ userId }: { userId: string }) {
  useEffect(() => {
    const fetchUser = pipeAsync(
      (id: string) => fetch(\`/api/users/\${id}\`),
      response => response.json(),
      tap(setUser),
      tap(() => setLoading(false))
    );

    fetchUser(userId);
  }, [userId]);

  return ...;
}`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      상태 업데이트
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, assoc, dissoc, map } from 'fp-pack';

// 중첩된 상태를 불변으로 업데이트
const updateUserName = (name: string) => {
  setState(prev => pipe(
    assoc('name', name),
    assoc('updatedAt', Date.now())
  )(prev));
};

// 배열 상태 변환
const toggleTodo = (id: string) => {
  setTodos(prev => pipe(
    map((todo: Todo) =>
      todo.id === id
        ? assoc('completed', !todo.completed, todo)
        : todo
    )
  )(prev));
};`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      피해야 할 안티 패턴
    </h2>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      ❌ 명령형 루프 사용하지 마세요
    </h3>

    <CodeBlock
      language="typescript"
      code={`// 나쁨
const result = [];
for (const item of items) {
  if (item.active) {
    result.push(item.name);
  }
}

// 좋음
const result = pipe(
  filter((item: Item) => item.active),
  map(item => item.name)
)(items);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      ❌ 배열 메서드 체이닝하지 마세요
    </h3>

    <CodeBlock
      language="typescript"
      code={`// 나쁨
const result = users
  .filter(u => u.active)
  .map(u => u.name)
  .slice(0, 10);

// 좋음
const result = pipe(
  filter((u: User) => u.active),
  map(u => u.name),
  take(10)
)(users);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      ❌ 데이터를 변이시키지 마세요
    </h3>

    <CodeBlock
      language="typescript"
      code={`// 나쁨
const updateUser = (user: User) => {
  user.lastLogin = new Date();
  return user;
};

// 좋음
const updateUser = (user: User) => ({
  ...user,
  lastLogin: new Date()
});

// fp-pack을 사용하면 더욱 좋음
import { assoc } from 'fp-pack';
const updateUser = assoc('lastLogin', new Date());`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      스트림 함수
    </h2>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      대용량 데이터셋을 처리할 때 지연 평가를 위해 stream/* 함수를 사용하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`// 지연 스트림 처리
const processLargeDataset = pipe(
  filter((n: number) => n % 2 === 0),
  map(n => n * n),
  take(100),
  toArray
);
const result = processLargeDataset(range(1, 1000000));`}
    />

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      스트림 함수는 동기 및 비동기 이터러블을 모두 지원합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      빠른 참조
    </h2>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      임포트 경로
    </h3>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>주요 함수: <code class="text-sm">import {'{'} pipe, map, filter {'}'} from 'fp-pack'</code></li>
      <li>비동기: <code class="text-sm">import {'{'} pipeAsync, delay, retry {'}'} from 'fp-pack'</code></li>
      <li>SideEffect: <code class="text-sm">import {'{'} pipeSideEffect, pipeSideEffectStrict, pipeAsyncSideEffect, pipeAsyncSideEffectStrict, SideEffect {'}'} from 'fp-pack'</code></li>
      <li>스트림: <code class="text-sm">import {'{'} map, filter, toArray {'}'} from 'fp-pack/stream'</code></li>
    </ul>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      언제 무엇을 사용할지
    </h3>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>순수 동기 변환</strong>: <code class="text-sm">pipe</code> + 배열/객체 함수</li>
      <li><strong>순수 비동기 연산</strong>: <code class="text-sm">pipeAsync</code></li>
      <li><strong>SideEffect를 사용한 에러 처리</strong>: <code class="text-sm">pipeSideEffect</code> (동기) / <code class="text-sm">pipeAsyncSideEffect</code> (비동기)</li>
      <li><strong>엄격한 SideEffect 유니온</strong>: <code class="text-sm">pipeSideEffectStrict</code> (동기) / <code class="text-sm">pipeAsyncSideEffectStrict</code> (비동기)</li>
      <li><strong>런타임 타입 체크</strong>: <code class="text-sm">isSideEffect</code>로 SideEffect 여부 확인</li>
      <li><strong>SideEffect 실행</strong>: <code class="text-sm">runPipeResult&lt;T, R&gt;</code> (파이프라인 외부에서 호출, 제네릭 제공)</li>
      <li><strong>대용량 데이터셋</strong>: <code class="text-sm">stream/*</code> 함수</li>
      <li><strong>조건문</strong>: <code class="text-sm">ifElse</code>, <code class="text-sm">when</code>, <code class="text-sm">unless</code>, <code class="text-sm">cond</code></li>
      <li><strong>객체 접근</strong>: <code class="text-sm">prop</code>, <code class="text-sm">propStrict</code>, <code class="text-sm">path</code>, <code class="text-sm">pick</code>, <code class="text-sm">omit</code></li>
      <li><strong>객체 업데이트</strong>: <code class="text-sm">assoc</code>, <code class="text-sm">merge</code>, <code class="text-sm">evolve</code></li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      핵심 원칙 요약
    </h2>

    <ol class="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside mb-8">
      <li><strong>모든 데이터 변환에는 <code class="text-sm">pipe</code>를 기본으로</strong> 사용</li>
      <li><strong>비동기 연산이 포함되면 <code class="text-sm">pipeAsync</code>로 전환</strong></li>
      <li><strong>지연, 메모리 효율적인 처리를 위해 <code class="text-sm">stream/*</code> 사용</strong></li>
      <li><strong><code class="text-sm">pipeSideEffect</code>/<code class="text-sm">pipeAsyncSideEffect</code>에서 <code class="text-sm">SideEffect</code>로 에러 처리</strong></li>
      <li><strong>엄격한 유니온이 필요하면</strong> <code class="text-sm">pipeSideEffectStrict</code>/<code class="text-sm">pipeAsyncSideEffectStrict</code> 사용</li>
      <li><strong>명령형 루프 피하기</strong> - fp-pack의 선언적 함수 사용</li>
      <li><strong>모나드 제안하지 않기</strong> - 대신 SideEffect 패턴 사용</li>
      <li><strong>코드를 선언적으로 유지</strong> - 무엇을 할지 기술, 어떻게가 아님</li>
      <li><strong>모든 로직을 파이프 안에</strong> - 분기하지 말고 제어 흐름 함수 사용</li>
      <li><strong>파이프라인 외부에서 <code class="text-sm">runPipeResult</code> 호출</strong>하고 타입 안전성을 위해 제네릭 제공</li>
      <li><strong>런타임 체크를 위해 <code class="text-sm">isSideEffect</code> 사용</strong> - 런타임에 값이 SideEffect인지 확인</li>
    </ol>

    <div class="mt-10 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-800">
      <h3 class="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
        더 탐색할 준비가 되셨나요?
      </h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        핵심 개념을 이해했으니, 이제 사용 가능한 모든 함수를 보려면 API 문서를 탐색하세요:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={() => navigateTo('/ko/composition/pipe')}
          class="text-left p-3 bg-white dark:bg-gray-800 rounded border border-green-300 dark:border-green-700 hover:border-green-500 dark:hover:border-green-500 transition-colors"
        >
          <div class="font-semibold text-green-700 dark:text-green-300">조합 함수</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">pipe, compose, curry 등</div>
        </button>
        <button
          onClick={() => navigateTo('/ko/stream/map')}
          class="text-left p-3 bg-white dark:bg-gray-800 rounded border border-green-300 dark:border-green-700 hover:border-green-500 dark:hover:border-green-500 transition-colors"
        >
          <div class="font-semibold text-green-700 dark:text-green-300">스트림 함수</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">대용량 데이터셋을 위한 지연 처리</div>
        </button>
      </div>
    </div>
  </div>
);
