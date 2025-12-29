import { CodeBlock } from '@/components/CodeBlock';

export const MapValues_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mapValues
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      키를 유지한 채 값만 변환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mapValues } from 'fp-kit';

const input = { a: 1, b: 2 };
const doubled = mapValues((v: number) => v * 2, input);
// { a: 2, b: 4 }`}
    />
  </div>
);
