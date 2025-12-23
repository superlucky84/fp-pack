import { CodeBlock } from '@/components/CodeBlock';

export const IsType = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      isType
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check a value&apos;s runtime type by name (supports primitives, null/undefined, and common objects)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is isType?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        isType
      </strong>{' '}
      creates a predicate that returns <code>true</code> when a value matches the given runtime type name. It recognizes
      primitives (<code>string</code>, <code>number</code>, <code>boolean</code>, <code>symbol</code>, <code>bigint</code>),
      <code>null</code>/<code>undefined</code>, and common objects like <code>array</code>, <code>date</code>, <code>map</code>, <code>set</code>.
      The type name match is case-insensitive.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { isType } from 'fp-kit';

const isArray = isType('array');
const isDate = isType('Date');
const isMap = isType('map');

isArray([]);           // true
isArray({});           // false
isDate(new Date());    // true
isMap(new Map());      // true
isMap(new Set());      // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Filtering by type
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isType } from 'fp-kit';

const mixed = [1, 'hi', null, new Date(), [], new Map()];

const onlyArrays = mixed.filter(isType('array') as (v: unknown) => v is unknown[]);
// [ [] ]

const onlyDates = mixed.filter(isType('date'));
// [ Date(...) ]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Handling null/undefined explicitly
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { isType } from 'fp-kit';

const data: Array<string | null | undefined> = ['a', null, 'b', undefined];

const cleaned = data.filter(v => !isType('null')(v) && !isType('undefined')(v));
// ['a', 'b']`}
    />
  </div>
);
