import { CodeBlock } from '@/components/CodeBlock';

export const Ceil_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      ceil
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      숫자를 올림하여 가장 가까운 정수로 변환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { ceil } from 'fp-kit';

ceil(1.1);  // 2
ceil(-1.1); // -1
ceil(2);    // 2`}
    />
  </div>
);
