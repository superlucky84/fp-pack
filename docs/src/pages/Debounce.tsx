import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const Debounce = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      debounce
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Delay execution until calls stop for a specified time
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is debounce?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        debounce
      </strong>{' '}
      creates a debounced version of a function that delays its execution until after a specified wait time
      has elapsed since the last time it was called. Only the last call during the wait period will be executed.
      <br />
      <br />
      This is useful for <strong>search input optimization</strong>, <strong>auto-save functionality</strong>,
      <strong>resize/scroll event handling</strong>, and <strong>API call rate limiting</strong>.
      <br />
      <br />
      Think of it as "wait until the user stops typing before executing this action."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

const searchApi = debounce((query: string) => {
  console.log('Searching for:', query);
  // API call here
}, 300);

searchApi('h');     // Not executed
searchApi('he');    // Not executed
searchApi('hel');   // Not executed
searchApi('hell');  // Not executed
searchApi('hello'); // Executed after 300ms of no more calls
// Logs: "Searching for: hello"`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void;

// Takes a function and a wait time in milliseconds
// Returns a debounced version that delays execution
// Only the last call within the wait period is executed`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Debouncing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

// Debounce a save function
const saveData = debounce((data: string) => {
  console.log('Saving:', data);
}, 500);

saveData('a');
saveData('ab');
saveData('abc');
// After 500ms: Logs "Saving: abc"

// Debounce with multiple parameters
const logValues = debounce((a: number, b: string) => {
  console.log('Values:', a, b);
}, 300);

logValues(1, 'one');
logValues(2, 'two');
logValues(3, 'three');
// After 300ms: Logs "Values: 3 three"`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Event Handler Debouncing
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

// Debounce input event
const handleInput = debounce((event: Event) => {
  const input = event.target as HTMLInputElement;
  console.log('User typed:', input.value);
}, 300);

// Attach to input element
const inputElement = document.querySelector('input');
inputElement?.addEventListener('input', handleInput);

// Debounce window resize
const handleResize = debounce(() => {
  console.log('Window size:', window.innerWidth, window.innerHeight);
}, 250);

window.addEventListener('resize', handleResize);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Search Input with API Calls
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface SearchResult {
  id: number;
  title: string;
  description: string;
}

// Debounced search function
const performSearch = debounce(async (query: string) => {
  if (query.length < 2) return;

  try {
    const response = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`);
    const results: SearchResult[] = await response.json();

    console.log('Search results:', results);
    displayResults(results);
  } catch (error) {
    console.error('Search failed:', error);
  }
}, 400);

// Usage in input handler
const searchInput = document.querySelector('#search') as HTMLInputElement;
searchInput?.addEventListener('input', (e) => {
  const query = (e.target as HTMLInputElement).value;
  performSearch(query);
});

function displayResults(results: SearchResult[]) {
  // Update UI with results
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Auto-Save Form Data
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface FormData {
  title: string;
  content: string;
  lastModified: Date;
}

// Auto-save after user stops typing
const autoSave = debounce(async (formData: FormData) => {
  console.log('Auto-saving...');

  try {
    await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        lastModified: new Date()
      })
    });

    console.log('Auto-save successful');
    showSaveStatus('Saved');
  } catch (error) {
    console.error('Auto-save failed:', error);
    showSaveStatus('Save failed');
  }
}, 2000); // Wait 2 seconds after last change

// Usage
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
  // Update save status indicator
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Window Resize Handler
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface ViewportDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

// Expensive layout recalculation
const recalculateLayout = debounce(() => {
  const dimensions: ViewportDimensions = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
  };

  console.log('Recalculating layout for:', dimensions);

  // Update layout based on new dimensions
  updateResponsiveElements(dimensions);
  repositionComponents(dimensions);
  recalculateGridColumns(dimensions);
}, 150);

window.addEventListener('resize', recalculateLayout);

function updateResponsiveElements(dims: ViewportDimensions) {
  // Update UI elements
}

function repositionComponents(dims: ViewportDimensions) {
  // Reposition based on viewport
}

function recalculateGridColumns(dims: ViewportDimensions) {
  // Adjust grid layout
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Scroll Event Optimization
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

// Debounced scroll handler for expensive operations
const handleScroll = debounce(() => {
  const scrollPosition = window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

  console.log(\`Scrolled: \${scrollPercentage.toFixed(1)}%\`);

  // Update scroll indicator
  updateScrollIndicator(scrollPercentage);

  // Load more content if near bottom
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
  console.log('Loading more content...');
  // Fetch and append more content
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Form Validation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// Debounced email validation with API check
const validateEmail = debounce(async (email: string) => {
  const errors: string[] = [];

  // Client-side validation
  if (!email.includes('@')) {
    errors.push('Invalid email format');
  }

  if (email.length < 5) {
    errors.push('Email too short');
  }

  // Server-side validation (check if email exists)
  if (errors.length === 0) {
    try {
      const response = await fetch(\`/api/validate-email?email=\${encodeURIComponent(email)}\`);
      const result = await response.json();

      if (result.exists) {
        errors.push('Email already registered');
      }
    } catch (error) {
      console.error('Validation error:', error);
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
  // Update UI with validation errors
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Live Preview Generation
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounce } from 'fp-pack';

interface MarkdownPreview {
  html: string;
  wordCount: number;
  readingTime: number;
}

// Debounced markdown preview
const updatePreview = debounce((markdown: string) => {
  console.log('Generating preview...');

  // Parse markdown (expensive operation)
  const html = parseMarkdown(markdown);
  const wordCount = countWords(markdown);
  const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

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
  // Markdown to HTML conversion
  return md.replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
           .replace(/\\*(.+?)\\*/g, '<em>$1</em>');
}

function countWords(text: string): number {
  return text.split(/\\s+/).filter(word => word.length > 0).length;
}

function renderPreview(preview: MarkdownPreview) {
  // Update preview pane
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use debounce?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Performance Optimization
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Reduce the number of expensive operations by waiting until rapid events settle down.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. API Rate Limiting
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Prevent excessive API calls during rapid user input by waiting for a pause before making requests.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Better User Experience
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Avoid jarring UI updates and provide smoother, more intentional responses to user actions.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Resource Conservation
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Save CPU, memory, and network resources by executing only the final, meaningful action.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
    </h2>

    <CodeBlock
      language="typescript"
      code={`function debounce<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    // Clear existing timeout
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    // Set new timeout
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, wait);
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a function and a wait time in milliseconds</li>
        <li>Returns a new function that manages timeout state</li>
        <li>Each call clears the previous timeout (if any)</li>
        <li>Sets a new timeout to execute the function after the wait period</li>
        <li>Only the last call within the wait period actually executes</li>
        <li>Preserves function arguments using rest parameters</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">debounce</code> on GitHub to see how it works internally.
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
      View on GitHub
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
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
          Execute at most once per interval - complementary rate limiting pattern.
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
          Create delayed promises - simpler time-based utility.
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
          Compose async functions - combine with debounced operations.
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
          Safe error handling - wrap debounced async operations.
        </p>
      </a>
    </div>
  </div>
);
