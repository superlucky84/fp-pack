import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Clamp_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      clamp
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      값을 지정된 범위 내로 제한합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      clamp란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        clamp
      </strong>{' '}
      는 값을 지정된 최소값과 최대값 범위 내로 제한합니다.
      <br />
      <br />
      입력 값이 최소값보다 작으면 최소값을 반환하고, 최대값보다 크면 최대값을 반환합니다.
      그렇지 않으면 값을 그대로 반환합니다. 이는 값이 유효한 범위 내에 머무르도록 보장하고,
      오버플로우/언더플로우를 방지하며, 데이터를 정규화하는 데 유용합니다.
      <br />
      <br />
      clamp는 색상 값, 퍼센트, 게임 스탯, 슬라이더 값 및 경계를 강제해야 하는 모든 시나리오에서
      일반적으로 사용됩니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-pack';

clamp(0, 100, 50);   // 50 (범위 내)
clamp(0, 100, -10);  // 0 (최소값 미만)
clamp(0, 100, 150);  // 100 (최대값 초과)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용법
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      범위 제약
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-pack';

// 퍼센트 범위 (0-100)
clamp(0, 100, 75);    // 75
clamp(0, 100, -5);    // 0
clamp(0, 100, 105);   // 100

// RGB 색상 값 (0-255)
clamp(0, 255, 128);   // 128
clamp(0, 255, -10);   // 0
clamp(0, 255, 300);   // 255

// 온도 범위
clamp(-40, 50, 25);    // 25
clamp(-40, 50, -50);   // -40
clamp(-40, 50, 60);    // 50`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      배열과 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-pack';

// 여러 값에 clamp 적용
const values = [5, -3, 15, 8].map(v => clamp(0, 10, v));
// [5, 0, 10, 8]

// 헬퍼 함수 만들기
const clampTo100 = (value: number) => clamp(0, 100, value);
const percentages = [75, -10, 150].map(clampTo100);
// [75, 0, 100]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      실전 예제
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      색상 조작
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-pack';

interface RGB {
  r: number;
  g: number;
  b: number;
}

function adjustBrightness(color: RGB, amount: number): RGB {
  return {
    r: clamp(0, 255, color.r + amount),
    g: clamp(0, 255, color.g + amount),
    b: clamp(0, 255, color.b + amount)
  };
}

const color = { r: 200, g: 150, b: 100 };

// 100만큼 밝게
adjustBrightness(color, 100);
// { r: 255, g: 250, b: 200 }

// 200만큼 어둡게
adjustBrightness(color, -200);
// { r: 0, g: 0, b: 0 }

