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
        <strong>0.15.0</strong>부터 모든 파이프가 각 단계를 컴파일 타임에 검사하면서도 TypeScript의 자연스러운 추론을
        그대로 유지합니다. 이제 추론과 안전성 중 하나를 고를 필요가 없으므로, 파이프 선택은 두 가지 질문으로
        정리됩니다. <strong>비동기인가?</strong> 그리고 <strong>중간에 조기 종료할 수 있는가?</strong>
      </p>
    </div>

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
            fp-pack에서 조기 종료는 명시적으로 선택하는 것입니다. 일반 <code class="text-sm">pipe</code>는 절대 중간에
            멈추지 않습니다. 모든 단계가 실행되고, <code class="text-sm">SideEffect</code>를 포함한 모든 값이 데이터로
            다음 단계에 전달됩니다. 반면 <code class="text-sm">pipeSideEffect</code>는 어떤 단계가{' '}
            <code class="text-sm">SideEffect</code>를 반환하면 그 자리에서 멈추고, 그 effect는 파이프라인 바깥 경계에서{' '}
            <code class="text-sm">runPipeResult</code> / <code class="text-sm">matchSideEffect</code>로 한 번만
            처리합니다.
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
              <span class="flex-shrink-0 text-green-600 dark:text-green-400 text-xl">✓</span>
              <div>
                <p class="font-medium text-green-900 dark:text-green-100 mb-2">정확한 effect 타입</p>
                <p class="text-green-800 dark:text-green-200 text-sm m-0">
                  <code class="text-sm">pipeSideEffect</code>는 각 단계가 만들 수 있는 effect의 정확한 유니온을
                  추적합니다. 어떤 단계도 <code class="text-sm">SideEffect</code>를 반환하지 않는 파이프라인은 결과
                  타입에 <code class="text-sm">| SideEffect</code>가 아예 붙지 않습니다.
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
            어느 단계라도 <code class="text-sm">Promise</code>를 반환하면 비동기 버전인{' '}
            <code class="text-sm">pipeAsync</code> 또는 <code class="text-sm">pipeAsyncSideEffect</code>를 사용하세요. 각
            단계는 이전 단계의 await된 값을 받고, 파이프라인은 항상 <code class="text-sm">Promise</code>를 반환합니다.
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
            이전 단계의 출력을 받을 수 없는 입력 타입을 가진 단계는 컴파일 에러입니다. 인라인 람다, 미리 정의한 함수,
            커리된 유틸리티, 파이프라인 길이와 상관없이 모두 해당합니다. 추론은 끝까지 그대로 흐르므로 인라인 람다에
            타입을 적을 필요가 없습니다.
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
            0.15.0 이전에는 기본 파이프가 이런 불일치를 통과시키는 경우가 있어서 별도의{' '}
            <code class="text-sm">*Strict</code> 버전이 있었습니다. 이 문제(
            <a
              href="https://github.com/superlucky84/fp-pack/issues/5"
              class="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              issue #5
            </a>
            )는 TypeScript의 한계가 아니라 대체(fallback) 오버로드 때문이었고, 이제 기본 파이프에서 해결되었습니다.
          </p>

          <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-amber-600 dark:text-amber-400 text-xl">⚠️</span>
              <div>
                <p class="font-medium text-amber-900 dark:text-amber-100 mb-2">Strict 버전은 deprecated 되었습니다</p>
                <p class="text-amber-800 dark:text-amber-200 text-sm m-0">
                  <code class="text-sm">pipeStrict</code>, <code class="text-sm">pipeAsyncStrict</code>,{' '}
                  <code class="text-sm">pipeSideEffectStrict</code>, <code class="text-sm">pipeAsyncSideEffectStrict</code>는
                  이제 각 기본 파이프의 별칭입니다. 기존 코드는 그대로 컴파일되며, 편할 때 기본 파이프로 바꾸면 됩니다.
                  1.0에서 제거될 예정입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
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
                  <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipe</code>
                </td>
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipeAsync</code>
                </td>
              </tr>
              <tr class="hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <strong>조기 종료</strong>
                  <br />
                  첫 SideEffect에서 멈춤
                </td>
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeSideEffect</code>
                </td>
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeAsyncSideEffect</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 mt-4">
          네 가지 모두 각 단계를 검사하고 추론을 유지합니다. 의존성 주입이 필요하면 어느 것이든{' '}
          <code class="text-sm">pipeWithDeps</code>로 감싸면 됩니다.
        </p>
      </section>
    </div>
  </div>
);
