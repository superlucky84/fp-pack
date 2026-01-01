import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Once = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      once
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create a function that only executes once
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is once?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        once
      </strong>{' '}
      wraps a function so it can only be called once. After the first invocation, all
      subsequent calls return the cached result from that first execution.
      <br />
      <br />
      This is useful for <strong>initialization functions</strong>, <strong>expensive
      operations</strong>, and ensuring <strong>side effects only happen once</strong>.
      <br />
      <br />
      The first return value is memoized, even if it's <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">undefined</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const initialize = once(() => {
  console.log('Initializing...');
  return { initialized: true };
});

initialize();  // Logs "Initializing..." and returns { initialized: true }
initialize();  // Returns { initialized: true } (no log)
initialize();  // Returns { initialized: true } (no log)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function once<T extends (...args: any[]) => any>(fn: T): T;

// Returns a function with the same signature as the input
// but only executes once`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      once preserves the original function's type signature and this context.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Example
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const greet = once((name: string) => {
  console.log(\`Hello, \${name}!\`);
  return \`Greeted \${name}\`;
});

greet('Alice');  // Logs "Hello, Alice!" and returns "Greeted Alice"
greet('Bob');    // Returns "Greeted Alice" (no log, Bob is ignored)
greet('Carol');  // Returns "Greeted Alice" (no log, Carol is ignored)`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      Notice that subsequent calls ignore their arguments - they always return the
      result from the first call.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Expensive Computation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const calculatePi = once(() => {
  console.log('Calculating pi...');
  // Expensive calculation
  let pi = 0;
  for (let i = 0; i < 1000000; i++) {
    pi += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  return pi * 4;
});

const pi1 = calculatePi();  // Logs "Calculating pi..." and computes
const pi2 = calculatePi();  // Returns cached result instantly
const pi3 = calculatePi();  // Returns cached result instantly

console.log(pi1 === pi2);   // true
console.log(pi2 === pi3);   // true`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Singleton Pattern
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

class DatabaseConnection {
  constructor() {
    console.log('Connecting to database...');
  }

  query(sql: string) {
    return \`Result of: \${sql}\`;
  }
}

const getConnection = once(() => new DatabaseConnection());

// Use throughout your application
const conn1 = getConnection();  // Logs "Connecting to database..."
const conn2 = getConnection();  // Returns same instance
const conn3 = getConnection();  // Returns same instance

console.log(conn1 === conn2);   // true
console.log(conn2 === conn3);   // true`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Configuration Loading
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

interface Config {
  apiUrl: string;
  apiKey: string;
  timeout: number;
}

const loadConfig = once((): Config => {
  console.log('Loading configuration...');

  // Expensive: reading from file, parsing, validating
  const config = {
    apiUrl: process.env.API_URL || 'https://api.example.com',
    apiKey: process.env.API_KEY || '',
    timeout: Number(process.env.TIMEOUT) || 5000,
  };

  // Validation
  if (!config.apiKey) {
    throw new Error('API_KEY is required');
  }

  return config;
});

// Use throughout your application
export const getConfig = loadConfig;

// First call loads and validates
const config1 = getConfig();

// Subsequent calls return cached config
const config2 = getConfig();
const config3 = getConfig();`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Event Handler Registration
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const setupGlobalHandlers = once(() => {
  console.log('Setting up global event handlers...');

  window.addEventListener('resize', () => {
    console.log('Window resized');
  });

  window.addEventListener('beforeunload', (e) => {
    e.preventDefault();
    e.returnValue = '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      console.log('Escape pressed');
    }
  });

  return true;
});

// Call this in multiple places safely
setupGlobalHandlers();  // Sets up handlers
setupGlobalHandlers();  // Does nothing
setupGlobalHandlers();  // Does nothing`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Lazy Initialization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

class ExpensiveService {
  private data: string[];

  constructor() {
    console.log('Loading expensive data...');
    // Simulate expensive initialization
    this.data = Array.from({ length: 10000 }, (_, i) => \`Item \${i}\`);
  }

  search(query: string) {
    return this.data.filter(item => item.includes(query));
  }
}

// Lazy singleton - only created when first accessed
const getService = once(() => new ExpensiveService());

// No initialization happens yet
console.log('Application started');

// Service is created on first use
const results1 = getService().search('100');  // Logs "Loading expensive data..."

// Service is reused
const results2 = getService().search('200');  // No log`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Edge Cases
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Returning undefined
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const getNothing = once(() => {
  console.log('Called');
  return undefined;
});

getNothing();  // Logs "Called", returns undefined
getNothing();  // Returns undefined (no log)
getNothing();  // Returns undefined (no log)

// undefined is still cached!`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Different Arguments
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { once } from 'fp-pack';

const add = once((a: number, b: number) => {
  console.log(\`Adding \${a} + \${b}\`);
  return a + b;
});

add(2, 3);   // Logs "Adding 2 + 3", returns 5
add(10, 20); // Returns 5 (arguments ignored!)
add(5, 7);   // Returns 5 (arguments ignored!)

// Once only executes with the first arguments
// All subsequent calls return the same cached result`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      <strong>Important:</strong> If you need different results for different arguments,
      use <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">memoize</code> instead!
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      once vs memoize
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          once - Single Execution
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200 mb-2">
          Executes only on the first call. All subsequent calls return the same cached
          result, regardless of arguments.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fn = once((x: number) => x * 2);
fn(2);  // 4
fn(3);  // 4 (not 6!)
fn(5);  // 4 (not 10!)`}
        />
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          memoize - Argument-Based Caching
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200 mb-2">
          Caches results per unique argument combination. Different arguments produce
          different cached results.
        </p>
        <CodeBlock
          language="typescript"
          code={`const fn = memoize((x: number) => x * 2);
fn(2);  // 4 (computed)
fn(3);  // 6 (computed)
fn(2);  // 4 (cached)`}
        />
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          When to use which?
        </h4>
        <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li><strong>Use once</strong>: Initialization, singletons, one-time setup, ensuring side effects happen once</li>
          <li><strong>Use memoize</strong>: Pure functions, expensive computations with varying inputs, caching API responses</li>
        </ul>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      once uses a closure to track whether the function has been called and stores
      the result:
    </p>

    <CodeBlock
      language="typescript"
      code={`function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let value: any;

  const wrapped = function (this: any, ...args: any[]) {
    if (!called) {
      called = true;
      value = fn.apply(this, args);
    }
    return value;
  };

  return wrapped as T;
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">called</code> flag
      ensures the function only executes once, and <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">value</code> stores
      the cached result. The use of <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">fn.apply(this, args)</code> preserves
      the this context.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">once</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/once.ts"
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
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/memoize"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/memoize');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          memoize →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Learn about memoize for caching results based on different arguments.
        </p>
      </a>

      <a
        href="/composition/tap"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/tap');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          tap →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Execute side effects in pipelines while passing values through.
        </p>
      </a>
    </div>
  </div>
);
