import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Delay_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      delay
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      지정된 시간 후에 resolve되는 프로미스 생성
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      delay란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        delay
      </strong>{' '}
      는 지정된 밀리초 후에 resolve되는 프로미스를 생성합니다. <code>setTimeout</code>의 비동기 버전으로, <code>async/await</code> 문법과 완벽하게 작동하도록 설계되었습니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      콜백이 필요한 <code>setTimeout</code>과 달리, <code>delay</code>는 await할 수 있는 프로미스를 반환하여 비동기 워크플로우에서 일시 정지 생성, 속도 제한, 간격 폴링, 백오프 전략 구현에 완벽합니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function delay(ms: number): Promise<void>`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. 단순 지연
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function example() {
  console.log('시작');
  await delay(1000); // 1초 대기
  console.log('1초 후');
}

// 출력:
// "시작"
// ... 1초 일시 정지 ...
// "1초 후"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. API 호출 속도 제한
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function fetchMultiplePages(pageIds: number[]) {
  const results = [];

  for (const pageId of pageIds) {
    const data = await fetch(\`/api/page/\${pageId}\`);
    results.push(data);

    // 속도 제한을 피하기 위해 요청 사이 100ms 대기
    await delay(100);
  }

  return results;
}

// 각 요청 사이 100ms 간격으로 페이지 가져오기`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. 간격 폴링
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      조건이 충족될 때까지 리소스 폴링:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function waitForJobCompletion(jobId: string): Promise<Job> {
  const maxAttempts = 30;
  const pollInterval = 2000; // 2초

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const job = await fetchJob(jobId);

    if (job.status === 'completed') {
      return job;
    }

    if (job.status === 'failed') {
      throw new Error(\`작업 \${jobId} 실패\`);
    }

    // 다음 폴링 전 대기
    await delay(pollInterval);
  }

  throw new Error(\`작업 \${jobId}이(가) \${maxAttempts}번 시도 후 시간 초과\`);
}

// 사용법
const job = await waitForJobCompletion('job-123');
console.log('작업 완료:', job.result);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. 애니메이션 시퀀싱
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function animateSequence(element: HTMLElement) {
  // 페이드 인
  element.style.opacity = '0';
  element.style.transition = 'opacity 0.3s';
  await delay(10); // CSS 적용 대기
  element.style.opacity = '1';

  await delay(300); // 페이드 인 대기

  // 확대
  element.style.transform = 'scale(1.1)';
  await delay(200);

  // 축소
  element.style.transform = 'scale(1)';
  await delay(200);

  console.log('애니메이션 완료');
}

// 지연을 사용한 부드럽고 순차적인 애니메이션`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      3. 지수 백오프로 재시도
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function fetchWithBackoff<T>(
  fetchFn: () => Promise<T>,
  maxRetries: number = 3
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fetchFn();
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        throw lastError;
      }

      // 지수 백오프: 1초, 2초, 4초, 8초...
      const backoffTime = Math.pow(2, attempt) * 1000;
      console.log(\`\${backoffTime}ms 후 재시도 \${attempt + 1}\`);
      await delay(backoffTime);
    }
  }

  throw lastError!;
}

// 사용법
const data = await fetchWithBackoff(() => fetch('/api/data').then(r => r.json()));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      4. 로딩 상태 시뮬레이션
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function loadDataWithMinimumLoadingTime<T>(
  fetchFn: () => Promise<T>,
  minLoadingMs: number = 500
): Promise<T> {
  const startTime = Date.now();

  // 데이터 가져오기
  const data = await fetchFn();

  // 최소 시간에 도달하기 위한 남은 시간 계산
  const elapsed = Date.now() - startTime;
  const remaining = minLoadingMs - elapsed;

  // 너무 빠르면 로딩 인디케이터 표시를 위해 지연
  if (remaining > 0) {
    await delay(remaining);
  }

  return data;
}

// 로딩 스피너가 최소 500ms 동안 표시되도록 보장
// 빠른 응답에 대한 불편한 깜빡임 방지
const user = await loadDataWithMinimumLoadingTime(() => fetchUser(userId));`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      5. 타이핑 효과
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function typewriterEffect(
  element: HTMLElement,
  text: string,
  delayPerChar: number = 50
): Promise<void> {
  element.textContent = '';

  for (const char of text) {
    element.textContent += char;
    await delay(delayPerChar);
  }
}

// 사용법
const messageEl = document.querySelector('#message')!;
await typewriterEffect(messageEl, '안녕하세요!', 100);
// 문자가 100ms 지연으로 하나씩 나타남`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      6. 지연이 있는 배치 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

async function processBatch<T, R>(
  items: T[],
  batchSize: number,
  batchDelayMs: number,
  processor: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);

    // 배치를 병렬로 처리
    const batchResults = await Promise.all(
      batch.map(item => processor(item))
    );

    results.push(...batchResults);

    // 배치 사이 지연 (마지막 배치 후 제외)
    if (i + batchSize < items.length) {
      await delay(batchDelayMs);
    }
  }

  return results;
}

// 100개 항목을 10개씩 배치로 처리, 배치 사이 1초 지연
const userIds = Array.from({ length: 100 }, (_, i) => i + 1);
const users = await processBatch(
  userIds,
  10,
  1000,
  async (id) => fetchUser(id)
);`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      7. 디바운스된 저장
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { delay } from 'fp-pack';

class AutoSaver {
  private saveTimeout: ReturnType<typeof setTimeout> | null = null;
  private pendingSave: Promise<void> | null = null;

  async scheduleSave(data: any, delayMs: number = 1000): Promise<void> {
    // 이전 예약된 저장 취소
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }

    // 보류 중인 저장이 완료되기를 대기
    if (this.pendingSave) {
      await this.pendingSave;
    }

    // 새 저장 예약
    this.pendingSave = delay(delayMs).then(() => {
      return this.save(data);
    });

    return this.pendingSave;
  }

  private async save(data: any): Promise<void> {
    console.log('저장 중:', data);
    await fetch('/api/save', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

const saver = new AutoSaver();
saver.scheduleSave({ title: '초안 1' }); // 취소됨
saver.scheduleSave({ title: '초안 2' }); // 취소됨
saver.scheduleSave({ title: '초안 3' }); // 1초 후 저장됨`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 delay를 사용하나요?
    </h2>

    <div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        1. 프로미스 기반 API
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200">
        async/await 문법과 완벽하게 작동하여 콜백 지옥을 제거하고 비동기 코드를 동기 코드처럼 읽기 쉽게 만듭니다. setTimeout을 수동으로 프로미스로 감싸는 것보다 훨씬 깔끔합니다.
      </p>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
        2. 조합 가능
      </h3>
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200">
        await, Promise.all, Promise.race 또는 비동기 파이프라인을 사용하여 다른 비동기 작업과 쉽게 결합할 수 있습니다. 명확한 제어 흐름으로 복잡한 비동기 워크플로우를 구축하는 데 완벽합니다.
      </p>
    </div>

    <div class="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
        3. 속도 제한 및 백오프
      </h3>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200">
        속도 제한, 지수 백오프, 폴링 간격 및 기타 타이밍 기반 패턴을 구현하는 데 필수적입니다. API를 압도하는 것을 방지하고 비동기 작업의 신뢰성을 향상시킵니다.
      </p>
    </div>

    <div class="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
        4. 단순하고 읽기 쉬움
      </h3>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        정확히 그 이름이 말하는 것을 하는 하나의 함수 호출입니다. 구성이나 숨겨진 동작이 없습니다. 단순함으로 인해 코드를 이해하고 유지 관리하기가 더 쉽습니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>delay</strong>의 내부 동작 방식:
    </p>

    <CodeBlock
      language="typescript"
      code={`function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

// 프로미스를 반환하는 setTimeout의 간단한 래퍼
// 타이머가 만료되면 프로미스가 resolve됨`}
    />

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 my-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        동작 원리:
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong>프로미스 생성:</strong> setTimeout을 감싸는 새 프로미스 생성
        </li>
        <li>
          <strong>타이머 설정:</strong> setTimeout이 ms 밀리초 후에 resolve 콜백이 실행되도록 예약
        </li>
        <li>
          <strong>논블로킹:</strong> 즉시 반환하여 다른 코드가 실행될 수 있도록 함
        </li>
        <li>
          <strong>해결:</strong> 지정된 시간 후 프로미스가 void로 resolve됨
        </li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">delay</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/delay.ts"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
    >
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      GitHub에서 보기
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      관련 함수
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/async/retry"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/retry');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          retry →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          시도 사이 선택적 지연으로 비동기 작업 재시도
        </p>
      </a>

      <a
        href="/async/debounce"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/debounce');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          debounce →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          호출이 지정된 시간 동안 중지될 때까지 실행 지연
        </p>
      </a>

      <a
        href="/async/throttle"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/throttle');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          throttle →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          시간당 최대 한 번으로 실행 빈도 제한
        </p>
      </a>

      <a
        href="/composition/pipeAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          pipeAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          비동기 함수를 왼쪽에서 오른쪽으로 구성
        </p>
      </a>
    </div>
  </div>
);
