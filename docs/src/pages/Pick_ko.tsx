import { CodeBlock } from '@/components/CodeBlock';

export const Pick_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      pick
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      지정한 키만 가진 새 객체를 만듭니다 (얕은, 불변)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { pick } from 'fp-kit';

const user = { id: 1, name: 'Ada', active: true };

pick(['id', 'name'], user);
// { id: 1, name: 'Ada' }`}
    />
  </div>
);
