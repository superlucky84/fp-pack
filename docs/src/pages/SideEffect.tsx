import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const SideEffect = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      SideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Deferred execution container for SideEffect-aware pipelines
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is SideEffect?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        SideEffect
      </strong>{' '}
      is a container that wraps an effect (function) for deferred execution. When a function in a pipeSideEffect/pipeAsyncSideEffect returns a SideEffect,
      the pipeline immediately stops and returns the SideEffect without executing it. The effect only runs when you explicitly
      call <code class="text-sm">runPipeResult()</code> or <code class="text-sm">sideEffect.effect()</code>.
      This pattern enables clean error handling and early termination in functional pipelines without wrapper types everywhere.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { SideEffect, pipeSideEffect, runPipeResult } from 'fp-pack';

// Create a SideEffect that will execute later
const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        console.log('Age validation failed');
        return null;
      });

const processAgePipeline = pipeSideEffect(
  validateAge,
  (age) => age * 2,      // Skipped if SideEffect returned
  (age) => \`Age: \${age}\`
);

// runPipeResult must be called OUTSIDE the pipeline
runPipeResult(processAgePipeline(15)); // Logs "Age validation failed", returns null`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">✅ When to use SideEffect?</span>
        <br />
        <br />
        <strong>Default choice: Use <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipe</code> or <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsync</code></strong>
        <br />
        <br />
        Most data transformations are pure and don't need SideEffect handling. Start with{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipe</code> or{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsync</code>, and{' '}
        <strong>only switch to <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeSideEffect</code> /{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code> when you actually need</strong>:
        <br />
        • Early termination based on validation
        <br />
        • Error handling with side effects (logging, toasts, etc.)
        <br />
        • Optional chaining patterns
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`// ✅ GOOD: 99% of cases - use pipe (pure transformations)
import { pipe, map, filter, sort } from 'fp-pack';

const processData = pipe(
  filter(isValid),
  map(transform),
  sort(byDate)
);

// ✅ GOOD: Only when you need SideEffect - use pipeSideEffect
import { pipeSideEffect, SideEffect } from 'fp-pack';

const processWithValidation = pipeSideEffect(
  validateOrStop,  // Might return SideEffect for early termination
  transform,
  save
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`class SideEffect<T = any> {
  constructor(effect: () => T, label?: string);

  static of<T>(effect: () => T, label?: string): SideEffect<T>;

  effect(): T;
  label?: string;
}

// Type guard
function isSideEffect(value: unknown): value is SideEffect;

// Pattern matching
function matchSideEffect<T, R>(
  value: T | SideEffect,
  handlers: {
    value: (v: T) => R;
    effect: (se: SideEffect) => R;
  }
): R;

// Execute SideEffect or return value
function runPipeResult<R>(result: SideEffect<R>): R;
function runPipeResult<T>(result: T): T extends SideEffect<infer R> ? R : T;
function runPipeResult<T, R = any>(result: T | SideEffect<R>): T | R;`}
    />

    <div class="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-red-800 dark:text-red-200 leading-relaxed">
        <span class="font-medium">🚨 Critical: runPipeResult Type Safety</span>
        <br />
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult&lt;T, R=any&gt;</code> has a default type parameter <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R=any</code>.
        <br />
        <br />
        ✅ <strong>If the input type is precise, inference is preserved.</strong>
        <br />
        ⚠️ <strong>If the input is widened to <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> or <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>, the result becomes <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>.</strong>
        <br />
        ✅ <strong>If the input is narrowed to <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;R&gt;</code> (e.g. after <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">isSideEffect</code>), <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult</code> returns <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R</code>.</strong>
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
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Validation with Early Exit
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface FormData {
  email: string;
  age: number;
}

const validateEmail = (data: FormData) =>
  data.email.includes('@')
    ? data
    : SideEffect.of(() => {
        throw new Error('Invalid email');
      });

const validateAge = (data: FormData) =>
  data.age >= 18
    ? data
    : SideEffect.of(() => {
        throw new Error('Must be 18 or older');
      });

const processFormPipeline = pipeSideEffect(
  validateEmail,
  validateAge,
  (data) => ({ success: true, data })
);

// runPipeResult must be called OUTSIDE the pipeline
try {
  runPipeResult(processFormPipeline({ email: 'test@example.com', age: 25 }));
  // { success: true, data: { email: 'test@example.com', age: 25 } }

  runPipeResult(processFormPipeline({ email: 'invalid', age: 25 }));
  // Throws: Error: Invalid email
} catch (err) {
  console.error(err.message);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Optional Chaining Pattern
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface User {
  id: string;
  profile?: {
    settings?: {
      theme: string;
    };
  };
}

const findUser = (id: string): User | SideEffect => {
  const user = database.get(id);
  return user ? user : SideEffect.of(() => null);
};

const getUserThemePipeline = pipeSideEffect(
  findUser,
  (user) => user.profile ?? SideEffect.of(() => null),
  (profile) => profile.settings ?? SideEffect.of(() => null),
  (settings) => settings.theme
);

// runPipeResult must be called OUTSIDE the pipeline
runPipeResult(getUserThemePipeline('user-123')); // 'dark' or null if any step fails`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Error Handling with Side Effects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface PaymentData {
  amount: number;
  userId: string;
}

const validateAmount = (payment: PaymentData) =>
  payment.amount > 0
    ? payment
    : SideEffect.of(() => {
        logError('Invalid amount', payment);
        showToast('Payment amount must be positive');
        return null;
      });

const checkBalance = (payment: PaymentData) => {
  const balance = getUserBalance(payment.userId);
  return balance >= payment.amount
    ? payment
    : SideEffect.of(() => {
        logError('Insufficient balance', { payment, balance });
        showToast(\`Insufficient funds. Balance: $\${balance}\`);
        return null;
      });
};

const processPaymentPipeline = pipeSideEffect(
  validateAmount,
  checkBalance,
  (payment) => chargeCard(payment),
  (result) => ({ success: true, ...result })
);

// runPipeResult must be called OUTSIDE the pipeline
const result = runPipeResult(processPaymentPipeline({ amount: -10, userId: 'user-1' }));
// Logs error, shows toast, returns null`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pattern Matching with matchSideEffect
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

const divide = (a: number, b: number) =>
  b !== 0
    ? a / b
    : SideEffect.of(() => 'Division by zero', 'DIV_ZERO');

const calculate = pipeSideEffect(
  (x: number) => divide(x, 0),
  (result) => result * 2
);

const result = calculate(10);

// Handle both regular values and SideEffects
const output = matchSideEffect(result, {
  value: (v) => \`Result: \${v}\`,
  effect: (se) => {
    console.log(\`Error: \${se.label}\`);
    return se.effect(); // Manually execute to get the value
  }
});

console.log(output); // "Division by zero"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Type Guard with isSideEffect
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">isSideEffect</code> provides <strong>precise type narrowing</strong> for handling pipeline results.
      Unlike <code class="text-sm">runPipeResult</code> or <code class="text-sm">matchSideEffect</code>, it narrows the type
      in both branches, giving you exact type inference for success and error paths.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const processNumbers = pipeSideEffect(
  (nums: number[]) => nums.filter(n => n % 2 === 1),
  (odds) => odds.length > 0
    ? odds
    : SideEffect.of(() => 'No odd numbers found'),
  (odds) => odds.map(n => n * 2)
);

const oddsDoubled = processNumbers([1, 2, 3, 4, 5]);

// ✅ Type-safe branching with precise inference
if (!isSideEffect(oddsDoubled)) {
  // TypeScript knows: oddsDoubled is number[]
  const result: number = oddsDoubled.reduce((a, b) => a + b, 0);
  console.log(\`Sum: \${result}\`);  // result: number (exact type!)
} else {
  // TypeScript knows: oddsDoubled is SideEffect<any> in non-strict pipelines
  const error = oddsDoubled.effect();
  console.log(\`Error: \${error}\`);
}

// ⚠️ Without isSideEffect - types can widen in non-strict pipelines
const widened = oddsDoubled; // pipeSideEffect widens SideEffect to any
const unsafeResult = runPipeResult(widened);
// unsafeResult: any

const safeResult = runPipeResult<number[], string>(oddsDoubled);
// safeResult: number[] | string (union type - safe but not narrowed)

// ✅ With strict pipelines, SideEffect types are preserved
const strictResult = pipeSideEffectStrict(
  (nums: number[]) => nums.length > 0 ? nums : SideEffect.of(() => 'EMPTY' as const),
  (nums) => nums
)([]);

if (isSideEffect(strictResult)) {
  const error = runPipeResult(strictResult); // 'EMPTY'
}`}
    />

    <div class="bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded border border-blue-200 dark:border-blue-800">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 When to use isSideEffect:</span>
        <br />
        <br />
        <strong>Use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">isSideEffect</code></strong> when you need{' '}
        <strong>precise type inference</strong> for both success and error paths.
        <br />
        <br />
        ⚠️ <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code> returns <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">any</code> when the input is widened to{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> or{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">any</code> due to the default{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">R=any</code> parameter. If the input is narrowed to{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">SideEffect&lt;R&gt;</code>, it returns{' '}
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">R</code>.
        <br />
        Only use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code> when you don't need precise types or when you provide explicit type parameters.
        <br />
        <br />
        Use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">matchSideEffect</code> for pattern matching when you want to transform both cases to the same return type.
      </p>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      SideEffect Composition Rule
    </h3>

    <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">🔄 Critical Rule: SideEffect Contagion</span>
        <br />
        <br />
        Once you use <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeSideEffect</code> or{' '}
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>, the result is <strong>always <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">T | SideEffect</code></strong>.
        <br />
        <br />
        If you want to continue composing this result, you <strong>MUST</strong> keep using SideEffect-aware pipes.
        You <strong>CANNOT</strong> switch back to <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipe</code> or{' '}
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsync</code> because they don't handle SideEffect.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { pipe, pipeSideEffect, SideEffect } from 'fp-pack';

const validateUserPipeline = pipeSideEffect(
  findUser,           // User | SideEffect
  validateAge         // User | SideEffect
);
// Result type: User | SideEffect

// ❌ WRONG - pipe cannot handle SideEffect
const wrongPipeline = pipe(
  validateUserPipeline,  // Returns User | SideEffect
  (user) => user.email   // Type error! SideEffect has no 'email' property
);

// ✅ CORRECT - Keep using pipeSideEffect
const correctPipeline = pipeSideEffect(
  validateUserPipeline,  // User | SideEffect - handled correctly
  (user) => user.email,  // Automatically skipped if SideEffect
  sendEmail
);

// Key rule: Once SideEffect possibility exists, use SideEffect-aware pipes until the end
const finalPipeline = pipeSideEffect(
  validateUserPipeline,
  processUser,
  saveToDatabase,
  sendNotification
  // All steps must be in pipeSideEffect chain
);`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ Important:</span>
        <br />
        <br />
        SideEffect is <strong>never auto-executed</strong>. When a pipeSideEffect/pipeAsyncSideEffect encounters a SideEffect, it stops and returns it.
        You must explicitly call{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> or{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">sideEffect.effect()</code> to execute it.
        <br />
        <br />
        This gives you complete control over when and how side effects run, enabling clean error handling
        without breaking functional composition.
      </p>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Strict Variants
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      If you want precise union types for SideEffect results across branches, use{' '}
      <a
        href="/composition/pipeSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffectStrict');
        }}
        class="font-semibold text-blue-700 dark:text-blue-300"
      >
        pipeSideEffectStrict
      </a>{' '}
      or{' '}
      <a
        href="/async/pipeAsyncSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffectStrict');
        }}
        class="font-semibold text-blue-700 dark:text-blue-300"
      >
        pipeAsyncSideEffectStrict
      </a>
      .
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">sideEffect</code> on GitHub to see how it works internally.
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

      <a
        href="/composition/pipeSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffectStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeSideEffectStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Strict union types for SideEffect results.
        </p>
      </a>

      <a
        href="/async/pipeAsyncSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipeAsyncSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Async composition with SideEffect short-circuiting.
        </p>
      </a>

      <a
        href="/async/pipeAsyncSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffectStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipeAsyncSideEffectStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Async pipelines with strict SideEffect unions.
        </p>
      </a>

      <a
        href="/control/tryCatch"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/tryCatch');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          tryCatch →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Handle exceptions functionally - alternative to SideEffect for simple cases.
        </p>
      </a>
    </div>
  </div>
);
