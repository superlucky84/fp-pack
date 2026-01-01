import { CodeBlock } from '@/components/CodeBlock';
import { navigateTo } from '@/store';

export const DebounceLeading = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      debounceLeading
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Execute immediately, then ignore calls for a specified time
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is debounceLeading?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        debounceLeading
      </strong>{' '}
      creates a debounced version of a function that executes immediately on the first call,
      then ignores all subsequent calls until the specified wait time has passed since the first call.
      Unlike regular debounce which waits for quiet periods, debounceLeading provides immediate feedback.
      <br />
      <br />
      This is useful for <strong>button click prevention</strong>, <strong>form submission protection</strong>,
      <strong>immediate user feedback</strong>, and <strong>preventing duplicate requests</strong>.
      <br />
      <br />
      Think of it as "execute this action right now, but prevent spam for the next X milliseconds."
    </p>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

const handleSubmit = debounceLeading(() => {
  console.log('Form submitted');
  // Submit form to server
}, 1000);

handleSubmit(); // Executes immediately: "Form submitted"
handleSubmit(); // Ignored (within 1000ms)
handleSubmit(); // Ignored (within 1000ms)
// After 1000ms, next call will execute again`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Type Signature
    </h2>

    <CodeBlock
      language="typescript"
      code={`function debounceLeading<T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): (...args: Parameters<T>) => void;

// Takes a function and a wait time in milliseconds
// Returns a debounced version that executes on leading edge
// First call executes immediately, subsequent calls ignored during wait period`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Basic Usage
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Simple Leading Debounce
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

// Simple action with immediate execution
const logAction = debounceLeading((action: string) => {
  console.log('Action:', action);
}, 500);

logAction('click');    // Immediately logs: "Action: click"
logAction('click');    // Ignored
logAction('click');    // Ignored
// After 500ms, the next call will execute immediately again

// Button click handler
const handleClick = debounceLeading((event: MouseEvent) => {
  console.log('Button clicked at:', event.clientX, event.clientY);
}, 1000);

button.addEventListener('click', handleClick);
// First click executes immediately
// Subsequent clicks within 1 second are ignored`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Preventing Rapid Submissions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

// Prevent form from being submitted multiple times
const submitForm = debounceLeading((formData: FormData) => {
  console.log('Submitting form...');
  // Send to server
}, 2000);

// User clicks submit button multiple times
submitForm(data); // Executes immediately
submitForm(data); // Ignored
submitForm(data); // Ignored
// After 2 seconds, next submission will be allowed`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Practical Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      Form Submission Protection
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface FormData {
  email: string;
  password: string;
}

// Prevent double-submission of login form
const submitLogin = debounceLeading(async (data: FormData) => {
  console.log('Attempting login...');

  // Show loading state
  setLoading(true);

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      console.log('Login successful');
      redirectToHome();
    } else {
      showError(result.message);
    }
  } catch (error) {
    console.error('Login failed:', error);
    showError('Network error occurred');
  } finally {
    setLoading(false);
  }
}, 2000); // Prevent resubmission for 2 seconds

// Attach to form
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
  // Update UI
}

function showError(message: string) {
  // Display error
}

