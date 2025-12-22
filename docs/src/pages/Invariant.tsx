import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Invariant = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      invariant
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Enforce invariants and contracts in your code
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is invariant?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        invariant
      </strong>{' '}
      validates that a condition is true, throwing an error if it's false. It's similar to{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">assert</code>, but commonly used
      specifically for enforcing invariants and contracts in your code.
      <br />
      <br />
      This is useful for <strong>contract enforcement</strong>, <strong>state validation</strong>,
      <strong>API boundaries</strong>, and <strong>critical assumptions</strong>.
      <br />
      <br />
      Think of it as "this invariant must always hold true, or the program is in an invalid state."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-kit';

function processUser(user: User | null) {
  invariant(user !== null, 'User must exist at this point');
  // Now we can safely use user
  return user.name;
}

processUser({ name: 'John' });  // 'John'
processUser(null);               // Error: User must exist at this point`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function invariant(
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
      Simple Invariants
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-kit';

// Basic invariant without message
invariant(true);   // No error
invariant(false);  // Error: Invariant failed

// Invariant with custom message
const value = getValue();
invariant(value !== null, 'Value should never be null here');`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      State Invariants
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-kit';

class Counter {
  private count: number = 0;

  increment(): void {
    this.count++;
    // Ensure count is always non-negative (invariant)
    invariant(this.count >= 0, 'Counter invariant violated');
  }

  decrement(): void {
    this.count--;
    // Ensure count is always non-negative (invariant)
    invariant(this.count >= 0, 'Counter invariant violated');
  }

  getCount(): number {
    return this.count;
  }
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Data Structure Invariants
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-kit';

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
    this.checkInvariant();
  }

  pop(): T {
    invariant(this.items.length > 0, 'Cannot pop from empty stack');
    const item = this.items.pop()!;
    this.checkInvariant();
    return item;
  }

  private checkInvariant(): void {
    // Stack should never have negative size
    invariant(this.items.length >= 0, 'Stack size invariant violated');
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.pop();  // 2
stack.pop();  // 1
stack.pop();  // Error: Cannot pop from empty stack`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Contract Enforcement
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-kit';

interface ApiConfig {
  apiKey: string;
  endpoint: string;
}

class ApiClient {
  private config: ApiConfig | null = null;

  configure(config: ApiConfig): void {
    invariant(config.apiKey.length > 0, 'API key cannot be empty');
    invariant(config.endpoint.startsWith('https://'), 'Endpoint must use HTTPS');
    this.config = config;
  }

  makeRequest(path: string): Promise<any> {
    // Contract: configure must be called before makeRequest
    invariant(this.config !== null, 'Client must be configured before making requests');

    return fetch(\`\${this.config.endpoint}\${path}\`, {
      headers: { 'Authorization': \`Bearer \${this.config.apiKey}\` }
    });
  }
}

const client = new ApiClient();
client.makeRequest('/users');  // Error: Client must be configured before making requests

client.configure({ apiKey: 'key123', endpoint: 'https://api.example.com' });
client.makeRequest('/users');  // OK`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Pipeline Contracts with pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant, pipe } from 'fp-kit';

const ensureNonEmpty = (s: string) => {
  invariant(s.length > 0, 'Input must not be empty');
  return s;
};

const normalizeUserId = pipe(
  (raw: string) => raw.trim(),
  ensureNonEmpty,
  (raw) => raw.toLowerCase()
);

normalizeUserId(' Alice '); // 'alice'
normalizeUserId('   ');     // Error: Input must not be empty`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      State Machine Invariants
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-kit';

type State = 'idle' | 'loading' | 'success' | 'error';

class StateMachine {
  private state: State = 'idle';
  private data: any = null;
  private error: Error | null = null;

  startLoading(): void {
    invariant(this.state === 'idle', 'Can only start loading from idle state');
    this.state = 'loading';
    this.checkInvariant();
  }

  setSuccess(data: any): void {
    invariant(this.state === 'loading', 'Can only succeed from loading state');
    this.state = 'success';
    this.data = data;
    this.error = null;
    this.checkInvariant();
  }

  setError(error: Error): void {
    invariant(this.state === 'loading', 'Can only error from loading state');
    this.state = 'error';
    this.error = error;
    this.data = null;
    this.checkInvariant();
  }

  private checkInvariant(): void {
    // Invariant: success state must have data
    if (this.state === 'success') {
      invariant(this.data !== null, 'Success state must have data');
      invariant(this.error === null, 'Success state must not have error');
    }

    // Invariant: error state must have error
    if (this.state === 'error') {
      invariant(this.error !== null, 'Error state must have error');
      invariant(this.data === null, 'Error state must not have data');
    }
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Operations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-kit';

function partition<T>(arr: T[], size: number): T[][] {
  invariant(size > 0, 'Partition size must be positive');
  invariant(Number.isInteger(size), 'Partition size must be an integer');

  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  // Invariant: result should not have more partitions than necessary
  const maxPartitions = Math.ceil(arr.length / size);
  invariant(result.length <= maxPartitions, 'Partition count invariant violated');

  return result;
}

partition([1, 2, 3, 4, 5], 2);   // [[1, 2], [3, 4], [5]]
partition([1, 2, 3], 0);          // Error: Partition size must be positive
partition([1, 2, 3], 1.5);        // Error: Partition size must be an integer`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Business Logic Invariants
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { invariant } from 'fp-kit';

interface Order {
  id: string;
  items: Array<{ price: number; quantity: number }>;
  discount: number;
  total: number;
}

function validateOrder(order: Order): void {
  invariant(order.items.length > 0, 'Order must have at least one item');
  invariant(order.discount >= 0, 'Discount cannot be negative');
  invariant(order.discount <= 1, 'Discount cannot exceed 100%');

  // Calculate expected total
  const subtotal = order.items.reduce((sum, item) => {
    invariant(item.price > 0, 'Item price must be positive');
    invariant(item.quantity > 0, 'Item quantity must be positive');
    return sum + item.price * item.quantity;
  }, 0);

  const expectedTotal = subtotal * (1 - order.discount);

  // Invariant: total must match calculation
  invariant(
    Math.abs(order.total - expectedTotal) < 0.01,
    \`Order total invariant violated: expected \${expectedTotal}, got \${order.total}\`
  );
}

validateOrder({
  id: 'order-1',
  items: [{ price: 10, quantity: 2 }],
  discount: 0.1,
  total: 18,
});  // OK

validateOrder({
  id: 'order-2',
  items: [{ price: 10, quantity: 2 }],
  discount: 0.1,
  total: 20,
});  // Error: Order total invariant violated`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use invariant?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Contract Enforcement
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Clearly express and enforce the contracts and assumptions your code relies on.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Early Detection
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Catch violations immediately when they occur, making bugs easier to track down.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Self-Documenting Code
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Invariants serve as executable documentation of your code's expectations and constraints.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Semantic Clarity
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Using "invariant" instead of "assert" makes it clear you're checking an invariant condition.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function invariant(condition: boolean, message?: string): void {
  if (!condition) {
    throw new Error(message ?? 'Invariant failed');
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
        <li>If no message is provided, uses the default "Invariant failed"</li>
        <li>If the condition is true, does nothing and returns void</li>
        <li>Identical implementation to assert, but semantically different use case</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        Try these related debugging and validation functions:
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
          - Similar function for general condition checking
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/control/guard');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            guard
          </a>{' '}
          - Return a default value when a condition fails (non-throwing alternative)
        </li>
        <li>
          <a
            onClick={(e: Event) => {
              e.preventDefault();
              navigateTo('/debug/log');
            }}
            class="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            log
          </a>{' '}
          - Log values and pass them through
        </li>
      </ul>
    </div>
  </div>
);
