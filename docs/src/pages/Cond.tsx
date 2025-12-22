import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Cond = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      cond
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create conditional logic with multiple branches
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is cond?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        cond
      </strong>{' '}
      creates a function that evaluates multiple conditions in order and returns the result of the first matching branch.
      <br />
      <br />
      It's a functional alternative to <code>switch</code> statements or long <code>if-else</code> chains.
      You provide an array of condition-handler pairs, and cond tests each condition in order until one matches.
      When a condition is true, its corresponding handler is executed with the input value.
      <br />
      <br />
      This provides a clean, declarative way to express complex conditional logic that's easy to read,
      test, and compose with other functional utilities.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-kit';

const classify = cond<number, string>([
  [n => n < 0,    n => 'negative'],
  [n => n === 0,  n => 'zero'],
  [n => n > 0,    n => 'positive']
]);

classify(-5);  // 'negative'
classify(0);   // 'zero'
classify(10);  // 'positive'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Conditions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-kit';

// Number classification
const describe = cond<number, string>([
  [n => n > 10,  () => 'big'],
  [n => n > 5,   () => 'medium'],
  [n => n > 0,   () => 'small'],
  [() => true,   () => 'zero or negative']
]);

describe(15);  // 'big'
describe(7);   // 'medium'
describe(3);   // 'small'
describe(-1);  // 'zero or negative'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Using the Value in Handler
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-kit';

// Handlers receive the original value
const calculate = cond<number, number>([
  [n => n % 2 === 0,  n => n * 2],    // Double even numbers
  [n => n % 3 === 0,  n => n * 3],    // Triple multiples of 3
  [() => true,        n => n + 1]     // Add 1 to everything else
]);

calculate(4);   // 8  (4 * 2)
calculate(9);   // 27 (9 * 3)
calculate(7);   // 8  (7 + 1)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      No Match Returns undefined
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-kit';

