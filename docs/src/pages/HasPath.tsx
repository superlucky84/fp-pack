import { CodeBlock } from '@/components/CodeBlock';

export const HasPath = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      hasPath
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Check whether a nested path exists on an object
    </p>

    <CodeBlock
      language="typescript"
      code={`import { hasPath } from 'fp-kit';

const user = { profile: { address: { city: 'Seoul' } } };

hasPath(['profile', 'address', 'city'], user);    // true
hasPath(['profile', 'phone'], user);              // false`}
    />
  </div>
);
