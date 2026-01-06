import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Assoc = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      assoc
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Immutably set a property on an object or array
    </p>

    <div class="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
      <p class="text-sm md:text-base text-yellow-900 dark:text-yellow-100">
        <strong class="font-semibold">Note:</strong> In data-last pipelines, TypeScript may not infer the final data type for this utility.
        Use a small type hint or a data-first wrapper. See{' '}
        <a
          href="/guide/type-usage"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/guide/type-usage');
          }}
          class="underline decoration-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-200"
        >
          Type Usage
        </a>{' '}
        and{' '}
        <a
          href="/guide"
          onClick={(e: Event) => {
            e.preventDefault();
            navigateTo('/guide');
          }}
          class="underline decoration-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-200"
        >
          Detailed Guide
        </a>.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is assoc?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        assoc
      </strong>{' '}
      creates a shallow copy of an object or array with a single property or element updated.
      It never mutates the original data structure, making it perfect for immutable update patterns
      commonly used in React, Redux, and functional programming.
      <br />
      <br />
      This is useful for <strong>immutable state updates</strong>, <strong>functional data transformation</strong>,
      <strong>Redux reducers</strong>, and <strong>React state management</strong>.
      <br />
      <br />
      Think of it as "create a new version of this object/array with this one property changed."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

const user = { id: 1, name: 'Alice', age: 25 };

// Update existing property
const updated = assoc('name', 'Bob', user);
// { id: 1, name: 'Bob', age: 25 }

// Original unchanged
console.log(user);
// { id: 1, name: 'Alice', age: 25 }`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function assoc<T, K extends string | number | symbol, V>(
  key: K,
  value: V,
  obj: T
): AssocResult<T, K, V>;

// Takes a key, value, and object/array
// Returns a new object/array with the property/element updated
// Preserves TypeScript type safety`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Updating Object Properties
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: 'Alice',
  email: 'alice@example.com'
};

// TypeScript infers the return type automatically
const updatedName = assoc('name', 'Bob', user);
//    ^? const updatedName: User

// Type is preserved through the transformation
const updatedEmail = assoc('email', 'bob@example.com', user);
//    ^? const updatedEmail: User

// Type errors are caught at compile time
// const wrong = assoc('name', 123, user);
//                              ^^^ Error: Type 'number' is not assignable to type 'string'

// Original remains unchanged (immutability)
console.log(user);
// { id: 1, name: 'Alice', email: 'alice@example.com' }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Adding New Properties
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface User {
  id: number;
  name: string;
}

const user: User = { id: 1, name: 'Alice' };

// TypeScript extends the type when adding new properties
const withAge = assoc('age', 25, user);
//    ^? const withAge: User & { age: number }

// You can use the extended type
const age: number = withAge.age; // ✓ Type-safe access

// Chain assoc calls to add multiple properties
const withMore = assoc('email', 'alice@example.com',
  assoc('age', 25, user)
);
//    ^? const withMore: User & { age: number; email: string }

// Explicit generics for clarity (optional)
const withExplicit = assoc<User, 'age', number>('age', 30, user);
//    ^? const withExplicit: User & Record<'age', number>`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Creating New Types by Adding Properties
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface BaseUser {
  id: number;
  name: string;
}

const baseUser: BaseUser = { id: 1, name: 'Alice' };

// Adding a new property creates a new extended type
const userWithEmail = assoc('email', 'alice@example.com', baseUser);
//    ^? const userWithEmail: BaseUser & Record<'email', string>

// The new type is different from the original
type ExtendedUser = typeof userWithEmail;
// ExtendedUser = BaseUser & Record<'email', string>

// You can access both original and new properties
const userId: number = userWithEmail.id;        // ✓ From BaseUser
const userName: string = userWithEmail.name;    // ✓ From BaseUser
const email: string = userWithEmail.email;      // ✓ From extended type

// But the original type doesn't have the new property
// const baseEmail: string = baseUser.email;
//                                    ^^^^^ Error: Property 'email' does not exist on type 'BaseUser'

// Chain multiple additions to create complex types
const fullUser = assoc('role', 'admin' as const,
  assoc('verified', true,
    assoc('email', 'alice@example.com', baseUser)
  )
);
//    ^? const fullUser: BaseUser & Record<'email', string> & Record<'verified', boolean> & Record<'role', 'admin'>

