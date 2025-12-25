import { CodeBlock } from '@/components/CodeBlock';

export const Mul = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mul
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Multiply two numbers
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mul } from 'fp-kit';

mul(2, 3);   // 6
mul(-1, 5);  // -5`}
    />
  </div>
);
