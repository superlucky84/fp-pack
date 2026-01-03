import { navigateTo } from '@/store';
import { CodeBlock } from '@/components/CodeBlock';

export const Home = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
      fp-pack
    </h1>

    <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
      A practical functional toolkit for JavaScript and TypeScript. If you know functions, pipes, and currying, you can use it immediately.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Core Philosophy
    </h2>

    <ul class="space-y-4 text-gray-700 dark:text-gray-300 mb-8">
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3 text-2xl">🔄</span>
        <div>
          <strong class="text-lg">Pipe-First Composition</strong>
          <p class="mt-1">Built around <code class="text-sm">pipe</code> and <code class="text-sm">pipeAsync</code> for clean, left-to-right data transformations. Follow standard pipeline patterns that developers already know.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-purple-500 font-bold mr-3 text-2xl">⚡</span>
        <div>
          <strong class="text-lg">SideEffect Pattern</strong>
          <p class="mt-1">Handle errors and side effects declaratively in SideEffect-aware pipelines. Use <code class="text-sm">pipeSideEffect</code> / <code class="text-sm">pipeAsyncSideEffect</code> to short-circuit on <code class="text-sm">SideEffect</code> without breaking composition. Focus on business logic, not error plumbing. For stricter unions, use <code class="text-sm">pipeSideEffectStrict</code> / <code class="text-sm">pipeAsyncSideEffectStrict</code>.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-orange-500 font-bold mr-3 text-2xl">🔀</span>
        <div>
          <strong class="text-lg">Async First-Class</strong>
          <p class="mt-1"><code class="text-sm">pipeAsync</code> makes async flow control practical and composable. Mix sync and async functions naturally in your pipelines.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-pink-500 font-bold mr-3 text-2xl">🎯</span>
        <div>
          <strong class="text-lg">Curried by Design</strong>
          <p class="mt-1">All multi-argument utility functions are curried or behave like curried functions, enabling partial application and point-free style for elegant composition in pipes.</p>
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-gray-500 font-bold mr-3 text-2xl">📦</span>
        <div>
          <strong class="text-lg">Stream Processing</strong>
          <p class="mt-1">Lazy evaluation with <code class="text-sm">stream/*</code> functions for working with large datasets.</p>
        </div>
      </li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Why fp-pack?
    </h2>

    <ul class="space-y-3 text-gray-700 dark:text-gray-300">
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🎯</span>
        <div>
          <strong>Practical & Real-World</strong> - Solutions for everyday async operations, data pipelines, and error handling that actually ship
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🧩</span>
        <div>
          <strong>Pragmatic Abstraction</strong> - Avoids traditional monad patterns in favor of lightweight <code class="text-sm">SideEffect</code> markers for error handling. No need to wrap every function
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">📘</span>
        <div>
          <strong>JavaScript & TypeScript</strong> - Works seamlessly in JavaScript. Written in TypeScript for robust type inference when you need it
        </div>
      </li>
      <li class="flex items-start">
        <span class="text-blue-500 font-bold mr-3">🪶</span>
        <div>
          <strong>Lightweight & Modular</strong> - Zero dependencies, fully tree-shakeable, ~5KB footprint
        </div>
      </li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Key Features
    </h2>

    <div class="grid gap-4 md:gap-6 mt-6 mb-8">
      <div class="block p-4 md:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2 md:mb-3">
          Standard Pipe Operations
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          <code class="text-xs md:text-sm">pipe</code> is a pure function composition tool. Optionally, use <code class="text-xs md:text-sm">from</code> for data-first patterns when convenient.
        </p>
        <CodeBlock
          language="typescript"
          code={`// Standard: function composition
const result = pipe(
  filter(user => user.active),
  map(user => user.name),
  take(10)
)(users);

// Optional: data-first with from
const process = pipe(
  from([1, 2, 3, 4, 5]),
  filter(n => n % 2 === 0)
);
process(); // [2, 4]`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2 md:mb-3">
          SideEffect for Error Handling
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          Monadic composition without the wrapper overhead. <code class="text-xs md:text-sm">SideEffect</code> enables clean error handling in <code class="text-xs md:text-sm">pipeSideEffect</code>/<code class="text-xs md:text-sm">pipeAsyncSideEffect</code> pipelines—just business logic, no infrastructure code. Use <code class="text-xs md:text-sm">pipeSideEffectStrict</code>/<code class="text-xs md:text-sm">pipeAsyncSideEffectStrict</code> for tighter TypeScript unions.
        </p>
        <CodeBlock
          language="typescript"
          code={`const process = pipeSideEffect(
  validate,
  (data) => data.ok
    ? data
    : SideEffect.of(() => throw Error()),
  transform
);`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2 md:mb-3">
          Async Pipeline with pipeAsync
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          Compose async operations naturally. Mix sync and async functions in the same pipeline.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fetchUser = pipeAsync(
  async (id) => fetch(\`/api/\${id}\`),
  (res) => res.json(),
  (data) => data.user
);`}
        />
      </div>

      <div class="block p-4 md:p-6 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <h3 class="text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 mb-2 md:mb-3">
          Stream Processing
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3">
          Lazy evaluation for large datasets.
        </p>
        <CodeBlock
          language="typescript"
          code={`import * as Stream from 'fp-pack/stream';

const first100 = pipe(
  Stream.filter(n => n % 2 === 0),
  Stream.take(100),
  Stream.toArray
)(Stream.range(1, 1000000));`}
        />
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Understanding SideEffect
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-6">
      In JavaScript functional programming, handling exceptions without breaking pipelines is challenging. Using <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">try-catch</code> breaks composition. Wrapping every function in <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Either</code>/<code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Result</code> requires explicit <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">map</code>/<code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">chain</code> at every step—a lot of ceremony for simple error handling.
      <br /><br />
      The <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">SideEffect</code> pattern solves this: write normal functions that compose in pipeSideEffect/pipeAsyncSideEffect pipelines, and only mark exceptional paths where you need early termination or side effects. These pipelines automatically short-circuit when they encounter a <code class="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">SideEffect</code>—clean error handling without breaking flow.
    </p>

    <div class="space-y-6 mb-8">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 class="text-xl font-medium text-blue-900 dark:text-blue-100 mb-3">
          Short-Circuit on Error
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          When a function returns <code class="text-xs md:text-sm bg-blue-100 dark:bg-blue-800 px-1 rounded">SideEffect</code>, the pipeline immediately stops. No more functions execute—the effect is returned directly to the caller.
        </p>
        <CodeBlock
          language="typescript"
          code={`const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        alert('Must be 18 or older');
        return null;  // Early termination
      });

const agePipeline = pipeSideEffect(
  validateAge,
  (age) => \`Age: \${age}\`,  // Never runs if validation fails
  (msg) => console.log(msg)
);

// runPipeResult must be called OUTSIDE the pipeline
const result = runPipeResult(agePipeline(15));
// Pipeline stops at SideEffect, alert executes, returns null`}
        />
      </div>

      <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
        <h3 class="text-xl font-medium text-purple-900 dark:text-purple-100 mb-3">
          Optional Chaining Pattern
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          Return <code class="text-xs md:text-sm bg-purple-100 dark:bg-purple-800 px-1 rounded">null</code> from an effect to gracefully terminate the flow—like JavaScript's optional chaining, but explicit and composable.
        </p>
        <CodeBlock
          language="typescript"
          code={`const findUser = (id: string) => {
  const user = database.get(id);
  return user
    ? user
    : SideEffect.of(() => null);  // Graceful termination
};

const emailPipeline = pipeSideEffect(
  findUser,
  (user) => user.email,  // Skipped if user not found
  (email) => email.toLowerCase()
);

// runPipeResult must be called OUTSIDE the pipeline
const email = runPipeResult(emailPipeline('unknown-id'));
// Returns null without errors - clean optional flow`}
        />
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h3 class="text-xl font-medium text-green-900 dark:text-green-100 mb-3">
          Practical: User Notification Flow
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
          Combine validation, side effects, and business logic in a single readable pipeline. Alert the user and terminate cleanly when needed.
        </p>
        <CodeBlock
          language="typescript"
          code={`const paymentPipeline = pipeSideEffect(
  validateCard,
  (card) => card.balance >= 100
    ? card
    : SideEffect.of(() => {
        showToast('Insufficient balance');
        logEvent('payment_failed', { reason: 'insufficient_funds' });
        return null;
      }),
  chargeCard,
  sendReceipt,
  (receipt) => ({ success: true, receipt })
);

// runPipeResult must be called OUTSIDE the pipeline
const result = runPipeResult(paymentPipeline(userCard));
// If balance insufficient: shows toast, logs event, returns null
// Otherwise: completes payment and returns success object`}
        />
      </div>

      <div class="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
        <h3 class="text-xl font-medium text-orange-900 dark:text-orange-100 mb-3">
          Why This Matters
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          <strong>The JavaScript exception problem:</strong> In functional pipelines, throwing exceptions breaks composition—control jumps out of the pipe. To avoid this, you need <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">try-catch</code> (which breaks flow) or wrap every function in <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">Either</code>/<code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">Result</code> (which requires <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">map</code>/<code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">chain</code> everywhere). Both solutions make you think about <em>error plumbing</em> instead of business logic.
          <br /><br />
          <strong>The SideEffect solution:</strong> Write <strong>normal functions</strong> that compose naturally. When you need to terminate early (validation failure, missing data, errors), return <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">SideEffect.of(() =&gt; ...)</code>. The pipeSideEffect/pipeAsyncSideEffect pipeline automatically stops—no ceremony, no wrappers, no plumbing. You mark exceptional paths explicitly and handle them once at the end with <code class="text-xs md:text-sm bg-orange-100 dark:bg-orange-800 px-1 rounded">runPipeResult</code>.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      AI Agent Skills
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-4">
      fp-pack includes an AI agent skills file that helps AI coding assistants (Claude Code, GitHub Copilot, Cursor, etc.) automatically write fp-pack-style functional code.
    </p>

    <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 md:p-6 mb-6 rounded-r">
      <h3 class="text-lg font-medium text-green-800 dark:text-green-200 mb-3">
        🤖 What AI Assistants Will Do
      </h3>
      <ul class="space-y-2 text-sm md:text-base text-green-800 dark:text-green-200">
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>Default to using <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipe</code>/<code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipeAsync</code> for pure transformations, and switch to <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipeSideEffect</code>/<code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">pipeAsyncSideEffect</code> when SideEffect is involved</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>Use the <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">SideEffect</code> pattern instead of try-catch</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>Prefer <code class="text-xs md:text-sm bg-green-100 dark:bg-green-800 px-1 rounded">stream/*</code> functions for large datasets</span>
        </li>
        <li class="flex items-start">
          <span class="mr-2">•</span>
          <span>Write declarative, functional code using fp-pack utilities</span>
        </li>
      </ul>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      How to Setup
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
      If your AI coding assistant supports skills files, copy <code class="text-xs md:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">fp-pack.md</code> to the appropriate directory.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
      <strong>For Claude Code:</strong> Copy to <code class="text-xs md:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">.claude/skills/</code>
    </p>

    <CodeBlock
      language="bash"
      code={`# Unix/macOS/Linux
cp node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/

# Windows (PowerShell)
Copy-Item node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/

# Or manually create the directory and copy
mkdir -p .claude/skills
cp node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
      <strong>For Codex:</strong> Copy to <code class="text-xs md:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">~/.codex/skills/fp-pack/</code>
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
      <strong>For other AI assistants:</strong> Consult your tool's documentation for where to place skills/instructions files.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      Once configured, your AI assistant will automatically apply fp-pack coding patterns when helping you write code.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
      Get Started
    </h2>

    <p class="text-gray-700 dark:text-gray-300 mb-6">
      Explore the core composition utilities to build powerful, type-safe pipelines:
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
          Compose functions from left to right for readable data transformations.
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
          Compose functions from right to left in traditional mathematical style.
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
          Transform functions to support partial application for flexible composition.
        </p>
      </a>
    </div>
  </div>
);
