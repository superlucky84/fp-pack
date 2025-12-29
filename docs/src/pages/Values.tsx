import { CodeBlock } from '@/components/CodeBlock';

export const Values = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      values
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Get an array of an object's own enumerable values
    </p>

    <CodeBlock
      language="typescript"
      code={`import { values } from 'fp-kit';

const user = { id: 1, name: 'Ada' };
values(user); // [1, 'Ada']`}
    />
  </div>
);
