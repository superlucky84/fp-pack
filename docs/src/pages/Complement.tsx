import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Complement = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      complement
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create the logical negation of a predicate function
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is complement?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        complement
      </strong>{' '}
      takes a predicate function and returns a new function that returns the opposite boolean value.
      It's useful for creating negative conditions without writing repetitive negation logic.
      The returned function accepts the same arguments as the original predicate.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { complement } from 'fp-pack';

const isEven = (n: number) => n % 2 === 0;
const isOdd = complement(isEven);

isOdd(3); // true
isOdd(4); // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function complement<T extends any[]>(
  predicate: (...args: T) => boolean
): (...args: T) => boolean;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Create Negative Filters
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { complement, filter } from 'fp-pack';

const isNil = (value: unknown) => value == null;
const isNotNil = complement(isNil);

const data = [1, null, 'hello', undefined, 42];
const cleaned = filter(isNotNil, data);
// [1, 'hello', 42]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Negate Complex Predicates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { complement, filter } from 'fp-pack';

interface User {
  name: string;
  active: boolean;
  role: string;
}

const isAdmin = (user: User) => user.role === 'admin';
const isNotAdmin = complement(isAdmin);

const users: User[] = [
  { name: 'Alice', active: true, role: 'admin' },
  { name: 'Bob', active: true, role: 'user' },
  { name: 'Charlie', active: false, role: 'user' },
];

const regularUsers = filter(isNotAdmin, users);
// [{ name: 'Bob', ... }, { name: 'Charlie', ... }]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Multi-Argument Predicates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { complement } from 'fp-pack';

const inRange = (min: number, max: number, value: number) =>
  value >= min && value <= max;

const outOfRange = complement(inRange);

outOfRange(10, 20, 5);  // true (5 is not in [10, 20])
outOfRange(10, 20, 15); // false (15 is in [10, 20])
outOfRange(10, 20, 25); // true (25 is not in [10, 20])`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Composition with Pipes
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, complement, filter, map } from 'fp-pack';

const isEmpty = (str: string) => str.trim().length === 0;
const isNotEmpty = complement(isEmpty);

const processMessages = pipe(
  filter(isNotEmpty),           // Remove empty strings
  map((s: string) => s.trim()), // Clean whitespace
  map((s: string) => s.toUpperCase())
);

processMessages(['  ', 'hello', '', 'world', '   ']);
// ['HELLO', 'WORLD']`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">complement</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/complement.ts"
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
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Select elements matching a predicate - commonly used with complement.
        </p>
      </a>

      <a
        href="/control/when"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/when');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          when →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Apply function conditionally when predicate is true.
        </p>
      </a>

      <a
        href="/control/unless"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/unless');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          unless →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Apply function conditionally when predicate is false - alternative to complement.
        </p>
      </a>
    </div>
  </div>
);
