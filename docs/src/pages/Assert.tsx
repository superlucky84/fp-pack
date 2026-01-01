import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Assert = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      assert
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Validate conditions and throw errors when they fail
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is assert?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        assert
      </strong>{' '}
      validates that a condition is true. If the condition is false, it throws an error with a custom message.
      If the condition is true, it does nothing and execution continues normally.
      <br />
      <br />
      This is useful for <strong>precondition checking</strong>, <strong>invariant validation</strong>,
      <strong>contract enforcement</strong>, and <strong>defensive programming</strong>.
      <br />
      <br />
      Think of it as "this condition must be true, or stop execution immediately."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

function divide(a: number, b: number): number {
  assert(b !== 0, 'Division by zero');
  return a / b;
}

divide(10, 2);  // 5
divide(10, 0);  // Error: Division by zero`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function assert(
  condition: boolean,
  message?: string
): void;

// Takes a boolean condition and optional error message
// Throws an error if the condition is false
// Returns nothing (void) if the condition is true`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Assertions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

// Basic assertion without message
assert(true);   // No error, execution continues
assert(false);  // Error: Assertion failed

// Assertion with custom message
assert(5 > 3, 'Five should be greater than three');  // No error
assert(5 < 3, 'Five should be greater than three');  // Error: Five should be greater than three`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Function Preconditions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

function withdraw(amount: number, balance: number): number {
  assert(amount > 0, 'Amount must be positive');
  assert(amount <= balance, 'Insufficient funds');
  return balance - amount;
}

withdraw(50, 100);   // 50
withdraw(-10, 100);  // Error: Amount must be positive
withdraw(150, 100);  // Error: Insufficient funds`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Input Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(data: Partial<User>): User {
  assert(data.name !== undefined, 'Name is required');
  assert(data.email !== undefined, 'Email is required');
  assert(data.name.length > 0, 'Name cannot be empty');
  assert(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email), 'Invalid email format');

  return {
    id: Date.now(),
    name: data.name,
    email: data.email,
  };
}

createUser({ name: 'John', email: 'john@example.com' });
// { id: 1234567890, name: 'John', email: 'john@example.com' }

createUser({ name: '' });
// Error: Name cannot be empty

createUser({ name: 'John', email: 'invalid' });
// Error: Invalid email format`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Operations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

function getFirst<T>(arr: T[]): T {
  assert(arr.length > 0, 'Array cannot be empty');
  return arr[0];
}

function getAt<T>(arr: T[], index: number): T {
  assert(index >= 0, 'Index must be non-negative');
  assert(index < arr.length, 'Index out of bounds');
  return arr[index];
}

getFirst([1, 2, 3]);     // 1
getFirst([]);            // Error: Array cannot be empty

getAt(['a', 'b', 'c'], 1);   // 'b'
getAt(['a', 'b', 'c'], -1);  // Error: Index must be non-negative
getAt(['a', 'b', 'c'], 10);  // Error: Index out of bounds`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      State Invariants
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

class BankAccount {
  private balance: number = 0;

  deposit(amount: number): void {
    assert(amount > 0, 'Deposit amount must be positive');
    this.balance += amount;
    this.checkInvariant();
  }

  withdraw(amount: number): void {
    assert(amount > 0, 'Withdrawal amount must be positive');
    assert(amount <= this.balance, 'Insufficient funds');
    this.balance -= amount;
    this.checkInvariant();
  }

  private checkInvariant(): void {
    // Ensure balance is never negative (invariant)
    assert(this.balance >= 0, 'Balance invariant violated: balance is negative');
  }

  getBalance(): number {
    return this.balance;
  }
}

const account = new BankAccount();
account.deposit(100);
account.withdraw(50);
console.log(account.getBalance());  // 50`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pipeline Validation with pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert, pipe } from 'fp-pack';

const ensurePositive = (n: number) => {
  assert(n > 0, 'Value must be positive');
  return n;
};

const parsePositive = pipe(
  (raw: string) => raw.trim(),
  (raw) => Number(raw),
  ensurePositive
);

parsePositive(' 42 '); // 42
parsePositive(' -3 '); // Error: Value must be positive`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Type Guards
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

function assertIsString(value: unknown): asserts value is string {
  assert(typeof value === 'string', 'Value must be a string');
}

function assertIsNumber(value: unknown): asserts value is number {
  assert(typeof value === 'number', 'Value must be a number');
}

function processValue(value: unknown): string {
  assertIsString(value);
  // TypeScript now knows value is a string
  return value.toUpperCase();
}

processValue('hello');  // 'HELLO'
processValue(123);      // Error: Value must be a string`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Response Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

interface ApiResponse {
  success: boolean;
  data?: any;
  error?: string;
}

function handleApiResponse(response: ApiResponse): any {
  assert(response.success, \`API Error: \${response.error ?? 'Unknown error'}\`);
  assert(response.data !== undefined, 'Response data is missing');
  return response.data;
}

handleApiResponse({ success: true, data: { id: 1, name: 'John' } });
// { id: 1, name: 'John' }

handleApiResponse({ success: false, error: 'Not found' });
// Error: API Error: Not found

handleApiResponse({ success: true });
// Error: Response data is missing`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Configuration Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assert } from 'fp-pack';

interface Config {
  apiUrl: string;
  timeout: number;
  maxRetries: number;
}

function validateConfig(config: Partial<Config>): Config {
  assert(config.apiUrl !== undefined, 'API URL is required');
  assert(config.apiUrl.startsWith('http'), 'API URL must start with http');
  assert(config.timeout !== undefined, 'Timeout is required');
  assert(config.timeout > 0, 'Timeout must be positive');
  assert(config.maxRetries !== undefined, 'Max retries is required');
  assert(config.maxRetries >= 0, 'Max retries cannot be negative');
  assert(config.maxRetries <= 10, 'Max retries cannot exceed 10');

  return config as Config;
}

validateConfig({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  maxRetries: 3,
});
// Valid config

validateConfig({
  apiUrl: 'ftp://api.example.com',
  timeout: 5000,
  maxRetries: 3,
});
// Error: API URL must start with http`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use assert?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Fail Fast
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Catch invalid states and inputs immediately, preventing bugs from propagating through your codebase.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Self-Documenting
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Assertions serve as executable documentation, clearly stating the preconditions and invariants your code expects.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Better Error Messages
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Custom error messages make debugging easier by explaining exactly what went wrong and why.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. TypeScript Integration
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Works well with TypeScript's assertion signatures, enabling type narrowing and better type safety.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function assert(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message ?? 'Assertion failed');
  }
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a boolean condition and an optional error message</li>
        <li>If the condition is false, throws an Error with the provided message</li>
        <li>If no message is provided, uses the default "Assertion failed"</li>
        <li>If the condition is true, does nothing and returns void</li>
        <li>Execution stops immediately when an assertion fails</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">assert</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/debug/assert.ts"
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
        href="/debug/invariant"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/debug/invariant');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          invariant →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Enforce invariants and contracts - semantically focused assertion.
        </p>
      </a>

      <a
        href="/control/guard"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/guard');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          guard →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Return default value on failure - non-throwing validation alternative.
        </p>
      </a>

      <a
        href="/control/tryCatch"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/tryCatch');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          tryCatch →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Handle exceptions safely - functional error handling pattern.
        </p>
      </a>

      <a
        href="/debug/log"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/debug/log');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          log →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Log values in pipelines - inspect data without breaking flow.
        </p>
      </a>
    </div>
  </div>
);
