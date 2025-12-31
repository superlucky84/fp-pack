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
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const validateAge = (age: number) =>
  age >= 18
    ? age
    : SideEffect.of(() => {
        throw new Error('Must be 18 or older');
      });

const processAge = pipeSideEffect(
  validateAge,
  (age: number) => age * 2,
  (age: number) => \`Age: \${age}\`,
  runPipeResult
);

processAge(15); // Throws: Error: Must be 18 or older`}
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

// ... up to 5 functions
function pipeSideEffect(...funcs: Array<(input: any) => any>): (input: any) => any;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Each step can return a normal value or a SideEffect. If a SideEffect appears, the pipeline stops immediately
      and returns it.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Working with SideEffect
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Basic SideEffect Usage
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const validateAge = (age: number) => {
  if (age < 0) {
    // Return SideEffect to stop pipeline
    return SideEffect.of(() => {
      throw new Error('Age cannot be negative');
    });
  }
  return age;
};

const processAge = pipeSideEffect(
  validateAge,
  (age: number) => age * 2,  // This won't execute if SideEffect is returned
  (age: number) => \`Age: \${age}\`,
  runPipeResult  // Auto-execute SideEffect if present
);

// SideEffect is automatically executed
try {
  processAge(-5);  // Throws: Error: Age cannot be negative
} catch (error) {
  console.error(error.message);
}

// Normal execution continues
const result = processAge(10);
console.log(result);  // "Age: 20"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Conditional Early Exit
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

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

const deleteUser = pipeSideEffect(
  checkPermission,
  (user: User) => {
    console.log(\`Deleting user: \${user.name}\`);
    return { success: true, deletedId: user.id };
  },
  runPipeResult  // Auto-execute SideEffect if present
);

const adminUser = { id: 1, name: 'Alice', role: 'admin' as const };
const normalUser = { id: 2, name: 'Bob', role: 'user' as const };

// Admin can proceed
const result1 = deleteUser(adminUser);
// Logs: "Deleting user: Alice"
console.log(result1);  // { success: true, deletedId: 1 }

// Normal user gets error immediately
const result2 = deleteUser(normalUser);
console.log(result2);  // { error: 'Unauthorized', message: 'Admin access required' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Deferred Logging and Side Effects
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, runPipeResult } from 'fp-kit';

const divide = (a: number, b: number) => {
  if (b === 0) {
    return SideEffect.of(() => {
      console.error('Division by zero!');
      return NaN;
    }, 'division-by-zero');  // Optional label for debugging
  }
  return a / b;
};

const calculate = pipeSideEffect(
  (input: { a: number; b: number }) => divide(input.a, input.b),
  (result: number) => result * 100,
  (result: number) => Math.round(result),
  runPipeResult  // Auto-execute SideEffect if present
);

// Normal calculation
const result1 = calculate({ a: 10, b: 2 });
console.log(result1);  // 500

// Division by zero executes SideEffect and logs
const result2 = calculate({ a: 10, b: 0 });
// Logs: "Division by zero!"
console.log(result2);  // NaN`}
    />

    <div class="border-l-4 border-orange-500 bg-orange-50 dark:bg-orange-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200 leading-relaxed">
        <span class="font-medium">⚠️ Important:</span>
        <br />
        <br />
        SideEffect containers are <strong>never auto-executed</strong>. You must explicitly call{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">runPipeResult()</code> or{' '}
        <code class="bg-orange-100 dark:bg-orange-900/40 px-1 py-0.5 rounded">sideEffect.effect()</code> to run the deferred operation.
        <br />
        <br />
        This gives you complete control over when and where side effects are executed.
      </p>
    </div>

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
