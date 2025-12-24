import { CodeBlock } from '@/components/CodeBlock';

export const Div = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      div
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Divide two numbers (non-curried)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { div } from 'fp-kit';

div(6, 3);   // 2
div(1, 2);   // 0.5`}
    />
  </div>
);
