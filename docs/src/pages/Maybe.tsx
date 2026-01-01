import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Maybe = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      maybe
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Safely transform nullable values
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4 my-6">
      <p class="text-sm md:text-base text-blue-900 dark:text-blue-200 leading-relaxed">
        <strong class="font-semibold">Note:</strong> This is a lightweight helper designed for practical null-safe operations.
      Unlike full Maybe functor implementations found in academic functional programming libraries,
        this provides a simpler, more approachable tool for everyday JavaScript/TypeScript use cases.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is maybe?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/20 px-2 py-1 rounded">
        maybe
      </strong>{' '}
      creates a null-safe version of a function. If the input value is{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">null</code> or{' '}
      <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">undefined</code>,
      it returns <code class="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">null</code>{' '}
      without executing the function. Otherwise, it applies the function to the value.
      <br />
      <br />
      This eliminates the need for repetitive null checks and makes working with{' '}
      <strong>optional values</strong>, <strong>API responses</strong>, and{' '}
      <strong>nullable data</strong> much safer and cleaner.
      <br />
      <br />
      Part of the Maybe/Result pattern for handling nullable values functionally.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

const toUpper = maybe((s: string) => s.toUpperCase());

toUpper('hello');      // "HELLO"
toUpper(null);         // null
toUpper(undefined);    // null

// No null checks needed!
const processName = maybe((name: string) => {
  return \`Hello, \${name}!\`;
});

processName('Alice');     // "Hello, Alice!"
processName(null);        // null
processName(undefined);   // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function maybe<T, R>(
  fn: (value: T) => R
): (value: T | null | undefined) => R | null;

// Takes a function that transforms T to R
// Returns a function that accepts T | null | undefined
// and returns R | null`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The wrapped function will only execute if the value is not null or undefined.
      Otherwise, it short-circuits and returns null.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Transformations
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

// String operations
const toUpper = maybe((s: string) => s.toUpperCase());
const trim = maybe((s: string) => s.trim());
const getLength = maybe((s: string) => s.length);

toUpper('hello');    // "HELLO"
toUpper(null);       // null

trim('  spaces  '); // "spaces"
trim(undefined);    // null

getLength('test');  // 4
getLength(null);    // null

// Number operations
const double = maybe((n: number) => n * 2);
const increment = maybe((n: number) => n + 1);

double(5);        // 10
double(null);     // null

increment(10);    // 11
increment(null);  // null`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Avoiding Null Checks
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

// Without maybe - verbose null checks
function processUser(user: User | null) {
  if (user === null || user === undefined) {
    return null;
  }
  return user.name.toUpperCase();
}

// With maybe - clean and declarative
const processUser = maybe((user: User) => user.name.toUpperCase());

processUser({ name: 'Alice' });  // "ALICE"
processUser(null);               // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Accessing Object Properties
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
  profile?: {
    bio: string;
    avatar: string;
  };
}

// Safe property access
const getName = maybe((user: User) => user.name);
const getEmail = maybe((user: User) => user.email);
const getBio = maybe((user: User) => user.profile?.bio);

const user: User | null = getCurrentUser();

getName(user);    // "Alice" or null
getEmail(user);   // "alice@example.com" or null
getBio(user);     // "Software engineer" or null or undefined`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Response Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

interface ApiResponse {
  data: {
    items: string[];
    total: number;
  };
}

// Extract data safely
const getItems = maybe((response: ApiResponse) => response.data.items);
const getTotal = maybe((response: ApiResponse) => response.data.total);
const getFirstItem = maybe((response: ApiResponse) => response.data.items[0]);

// Usage
const response: ApiResponse | null = await fetchData();

const items = getItems(response);
// items: string[] | null

const total = getTotal(response);
// total: number | null

const firstItem = getFirstItem(response);
// firstItem: string | null | undefined`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Array Processing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

// Process nullable arrays
const getFirstElement = maybe((arr: any[]) => arr[0]);
const getLength = maybe((arr: any[]) => arr.length);
const mapDouble = maybe((arr: number[]) => arr.map(x => x * 2));

getFirstElement([1, 2, 3]);    // 1
getFirstElement(null);         // null
getFirstElement([]);           // undefined

getLength([1, 2, 3]);          // 3
getLength(null);               // null

mapDouble([1, 2, 3]);          // [2, 4, 6]
mapDouble(null);               // null`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Chaining with pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, maybe } from 'fp-pack';

interface User {
  name: string;
  age: number;
}

// Chain nullable transformations
const processUser = pipe(
  maybe((user: User) => user.name),
  maybe((name: string) => name.toUpperCase()),
  maybe((name: string) => \`Hello, \${name}!\`)
);

processUser({ name: 'Alice', age: 30 });
// "Hello, ALICE!"

processUser(null);
// null

// If any step returns null, the chain short-circuits
const user = { name: '', age: 30 };
const getName = maybe((u: User) => u.name || null);
const greet = maybe((name: string) => \`Hello, \${name}!\`);

pipe(getName, greet)(user);
// null (because name is empty, getName returns null)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Form Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

interface FormData {
  email: string;
  password: string;
}

// Validate and transform
const validateEmail = maybe((email: string) => {
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return null;
  }
  return email.toLowerCase();
});

const validatePassword = maybe((password: string) => {
  if (password.length < 8) {
    return null;
  }
  return password;
});

// Usage
const formData: FormData | null = getFormData();

const email = validateEmail(formData?.email);
const password = validatePassword(formData?.password);

if (email && password) {
  // Both are valid
  submitForm({ email, password });
} else {
  showError('Invalid form data');
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Configuration Access
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

interface Config {
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    darkMode: boolean;
    notifications: boolean;
  };
}

const config: Config | null = loadConfig();

// Safe config accessors
const getApiUrl = maybe((cfg: Config) => cfg.api.baseUrl);
const getTimeout = maybe((cfg: Config) => cfg.api.timeout);
const isDarkMode = maybe((cfg: Config) => cfg.features.darkMode);

const apiUrl = getApiUrl(config) ?? 'https://default.api.com';
const timeout = getTimeout(config) ?? 5000;
const darkMode = isDarkMode(config) ?? false;`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Common Patterns
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      With Default Values
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

const getUsername = maybe((user: User) => user.name);

// Use nullish coalescing for defaults
const username = getUsername(user) ?? 'Guest';
const displayName = getUsername(user) ?? 'Unknown User';

// Or use getOrElse
import { getOrElse } from 'fp-pack';

const username2 = getOrElse('Guest')(getUsername(user));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Mapping Over Arrays
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

const users: (User | null)[] = [
  { name: 'Alice', age: 30 },
  null,
  { name: 'Bob', age: 25 },
  undefined,
  { name: 'Carol', age: 35 }
];

const getName = maybe((user: User) => user.name);

const names = users.map(getName);
// ["Alice", null, "Bob", null, "Carol"]

// Filter out nulls
const validNames = names.filter(name => name !== null);
// ["Alice", "Bob", "Carol"]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Conditional Transformation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { maybe } from 'fp-pack';

// Transform based on condition
const processIfActive = maybe((user: User) => {
  if (!user.active) {
    return null;  // Convert to null if inactive
  }
  return user.name.toUpperCase();
});

processIfActive({ name: 'Alice', active: true });   // "ALICE"
processIfActive({ name: 'Bob', active: false });    // null
processIfActive(null);                              // null`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use maybe?
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          1. Eliminate Null Checks
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          No more repetitive if statements checking for null or undefined. The function
          handles it automatically.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Composable
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Works seamlessly with pipe, compose, and other functional utilities. Build
          complex transformations that safely handle null values.
        </p>
      </div>

      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          3. Type Safety
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          TypeScript knows the result can be null, forcing you to handle both cases
          explicitly.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          4. Declarative
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Express intent clearly: "apply this transformation if the value exists,
          otherwise return null."
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      maybe checks for null/undefined before applying the function:
    </p>

    <CodeBlock
      language="typescript"
      code={`function maybe<T, R>(
  fn: (value: T) => R
): (value: T | null | undefined) => R | null {
  return (value: T | null | undefined) => {
    if (value === null || value === undefined) {
      return null;
    }
    return fn(value);
  };
}`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-4">
      The function uses strict equality checks for null and undefined, then applies
      the transformation function only if the value is present.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">maybe</code> on GitHub to see how it works internally.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/nullable/maybe.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/fold');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          fold
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Handle nullish values with fallback or transform
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/getOrElse');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          getOrElse
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Provide a default value for nullish inputs
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/mapMaybe');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          mapMaybe
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Drop null/undefined results while mapping
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/result');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          result
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Wrap a function call to capture success or failure
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/nullable/getOrElse"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/getOrElse');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          getOrElse →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Learn about getOrElse for providing default values for null results.
        </p>
      </a>

      <a
        href="/nullable/mapMaybe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/nullable/mapMaybe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          mapMaybe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Use mapMaybe to map arrays while filtering out null/undefined results.
        </p>
      </a>
    </div>
  </div>
);
