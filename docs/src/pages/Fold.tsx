import { CodeBlock } from '@/components/CodeBlock';

export const Fold = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      fold
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Handle nullish values by choosing a fallback or transforming a value
    </p>

    <CodeBlock
      language="typescript"
      code={`import { fold } from 'fp-kit';

const format = fold(
  () => 'N/A',
  (value: number) => \`value:\${value}\`
);

format(null);   // "N/A"
format(3);      // "value:3"`}
    />
  </div>
);
