import { CodeBlock } from '@/components/CodeBlock';

export const MergeDeep_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mergeDeep
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      두 객체를 깊게 병합합니다 (중첩 객체는 재귀적으로 병합)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mergeDeep } from 'fp-kit';

const base = { user: { name: 'Ada', info: { age: 20 } }, meta: { id: 1 } };
const patch = { user: { info: { age: 21 } }, meta: { active: true } };

mergeDeep(base, patch);
// { user: { name: 'Ada', info: { age: 21 } }, meta: { id: 1, active: true } }`}
    />
  </div>
);
