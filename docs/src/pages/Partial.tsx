import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Partial = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      partial
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Pre-fill function arguments to create specialized versions
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is partial?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        partial
      </strong>{' '}
      creates a new function by fixing some leading arguments of an existing function.
      <br />
      <br />
      Unlike <strong>curry</strong> which enables sequential argument application, partial
      lets you <strong>preset specific arguments</strong> all at once, creating a specialized
      function that only needs the remaining parameters.
      <br />
      <br />
      This is perfect for configuration, dependency injection, and creating specialized
      utility functions.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

// Original function
const greet = (greeting: string, name: string, punctuation: string) =>
  \`\${greeting}, \${name}\${punctuation}\`;

greet('Hello', 'Alice', '!');  // "Hello, Alice!"

// Preset the greeting
const sayHello = partial(greet, 'Hello');
sayHello('Bob', '!');      // "Hello, Bob!"

// Preset greeting and name
const sayHelloAlice = partial(greet, 'Hello', 'Alice');
sayHelloAlice('!');        // "Hello, Alice!"
sayHelloAlice('.');        // "Hello, Alice."`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function partial<Args extends any[], Rest extends any[], R>(
  fn: (...args: [...Args, ...Rest]) => R,
  ...preset: Args
): (...rest: Rest) => R;

// Args: The arguments you want to preset
// Rest: The remaining arguments the new function will accept
// R: The return type`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      partial provides full TypeScript support with type inference for preset and remaining
      arguments.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Examples
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

// Math operations
const add3 = (a: number, b: number, c: number) => a + b + c;
const add5and10 = partial(add3, 5, 10);

add5and10(3);   // 18 (5 + 10 + 3)
add5and10(7);   // 22 (5 + 10 + 7)

// String formatting
const format = (template: string, value1: string, value2: string) =>
  template.replace('{0}', value1).replace('{1}', value2);

const userFormat = partial(format, 'User: {0}, Role: {1}');
userFormat('Alice', 'Admin');    // "User: Alice, Role: Admin"
userFormat('Bob', 'Editor');     // "User: Bob, Role: Editor"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Operations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

const slice = <T>(arr: T[], start: number, end: number) =>
  arr.slice(start, end);

// Create specialized slicers
const takeFirst3 = partial(slice, [], 0, 3);
const skipFirst2 = partial(slice, [], 2);

const numbers = [1, 2, 3, 4, 5];

// Wait, this won't work as expected!
// partial fixes leading arguments, not arbitrary positions

// Better approach:
const sliceFrom = (start: number, end: number, arr: any[]) =>
  arr.slice(start, end);

const takeFirst3Better = partial(sliceFrom, 0, 3);
const skipFirst2Better = partial(sliceFrom, 2, 999);

takeFirst3Better(numbers);    // [1, 2, 3]
skipFirst2Better(numbers);    // [3, 4, 5]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      API Client Configuration
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

