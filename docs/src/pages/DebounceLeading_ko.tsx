import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const DebounceLeading_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      debounceLeading
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      즉시 실행한 후, 지정된 시간 동안 호출 무시
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      debounceLeading이란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        debounceLeading
      </strong>{' '}
      는 함수의 디바운스 버전을 생성하여, 첫 번째 호출에서 즉시 실행한 다음,
      첫 호출 이후 지정된 대기 시간이 지날 때까지 모든 후속 호출을 무시합니다.
      조용한 기간을 기다리는 일반 debounce와 달리, debounceLeading은 즉각적인 피드백을 제공합니다.
      <br />
      <br />
      이는 <strong>버튼 클릭 방지</strong>, <strong>폼 제출 보호</strong>,
      <strong>즉각적인 사용자 피드백</strong>, 그리고 <strong>중복 요청 방지</strong>에 유용합니다.
      <br />
      <br />
      "이 작업을 지금 바로 실행하되, 다음 X밀리초 동안 스팸을 방지하라"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

const handleSubmit = debounceLeading(() => {
  console.log('폼 제출됨');
  // 서버에 폼 제출
}, 1000);

handleSubmit(); // 즉시 실행: "폼 제출됨"
handleSubmit(); // 무시 (1000ms 이내)
handleSubmit(); // 무시 (1000ms 이내)
// 1000ms 후, 다음 호출이 다시 실행됨`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function debounceLeading<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void;

// 함수와 밀리초 단위의 대기 시간을 받음
// 선행 엣지에서 실행되는 디바운스 버전을 반환
// 첫 호출은 즉시 실행되고, 대기 기간 동안 후속 호출은 무시됨`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 선행 디바운스
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

// 즉시 실행되는 간단한 액션
const logAction = debounceLeading((action: string) => {
  console.log('액션:', action);
}, 500);

logAction('click');    // 즉시 로그: "액션: click"
logAction('click');    // 무시
logAction('click');    // 무시
// 500ms 후, 다음 호출이 다시 즉시 실행됨

// 버튼 클릭 핸들러
const handleClick = debounceLeading((event: MouseEvent) => {
  console.log('버튼 클릭 위치:', event.clientX, event.clientY);
}, 1000);

button.addEventListener('click', handleClick);
// 첫 클릭은 즉시 실행됨
// 1초 이내의 후속 클릭은 무시됨`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      빠른 제출 방지
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

// 폼이 여러 번 제출되는 것을 방지
const submitForm = debounceLeading((formData: FormData) => {
  console.log('폼 제출 중...');
  // 서버로 전송
}, 2000);

// 사용자가 제출 버튼을 여러 번 클릭
submitForm(data); // 즉시 실행
submitForm(data); // 무시
submitForm(data); // 무시
// 2초 후, 다음 제출이 허용됨`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      폼 제출 보호
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface FormData {
  email: string;
  password: string;
}

// 로그인 폼의 중복 제출 방지
const submitLogin = debounceLeading(async (data: FormData) => {
  console.log('로그인 시도 중...');

  // 로딩 상태 표시
  setLoading(true);

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      console.log('로그인 성공');
      redirectToHome();
    } else {
      showError(result.message);
    }
  } catch (error) {
    console.error('로그인 실패:', error);
    showError('네트워크 오류가 발생했습니다');
  } finally {
    setLoading(false);
  }
}, 2000); // 2초 동안 재제출 방지

// 폼에 연결
const loginForm = document.querySelector('#login-form');
loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  submitLogin({
    email: formData.get('email') as string,
    password: formData.get('password') as string
  });
});

function setLoading(loading: boolean) {
  // UI 업데이트
}

function showError(message: string) {
  // 오류 표시
}

