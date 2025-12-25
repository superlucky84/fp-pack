import { CodeBlock } from '@/components/CodeBlock';

export const Sub = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      sub
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Subtract two numbers (non-curried)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { sub } from 'fp-kit';

sub(5, 3);   // 2
sub(1, 2);   // -1`}
    />
  </div>
);
