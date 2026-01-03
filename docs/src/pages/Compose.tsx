import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Compose = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      compose
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Compose functions from right to left (h ← g ← f)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is compose?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded">
        compose
      </strong>{' '}
      is a function that composes multiple functions from right to left.
      <br />
      <br />
      It follows the traditional mathematical notation: f(g(h(x))) becomes compose(f, g, h)(x).
      <br />
      <br />
      This is the classical functional programming approach where the last function in the list
      is applied first.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-pack';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const toString = (n: number) => String(n);

const transform = compose(
  toString,  // 3. Finally, convert to string
  addTen,    // 2. Then, add 10
  double     // 1. First, double the number
);

transform(5);  // "20"
// Flow: 5 ← double ← 10 ← addTen ← 20 ← toString ← "20"
// Same as: toString(addTen(double(5)))`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function compose<A, R>(ab: (a: A) => R): (a: A) => R;
function compose<A, B, R>(
  ab: (a: A) => B,
  bc: (b: B) => R
): (a: A) => R;
function compose<A, B, C, R>(
  ab: (a: A) => B,
  bc: (b: B) => C,
  cd: (c: C) => R
): (a: A) => R;

function compose(...funcs: Array<(input: any) => any>): (input: any) => any;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Mathematical Style
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      compose reads like mathematical function composition. The rightmost function is applied first:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-pack';

// Mathematical notation: f(g(h(x)))
const h = (x: number) => x + 1;
const g = (x: number) => x * 2;
const f = (x: number) => x - 3;

const fgh = compose(f, g, h);

fgh(5);  // 9
// Step by step:
// 1. h(5) = 6
// 2. g(6) = 12
// 3. f(12) = 9`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      String Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-pack';

const addExclamation = (s: string) => s + '!';
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const trim = (s: string) => s.trim();

const formatGreeting = compose(
  addExclamation,
  capitalize,
  trim
);

formatGreeting('  hello world  ');  // "Hello world!"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Data Extraction Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-pack';

interface User {
  profile: {
    name: string;
    age: number;
  };
  settings: {
    notifications: boolean;
  };
}

const getAge = (user: User) => user.profile.age;
const isAdult = (age: number) => age >= 18;
const toYesNo = (bool: boolean) => bool ? 'Yes' : 'No';

const checkAdultStatus = compose(
  toYesNo,
  isAdult,
  getAge
);

const user: User = {
  profile: { name: 'Alice', age: 25 },
  settings: { notifications: true }
};

checkAdultStatus(user);  // "Yes"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Number Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-pack';

const parseNum = (str: string) => parseInt(str, 10);
const isPositive = (n: number) => n > 0;
const isEven = (n: number) => n % 2 === 0;
const both = (a: boolean) => (b: boolean) => a && b;

const isValidEvenPositive = (str: string) => {
  const num = parseNum(str);
  return both(isPositive(num))(isEven(num));
};

isValidEvenPositive('42');   // true
isValidEvenPositive('41');   // false
isValidEvenPositive('-42');  // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Higher-Order Function Composition
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { compose } from 'fp-pack';

// Higher-order functions
const map = <T, U>(fn: (x: T) => U) => (arr: T[]) => arr.map(fn);
const filter = <T>(pred: (x: T) => boolean) => (arr: T[]) => arr.filter(pred);
const reduce = <T, R>(fn: (acc: R, x: T) => R, init: R) => (arr: T[]) => arr.reduce(fn, init);

const sumSquaresOfEvens = compose(
  reduce((sum: number, n: number) => sum + n, 0),
  map((n: number) => n * n),
  filter((n: number) => n % 2 === 0)
);

sumSquaresOfEvens([1, 2, 3, 4, 5, 6]);  // 56
// [1,2,3,4,5,6] → filter evens → [2,4,6] → square → [4,16,36] → sum → 56`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      compose vs pipe
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The only difference between compose and pipe is the direction of function application:
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-purple-900 dark:text-purple-100 mb-2">
          compose (right to left)
        </h4>
        <CodeBlock
          language="typescript"
          code={`compose(
  toString,  // 3rd
  addTen,    // 2nd
  double     // 1st
)(5)
// Reads like: f(g(h(x)))`}
        />
        <p class="text-sm text-purple-700 dark:text-purple-300 mt-2">
          Traditional mathematical notation
        </p>
      </div>
      <div class="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h4 class="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
          pipe (left to right)
        </h4>
        <CodeBlock
          language="typescript"
          code={`pipe(
  double,    // 1st
  addTen,    // 2nd
  toString   // 3rd
)(5)
// Reads like a recipe`}
        />
        <p class="text-sm text-blue-700 dark:text-blue-300 mt-2">
          More intuitive execution order
        </p>
      </div>
    </div>

    <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 mb-6 rounded-r">
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200 leading-relaxed">
        <span class="font-medium">💡 When to use compose:</span>
        <br />
        <br />
        Use <strong>compose</strong> when:
        <br />
        • You're familiar with mathematical function composition
        <br />
        • Working with code that follows mathematical conventions
        <br />
        • You prefer thinking "from the outside in"
        <br />
        <br />
        Most developers find <strong>pipe</strong> more readable for day-to-day use.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Under the hood, compose uses Array.reduceRight to apply functions from right to left:
    </p>

    <CodeBlock
      language="typescript"
      code={`function compose(...funcs: Array<(input: any) => any>) {
  return (value: any) => funcs.reduceRight((acc, fn) => fn(acc), value);
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The key difference from pipe is the use of <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">reduceRight</code> instead of <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">reduce</code>.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">compose</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/compose.ts"
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
          Left-to-right composition - more intuitive alternative.
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
          Transform functions for partial application.
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
    </div>
  </div>
);