// 클램핑을 사용한 hex to RGB 변환
function hexToRGB(hex: string): RGB {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return {
    r: clamp(0, 255, r),
    g: clamp(0, 255, g),
    b: clamp(0, 255, b)
  };
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      게임 스탯
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-pack';

interface Player {
  health: number;
  mana: number;
  stamina: number;
}

function takeDamage(player: Player, damage: number): Player {
  return {
    ...player,
    health: clamp(0, 100, player.health - damage)
  };
}

function restoreMana(player: Player, amount: number): Player {
  return {
    ...player,
    mana: clamp(0, 100, player.mana + amount)
  };
}

function useStamina(player: Player, cost: number): Player {
  return {
    ...player,
    stamina: clamp(0, 100, player.stamina - cost)
  };
}

let player: Player = { health: 50, mana: 30, stamina: 80 };

player = takeDamage(player, 60);
// { health: 0, mana: 30, stamina: 80 } - 0 미만으로 내려갈 수 없음

player = restoreMana(player, 100);
// { health: 0, mana: 100, stamina: 80 } - 100을 초과할 수 없음`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      슬라이더와 입력 컨트롤
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-pack';

interface SliderConfig {
  min: number;
  max: number;
  step: number;
  value: number;
}

function createSlider(config: SliderConfig) {
  return {
    setValue(newValue: number) {
      config.value = clamp(config.min, config.max, newValue);
      return this;
    },

    increment() {
      config.value = clamp(config.min, config.max, config.value + config.step);
      return this;
    },

    decrement() {
      config.value = clamp(config.min, config.max, config.value - config.step);
      return this;
    },

    getValue() {
      return config.value;
    }
  };
}

const volumeSlider = createSlider({
  min: 0,
  max: 100,
  step: 5,
  value: 50
});

volumeSlider.increment().increment().increment();
console.log(volumeSlider.getValue());  // 65

volumeSlider.setValue(150);
console.log(volumeSlider.getValue());  // 100 (클램핑됨)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      진행률 추적
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-pack';

interface Progress {
  current: number;
  total: number;
}

function calculateProgress(progress: Progress): number {
  const percentage = (progress.current / progress.total) * 100;
  return clamp(0, 100, percentage);
}

function getProgressBar(progress: Progress): string {
  const percentage = calculateProgress(progress);
  const filled = Math.floor(percentage / 10);
  const empty = 10 - filled;

  return '█'.repeat(filled) + '░'.repeat(empty) + \` \${percentage.toFixed(0)}%\`;
}

console.log(getProgressBar({ current: 5, total: 10 }));
// ████░░░░░░ 50%

console.log(getProgressBar({ current: 12, total: 10 }));
// ██████████ 100% (클램핑됨)

console.log(getProgressBar({ current: -2, total: 10 }));
// ░░░░░░░░░░ 0% (클램핑됨)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      평점 시스템
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-pack';

interface Review {
  rating: number;
  comment: string;
}

function submitReview(rating: number, comment: string): Review {
  return {
    rating: clamp(1, 5, rating),
    comment
  };
}

function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const average = sum / reviews.length;

  return clamp(1, 5, average);
}

const reviews = [
  submitReview(5, '훌륭합니다!'),
  submitReview(4, '매우 좋음'),
  submitReview(10, '놀라워요!'),  // 5로 클램핑됨
  submitReview(0, '별로임'),       // 1로 클램핑됨
];

const average = calculateAverageRating(reviews);
// (5 + 4 + 5 + 1) / 4 = 3.75 → 3.75 (범위 내 유지)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      파이프와 함께 사용하기
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, clamp } from 'fp-pack';

// 여러 변환을 통해 사용자 입력 처리
const processInput = pipe(
  (input: string) => parseFloat(input),
  (n: number) => n * 1.5,
  (n: number) => clamp(0, 100, n),
  (n: number) => Math.round(n)
);

processInput('50');   // 75
processInput('80');   // 100 (클램핑됨)
processInput('-10');  // 0 (클램핑됨)

// 다른 범위에 대해 여러 clamp 체이닝
const normalizeScore = pipe(
  (score: number) => score * 10,
  (n: number) => clamp(0, 1000, n),
  (n: number) => n / 10,
  (n: number) => clamp(0, 100, n)
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      주요 특징
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. 간단한 인터페이스
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          값, min, max를 직접 인자로 받습니다.
          사용하기 쉽고 이해하기 간단합니다.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. 포함적 경계
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          최소값과 최대값 모두 포함됩니다. min 또는 max와 같은 값은
          변경되지 않고 반환됩니다.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. 성능
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          간단한 비교 연산으로 매우 빠릅니다. O(1) 시간 복잡도를 가집니다.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. 타입 안전
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          완전한 TypeScript 지원으로 숫자 연산에 대한 타입 안전성을 보장합니다.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      소스 코드
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <code class="text-sm">clamp</code>의 내부 구현을 GitHub에서 확인하세요.
    </p>

    <a
      href="https://github.com/superlucky84/fp-pack/blob/main/src/implement/equality/clamp.ts"
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/gt');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          gt
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          큰지 비교합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-400 dark:hover:border-purple-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/gte');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          gte
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          크거나 같은지 비교합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-400 dark:hover:border-green-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/lt');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          lt
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          작은지 비교합니다
        </p>
      </div>

      <div
        class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-orange-400 dark:hover:border-orange-500 transition-colors cursor-pointer"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/equality/lte');
        }}
      >
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          lte
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          작거나 같은지 비교합니다
        </p>
      </div>
    </div>

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      다음 단계
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/ko/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          변환 파이프라인에서 clamp를 다른 함수와 결합하세요.
        </p>
      </a>

      <a
        href="/ko/array/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/ko/array/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          배열의 여러 값에 clamp를 적용하세요.
        </p>
      </a>
    </div>
  </div>
);
