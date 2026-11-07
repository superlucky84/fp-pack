import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const CurryN = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">curryN</h1>
    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Choose when a curried function runs, including default, optional and rest parameters.
    </p>
    <p>
      <code>curryN(arity, fn)</code> collects arguments until their total count reaches
      <code> arity</code>. Arguments and results infer from the original function. Use a literal count from 0 to 32 that
      supplies all required parameters and fits the function's finite signature or rest parameters.
    </p>

    <h2 class="text-2xl font-medium mt-8 mb-4">Default and optional parameters</h2>
    <p>
      A default parameter changes JavaScript's <code>fn.length</code>. An explicit count lets you choose whether to use
      the default or wait for another value. Passing <code>undefined</code> consumes a slot and applies the original
      default.
    </p>
    {/* inference-usability: curryN defaults */}
    <CodeBlock
      language="typescript"
      code={`import { curryN } from 'fp-pack';

const add = (a: number, b = 10) => a + b;
curryN(1, add)(2);           // 12
curryN(2, add)(2)(3);        // 5
curryN(2, add)(2)(undefined); // 12
curryN(1, add)(2, 3);        // 5; extra valid arguments are forwarded

const format = (value: number, unit?: string) => value.toFixed() + (unit ?? '');
curryN(1, format)(2);        // '2'
curryN(2, format)(2)('kg');  // '2kg'`}
    />

    <h2 class="text-2xl font-medium mt-8 mb-4">Rest parameters and reusable partials</h2>
    <p>
      The count is the execution threshold. Every value in the completing call is forwarded, including additional rest
      values. Empty calls keep a positive stage waiting; they do not signal the end of an optional or rest parameter.
    </p>
    {/* inference-usability: curryN rest */}
    <CodeBlock
      language="typescript"
      code={`import { curryN } from 'fp-pack';

const total = (label: string, ...values: number[]) =>
  label + values.reduce((sum, value) => sum + value, 0);
const labeledTotal = curryN(3, total)('sum:');

labeledTotal()(1)(2, 3); // 'sum:6'
labeledTotal(4, 5);     // 'sum:9'; the partial can be reused`}
    />

    <h2 class="text-2xl font-medium mt-8 mb-4">Zero waits for an explicit call</h2>
    {/* inference-usability: curryN zero */}
    <CodeBlock
      language="typescript"
      code={`import { curryN } from 'fp-pack';

let calls = 0;
const run = curryN(0, () => ++calls);
// calls is still 0
run(); // 1
run(); // 2`}
    />

    <h2 class="text-2xl font-medium mt-8 mb-4">Inference in pipelines and callbacks</h2>
    {/* inference-usability: curryN pipeline */}
    <CodeBlock
      language="typescript"
      code={`import { curryN, pipe, pipeAsync } from 'fp-pack';

const addFive = curryN(2, (amount: number, value = 0) => amount + value)(5);
const label = pipe(3, addFive, value => value.toFixed()); // string
const asyncValue = pipeAsync(3, addFive);                // Promise<number>

const render = curryN(1, (format: (value: number) => string, value = 2) => format(value));
render(value => value.toFixed()); // string; value is number`}
    />

    <h2 class="text-2xl font-medium mt-8 mb-4">Counts and inference boundaries</h2>
    <ul>
      <li>Negative, fractional or greater-than-32 counts throw RangeError and fail static checking.</li>
      <li>A count below the required prefix or above a finite parameter list fails static checking.</li>
      <li>Dynamic number counts cannot describe a precise stage; use a literal count.</li>
      <li>A spread with uncertain length returns unknown until a known tuple prefix proves completion.</li>
      <li>Bind methods with an explicit receiver before passing them to curryN.</li>
      <li>Arbitrary generic and overloaded signatures retain Parameters/ReturnType inference limits.</li>
    </ul>
    <p>
      <code>CurriedN&lt;typeof fn, 2&gt;</code> is available when an explicit reusable contract is useful. Normal calls
      infer automatically. Promise results keep their original Promise type; curryN does not await or execute them
      early.
    </p>
    <p>
      <a
        href="/composition/curry"
        onClick={(event: Event) => {
          event.preventDefault();
          navigateTo('/composition/curry');
        }}
      >
        curry
      </a>{' '}
      continues to use the original function's length. Existing calls keep their behavior.
    </p>
    <p>
      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/composition/curryN.ts"
        target="_blank"
        rel="noopener noreferrer"
      >
        View source on GitHub
      </a>
    </p>
  </div>
);
