import { CodeBlock } from '@/components/CodeBlock';

export const Throttle_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      throttle
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      함수 실행 빈도를 제한합니다. 처음에는 즉시 실행하고, 윈도우 안에서는 하나로 묶어 마지막 인자로 한 번 더 실행합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      throttle이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        throttle
      </strong>{' '}
      은 함수를 즉시 한 번 실행한 뒤, 지정한 시간(ms) 동안 추가 호출을 억제하고 윈도우가 끝날 때 최신 인자로 한 번 더 실행합니다.
      시그니처: <code>throttle(fn, ms)</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { throttle } from 'fp-kit';

const onScroll = throttle(() => {
  console.log('scroll event');
}, 200);

window.addEventListener('scroll', onScroll);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      최신 인자를 가진 trailing 호출
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { throttle } from 'fp-kit';

const log = throttle((value: number) => console.log(value), 100);

log(1);
log(2);
log(3); // 즉시 1, 100ms 후 3`}
    />
  </div>
);
