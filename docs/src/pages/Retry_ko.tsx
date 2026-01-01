import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Retry_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      retry
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      실패한 비동기 작업을 시도 사이 선택적 지연과 함께 재시도
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      retry란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        retry
      </strong>{' '}
      는 비동기 함수를 실행하고 실패(에러를 던짐)하면 자동으로 재시도합니다. 최대 재시도 횟수가 모두 소진되면 마지막으로 발생한 에러를 던집니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      이는 네트워크 요청, 데이터베이스 작업 또는 일시적으로 실패할 수 있지만 재시도하면 성공할 수 있는 모든 비동기 작업에서 일시적인 실패를 처리하는 데 필수적입니다. 재시도 시도 사이에 지연을 선택적으로 지정할 수 있습니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function retry<T>(
  times: number,                    // 최대 재시도 시도 횟수
  fn: () => Promise<T>,             // 재시도할 비동기 함수
  delayMs?: number                  // 시도 사이 선택적 지연 (ms)
): Promise<T>`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. 단순 재시도
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

// 최대 3번까지 재시도
const data = await retry(3, async () => {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.json();
});

// 3번 시도가 모두 실패하면 마지막 에러가 던져짐`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. 지연이 있는 재시도
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

// 시도 사이 1초 지연으로 최대 5번까지 재시도
const result = await retry(
  5,
  async () => {
    const res = await fetch('/api/unstable-endpoint');
    if (!res.ok) throw new Error('Failed');
    return res.json();
  },
  1000  // 재시도 사이 1초 지연
);

