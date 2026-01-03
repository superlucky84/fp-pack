import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const PipeSideEffect = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipeSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Compose functions left to right with SideEffect short-circuiting
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is pipeSideEffect?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipeSideEffect
      </strong>{' '}
      composes functions like <strong>pipe</strong>, but allows returning a{' '}
      <strong class="font-semibold">SideEffect</strong> to halt the pipeline early.
      It also accepts a SideEffect as input and simply returns it unchanged.
      Use <strong>pipe</strong> for pure pipelines without early exit.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        throw new Error('Must be 18 or older');
      });

const processAgePipeline = pipeSideEffect(
  validateAge,
  (age: number) => age * 2,
  (age: number) => \`Age: \${age}\`
);

// runPipeResult must be called OUTSIDE the pipeline
runPipeResult(processAgePipeline(15)); // Throws: Error: Must be 18 or older`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">✅ When to use pipeSideEffect?</span>
        <br />
        <br />
        <strong>Default choice: Use <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipe</code></strong>
        <br />
        <br />
        Most data transformations don't need SideEffect. Start with{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipe</code> for pure transformations, and{' '}
        <strong>only use <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">pipeSideEffect</code> when you actually need</strong>{' '}
        early termination or error handling with side effects.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`// ✅ GOOD: 99% of cases - use pipe (pure transformations)
import { pipe, map, filter } from 'fp-pack';

const processData = pipe(
  filter(isValid),
  map(transform)
);

// ✅ GOOD: Only when SideEffect needed - use pipeSideEffect
import { pipeSideEffect, SideEffect } from 'fp-pack';

const processWithValidation = pipeSideEffect(
  validateOrStop,  // Might return SideEffect
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
      code={`function pipeSideEffect<A, R>(
  ab: (a: A) => R | SideEffect
): (a: A | SideEffect) => R | SideEffect;

function pipeSideEffect<A, B, R>(
  ab: (a: A) => B | SideEffect,
  bc: (b: B) => R | SideEffect
): (a: A | SideEffect) => R | SideEffect;

function pipeSideEffect(...funcs: Array<(input: any) => any>): (input: any) => any;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Each step can return a normal value or a SideEffect. If a SideEffect appears, the pipeline stops immediately
      and returns it.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Strict Variant
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">pipeSideEffectStrict</code> keeps a strict union of all SideEffect result types instead of
      widening to <code class="text-sm">any</code>. Use it when you want precise type narrowing across branches.
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

    <div class="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-red-800 dark:text-red-200 leading-relaxed">
        <span class="font-medium">🚨 Critical: runPipeResult Type Safety</span>
        <br />
        <br />
        <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">runPipeResult&lt;T, R=any&gt;</code> has a default type parameter <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">R=any</code>.
        <br />
        <br />
        ❌ <strong>Using runPipeResult without type narrowing returns <code class="bg-red-100 dark:bg-red-900/40 px-1 py-0.5 rounded">any</code> type:</strong>
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
      Working with SideEffect
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Basic SideEffect Usage
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const validateAge = (age: number) => {
  if (age < 0) {
    // Return SideEffect to stop pipeline
    return SideEffect.of(() => {
      throw new Error('Age cannot be negative');
    });
  }
  return age;
};

const processAgePipeline = pipeSideEffect(
  validateAge,
  (age: number) => age * 2,  // This won't execute if SideEffect is returned
  (age: number) => \`Age: \${age}\`
);

// runPipeResult must be called OUTSIDE the pipeline
try {
  runPipeResult(processAgePipeline(-5));  // Throws: Error: Age cannot be negative
} catch (error) {
  console.error(error.message);
}

// Normal execution continues
const result = runPipeResult(processAgePipeline(10));
console.log(result);  // "Age: 20"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Conditional Early Exit
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

const checkPermission = (user: User) => {
  if (user.role !== 'admin') {
    return SideEffect.of(() => ({
      error: 'Unauthorized',
      message: 'Admin access required'
    }));
  }
  return user;
};

const deleteUserPipeline = pipeSideEffect(
  checkPermission,
  (user: User) => {
    console.log(\`Deleting user: \${user.name}\`);
    return { success: true, deletedId: user.id };
  }
);

const adminUser = { id: 1, name: 'Alice', role: 'admin' as const };
const normalUser = { id: 2, name: 'Bob', role: 'user' as const };

// Admin can proceed - runPipeResult called OUTSIDE
const result1 = runPipeResult(deleteUserPipeline(adminUser));
// Logs: "Deleting user: Alice"
console.log(result1);  // { success: true, deletedId: 1 }

// Normal user gets error immediately
const result2 = runPipeResult(deleteUserPipeline(normalUser));
console.log(result2);  // { error: 'Unauthorized', message: 'Admin access required' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Deferred Logging and Side Effects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-pack';

const divide = (a: number, b: number) => {
  if (b === 0) {
    return SideEffect.of(() => {
      console.error('Division by zero!');
      return NaN;
    }, 'division-by-zero');  // Optional label for debugging
  }
  return a / b;
};

const calculatePipeline = pipeSideEffect(
  (input: { a: number; b: number }) => divide(input.a, input.b),
  (result: number) => result * 100,
  (result: number) => Math.round(result)
);

// Normal calculation - runPipeResult called OUTSIDE
const result1 = runPipeResult(calculatePipeline({ a: 10, b: 2 }));
console.log(result1);  // 500

// Division by zero executes SideEffect and logs
const result2 = runPipeResult(calculatePipeline({ a: 10, b: 0 }));
// Logs: "Division by zero!"
console.log(result2);  // NaN`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ Important:</span>
        <br />
        <br />
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> and{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">matchSideEffect()</code> must be called{' '}
        <strong>OUTSIDE</strong> the <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">pipeSideEffect</code> chain.
        <br />
        <br />
        Using them inside the pipeline will break type safety and return <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">unknown</code> or{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">SideEffect&lt;any&gt;</code> types.
        <br />
        <br />
        Always: <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult(pipeline(input))</code>
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
        Once you use <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeSideEffect</code>, the result is <strong>always <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">T | SideEffect</code></strong>.
        <br />
        <br />
        If you want to continue composing this result, you <strong>MUST</strong> keep using <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipeSideEffect</code>.
        You <strong>CANNOT</strong> switch back to <code class="bg-purple-100 dark:bg-purple-900/40 px-1 py-0.5 rounded">pipe</code> because it doesn't handle SideEffect.
      </p>
    </div>

    <CodeBlock
      language="typescript"
      code={`import { pipe, pipeSideEffect, SideEffect } from 'fp-pack';

const validateUserPipeline = pipeSideEffect(
  findUser,
  validateAge
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
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">pipeSideEffect</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/pipeSideEffect.ts"
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
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Pure left-to-right function composition without SideEffect short-circuiting.
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
          SideEffect pipelines with strict effect unions.
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
          Async pipelines with SideEffect short-circuiting.
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
