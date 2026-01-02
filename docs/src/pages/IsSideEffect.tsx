import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IsSideEffect = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isSideEffect
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Type guard for runtime SideEffect checking with precise type narrowing
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is isSideEffect?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isSideEffect
      </strong>{' '}
      is a type guard function that checks whether a value is a SideEffect instance. It provides{' '}
      <strong>precise type narrowing</strong> in both branches, giving you exact type inference for success
      and error paths. This is the recommended way to handle SideEffect results when you need type-safe branching.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect } from 'fp-pack';

const processNumbers = pipeSideEffect(
  (nums: number[]) => nums.filter(n => n % 2 === 1),
  (odds) => odds.length > 0
    ? odds
    : SideEffect.of(() => 'No odd numbers found'),
  (odds) => odds.map(n => n * 2)
);

const result = processNumbers([1, 2, 3]);

// ✅ Type-safe branching with precise inference
if (!isSideEffect(result)) {
  // TypeScript knows: result is number[]
  const sum: number = result.reduce((a, b) => a + b, 0);
  console.log(\`Sum: \${sum}\`);
} else {
  // TypeScript knows: result is SideEffect<string>
  const error: string = result.effect();
  console.log(\`Error: \${error}\`);
}`}
    />

    <div class="bg-green-50 dark:bg-green-900/20 p-4 mb-6 rounded border border-green-200 dark:border-green-800 mt-6">
      <p class="text-sm md:text-base text-green-800 dark:text-green-200 leading-relaxed">
        <span class="font-medium">✅ Why use isSideEffect?</span>
        <br />
        <br />
        <strong>Precise type narrowing:</strong> Unlike <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">runPipeResult</code>,
        which returns a union type, <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">isSideEffect</code> narrows
        the type in both the success and error branches.
        <br />
        <br />
        <strong>Type safety:</strong> <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">runPipeResult</code> without
        type narrowing returns <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">any</code> type due to the default{' '}
        <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">R=any</code> parameter.
        <br />
        <br />
        Use <code class="bg-green-100 dark:bg-green-900/40 px-1 py-0.5 rounded">isSideEffect</code> when you need exact types
        in both success and error handling paths.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function isSideEffect(value: unknown): value is SideEffect<any>`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Type-Safe Error Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect } from 'fp-pack';

interface User {
  id: string;
  email: string;
}

const validateEmail = (email: string) =>
  email.includes('@')
    ? email
    : SideEffect.of(() => 'Invalid email format');

const findUserPipeline = pipeSideEffect(
  validateEmail,
  (email) => database.findByEmail(email),
  (user) => user ?? SideEffect.of(() => 'User not found')
);

const userOrError = findUserPipeline('test@example.com');

// ✅ Precise type inference in both branches
if (!isSideEffect(userOrError)) {
  // userOrError is User
  console.log(\`Found user: \${userOrError.email}\`);
  sendWelcomeEmail(userOrError);
} else {
  // userOrError is SideEffect<string>
  const errorMessage = userOrError.effect();
  console.error(\`Error: \${errorMessage}\`);
  showErrorToast(errorMessage);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Comparison with runPipeResult
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect, runPipeResult } from 'fp-pack';

const divide = (a: number, b: number) =>
  b !== 0
    ? a / b
    : SideEffect.of(() => 'Division by zero');

const calculatePipeline = pipeSideEffect(
  (x: number) => divide(10, x),
  (result) => result * 2
);

const result = calculatePipeline(0);

// ❌ WITHOUT isSideEffect - less precise types
const value1 = runPipeResult(result);
// value1: any (no type information!)

const value2 = runPipeResult<number, string>(result);
// value2: number | string (union type - safe but not narrowed)

// ✅ WITH isSideEffect - precise type narrowing
if (!isSideEffect(result)) {
  // result is number (exact type!)
  const doubled: number = result * 2;
  console.log(\`Result: \${doubled}\`);
} else {
  // result is SideEffect<string> (exact type!)
  const error: string = result.effect();
  console.error(\`Error: \${error}\`);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Optional Chain Pattern
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeSideEffect, SideEffect, isSideEffect } from 'fp-pack';

interface Config {
  api?: {
    endpoint?: string;
  };
}

const getEndpointPipeline = pipeSideEffect(
  (config: Config) => config.api ?? SideEffect.of(() => null),
  (api) => api.endpoint ?? SideEffect.of(() => null)
);

const endpoint = getEndpointPipeline(userConfig);

if (!isSideEffect(endpoint)) {
  // endpoint is string
  fetch(endpoint).then(/* ... */);
} else {
  // endpoint is SideEffect<null>
  console.warn('No endpoint configured, using default');
  fetch(DEFAULT_ENDPOINT).then(/* ... */);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Complex Error Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsyncSideEffect, SideEffect, isSideEffect } from 'fp-pack';

type ValidationError = {
  field: string;
  message: string;
};

const validateFormPipeline = pipeAsyncSideEffect(
  async (formData: FormData) => {
    const errors = await validateFields(formData);
    return errors.length === 0
      ? formData
      : SideEffect.of(() => errors, 'VALIDATION_ERROR');
  },
  async (data) => submitToAPI(data)
);

const result = await validateFormPipeline(userInput);

if (!isSideEffect(result)) {
  // result is APIResponse
  showSuccessMessage(\`Form submitted: \${result.id}\`);
  redirectToDashboard();
} else {
  // result is SideEffect<ValidationError[]>
  const errors: ValidationError[] = result.effect();

  errors.forEach(error => {
    showFieldError(error.field, error.message);
  });
}`}
    />

    <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded-r mt-6">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 Best Practice:</span>
        <br />
        <br />
        Always prefer <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">isSideEffect</code> over
        <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code> when you need to handle
        both success and error cases with precise types.
        <br />
        <br />
        Only use <code class="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">runPipeResult</code> when:
        <br />
        • You don't care about the SideEffect and just want to extract the value
        <br />
        • You're in a context where you know the result is always a success or always an error
        <br />
        • You're providing explicit type parameters
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">isSideEffect</code> on GitHub to see how it works internally.
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
        href="/composition/matchSideEffect"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/matchSideEffect');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          matchSideEffect →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Pattern match on value or SideEffect with unified return type.
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