function redirectToHome() {
  // Navigate to home page
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Button Click Prevention
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

// Prevent rapid clicking on action buttons
const handleLike = debounceLeading(async (postId: number) => {
  console.log('Liking post:', postId);

  try {
    await fetch(\`/api/posts/\${postId}/like\`, { method: 'POST' });

    // Update UI
    updateLikeCount(postId);
    animateLikeButton(postId);
  } catch (error) {
    console.error('Failed to like post:', error);
  }
}, 1000);

const handleShare = debounceLeading(async (postId: number) => {
  console.log('Sharing post:', postId);

  try {
    await fetch(\`/api/posts/\${postId}/share\`, { method: 'POST' });

    showShareDialog(postId);
  } catch (error) {
    console.error('Failed to share post:', error);
  }
}, 800);

// Attach to buttons
document.querySelectorAll('.like-button').forEach(button => {
  button.addEventListener('click', (e) => {
    const postId = parseInt((e.target as HTMLElement).dataset.postId || '0');
    handleLike(postId);
  });
});

function updateLikeCount(postId: number) {
  // Update like count in UI
}

function animateLikeButton(postId: number) {
  // Animate button
}

function showShareDialog(postId: number) {
  // Show share dialog
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      API Request Deduplication
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface RefreshOptions {
  force?: boolean;
  silent?: boolean;
}

// Prevent multiple simultaneous refresh requests
const refreshData = debounceLeading(async (options: RefreshOptions = {}) => {
  console.log('Refreshing data...');

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
    console.log('Data refreshed successfully');
  } catch (error) {
    console.error('Failed to refresh data:', error);
    showErrorMessage('Failed to refresh data');
  } finally {
    if (!options.silent) {
      hideLoadingIndicator();
    }
  }
}, 5000); // Only allow refresh once per 5 seconds

// Multiple triggers - only first executes
document.querySelector('#refresh-button')?.addEventListener('click', () => {
  refreshData();
});

window.addEventListener('focus', () => {
  refreshData({ silent: true });
});

// On reconnect
window.addEventListener('online', () => {
  refreshData({ force: true });
});

function showLoadingIndicator() {
  // Show loading
}

function hideLoadingIndicator() {
  // Hide loading
}

function updateDataStore(data: any) {
  // Update app state
}

function showErrorMessage(message: string) {
  // Show error
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Navigation Protection
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface NavigationOptions {
  route: string;
  params?: Record<string, string>;
  replace?: boolean;
}

// Prevent rapid navigation that can cause issues
const navigateTo = debounceLeading((options: NavigationOptions) => {
  console.log('Navigating to:', options.route);

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

  // Trigger route change
  dispatchNavigationEvent(options.route);
}, 300);

// Usage
const handleLinkClick = (route: string) => {
  navigateTo({ route });
};

// Prevent double-navigation from rapid clicks
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
      Game Input Handling
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface PlayerAction {
  type: 'jump' | 'shoot' | 'reload';
  timestamp: number;
}

// Prevent button mashing in games
const handleJump = debounceLeading(() => {
  console.log('Player jumped');

  // Execute jump action
  player.jump();
  playJumpAnimation();
  playJumpSound();
}, 500); // Minimum 500ms between jumps

const handleShoot = debounceLeading(() => {
  console.log('Player shot');

  if (player.ammo > 0) {
    player.shoot();
    playShootAnimation();
    playShootSound();
    player.ammo--;
  } else {
    playEmptySound();
  }
}, 200); // Minimum 200ms between shots

const handleReload = debounceLeading(() => {
  console.log('Player reloading');

  if (player.ammo < player.maxAmmo) {
    player.reload();
    playReloadAnimation();
    playReloadSound();
  }
}, 2000); // 2 second reload time

// Keyboard controls
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
  jump() { /* jump logic */ },
  shoot() { /* shoot logic */ },
  reload() {
    this.ammo = this.maxAmmo;
  }
};

function playJumpAnimation() { /* animation */ }
function playJumpSound() { /* sound */ }
function playShootAnimation() { /* animation */ }
function playShootSound() { /* sound */ }
function playReloadAnimation() { /* animation */ }
function playReloadSound() { /* sound */ }
function playEmptySound() { /* sound */ }`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Download/Export Actions
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { debounceLeading } from 'fp-pack';

interface ExportOptions {
  format: 'csv' | 'json' | 'pdf';
  filename: string;
}

// Prevent multiple simultaneous export requests
const exportData = debounceLeading(async (options: ExportOptions) => {
  console.log(\`Exporting data as \${options.format}...\`);

  showExportProgress();

  try {
    const response = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options)
    });

    const blob = await response.blob();

    // Create download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`\${options.filename}.\${options.format}\`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('Export completed successfully');
    showSuccessMessage('File downloaded successfully');
  } catch (error) {
    console.error('Export failed:', error);
    showErrorMessage('Export failed. Please try again.');
  } finally {
    hideExportProgress();
  }
}, 3000); // Prevent exports within 3 seconds

// Export button handlers
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
  // Show progress indicator
}

function hideExportProgress() {
  // Hide progress indicator
}

function showSuccessMessage(message: string) {
  // Show success toast
}

function showErrorMessage(message: string) {
  // Show error toast
}`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Why Use debounceLeading?
    </h2>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          1. Immediate User Feedback
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Executes the action immediately on first call, providing instant feedback to users without delay.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          2. Prevent Duplicate Actions
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Protects against accidental double-clicks, rapid button presses, and duplicate API requests.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          3. Better Than Disabling
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Simpler than manually disabling/enabling buttons, with automatic cooldown management.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          4. Resource Protection
        </h3>
        <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
          Prevents server overload from rapid-fire requests while maintaining responsive UI.
        </p>
      </div>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Implementation Details
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
    // If we can execute, do it immediately
    if (canExecute) {
      fn(...args);
      canExecute = false;

      // Set timeout to reset execution permission
      timeoutId = setTimeout(() => {
        canExecute = true;
        timeoutId = null;
      }, wait);
    }
    // Otherwise, ignore the call
  };
}`}
    />

    <div class="mt-6 space-y-4">
      <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
        <strong>How it works:</strong>
      </p>
      <ol class="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
        <li>Takes a function and a wait time in milliseconds</li>
        <li>Maintains a flag to track if execution is allowed</li>
        <li>On first call, executes immediately and sets flag to false</li>
        <li>Subsequent calls during wait period are ignored</li>
        <li>After wait period expires, resets flag to allow next execution</li>
        <li>Preserves function arguments using rest parameters</li>
      </ol>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Source Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      View the implementation of <code class="text-sm">debounceLeading</code> on GitHub to see how it works internally.
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
      View on GitHub
    </a>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Related Functions
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
          Execute on trailing edge - waits for quiet period before execution.
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
          Execute at regular intervals - similar rate limiting approach.
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
          Create delayed promises - simpler time-based utility.
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
          Safe error handling - wrap debounced operations for safety.
        </p>
      </a>
    </div>
  </div>
);
