import { CodeBlock } from '@/components/CodeBlock';

export const Floor = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      floor
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Round a number down to the nearest integer
    </p>

    <CodeBlock
      language="typescript"
      code={`import { floor } from 'fp-kit';

floor(1.9);  // 1
floor(-1.1); // -2
floor(2);    // 2`}
    />
  </div>
);
