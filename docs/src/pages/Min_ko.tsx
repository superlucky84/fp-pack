import { CodeBlock } from '@/components/CodeBlock';

export const Min_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      min
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      배열에서 가장 작은 값 찾기
    </p>

    <CodeBlock
      language="typescript"
      code={`import { min } from 'fp-kit';

min([3, 1, 5]); // 1
min([]);       // Infinity`}
    />
  </div>
);
