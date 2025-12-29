import { CodeBlock } from '@/components/CodeBlock';

export const Omit_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      omit
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      지정한 키를 제외한 새 객체를 만듭니다 (얕은, 불변)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { omit } from 'fp-kit';

const user = { id: 1, name: 'Ada', active: true };

omit(['active'], user);
// { id: 1, name: 'Ada' }`}
    />
  </div>
);
