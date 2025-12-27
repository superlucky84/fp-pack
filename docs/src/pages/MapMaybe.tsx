import { CodeBlock } from '@/components/CodeBlock';

export const MapMaybe = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mapMaybe
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Map over an array and drop null/undefined results
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mapMaybe } from 'fp-kit';

const users = [
  { id: 1, name: 'A' },
  { id: 2 },
  { id: 3, name: 'C' },
];

const names = mapMaybe((user: { name?: string }) => user.name)(users);
// ["A", "C"]`}
    />
  </div>
);
