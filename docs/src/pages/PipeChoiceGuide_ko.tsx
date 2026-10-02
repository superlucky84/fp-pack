import { CodeBlock } from '@/components/CodeBlock';

export const PipeChoiceGuide_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <div class="mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        파이프 선택 가이드
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
        두 가지 질문, 네 가지 파이프 — 타입 안전성은 기본입니다
      </p>
    </div>

    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-6 mb-8">
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
        <strong>0.15.0</strong>부터 모든 파이프가 각 단계를 컴파일 타임에
        검사하면서도 TypeScript의 자연스러운 추론을 그대로 유지합니다. 이제
        추론과 안전성 중 하나를 고를 필요가 없으므로, 파이프 선택은 두 가지
        질문으로 정리됩니다. <strong>비동기인가?</strong> 그리고{' '}
        <strong>중간에 조기 종료할 수 있는가?</strong>
      </p>
    </div>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
      추론 친화적인 사용성이 우선입니다. 일반적인 파이프라인은 중간 값에 타입을
      반복해서 쓰지 않아도 되며, 기본 함수가 연결 오류도 함께 검사합니다. Strict
      별칭을 선택할 필요가 없습니다. 콜백 추론은 첫 인수 이후 32단계까지
      지원하며, 더 긴 인라인 체인은 작은 파이프라인으로 나누면 타입 표기를
      추가하지 않고 추론을 유지할 수 있습니다. 제네릭으로 시작하는 함수 우선
      구성처럼 입력 타입의 근거가 없는 경우에는 값 우선 구성을 권장합니다.
    </p>

    <div class="space-y-10">
      {/* Section 1 */}
      <section class="relative">
        <div class="flex items-start gap-4 mb-4">
          <div class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
            1
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-0">
              파이프라인이 중간에 끝날 수 있나요?
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            fp-pack에서 조기 종료는 명시적으로 선택하는 것입니다. 일반{' '}
            <code class="text-sm">pipe</code>는 절대 중간에 멈추지 않습니다.
            모든 단계가 실행되고, <code class="text-sm">SideEffect</code>를
            포함한 모든 값이 데이터로 다음 단계에 전달됩니다. 반면{' '}
            <code class="text-sm">pipeSideEffect</code>는 어떤 단계가{' '}
            <code class="text-sm">SideEffect</code>를 반환하면 그 자리에서
            멈추고, 그 effect는 파이프라인 바깥 경계에서{' '}
            <code class="text-sm">runPipeResult</code> /{' '}
            <code class="text-sm">matchSideEffect</code>로 한 번만 처리합니다.
          </p>

          <CodeBlock
            language="typescript"
            code={`import { pipe, pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

// 조기 종료 없음: 모든 단계가 항상 실행됨
const toLabel = pipe(
  (user: User) => user.name,
  (name) => name.trim(),
  (name) => \`@\${name}\`
);

// 조기 종료: 첫 SideEffect에서 멈추고, 경계에서 한 번만 처리
const findEmail = pipeSideEffect(
  (id: string) => users.get(id) ?? SideEffect.of(() => 'NOT_FOUND' as const),
  (user) => user.email ?? SideEffect.of(() => 'NO_EMAIL' as const),
  (email) => email.toLowerCase()
);

const result = findEmail('u1'); // string | SideEffect<'NOT_FOUND' | 'NO_EMAIL'>
const value = runPipeResult(result); // string | 'NOT_FOUND' | 'NO_EMAIL'`}
          />

          <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-green-600 dark:text-green-400 text-xl">
                ✓
              </span>
              <div>
                <p class="font-medium text-green-900 dark:text-green-100 mb-2">
                  정확한 effect 타입
                </p>
                <p class="text-green-800 dark:text-green-200 text-sm m-0">
                  <code class="text-sm">pipeSideEffect</code>는 각 단계가 만들
                  수 있는 effect의 정확한 유니온을 추적합니다. 어떤 단계도{' '}
                  <code class="text-sm">SideEffect</code>를 반환하지 않는
                  파이프라인은 결과 타입에{' '}
                  <code class="text-sm">| SideEffect</code>가 아예 붙지
                  않습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section class="relative">
        <div class="flex items-start gap-4 mb-4">
          <div class="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
            2
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-0">
              비동기인가요?
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            어느 단계라도 <code class="text-sm">Promise</code>를 반환하면 비동기
            버전인 <code class="text-sm">pipeAsync</code> 또는{' '}
            <code class="text-sm">pipeAsyncSideEffect</code>를 사용하세요. 각
            단계는 이전 단계의 await된 값을 받고, 파이프라인은 항상{' '}
            <code class="text-sm">Promise</code>를 반환합니다.
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section class="relative">
        <div class="flex items-start gap-4 mb-4">
          <div class="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
            3
          </div>
          <div class="flex-1">
            <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-0">
              타입 안전성은 모든 파이프에 기본으로 들어 있습니다
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            이전 단계의 출력을 받을 수 없는 입력 타입을 가진 단계는 컴파일
            에러입니다. 인라인 콜백과 커리된 유틸리티는 첫 번째 인자 이후
            32단계까지 문맥에서 타입을 추론합니다. 더 긴 체인도 이미 타입이
            정해진 함수라면 검사하며, 긴 인라인 체인은 작은 파이프로 나누세요.
            명시적인 any나 검증되지 않은 타입 단언은 TypeScript 검사를 우회할 수 있습니다.
          </p>

          <CodeBlock
            language="typescript"
            code={`const toId = (id: number) => id;
const toUpper = (s: string) => s.toUpperCase();

pipe(1, toId, toUpper);
// ❌ 에러: PipeError<number, string>

pipe(1, (x) => x.toString(), toUpper); // ✅ string — 인라인 → 미리 정의한 함수도 그대로 동작`}
          />

          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            0.15.0 이전에는 기본 파이프가 이런 불일치를 통과시키는 경우가 있어서
            별도의 <code class="text-sm">*Strict</code> 버전이 있었습니다. 이
            문제(
            <a
              href="https://github.com/superlucky84/fp-pack/issues/5"
              class="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              issue #5
            </a>
            )에는 잘못 연결된 단계도 허용하던 fallback 오버로드가 관여했습니다.
            이제 기본 파이프가 이런 호출을 거부하면서, 문서에 명시한 범위에서
            문맥에 따른 타입 추론을 유지합니다.
          </p>

          <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-amber-600 dark:text-amber-400 text-xl">
                ⚠️
              </span>
              <div>
                <p class="font-medium text-amber-900 dark:text-amber-100 mb-2">
                  Strict 버전은 deprecated 되었습니다
                </p>
                <p class="text-amber-800 dark:text-amber-200 text-sm m-0">
                  <code class="text-sm">pipeStrict</code>,{' '}
                  <code class="text-sm">pipeAsyncStrict</code>,{' '}
                  <code class="text-sm">pipeSideEffectStrict</code>,{' '}
                  <code class="text-sm">pipeAsyncSideEffectStrict</code>는 이제
                  각 기본 파이프의 별칭입니다. 기존 import는 유지되지만,
                  이전에 숨겨졌던 타입 불일치는 어느 이름으로 호출하든 오류가
                  될 수 있습니다. 1.0 전에 기본 이름으로 바꾸세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative pt-6 border-t border-gray-200 dark:border-gray-800">
        <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-6">
          0.15.0으로 업그레이드하기
        </h3>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          파이프라인 실행 방식은 그대로입니다. 새 컴파일 오류는 단계 간 타입 불일치나,
          제네릭 함수로 시작해 입력 타입을 추론할 정보가 없는 상황을 드러낼 수 있습니다.
          값으로 시작해 추론의 기준을 제공하세요. 재사용하려면 입력 타입이 있는 함수 안에
          파이프라인을 두면 됩니다. pipeHint나 이미 타입이 정해진 첫 단계도 사용할 수 있습니다.
        </p>
        <CodeBlock
          language="typescript"
          code={`import { pipe, uniq, sort } from 'fp-pack';

const sortedUnique = (values: string[]) =>
  pipe(values, uniq, sort((a, b) => a.localeCompare(b)));

sortedUnique(['b', 'a', 'b']); // ['a', 'b']`}
        />
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          SideEffect-aware 결과는 정확한 effect 유니온을 유지합니다. 입력과 모든 단계에서
          effect가 발생하지 않으면 일반 T(비동기는 Promise&lt;T&gt;)를 반환합니다.
          runPipeResult도 제네릭을 직접 지정하지 않아도 성공과 effect 결과의 유니온을 추론합니다.
        </p>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          pipeWithDeps는 중간 값의 타입을 추론하고 각 단계에 선언한 의존성 타입을 교차합니다.
          기본 파이프와 deprecated 별칭은 from() 진입을 포함해 같은 검사를 제공합니다.
          첫 입력이 선택적이거나 기본값이 있으면 합성한 함수에서도 생략할 수 있습니다.
        </p>
      </section>

      {/* Table Section */}
      <section class="relative pt-6 border-t border-gray-200 dark:border-gray-800">
        <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-6">
          빠른 참조
        </h3>

        <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  &nbsp;
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  동기
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  비동기
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              <tr class="hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <strong>조기 종료 없음</strong>
                  <br />
                  모든 단계 실행
                </td>
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                    pipe
                  </code>
                </td>
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">
                    pipeAsync
                  </code>
                </td>
              </tr>
              <tr class="hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <strong>조기 종료</strong>
                  <br />첫 SideEffect에서 멈춤
                </td>
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
                    pipeSideEffect
                  </code>
                </td>
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">
                    pipeAsyncSideEffect
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
          네 가지 모두 각 단계를 검사하고 추론을 유지합니다. 의존성 주입이
          필요하면 어느 것이든 <code class="text-sm">pipeWithDeps</code>로
          감싸면 됩니다.
        </p>
      </section>
    </div>
  </div>
);
