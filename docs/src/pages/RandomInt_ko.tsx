import { CodeBlock } from '@/components/CodeBlock';

export const RandomInt_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      randomInt
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      두 숫자 사이의 랜덤 정수를 반환합니다 (양 끝 포함)
    </p>

    <CodeBlock
      language="typescript"
      code={`import { randomInt } from 'fp-kit';

randomInt(1, 5);    // 1..5
randomInt(1.2, 3);  // 2..3 (범위는 정수로 보정됨)`}
    />
  </div>
);
