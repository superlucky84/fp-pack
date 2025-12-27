import { CodeBlock } from '@/components/CodeBlock';

export const MapMaybe_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      mapMaybe
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      배열을 매핑하면서 null/undefined 결과를 제거합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { mapMaybe } from 'fp-kit';

const users = [
  { id: 1, name: 'A' },
  { id: 2 },
  { id: 3, name: 'C' },
];

const names = mapMaybe((user: { name?: string }) => user.name)(users);
// ["A", "C"]`}
    />
  </div>
);
