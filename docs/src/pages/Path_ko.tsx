import { CodeBlock } from '@/components/CodeBlock';

export const Path_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      path
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      경로 배열로 중첩 프로퍼티를 안전하게 조회합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { path } from 'fp-kit';

const user = { profile: { name: 'Ada', address: { city: 'Seoul' } } };

path(['profile', 'name'], user);            // 'Ada'
path(['profile', 'address', 'city'], user); // 'Seoul'
path(['profile', 'phone'], user);           // undefined`}
    />
  </div>
);
