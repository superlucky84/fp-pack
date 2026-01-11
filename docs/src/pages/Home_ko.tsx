import { navigateTo } from '@/store';
import { CodeBlock } from '@/components/CodeBlock';

export const Home_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      fp-pack
    </h1>

    <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
      JavaScript와 TypeScript를 위한 실용적인 함수형 도구 키트. 함수, 파이프, 커리만 알면 바로 사용할 수 있습니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      핵심 철학
    </h2>

    <ul class="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3 text-2xl">🔄</span>
        <div>
          <strong class="text-lg">파이프 우선 합성</strong>
          <p class="mt-1">깔끔하고 왼쪽에서 오른쪽으로 흐르는 데이터 변환을 위해 <code class="text-sm">pipe</code>와 <code class="text-sm">pipeAsync</code>를 중심으로 설계. 개발자들이 이미 알고 있는 표준 파이프라인 패턴을 따릅니다.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-purple-500 font-bold mr-3 text-2xl">⚡</span>
        <div>
          <strong class="text-lg">SideEffect 패턴</strong>
          <p class="mt-1">SideEffect-aware 파이프라인에서 에러와 사이드 이펙트를 선언적으로 처리합니다. <code class="text-sm">SideEffect</code>로 예외 경로를 표시하면 <code class="text-sm">pipeSideEffect</code>/<code class="text-sm">pipeAsyncSideEffect</code>가 자동으로 조기 종료를 처리합니다. 에러 배관이 아닌, 비즈니스 로직에 집중하세요. 더 엄격한 유니온 타입이 필요하면 <code class="text-sm">pipeSideEffectStrict</code>/<code class="text-sm">pipeAsyncSideEffectStrict</code>를 사용하세요.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-orange-500 font-bold mr-3 text-2xl">🔀</span>
        <div>
          <strong class="text-lg">비동기 일급 지원</strong>
          <p class="mt-1"><code class="text-sm">pipeAsync</code>로 비동기 흐름 제어를 실용적이고 합성 가능하게 만듭니다. 파이프라인 내에서 동기와 비동기 함수를 자연스럽게 섞어 사용할 수 있습니다.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-pink-500 font-bold mr-3 text-2xl">🎯</span>
        <div>
          <strong class="text-lg">커링 설계</strong>
          <p class="mt-1">모든 다중 인자 유틸리티 함수는 커리드 되거나 커리드 함수처럼 동작하여, 부분 적용과 포인트 프리 스타일을 통해 파이프에서 우아한 합성을 가능하게 합니다.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-gray-500 font-bold mr-3 text-2xl">📦</span>
        <div>
          <strong class="text-lg">스트림 처리</strong>
          <p class="mt-1"><code class="text-sm">stream/*</code> 함수로 대용량 데이터셋을 위한 지연 평가를 제공합니다.</p>
        </div>
      </li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      왜 fp-pack인가?
    </h2>

    <ul class="space-y-3 text-gray-700 dark:text-gray-300">
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🎯</span>
        <div>
          <strong>실용적이고 현실적</strong> - 실제 프로덕션에서 사용하는 일상적인 비동기 작업, 데이터 파이프라인, 에러 처리를 위한 솔루션
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🧩</span>
        <div>
          <strong>실용적 추상화</strong> - 전통적인 모나드 패턴을 피하고 가벼운 <code class="text-sm">SideEffect</code> 마커로 에러 처리. 모든 함수를 래퍼로 감쌀 필요 없음
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">📘</span>
        <div>
          <strong>JavaScript & TypeScript</strong> - JavaScript에서 완벽하게 작동. TypeScript로 작성되어 필요할 때 강력한 타입 추론 제공
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🪶</span>
        <div>
          <strong>경량 & 모듈형</strong> - 제로 의존성, 완전한 트리 쉐이킹 지원, ~5KB 풋프린트
        </div>
      </li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      주요 기능
    </h2>

    <div class="grid gap-4 md:gap-6 mt-6 mb-8">
      <div class="block p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2 md:mb-3">
          표준 파이프 연산
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          <code class="text-xs md:text-sm">pipe</code> / <code class="text-xs md:text-sm">pipeAsync</code>는 순수한 함수 합성 도구입니다. 타입 추론을 위해
          <code class="text-xs md:text-sm">pipe(data, ...)</code> 형태를 우선 사용하세요. 타입 불일치를 더 엄격하게 검사하려면 <code class="text-xs md:text-sm">pipeStrict</code> / <code class="text-xs md:text-sm">pipeAsyncStrict</code>를 사용하세요.
        </p>
        <CodeBlock
          language="typescript"
          code={`// 표준: 함수 합성
const result = pipe(
  users,
  filter(user => user.active),
  map(user => user.name),
  take(10)
);

// 선택사항: from으로 인자 없는 파이프
const process = pipe(
  from([1, 2, 3, 4, 5]),
  filter(n => n % 2 === 0)
);
process(); // [2, 4]`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2 md:mb-3">
          에러 처리를 위한 SideEffect
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          래퍼 오버헤드 없는 모나딕 합성. <code class="text-xs md:text-sm">SideEffect</code>로 <code class="text-xs md:text-sm">pipeSideEffect</code>/<code class="text-xs md:text-sm">pipeAsyncSideEffect</code> 파이프라인에서 깔끔한 에러 처리—비즈니스 로직만, 인프라 코드는 없이. 더 정밀한 타입 유니온이 필요하면 <code class="text-xs md:text-sm">pipeSideEffectStrict</code>/<code class="text-xs md:text-sm">pipeAsyncSideEffectStrict</code>를 선택하세요.
        </p>
        <CodeBlock
          language="typescript"
          code={`const result = runPipeResult(
  pipeSideEffect(
    data,
    validate,
    (data) => data.ok
      ? data
      : SideEffect.of(() => {
          throw new Error('Invalid');
        }),
    transform
  )
);`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2 md:mb-3">
          pipeAsync로 비동기 파이프라인
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          비동기 연산을 자연스럽게 합성합니다. 같은 파이프라인에서 동기와 비동기 함수를 혼합 사용 가능.
        </p>
        <CodeBlock
          language="typescript"
          code={`const user = await pipeAsync(
  userId,
  async (id) => fetch(\`/api/\${id}\`),
  (res) => res.json(),
  (data) => data.user
);`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 mb-2 md:mb-3">
          스트림 처리
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          대용량 데이터셋을 위한 지연 평가.
        </p>
        <CodeBlock
          language="typescript"
          code={`import * as Stream from 'fp-pack/stream';

const first100 = pipe(
  Stream.range(1, 1000000),
  Stream.filter(n => n % 2 === 0),
  Stream.take(100),
  Stream.toArray
);`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      SideEffect 이해하기
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-6">
      JavaScript 함수형 프로그래밍에서는 파이프라인을 깨뜨리지 않고 예외를 처리하는 것이 어렵습니다. <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">try-catch</code>를 사용하면 합성이 깨지고, 모든 함수를 <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Either</code>/<code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Result</code>로 래핑하면 매 단계마다 <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">map</code>/<code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">chain</code>을 명시해야 합니다—단순한 에러 처리에 너무 많은 의례적 코드가 필요합니다.
      <br /><br />
      <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">SideEffect</code> 패턴은 이를 해결합니다: <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">pipeSideEffect</code>/<code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">pipeAsyncSideEffect</code> 파이프라인에서 합성되는 일반 함수를 작성하고, 조기 종료나 사이드 이펙트가 필요한 예외적인 경로만 표시하면 됩니다. 이 파이프라인은 <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">SideEffect</code>를 만나면 자동으로 단락(short-circuit)됩니다—흐름을 깨지 않는 깔끔한 에러 처리.
    </p>

    <div class="space-y-6 mb-8">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 class="text-xl font-medium text-blue-900 dark:text-blue-100 mb-3">
          에러 발생 시 즉시 종료
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          함수가 <code class="text-xs md:text-sm bg-blue-100 dark:bg-blue-800 px-1 rounded">SideEffect</code>를 반환하면 파이프라인이 즉시 중단됩니다. 더 이상 함수가 실행되지 않고, effect가 호출자에게 직접 반환됩니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        alert('만 18세 이상이어야 합니다');
        return null;  // 조기 종료
      });

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const result = runPipeResult(
  pipeSideEffect(
    15,
    validateAge,
    (age) => \`나이: \${age}\`,  // 검증 실패 시 실행되지 않음
    (msg) => console.log(msg)
  )
);
// 파이프라인이 SideEffect에서 중단, alert 실행, null 반환`}
        />
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 class="text-xl font-medium text-purple-900 dark:text-purple-100 mb-3">
          옵셔널 체이닝 패턴
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          effect에서 <code class="text-xs md:text-sm bg-purple-100 dark:bg-purple-800 px-1 rounded">null</code>을 반환하면 흐름을 우아하게 종료합니다—JavaScript의 옵셔널 체이닝과 유사하지만, 명시적이고 합성 가능합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`const findUser = (id: string) => {
  const user = database.get(id);
  return user
    ? user
    : SideEffect.of(() => null);  // 우아한 종료
};

// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const email = runPipeResult(
  pipeSideEffect(
    'unknown-id',
    findUser,
    (user) => user.email,  // 사용자를 찾지 못하면 건너뜀
    (email) => email.toLowerCase()
  )
);
// 에러 없이 null 반환 - 깔끔한 옵셔널 흐름`}
        />
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 class="text-xl font-medium text-green-900 dark:text-green-100 mb-3">
          실전: 사용자 알림 흐름
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          검증, 사이드 이펙트, 비즈니스 로직을 하나의 읽기 쉬운 파이프라인으로 결합합니다. 필요할 때 사용자에게 알리고 깔끔하게 종료합니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`// runPipeResult는 파이프라인 밖에서 호출해야 합니다
const result = runPipeResult(
  pipeSideEffect(
    userCard,
    validateCard,
    (card) => card.balance >= 100
      ? card
      : SideEffect.of(() => {
          showToast('잔액이 부족합니다');
          logEvent('payment_failed', { reason: 'insufficient_funds' });
          return null;
        }),
    chargeCard,
    sendReceipt,
    (receipt) => ({ success: true, receipt })
  )
);
// 잔액 부족 시: 토스트 표시, 이벤트 로깅, null 반환
// 그 외: 결제 완료 및 성공 객체 반환`}
        />
      </div>

      <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
        <h3 class="text-xl font-medium text-orange-900 dark:text-orange-100 mb-3">
          왜 이것이 중요한가
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          <strong>JavaScript 예외 처리 문제:</strong> 함수형 파이프라인에서 예외를 던지면 합성이 깨집니다—제어가 파이프 밖으로 점프합니다. 이를 피하려면 <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">try-catch</code>(흐름을 깸) 또는 모든 함수를 <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">Either</code>/<code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">Result</code>로 래핑(<code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">map</code>/<code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">chain</code>을 어디서나 사용)해야 합니다. 두 방법 모두 비즈니스 로직 대신 <em>에러 배관</em>에 신경 쓰게 만듭니다.
          <br /><br />
          <strong>SideEffect 솔루션:</strong> 자연스럽게 합성되는 <strong>일반 함수</strong>를 작성합니다. 조기 종료가 필요할 때(검증 실패, 데이터 누락, 에러)는 <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">SideEffect.of(() =&gt; ...)</code>를 반환하면 됩니다. <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">pipeSideEffect</code>/<code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">pipeAsyncSideEffect</code> 파이프라인이 자동으로 중단됩니다—의례적 코드도, 래퍼도, 배관도 없습니다. 예외적인 경로를 명시적으로 표시하고, 마지막에 <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">runPipeResult</code>로 한 번만 처리하면 됩니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      AI 에이전트 스킬
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-4">
      fp-pack은 AI 코딩 어시스턴트(Claude Code, GitHub Copilot, Cursor 등)가 자동으로 fp-pack 스타일의 함수형 코드를 작성하도록 돕는 스킬 파일을 포함합니다.
    </p>

    <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 md:p-6 mb-6 rounded-r">
      <h3 class="text-lg font-medium text-green-800 dark:text-green-200 mb-3">
        🤖 AI 어시스턴트가 하는 일
      </h3>
      <ul class="space-y-2 text-sm md:text-base text-green-800 dark:text-green-200">
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>순수 변환에는 <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipe</code>/<code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipeAsync</code>, SideEffect가 포함되면 <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipeSideEffect</code>/<code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipeAsyncSideEffect</code> 사용</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>try-catch 대신 <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">SideEffect</code> 패턴 사용</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>대용량 데이터셋에는 <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">stream/*</code> 함수 선호</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>fp-pack 유틸리티를 사용한 선언적, 함수형 코드 작성</span>
        </li>
      </ul>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      설정 방법
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
      AI 코딩 어시스턴트가 스킬 파일을 지원한다면, <code class="text-xs md:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">fp-pack.md</code>를 적절한 디렉토리에 복사하세요.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
      <strong>Claude Code의 경우:</strong> <code class="text-xs md:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.claude/skills/</code>에 복사
    </p>

    <CodeBlock
      language="bash"
      code={`# Unix/macOS/Linux
cp node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/

# Windows (PowerShell)
Copy-Item node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/

# 또는 수동으로 디렉토리 생성 후 복사
mkdir -p .claude/skills
cp node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
      <strong>Codex의 경우:</strong> <code class="text-xs md:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">~/.codex/skills/fp-pack/</code>에 복사
    </p>

    <CodeBlock
      language="bash"
      code={`# Unix/macOS/Linux
mkdir -p ~/.codex/skills/fp-pack
cp node_modules/fp-pack/dist/skills/fp-pack/SKILL.md ~/.codex/skills/fp-pack/SKILL.md

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "$HOME/.codex/skills/fp-pack"
Copy-Item node_modules/fp-pack/dist/skills/fp-pack/SKILL.md $HOME/.codex/skills/fp-pack/SKILL.md`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mt-4 mb-2">
      <strong>다른 AI 어시스턴트의 경우:</strong> 해당 도구의 문서를 참고하여 스킬/지침 파일을 배치할 위치를 확인하세요.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      설정을 완료하면 AI 어시스턴트가 코드 작성 시 자동으로 fp-pack 코딩 패턴을 적용합니다.
    </p>

    <div class="bg-indigo-50 dark:bg-indigo-900/20 p-4 md:p-6 rounded-lg border border-indigo-200 dark:border-indigo-800 mb-6">
      <h3 class="text-lg font-medium text-indigo-900 dark:text-indigo-200 mb-2">
        🌐 AI Agent Role Add-on (전역)
      </h3>
      <p class="text-sm text-indigo-800 dark:text-indigo-300 mb-2">
        시스템 프롬프트를 지원하는 에이전트(OpenCode, 커스텀 에이전트 등)의 경우, fp-pack은 프로젝트에서 fp-pack이 감지될 때 조건부로 패턴을 강제하는 <strong>재사용 가능한 행동 모듈</strong>을 제공합니다.
      </p>
      <p class="text-sm text-indigo-800 dark:text-indigo-300">
        <a
          href="/ko/ai-agent-addon"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/ko/ai-agent-addon');
          }}
          class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
        >
          AI Agent Role Add-on 자세히 보기 →
        </a>
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      시작하기
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-6">
      강력하고 타입 안전한 파이프라인을 구축하기 위한 핵심 합성 유틸리티를 살펴보세요:
    </p>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors cursor-pointer"
      >
        <h3 class="text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          가독성 있는 데이터 변환을 위해 왼쪽에서 오른쪽으로 함수를 합성합니다.
        </p>
      </a>

      <a
        href="/composition/compose"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/compose');
        }}
        class="block p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 transition-colors cursor-pointer"
      >
        <h3 class="text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          compose →
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          전통적인 수학적 스타일로 오른쪽에서 왼쪽으로 함수를 합성합니다.
        </p>
      </a>

      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 rounded-lg border border-pink-200 dark:border-pink-800 hover:border-pink-400 dark:hover:border-pink-600 transition-colors cursor-pointer"
      >
        <h3 class="text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          curry →
        </h3>
        <p class="text-gray-700 dark:text-gray-300">
          유연한 합성을 위해 부분 적용을 지원하도록 함수를 변환합니다.
        </p>
      </a>
    </div>
  </div>
);
