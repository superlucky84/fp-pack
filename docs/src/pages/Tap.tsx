import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Tap = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      tap
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Execute side effects without changing the value
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is tap?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        tap
      </strong>{' '}
      allows you to perform side effects (like logging, debugging, or validation) in the
      middle of a pipeline while passing the value through unchanged.
      <br />
      <br />
      It takes a function that receives a value and performs some action, then returns
      the original value unmodified. This is perfect for <strong>debugging pipelines</strong>,
      <strong>logging intermediate values</strong>, and <strong>performing validations</strong>.
      <br />
      <br />
      The name "tap" comes from the idea of "tapping into" a pipeline to observe or act
      on the flowing data without interrupting it.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { tap, pipe } from 'fp-pack';

const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;

const calculate = pipe(
  double,
  tap(x => console.log('After double:', x)),  // Log but don't change
  addTen,
  tap(x => console.log('After addTen:', x))   // Log but don't change
);

calculate(5);
// Logs: "After double: 10"
// Logs: "After addTen: 20"
// Returns: 20`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function tap<T>(fn: (value: T) => void): (value: T) => T;

// Takes a function that receives a value and returns void
// Returns a function that passes the value through unchanged`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The side effect function receives the value but its return value is ignored.
      tap always returns the original input value.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Logging
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tap } from 'fp-pack';

const logValue = tap((x: number) => {
  console.log('Current value:', x);
});

const result = logValue(42);
// Logs: "Current value: 42"
// Returns: 42

console.log(result);  // 42`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      In a Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

const processNumber = pipe(
  (n: number) => n * 2,
  tap(x => console.log('Doubled:', x)),
  (n: number) => n + 5,
  tap(x => console.log('Added 5:', x)),
  (n: number) => n.toString()
);

