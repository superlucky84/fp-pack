import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Debounce_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      debounce
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      호출이 멈출 때까지 실행 지연
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      debounce란 무엇인가?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        debounce
      </strong>{' '}
      는 함수의 디바운스 버전을 생성하여, 마지막 호출 이후 지정된 대기 시간이 경과할 때까지 실행을 지연시킵니다.
      대기 기간 동안 마지막 호출만 실행됩니다.
      <br />
      <br />
      이는 <strong>검색 입력 최적화</strong>, <strong>자동 저장 기능</strong>,
      <strong>리사이즈/스크롤 이벤트 처리</strong>, 그리고 <strong>API 호출 속도 제한</strong>에 유용합니다.
      <br />
      <br />
      "사용자가 입력을 멈출 때까지 기다렸다가 이 작업을 실행하라"는 의미로 생각하면 됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

const searchApi = debounce((query: string) => {
  console.log('검색:', query);
  // API 호출
}, 300);

searchApi('h');     // 실행 안 됨
searchApi('he');    // 실행 안 됨
searchApi('hel');   // 실행 안 됨
searchApi('hell');  // 실행 안 됨
searchApi('hello'); // 더 이상 호출이 없으면 300ms 후 실행
// 로그: "검색: hello"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void;

// 함수와 밀리초 단위의 대기 시간을 받음
// 실행을 지연시키는 디바운스 버전을 반환
// 대기 기간 내 마지막 호출만 실행됨`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      간단한 디바운싱
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

// 저장 함수 디바운스
const saveData = debounce((data: string) => {
  console.log('저장 중:', data);
}, 500);

saveData('a');
saveData('ab');
saveData('abc');
// 500ms 후: "저장 중: abc" 로그

// 여러 매개변수와 함께 디바운스
const logValues = debounce((a: number, b: string) => {
  console.log('값:', a, b);
}, 300);

logValues(1, 'one');
logValues(2, 'two');
logValues(3, 'three');
// 300ms 후: "값: 3 three" 로그`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      이벤트 핸들러 디바운싱
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

// 입력 이벤트 디바운스
const handleInput = debounce((event: Event) => {
  const input = event.target as HTMLInputElement;
  console.log('사용자 입력:', input.value);
}, 300);

// input 요소에 연결
const inputElement = document.querySelector('input');
inputElement?.addEventListener('input', handleInput);

// 윈도우 리사이즈 디바운스
const handleResize = debounce(() => {
  console.log('윈도우 크기:', window.innerWidth, window.innerHeight);
}, 250);

window.addEventListener('resize', handleResize);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예시
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      검색 입력과 API 호출
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface SearchResult {
  id: number;
  title: string;
  description: string;
}

// 디바운스된 검색 함수
const performSearch = debounce(async (query: string) => {
  if (query.length < 2) return;

  try {
    const response = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
    const results: SearchResult[] = await response.json();

    console.log('검색 결과:', results);
    displayResults(results);
  } catch (error) {
    console.error('검색 실패:', error);
  }
}, 400);

// input 핸들러에서 사용
const searchInput = document.querySelector('#search') as HTMLInputElement;
searchInput?.addEventListener('input', (e) => {
  const query = (e.target as HTMLInputElement).value;
  performSearch(query);
});

function displayResults(results: SearchResult[]) {
  // 결과로 UI 업데이트
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      폼 데이터 자동 저장
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface FormData {
  title: string;
  content: string;
  lastModified: Date;
}

// 사용자가 입력을 멈춘 후 자동 저장
const autoSave = debounce(async (formData: FormData) => {
  console.log('자동 저장 중...');

  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        lastModified: new Date()
      })
    });

    console.log('자동 저장 성공');
    showSaveStatus('저장됨');
  } catch (error) {
    console.error('자동 저장 실패:', error);
    showSaveStatus('저장 실패');
  }
}, 2000); // 마지막 변경 후 2초 대기

// 사용법
const titleInput = document.querySelector('#title') as HTMLInputElement;
const contentInput = document.querySelector('#content') as HTMLTextAreaElement;

const handleChange = () => {
  autoSave({
    title: titleInput.value,
    content: contentInput.value,
    lastModified: new Date()
  });
};

titleInput?.addEventListener('input', handleChange);
contentInput?.addEventListener('input', handleChange);

function showSaveStatus(status: string) {
  // 저장 상태 표시 업데이트
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      윈도우 리사이즈 핸들러
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface ViewportDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

// 비용이 많이 드는 레이아웃 재계산
const recalculateLayout = debounce(() => {
  const dimensions: ViewportDimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
  };

  console.log('레이아웃 재계산:', dimensions);

  // 새 치수에 따라 레이아웃 업데이트
  updateResponsiveElements(dimensions);
  repositionComponents(dimensions);
  recalculateGridColumns(dimensions);
}, 150);

window.addEventListener('resize', recalculateLayout);

function updateResponsiveElements(dims: ViewportDimensions) {
  // UI 요소 업데이트
}

function repositionComponents(dims: ViewportDimensions) {
  // 뷰포트에 따라 재배치
}

