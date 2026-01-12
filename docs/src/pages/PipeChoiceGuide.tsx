export const PipeChoiceGuide = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <div class="mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Choosing Your Pipe
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
        A Deep Dive into Flexibility vs. Strictness
      </p>
    </div>

    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-6 mb-8">
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
        A core design philosophy of fp-pack is providing tools that balance <strong>Developer Experience (DX)</strong> and <strong>Type Safety</strong>. This is most evident in the different <code class="text-sm">pipe</code> variants. Understanding this trade-off is key to using the library effectively.
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
              Perspective: Why `pipe` Prioritizes Flexible Inference
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            The default <code class="text-sm">pipe</code> and <code class="text-sm">pipeAsync</code> are intentionally designed to be &quot;inference-friendly&quot; above all else. Their primary goal is to provide a smooth development experience by letting TypeScript infer the pipeline's final output type, even when intermediate steps are complex or generic.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Concretely, fp-pack prefers keeping pipelines moving without forcing manual annotations as soon as a generic function appears. In exchange, the default <code class="text-sm">pipe</code> does not guarantee that every intermediate type mismatch will be rejected.
          </p>

          <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-green-600 dark:text-green-400 text-xl">✓</span>
              <div>
                <p class="font-medium text-green-900 dark:text-green-100 mb-2">The Advantage</p>
                <p class="text-green-800 dark:text-green-200 text-sm m-0">
                  You can compose complex generic functions with minimal friction. The "magic" of the inference engine just works.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-amber-600 dark:text-amber-400 text-xl">⚖️</span>
              <div>
                <p class="font-medium text-amber-900 dark:text-amber-100 mb-2">The Trade-off</p>
                <p class="text-amber-800 dark:text-amber-200 text-sm m-0">
                  To prioritize inference, it must be more permissive. This isn&apos;t because your generics are &quot;wrong&quot;—it&apos;s largely a limitation of TypeScript&apos;s inference model. In practice, the default <code class="text-sm">pipe</code> still catches many mismatches, but in some edge cases (especially when reverse inference is involved) it can allow a pipeline to keep flowing instead of collapsing to <code class="text-sm">never</code>, at the cost of potentially missing an intermediate mismatch. When this happens, it&apos;s often a mismatch that is easy to notice (e.g., <code class="text-sm">number</code> &rarr; <code class="text-sm">string</code>), but it&apos;s not guaranteed to be only &quot;obvious&quot; cases. If you need strict, step-by-step validation, use the <code class="text-sm">Strict</code> variants.
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
              When to Enforce Safety: The `Strict` Variants
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            <code class="text-sm">pipeStrict</code> and <code class="text-sm">pipeAsyncStrict</code> adopt the opposite philosophy. They prioritize <strong>type safety at every step</strong>.
          </p>

          <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-green-600 dark:text-green-400 text-xl">✓</span>
              <div>
                <p class="font-medium text-green-900 dark:text-green-100 mb-2">The Advantage</p>
                <p class="text-green-800 dark:text-green-200 text-sm m-0">
                  They will immediately flag any type mismatch between one function's output and the next's input, preventing a whole class of bugs at compile time.
                </p>
              </div>
            </div>
          </div>

          <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-amber-600 dark:text-amber-400 text-xl">⚖️</span>
              <div>
                <p class="font-medium text-amber-900 dark:text-amber-100 mb-2">The Trade-off</p>
                <p class="text-amber-800 dark:text-amber-200 text-sm m-0">
                  This strictness can sometimes interfere with TypeScript's ability to infer types across a complex generic pipeline, forcing you to provide explicit type hints where the default <code class="text-sm">pipe</code> would not have required them. (Like any TypeScript API, <code class="text-sm">any</code> can still bypass checks.)
                </p>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg p-5 mt-6">
            <p class="text-gray-800 dark:text-gray-200 leading-relaxed m-0">
              <strong class="text-blue-900 dark:text-blue-100">💡 Suggested workflow:</strong> Start with <code class="text-sm">pipe</code> for fast prototyping and smoother inference. If a domain requires stricter guarantees (or the pipeline becomes hard to reason about), migrate that pipeline to <code class="text-sm">pipeStrict</code> / <code class="text-sm">pipeAsyncStrict</code> after the shapes stabilize.
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
              The Same Trade-off for `SideEffect` Pipes
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            This same philosophy extends to SideEffect pipelines, with an added dimension: the precision of the final <code class="text-sm">SideEffect</code> type.
          </p>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 rounded-lg p-5">
              <div class="flex items-start gap-2 mb-3">
                <span class="text-purple-600 dark:text-purple-400 text-lg">🔄</span>
                <p class="font-semibold text-purple-900 dark:text-purple-100 m-0">Flexible</p>
              </div>
              <p class="text-sm text-purple-900 dark:text-purple-100 mb-2">
                <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeSideEffect</code> / <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeAsyncSideEffect</code>
              </p>
              <p class="text-sm text-purple-800 dark:text-purple-200 m-0">
                These prioritize a smooth developer experience. They are perfect when you want to handle all failures in a general way (e.g., log and return null). The effect type is intentionally widened to <code class="text-xs">SideEffect&lt;any&gt;</code>, so you don't get a strict union of failure cases.
              </p>
            </div>

            <div class="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-lg p-5">
              <div class="flex items-start gap-2 mb-3">
                <span class="text-green-600 dark:text-green-400 text-lg">🔒</span>
                <p class="font-semibold text-green-900 dark:text-green-100 m-0">Safe</p>
              </div>
              <p class="text-sm text-green-900 dark:text-green-100 mb-2">
                <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeSideEffectStrict</code> / <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeAsyncSideEffectStrict</code>
              </p>
              <p class="text-sm text-green-800 dark:text-green-200 m-0">
                These prioritize type safety. They guarantee the final SideEffect type is a precise union of all possible effects in the pipeline (e.g., <code class="text-xs">SideEffect&lt;'NO_USER' | 'INSUFFICIENT_FUNDS'&gt;</code>). This is essential when you need to programmatically distinguish between failure types and handle them with full type safety.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section class="relative pt-6 border-t border-gray-200 dark:border-gray-800">
        <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-6">
          Quick Reference
        </h3>

        <div class="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
          <table class="min-w-full">
            <thead class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  Pipe Variant
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  Primary Goal
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  Best For
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              <tr class="hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors">
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipe</code> / <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipeAsync</code>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Inference & DX
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Most use cases, especially with complex generics.
                </td>
              </tr>
              <tr class="hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-colors">
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">pipeStrict</code> / <code class="text-xs bg-emerald-100 dark:bg-emerald-900 px-2 py-1 rounded">pipeAsyncStrict</code>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Type Safety
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Critical code paths where intermediate type correctness must be guaranteed.
                </td>
              </tr>
              <tr class="hover:bg-purple-50 dark:hover:bg-purple-950/20 transition-colors">
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeSideEffect</code> / <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeAsyncSideEffect</code>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  General Failure Handling
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Handling all failures in a uniform way (e.g., logging, showing a generic error).
                </td>
              </tr>
              <tr class="hover:bg-green-50 dark:hover:bg-green-950/20 transition-colors">
                <td class="px-6 py-4 text-sm">
                  <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeSideEffectStrict</code> / <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeAsyncSideEffectStrict</code>
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Precise Failure Handling
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  When you need to programmatically distinguish between different error types.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
);
