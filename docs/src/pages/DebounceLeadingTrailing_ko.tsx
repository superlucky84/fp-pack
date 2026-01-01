import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const DebounceLeadingTrailing_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      debounceLeadingTrailing
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      첫 호출은 즉시 실행하고, 마지막 값으로 한 번 더 실행하는 디바운스
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      debounceLeadingTrailing이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        debounceLeadingTrailing
      </strong>{' '}
      은{' '}
      <strong class="font-semibold">debounceLeading</strong>과{' '}
      <strong class="font-semibold">debounce</strong>의 장점을 결합한 함수입니다. 첫 호출을 즉시 실행하여 즉각적인 피드백을 제공하고, 연속 호출이 끝난 후 마지막 값으로 한 번 더 실행합니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      이 패턴은 <strong>즉각적인 사용자 피드백</strong>(예: 로딩 인디케이터 시작)과 <strong>최종 상태 동기화</strong>(예: 최종 검색 쿼리 실행)가 모두 필요한 경우에 이상적입니다.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      타입 시그니처
    </h2>

    <CodeBlock
      language="typescript"
      code={`function debounceLeadingTrailing<T extends (...args: any[]) => any>(
  fn: T,              // 디바운스할 함수
  wait: number        // 지연 시간 (밀리초)
): (...args: Parameters<T>) => void`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. 기본적인 Leading+Trailing 디바운스
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-pack';

const log = debounceLeadingTrailing((value: string) => {
  console.log('값:', value);
}, 300);

log('a'); // 즉시 실행: "값: a"
log('b'); // 무시됨 (300ms 이내)
log('c'); // 무시됨 (300ms 이내)
// 300ms 후: "값: c" (마지막 값으로 실행)

// 타임라인:
// 0ms:   log('a') → 즉시 실행
// 50ms:  log('b') → 무시
// 100ms: log('c') → 무시
// 400ms: → 'c'로 실행 (마지막 호출 후 300ms)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. 즉각적인 피드백이 있는 검색
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-pack';

const search = debounceLeadingTrailing((query: string) => {
  if (!isSearching) {
    // 첫 호출: 로딩 표시
    setIsSearching(true);
  } else {
    // 마지막 호출: 검색 실행
    performSearch(query);
    setIsSearching(false);
  }
}, 500);

// 사용자가 "react hooks" 입력
search('r');      // 즉시 로딩 표시
search('re');     // 무시
search('rea');    // 무시
search('reac');   // 무시
search('react');  // 무시
search('react '); // 무시
search('react h'); // 무시
// 500ms 후: "react hooks"로 검색 실행`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      1. 미리보기가 있는 범위 슬라이더
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      사용자가 드래그를 시작하면 즉시 UI를 업데이트하고, 완료되면 서버에 저장:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-pack';

let isFirstCall = true;

const handleVolumeChange = debounceLeadingTrailing((volume: number) => {
  if (isFirstCall) {
    // 첫 호출: UI 즉시 업데이트
    updateVolumeDisplay(volume);
    isFirstCall = false;
  } else {
    // 마지막 호출: 서버에 저장
    saveVolumePreference(volume);
    isFirstCall = true;
  }
}, 500);

// 사용자가 슬라이더 드래그
sliderInput.addEventListener('input', (e) => {
  const volume = parseInt(e.target.value);
  audioElement.volume = volume / 100; // 오디오 즉시 업데이트
  handleVolumeChange(volume);         // 디바운스된 UI 업데이트 + 저장
});

// 결과:
// - 볼륨이 즉시 변경됨 (오디오 재생)
// - UI 피드백이 즉시 나타남 (첫 호출)
// - 서버 저장은 사용자가 조정을 마친 후에만 발생 (마지막 호출)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      2. 자동 저장이 있는 라이브 에디터
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      사용자가 입력을 시작하면 즉시 미리보기를 표시하고, 일시 정지하면 초안 저장:
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-pack';

let isEditing = false;

const handleContentChange = debounceLeadingTrailing((content: string) => {
  if (!isEditing) {
    // 첫 호출: 편집 인디케이터 표시
    setEditingIndicator(true);
    updatePreview(content);
    isEditing = true;
  } else {
    // 마지막 호출: 초안 저장
    saveDraft(content);
    setEditingIndicator(false);
    isEditing = false;
  }
}, 1000);

editorTextarea.addEventListener('input', (e) => {
  handleContentChange(e.target.value);
});

// 사용자가 "안녕하세요" 입력
// - 첫 키 입력: 미리보기 업데이트 + 편집 인디케이터 표시
// - 입력 중: 미리보기 계속 업데이트 (애플리케이션 레벨)
// - 마지막 키 입력 후 1초: 초안 저장`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      3. 히스토리가 있는 캔버스 그리기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-pack';

let isDrawing = false;

const handleDrawingChange = debounceLeadingTrailing((canvasData: ImageData) => {
  if (!isDrawing) {
    // 첫 호출: 그리기 세션 시작 표시
    startDrawingSession();
    isDrawing = true;
  } else {
    // 마지막 호출: 실행 취소 히스토리에 저장
    saveToHistory(canvasData);
    isDrawing = false;
  }
}, 800);

canvas.addEventListener('mousemove', (e) => {
  if (e.buttons === 1) { // 마우스가 눌려있으면
    const imageData = drawBrushStroke(e.x, e.y);
    handleDrawingChange(imageData);
  }
});

// 결과:
// - 캔버스에 즉시 그림이 그려짐
// - 첫 획이 세션 시작을 표시
// - 히스토리 스냅샷은 사용자가 그리기를 멈췄을 때만 저장`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      4. 로딩 상태가 있는 검색
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-pack';

let searchState = 'idle';

const performSearch = debounceLeadingTrailing(async (query: string) => {
  if (searchState === 'idle') {
    // 첫 호출: 로딩 표시
    searchState = 'loading';
    setLoadingIndicator(true);
  } else {
    // 마지막 호출: 검색 실행
    try {
      const results = await searchAPI(query);
      displayResults(results);
    } catch (error) {
      showError(error);
    } finally {
      setLoadingIndicator(false);
      searchState = 'idle';
    }
  }
}, 500);

searchInput.addEventListener('input', (e) => {
  performSearch(e.target.value);
});

// 사용자가 "typescript" 입력
// 즉시: 로딩 스피너 표시
// 500ms 후: "typescript"로 API 호출
// 장점: 즉각적인 피드백 + API 호출 감소`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      5. 클라이언트 + 서버 업데이트가 있는 필터 UI
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-pack';

let filterState = 'ready';

const applyFilter = debounceLeadingTrailing((filters: FilterOptions) => {
  if (filterState === 'ready') {
    // 첫 호출: 클라이언트 측 필터 즉시 적용
    const cachedResults = filterCachedData(filters);
    displayResults(cachedResults);
    filterState = 'filtering';
  } else {
    // 마지막 호출: 서버에서 가져오기
    fetchFilteredData(filters).then((results) => {
      displayResults(results);
      filterState = 'ready';
    });
  }
}, 600);

filterForm.addEventListener('change', () => {
  const filters = getFormValues();
  applyFilter(filters);
});

// 사용자가 여러 필터 조정:
// 첫 변경: 캐시된 결과가 즉시 표시됨
// 마지막 변경 (600ms 후): 서버에서 새 데이터 로드`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      6. 레이아웃 재계산이 있는 창 크기 조정
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeadingTrailing } from 'fp-pack';

