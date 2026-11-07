import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const CurryN_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">curryN</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      기본값·선택적·rest 인자가 있는 함수의 실행 시점을 지정합니다.
    </p>
    <p>
      <code>curryN(arity, fn)</code>은 누적된 인자 개수가 <code>arity</code>에 도달하면 실행합니다. 인자와 결과 타입은
      원래 함수에서 추론합니다. 0부터 32까지의 리터럴 개수를 사용하며, 필수 인자를 모두 제공할 수 있고 원래 함수의 인자
      목록에 맞는 개수를 선택하세요.
    </p>

    <h2 class="text-2xl font-medium mt-8 mb-4">기본값과 선택적 인자</h2>
    <p>
      기본값 인자는 JavaScript의 <code>fn.length</code>를 바꿉니다. 명시적인 개수로 기본값을 사용할지 다음 값을 기다릴지
      선택할 수 있습니다.
      <code>undefined</code>도 한 자리로 세며 원래 함수의 기본값을 적용합니다.
    </p>
    {/* inference-usability: curryN defaults ko */}
    <CodeBlock
      language="typescript"
      code={`import { curryN } from 'fp-pack';

const add = (a: number, b = 10) => a + b;
curryN(1, add)(2);            // 12
curryN(2, add)(2)(3);         // 5
curryN(2, add)(2)(undefined); // 12
curryN(1, add)(2, 3);         // 5; 추가한 유효 인자도 전달

const format = (value: number, unit?: string) => value.toFixed() + (unit ?? '');
curryN(1, format)(2);         // '2'
curryN(2, format)(2)('kg');   // '2kg'`}
    />

    <h2 class="text-2xl font-medium mt-8 mb-4">rest 인자와 부분 적용 재사용</h2>
    <p>
      지정한 개수는 실행 기준입니다. 마지막 호출에서 제공한 추가 rest 값도 모두 전달합니다. 빈 호출은 양수 단계의 대기를
      유지하며, 선택적·rest 인자의 끝을 의미하지 않습니다.
    </p>
    {/* inference-usability: curryN rest ko */}
    <CodeBlock
      language="typescript"
      code={`import { curryN } from 'fp-pack';

const total = (label: string, ...values: number[]) =>
  label + values.reduce((sum, value) => sum + value, 0);
const labeledTotal = curryN(3, total)('sum:');

labeledTotal()(1)(2, 3); // 'sum:6'
labeledTotal(4, 5);     // 'sum:9'; 부분 적용 함수 재사용 가능`}
    />

    <h2 class="text-2xl font-medium mt-8 mb-4">0개도 호출할 때 실행</h2>
    {/* inference-usability: curryN zero ko */}
    <CodeBlock
      language="typescript"
      code={`import { curryN } from 'fp-pack';

let calls = 0;
const run = curryN(0, () => ++calls);
// calls는 아직 0
run(); // 1
run(); // 2`}
    />

    <h2 class="text-2xl font-medium mt-8 mb-4">파이프와 콜백의 타입 추론</h2>
    {/* inference-usability: curryN pipeline ko */}
    <CodeBlock
      language="typescript"
      code={`import { curryN, pipe, pipeAsync } from 'fp-pack';

const addFive = curryN(2, (amount: number, value = 0) => amount + value)(5);
const label = pipe(3, addFive, value => value.toFixed()); // string
const asyncValue = pipeAsync(3, addFive);                // Promise<number>

const render = curryN(1, (format: (value: number) => string, value = 2) => format(value));
render(value => value.toFixed()); // string; value는 number로 추론`}
    />

    <h2 class="text-2xl font-medium mt-8 mb-4">개수와 추론의 경계</h2>
    <ul>
      <li>음수·소수·32보다 큰 개수는 정적 오류이며 실행 시 RangeError를 발생시킵니다.</li>
      <li>필수 인자보다 적거나 고정된 인자 목록보다 많은 개수는 정적 오류입니다.</li>
      <li>동적인 number 값은 정확한 단계를 표현할 수 없으므로 리터럴 개수를 사용하세요.</li>
      <li>길이가 불확실한 배열 spread는 알려진 튜플 접두부로 실행 완료가 증명될 때까지 unknown입니다.</li>
      <li>명시적인 receiver가 있는 메서드는 먼저 bind한 뒤 전달하세요.</li>
      <li>임의의 제네릭·오버로드 함수에는 Parameters/ReturnType 추론 한계가 적용됩니다.</li>
    </ul>
    <p>
      명시적인 재사용 계약이 필요하면 <code>CurriedN&lt;typeof fn, 2&gt;</code>를 사용할 수 있습니다. 일반 호출은 자동
      추론합니다. Promise 반환 타입은 그대로 유지하며 미리 기다리거나 실행하지 않습니다.
    </p>
    <p>
      <a
        href="/ko/composition/curry"
        onClick={(event: Event) => {
          event.preventDefault();
          navigateTo('/ko/composition/curry');
        }}
      >
        curry
      </a>
      는 원래 함수의 length를 사용하며 기존 호출의 동작을 유지합니다.
    </p>
    <p>
      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/curryN.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub에서 구현 보기
      </a>
    </p>
  </div>
);