// Use the extended type in functions
function sendEmail(user: BaseUser & Record<'email', string>) {
  console.log(\`Sending email to \${user.email}\`);
  return user;
}

sendEmail(userWithEmail); // ✓ OK - has email property
// sendEmail(baseUser);   // ❌ Error - missing email property

// Extract the type for reuse
type UserWithEmail = BaseUser & Record<'email', string>;
type UserWithRole = UserWithEmail & Record<'role', 'admin' | 'user'>;

const adminUser: UserWithRole = assoc('role', 'admin',
  assoc('email', 'admin@example.com', baseUser)
);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Updating Arrays
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

// TypeScript preserves array element types
const items: string[] = ['a', 'b', 'c', 'd'];

// Update by index - type is inferred
const updated = assoc(1, 'B', items);
//    ^? const updated: string[]

// Type safety: can't assign wrong type
// const wrong = assoc(1, 123, items);
//                        ^^^ Error: Type 'number' is not assignable to type 'string'

// Works with readonly arrays too
const readonly = ['a', 'b', 'c'] as const;
const changed = assoc(1, 'B', readonly);
//    ^? const changed: ('a' | 'B' | 'c')[]

// Typed arrays maintain type constraints
const numbers: number[] = [1, 2, 3, 4];
const moreNumbers = assoc(1, 99, numbers);
//    ^? const moreNumbers: number[]

// Union types work correctly
const mixed: (string | number)[] = ['a', 1, 'b'];
const updatedMixed = assoc(0, 'x', mixed);
//    ^? const updatedMixed: (string | number)[]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      React State Updates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';
import { useState } from 'react';

interface FormState {
  username: string;
  email: string;
  password: string;
}

function LoginForm() {
  const [form, setForm] = useState<FormState>({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (field: keyof FormState, value: string) => {
    // Immutable update using assoc
    setForm(current => assoc(field, value, current));
  };

  return (
    <div>
      <input
        value={form.username}
        onChange={e => handleChange('username', e.target.value)}
      />
      <input
        value={form.email}
        onChange={e => handleChange('email', e.target.value)}
      />
      <input
        type="password"
        value={form.password}
        onChange={e => handleChange('password', e.target.value)}
      />
    </div>
  );
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Redux Reducer Pattern
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface User {
  id: number;
  name: string;
  email: string;
  active: boolean;
}

interface State {
  users: Record<number, User>;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: 'UPDATE_USER_NAME'; userId: number; name: string }
  | { type: 'TOGGLE_USER_ACTIVE'; userId: number }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_ERROR'; error: string | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'UPDATE_USER_NAME': {
      const user = state.users[action.userId];
      const updatedUser = assoc('name', action.name, user);
      const updatedUsers = assoc(action.userId, updatedUser, state.users);
      return assoc('users', updatedUsers, state);
    }

    case 'TOGGLE_USER_ACTIVE': {
      const user = state.users[action.userId];
      const updatedUser = assoc('active', !user.active, user);
      const updatedUsers = assoc(action.userId, updatedUser, state.users);
      return assoc('users', updatedUsers, state);
    }

    case 'SET_LOADING':
      return assoc('loading', action.loading, state);

    case 'SET_ERROR':
      return assoc('error', action.error, state);

    default:
      return state;
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Nested Updates with pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc, pipe } from 'fp-pack';

interface Address {
  street: string;
  city: string;
  country: string;
}

interface User {
  id: number;
  name: string;
  address: Address;
}

const user: User = {
  id: 1,
  name: 'Alice',
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA'
  }
};

// Update nested property
const updateCity = (newCity: string, user: User): User => {
  const updatedAddress = assoc('city', newCity, user.address);
  return assoc('address', updatedAddress, user);
};

const movedUser = updateCity('San Francisco', user);
// {
//   id: 1,
//   name: 'Alice',
//   address: { street: '123 Main St', city: 'San Francisco', country: 'USA' }
// }

// Using pipe for multiple updates
const updateUserInfo = pipe(
  (u: User) => assoc('name', 'Bob', u),
  (u: User) => {
    const addr = assoc('city', 'Los Angeles', u.address);
    return assoc('address', addr, u);
  }
);

const updated = updateUserInfo(user);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Immutable Array Updates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 1, text: 'Learn TypeScript', completed: true },
  { id: 2, text: 'Build an app', completed: false },
  { id: 3, text: 'Deploy to production', completed: false }
];

// Toggle completed status of second todo
const toggleTodo = (index: number, todos: Todo[]): Todo[] => {
  const todo = todos[index];
  const updated = assoc('completed', !todo.completed, todo);
  return assoc(index, updated, todos);
};

const toggled = toggleTodo(1, todos);
// [
//   { id: 1, text: 'Learn TypeScript', completed: true },
//   { id: 2, text: 'Build an app', completed: true },  // Changed!
//   { id: 3, text: 'Deploy to production', completed: false }
// ]

// Original unchanged
console.log(todos[1].completed); // false`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Configuration Updates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  headers: Record<string, string>;
}

const defaultConfig: ApiConfig = {
  baseUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Create development config
const devConfig = assoc('baseUrl', 'http://localhost:3000', defaultConfig);

// Create config with custom timeout
const slowConfig = assoc('timeout', 30000, defaultConfig);

// Add authentication header
const withAuth = (token: string, config: ApiConfig): ApiConfig => {
  const newHeaders = assoc('Authorization', \`Bearer \${token}\`, config.headers);
  return assoc('headers', newHeaders, config);
};

const authenticatedConfig = withAuth('abc123', defaultConfig);
// {
//   baseUrl: 'https://api.example.com',
//   timeout: 5000,
//   retries: 3,
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer abc123'
//   }
// }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Type-Safe Property Updates
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { assoc } from 'fp-pack';

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const product: Product = {
  id: 1,
  name: 'Laptop',
  price: 999,
  inStock: true
};

// TypeScript ensures type safety at compile time
const discounted = assoc('price', 799, product);
//    ^? const discounted: Product

const renamed = assoc('name', 'Gaming Laptop', product);
//    ^? const renamed: Product

const outOfStock = assoc('inStock', false, product);
//    ^? const outOfStock: Product

// ❌ Type errors caught at compile time:
// const wrong1 = assoc('price', 'free', product);
//                               ^^^^^^ Error: Argument of type 'string' is not assignable to parameter of type 'number'

// const wrong2 = assoc('inStock', 'yes', product);
//                                 ^^^^^ Error: Argument of type 'string' is not assignable to parameter of type 'boolean'

// const wrong3 = assoc('nonExistent', 'value', product);
//                      ^^^^^^^^^^^^^ Error: Argument of type '"nonExistent"' is not assignable

// ✓ Adding new properties extends the type
const withCategory = assoc('category', 'Electronics', product);
//    ^? const withCategory: Product & Record<'category', string>

// Now category is type-safe
const cat: string = withCategory.category; // ✓ OK
// const num: number = withCategory.category; // ❌ Error

// Using satisfies for extra type safety
const validated = assoc('price', 899, product) satisfies Product;
//    ^? const validated: Product

// Generics for explicit type control
function updateProduct<K extends keyof Product>(
  key: K,
  value: Product[K],
  product: Product
): Product {
  return assoc(key, value, product);
}

const updated = updateProduct('price', 799, product); // ✓ OK
// updateProduct('price', '799', product); // ❌ Error: string not assignable to number`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use assoc?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Immutability Guaranteed
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Never mutates the original data, preventing bugs from unexpected side effects and making state changes predictable.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Type Safety
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Full TypeScript support ensures you can't accidentally assign wrong types to properties.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Works with Objects and Arrays
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Single function handles both object properties and array elements, reducing cognitive load.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Functional Programming Pattern
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Enables clean functional update patterns, perfect for Redux reducers and React state management.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          5. Composable
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Easily chain multiple assoc calls or use with pipe for complex transformations.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function assoc<T, K extends string | number | symbol, V>(
  key: K,
  value: V,
  obj: T
): AssocResult<T, K, V> {
  if (Array.isArray(obj)) {
    const result = obj.slice();
    result[key] = value;
    return result;
  }

  if (obj && typeof obj === 'object') {
    return {
      ...(obj as object),
      [key]: value,
    };
  }

  return { [key]: value };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a key, value, and object/array to update</li>
        <li>For arrays: creates a shallow copy using slice() and updates the index</li>
        <li>For objects: uses spread operator to create a shallow copy with the property updated</li>
        <li>Returns the new data structure without mutating the original</li>
        <li>TypeScript types ensure type safety throughout</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/object/assocPath"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/assocPath');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          assocPath →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Set deeply nested properties immutably.
        </p>
      </a>

      <a
        href="/object/dissoc"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/dissoc');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          dissoc →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Remove properties immutably - opposite of assoc.
        </p>
      </a>

      <a
        href="/object/path"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/path');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          path →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Safely read nested properties.
        </p>
      </a>

      <a
        href="/object/merge"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/object/merge');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          merge →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Combine objects immutably.
        </p>
      </a>
    </div>
  </div>
);
