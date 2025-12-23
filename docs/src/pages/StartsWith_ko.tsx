import { CodeBlock } from '@/components/CodeBlock';

export const StartsWith_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      startsWith
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      문자열이 주어진 접두사로 시작하는지 확인합니다
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      startsWith란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      <strong class="font-semibold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/20 px-2 py-1 rounded">
        startsWith
      </strong>{' '}
      는 문자열 또는 배열이 특정 접두사로 시작하는지 확인합니다. 라우팅 가드, 커맨드 파싱 등에서
      빠르게 접두사를 판별할 때 유용하며 문자열/배열 모두 지원합니다.
    </p>

    <CodeBlock
      language="typescript"
      code={`import { startsWith } from 'fp-kit';

startsWith('a', 'abc');  // true
startsWith('b', 'abc');  // false

startsWith([1, 2], [1, 2, 3]);  // true
startsWith([2], [1, 2, 3]);     // false`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      기본 사용
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
      라우팅 가드
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { startsWith } from 'fp-kit';

const paths = ['/admin/users', '/public', '/admin/settings'];

const adminRoutes = paths.filter(path => startsWith('/admin', path));
// ['/admin/users', '/admin/settings']`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      커맨드 파싱
    </h3>

    <CodeBlock
      language="typescript"
      code={`import { startsWith } from 'fp-kit';

const args = ['--help', '--verbose', 'input.txt'];

const flags = args.filter(arg => startsWith('--', arg));
// ['--help', '--verbose']`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
      반대 방향이 필요하다면{' '}
      <code class="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">endsWith</code>를 확인하세요.
    </p>
  </div>
);
