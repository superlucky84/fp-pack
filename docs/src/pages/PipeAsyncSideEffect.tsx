import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeAsyncSideEffect = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeAsyncSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Async pipelines with SideEffect short-circuiting
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is pipeAsyncSideEffect?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeAsyncSideEffect
      </strong>{' '}
      composes async/sync functions like <strong>pipeAsync</strong>, while allowing a{' '}
      <strong class="font-semibold">SideEffect</strong> to halt the pipeline. It accepts a SideEffect as input and
      returns it unchanged. Prefer value-first <code class="text-sm">pipeAsyncSideEffect(data, ...)</code> for inference,
      and use function-first for reuse. Use <strong>pipeAsync</strong> for pure async pipelines.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const fetchUser = async (id: string) => ({ id, verified: false });

const checkVerified = (user: { id: string; verified: boolean }) =>
  user.verified
    ? user
    : SideEffect.of(() => ({ error: 'Email not verified', userId: user.id }));

// runPipeResult must be called OUTSIDE the pipeline
const result = runPipeResult(
  await pipeAsyncSideEffect('123', fetchUser, checkVerified)
);
// { error: 'Email not verified', userId: '123' }`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">✅ When to use pipeAsyncSideEffect?</span>
        <br />
        <br />
        <strong>Default choice: Use <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsync</code></strong>
        <br />
        <br />
        Most async data transformations don't need SideEffect. Start with{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsync</code> for pure async operations, and{' '}
        <strong>only use <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code> when you actually need</strong>{' '}
        early termination or error handling with side effects.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`// ✅ GOOD: 99% of cases - use pipeAsync (pure async transformations)
import { pipeAsync } from 'fp-pack';

const userId = '123';

const profile = await pipeAsync(
  userId,
  async (id: string) => fetchUser(id),
  (user) => user.profile
);

// ✅ GOOD: Only when SideEffect needed - use pipeAsyncSideEffect
import { pipeAsyncSideEffect, SideEffect } from 'fp-pack';

const result = runPipeResult(
  await pipeAsyncSideEffect(
    userId,
    async (id: string) => fetchUser(id),
    (user) => user.verified ? user : SideEffect.of(() => 'Not verified')
  )
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function pipeAsyncSideEffect<A, R>(
  a: A,
  ab: (a: A) => R | SideEffect | Promise<R | SideEffect>
): Promise<R | SideEffect>;

function pipeAsyncSideEffect<A, R>(
  ab: (a: A) => R | SideEffect | Promise<R | SideEffect>
): (a: A | SideEffect) => Promise<R | SideEffect>;

function pipeAsyncSideEffect<A, B, R>(
  a: A,
  ab: (a: A) => B | SideEffect | Promise<B | SideEffect>,
  bc: (b: B) => R | SideEffect | Promise<R | SideEffect>
): Promise<R | SideEffect>;

function pipeAsyncSideEffect<A, B, R>(
  ab: (a: A) => B | SideEffect | Promise<B | SideEffect>,
  bc: (b: B) => R | SideEffect | Promise<R | SideEffect>
): (a: A | SideEffect) => Promise<R | SideEffect>;

function pipeAsyncSideEffect(...funcs: Array<(input: any) => any>): (input: any) => Promise<any>;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Each step can return a value, a SideEffect, or a Promise of either. If a SideEffect appears,
      the pipeline stops immediately and returns it.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Strict Variant
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipeAsyncSideEffectStrict</code> keeps a strict union of SideEffect result types across the
      pipeline. It is useful when you want tighter type narrowing for async early exits.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffectStrict, SideEffect } from 'fp-pack';

// Result type: Promise<number | SideEffect<'NEGATIVE' | 0>>
const result = await pipeAsyncSideEffectStrict(
  5,
  async (n: number) => (n > 0 ? n : SideEffect.of(() => 'NEGATIVE' as const)),
  (n) => (n > 10 ? n : SideEffect.of(() => 0 as const))
);`}
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
        ⚠️ <strong>If the input is widened to <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> or <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code> (common in <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>), the result becomes <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code>.</strong>
        <br />
        ✅ <strong>If the input is narrowed to <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">SideEffect&lt;R&gt;</code>, <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult</code> returns <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R</code>.</strong>
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded text-xs">const result = runPipeResult(pipeline(data)); // result: any (widened input)</code>
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
      Working with SideEffect
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Async Validation with Early Exit
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface User {
  id: string;
  email: string;
  verified: boolean;
}

