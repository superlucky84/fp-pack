import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Clamp = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      clamp
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Restrict a value to be within a specified range
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is clamp?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        clamp
      </strong>{' '}
      restricts a value to be within a specified minimum and maximum range.
      <br />
      <br />
      If the input value is less than the minimum, it returns the minimum. If the value is greater
      than the maximum, it returns the maximum. Otherwise, it returns the value unchanged. This is
      useful for ensuring values stay within valid bounds, preventing overflow/underflow, and
      normalizing data.
      <br />
      <br />
      clamp is commonly used for color values, percentages, game stats, slider values, and any
      scenario where you need to enforce boundaries.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-kit';

clamp(0, 100, 50);   // 50 (within range)
clamp(0, 100, -10);  // 0 (below min)
clamp(0, 100, 150);  // 100 (above max)`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Range Constraints
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-kit';

// Percentage range (0-100)
clamp(0, 100, 75);    // 75
clamp(0, 100, -5);    // 0
clamp(0, 100, 105);   // 100

// RGB color values (0-255)
clamp(0, 255, 128);   // 128
clamp(0, 255, -10);   // 0
clamp(0, 255, 300);   // 255

// Temperature range
clamp(-40, 50, 25);    // 25
clamp(-40, 50, -50);   // -40
clamp(-40, 50, 60);    // 50`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Arrays
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-kit';

// Apply clamp to multiple values
const values = [5, -3, 15, 8].map(v => clamp(0, 10, v));
// [5, 0, 10, 8]

// Or create a helper function
const clampTo100 = (value: number) => clamp(0, 100, value);
const percentages = [75, -10, 150].map(clampTo100);
// [75, 0, 100]`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Real-World Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Color Manipulation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-kit';

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

// Brighten by 100
adjustBrightness(color, 100);
// { r: 255, g: 250, b: 200 }

// Darken by 200
adjustBrightness(color, -200);
// { r: 0, g: 0, b: 0 }

// Convert hex to RGB with clamping
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
      Game Stats
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-kit';

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
// { health: 0, mana: 30, stamina: 80 } - Can't go below 0

player = restoreMana(player, 100);
// { health: 0, mana: 100, stamina: 80 } - Can't go above 100`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Slider and Input Controls
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-kit';

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
console.log(volumeSlider.getValue());  // 100 (clamped)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Progress Tracking
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-kit';

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
// ██████████ 100% (clamped)

console.log(getProgressBar({ current: -2, total: 10 }));
// ░░░░░░░░░░ 0% (clamped)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Rating System
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { clamp } from 'fp-kit';

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
  submitReview(5, 'Excellent!'),
  submitReview(4, 'Very good'),
  submitReview(10, 'Amazing!'),  // Clamped to 5
  submitReview(0, 'Poor'),        // Clamped to 1
];

const average = calculateAverageRating(reviews);
// (5 + 4 + 5 + 1) / 4 = 3.75 → 3.75 (stays in range)`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      With Pipe
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { pipe, clamp } from 'fp-kit';

// Process user input through multiple transformations
const processInput = pipe(
  (input: string) => parseFloat(input),
  (n: number) => n * 1.5,
  (n: number) => clamp(0, 100, n),
  (n: number) => Math.round(n)
);

processInput('50');   // 75
processInput('80');   // 100 (clamped)
processInput('-10');  // 0 (clamped)

// Chain multiple clamps for different ranges
const normalizeScore = pipe(
  (score: number) => score * 10,
  (n: number) => clamp(0, 1000, n),
  (n: number) => n / 10,
  (n: number) => clamp(0, 100, n)
);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Key Characteristics
    </h2>

    <div class="space-y-4">
      <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          1. Simple Interface
        </h4>
        <p class="text-sm text-blue-800 dark:text-blue-200">
          Takes value, min, and max as direct arguments. Straightforward to use
          and easy to understand.
        </p>
      </div>

      <div class="border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
          2. Inclusive Bounds
        </h4>
        <p class="text-sm text-purple-800 dark:text-purple-200">
          Both minimum and maximum values are inclusive. A value equal to min or max
          will be returned unchanged.
        </p>
      </div>

      <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">
          3. Performance
        </h4>
        <p class="text-sm text-green-800 dark:text-green-200">
          Simple comparison operations make it very fast. O(1) time complexity.
        </p>
      </div>

      <div class="border-l-4 border-pink-500 bg-pink-50 dark:bg-pink-900/20 p-4 rounded-r">
        <h4 class="font-semibold text-pink-900 dark:text-pink-100 mb-2">
          4. Type Safe
        </h4>
        <p class="text-sm text-pink-800 dark:text-pink-200">
          Full TypeScript support ensures type safety for numeric operations.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Next Steps
    </h2>

    <div class="grid gap-6 mt-6">
      <a
        href="/composition/pipe"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/composition/pipe');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-blue-600 dark:text-blue-400 mb-2">
          pipe →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Combine clamp with other functions in transformation pipelines.
        </p>
      </a>

      <a
        href="/array/map"
        onClick={(e: Event) => {
          e.preventDefault();
          navigateTo('/array/map');
        }}
        class="block p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer"
      >
        <h3 class="text-lg md:text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">
          map →
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300">
          Apply clamp to multiple values in an array.
        </p>
      </a>
    </div>
  </div>
);
