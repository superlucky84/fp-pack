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
      code={`import { SideEffect, pipeSideEffect, runPipeResult } from 'fp-kit';

// Create a SideEffect that will execute later
const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        console.log('Age validation failed');
        return null;
      });

const processAge = pipeSideEffect(
  validateAge,
  (age) => age * 2,      // Skipped if SideEffect returned
  (age) => \`Age: \${age}\`,
  runPipeResult          // Executes SideEffect if present
);

processAge(15); // Logs "Age validation failed", returns null`}
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
function runPipeResult<T, R>(value: T | SideEffect<R>): T | R;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Validation with Early Exit
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

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

const processForm = pipeSideEffect(
  validateEmail,
  validateAge,
  (data) => ({ success: true, data }),
  runPipeResult
);

try {
  processForm({ email: 'test@example.com', age: 25 });
  // { success: true, data: { email: 'test@example.com', age: 25 } }

  processForm({ email: 'invalid', age: 25 });
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
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

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

const getUserTheme = pipeSideEffect(
  findUser,
  (user) => user.profile ?? SideEffect.of(() => null),
  (profile) => profile.settings ?? SideEffect.of(() => null),
  (settings) => settings.theme,
  runPipeResult
);

getUserTheme('user-123'); // 'dark' or null if any step fails`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Error Handling with Side Effects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

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

const processPayment = pipeSideEffect(
  validateAmount,
  checkBalance,
  (payment) => chargeCard(payment),
  (result) => ({ success: true, ...result }),
  runPipeResult
);

const result = processPayment({ amount: -10, userId: 'user-1' });
// Logs error, shows toast, returns null`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pattern Matching with matchSideEffect
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-kit';

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

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect } from 'fp-kit';

const processData = (data: number) =>
  data > 0
    ? data * 2
    : SideEffect.of(() => 'Invalid data');

const result = processData(-5);

if (isSideEffect(result)) {
  console.log('Pipeline stopped with effect');
  const value = result.effect();
  console.log(value); // "Invalid data"
} else {
  console.log('Success:', result);
}`}
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