// Generic fetch function
const apiFetch = async (
  baseUrl: string,
  headers: Record<string, string>,
  endpoint: string,
  options?: RequestInit
) => {
  return fetch(\`\${baseUrl}\${endpoint}\`, {
    ...options,
    headers: { ...headers, ...options?.headers },
  });
};

// Configure for production API
const apiHeaders = {
  'Authorization': 'Bearer token123',
  'Content-Type': 'application/json',
};

const productionApi = partial(
  apiFetch,
  'https://api.example.com',
  apiHeaders
);

// Now use it with just the endpoint
productionApi('/users');
productionApi('/posts', { method: 'POST', body: '...' });`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Event Handlers
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

// Generic handler
const handleAction = (
  type: string,
  logger: (msg: string) => void,
  event: Event
) => {
  logger(\`\${type} action triggered\`);
  // Handle the event...
};

const consoleLogger = (msg: string) => console.log(msg);

// Create specialized handlers
const handleClick = partial(handleAction, 'click', consoleLogger);
const handleSubmit = partial(handleAction, 'submit', consoleLogger);

// Use in event listeners
button.addEventListener('click', handleClick);
form.addEventListener('submit', handleSubmit);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Validation Functions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { partial } from 'fp-pack';

const validate = (
  ruleName: string,
  errorMessage: string,
  predicate: (value: any) => boolean,
  value: any
) => {
  if (!predicate(value)) {
    throw new Error(\`[\${ruleName}] \${errorMessage}\`);
  }
  return value;
};

// Create validators
const validateRequired = partial(
  validate,
  'required',
  'This field is required',
  (v: any) => v != null && v !== ''
);

const validateEmail = partial(
  validate,
  'email',
  'Invalid email format',
  (v: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v)
);

const validateMinLength = (min: number) => partial(
  validate,
  'minLength',
  \`Must be at least \${min} characters\`,
  (v: string) => v.length >= min
);

// Use validators
validateRequired('hello');           // "hello"
validateRequired('');                // Error!
validateEmail('test@example.com');   // "test@example.com"
validateEmail('invalid');            // Error!

const validate8Chars = validateMinLength(8);
validate8Chars('password');          // "password"
validate8Chars('short');             // Error!`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Combining partial with pipe
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      partial works great with pipe for creating data processing pipelines:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pipe, partial } from 'fp-pack';

// Data transformation functions (note: data comes last!)
const filterBy = <T>(predicate: (item: T) => boolean, arr: T[]) =>
  arr.filter(predicate);

const mapTo = <T, U>(fn: (item: T) => U, arr: T[]) =>
  arr.map(fn);

const sortBy = <T>(fn: (item: T) => any, arr: T[]) =>
  [...arr].sort((a, b) => {
    const aVal = fn(a);
    const bVal = fn(b);
    return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
  });

interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

// Create pipeline with partial
const processProducts = pipe(
  partial(filterBy, (p: Product) => p.inStock),
  partial(sortBy, (p: Product) => p.price),
  partial(mapTo, (p: Product) => p.name)
);

const products: Product[] = [
  { name: 'Laptop', price: 1000, inStock: true },
  { name: 'Mouse', price: 25, inStock: false },
  { name: 'Keyboard', price: 75, inStock: true },
  { name: 'Monitor', price: 300, inStock: true },
];

processProducts(products);
// ["Keyboard", "Monitor", "Laptop"]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      partial vs curry
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          partial - Preset Arguments
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200 mb-2">
          Fix multiple leading arguments at once. Returns a regular function that takes
          the remaining arguments.
        </p>
        <CodeBlock
          language="typescript"
          code={`const add3 = (a: number, b: number, c: number) => a + b + c;
const add10and20 = partial(add3, 10, 20);
add10and20(5);  // 35 (10 + 20 + 5)`}
        />
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          curry - Sequential Application
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200 mb-2">
          Apply arguments one at a time or all at once. Each partial application returns
          another curried function.
        </p>
        <CodeBlock
          language="typescript"
          code={`const add3 = curry((a: number, b: number, c: number) => a + b + c);
add3(10)(20)(5);     // 35
add3(10, 20)(5);     // 35
add3(10)(20, 5);     // 35`}
        />
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          When to use which?
        </h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li><strong>Use partial</strong>: Configuration, dependency injection, fixing multiple args</li>
          <li><strong>Use curry</strong>: Flexible composition, point-free style, functional pipelines</li>
        </ul>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      partial preserves the <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">this</code> context
      and combines preset arguments with runtime arguments:
    </p>

    <CodeBlock
      language="typescript"
      code={`function partial<Args extends any[], Rest extends any[], R>(
  fn: (...args: [...Args, ...Rest]) => R,
  ...preset: Args
): (...rest: Rest) => R {
  return function partiallyApplied(this: unknown, ...rest: Rest) {
    const all = [...preset, ...rest] as [...Args, ...Rest];
    return fn.apply(this as any, all);
  };
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The use of <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">fn.apply(this, ...)</code> ensures
      that method calls preserve their context.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">partial</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/partial.ts"
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
          Alternative approach for sequential argument application.
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
          Combine partially applied functions in pipelines.
        </p>
      </a>

      <a
        href="/composition/flip"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/flip');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          flip →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Reverse argument order for better composition.
        </p>
      </a>
    </div>
  </div>
);
