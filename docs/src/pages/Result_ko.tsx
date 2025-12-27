import { CodeBlock } from '@/components/CodeBlock';

export const Result_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      result
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      함수 호출의 성공/실패를 안전하게 감싸서 반환합니다
    </p>

    <CodeBlock
      language="typescript"
      code={`import { result } from 'fp-kit';

const parseJson = (input: string) => result(() => JSON.parse(input));

parseJson('{"ok":true}'); // { ok: true, value: { ok: true } }
parseJson('oops');        // { ok: false, error: SyntaxError }`}
    />
  </div>
);