const onlyPositive = cond<number, string>([
  [n => n > 0, n => \`Positive: \${n}\`]
]);

onlyPositive(5);   // 'Positive: 5'
onlyPositive(-5);  // undefined
onlyPositive(0);   // undefined

// Provide a default with catch-all condition
const withDefault = cond<number, string>([
  [n => n > 0,   n => \`Positive: \${n}\`],
  [() => true,   n => \`Not positive: \${n}\`]  // Default case
]);

withDefault(-5);   // 'Not positive: -5'`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      HTTP Status Code Handler
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-kit';

interface Response {
  status: number;
  data?: any;
  error?: string;
}

const handleResponse = cond<Response, string>([
  [res => res.status === 200,             res => \`Success: \${JSON.stringify(res.data)}\`],
  [res => res.status === 201,             res => 'Resource created successfully'],
  [res => res.status === 400,             res => \`Bad request: \${res.error}\`],
  [res => res.status === 401,             () => 'Unauthorized - please login'],
  [res => res.status === 404,             () => 'Resource not found'],
  [res => res.status >= 500,              res => \`Server error: \${res.status}\`],
  [() => true,                            res => \`Unknown status: \${res.status}\`]
]);

handleResponse({ status: 200, data: { id: 1 } });
// 'Success: {"id":1}'

handleResponse({ status: 404 });
// 'Resource not found'

handleResponse({ status: 500, error: 'Internal error' });
// 'Server error: 500'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      User Role Permissions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-kit';

interface User {
  role: 'admin' | 'editor' | 'viewer';
  isPremium: boolean;
}

const canEdit = cond<User, boolean>([
  [user => user.role === 'admin',                          () => true],
  [user => user.role === 'editor' && user.isPremium,       () => true],
  [user => user.role === 'editor' && !user.isPremium,      () => false],
  [() => true,                                             () => false]
]);

canEdit({ role: 'admin', isPremium: false });      // true
canEdit({ role: 'editor', isPremium: true });      // true
canEdit({ role: 'editor', isPremium: false });     // false
canEdit({ role: 'viewer', isPremium: true });      // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Discount Calculator
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-kit';

interface Order {
  amount: number;
  items: number;
  isVip: boolean;
}

const calculateDiscount = cond<Order, number>([
  [order => order.isVip && order.amount > 1000,    order => order.amount * 0.25],
  [order => order.isVip,                           order => order.amount * 0.15],
  [order => order.amount > 1000,                   order => order.amount * 0.20],
  [order => order.amount > 500,                    order => order.amount * 0.10],
  [order => order.items >= 5,                      order => order.amount * 0.05],
  [() => true,                                     () => 0]
]);

calculateDiscount({ amount: 1500, items: 3, isVip: true });
// 375 (25% of 1500)

calculateDiscount({ amount: 800, items: 10, isVip: false });
// 80 (10% of 800)

calculateDiscount({ amount: 100, items: 6, isVip: false });
// 5 (5% of 100)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Form Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-kit';

interface FormData {
  email: string;
  password: string;
  age?: number;
}

const validateForm = cond<FormData, { valid: boolean; error?: string }>([
  [
    data => !data.email,
    () => ({ valid: false, error: 'Email is required' })
  ],
  [
    data => !data.email.includes('@'),
    () => ({ valid: false, error: 'Email must be valid' })
  ],
  [
    data => !data.password,
    () => ({ valid: false, error: 'Password is required' })
  ],
  [
    data => data.password.length < 8,
    () => ({ valid: false, error: 'Password must be at least 8 characters' })
  ],
  [
    data => data.age !== undefined && data.age < 13,
    () => ({ valid: false, error: 'Must be at least 13 years old' })
  ],
  [
    () => true,
    () => ({ valid: true })
  ]
]);

validateForm({ email: '', password: 'pass123' });
// { valid: false, error: 'Email is required' }

validateForm({ email: 'user@example.com', password: 'short' });
// { valid: false, error: 'Password must be at least 8 characters' }

validateForm({ email: 'user@example.com', password: 'longpassword', age: 25 });
// { valid: true }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Game State Transitions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { cond } from 'fp-kit';

type GameState = 'idle' | 'playing' | 'paused' | 'gameover';

interface Game {
  state: GameState;
  score: number;
  lives: number;
}

const handleAction = cond<{ game: Game; action: string }, Game>([
  [
    ({ game, action }) => game.state === 'idle' && action === 'start',
    ({ game }) => ({ ...game, state: 'playing', lives: 3, score: 0 })
  ],
  [
    ({ game, action }) => game.state === 'playing' && action === 'pause',
    ({ game }) => ({ ...game, state: 'paused' })
  ],
  [
    ({ game, action }) => game.state === 'paused' && action === 'resume',
    ({ game }) => ({ ...game, state: 'playing' })
  ],
  [
    ({ game, action }) => game.state === 'playing' && action === 'hit' && game.lives > 1,
    ({ game }) => ({ ...game, lives: game.lives - 1 })
  ],
  [
    ({ game, action }) => game.state === 'playing' && action === 'hit' && game.lives === 1,
    ({ game }) => ({ ...game, state: 'gameover', lives: 0 })
  ],
  [
    () => true,
    ({ game }) => game  // No change
  ]
]);

let game: Game = { state: 'idle', score: 0, lives: 0 };

game = handleAction({ game, action: 'start' });
// { state: 'playing', score: 0, lives: 3 }

game = handleAction({ game, action: 'pause' });
// { state: 'paused', score: 0, lives: 3 }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, cond } from 'fp-kit';

// Process data through multiple stages
const processNumber = pipe(
  (n: number) => n * 2,
  cond<number, number>([
    [n => n > 100,  n => n - 50],
    [n => n > 50,   n => n - 20],
    [() => true,    n => n]
  ]),
  n => Math.floor(n)
);

processNumber(30);   // 60  (30 * 2 = 60, no deduction)
processNumber(40);   // 60  (40 * 2 = 80, 80 - 20 = 60)
processNumber(60);   // 70  (60 * 2 = 120, 120 - 50 = 70)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      cond vs. switch/if-else
    </h2>

    <div class="grid gap-6 mt-6">
      <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
          Traditional switch statement:
        </h4>
        <CodeBlock
          language="typescript"
          code={`function classify(n: number): string {
  switch (true) {
    case n > 10:
      return 'big';
    case n > 5:
      return 'medium';
    case n > 0:
      return 'small';
    default:
      return 'zero or negative';
  }
}`}
        />
      </div>

      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-3">
          With cond (functional):
        </h4>
        <CodeBlock
          language="typescript"
          code={`const classify = cond<number, string>([
  [n => n > 10,  () => 'big'],
  [n => n > 5,   () => 'medium'],
  [n => n > 0,   () => 'small'],
  [() => true,   () => 'zero or negative']
]);`}
        />
      </div>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mt-6">
      <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-3">
        Benefits of cond:
      </h4>
      <ul class="text-sm text-purple-800 dark:text-purple-200 list-disc list-inside space-y-2">
        <li>Creates a reusable function instead of inline logic</li>
        <li>Easy to test each branch independently</li>
        <li>Composable with other functional utilities</li>
        <li>Declarative and easy to read</li>
        <li>No mutation or side effects</li>
      </ul>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. First Match Wins
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Conditions are evaluated in order, and the first true condition's handler is executed.
          Subsequent conditions are not evaluated.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Returns a Function
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          cond returns a function that can be reused with different values,
          making it perfect for creating configurable logic.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Type Safe
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Full TypeScript support with proper type inference for input and output types.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. No Match Handling
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Returns undefined if no conditions match. Use a catch-all condition
          <code>[() =&gt; true, handler]</code> to provide a default.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
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
          Combine cond with pipe for powerful data transformation pipelines.
        </p>
      </a>

      <a
        href="/array/filter"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/filter');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          filter →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Use similar predicate logic to filter arrays.
        </p>
      </a>
    </div>
  </div>
);
