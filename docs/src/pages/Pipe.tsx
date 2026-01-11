import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Pipe = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pipe
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Compose functions from left to right (f → g → h)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is pipe?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        pipe
      </strong>{' '}
      is a function that composes multiple functions from left to right.
      <br />
      <br />
      It takes the output of one function and passes it as the input to the next function,
      creating a readable data transformation pipeline.
      <br />
      <br />
      This is the most natural way to read transformations: start with data, then apply
      transformations in order. Prefer value-first <code class="text-xs">pipe(value, ...)</code> for immediate
      execution and stronger inference; use functions-first only when you need a reusable pipeline.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const result = pipe(
  5,
  double,    // 1. First, double the number
  addTen,    // 2. Then, add 10
  toString   // 3. Finally, convert to string
);

result;  // "20"
// Flow: 5 → double → 10 → addTen → 20 → toString → "20"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function pipe<A>(input: A): A;
function pipe<A, R>(input: A, ab: (a: A) => R): R;
function pipe<A, B, R>(
  input: A,
  ab: (a: A) => B,
  bc: (b: B) => R
): R;

function pipe<A, R>(ab: (a: A) => R): (a: A) => R;
function pipe<A, B, R>(
  ab: (a: A) => B,
  bc: (b: B) => R
): (a: A) => R;

function pipe(...funcs: Array<(input: any) => any>): (input: any) => any;`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The type signature ensures type safety across the pipeline. Each function's output type
      must match the next function's input type.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Data Transformation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

const result = pipe(
  '  John Doe  ',
  (name: string) => name.trim(),
  (name: string) => name.toLowerCase(),
  (name: string) => name.split(' '),
  (parts: string[]) => parts.join('-')
);

result;  // "john-doe"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Working with Arrays
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

const numbers = [1, 2, 3, 4, 5];

const result = pipe(
  numbers,
  (nums: number[]) => nums.filter(n => n > 2),
  (nums: number[]) => nums.map(n => n * 2),
  (nums: number[]) => nums.reduce((sum, n) => sum + n, 0)
);

result;  // 24
// Flow: [1,2,3,4,5] → filter → [3,4,5] → map → [6,8,10] → reduce → 24`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      User Data Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 17, active: true },
  { id: 3, name: 'Charlie', age: 30, active: false },
  { id: 4, name: 'Diana', age: 22, active: true },
];

const result = pipe(
  users,
  (users: User[]) => users.filter(u => u.active),
  (users: User[]) => users.filter(u => u.age >= 18),
  (users: User[]) => users.map(u => u.name),
  (names: string[]) => names.sort()
);

result;  // ["Alice", "Diana"]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Price Calculation Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

const result = pipe(
  100,
  (price: number) => price * 0.9,        // 10% discount
  (price: number) => price * 1.1,        // Add 10% tax
  (price: number) => Math.round(price * 100) / 100,  // Round to 2 decimals
  (price: number) => \`$\${price.toFixed(2)}\`  // Format as currency
);

result;  // "$99.00"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      URL Slug Generation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

const result = pipe(
  'Hello World! This is a Test.',
  (title: string) => title.toLowerCase(),
  (str: string) => str.replace(/[^a-z0-9\\s-]/g, ''),
  (str: string) => str.trim(),
  (str: string) => str.replace(/\\s+/g, '-'),
  (str: string) => str.replace(/-+/g, '-')
);

const result2 = pipe(
  '  Multiple   Spaces  ',
  (title: string) => title.toLowerCase(),
  (str: string) => str.replace(/[^a-z0-9\\s-]/g, ''),
  (str: string) => str.trim(),
  (str: string) => str.replace(/\\s+/g, '-'),
  (str: string) => str.replace(/-+/g, '-')
);

result;  // "hello-world-this-is-a-test"
result2; // "multiple-spaces"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Validation and Transformation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-pack';

interface RawInput {
  email?: string;
  age?: string;
}

interface ValidatedUser {
  email: string;
  age: number;
}

const result = pipe(
  { email: '  TEST@EXAMPLE.COM  ', age: '25' },
  (input: RawInput) => {
    if (!input.email || !input.age) {
      throw new Error('Missing required fields');
    }
    return input as Required<RawInput>;
  },
  (input: Required<RawInput>) => ({
    email: input.email.toLowerCase().trim(),
    age: parseInt(input.age, 10),
  }),
  (user: ValidatedUser) => {
    if (user.age < 0 || user.age > 150) {
      throw new Error('Invalid age');
    }
    return user;
  }
);

result;
// { email: 'test@example.com', age: 25 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Combining with Other Utilities
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      pipe works great with other fp-pack utilities like curry for maximum composability:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, curry } from 'fp-pack';

// Create curried helper functions
const multiply = curry((a: number, b: number) => a * b);
const add = curry((a: number, b: number) => a + b);
const divide = curry((a: number, b: number) => a / b);

// Compose them in a pipeline
const result = pipe(
  5,
  multiply(2),      // Double it
  add(10),          // Add 10
  divide(4)         // Divide by 4
);

result;  // 5
// Flow: 5 → *2 → 10 → +10 → 20 → /4 → 5`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      pipe vs compose
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Both pipe and compose create function compositions, but they flow in opposite directions:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipe (left to right)
        </h4>
        <CodeBlock
          language="typescript"
          code={`pipe(
  5,
  double,
  addTen,
  toString
);
// 5 → 10 → 20 → "20"`}
        />
      </div>
      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-purple-900 dark:text-purple-100 mb-2">
          compose (right to left)
        </h4>
        <CodeBlock
          language="typescript"
          code={`compose(
  toString,
  addTen,
  double
)(5)
// 5 → 10 → 20 → "20"`}
        />
      </div>
    </div>

    <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 When to use pipe:</span>
        <br />
        <br />
        Use <strong>pipe</strong> when you want to read transformations in the order they execute.
        This is more intuitive for most developers and reads like a step-by-step recipe.
        <br />
        <br />
        Use <strong>compose</strong> when you prefer the mathematical notation or when
        working with code that follows that convention.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Under the hood, pipe uses Array.reduce to apply functions from left to right:
    </p>

    <CodeBlock
      language="typescript"
      code={`function pipe(...funcs: Array<(input: any) => any>) {
  return (init: any) => funcs.reduce((acc, item) => item(acc), init);
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      SideEffect Pipelines
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>pipe</strong> is a pure composition tool. If you need pipelines that can
      short-circuit on <strong class="font-semibold">SideEffect</strong>, use{' '}
      <strong>pipeSideEffect</strong> instead. For strict union typing, use{' '}
      <a
        href="/composition/pipeSideEffectStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeSideEffectStrict');
        }}
        class="font-semibold text-blue-700 dark:text-blue-300"
      >
        pipeSideEffectStrict
      </a>
      .
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">pipe</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/pipe.ts"
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
        href="/composition/pipeStrict"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeStrict');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-emerald-600 dark:text-emerald-400 mb-2">
          pipeStrict →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Stricter type checks for pure pipelines.
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
        href="/composition/compose"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/compose');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          compose →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Compose functions from right to left - alternative to pipe.
        </p>
      </a>

      <a
        href="/composition/curry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/curry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-pink-600 dark:text-pink-400 mb-2">
          curry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Transform functions for partial application in pipes.
        </p>
      </a>

      <a
        href="/composition/partial"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/partial');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          partial →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Pre-fill function arguments for flexible composition.
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
