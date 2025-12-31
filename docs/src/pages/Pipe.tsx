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
      transformations in order.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const transform = pipe(
  double,    // 1. First, double the number
  addTen,    // 2. Then, add 10
  toString   // 3. Finally, convert to string
);

transform(5);  // "20"
// Flow: 5 → double → 10 → addTen → 20 → toString → "20"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function pipe<A, R>(ab: (a: A) => R): (a: A) => R;
function pipe<A, B, R>(
  ab: (a: A) => B,
  bc: (b: B) => R
): (a: A) => R;
function pipe<A, B, C, R>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => R
): (a: A) => R;
// ... up to 5 functions

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
      code={`import { pipe } from 'fp-kit';

const processName = pipe(
  (name: string) => name.trim(),
  (name: string) => name.toLowerCase(),
  (name: string) => name.split(' '),
  (parts: string[]) => parts.join('-')
);

processName('  John Doe  ');  // "john-doe"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Working with Arrays
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

const numbers = [1, 2, 3, 4, 5];

const processNumbers = pipe(
  (nums: number[]) => nums.filter(n => n > 2),
  (nums: number[]) => nums.map(n => n * 2),
  (nums: number[]) => nums.reduce((sum, n) => sum + n, 0)
);

processNumbers(numbers);  // 24
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
      code={`import { pipe } from 'fp-kit';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const getActiveAdultNames = pipe(
  (users: User[]) => users.filter(u => u.active),
  (users: User[]) => users.filter(u => u.age >= 18),
  (users: User[]) => users.map(u => u.name),
  (names: string[]) => names.sort()
);

const users: User[] = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 17, active: true },
  { id: 3, name: 'Charlie', age: 30, active: false },
  { id: 4, name: 'Diana', age: 22, active: true },
];

getActiveAdultNames(users);  // ["Alice", "Diana"]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Price Calculation Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

const calculateFinalPrice = pipe(
  (price: number) => price * 0.9,        // 10% discount
  (price: number) => price * 1.1,        // Add 10% tax
  (price: number) => Math.round(price * 100) / 100,  // Round to 2 decimals
  (price: number) => \`$\${price.toFixed(2)}\`  // Format as currency
);

calculateFinalPrice(100);  // "$99.00"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      URL Slug Generation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

const createSlug = pipe(
  (title: string) => title.toLowerCase(),
  (str: string) => str.replace(/[^a-z0-9\\s-]/g, ''),
  (str: string) => str.trim(),
  (str: string) => str.replace(/\\s+/g, '-'),
  (str: string) => str.replace(/-+/g, '-')
);

createSlug('Hello World! This is a Test.');  // "hello-world-this-is-a-test"
createSlug('  Multiple   Spaces  ');         // "multiple-spaces"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Validation and Transformation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe } from 'fp-kit';

interface RawInput {
  email?: string;
  age?: string;
}

interface ValidatedUser {
  email: string;
  age: number;
}

const validateAndTransform = pipe(
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

validateAndTransform({ email: '  TEST@EXAMPLE.COM  ', age: '25' });
// { email: 'test@example.com', age: 25 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Combining with Other Utilities
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      pipe works great with other fp-kit utilities like curry for maximum composability:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, curry } from 'fp-kit';

// Create curried helper functions
const multiply = curry((a: number, b: number) => a * b);
const add = curry((a: number, b: number) => a + b);
const divide = curry((a: number, b: number) => a / b);

// Compose them in a pipeline
const calculate = pipe(
  multiply(2),      // Double it
  add(10),          // Add 10
  divide(4)         // Divide by 4
);

calculate(5);  // 5
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
  double,
  addTen,
  toString
)(5)
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
      <strong>pipeSideEffect</strong> instead.
    </p>

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
