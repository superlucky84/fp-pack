import { CodeBlock } from '@/components/CodeBlock';

export const Add = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      add
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Add two numbers (non-curried)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { add } from 'fp-kit';

add(1, 2);   // 3
add(-1, 1);  // 0`}
    />
  </div>
);