let resizePhase = 'start';

const handleResize = debounceLeadingTrailing(() => {
  if (resizePhase === 'start') {
    // 첫 호출: 크기 조정 인디케이터 표시
    showResizeIndicator();
    quickLayoutAdjust(); // 빠른 대략적 레이아웃
    resizePhase = 'resizing';
  } else {
    // 마지막 호출: 전체 재계산
    fullLayoutRecalculation();
    optimizeImages();
    hideResizeIndicator();
    resizePhase = 'start';
  }
}, 300);

window.addEventListener('resize', handleResize);

// 사용자가 창 크기 조정:
// - 즉시: 크기 조정 인디케이터 + 빠른 레이아웃
// - 300ms 후: 전체 재계산 + 이미지 최적화`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      왜 debounceLeadingTrailing을 사용하나요?
    </h2>

    <div class="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
        1. 양쪽의 장점
      </h3>
      <p class="text-sm md:text-base text-blue-800 dark:text-blue-200">
        즉각적인 피드백(leading edge)과 최종 상태 동기화(trailing edge)를 결합합니다. 사용자는 즉각적인 응답을 받으면서, 최종 상태가 정확하게 유지됩니다.
      </p>
    </div>

    <div class="bg-purple-50 dark:bg-purple-900/10 border-l-4 border-purple-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">
        2. 성능 최적화
      </h3>
      <p class="text-sm md:text-base text-purple-800 dark:text-purple-200">
        비용이 많이 드는 작업(API 호출, 데이터베이스 저장)을 단 두 번으로 줄입니다: 시작 시 한 번, 끝날 때 한 번. 중간의 모든 호출은 무시되어 리소스를 절약하면서도 반응성을 유지합니다.
      </p>
    </div>

    <div class="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
        3. 향상된 사용자 경험
      </h3>
      <p class="text-sm md:text-base text-green-800 dark:text-green-200">
        사용자는 작업을 시작할 때 즉각적인 피드백을 보고, 시스템은 정확한 결과로 마무리합니다. 이 패턴은 자연스럽고 반응적으로 느껴집니다.
      </p>
    </div>

    <div class="bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 p-6 my-6">
      <h3 class="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
        4. 상태 관리 단순화
      </h3>
      <p class="text-sm md:text-base text-orange-800 dark:text-orange-200">
        복잡한 상태 추적 없이 빠른 사용자 상호작용에서 "시작"과 "종료" 이벤트를 쉽게 처리할 수 있습니다. 이 패턴은 로딩 상태, 진행 인디케이터, 최종 동기화를 자연스럽게 처리합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      구현 세부사항
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong>debounceLeadingTrailing</strong>의 내부 동작 방식:
    </p>

    <CodeBlock
      language="typescript"
      code={`function debounceLeadingTrailing<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let isFirstCall = true;

  return (...args: Parameters<T>) => {
    // 첫 호출이면 즉시 실행
    if (isFirstCall) {
      fn(...args);
      isFirstCall = false;
    }

    // 기존 타임아웃 제거
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // trailing 실행을 위한 새 타임아웃 설정
    timeoutId = setTimeout(() => {
      fn(...args);           // 마지막 인자로 실행
      timeoutId = null;
      isFirstCall = true;    // 다음 버스트를 위해 리셋
    }, wait);
  };
}`}
    />

    <div class="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 my-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
        동작 원리:
      </h3>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>
          <strong>첫 호출 감지:</strong> <code>isFirstCall</code> 플래그를 사용하여 버스트의 첫 호출인지 추적
        </li>
        <li>
          <strong>즉시 실행:</strong> 첫 호출이면 함수를 즉시 실행
        </li>
        <li>
          <strong>타임아웃 리셋:</strong> 기존 타임아웃을 제거하여 대기 시간 재시작
        </li>
        <li>
          <strong>Trailing 실행:</strong> 마지막 인자로 실행할 새 타임아웃 설정
        </li>
        <li>
          <strong>상태 리셋:</strong> trailing 실행 후 다음 버스트를 위해 플래그 리셋
        </li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">debounceLeadingTrailing</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/async/debounceLeadingTrailing.ts"
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
        class="block p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/debounce');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          debounce
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          버스트 후 마지막 호출만 실행 (trailing edge만)
        </p>
      </a>

      <a
        class="block p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/debounceLeading');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          debounceLeading
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          버스트의 첫 호출만 실행 (leading edge만)
        </p>
      </a>

      <a
        class="block p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/throttle');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          throttle
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          일정 시간당 최대 한 번만 실행
        </p>
      </a>

      <a
        class="block p-6 bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/async/delay');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          delay
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          지정된 시간 후에 resolve되는 프로미스 생성
        </p>
      </a>
    </div>
  </div>
);