// 타임라인:
// 시도 1: 실패 → 1초 대기
// 시도 2: 실패 → 1초 대기
// 시도 3: 성공 → 결과 반환`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. 탄력적인 API 호출
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      일시적인 네트워크 실패를 자동으로 처리:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function fetchUserData(userId: string) {
  return retry(
    3,  // 3번 시도
    async () => {
      const response = await fetch(\`/api/users/\${userId}\`);

      if (!response.ok) {
        throw new Error(\`사용자 가져오기 실패: \${response.statusText}\`);
      }

      return response.json();
    },
    500  // 재시도 사이 500ms 대기
  );
}

// 사용법
try {
  const user = await fetchUserData('user-123');
  console.log('사용자:', user);
} catch (error) {
  console.error('3번 재시도 후 실패:', error);
}

// 일시적인 네트워크 결함을 우아하게 처리`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. 재시도가 있는 데이터베이스 연결
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function connectToDatabase(config: DbConfig) {
  return retry(
    5,  // 5번 시도
    async () => {
      console.log('데이터베이스 연결 시도 중...');
      const connection = await db.connect(config);

      // 연결 테스트
      await connection.ping();

      return connection;
    },
    2000  // 시도 사이 2초 대기
  );
}

// 사용법
const db = await connectToDatabase({
  host: 'localhost',
  port: 5432,
  database: 'myapp'
});

// 데이터베이스가 일시적으로 사용 불가능한 경우 자동으로 재시도`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      3. 재시도가 있는 파일 업로드
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function uploadFile(file: File): Promise<string> {
  return retry(
    3,
    async () => {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(\`업로드 실패: \${response.status}\`);
      }

      const { url } = await response.json();
      return url;
    },
    1000
  );
}

// 사용법
const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

try {
  const uploadedUrl = await uploadFile(file);
  console.log('파일 업로드됨:', uploadedUrl);
} catch (error) {
  alert('3번 시도 후 업로드 실패. 다시 시도해주세요.');
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      4. 외부 서비스 통합
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function sendToSlack(message: string): Promise<void> {
  return retry(
    4,  // Slack이 불안정할 수 있으므로 4번 재시도
    async () => {
      const response = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: message })
      });

      if (!response.ok) {
        throw new Error(\`Slack API 에러: \${response.status}\`);
      }
    },
    3000  // 재시도 사이 3초 대기
  );
}

// 사용법
await sendToSlack('배포가 성공적으로 완료되었습니다! 🎉');

// Slack에 일시적인 문제가 있어도 메시지가 전달되도록 보장`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      5. 사용자 정의 에러 처리가 있는 재시도
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

class RetryableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RetryableError';
  }
}

async function processPayment(amount: number): Promise<string> {
  let attemptCount = 0;

  return retry(
    3,
    async () => {
      attemptCount++;
      console.log(\`결제 시도 \${attemptCount}/3\`);

      try {
        const response = await fetch('/api/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount })
        });

        const result = await response.json();

        // 특정 에러에 대해서만 재시도
        if (result.error === 'TEMPORARY_FAILURE') {
          throw new RetryableError('결제 게이트웨이가 일시적으로 사용 불가능');
        }

        // 영구 에러는 재시도하지 않음
        if (result.error === 'INSUFFICIENT_FUNDS') {
          throw new Error('잔액 부족 - 재시도하지 않음');
        }

        if (!result.success) {
          throw new RetryableError('결제 실패');
        }

        return result.transactionId;
      } catch (error) {
        // 재시도 트리거를 위해 다시 던지기
        throw error;
      }
    },
    2000
  );
}

// 사용법
try {
  const txId = await processPayment(99.99);
  console.log('결제 성공:', txId);
} catch (error) {
  if (error.message.includes('재시도하지 않음')) {
    console.error('영구 에러:', error);
  } else {
    console.error('재시도 후 실패:', error);
  }
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      6. 성공할 때까지 폴링
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

async function waitForJobToComplete(jobId: string): Promise<Job> {
  return retry(
    20,  // 최대 20번까지 폴링
    async () => {
      const response = await fetch(\`/api/jobs/\${jobId}\`);
      const job = await response.json();

      if (job.status === 'pending' || job.status === 'running') {
        // 여전히 처리 중 - 재시도를 위해 던지기
        throw new Error('작업이 아직 완료되지 않음');
      }

      if (job.status === 'failed') {
        // 영구 실패 - 재시도를 모두 소진
        throw new Error(\`작업 실패: \${job.error}\`);
      }

      // 성공!
      return job;
    },
    3000  // 3초마다 확인
  );
}

// 사용법
const job = await waitForJobToComplete('job-abc123');
console.log('작업 결과:', job.result);

// 3초마다 폴링, 최대 20번 (총 60초)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      7. 타임아웃과 결합
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { retry } from 'fp-pack';

// 타임아웃 래퍼 생성
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    )
  ]);
}

async function fetchWithRetryAndTimeout(url: string) {
  return retry(
    3,
    async () => {
      // 각 시도는 5초 타임아웃
      return withTimeout(
        fetch(url).then(r => r.json()),
        5000
      );
    },
    1000  // 재시도 사이 1초 대기
  );
}

// 사용법
try {
  const data = await fetchWithRetryAndTimeout('/api/slow-endpoint');
  console.log('데이터:', data);
} catch (error) {
  if (error.message === 'Timeout') {
    console.error('3번 시도 후 요청 시간 초과');
  } else {
    console.error('요청 실패:', error);
  }
}

// 각 시도: 최대 5초
// 재시도 포함: 3번 시도 × 5초 + 2초 지연 = 총 ~17초`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 retry를 사용하나요?
    </h2>

    <div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        1. 일시적인 실패에 대한 탄력성
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200">
        분산 시스템에서 흔한 일시적인 네트워크 문제, 서버 딸꾹질 및 기타 일시적인 실패를 자동으로 처리합니다. 수동 재시도 로직 없이 애플리케이션을 더 견고하게 만듭니다.
      </p>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
        2. 단순한 API
      </h3>
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200">
        이해하기 쉬운 깔끔하고 선언적인 구문입니다. 재시도 횟수와 선택적 지연만 지정하면 됩니다 - 복잡한 재시도 루프나 에러 처리 로직을 작성할 필요가 없습니다.
      </p>
    </div>

    <div class="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
        3. 구성 가능한 지연
      </h3>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200">
        재시도 사이의 선택적 지연은 어려움을 겪고 있는 서비스를 압도하는 것을 방지합니다. 원격 시스템이 다음 시도 전에 복구할 시간을 줍니다.
      </p>
    </div>

    <div class="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
        4. 예측 가능한 에러 처리
      </h3>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        모든 재시도가 소진된 후 마지막 에러를 던지므로 일관된 방식으로 실패를 쉽게 잡아 처리할 수 있습니다. 항상 무엇을 기대해야 하는지 알 수 있습니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>retry</strong>의 동작 방식을 단순화한 버전:
    </p>

    <CodeBlock
      language="typescript"
      code={`async function retry<T>(
  times: number,
  fn: () => Promise<T>,
  delayMs?: number
): Promise<T> {
  let lastError: Error;

  for (let attempt = 0; attempt < times; attempt++) {
    try {
      // 함수 실행 시도
      return await fn();
    } catch (error) {
      // 에러 저장
      lastError = error as Error;

      // 마지막 시도였다면 포기
      if (attempt === times - 1) {
        throw lastError;
      }

      // 재시도 전 대기 (지연이 지정된 경우)
      if (delayMs && delayMs > 0) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  // 이 라인은 절대 도달하지 않지만 TypeScript가 필요로 함
  throw lastError!;
}`}
    />

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 my-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        동작 원리:
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong>시도 루프:</strong> <code>times</code>번까지 함수 시도
        </li>
        <li>
          <strong>함수 실행:</strong> 각 시도마다 제공된 비동기 함수 호출
        </li>
        <li>
          <strong>성공 케이스:</strong> 함수가 성공하면 즉시 결과 반환
        </li>
        <li>
          <strong>실패 케이스:</strong> 함수가 던지면 에러를 잡아 저장
        </li>
        <li>
          <strong>재시도 로직:</strong> 마지막 시도가 아니면 <code>delayMs</code>만큼 대기한 후 (지정된 경우) 재시도
        </li>
        <li>
          <strong>최종 실패:</strong> 모든 시도가 실패하면 마지막으로 발생한 에러를 던짐
        </li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">retry</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/retry.ts"
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
        href="/async/delay"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/delay');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          delay →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          지정된 시간 후에 resolve되는 프로미스 생성
        </p>
      </a>

      <a
        href="/control/tryCatch"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/tryCatch');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          tryCatch →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          폴백 값으로 에러를 안전하게 처리
        </p>
      </a>

      <a
        href="/composition/pipeAsync"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipeAsync');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          pipeAsync →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          비동기 함수를 왼쪽에서 오른쪽으로 구성
        </p>
      </a>

      <a
        href="/async/debounce"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/debounce');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          debounce →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          호출이 지정된 시간 동안 중지될 때까지 실행 지연
        </p>
      </a>
    </div>
  </div>
);
