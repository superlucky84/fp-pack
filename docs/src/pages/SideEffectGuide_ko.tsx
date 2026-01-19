import { CodeBlock } from '@/components/CodeBlock';

export const SideEffectGuide_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      SideEffect 사용 가이드
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      SideEffect 파이프라인은 조기 종료나 명시적 부수 효과 처리가 필요할 때 사용합니다.
      단계 중 하나가 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">SideEffect</code>를 반환하면 파이프가 즉시 중단됩니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-6 rounded-r-lg mb-8">
      <h2 class="text-2xl md:text-3xl font-medium text-green-900 dark:text-green-100 mb-4">
        SideEffect 파이프를 써야 하는 경우
      </h2>
      <ul class="text-sm md:text-base text-green-800 dark:text-green-200 space-y-2 list-disc list-inside mb-4">
        <li>검증 실패나 데이터 누락 시 조기 종료</li>
        <li>에러 경로를 명확하게 분리하고 싶은 경우</li>
        <li>부수 효과를 실행하고 흐름을 멈춰야 하는 경우</li>
      </ul>
      <p class="text-sm text-green-700 dark:text-green-300 m-0">
        <strong>참고:</strong> 일반적인 에러 처리는 <code class="px-1 py-0.5 bg-green-100 dark:bg-green-900/40 rounded">pipe</code>/<code class="px-1 py-0.5 bg-green-100 dark:bg-green-900/40 rounded">pipeAsync</code>와 try/catch로 충분합니다.
      </p>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      변형 선택 가이드
    </h2>

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
      <ul class="space-y-4 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li class="flex items-start">
          <span class="text-blue-500 mr-3 mt-1">▸</span>
          <div>
            <code class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">pipeSideEffect</code> / <code class="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">pipeAsyncSideEffect</code>:
            DX 우선, 효과 타입이 <code class="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">SideEffect&lt;any&gt;</code>로 넓어집니다.
          </div>
        </li>
        <li class="flex items-start">
          <span class="text-purple-500 mr-3 mt-1">▸</span>
          <div>
            <code class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">pipeSideEffectStrict</code> / <code class="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">pipeAsyncSideEffectStrict</code>:
            분기별 SideEffect 타입을 정밀하게 유니온으로 추적합니다.
          </div>
        </li>
      </ul>
    </div>

    <div class="border-l-4 border-slate-500 bg-slate-50 dark:bg-slate-900/30 p-6 rounded-r-lg mb-10">
      <p class="text-sm md:text-base text-slate-800 dark:text-slate-200 m-0">
        💡 <strong>핵심 개념:</strong> <code class="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">SideEffect</code>는 지연 실행됩니다. 내부 함수는 자동으로 실행되지 않으며,
        <code class="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">runPipeResult</code>를 호출하거나 <code class="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded">effect.effect()</code>를
        직접 호출할 때만 실행됩니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      기본 동기 파이프라인
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

type User = { id: number; name: string };

const validateUser = (user: User) =>
  user.name.length > 0
    ? user
    : SideEffect.of(() => 'MISSING_NAME' as const);

const normalizeUser = pipeSideEffect(
  validateUser,
  (user) => ({ ...user, name: user.name.trim() })
);

const result = normalizeUser({ id: 1, name: '' });

if (isSideEffect(result)) {
  const reason = runPipeResult(result); // any (non-strict pipeline)
  console.log('Invalid:', reason);
} else {
  console.log('OK:', result.name);
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      비동기 파이프라인
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect } from 'fp-pack';

const fetchUser = (id: number) => fetch(\`/api/users/\${id}\`).then(res => res.json());

const loadUser = pipeAsyncSideEffect(
  fetchUser,
  (user) => (user ? user : SideEffect.of(() => 'NOT_FOUND' as const)),
  (user) => ({ ...user, loadedAt: Date.now() })
);

const result = await loadUser(123);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      결과 안전하게 처리하기
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      SideEffect 결과는 반드시 파이프라인 바깥에서 처리하세요. 결과 타입이 <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">SideEffect&lt;any&gt;</code>로
      넓어졌다면 제네릭으로 안전한 유니온을 복구하세요.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { matchSideEffect, runPipeResult } from 'fp-pack';

const widened: User | SideEffect<any> = result;

const safe = runPipeResult<User, 'MISSING_NAME'>(widened);
// safe: User | 'MISSING_NAME'

const message = matchSideEffect<User, string, string>(result, {
  value: (user) => \`Hello \${user.name}\`,
  effect: (effect) => \`Error: \${String(effect.effect())}\`
});`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      isSideEffect 경계 처리
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">isSideEffect</code>는 런타임 가드이면서 동시에 TypeScript 타입 가드입니다.
      파이프라인 바로 뒤 경계에서 분기 처리하면 안전합니다. strict 파이프라인에서는 효과 유니온이 그대로 유지됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const validate = (value: number) =>
  value > 0 ? value : SideEffect.of(() => 'NEGATIVE' as const);

const result = pipeSideEffectStrict(
  validate,
  (value) => value + 1
)(-1);

if (isSideEffect(result)) {
  const reason = runPipeResult(result);
  // reason: 'NEGATIVE'
} else {
  const value = result;
  // value: number
}`}
    />

    <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-r-lg my-8">
      <p class="text-sm md:text-base text-blue-900 dark:text-blue-100 font-semibold mb-2">
        💡 non-strict 파이프는 효과 타입이 넓어집니다
      </p>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 m-0">
        <code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">pipeSideEffect</code>/<code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">pipeAsyncSideEffect</code>에서는
        효과 타입이 <code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">SideEffect&lt;any&gt;</code>입니다. <code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">isSideEffect</code> 이후에는
        <code class="px-1 py-0.5 bg-blue-100 dark:bg-blue-900/40 rounded">runPipeResult&lt;T, E&gt;</code>로 안전한 유니온을 복구하세요.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-6">
      Strict 유니온 추적
    </h2>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffectStrict, SideEffect } from 'fp-pack';

const pipeline = pipeSideEffectStrict(
  (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEGATIVE' as const)),
  (n) => (n > 10 ? n : SideEffect.of(() => 0 as const))
);

// Result type: number | SideEffect<'NEGATIVE' | 0>
const result = pipeline(5);`}
    />

    <div class="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-r-lg mt-8">
      <p class="text-sm md:text-base text-amber-900 dark:text-amber-100 font-semibold mb-2">
        ⚠️ runPipeResult는 파이프라인 안에서 호출하지 마세요
      </p>
      <p class="text-sm md:text-base text-amber-800 dark:text-amber-200 m-0">
        <code class="px-2 py-1 bg-amber-100 dark:bg-amber-900/40 rounded">runPipeResult</code>는 파이프가 끝난 이후에만 호출해야 합니다.
        흐름을 예측 가능하게 유지하고 타입 추론을 보호할 수 있습니다.
      </p>
    </div>
  </div>
);
