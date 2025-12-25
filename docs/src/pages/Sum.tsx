import { CodeBlock } from '@/components/CodeBlock';

export const Sum = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      sum
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Sum numbers in an array
    </p>

    <CodeBlock
      language="typescript"
      code={`import { sum } from 'fp-kit';

sum([1, 2, 3]);   // 6
sum([]);          // 0`}
    />
  </div>
);
