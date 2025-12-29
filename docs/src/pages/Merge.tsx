import { CodeBlock } from '@/components/CodeBlock';

export const Merge = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      merge
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Shallow merge objects (properties from the second overwrite the first)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { merge } from 'fp-kit';

const a = { id: 1, name: 'Ada' };
const b = { name: 'Lovelace', active: true };

merge(a, b);
// { id: 1, name: 'Lovelace', active: true }`}
    />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      Deep merge?
    </h2>
    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
      For nested merges, use <code>mergeDeep</code> instead; <code>merge</code> only performs a shallow merge.
    </p>
  </div>
);
