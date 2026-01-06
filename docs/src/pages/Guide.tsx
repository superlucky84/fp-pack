import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Guide = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      Detailed Guide
    </h1>

    <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
      This guide provides comprehensive guidelines for writing clean, declarative, functional code using fp-pack's utilities.
    </p>

    <div class="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 rounded-lg p-5 mb-8">
      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
        Table of Contents
      </h2>
      <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
        <li><strong>Project Philosophy</strong></li>
        <li>
          <strong>Core Composition Functions</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>pipe</li>
            <li>pipeAsync</li>
          </ul>
        </li>
        <li><strong>SideEffect Pattern</strong></li>
        <li>
          <strong>Coding Guidelines</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>pipe / pipeAsync</li>
            <li>Curried functions</li>
            <li>Custom utility authoring</li>
            <li>pipe vs pipeSideEffect</li>
          </ul>
        </li>
        <li>
          <strong>React Integration</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>Event handlers</li>
            <li>useMemo</li>
            <li>useEffect</li>
            <li>State updates</li>
          </ul>
        </li>
        <li>
          <strong>Anti-Patterns to Avoid</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>Loops</li>
            <li>Chained arrays</li>
            <li>Mutation</li>
          </ul>
        </li>
        <li><strong>Stream Functions</strong></li>
        <li>
          <strong>Quick Reference</strong>
          <ul class="list-disc list-inside ml-5 mt-1 space-y-1">
            <li>Import paths</li>
            <li>When to use what</li>
          </ul>
        </li>
        <li><strong>Key Principles Summary</strong></li>
        <li><strong>Ready to Explore</strong></li>
      </ul>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Project Philosophy
    </h2>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      fp-pack is a TypeScript functional programming library focused on:
    </p>

    <ol class="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside mb-8">
      <li><strong>Function Composition</strong>: Use <code class="text-sm">pipe</code> and <code class="text-sm">pipeAsync</code> as the primary tools for combining operations</li>
      <li><strong>Declarative Code</strong>: Prefer function composition over imperative loops and mutations</li>
      <li><strong>No Monad Pattern</strong>: Traditional FP monads (Option, Either, etc.) are NOT used - they don't compose well with <code class="text-sm">pipe</code></li>
      <li><strong>SideEffect Pattern</strong>: Handle errors and side effects using <code class="text-sm">SideEffect</code> with <code class="text-sm">pipeSideEffect</code> / <code class="text-sm">pipeAsyncSideEffect</code> pipelines. For strict unions, use <code class="text-sm">pipeSideEffectStrict</code> / <code class="text-sm">pipeAsyncSideEffectStrict</code></li>
      <li><strong>Lazy Evaluation</strong>: Use <code class="text-sm">stream/*</code> functions for efficient iterable processing</li>
    </ol>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Core Composition Functions
    </h2>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      pipe - Synchronous Function Composition
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong>Always prefer <code class="text-sm">pipe</code> for synchronous operations</strong> instead of manual imperative code.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, map, filter, take } from 'fp-pack';

// GOOD: Declarative pipe composition
const processUsers = pipe(
  filter((user: User) => user.age >= 18),
  map(user => user.name.toUpperCase()),
  take(10)
);

// BAD: Imperative approach
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
        For SideEffect-based early exits, use <code class="text-sm">pipeSideEffect</code>. If you need strict union typing, use <code class="text-sm">pipeSideEffectStrict</code>.
      </p>
    </div>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      pipeAsync - Asynchronous Function Composition
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong>Use <code class="text-sm">pipeAsync</code> for any async operations</strong> including API calls, database queries, or async transformations.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-pack';

// GOOD: Async pipe composition
const fetchUserData = pipeAsync(
  async (userId: string) => fetch(\`/api/users/\${userId}\`),
  async (response) => response.json(),
  (data) => data.user
);

// BAD: Manual async handling
const fetchUserData = async (userId: string) => {
  const response = await fetch(\`/api/users/\${userId}\`);
  const data = await response.json();
  return data.user;
};`}
    />

    <div class="mt-6 p-4 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded">
      <p class="text-sm md:text-base text-purple-900 dark:text-purple-100">
        For SideEffect-aware async pipelines, use <code class="text-sm">pipeAsyncSideEffect</code>. For strict unions, use <code class="text-sm">pipeAsyncSideEffectStrict</code>.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      SideEffect Pattern - For Special Cases Only
    </h2>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong>Most cases: Use <code class="text-sm">pipe</code> / <code class="text-sm">pipeAsync</code> - they're simpler and sufficient for 99% of use cases.</strong>
    </p>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <code class="text-sm">pipe</code> and <code class="text-sm">pipeAsync</code> are for <strong>pure</strong> functions and don't handle <code class="text-sm">SideEffect</code>. <strong>Only use <code class="text-sm">pipeSideEffect</code>/<code class="text-sm">pipeAsyncSideEffect</code> when you specifically need</strong>:
    </p>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>Early termination based on validation</li>
      <li>Error handling with side effects (logging, toasts, etc.)</li>
      <li>Optional chaining patterns</li>
    </ul>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      For regular error handling, standard try-catch or error propagation is perfectly fine.
    </p>
    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      If you want precise SideEffect unions across branches, use <code class="text-sm">pipeSideEffectStrict</code> /{' '}
      <code class="text-sm">pipeAsyncSideEffectStrict</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`// MOST CASES: Just use pipe with regular error handling
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

// SPECIAL CASES: Use pipeSideEffect when you need early termination with side effects
import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const processDataPipeline = pipeSideEffect(
  validateInput,
  (data) => {
    if (!data.isValid) {
      return SideEffect.of(() => {
        showToast('Invalid data');  // Side effect
        logError('validation_failed');  // Side effect
        return null;
      });
    }
    return data;
  },
  transformData
);

// runPipeResult must be called OUTSIDE the pipeline
const finalValue = runPipeResult(processDataPipeline(input));`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Strict SideEffect Unions
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Use strict variants when you want precise union types for SideEffect results across branches.
    </p>

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

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Key SideEffect Functions
    </h3>

    <ul class="space-y-3 text-gray-700 dark:text-gray-300 mb-6">
      <li><code class="text-sm">SideEffect.of(fn, label?)</code> - Create a side effect container</li>
      <li><code class="text-sm">isSideEffect(value)</code> - Type guard for <strong>runtime checking</strong> whether a value is a SideEffect</li>
      <li><code class="text-sm">runPipeResult&lt;T, R&gt;(result)</code> - Execute SideEffect or return value (call <strong>OUTSIDE</strong> pipelines). If the input is widened to <code class="text-sm">SideEffect&lt;any&gt;</code>, provide generics to recover a safe union.</li>
      <li><code class="text-sm">matchSideEffect(result, {'{'} value, effect {'}'})</code> - Pattern match on result</li>
    </ul>

    <div class="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded">
      <p class="text-sm md:text-base text-orange-900 dark:text-orange-100 font-semibold mb-2">
        ⚠️ CRITICAL: runPipeResult Type Safety
      </p>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        <code class="text-sm">runPipeResult&lt;T, R=any&gt;</code> has default <code class="text-sm">R=any</code>. If the input type is precise, inference is preserved. If the input is widened to <code class="text-sm">SideEffect&lt;any&gt;</code> (or <code class="text-sm">any</code>), the result becomes <code class="text-sm">any</code> unless you provide generics. Prefer <code class="text-sm">isSideEffect</code> for precise narrowing.
      </p>
    </div>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Type-Safe Result Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const processNumbers = pipeSideEffect(
  (nums: number[]) => nums.filter(n => n % 2 === 1),
  (odds) => {
    if (odds.length === 0) {
      return SideEffect.of(() => 'No odd numbers found');
    }
    return odds.map(n => n * 2);
  }
);

const oddsDoubled = processNumbers([1, 2, 3, 4, 5]);

// ✅ CORRECT: Use isSideEffect for type checking
if (!isSideEffect(oddsDoubled)) {
  // TypeScript knows: oddsDoubled is number[]
  const sum: number = oddsDoubled.reduce((a, b) => a + b, 0);
  console.log(\`Sum: \${sum}\`);  // sum: number
} else {
  // pipeSideEffect widens SideEffect to any, so runPipeResult becomes any here
  const result = runPipeResult(oddsDoubled);
  console.log(\`Error: \${result}\`);  // result: any
}

// ⚠️ If the result type is widened, inference is lost
const widened: number[] | SideEffect<any> = oddsDoubled;
const unsafeResult = runPipeResult(widened);
// unsafeResult: any

// ✅ CORRECT: Provide generics to recover a safe union
const safeResult = runPipeResult<number[], string>(oddsDoubled);
// safeResult: number[] | string (union type - safe but not narrowed)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Coding Guidelines
    </h2>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      1. Always Prefer pipe/pipeAsync
    </h3>

    <CodeBlock
      language="typescript"
      code={`// GOOD
const result = pipe(
  trim,
  split(','),
  map(toNumber),
  filter(isPositive)
)(input);

// BAD
const trimmed = trim(input);
const parts = split(',')(trimmed);
const numbers = map(toNumber)(parts);
const result = filter(isPositive)(numbers);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2. Use Curried Functions
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      All functions are designed to work seamlessly with pipe. Multi-argument functions are provided in curried style, while single-argument utilities are already unary and don't benefit from currying—use them directly (e.g. <code class="text-sm">uniq</code>, <code class="text-sm">flatten</code>, <code class="text-sm">trim</code>, etc.).
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, map, filter } from 'fp-pack';

// GOOD: Curried usage in pipe
const processUsers = pipe(
  filter(user => user.active),
  map(user => user.name)
);

// GOOD: Partial application
const filterActive = filter((user: User) => user.active);
const getNames = map((user: User) => user.name);
const processUsers = pipe(filterActive, getNames);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2.1 Custom Utility Authoring (Curry Typing)
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      When you add your own helpers, keep data-last argument order and curry multi-arg
      functions. Fixed signatures can use <code class="text-sm">curry(fn)</code> directly.
      Generic or overloaded signatures should use an explicit type alias with a cast to
      preserve inference.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { curry } from 'fp-pack';

// Fixed signature: curry is enough
function split(separator: string, str: string): string[] {
  return str.split(separator);
}
export default curry(split);

// Generic signature: add a type alias for the curried form
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
      2.2 Type-Safe Composition Tips
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Some utilities intentionally return wider types for safety. Add defaults or guards to keep
      your pipelines precise and avoid unexpected unions.
    </p>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>
        <code class="text-sm">prop</code> returns <code class="text-sm">T[K] | undefined</code>. Use{' '}
        <code class="text-sm">propOr</code> or guard before array operations.
      </li>
      <li>
        <code class="text-sm">ifElse</code> expects <strong>functions</strong> for both branches. If you already
        have a value, wrap it with <code class="text-sm">() =&gt; value</code> or use{' '}
        <code class="text-sm">from(value)</code> for cleaner constant branches.
      </li>
      <li>
        <code class="text-sm">from</code> is useful for constant branches in <code class="text-sm">ifElse</code>{' '}
        and <code class="text-sm">cond</code>, and for injecting data into pipelines (data-first pattern).
      </li>
      <li>
        <code class="text-sm">cond</code> returns <code class="text-sm">R | undefined</code>. Add a default branch
        and coalesce when you need a strict result.
      </li>
      <li>
        In <code class="text-sm">pipeSideEffect</code>, keep step return types aligned to avoid wide unions.
      </li>
    </ul>

    <CodeBlock
      language="typescript"
      code={`import { pipe, propOr, append, assoc, ifElse, cond, from } from 'fp-pack';

// propOr keeps the type strict for array ops
const addTodo = (text: string, state: AppState) =>
  pipe(
    propOr([], 'todos'),
    append(createTodo(text)),
    (todos) => assoc('todos', todos, state)
  )(state);

// ifElse expects functions, not values
const toggleTodo = (id: string) => ifElse(
  (todo: Todo) => todo.id === id,
  assoc('completed', true),
  (todo) => todo
);

// Use from() for constant branches - cleaner than () => value
const getStatusLabel = ifElse(
  (score: number) => score >= 60,
  from('pass'),    // Constant value
  from('fail')
);

// Data-first pattern with from: inject data into pipeline
const processData = pipe(
  from([1, 2, 3, 4, 5]),
  filter((n: number) => n % 2 === 0),
  map(n => n * 2)
);
const result = processData(); // [4, 8]

// cond still returns R | undefined, so coalesce if needed
const grade = (score: number) =>
  cond([
    [(n: number) => n >= 90, () => 'A'],
    [() => true, () => 'F']
  ])(score) ?? 'F';`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      2.3 Data-last Generic Caveats
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      If a data-last helper returns a generic function whose type is decided only by the final data input, TypeScript
      cannot infer that type inside <code class="text-sm">pipe</code>/<code class="text-sm">pipeAsync</code>.
      Use a data-first wrapper, an explicit generic, or a typed alias when needed.
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
      code={`import { pipe, zip, some } from 'fp-pack';

// Option 1: data-first wrapper
const withWrapper = pipe(
  (values: number[]) => zip([1, 2, 3], values),
  some(([a, b]) => a > b)
);

// Option 2: explicit type annotation
const withHint = pipe(
  zip([1, 2, 3]) as (values: number[]) => Array<[number, number]>,
  some(([a, b]) => a > b)
);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Why from() for Type Safety
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Using <code class="text-sm">() =&gt; value</code> to start a pipeline breaks type inference because <code class="text-sm">pipe</code> expects unary functions. Use <code class="text-sm">from(value)</code> instead for proper typing.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, from, filter, map } from 'fp-pack';

// ❌ WRONG: Type inference fails
const broken = pipe(
  () => [1, 2, 3, 4, 5],    // Type: () => number[]
  filter((n: number) => n % 2 === 0)  // Error! Expects (input) => output
);

// ✅ CORRECT: from() creates proper unary function
const works = pipe(
  from([1, 2, 3, 4, 5]),    // Type: <I>(_: I) => number[]
  filter((n: number) => n % 2 === 0),  // Works perfectly
  map(n => n * 2)
);

works(); // [4, 8] - No type errors, clean inference`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      3. Choose pipe vs pipeSideEffect
    </h3>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      <strong>Default choice: Start with <code class="text-sm">pipe</code> / <code class="text-sm">pipeAsync</code></strong>
    </p>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Most data transformations are pure and don't need SideEffect handling. Use this decision table to choose the right variant:
    </p>

    <div class="overflow-x-auto mb-6">
      <table class="min-w-full border border-gray-300 dark:border-gray-700">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              Your Situation
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              Choose
            </th>
            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700">
              Why
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900">
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Pure data transformation (sync)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipe</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              No SideEffect handling needed
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Pure data transformation (async)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">pipeAsync</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              No SideEffect handling needed
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Early termination + side effects (sync)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeSideEffect</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Auto short-circuit on SideEffect
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Early termination + side effects (async)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">pipeAsyncSideEffect</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Auto short-circuit on SideEffect
            </td>
          </tr>
          <tr class="border-b border-gray-200 dark:border-gray-800">
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Need precise SideEffect union types (sync)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeSideEffectStrict</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Tracks exact union across branches
            </td>
          </tr>
          <tr>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Need precise SideEffect union types (async)
            </td>
            <td class="px-4 py-3 text-sm">
              <code class="text-xs bg-green-100 dark:bg-green-900 px-2 py-1 rounded">pipeAsyncSideEffectStrict</code>
            </td>
            <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
              Tracks exact union across branches
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>Summary:</strong> Use <code class="text-sm">pipe</code>/<code class="text-sm">pipeAsync</code> for 99% of cases. Only switch to SideEffect variants when you need early termination with side effects.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      React Integration
    </h2>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack works seamlessly with React. Here are common patterns for integrating fp-pack into React applications.
    </p>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Event Handlers
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, prop, trim, tap, assoc } from 'fp-pack';

// Handle form input changes
const handleNameChange = pipe(
  prop('currentTarget'),
  (el) => (el as HTMLInputElement).value,
  trim,
  tap((value) => {
    // Use updater form to avoid stale state
    setFormState(prev => assoc('name', value, prev));
  })
);

// Use in JSX
<input onChange={handleNameChange} />

// Handle form submission
const handleSubmit = pipe(
  tap((e: Event) => e.preventDefault()),
  () => formState,
  validateForm,
  tap(submitToAPI)
);

<form onSubmit={handleSubmit}>...</form>`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      If you need a side effect without input, use <code class="text-sm">tap0</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { tap0 } from 'fp-pack';

tap0(() => console.log('init'))();`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Data Transformation with useMemo
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { useMemo } from 'react';
import { pipe, filter, sortBy, map, take } from 'fp-pack';

function UserList({ users }: { users: User[] }) {
  // Memoize expensive transformations
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
      Async Effects with useEffect
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
      State Updates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, assoc, dissoc, map } from 'fp-pack';

// Update nested state immutably
const updateUserName = (name: string) => {
  setState(prev => pipe(
    assoc('name', name),
    assoc('updatedAt', Date.now())
  )(prev));
};

// Transform array state
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
      Anti-Patterns to Avoid
    </h2>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      ❌ Don't use imperative loops
    </h3>

    <CodeBlock
      language="typescript"
      code={`// BAD
const result = [];
for (const item of items) {
  if (item.active) {
    result.push(item.name);
  }
}

// GOOD
const result = pipe(
  filter((item: Item) => item.active),
  map(item => item.name)
)(items);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      ❌ Don't chain array methods
    </h3>

    <CodeBlock
      language="typescript"
      code={`// BAD
const result = users
  .filter(u => u.active)
  .map(u => u.name)
  .slice(0, 10);

// GOOD
const result = pipe(
  filter((u: User) => u.active),
  map(u => u.name),
  take(10)
)(users);`}
    />

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      ❌ Don't mutate data
    </h3>

    <CodeBlock
      language="typescript"
      code={`// BAD
const updateUser = (user: User) => {
  user.lastLogin = new Date();
  return user;
};

// GOOD
const updateUser = (user: User) => ({
  ...user,
  lastLogin: new Date()
});

// EVEN BETTER with fp-pack
import { assoc } from 'fp-pack';
const updateUser = assoc('lastLogin', new Date());`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Stream Functions
    </h2>

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Use <code class="text-sm">stream/*</code> functions for lazy evaluation when working with large datasets.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';
import { map, filter, take, toArray, range } from 'fp-pack/stream';

// Lazy stream processing
const processLargeDataset = pipe(
  filter((n: number) => n % 2 === 0),
  map(n => n * n),
  take(100),
  toArray
);

const result = processLargeDataset(range(1, 1000000));`}
    />

    <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      Stream functions support both sync and async iterables.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Quick Reference
    </h2>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      Import Paths
    </h3>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li>Main functions: <code class="text-sm">import {'{'} pipe, map, filter {'}'} from 'fp-pack'</code></li>
      <li>Async: <code class="text-sm">import {'{'} pipeAsync, delay, retry {'}'} from 'fp-pack'</code></li>
      <li>SideEffect: <code class="text-sm">import {'{'} pipeSideEffect, pipeSideEffectStrict, pipeAsyncSideEffect, pipeAsyncSideEffectStrict, SideEffect {'}'} from 'fp-pack'</code></li>
      <li>Stream: <code class="text-sm">import {'{'} map, filter, toArray {'}'} from 'fp-pack/stream'</code></li>
    </ul>

    <h3 class="text-2xl font-medium text-gray-900 dark:text-white mb-3 mt-8">
      When to Use What
    </h3>

    <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 mb-6 space-y-2">
      <li><strong>Pure sync transformations</strong>: <code class="text-sm">pipe</code> + array/object functions</li>
      <li><strong>Pure async operations</strong>: <code class="text-sm">pipeAsync</code></li>
      <li><strong>Error handling with SideEffect</strong>: <code class="text-sm">pipeSideEffect</code> (sync) / <code class="text-sm">pipeAsyncSideEffect</code> (async)</li>
      <li><strong>Strict SideEffect unions</strong>: <code class="text-sm">pipeSideEffectStrict</code> (sync) / <code class="text-sm">pipeAsyncSideEffectStrict</code> (async)</li>
      <li><strong>Runtime type checking</strong>: <code class="text-sm">isSideEffect</code> to check if value is SideEffect</li>
      <li><strong>Execute SideEffect</strong>: <code class="text-sm">runPipeResult&lt;T, R&gt;</code> (call OUTSIDE pipelines, provide generics)</li>
      <li><strong>Large datasets</strong>: <code class="text-sm">stream/*</code> functions</li>
      <li><strong>Conditionals</strong>: <code class="text-sm">ifElse</code>, <code class="text-sm">when</code>, <code class="text-sm">unless</code>, <code class="text-sm">cond</code></li>
      <li><strong>Object access</strong>: <code class="text-sm">prop</code>, <code class="text-sm">propStrict</code>, <code class="text-sm">path</code>, <code class="text-sm">pick</code>, <code class="text-sm">omit</code></li>
      <li><strong>Object updates</strong>: <code class="text-sm">assoc</code>, <code class="text-sm">merge</code>, <code class="text-sm">evolve</code></li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Key Principles Summary
    </h2>

    <ol class="space-y-3 text-gray-700 dark:text-gray-300 list-decimal list-inside mb-8">
      <li><strong>Default to <code class="text-sm">pipe</code></strong> for all data transformations</li>
      <li><strong>Switch to <code class="text-sm">pipeAsync</code></strong> when async operations are involved</li>
      <li><strong>Use <code class="text-sm">stream/*</code></strong> for lazy, memory-efficient processing</li>
      <li><strong>Handle errors with <code class="text-sm">SideEffect</code></strong> in <code class="text-sm">pipeSideEffect</code>/<code class="text-sm">pipeAsyncSideEffect</code></li>
      <li><strong>Choose strict SideEffect unions</strong> with <code class="text-sm">pipeSideEffectStrict</code>/<code class="text-sm">pipeAsyncSideEffectStrict</code> when needed</li>
      <li><strong>Avoid imperative loops</strong> - use fp-pack's declarative functions</li>
      <li><strong>Never suggest monads</strong> - use SideEffect pattern instead</li>
      <li><strong>Keep code declarative</strong> - describe what, not how</li>
      <li><strong>All logic inside pipe</strong> - use control flow functions instead of breaking out</li>
      <li><strong>Call <code class="text-sm">runPipeResult</code> OUTSIDE pipelines</strong> and provide generics for type safety</li>
      <li><strong>Use <code class="text-sm">isSideEffect</code> for runtime checking</strong> - check if a value is SideEffect at runtime</li>
    </ol>

    <div class="mt-10 p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg border border-green-200 dark:border-green-800">
      <h3 class="text-xl font-semibold text-green-900 dark:text-green-100 mb-3">
        Ready to Explore?
      </h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Now that you understand the core concepts, explore the API documentation to see all available functions:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button
          onClick={() => navigateTo('/composition/pipe')}
          class="text-left p-3 bg-white dark:bg-gray-800 rounded border border-green-300 dark:border-green-700 hover:border-green-500 dark:hover:border-green-500 transition-colors"
        >
          <div class="font-semibold text-green-700 dark:text-green-300">Composition Functions</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">pipe, compose, curry, and more</div>
        </button>
        <button
          onClick={() => navigateTo('/stream/map')}
          class="text-left p-3 bg-white dark:bg-gray-800 rounded border border-green-300 dark:border-green-700 hover:border-green-500 dark:hover:border-green-500 transition-colors"
        >
          <div class="font-semibold text-green-700 dark:text-green-300">Stream Functions</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Lazy processing for large datasets</div>
        </button>
      </div>
    </div>
  </div>
);
