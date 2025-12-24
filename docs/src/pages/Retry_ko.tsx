import { CodeBlock } from '@/components/CodeBlock';

export const Retry_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      retry
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      비동기 함수를 지정 횟수만큼 재시도합니다 (커링 없음)
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      retry란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        retry
      </strong>{' '}
      는 비동기 함수를 실행하다 실패하면 최대 <code>times</code>회까지 다시 시도하고, 모두 실패하면 마지막 에러를 던집니다.
      시그니처: <code>retry(times, fn, delayMs?)</code>.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-kit';

await retry(3, async () => {
  const res = await fetch('/api');
  if (!res.ok) throw new Error('fail');
  return res.json();
}, 200); // 시도 사이 200ms 대기`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      timeout과 결합
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry, timeout } from 'fp-kit';

const fetchSafe = () =>
  retry(2, () => timeout(500, fetch('/api/data')), 100);

await fetchSafe();`}
    />
  </div>
);
