import { CodeBlock } from '@/components/CodeBlock';

export const Merge_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      merge
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      객체를 얕게 병합합니다 (두 번째 객체가 첫 번째 속성을 덮어씀)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { merge } from 'fp-kit';

const a = { id: 1, name: 'Ada' };
const b = { name: 'Lovelace', active: true };

merge(a, b);
// { id: 1, name: 'Lovelace', active: true }`}
    />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      깊은 병합이 필요하다면?
    </h2>
    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
      중첩 객체를 병합하려면 <code>mergeDeep</code>을 사용하세요. <code>merge</code>는 얕은 병합만 수행합니다.
    </p>
  </div>
);