const fetchUser = async (id: string): Promise<User> => {
  // Simulate API call
  return {
    id,
    email: 'user@example.com',
    verified: false
  };
};

const checkVerified = (user: User) => {
  if (!user.verified) {
    return SideEffect.of(() => ({
      error: 'Email not verified',
      userId: user.id
    }));
  }
  return user;
};

const sendNotification = async (user: User) => {
  console.log(\`Sending notification to \${user.email}\`);
  return { sent: true, userId: user.id };
};

// runPipeResult must be called OUTSIDE the pipeline
const result = runPipeResult(
  await pipeAsyncSideEffect(
    '123',
    fetchUser,
    checkVerified,
    sendNotification  // This won't execute if user is not verified
  )
);
console.log(result);  // { error: 'Email not verified', userId: '123' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Error Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const fetchData = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    // Return SideEffect for error handling
    return SideEffect.of(async () => {
      const error = await response.text();
      throw new Error(\`API Error: \${error}\`);
    }, 'api-error');
  }
  return response.json();
};

const validateData = (data: any) => {
  if (!data.id) {
    return SideEffect.of(() => {
      throw new Error('Invalid data: missing id');
    });
  }
  return data;
};

const processData = async (data: any) => {
  console.log('Processing:', data.id);
  return { processed: true, ...data };
};

// runPipeResult must be called OUTSIDE the pipeline
try {
  const result = runPipeResult(
    await pipeAsyncSideEffect(
      'https://api.example.com/data',
      fetchData,
      validateData,
      processData
    )
  );
  console.log('Success:', result);
} catch (err) {
  console.error('Caught error:', err.message);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Conditional Async Operations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface PaymentRequest {
  amount: number;
  currency: string;
  userId: string;
}

const validatePayment = async (req: PaymentRequest) => {
  if (req.amount <= 0) {
    return SideEffect.of(() => ({
      error: 'Invalid amount',
      amount: req.amount
    }));
  }
  return req;
};

const checkBalance = async (req: PaymentRequest) => {
  // Simulate balance check
  const balance = 100;
  if (balance < req.amount) {
    return SideEffect.of(() => ({
      error: 'Insufficient funds',
      balance,
      required: req.amount
    }));
  }
  return req;
};

const processPayment = async (req: PaymentRequest) => {
  console.log(\`Processing payment: \${req.amount} \${req.currency}\`);
  return { success: true, transactionId: 'tx_123', ...req };
};

// runPipeResult must be called OUTSIDE the pipeline
const result = runPipeResult(
  await pipeAsyncSideEffect(
    {
      amount: 150,
      currency: 'USD',
      userId: 'user_1'
    },
    validatePayment,
    checkBalance,
    processPayment
  )
);

console.log(result);
// { error: 'Insufficient funds', balance: 100, required: 150 }`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ Important:</span>
        <br />
        <br />
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> and{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">matchSideEffect()</code> must be called{' '}
        <strong>OUTSIDE</strong> the <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code> chain.
        <br />
        <br />
        Using them inside the pipeline will break type safety and return <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">unknown</code> or{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> types.
        <br />
        <br />
        Always: <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">await runPipeResult(pipeline(input))</code>
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
        Once you use <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>, the result is <strong>always <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">Promise&lt;T | SideEffect&gt;</code></strong>.
        <br />
        <br />
        If you want to continue composing this result, you <strong>MUST</strong> keep using <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsyncSideEffect</code>.
        You <strong>CANNOT</strong> switch back to <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeAsync</code> because it doesn't handle SideEffect.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync, pipeAsyncSideEffect, SideEffect } from 'fp-pack';

const validateUserPipeline = pipeAsyncSideEffect(
  fetchUser,
  validateAge
);
// Result type: Promise<User | SideEffect>

const userId = '123';

// ❌ WRONG - pipeAsync cannot handle SideEffect
const wrongPipeline = pipeAsync(
  userId,
  validateUserPipeline,  // Returns Promise<User | SideEffect>
  (user) => user.email   // Type error! SideEffect has no 'email' property
);

// ✅ CORRECT - Keep using pipeAsyncSideEffect
const correctPipeline = pipeAsyncSideEffect(
  userId,
  validateUserPipeline,  // Promise<User | SideEffect> - handled correctly
  (user) => user.email,  // Automatically skipped if SideEffect
  sendEmail
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Choosing Your Pipe: Flexibility vs. Strictness
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Just like other pipes, fp-pack offers two variants of async SideEffect pipes. The choice
      impacts how the types of the final{' '}
      <strong class="font-semibold text-orange-600 dark:text-orange-400">SideEffect</strong> are
      inferred.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipeAsyncSideEffect (Flexible)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Goal:</strong> Smooth inference for the success path.
          </li>
          <li>
            <strong>Pro:</strong> Offers a great developer experience when you primarily care about the
            successful result and treat all potential failures similarly.
          </li>
          <li>
            <strong>Con:</strong> The final SideEffect type is often widened to{' '}
            <code class="text-xs">SideEffect&lt;any&gt;</code>, losing the specific types of
            different potential effects. This prevents exhaustive, type-safe handling of
            different failure cases.
          </li>
        </ul>
      </div>
      <div class="border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-emerald-900 dark:text-emerald-100 mb-2">
          pipeAsyncSideEffectStrict (Safe)
        </h4>
        <ul class="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>
            <strong>Goal:</strong> Maximum type safety for all paths.
          </li>
          <li>
            <strong>Pro:</strong> Guarantees the final SideEffect type is a precise union of all
            possible effects from the pipeline (e.g.,{' '}
            <code class="text-xs">SideEffect&lt;'A' | 'B'&gt;</code>). This allows for robust,
            type-safe pattern matching on failure cases.
          </li>
          <li>
            <strong>Con:</strong> This strictness can sometimes require more explicit type
            annotations if the compiler cannot automatically unify all possible effect types.
          </li>
        </ul>
      </div>
    </div>

    <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-yellow-800 dark:text-yellow-200 leading-relaxed">
        <span class="font-medium">💡 Recommendation:</span>
        <br />
        <br />
        Use <strong>pipeAsyncSideEffect</strong> when you want to handle failures generally (e.g.,
        logging an error and returning null). Use{' '}
        <a
          href="/async/pipeAsyncSideEffectStrict"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/async/pipeAsyncSideEffectStrict');
          }}
          class="font-semibold text-emerald-700 dark:text-emerald-300"
        >
          pipeAsyncSideEffectStrict
        </a>{' '}
        when you need to programmatically distinguish between different failure types and handle
        them with full type safety.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">pipeAsyncSideEffect</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/pipeAsyncSideEffect.ts"
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
        href="/async/pipeAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Pure async composition without SideEffect short-circuiting.
        </p>
      </a>

      <a
        href="/async/pipeAsyncSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/pipeAsyncSideEffectStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipeAsyncSideEffectStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Async SideEffect pipelines with strict effect unions.
        </p>
      </a>

      <a
        href="/composition/pipeSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipeSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Sync pipelines with SideEffect short-circuiting.
        </p>
      </a>

      <a
        href="/composition/sideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/sideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          sideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Deferred execution container for conditional pipeline halting.
        </p>
      </a>
    </div>
  </div>
);
