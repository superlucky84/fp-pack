import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Guard = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      guard
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Return default value when predicate fails (early return pattern)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is guard?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        guard
      </strong>{' '}
      creates a function that validates input against a predicate and returns a default value when validation fails.
      If the predicate returns true, it returns the original value. Otherwise, it returns the default value.
      <br />
      <br />
      This implements the <strong>early return pattern</strong> functionally, making it ideal for
      <strong>input validation</strong>, <strong>boundary checking</strong>, <strong>fallback values</strong>,
      and <strong>ensuring constraints</strong>.
      <br />
      <br />
      Think of it as "use this value, but only if it's valid. Otherwise, use this safe default."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

// Ensure number is positive, default to 0
const ensurePositive = guard(
  (n: number) => n > 0,
  0
);

ensurePositive(5);   // 5 (valid, returns original)
ensurePositive(-3);  // 0 (invalid, returns default)
ensurePositive(0);   // 0 (invalid, returns default)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function guard<T>(
  predicate: (value: T) => boolean,
  defaultValue: T
): (value: T) => T;

// Takes a predicate and a default value
// Returns a function that validates and falls back to default
// Always returns the same type`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

// Ensure string is not empty
const ensureNonEmpty = guard(
  (s: string) => s.length > 0,
  'default'
);

ensureNonEmpty('hello');  // 'hello'
ensureNonEmpty('');        // 'default'

// Ensure number is within range
const ensureInRange = guard(
  (n: number) => n >= 0 && n <= 100,
  50
);

ensureInRange(75);   // 75
ensureInRange(150);  // 50 (out of range)
ensureInRange(-10);  // 50 (out of range)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Object Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

interface Config {
  timeout: number;
  retries: number;
}

const defaultConfig: Config = {
  timeout: 5000,
  retries: 3
};

// Ensure config has valid timeout
const ensureValidConfig = guard(
  (config: Config) => config.timeout > 0 && config.retries > 0,
  defaultConfig
);

ensureValidConfig({ timeout: 3000, retries: 5 });
// { timeout: 3000, retries: 5 }

ensureValidConfig({ timeout: -1, retries: 5 });
// { timeout: 5000, retries: 3 } (invalid, returns default)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      User Input Sanitization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

// Ensure age is reasonable
const sanitizeAge = guard(
  (age: number) => age >= 0 && age <= 150,
  18  // default to adult age
);

sanitizeAge(25);    // 25
sanitizeAge(200);   // 18 (unrealistic)
sanitizeAge(-5);    // 18 (invalid)

// Ensure username meets requirements
const sanitizeUsername = guard(
  (username: string) => username.length >= 3 && username.length <= 20,
  'anonymous'
);

sanitizeUsername('john_doe');  // 'john_doe'
sanitizeUsername('ab');         // 'anonymous' (too short)
sanitizeUsername('a'.repeat(25)); // 'anonymous' (too long)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Response Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

interface ApiResponse {
  status: number;
  data: unknown;
}

const fallbackResponse: ApiResponse = {
  status: 500,
  data: { error: 'Invalid response' }
};

// Ensure response has valid status code
const ensureValidResponse = guard(
  (response: ApiResponse) => response.status >= 200 && response.status < 300,
  fallbackResponse
);

ensureValidResponse({ status: 200, data: { user: 'John' } });
// { status: 200, data: { user: 'John' } }

ensureValidResponse({ status: 404, data: null });
// { status: 500, data: { error: 'Invalid response' } }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Configuration with Defaults
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard, pipe } from 'fp-pack';

interface AppSettings {
  theme: 'light' | 'dark';
  fontSize: number;
  language: string;
}

const defaultSettings: AppSettings = {
  theme: 'light',
  fontSize: 14,
  language: 'en'
};

// Validate multiple constraints
const ensureValidSettings = guard(
  (settings: AppSettings) =>
    (settings.theme === 'light' || settings.theme === 'dark') &&
    settings.fontSize >= 10 && settings.fontSize <= 24 &&
    settings.language.length === 2,
  defaultSettings
);

ensureValidSettings({ theme: 'dark', fontSize: 16, language: 'ko' });
// { theme: 'dark', fontSize: 16, language: 'ko' }

