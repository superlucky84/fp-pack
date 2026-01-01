import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Flip = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      flip
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Reverse the argument order of a function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is flip?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        flip
      </strong>{' '}
      takes a function and returns a new function with reversed argument order.
      <br />
      <br />
      This is especially useful when you need to adjust argument order for composition,
      partial application, or when working with functions that expect arguments in a different order.
      <br />
      <br />
      flip works seamlessly with functions of 2, 3, or more arguments, and preserves the original function's behavior.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flip } from 'fp-pack';

// Original function
const divide = (a: number, b: number) => a / b;
divide(10, 2);  // 5

// Flipped version
const flippedDivide = flip(divide);
flippedDivide(2, 10);  // 5 (now divides 10 by 2)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Binary Functions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip } from 'fp-pack';

const subtract = (a: number, b: number) => a - b;
const flippedSubtract = flip(subtract);

subtract(10, 3);          // 7
flippedSubtract(3, 10);   // 7 (same as subtract(10, 3))`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Variadic Functions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip } from 'fp-pack';

const concat = (...parts: Array<string | number>) => parts.join('-');
const flippedConcat = flip(concat);

concat('a', 'b', 1, 2);         // "a-b-1-2"
flippedConcat('a', 'b', 1, 2);  // "2-1-b-a"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Adjusting for Composition
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip, curry, pipe } from 'fp-pack';

// Sometimes APIs have arguments in an inconvenient order
const appendTo = (suffix: string, text: string) => text + suffix;

// Flip makes it easier to compose
const addExclamation = flip(appendTo)('!');

const shout = pipe(
  (text: string) => text.toUpperCase(),
  addExclamation
);

shout('hello');  // "HELLO!"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Operations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip, curry } from 'fp-pack';

// Array.prototype.map expects (callback, thisArg)
// But we often want data last for composition
const map = curry(<T, U>(fn: (x: T) => U, arr: T[]) => arr.map(fn));

// With flip, we can make data-last versions
const mapOver = flip(map);

const double = (n: number) => n * 2;
const numbers = [1, 2, 3, 4];

// Now data comes first
mapOver(numbers, double);  // [2, 4, 6, 8]

// Perfect for partial application
const doubleAll = mapOver(numbers);
doubleAll(double);  // [2, 4, 6, 8]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      String Operations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { flip, curry } from 'fp-pack';

const replace = curry(
  (search: string, replacement: string, text: string) =>
    text.replace(search, replacement)
);

// Flip to make text the first argument
const replaceIn = flip(replace);

const text = "Hello World";
replaceIn(text, "World", "TypeScript");  // "Hello TypeScript"

// Or create specialized replacers
const sanitize = replaceIn(_, /[<>]/g, "");
sanitize("<script>alert('xss')</script>");  // "scriptalert('xss')/script"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      flip with curry
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      flip and curry work beautifully together. After flipping, you can curry to enable
      partial application in the new argument order:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { flip, curry, pipe } from 'fp-pack';

const divide = (a: number, b: number) => a / b;

// Flip then curry for "divisor-first" partial application
const divideBy = curry(flip(divide));

const half = divideBy(2);      // Divide by 2
const third = divideBy(3);     // Divide by 3

half(10);   // 5
third(12);  // 4

// Use in pipelines
const calculate = pipe(
  (n: number) => n + 5,
  divideBy(2),
  Math.floor
);

calculate(7);  // 6
// Flow: 7 → +5 → 12 → ÷2 → 6 → floor → 6`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use flip?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. Argument Order Flexibility
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Adapt functions to different composition styles without rewriting them.
          Data-last becomes data-first, or vice versa.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Better Composition
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Align argument order for smooth function pipelines and compositions.
          Makes functions fit together naturally.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. Partial Application
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Combined with curry, flip enables partial application from different directions.
          Choose which arguments to fix first.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. API Adaptation
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Adjust third-party APIs to match your preferred function signature style
          without wrapper functions.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">flip</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/flip.ts"
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
          Combine with curry for powerful composition.
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
          Pre-fill arguments after flipping order.
        </p>
      </a>

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
          Use flipped functions in pipelines.
        </p>
      </a>
    </div>
  </div>
);
