import { CodeBlock } from '@/components/CodeBlock';

export const Round = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      round
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Round a number to the nearest integer
    </p>

    <CodeBlock
      language="typescript"
      code={`import { round } from 'fp-kit';

round(1.4);   // 1
round(1.5);   // 2`}
    />
  </div>
);
