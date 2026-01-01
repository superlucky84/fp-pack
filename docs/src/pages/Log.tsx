import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Log = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      log
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Log values in pipelines without breaking the flow
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is log?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        log
      </strong>{' '}
      is a tap-based logging utility that logs a value to the console and returns it unchanged.
      It's designed to be used in function composition pipelines where you want to inspect intermediate values
      without interrupting the data flow.
      <br />
      <br />
      This is useful for <strong>debugging pipelines</strong>, <strong>monitoring data flow</strong>,
      <strong>development logging</strong>, and <strong>value inspection</strong>.
      <br />
      <br />
      Think of it as "show me this value, then pass it along unchanged."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe } from 'fp-pack';

const process = pipe(
  (x: number) => x * 2,
  log('after double'),  // Logs: "after double 10"
  (x) => x + 5,
  log('after add'),     // Logs: "after add 15"
  (x) => x / 3
);

process(5);  // Returns: 5, with logs in between`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function log<T>(label?: string): (value: T) => T;

// Takes an optional label string
// Returns a function that logs the value and returns it unchanged`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Logging
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log } from 'fp-pack';

// Log without label
const logValue = log<number>();
logValue(42);  // Logs: 42, Returns: 42

// Log with label
const logWithLabel = log<string>('username');
logWithLabel('john');  // Logs: "username john", Returns: "john"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      In Pipelines
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe } from 'fp-pack';

const processNumber = pipe(
  (x: number) => x + 10,
  log('after add'),
  (x) => x * 2,
  log('after multiply'),
  (x) => x - 5
);

processNumber(5);
// Logs: "after add 15"
// Logs: "after multiply 30"
// Returns: 25`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Debugging Data Transformations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe, map, filter } from 'fp-pack';

interface User {
  id: number;
  name: string;
  age: number;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', age: 25, active: true },
  { id: 2, name: 'Bob', age: 30, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
];

const processUsers = pipe(
  log<User[]>('initial users'),
  filter((user: User) => user.active),
  log('after filtering active'),
  map((user: User) => ({ ...user, age: user.age + 1 })),
  log('after incrementing age'),
  map((user: User) => user.name)
);

processUsers(users);
// Logs each step of the transformation
// Returns: ['Alice', 'Charlie']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Response Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe } from 'fp-pack';

interface ApiResponse {
  status: number;
  data: any;
}

const processApiResponse = pipe(
  log<ApiResponse>('raw response'),
  (response) => response.data,
  log('extracted data'),
  (data) => JSON.parse(data),
  log('parsed data'),
  (parsed) => parsed.items
);

const response = {
  status: 200,
  data: '{"items": [1, 2, 3]}'
};

processApiResponse(response);
// Logs each transformation step
// Returns: [1, 2, 3]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Form Validation Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe } from 'fp-pack';

interface FormData {
  email: string;
  password: string;
}

const validateForm = pipe(
  log<FormData>('form input'),
  (data) => ({ ...data, email: data.email.trim().toLowerCase() }),
  log('normalized email'),
  (data) => {
    if (!data.email.includes('@')) {
      throw new Error('Invalid email');
    }
    return data;
  },
  log('validated email'),
  (data) => {
    if (data.password.length < 8) {
      throw new Error('Password too short');
    }
    return data;
  },
  log('validated password')
);

validateForm({ email: '  JOHN@EXAMPLE.COM  ', password: 'secret123' });
// Logs each validation step
// Returns: { email: 'john@example.com', password: 'secret123' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Complex Data Aggregation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe, groupBy, map } from 'fp-pack';

interface Sale {
  product: string;
  amount: number;
  category: string;
}

const sales: Sale[] = [
  { product: 'Laptop', amount: 1000, category: 'Electronics' },
  { product: 'Mouse', amount: 20, category: 'Electronics' },
  { product: 'Desk', amount: 300, category: 'Furniture' },
  { product: 'Chair', amount: 150, category: 'Furniture' },
];

const getSalesByCategory = pipe(
  log<Sale[]>('raw sales'),
  groupBy((sale: Sale) => sale.category),
  log('grouped by category'),
  (grouped) => Object.entries(grouped).map(([category, items]) => ({
    category,
    total: items.reduce((sum, item) => sum + item.amount, 0),
    count: items.length,
  })),
  log('calculated totals')
);

getSalesByCategory(sales);
// Logs intermediate results
// Returns: [
//   { category: 'Electronics', total: 1020, count: 2 },
//   { category: 'Furniture', total: 450, count: 2 }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Conditional Logging
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { log, pipe, when } from 'fp-pack';

const isDevelopment = process.env.NODE_ENV === 'development';

// Only log in development
const devLog = <T>(label?: string) =>
  isDevelopment ? log<T>(label) : (value: T) => value;

const processData = pipe(
  (x: number) => x * 2,
  devLog('doubled'),  // Only logs in development
  (x) => x + 10,
  devLog('added'),    // Only logs in development
  (x) => x / 2
);

processData(5);  // Logs only if in development`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use log?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Non-Invasive Debugging
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Insert logging anywhere in your pipeline without breaking the flow or changing the logic.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Pipeline Visibility
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          See exactly what data looks like at each step of your transformation pipeline.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Easy to Add and Remove
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Simply add or remove log calls without restructuring your code or breaking composition.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Labeled Output
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Optional labels make it clear which step of the pipeline produced each log entry.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function log<T>(label?: string): (value: T) => T {
  return (value: T) => {
    if (label) {
      console.log(label, value);
    } else {
      console.log(value);
    }
    return value;
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes an optional label string</li>
        <li>Returns a function that accepts a value</li>
        <li>Logs the value to console (with label if provided)</li>
        <li>Returns the value unchanged</li>
        <li>Perfect for use in pipe and compose chains</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">log</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/debug/log.ts"
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
          Execute side effects in pipelines - log is built on this pattern.
        </p>
      </a>

      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Compose functions left-to-right - where log is most useful.
        </p>
      </a>

      <a
        href="/debug/assert"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/debug/assert');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          assert →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Validate conditions and fail fast - debugging with enforcement.
        </p>
      </a>

      <a
        href="/debug/invariant"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/debug/invariant');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          invariant →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Enforce invariants - another debugging and validation tool.
        </p>
      </a>
    </div>
  </div>
);
