import { CodeBlock } from '@/components/CodeBlock';

export const PipeChoiceGuide = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <div class="mb-10">
      <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Choosing Your Pipe
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
        Two questions, four pipes — type safety is built in
      </p>
    </div>

    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-l-4 border-blue-500 dark:border-blue-400 rounded-lg p-6 mb-8">
      <p class="text-gray-700 dark:text-gray-300 leading-relaxed m-0">
        Since <strong>0.15.0</strong> every pipe checks each step at compile
        time <em>and</em> keeps TypeScript&apos;s natural inference. You no
        longer trade inference for safety, so choosing a pipe comes down to two
        questions: <strong>is it async?</strong> and{' '}
        <strong>can it exit early?</strong>
      </p>
    </div>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
      Inference-friendly use remains the priority. Ordinary pipelines infer
      intermediate values without repeated annotations, while the default
      functions also check connections. There is no separate Strict choice to
      make. Callback inference covers 32 steps after the first argument; compose
      smaller pipelines for longer inline chains to retain inference without
      adding annotations. Prefer value-first when a generic-first composition
      has no concrete input type to infer from.
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
              Can the pipeline exit early?
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Early exit is an explicit choice in fp-pack. A plain{' '}
            <code class="text-sm">pipe</code> never short-circuits — every step
            runs and every value, including a{' '}
            <code class="text-sm">SideEffect</code>, is passed along as data. A{' '}
            <code class="text-sm">pipeSideEffect</code> stops at the first step
            that returns a <code class="text-sm">SideEffect</code>, and you
            handle that effect once, at the boundary, with{' '}
            <code class="text-sm">runPipeResult</code> /{' '}
            <code class="text-sm">matchSideEffect</code>.
          </p>

          <CodeBlock
            language="typescript"
            code={`import { pipe, pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

// No early exit: every step always runs
const toLabel = pipe(
  (user: User) => user.name,
  (name) => name.trim(),
  (name) => \`@\${name}\`
);

// Early exit: stops at the first SideEffect, handled once at the boundary
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
                  Precise effect types
                </p>
                <p class="text-green-800 dark:text-green-200 text-sm m-0">
                  <code class="text-sm">pipeSideEffect</code> tracks the exact
                  union of effects each step can produce. A pipeline whose steps
                  never return a <code class="text-sm">SideEffect</code> has a
                  plain result type, with no{' '}
                  <code class="text-sm">| SideEffect</code> at all.
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
              Is it async?
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            If any step returns a <code class="text-sm">Promise</code>, use the
            async counterpart: <code class="text-sm">pipeAsync</code> or{' '}
            <code class="text-sm">pipeAsyncSideEffect</code>. Each step receives
            the awaited value of the previous one, and the pipeline always
            returns a <code class="text-sm">Promise</code>.
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
              Type safety comes with every pipe
            </h3>
          </div>
        </div>

        <div class="ml-14 space-y-4">
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            A step whose input does not accept the previous step&apos;s output
            is a compile error. Inline callbacks and curried helpers receive
            contextual types through 32 steps after the first argument.
            Longer chains of already typed functions use a checked fallback;
            split longer inline chains to keep inference. Explicit any and
            unchecked assertions can still bypass TypeScript checks.
          </p>

          <CodeBlock
            language="typescript"
            code={`const toId = (id: number) => id;
const toUpper = (s: string) => s.toUpperCase();

pipe(1, toId, toUpper);
// ❌ Error: PipeError<number, string>

pipe(1, (x) => x.toString(), toUpper); // ✅ string — inline → pre-defined just works`}
          />

          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Before 0.15.0, the default pipes could let such a mismatch through,
            which is why separate <code class="text-sm">*Strict</code> variants
            existed. That gap (see{' '}
            <a
              href="https://github.com/superlucky84/fp-pack/issues/5"
              class="text-blue-600 dark:text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              issue #5
            </a>
            ) involved fallbacks that accepted incompatible steps. The default
            pipes now reject those calls while preserving contextual inference
            within the documented boundary.
          </p>

          <div class="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-lg p-5">
            <div class="flex items-start gap-3">
              <span class="flex-shrink-0 text-amber-600 dark:text-amber-400 text-xl">
                ⚠️
              </span>
              <div>
                <p class="font-medium text-amber-900 dark:text-amber-100 mb-2">
                  The Strict variants are deprecated
                </p>
                <p class="text-amber-800 dark:text-amber-200 text-sm m-0">
                  <code class="text-sm">pipeStrict</code>,{' '}
                  <code class="text-sm">pipeAsyncStrict</code>,{' '}
                  <code class="text-sm">pipeSideEffectStrict</code> and{' '}
                  <code class="text-sm">pipeAsyncSideEffectStrict</code> are now
                  aliases of their base pipes. Existing imports remain available,
                  but previously hidden mismatches may now error under either
                  name. Replace aliases with the base names before 1.0.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative pt-6 border-t border-gray-200 dark:border-gray-800">
        <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-6">
          Upgrading to 0.15.0
        </h3>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          Pipeline execution is unchanged. New compile errors can reveal a mismatched
          step or a generic-first pipeline with no input type to infer from. Start with
          the value to anchor inference; for reuse, put that pipeline inside a function
          with a typed input. You can also use pipeHint or an already typed first step.
        </p>
        <CodeBlock
          language="typescript"
          code={`import { pipe, uniq, sort } from 'fp-pack';

const sortedUnique = (values: string[]) =>
  pipe(values, uniq, sort((a, b) => a.localeCompare(b)));

sortedUnique(['b', 'a', 'b']); // ['a', 'b']`}
        />
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          SideEffect-aware results now retain the precise effect union. When neither
          the input nor any step can produce an effect, the result is plain T (or Promise&lt;T&gt;).
          runPipeResult infers the success/effect union without explicit generics.
        </p>
        <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
          pipeWithDeps infers intermediate values and intersects the dependency contracts
          declared by individual steps. Its default and deprecated pipe variants share the
          same checks, including from() entries. Optional/default first inputs stay optional.
        </p>
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
                  &nbsp;
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  Sync
                </th>
                <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
                  Async
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              <tr class="hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <strong>No early exit</strong>
                  <br />
                  every step runs
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
                  <strong>Early exit</strong>
                  <br />
                  stops at the first SideEffect
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
          All four check every step and keep inference. Need dependency
          injection? Wrap any of them with{' '}
          <code class="text-sm">pipeWithDeps</code>.
        </p>
      </section>
    </div>
  </div>
);
