import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const RunPipeResult = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      runPipeResult
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Execute SideEffect or return value - MUST be called OUTSIDE pipelines
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is runPipeResult?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
        runPipeResult
      </strong>{' '}
      executes a SideEffect's deferred function or returns the value as-is. This function is the standard way to
      unwrap pipeline results from <code class="text-sm">pipeSideEffect</code> or <code class="text-sm">pipeAsyncSideEffect</code>.
      It MUST be called <strong>OUTSIDE</strong> the pipeline to extract the final value.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        console.log('Age validation failed');
        return null;
      });

const processAgePipeline = pipeSideEffect(
  validateAge,
  (age) => age * 2,
  (age) => \`Age: \${age}\`
);

// ❌ WRONG - Never call runPipeResult INSIDE a pipeline
const wrongPipeline = pipeSideEffect(
  validateAge,
  (age) => runPipeResult(age)  // ERROR! Don't do this
);

// ✅ CORRECT - Call runPipeResult OUTSIDE the pipeline
const result = runPipeResult(processAgePipeline(15));
// Logs "Age validation failed", returns null`}
    />

    <div class="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-red-800 dark:text-red-200 leading-relaxed">
        <span class="font-medium">🚨 Critical: Type Safety Warning</span>
        <br />
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult&lt;T, R=any&gt;</code> has a
        default type parameter <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R=any</code>.
        <br />
        <br />
        ❌ <strong>Without type narrowing, runPipeResult returns <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code> type:</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">const result = runPipeResult(pipeline(data)); // result: any</code>
        <br />
        <br />
        ✅ <strong>For precise type safety, use <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">isSideEffect</code> type guard:</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">if (!isSideEffect(result)) {'{'} /* exact type */ {'}'}</code>
        <br />
        <br />
        Or explicitly provide type parameters:
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">runPipeResult&lt;SuccessType, ErrorType&gt;(result)</code>
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function runPipeResult<T, R = any>(result: T | SideEffect<R>): T | R`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const validateEmail = (email: string) =>
  email.includes('@')
    ? email
    : SideEffect.of(() => 'Invalid email');

const processEmailPipeline = pipeSideEffect(
  validateEmail,
  (email) => email.toLowerCase(),
  (email) => \`Processed: \${email}\`
);

// ✅ Call runPipeResult OUTSIDE the pipeline
const result1 = runPipeResult(processEmailPipeline('test@example.com'));
// result1: "Processed: test@example.com"

const result2 = runPipeResult(processEmailPipeline('invalid'));
// result2: "Invalid email"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Explicit Types
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface User {
  id: string;
  email: string;
}

type ValidationError = string;

const findUserPipeline = pipeSideEffect(
  (email: string) => database.findByEmail(email),
  (user) => user ?? SideEffect.of(() => 'User not found')
);

const userOrError = findUserPipeline('test@example.com');

// ✅ Provide explicit types for better type safety
const result = runPipeResult<User, ValidationError>(userOrError);
// result: User | ValidationError (union type, safer than 'any')`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Async Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const fetchUserDataPipeline = pipeAsyncSideEffect(
  async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.ok
      ? response.json()
      : SideEffect.of(async () => 'API request failed');
  },
  async (data) => validateData(data) ?? SideEffect.of(() => 'Invalid data')
);

const result = await fetchUserDataPipeline('user-123');

// runPipeResult works with async results too
const finalValue = runPipeResult(result);
// finalValue: UserData | string`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Error Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const processPaymentPipeline = pipeSideEffect(
  (amount: number) => amount > 0
    ? amount
    : SideEffect.of(() => {
        throw new Error('Invalid amount');
      }),
  (amount) => chargeCard(amount),
  (receipt) => ({ success: true, receipt })
);

// SideEffect can throw errors when executed
try {
  const result = runPipeResult(processPaymentPipeline(-10));
  console.log('Payment processed:', result);
} catch (error) {
  console.error('Payment failed:', error.message);
  // Logs: "Payment failed: Invalid amount"
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Comparison with isSideEffect
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const divide = (a: number, b: number) =>
  b !== 0 ? a / b : SideEffect.of(() => 'Division by zero');

const result = pipeSideEffect((x: number) => divide(10, x))(2);

// ❌ runPipeResult without type guard - returns 'any'
const value1 = runPipeResult(result);
// value1: any (no type information!)

// ✅ runPipeResult with explicit types - safer
const value2 = runPipeResult<number, string>(result);
// value2: number | string (union type, but not narrowed)

// ✅ isSideEffect for precise type narrowing - best
if (!isSideEffect(result)) {
  // result is number (exact type!)
  const doubled: number = result * 2;
  console.log(\`Result: \${doubled}\`);
} else {
  // result is SideEffect<string> (exact type!)
  const error: string = runPipeResult(result);
  console.error(\`Error: \${error}\`);
}

// Recommendation: Use isSideEffect for type-safe branching
// Only use runPipeResult when you don't need precise types`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ Important Rules:</span>
        <br />
        <br />
        <strong>1. NEVER call runPipeResult INSIDE a pipeline:</strong>
        <br />
        SideEffect-aware pipelines already handle SideEffect internally. Calling runPipeResult inside breaks the flow.
        <br />
        <br />
        <strong>2. ALWAYS call runPipeResult OUTSIDE the pipeline:</strong>
        <br />
        Use it to extract the final value after all pipeline steps complete.
        <br />
        <br />
        <strong>3. For type safety, prefer isSideEffect over runPipeResult:</strong>
        <br />
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">isSideEffect</code> provides exact type narrowing.
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult</code> returns <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">any</code> without explicit types.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">runPipeResult</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/sideEffect.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      View on GitHub
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/sideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/sideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          SideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Deferred execution container for SideEffect-aware pipelines.
        </p>
      </a>

      <a
        href="/composition/isSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/isSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          isSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Type guard for runtime SideEffect checking with precise type narrowing.
        </p>
      </a>

      <a
        href="/composition/matchSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/matchSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          matchSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Pattern match on value or SideEffect with unified return type.
        </p>
      </a>

      <a
        href="/composition/pipeSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Compose functions left-to-right with SideEffect short-circuiting.
        </p>
      </a>
    </div>
  </div>
);
