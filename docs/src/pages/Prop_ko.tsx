import { CodeBlock } from '@/components/CodeBlock';

export const Prop_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      prop
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      키로 프로퍼티를 안전하게 조회합니다 (없으면 undefined)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { prop } from 'fp-kit';

const user = { id: 1, name: 'Ada' };

prop('name', user); // 'Ada'
prop('age', user);  // undefined`}
    />
  </div>
);
