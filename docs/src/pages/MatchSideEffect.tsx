import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const MatchSideEffect = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      matchSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Pattern match on value or SideEffect with unified return type
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is matchSideEffect?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        matchSideEffect
      </strong>{' '}
      provides pattern matching for handling both regular values and SideEffect instances. It takes a value
      and two handler functions, executing the appropriate handler based on whether the value is a SideEffect.
      Both handlers must return the same type, enabling clean transformation of pipeline results to a unified output.
    </p>

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

// Pattern match - both handlers return string
const output = matchSideEffect(result, {
  value: (v) => \`Result: \${v}\`,
  effect: (se) => {
    console.log(\`Error: \${se.label}\`);
    return se.effect(); // Execute to get the value
  }
});

console.log(output); // "Division by zero"`}
    />

    <div class="bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded border border-purple-200 dark:border-purple-800 mt-6">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">✅ When to use matchSideEffect?</span>
        <br />
        <br />
        Use <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">matchSideEffect</code> when you want to
        transform both success and error cases to the <strong>same return type</strong>.
        <br />
        <br />
        For different handling in each branch with precise types, use{' '}
        <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">isSideEffect</code> instead.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`type MatchHandlers<T, RValue, REffect> = {
  value: (value: T) => RValue;
  effect: (sideEffect: SideEffect) => REffect;
};

function matchSideEffect<T, RValue, REffect = any>(
  result: T | SideEffect,
  handlers: MatchHandlers<T, RValue, REffect>
): RValue | REffect`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Unified Error Messages
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

interface User {
  id: string;
  email: string;
}

const validateAndFindUser = pipeSideEffect(
  (email: string) => email.includes('@')
    ? email
    : SideEffect.of(() => \`Invalid email: \${email}\`),
  (email) => database.findByEmail(email),
  (user) => user ?? SideEffect.of(() => 'User not found')
);

const result = validateAndFindUser('invalid');

// Both branches return a display message (string)
const message = matchSideEffect(result, {
  value: (user: User) => \`Welcome back, \${user.email}!\`,
  effect: (se) => se.effect() // Extract error message
});

showNotification(message);
// Shows: "Invalid email: invalid"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Response Formatting
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

interface APIResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const fetchUserDataPipeline = pipeAsyncSideEffect(
  async (userId: string) => {
    const response = await fetch(\`/api/users/\${userId}\`);
    return response.ok
      ? response.json()
      : SideEffect.of(async () => await response.text());
  },
  (data) => validateData(data) ?? SideEffect.of(() => 'Invalid data format')
);

const result = await fetchUserDataPipeline('user-123');

// Both branches return APIResponse
const response: APIResponse = matchSideEffect(result, {
  value: (data) => ({
    success: true,
    data
  }),
  effect: (se) => ({
    success: false,
    error: se.effect()
  })
});

res.json(response);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Conditional Rendering
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

const loadUserProfile = pipeSideEffect(
  (userId: string) => {
    const user = getUser(userId);
    return user ?? SideEffect.of(() => 'User not found');
  },
  (user) => user.profile ?? SideEffect.of(() => 'Profile not available')
);

const profileResult = loadUserProfile('user-123');

// Both branches return JSX/HTML
const content = matchSideEffect(profileResult, {
  value: (profile) => (
    <div class="profile">
      <h2>{profile.name}</h2>
      <p>{profile.bio}</p>
    </div>
  ),
  effect: (se) => (
    <div class="error">
      <p>{se.effect()}</p>
      <button onClick={retry}>Retry</button>
    </div>
  )
});

render(content);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Logging with Labels
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect } from 'fp-pack';

const processPayment = pipeSideEffect(
  (amount: number) => amount > 0
    ? amount
    : SideEffect.of(() => 'Invalid amount', 'VALIDATION_ERROR'),
  (amount) => getUserBalance() >= amount
    ? amount
    : SideEffect.of(() => 'Insufficient funds', 'BALANCE_ERROR'),
  (amount) => chargeCard(amount)
);

const result = processPayment(-10);

const logMessage = matchSideEffect(result, {
  value: (receipt) => \`Payment successful: \${receipt.id}\`,
  effect: (se) => {
    // Access label for categorized logging
    const category = se.label ?? 'UNKNOWN_ERROR';
    const message = se.effect();

    analytics.track(category, { message });
    return \`Payment failed: \${message} [\${category}]\`;
  }
});

logger.log(logMessage);
// Logs: "Payment failed: Invalid amount [VALIDATION_ERROR]"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Comparison with isSideEffect
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, matchSideEffect, isSideEffect } from 'fp-pack';

const divide = (a: number, b: number) =>
  b !== 0 ? a / b : SideEffect.of(() => 'Division by zero');

const result = pipeSideEffect((x: number) => divide(10, x))(0);

// ✅ matchSideEffect - unified return type (string)
const message1 = matchSideEffect(result, {
  value: (v) => \`Result: \${v}\`,
  effect: (se) => \`Error: \${se.effect()}\`
});
// message1: string

// ✅ isSideEffect - different handling per branch
if (!isSideEffect(result)) {
  // result is number - handle success case
  processResult(result);
} else {
  // result is SideEffect<string> - handle error case
  logError(result.effect());
}

// Use matchSideEffect when you want the same return type
// Use isSideEffect when you need different types or logic per branch`}
    />

    <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 Best Practice:</span>
        <br />
        <br />
        <strong>Use matchSideEffect when:</strong>
        <br />
        • You want to transform both success and error to the same type (string, JSX, APIResponse, etc.)
        <br />
        • You're formatting output for display or APIs
        <br />
        • You need clean pattern matching without manual type guards
        <br />
        <br />
        <strong>Use isSideEffect when:</strong>
        <br />
        • You need precise type narrowing in both branches
        <br />
        • Different logic is required for success vs error cases
        <br />
        • You want to handle each case separately with full type safety
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">matchSideEffect</code> on GitHub to see how it works internally.
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
        href="/composition/runPipeResult"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/runPipeResult');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          runPipeResult →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Execute SideEffect or return value - call OUTSIDE pipelines.
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
