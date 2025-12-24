import { CodeBlock } from '@/components/CodeBlock';

export const Mean = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mean
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Calculate the average of numbers
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mean } from 'fp-kit';

mean([1, 2, 3, 4]); // 2.5
mean([]);          // NaN`}
    />
  </div>
);
