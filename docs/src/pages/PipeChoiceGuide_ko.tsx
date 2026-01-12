export const PipeChoiceGuide_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <div class="mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        파이프 선택하기
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
        유연성과 엄격성에 대한 심층 분석
      </p>
    </div>

    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-6 mb-8">
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
        fp-pack의 핵심 설계 철학은 <strong>개발 경험(DX)</strong>과 <strong>타입 안정성</strong> 사이의 균형을 맞추는 도구를 제공하는 것입니다. 이 철학은 다양한 <code class="text-sm">pipe</code> 변형에서 가장 명확하게 드러납니다. 이 트레이드오프를 이해하는 것이 라이브러리를 효과적으로 사용하는 열쇠입니다.
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
              관점: 왜 `pipe`는 유연한 추론을 우선시하는가?
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            기본 <code class="text-sm">pipe</code>와 <code class="text-sm">pipeAsync</code>는 의도적으로 &quot;추론 친화적&quot;으로 설계되었습니다. 이들의 주요 목표는 중간 단계가 복잡하거나 제네릭하더라도 TypeScript가 파이프라인의 최종 출력 타입을 잘 추론할 수 있게 하여 부드러운 개발 경험을 제공하는 것입니다.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            즉, 제네릭 함수가 도입되는 순간 수동으로 타입 주석을 달도록 강요하기보다, 파이프라인이 끝까지 흘러가도록 하는 데 초점을 둡니다. 대신 기본 <code class="text-sm">pipe</code>는 모든 중간 단계의 타입 불일치를 항상 거부하는 것을 보장하지 않습니다.
          </p>

          <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-green-600 dark:text-green-400 text-xl">✓</span>
              <div>
                <p class="font-medium text-green-900 dark:text-green-100 mb-2">장점</p>
                <p class="text-green-800 dark:text-green-200 text-sm m-0">
                  최소한의 마찰로 복잡한 제네릭 함수를 조합할 수 있습니다. 추론 엔진의 "마법"이 그냥 작동합니다.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-amber-600 dark:text-amber-400 text-xl">⚖️</span>
              <div>
                <p class="font-medium text-amber-900 dark:text-amber-100 mb-2">절충점</p>
                <p class="text-amber-800 dark:text-amber-200 text-sm m-0">
                  추론을 우선시하기 위해 더 너그러워야 합니다. 이는 제네릭이 &quot;잘못됐다&quot;기보다 TypeScript 추론 모델의 한계에 가깝습니다. 실제로 기본 <code class="text-sm">pipe</code>도 많은 타입 불일치를 잘 잡아내지만, 일부 엣지 케이스(특히 역추론이 개입되는 경우)에서는 <code class="text-sm">never</code>로 무너지는 것을 피하고 파이프라인을 끝까지 흘려보내기 위해 중간 타입 불일치를 놓칠 수 있습니다. 이런 경우는 비교적 눈에 띄는 불일치(<code class="text-sm">number</code> &rarr; <code class="text-sm">string</code> 등)로 드러나는 편이지만, 반드시 &quot;쉬운 형태&quot;만 놓친다고 보장할 수는 없습니다. 단계별 타입 검증이 반드시 필요하다면 <code class="text-sm">Strict</code> 변형을 사용하세요.
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
              안전성이 필요할 때: `Strict` 변형
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            <code class="text-sm">pipeStrict</code>와 <code class="text-sm">pipeAsyncStrict</code>는 반대 철학을 채택합니다. 이들은 <strong>모든 단계에서의 타입 안정성</strong>을 우선시합니다.
          </p>

          <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-green-600 dark:text-green-400 text-xl">✓</span>
              <div>
                <p class="font-medium text-green-900 dark:text-green-100 mb-2">장점</p>
                <p class="text-green-800 dark:text-green-200 text-sm m-0">
                  한 함수의 출력과 다음 함수의 입력 간의 모든 타입 불일치를 즉시 알려주어, 컴파일 타임에 전체 버그 클래스를 예방합니다.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-amber-600 dark:text-amber-400 text-xl">⚖️</span>
              <div>
                <p class="font-medium text-amber-900 dark:text-amber-100 mb-2">절충점</p>
                <p class="text-amber-800 dark:text-amber-200 text-sm m-0">
                  이 엄격함은 때때로 TypeScript가 복잡한 제네릭 파이프라인에서 타입을 추론하는 능력을 방해하여, 기본 <code class="text-sm">pipe</code>가 필요하지 않았을 명시적 타입 힌트를 추가하도록 강요할 수 있습니다. (또한 <code class="text-sm">any</code>는 어떤 타입 검사도 우회할 수 있습니다.)
                </p>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg p-5 mt-6">
            <p class="text-gray-800 dark:text-gray-200 leading-relaxed m-0">
              <strong class="text-blue-900 dark:text-blue-100">💡 추천 워크플로우:</strong> 초기에는 <code class="text-sm">pipe</code>로 빠르게 프로토타이핑하고(추론도 더 부드럽게), 도메인 상 더 엄격한 보장이 필요해지거나 파이프라인이 복잡해져 판단이 어려워질 때 타입 형태가 안정화된 부분부터 <code class="text-sm">pipeStrict</code> / <code class="text-sm">pipeAsyncStrict</code>로 단계적으로 옮기는 전략이 좋습니다.
            </p>
          </div>
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
              `SideEffect` 파이프의 동일한 트레이드오프
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            이 동일한 철학은 SideEffect 파이프라인에도 확장되며, 최종 <code class="text-sm">SideEffect</code> 타입의 정밀도라는 차원이 추가됩니다.
          </p>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 rounded-lg p-5">
              <div class="flex items-start gap-2 mb-3">
                <span class="text-purple-600 dark:text-purple-400 text-lg">🔄</span>
                <p class="font-semibold text-purple-900 dark:text-purple-100 m-0">유연함</p>
              </div>
              <p class="text-sm text-purple-900 dark:text-purple-100 mb-2">
                <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeSideEffect</code> / <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeAsyncSideEffect</code>
              </p>
              <p class="text-sm text-purple-800 dark:text-purple-200 m-0">
                부드러운 개발자 경험을 우선시합니다. 모든 실패를 일반적인 방식으로(예: 로깅 후 null 반환) 처리하려는 경우 완벽합니다. 이 변형은 효과 타입을 의도적으로 <code class="text-xs">SideEffect&lt;any&gt;</code>로 넓히므로, 실패 케이스의 엄격한 유니온 타입을 얻을 수 없습니다.
              </p>
            </div>

            <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-5">
              <div class="flex items-start gap-2 mb-3">
                <span class="text-green-600 dark:text-green-400 text-lg">🔒</span>
                <p class="font-semibold text-green-900 dark:text-green-100 m-0">안전함</p>
              </div>
              <p class="text-sm text-green-900 dark:text-green-100 mb-2">
                <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeSideEffectStrict</code> / <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeAsyncSideEffectStrict</code>
              </p>
              <p class="text-sm text-green-800 dark:text-green-200 m-0">
                타입 안정성을 우선시합니다. 최종 SideEffect 타입이 파이프라인의 모든 가능한 효과의 정확한 유니온(예: <code class="text-xs">SideEffect&lt;'NO_USER' | 'INSUFFICIENT_FUNDS'&gt;</code>)임을 보장합니다. 이는 다양한 실패 유형을 프로그래매틱하게 구별하고 완전한 타입 안전성으로 처리해야 할 때 필수적입니다.
              </p>
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
                  파이프 변형
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  주요 목표
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  추천 사용처
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              <tr class="hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors">
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipe</code> / <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipeAsync</code>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  추론 및 DX
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  대부분의 경우, 특히 복잡한 제네릭과 함께 사용할 때.
                </td>
              </tr>
              <tr class="hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors">
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">pipeStrict</code> / <code class="text-xs bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">pipeAsyncStrict</code>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  타입 안정성
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  중간 타입의 정확성이 보장되어야 하는 중요한 코드 경로.
                </td>
              </tr>
              <tr class="hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors">
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeSideEffect</code> / <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeAsyncSideEffect</code>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  일반적인 실패 처리
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  모든 실패를 균일한 방식으로 처리할 때(예: 로깅, 일반 오류 표시).
                </td>
              </tr>
              <tr class="hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors">
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeSideEffectStrict</code> / <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeAsyncSideEffectStrict</code>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  정확한 실패 처리
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  다양한 오류 유형을 프로그래밍 방식으로 구별해야 할 때.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
);