function redirectToHome() {
  // 홈 페이지로 이동
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      버튼 클릭 방지
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

// 액션 버튼의 빠른 클릭 방지
const handleLike = debounceLeading(async (postId: number) => {
  console.log('게시물 좋아요:', postId);

  try {
    await fetch(\`/api/posts/\${postId}/like\`, { method: 'POST' });

    // UI 업데이트
    updateLikeCount(postId);
    animateLikeButton(postId);
  } catch (error) {
    console.error('좋아요 실패:', error);
  }
}, 1000);

const handleShare = debounceLeading(async (postId: number) => {
  console.log('게시물 공유:', postId);

  try {
    await fetch(\`/api/posts/\${postId}/share\`, { method: 'POST' });

    showShareDialog(postId);
  } catch (error) {
    console.error('공유 실패:', error);
  }
}, 800);

// 버튼에 연결
document.querySelectorAll('.like-button').forEach(button => {
  button.addEventListener('click', (e) => {
    const postId = parseInt((e.target as HTMLElement).dataset.postId || '0');
    handleLike(postId);
  });
});

function updateLikeCount(postId: number) {
  // UI에서 좋아요 수 업데이트
}

function animateLikeButton(postId: number) {
  // 버튼 애니메이션
}

function showShareDialog(postId: number) {
  // 공유 대화상자 표시
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API 요청 중복 제거
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface RefreshOptions {
  force?: boolean;
  silent?: boolean;
}

// 여러 동시 새로고침 요청 방지
const refreshData = debounceLeading(async (options: RefreshOptions = {}) => {
  console.log('데이터 새로고침 중...');

  if (!options.silent) {
    showLoadingIndicator();
  }

  try {
    const response = await fetch('/api/data/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ force: options.force })
    });

    const data = await response.json();

    updateDataStore(data);
    console.log('데이터 새로고침 성공');
  } catch (error) {
    console.error('데이터 새로고침 실패:', error);
    showErrorMessage('데이터 새로고침 실패');
  } finally {
    if (!options.silent) {
      hideLoadingIndicator();
    }
  }
}, 5000); // 5초에 한 번만 새로고침 허용

// 여러 트리거 - 첫 번째만 실행
document.querySelector('#refresh-button')?.addEventListener('click', () => {
  refreshData();
});

window.addEventListener('focus', () => {
  refreshData({ silent: true });
});

// 재연결 시
window.addEventListener('online', () => {
  refreshData({ force: true });
});

function showLoadingIndicator() {
  // 로딩 표시
}

function hideLoadingIndicator() {
  // 로딩 숨김
}

function updateDataStore(data: any) {
  // 앱 상태 업데이트
}

function showErrorMessage(message: string) {
  // 오류 표시
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      네비게이션 보호
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface NavigationOptions {
  route: string;
  params?: Record<string, string>;
  replace?: boolean;
}

// 문제를 일으킬 수 있는 빠른 네비게이션 방지
const navigateTo = debounceLeading((options: NavigationOptions) => {
  console.log('이동:', options.route);

  const url = new URL(options.route, window.location.origin);

  if (options.params) {
    Object.entries(options.params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  if (options.replace) {
    window.history.replaceState(null, '', url);
  } else {
    window.history.pushState(null, '', url);
  }

  // 라우트 변경 트리거
  dispatchNavigationEvent(options.route);
}, 300);

// 사용법
const handleLinkClick = (route: string) => {
  navigateTo({ route });
};

// 빠른 클릭으로 인한 중복 네비게이션 방지
document.querySelectorAll('a[data-route]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const route = (e.target as HTMLElement).dataset.route || '/';
    handleLinkClick(route);
  });
});

function dispatchNavigationEvent(route: string) {
  window.dispatchEvent(new CustomEvent('navigate', { detail: { route } }));
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      게임 입력 처리
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface PlayerAction {
  type: 'jump' | 'shoot' | 'reload';
  timestamp: number;
}

// 게임에서 버튼 연타 방지
const handleJump = debounceLeading(() => {
  console.log('플레이어 점프');

  // 점프 액션 실행
  player.jump();
  playJumpAnimation();
  playJumpSound();
}, 500); // 점프 간 최소 500ms

const handleShoot = debounceLeading(() => {
  console.log('플레이어 사격');

  if (player.ammo > 0) {
    player.shoot();
    playShootAnimation();
    playShootSound();
    player.ammo--;
  } else {
    playEmptySound();
  }
}, 200); // 사격 간 최소 200ms

const handleReload = debounceLeading(() => {
  console.log('플레이어 재장전');

  if (player.ammo < player.maxAmmo) {
    player.reload();
    playReloadAnimation();
    playReloadSound();
  }
}, 2000); // 2초 재장전 시간

// 키보드 컨트롤
window.addEventListener('keydown', (e) => {
  switch (e.code) {
    case 'Space':
      handleJump();
      break;
    case 'KeyF':
      handleShoot();
      break;
    case 'KeyR':
      handleReload();
      break;
  }
});

const player = {
  ammo: 10,
  maxAmmo: 30,
  jump() { /* 점프 로직 */ },
  shoot() { /* 사격 로직 */ },
  reload() {
    this.ammo = this.maxAmmo;
  }
};

function playJumpAnimation() { /* 애니메이션 */ }
function playJumpSound() { /* 사운드 */ }
function playShootAnimation() { /* 애니메이션 */ }
function playShootSound() { /* 사운드 */ }
function playReloadAnimation() { /* 애니메이션 */ }
function playReloadSound() { /* 사운드 */ }
function playEmptySound() { /* 사운드 */ }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      다운로드/내보내기 액션
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface ExportOptions {
  format: 'csv' | 'json' | 'pdf';
  filename: string;
}

// 여러 동시 내보내기 요청 방지
const exportData = debounceLeading(async (options: ExportOptions) => {
  console.log(\`\${options.format}로 데이터 내보내는 중...\`);

  showExportProgress();

  try {
    const response = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });

    const blob = await response.blob();

    // 다운로드 링크 생성
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`\${options.filename}.\${options.format}\`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('내보내기 성공');
    showSuccessMessage('파일이 성공적으로 다운로드되었습니다');
  } catch (error) {
    console.error('내보내기 실패:', error);
    showErrorMessage('내보내기 실패. 다시 시도해주세요.');
  } finally {
    hideExportProgress();
  }
}, 3000); // 3초 이내 내보내기 방지

// 내보내기 버튼 핸들러
document.querySelector('#export-csv')?.addEventListener('click', () => {
  exportData({ format: 'csv', filename: 'data-export' });
});

document.querySelector('#export-json')?.addEventListener('click', () => {
  exportData({ format: 'json', filename: 'data-export' });
});

document.querySelector('#export-pdf')?.addEventListener('click', () => {
  exportData({ format: 'pdf', filename: 'data-export' });
});

function showExportProgress() {
  // 진행률 표시기 표시
}

function hideExportProgress() {
  // 진행률 표시기 숨김
}

function showSuccessMessage(message: string) {
  // 성공 토스트 표시
}

function showErrorMessage(message: string) {
  // 오류 토스트 표시
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 debounceLeading을 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 즉각적인 사용자 피드백
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          첫 호출에서 즉시 액션을 실행하여 지연 없이 사용자에게 즉각적인 피드백을 제공합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. 중복 액션 방지
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          우발적인 더블 클릭, 빠른 버튼 누름, 중복 API 요청으로부터 보호합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 비활성화보다 나은 방법
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          버튼을 수동으로 비활성화/활성화하는 것보다 간단하며, 자동 쿨다운 관리를 제공합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 리소스 보호
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          반응형 UI를 유지하면서 연발 요청으로 인한 서버 과부하를 방지합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function debounceLeading<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let canExecute = true;

  return (...args: Parameters<T>) => {
    // 실행 가능하면 즉시 실행
    if (canExecute) {
      fn(...args);
      canExecute = false;

      // 실행 권한을 재설정하기 위한 타임아웃 설정
      timeoutId = setTimeout(() => {
        canExecute = true;
        timeoutId = null;
      }, wait);
    }
    // 그렇지 않으면 호출 무시
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>함수와 밀리초 단위의 대기 시간을 받습니다</li>
        <li>실행 허용 여부를 추적하는 플래그를 유지합니다</li>
        <li>첫 호출에서 즉시 실행하고 플래그를 false로 설정합니다</li>
        <li>대기 기간 동안의 후속 호출은 무시됩니다</li>
        <li>대기 기간이 만료되면 플래그를 재설정하여 다음 실행을 허용합니다</li>
        <li>나머지 매개변수를 사용하여 함수 인수를 보존합니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">debounceLeading</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/debounceLeading.ts"
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
        href="/async/debounce"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/debounce');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          debounce →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          후행 엣지에서 실행 - 실행 전 조용한 기간을 기다립니다.
        </p>
      </a>

      <a
        href="/async/throttle"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/throttle');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          throttle →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          정기적인 간격으로 실행 - 유사한 속도 제한 접근입니다.
        </p>
      </a>

      <a
        href="/async/delay"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/delay');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-green-600 dark:text-green-400 mb-2">
          delay →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          지연된 프로미스 생성 - 더 간단한 시간 기반 유틸리티입니다.
        </p>
      </a>

      <a
        href="/control/tryCatch"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/control/tryCatch');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-orange-600 dark:text-orange-400 mb-2">
          tryCatch →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          안전한 오류 처리 - 안전을 위해 디바운스된 작업을 감쌉니다.
        </p>
      </a>
    </div>
  </div>
);
