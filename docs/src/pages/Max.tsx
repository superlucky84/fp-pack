import { CodeBlock } from '@/components/CodeBlock';

export const Max = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      max
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Get the maximum number in an array (returns -Infinity for empty arrays)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { max } from 'fp-kit';

max([1, 5, 3]);      // 5
max([-10, -5, -7]);  // -5
max([]);             // -Infinity`}
    />
  </div>
);
