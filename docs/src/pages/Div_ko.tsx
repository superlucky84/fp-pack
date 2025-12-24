import { CodeBlock } from '@/components/CodeBlock';

export const Div_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      div
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      두 수를 나눕니다 (커링 없음)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { div } from 'fp-kit';

div(6, 3);   // 2
div(1, 2);   // 0.5`}
    />
  </div>
);
