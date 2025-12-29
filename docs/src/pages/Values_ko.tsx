import { CodeBlock } from '@/components/CodeBlock';

export const Values_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      values
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      객체의 열거 가능한 자체 값들을 배열로 반환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { values } from 'fp-kit';

const user = { id: 1, name: 'Ada' };
values(user); // [1, 'Ada']`}
    />
  </div>
);
