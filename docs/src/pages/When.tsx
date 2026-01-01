import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const When = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      when
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Apply a function only when a condition is true
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is when?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        when
      </strong>{' '}
      creates a function that conditionally applies a transformation. It tests a value against a predicate,
      and if the predicate returns true, it applies the given function. Otherwise, it returns the original value unchanged.
      <br />
      <br />
      This is useful for <strong>conditional transformations</strong>, <strong>data validation</strong>,
      <strong>normalization</strong>, and <strong>optional processing</strong>.
      <br />
      <br />
      Think of it as "transform this value, but only if this condition is met."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-pack';

const doubleIfPositive = when(
  (n: number) => n > 0,
  (n) => n * 2
);

doubleIfPositive(5);   // 10 (positive, so doubled)
doubleIfPositive(-3);  // -3 (negative, so unchanged)
doubleIfPositive(0);   // 0  (zero, so unchanged)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function when<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T;

// Takes a predicate and a transformation function
// Returns a function that conditionally applies the transformation`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Transformations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-pack';

// Capitalize only if non-empty
const capitalizeIfNotEmpty = when(
  (s: string) => s.length > 0,
  (s) => s.toUpperCase()
);

capitalizeIfNotEmpty('hello');  // 'HELLO'
capitalizeIfNotEmpty('');        // ''

// Double only if even
const doubleIfEven = when(
  (n: number) => n % 2 === 0,
  (n) => n * 2
);

doubleIfEven(4);   // 8
doubleIfEven(3);   // 3`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Normalization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-pack';

interface User {
  name: string;
  email: string;
  age?: number;
}

// Normalize email to lowercase only if it contains uppercase
const normalizeEmail = when(
  (user: User) => user.email !== user.email.toLowerCase(),
  (user) => ({ ...user, email: user.email.toLowerCase() })
);

normalizeEmail({ name: 'John', email: 'JOHN@EXAMPLE.COM' });
// { name: 'John', email: 'john@example.com' }

normalizeEmail({ name: 'Jane', email: 'jane@example.com' });
// { name: 'Jane', email: 'jane@example.com' } (unchanged)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Input Validation and Sanitization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-pack';
import { pipe } from 'fp-pack';

// Trim only if string has whitespace
const trimIfNeeded = when(
  (s: string) => s !== s.trim(),
  (s) => s.trim()
);

// Remove special characters only if they exist
const sanitizeIfNeeded = when(
  (s: string) => /[^a-zA-Z0-9]/.test(s),
  (s) => s.replace(/[^a-zA-Z0-9]/g, '')
);

// Combine multiple conditional transformations
const cleanInput = pipe(
  trimIfNeeded,
  sanitizeIfNeeded
);

cleanInput('  hello@world!  ');  // 'helloworld'
cleanInput('helloworld');         // 'helloworld' (unchanged)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Conditional Discounts
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-pack';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

// Apply bulk discount only if quantity >= 10
const applyBulkDiscount = when(
  (item: CartItem) => item.quantity >= 10,
  (item) => ({ ...item, price: item.price * 0.9 })
);

applyBulkDiscount({ name: 'Widget', price: 100, quantity: 15 });
// { name: 'Widget', price: 90, quantity: 15 }

applyBulkDiscount({ name: 'Gadget', price: 50, quantity: 5 });
// { name: 'Gadget', price: 50, quantity: 5 } (no discount)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Performance Optimization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { when } from 'fp-pack';

// Cache result only if computation is expensive (array length > 1000)
const cacheIfLarge = when(
  (arr: number[]) => arr.length > 1000,
  (arr) => {
    // Expensive operation
    const cached = arr.map(n => n * n);
    return cached;
  }
);

// Sort only if array is not already sorted
const sortIfNeeded = when(
  (arr: number[]) => !arr.every((v, i, a) => i === 0 || a[i - 1] <= v),
  (arr) => [...arr].sort((a, b) => a - b)
);

sortIfNeeded([1, 2, 3, 4]);     // [1, 2, 3, 4] (already sorted)
sortIfNeeded([4, 2, 3, 1]);     // [1, 2, 3, 4] (sorted)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With pipe for Data Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, when } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

const processProduct = pipe(
  // Apply discount only if stock is low
  when(
    (p: Product) => p.stock < 10,
    (p) => ({ ...p, price: p.price * 0.95 })
  ),
  // Mark as out of stock only if stock is 0
  when(
    (p: Product) => p.stock === 0,
    (p) => ({ ...p, name: \`\${p.name} (OUT OF STOCK)\` })
  )
);

processProduct({ id: 1, name: 'Widget', price: 100, stock: 5 });
// { id: 1, name: 'Widget', price: 95, stock: 5 }

processProduct({ id: 2, name: 'Gadget', price: 50, stock: 0 });
// { id: 2, name: 'Gadget (OUT OF STOCK)', price: 47.5, stock: 0 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use when?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Declarative Conditional Logic
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Express "do this only if" logic in a clear, functional way without explicit if statements.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Composable
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Easily combine with pipe, compose, and other functional utilities for complex data transformations.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Safe and Predictable
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Always returns a value of the same type, making it safe to use in transformation pipelines.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Testable
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Pure function makes it easy to test both paths (condition true and false) independently.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function when<T>(
  predicate: (value: T) => boolean,
  fn: (value: T) => T
): (value: T) => T {
  return (value: T) => (predicate(value) ? fn(value) : value);
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a predicate function and a transformation function</li>
        <li>Returns a new function that tests the predicate</li>
        <li>If predicate returns true, applies the transformation</li>
        <li>If predicate returns false, returns the original value</li>
        <li>Pure function with no side effects</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">when</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/control/when.ts"
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
        href="/control/unless"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/unless');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          unless →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Apply function when condition is false - opposite of when.
        </p>
      </a>

      <a
        href="/control/ifElse"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/ifElse');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          ifElse →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Choose between two transformations based on condition.
        </p>
      </a>

      <a
        href="/control/cond"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/cond');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          cond →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Handle multiple conditional branches with pattern matching.
        </p>
      </a>

      <a
        href="/composition/complement"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/complement');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          complement →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Negate predicate functions for use with when.
        </p>
      </a>
    </div>
  </div>
);
