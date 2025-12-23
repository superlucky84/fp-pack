import { CodeBlock } from '@/components/CodeBlock';

export const Debounce_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      debounce
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      마지막 호출만 실행하는 디바운스
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      debounce란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        debounce
      </strong>{' '}
      는 일정 시간 동안 추가 호출이 없을 때 마지막 호출만 실행합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-kit';

const save = debounce((value: string) => {
  console.log('saving', value);
}, 300);

save('a');
save('ab');
save('abc');
// 300ms 후: saving abc`}
    />
  </div>
);