ensureValidSettings({ theme: 'dark', fontSize: 30, language: 'ko' });
// { theme: 'light', fontSize: 14, language: 'en' } (fontSize out of range)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Bounds Checking
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

// Ensure array index is valid
const createSafeIndexGetter = <T>(arr: T[], defaultValue: T) =>
  guard(
    (index: number) => index >= 0 && index < arr.length,
    defaultValue
  );

const numbers = [10, 20, 30, 40, 50];
const getSafeNumber = createSafeIndexGetter(numbers, -1);

// Using with map
const indices = [0, 2, 10, -5, 4];
indices.map(getSafeNumber);
// [10, 30, -1, -1, 50]

// Ensure minimum array length
const ensureMinLength = guard(
  (arr: number[]) => arr.length >= 3,
  [0, 0, 0]
);

ensureMinLength([1, 2, 3, 4]);  // [1, 2, 3, 4]
ensureMinLength([1, 2]);         // [0, 0, 0]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With pipe for Data Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, guard } from 'fp-pack';

interface Price {
  amount: number;
  currency: string;
}

const defaultPrice: Price = { amount: 0, currency: 'USD' };

// Chain validations
const processPrice = pipe(
  // Ensure valid currency
  guard(
    (price: Price) => ['USD', 'EUR', 'GBP'].includes(price.currency),
    defaultPrice
  ),
  // Ensure positive amount
  guard(
    (price: Price) => price.amount > 0,
    defaultPrice
  )
);

processPrice({ amount: 100, currency: 'USD' });
// { amount: 100, currency: 'USD' }

processPrice({ amount: 100, currency: 'JPY' });
// { amount: 0, currency: 'USD' } (invalid currency)

processPrice({ amount: -50, currency: 'USD' });
// { amount: 0, currency: 'USD' } (negative amount)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Form Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { guard } from 'fp-pack';

interface FormData {
  email: string;
  password: string;
  age: number;
}

const emptyForm: FormData = {
  email: '',
  password: '',
  age: 0
};

// Email validation
const ensureValidEmail = guard(
  (form: FormData) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(form.email),
  emptyForm
);

// Password strength
const ensureStrongPassword = guard(
  (form: FormData) => form.password.length >= 8,
  emptyForm
);

// Process form with guards
const validateForm = (form: FormData) => {
  const emailChecked = ensureValidEmail(form);
  if (emailChecked === emptyForm) return { error: 'Invalid email' };

  const passwordChecked = ensureStrongPassword(emailChecked);
  if (passwordChecked === emptyForm) return { error: 'Password too weak' };

  return { success: true, data: passwordChecked };
};

validateForm({ email: 'user@example.com', password: 'securepass123', age: 25 });
// { success: true, data: {...} }

validateForm({ email: 'invalid', password: 'securepass123', age: 25 });
// { error: 'Invalid email' }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use guard?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Safe Defaults
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Ensure your application never processes invalid data by automatically falling back
          to safe default values.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Declarative Validation
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Express validation logic and fallback behavior in a single, clear function call
          instead of verbose if-else chains.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Composable
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Chain multiple guards together with pipe to create multi-step validation pipelines.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Type Safety
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Always returns the same type (T), making it safe to use in any context that expects
          that type.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function guard<T>(
  predicate: (value: T) => boolean,
  defaultValue: T
): (value: T) => T {
  return (value: T) => (predicate(value) ? value : defaultValue);
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a predicate function and a default value of type T</li>
        <li>Returns a new function that validates the input</li>
        <li>If predicate returns true, returns the original value</li>
        <li>If predicate returns false, returns the default value</li>
        <li>Pure function with no side effects</li>
        <li>Default value should be a safe, valid instance of type T</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">guard</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/control/guard.ts"
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
          Apply function when condition is false - similar validation pattern.
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
          Choose between two transformations - more flexible branching.
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
          Handle exceptions safely - error-based fallback pattern.
        </p>
      </a>

      <a
        href="/control/cond"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/cond');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          cond →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Handle multiple conditions - extends guard to multiple rules.
        </p>
      </a>
    </div>
  </div>
);
