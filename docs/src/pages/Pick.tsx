import { CodeBlock } from '@/components/CodeBlock';

export const Pick = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pick
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Create a new object with only the specified keys (shallow, immutable)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pick } from 'fp-kit';

const user = { id: 1, name: 'Ada', active: true };

pick(['id', 'name'], user);
// { id: 1, name: 'Ada' }`}
    />
  </div>
);
