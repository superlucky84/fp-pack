import { CodeBlock } from '@/components/CodeBlock';

export const Delay_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      delay
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      지정한 시간 후에 resolve되는 Promise를 만듭니다 (커링 없음)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      delay란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        delay
      </strong>{' '}
      는 지정된 밀리초가 지난 뒤 resolve되는 Promise를 반환합니다. <code>delay(ms)</code> 형태로 호출하고 <code>await</code>로 기다리면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-kit';

await delay(500); // 500ms 대기
console.log('done');`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      순차 호출에 간격 두기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-kit';

for (const id of [1, 2, 3]) {
  await delay(100);
  await fetchData(id);
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      비동기 파이프라인과 함께
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipeAsync } from 'fp-kit';

const fn = pipeAsync(
  async (v: number) => v + 1,
  async v => {
    await delay(200);
    return v * 2;
  }
);

fn(3); // ~200ms 후 8 반환`}
    />
  </div>
);