function recalculateGridColumns(dims: ViewportDimensions) {
  // 그리드 레이아웃 조정
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      스크롤 이벤트 최적화
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

// 비용이 많이 드는 작업을 위한 디바운스된 스크롤 핸들러
const handleScroll = debounce(() => {
  const scrollPosition = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

  console.log(\`스크롤: \${scrollPercentage.toFixed(1)}%\`);

  // 스크롤 표시기 업데이트
  updateScrollIndicator(scrollPercentage);

  // 하단 근처면 추가 콘텐츠 로드
  if (scrollPercentage > 90) {
    loadMoreContent();
  }
}, 200);

window.addEventListener('scroll', handleScroll);

function updateScrollIndicator(percentage: number) {
  const indicator = document.querySelector('#scroll-indicator') as HTMLElement;
  if (indicator) {
    indicator.style.width = \`\${percentage}%\`;
  }
}

function loadMoreContent() {
  console.log('추가 콘텐츠 로딩...');
  // 추가 콘텐츠 가져오기 및 추가
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      폼 검증
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// API 확인을 포함한 디바운스된 이메일 검증
const validateEmail = debounce(async (email: string) => {
  const errors: string[] = [];

  // 클라이언트 측 검증
  if (!email.includes('@')) {
    errors.push('잘못된 이메일 형식');
  }

  if (email.length < 5) {
    errors.push('이메일이 너무 짧음');
  }

  // 서버 측 검증 (이메일 존재 확인)
  if (errors.length === 0) {
    try {
      const response = await fetch(\`/api/validate-email?email=\${encodeURIComponent(email)}\`);
      const result = await response.json();

      if (result.exists) {
        errors.push('이미 등록된 이메일');
      }
    } catch (error) {
      console.error('검증 오류:', error);
    }
  }

  const validationResult: ValidationResult = {
    valid: errors.length === 0,
    errors
  };

  displayValidationResult(validationResult);
  return validationResult;
}, 500);

const emailInput = document.querySelector('#email') as HTMLInputElement;
emailInput?.addEventListener('input', (e) => {
  const email = (e.target as HTMLInputElement).value;
  validateEmail(email);
});

function displayValidationResult(result: ValidationResult) {
  // 검증 오류로 UI 업데이트
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      라이브 미리보기 생성
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface MarkdownPreview {
  html: string;
  wordCount: number;
  readingTime: number;
}

// 디바운스된 마크다운 미리보기
const updatePreview = debounce((markdown: string) => {
  console.log('미리보기 생성 중...');

  // 마크다운 파싱 (비용이 많이 드는 작업)
  const html = parseMarkdown(markdown);
  const wordCount = countWords(markdown);
  const readingTime = Math.ceil(wordCount / 200); // 분당 200단어

  const preview: MarkdownPreview = {
    html,
    wordCount,
    readingTime
  };

  renderPreview(preview);
}, 300);

const markdownEditor = document.querySelector('#editor') as HTMLTextAreaElement;
markdownEditor?.addEventListener('input', (e) => {
  const content = (e.target as HTMLTextAreaElement).value;
  updatePreview(content);
});

function parseMarkdown(md: string): string {
  // 마크다운을 HTML로 변환
  return md.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
           .replace(/\\*(.+?)\\*/g, '<em>$1</em>');
}

function countWords(text: string): number {
  return text.split(/\\s+/).filter(word => word.length > 0).length;
}

function renderPreview(preview: MarkdownPreview) {
  // 미리보기 패널 업데이트
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 debounce를 사용하나요?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. 성능 최적화
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          빠른 이벤트가 안정될 때까지 기다려 비용이 많이 드는 작업의 수를 줄입니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. API 속도 제한
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          빠른 사용자 입력 중 과도한 API 호출을 방지하기 위해 일시 중지를 기다린 후 요청합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. 더 나은 사용자 경험
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          불쾌한 UI 업데이트를 피하고 사용자 작업에 더 부드럽고 의도적인 응답을 제공합니다.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. 리소스 절약
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          최종적이고 의미 있는 작업만 실행하여 CPU, 메모리, 네트워크 리소스를 절약합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <CodeBlock
      language="typescript"
      code={`function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    // 기존 타임아웃 제거
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // 새 타임아웃 설정
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, wait);
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>작동 방식:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>함수와 밀리초 단위의 대기 시간을 받습니다</li>
        <li>타임아웃 상태를 관리하는 새 함수를 반환합니다</li>
        <li>각 호출은 이전 타임아웃을 지웁니다 (있는 경우)</li>
        <li>대기 기간 후 함수를 실행하기 위한 새 타임아웃을 설정합니다</li>
        <li>대기 기간 내 마지막 호출만 실제로 실행됩니다</li>
        <li>나머지 매개변수를 사용하여 함수 인수를 보존합니다</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">debounce</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/debounce.ts"
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
        href="/async/throttle"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/throttle');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          throttle →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          간격당 최대 한 번 실행 - 보완적인 속도 제한 패턴입니다.
        </p>
      </a>

      <a
        href="/async/delay"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/delay');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          delay →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          지연된 프로미스 생성 - 더 간단한 시간 기반 유틸리티입니다.
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
          비동기 함수 조합 - 디바운스된 작업과 결합합니다.
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
          안전한 오류 처리 - 디바운스된 비동기 작업을 감쌉니다.
        </p>
      </a>
    </div>
  </div>
);
