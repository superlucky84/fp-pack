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
      code={`import { log, pipe } from 'fp-kit';

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
      code={`import { log } from 'fp-kit';

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
      code={`import { log, pipe } from 'fp-kit';

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
      code={`import { log, pipe, map, filter } from 'fp-kit';

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
      code={`import { log, pipe } from 'fp-kit';

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
      code={`import { log, pipe } from 'fp-kit';

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
      code={`import { log, pipe, groupBy, map } from 'fp-kit';

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
      code={`import { log, pipe, when } from 'fp-kit';

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
      Next Steps
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        Try these related debugging and utility functions:
      </p>
      <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/debug/assert');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            assert
          </a>{' '}
          - Validate conditions and fail fast
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/tap');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            tap
          </a>{' '}
          - Execute side effects in a pipeline (log is built on tap pattern)
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/composition/pipe');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            pipe
          </a>{' '}
          - Compose functions left-to-right (where log is most useful)
        </li>
      </ul>
    </div>
  </div>
);
