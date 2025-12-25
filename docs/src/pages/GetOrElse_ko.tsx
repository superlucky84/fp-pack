import { CodeBlock } from '@/components/CodeBlock';

export const GetOrElse_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      getOrElse
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값이 없을 때 기본값을 제공합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { getOrElse } from 'fp-kit';

const withDefault = getOrElse('Guest');

withDefault(null);       // "Guest"
withDefault('Alice');    // "Alice"`}
    />
  </div>
);
