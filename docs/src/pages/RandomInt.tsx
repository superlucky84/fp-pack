import { CodeBlock } from '@/components/CodeBlock';

export const RandomInt = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      randomInt
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Get a random integer between two numbers (inclusive)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { randomInt } from 'fp-kit';

randomInt(1, 5);    // 1..5
randomInt(1.2, 3);  // 2..3 (bounds are rounded)`}
    />
  </div>
);
