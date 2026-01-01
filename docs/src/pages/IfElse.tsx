import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const IfElse = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      ifElse
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Choose between two different transformations based on a condition
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is ifElse?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        ifElse
      </strong>{' '}
      creates a function that applies one of two different transformations based on a predicate.
      When the predicate returns true, it applies the first function. When false, it applies the second function.
      <br />
      <br />
      Unlike <strong>when</strong> which returns the original value when the condition is false,
      ifElse always applies a transformation, making it ideal for <strong>branching logic</strong>,
      <strong>type conversions</strong>, and <strong>alternative computations</strong>.
      <br />
      <br />
      The true and false branches can return different types, providing maximum flexibility.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

const describeNumber = ifElse(
  (n: number) => n > 0,
  (n) => \`Positive: \${n}\`,
  (n) => \`Non-positive: \${n}\`
);

describeNumber(5);   // 'Positive: 5'
describeNumber(-3);  // 'Non-positive: -3'
describeNumber(0);   // 'Non-positive: 0'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function ifElse<T, RTrue, RFalse>(
  predicate: (value: T) => boolean,
  onTrue: (value: T) => RTrue,
  onFalse: (value: T) => RFalse
): (value: T) => RTrue | RFalse;

// Takes a predicate and two transformation functions
// Returns a function that applies one transformation or the other
// Can return different types for true and false branches`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Branching
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

// Convert number to different string representations
const formatNumber = ifElse(
  (n: number) => n >= 1000,
  (n) => \`\${(n / 1000).toFixed(1)}K\`,
  (n) => n.toString()
);

formatNumber(1500);  // '1.5K'
formatNumber(500);   // '500'

// Different processing based on string length
const processString = ifElse(
  (s: string) => s.length > 10,
  (s) => s.slice(0, 10) + '...',
  (s) => s.toUpperCase()
);

processString('Hello World!');  // 'Hello Worl...'
processString('Hi');             // 'HI'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Type Conversion
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

interface Success<T> {
  status: 'success';
  data: T;
}

interface Error {
  status: 'error';
  message: string;
}

// Return different types based on validation
const validateAge = ifElse(
  (age: number) => age >= 18,
  (age): Success<number> => ({ status: 'success', data: age }),
  (age): Error => ({ status: 'error', message: \`Age \${age} is below 18\` })
);

validateAge(25);  // { status: 'success', data: 25 }
validateAge(15);  // { status: 'error', message: 'Age 15 is below 18' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      User Access Control
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
}

interface AdminDashboard {
  type: 'admin';
  user: User;
  adminControls: string[];
}

interface UserDashboard {
  type: 'user';
  user: User;
  limitedFeatures: string[];
}

const getDashboard = ifElse(
  (user: User) => user.role === 'admin',
  (user): AdminDashboard => ({
    type: 'admin',
    user,
    adminControls: ['manage-users', 'view-analytics', 'settings']
  }),
  (user): UserDashboard => ({
    type: 'user',
    user,
    limitedFeatures: ['view-profile', 'edit-profile']
  })
);

getDashboard({ id: 1, name: 'Alice', role: 'admin' });
// { type: 'admin', user: {...}, adminControls: [...] }

getDashboard({ id: 2, name: 'Bob', role: 'user' });
// { type: 'user', user: {...}, limitedFeatures: [...] }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Price Calculation Strategy
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

interface Product {
  name: string;
  basePrice: number;
  isPremium: boolean;
}

interface RegularPrice {
  final: number;
  discount: number;
  type: 'regular';
}

interface PremiumPrice {
  final: number;
  discount: number;
  premiumBonus: number;
  type: 'premium';
}

const calculatePrice = ifElse(
  (product: Product) => product.isPremium,
  (product): PremiumPrice => ({
    final: product.basePrice * 0.8,
    discount: 20,
    premiumBonus: 10,
    type: 'premium'
  }),
  (product): RegularPrice => ({
    final: product.basePrice * 0.9,
    discount: 10,
    type: 'regular'
  })
);

calculatePrice({ name: 'Widget', basePrice: 100, isPremium: true });
// { final: 80, discount: 20, premiumBonus: 10, type: 'premium' }

calculatePrice({ name: 'Gadget', basePrice: 100, isPremium: false });
// { final: 90, discount: 10, type: 'regular' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Data Validation and Formatting
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

const validateEmail = ifElse(
  (email: string) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email),
  (email) => ({ valid: true, email: email.toLowerCase() }),
  (email) => ({ valid: false, error: \`Invalid email: \${email}\` })
);

validateEmail('user@EXAMPLE.COM');
// { valid: true, email: 'user@example.com' }

validateEmail('invalid-email');
// { valid: false, error: 'Invalid email: invalid-email' }

// Phone number formatting
const formatPhone = ifElse(
  (phone: string) => phone.length === 10,
  (phone) => \`(\${phone.slice(0, 3)}) \${phone.slice(3, 6)}-\${phone.slice(6)}\`,
  (phone) => phone
);

formatPhone('1234567890');  // '(123) 456-7890'
formatPhone('12345');        // '12345'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Array Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { ifElse } from 'fp-pack';

interface Item {
  id: number;
  name: string;
  stock: number;
}

// Different processing for in-stock vs out-of-stock items
const processInventoryItem = ifElse(
  (item: Item) => item.stock > 0,
  (item) => ({
    ...item,
    status: 'available',
    message: \`\${item.stock} units in stock\`
  }),
  (item) => ({
    ...item,
    status: 'out-of-stock',
    message: 'Notify when available',
    notifyMe: true
  })
);

const inventory = [
  { id: 1, name: 'Widget', stock: 10 },
  { id: 2, name: 'Gadget', stock: 0 }
];

inventory.map(processInventoryItem);
// [
//   { id: 1, name: 'Widget', stock: 10, status: 'available', message: '10 units in stock' },
//   { id: 2, name: 'Gadget', stock: 0, status: 'out-of-stock', message: 'Notify when available', notifyMe: true }
// ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With pipe for Complex Logic
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, ifElse } from 'fp-pack';

interface Order {
  total: number;
  isPriority: boolean;
  customerId: number;
}

const processOrder = pipe(
  // Choose shipping speed based on priority
  ifElse(
    (order: Order) => order.isPriority,
    (order) => ({ ...order, shipping: 'express', shippingCost: 20 }),
    (order) => ({ ...order, shipping: 'standard', shippingCost: 5 })
  ),
  // Choose discount based on order total
  ifElse(
    (order) => order.total > 100,
    (order) => ({ ...order, discount: order.total * 0.1 }),
    (order) => ({ ...order, discount: 0 })
  )
);

processOrder({ total: 150, isPriority: true, customerId: 1 });
// { total: 150, isPriority: true, customerId: 1, shipping: 'express', shippingCost: 20, discount: 15 }

processOrder({ total: 50, isPriority: false, customerId: 2 });
// { total: 50, isPriority: false, customerId: 2, shipping: 'standard', shippingCost: 5, discount: 0 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use ifElse?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Explicit Branching Logic
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Unlike when/unless that may return the original value, ifElse always applies a transformation,
          making your intent clear.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Type-Safe Branching
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          TypeScript can infer different return types for true and false branches,
          enabling type-safe conversion between different data structures.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Composable
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Works seamlessly with pipe and compose for building complex decision trees
          and transformation pipelines.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Avoids Imperative If-Else
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Replace verbose if-else statements with a clean, functional expression
          that's easier to test and reason about.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function ifElse<T, RTrue, RFalse>(
  predicate: (value: T) => boolean,
  onTrue: (value: T) => RTrue,
  onFalse: (value: T) => RFalse
): (value: T) => RTrue | RFalse {
  return (value: T) => (predicate(value) ? onTrue(value) : onFalse(value));
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a predicate and two transformation functions (onTrue and onFalse)</li>
        <li>Returns a new function that evaluates the predicate</li>
        <li>If predicate returns true, applies onTrue transformation</li>
        <li>If predicate returns false, applies onFalse transformation</li>
        <li>Both branches can return different types (RTrue and RFalse)</li>
        <li>Pure function with no side effects</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">ifElse</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/control/ifElse.ts"
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
        href="/control/when"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/when');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          when →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Apply function when condition is true - simpler alternative.
        </p>
      </a>

      <a
        href="/control/unless"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/unless');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          unless →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Apply function when condition is false - opposite pattern.
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
          Handle multiple conditional branches - extends ifElse concept.
        </p>
      </a>

      <a
        href="/control/guard"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/guard');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          guard →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Return default value when predicate fails - early return pattern.
        </p>
      </a>
    </div>
  </div>
);