const result = processNumber(10);
// Logs: "Doubled: 20"
// Logs: "Added 5: 25"
// Returns: "25"`}
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
      code={`import { pipe, tap } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', active: true },
  { id: 2, name: 'Bob', email: 'bob@example.com', active: false },
  { id: 3, name: 'Carol', email: 'carol@example.com', active: true },
];

const processUsers = pipe(
  tap((users: User[]) => console.log('Input users:', users.length)),
  (users: User[]) => users.filter(u => u.active),
  tap((users: User[]) => console.log('Active users:', users.length)),
  (users: User[]) => users.map(u => u.email),
  tap((emails: string[]) => console.log('Emails:', emails))
);

const result = processUsers(users);
// Logs: "Input users: 3"
// Logs: "Active users: 2"
// Logs: "Emails: ['alice@example.com', 'carol@example.com']"
// Returns: ['alice@example.com', 'carol@example.com']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Validation in Pipeline
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

const validatePositive = tap((n: number) => {
  if (n <= 0) {
    throw new Error(\`Expected positive number, got \${n}\`);
  }
});

const validateNotNaN = tap((n: number) => {
  if (isNaN(n)) {
    throw new Error('Value is NaN');
  }
});

const safeDivide = (divisor: number) => pipe(
  validateNotNaN,
  validatePositive,
  (n: number) => n / divisor
);

safeDivide(2)(10);  // 5
safeDivide(2)(0);   // Error: Expected positive number, got 0
safeDivide(2)(NaN); // Error: Value is NaN`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Analytics and Tracking
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

// Mock analytics function
const trackEvent = (event: string, data: any) => {
  console.log(\`[Analytics] \${event}\`, data);
};

interface Order {
  id: string;
  items: string[];
  total: number;
}

const processOrder = pipe(
  tap((order: Order) => trackEvent('order.started', { orderId: order.id })),
  (order: Order) => ({
    ...order,
    total: order.items.length * 10,
  }),
  tap((order: Order) => trackEvent('order.calculated', {
    orderId: order.id,
    total: order.total
  })),
  (order: Order) => {
    // Save to database
    return { ...order, saved: true };
  },
  tap((order: Order) => trackEvent('order.completed', { orderId: order.id }))
);

const order = {
  id: 'ORD-123',
  items: ['item1', 'item2', 'item3'],
  total: 0,
};

processOrder(order);
// Logs: "[Analytics] order.started { orderId: 'ORD-123' }"
// Logs: "[Analytics] order.calculated { orderId: 'ORD-123', total: 30 }"
// Logs: "[Analytics] order.completed { orderId: 'ORD-123' }"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Cache Warming
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

const cache = new Map<string, any>();

const warmCache = <T>(key: string) => tap((data: T) => {
  console.log(\`Caching data with key: \${key}\`);
  cache.set(key, data);
});

interface ApiResponse {
  data: any[];
  timestamp: number;
}

const fetchAndCache = (endpoint: string) => pipe(
  (endpoint: string) => fetch(endpoint),
  (response: Response) => response.json(),
  warmCache<ApiResponse>(\`api:\${endpoint}\`),
  (data: ApiResponse) => data.data
);

// The data is cached as a side effect while flowing through
const data = await fetchAndCache('/api/users');`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Mutation Detection (Development)
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

// Helper to detect mutations in development
const detectMutation = <T extends object>(label: string) => {
  if (process.env.NODE_ENV !== 'development') {
    return tap(() => {});
  }

  let snapshot: string;

  return tap((value: T) => {
    const current = JSON.stringify(value);

    if (!snapshot) {
      snapshot = current;
    } else if (snapshot !== current) {
      console.warn(\`[\${label}] Mutation detected!\`);
      console.warn('Before:', snapshot);
      console.warn('After:', current);
    }
  });
};

const processData = pipe(
  detectMutation('start'),
  (data: any[]) => data.map(x => ({ ...x, processed: true })),
  detectMutation('after-map'),
  (data: any[]) => data.filter(x => x.active),
  detectMutation('after-filter')
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Common Patterns
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Conditional Logging
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { tap } from 'fp-pack';

const debugLog = <T>(label: string) =>
  tap((value: T) => {
    if (process.env.DEBUG) {
      console.log(\`[DEBUG] \${label}:\`, value);
    }
  });

const verboseLog = <T>(label: string) =>
  tap((value: T) => {
    if (process.env.VERBOSE) {
      console.log(\`[VERBOSE] \${label}:\`, JSON.stringify(value, null, 2));
    }
  });`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Performance Monitoring
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

const measureTime = (label: string) => {
  let startTime: number;

  return {
    start: tap(() => {
      startTime = performance.now();
    }),
    end: tap(() => {
      const duration = performance.now() - startTime;
      console.log(\`\${label} took \${duration.toFixed(2)}ms\`);
    }),
  };
};

const timer = measureTime('Data processing');

const processData = pipe(
  timer.start,
  (data: number[]) => data.map(x => x * 2),
  (data: number[]) => data.filter(x => x > 10),
  (data: number[]) => data.reduce((sum, x) => sum + x, 0),
  timer.end
);

processData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
// Logs: "Data processing took 0.23ms"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      State Updates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, tap } from 'fp-pack';

let state = {
  count: 0,
  lastValue: null as any,
};

const updateState = <T>(update: (value: T) => void) => tap(update);

const processValue = pipe(
  (n: number) => n * 2,
  updateState((n: number) => {
    state.count++;
    state.lastValue = n;
  }),
  (n: number) => n + 10
);

processValue(5);  // Returns 20, state = { count: 1, lastValue: 10 }
processValue(3);  // Returns 16, state = { count: 2, lastValue: 6 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use tap?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. Non-Intrusive Debugging
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Add or remove logging without changing your pipeline structure. Debug intermediate
          values without breaking the data flow.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Separation of Concerns
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Keep side effects (logging, analytics, caching) separate from your main data
          transformation logic.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. Pipeline Observability
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Monitor and observe data as it flows through your pipelines without modifying
          the transformation logic.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. Immutability Preservation
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Perform side effects while ensuring the value passes through unchanged,
          maintaining functional programming principles.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      tap is elegantly simple - it executes the side effect and returns the original value:
    </p>

    <CodeBlock
      language="typescript"
      code={`function tap<T>(fn: (value: T) => void): (value: T) => T {
  return (value: T) => {
    fn(value);
    return value;
  };
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The side effect function's return value is completely ignored. The original value
      always flows through unchanged.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">tap</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/tap.ts"
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
          Build pipelines where tap excels for debugging.
        </p>
      </a>

      <a
        href="/composition/identity"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/identity');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          identity →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Pass values through without side effects.
        </p>
      </a>

      <a
        href="/debug/log"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/debug/log');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          log →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Quick console logging - specialized tap.
        </p>
      </a>
    </div>
  </div>
);
