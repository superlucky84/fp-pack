import { CodeBlock } from '@/components/CodeBlock';

export const Result = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      result
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Wrap a function call to capture success or failure
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
