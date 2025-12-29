import { CodeBlock } from '@/components/CodeBlock';

export const Keys = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      keys
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Get an array of an object's own enumerable keys (typed)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { keys } from 'fp-kit';

const user = { id: 1, name: 'Ada' };
keys(user); // ['id', 'name']`}
    />
  </div>
);
