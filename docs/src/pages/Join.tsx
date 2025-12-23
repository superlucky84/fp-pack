import { CodeBlock } from '@/components/CodeBlock';

export const Join = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      join
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Combine an array of strings with a separator into a single string
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is join?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        join
      </strong>{' '}
      concatenates string arrays with a given separator. It returns an empty string for empty arrays and leaves single
      elements unchanged. Call it as <code>join(separator, array)</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { join } from 'fp-kit';

join(',', ['a', 'b', 'c']); // 'a,b,c'
join(' / ', ['one', 'two']); // 'one / two'
join('-', []); // ''`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Formatting output
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { join } from 'fp-kit';

const tags = ['fp', 'typescript', 'utilities'];
const tagString = join(', ', tags);
// 'fp, typescript, utilities'`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Safe defaults
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { join } from 'fp-kit';

function renderBreadcrumb(parts: string[]) {
  const path = join(' / ', parts);
  return path || 'Home';
}

renderBreadcrumb([]); // 'Home'
renderBreadcrumb(['Home', 'Docs', 'Join']); // 'Home / Docs / Join'`}
    />
  </div>
);
