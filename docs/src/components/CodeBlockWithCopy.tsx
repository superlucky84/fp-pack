import { mount, mountCallback, ref } from 'lithent';
import { lstate } from 'lithent/helper';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('bash', bash);

interface CodeBlockWithCopyProps {
  code: string;
  language?: string;
}

export const CodeBlockWithCopy = mount<CodeBlockWithCopyProps>((renew) => {
  const codeRef = ref<HTMLElement | null>(null);
  const copied = lstate(false);

  mountCallback(() => {
    if (!codeRef.value) return;

    const lang = codeRef.value.className.match(/language-(\w+)/)?.[1] || 'typescript';

    // Skip highlighting for plain text
    if (lang === 'text' || lang === 'plaintext') {
      return;
    }

    if (lang === 'bash') {
      hljs.highlightElement(codeRef.value);
      if (codeRef.value.innerHTML) {
        codeRef.value.innerHTML = codeRef.value.innerHTML.replace(
          /^(\s*)\$(\s)/gm,
          '$1<span class="bash-prompt">$</span>$2'
        );
      }
      return;
    }

    // Try to highlight, but gracefully fall back if language is unknown
    try {
      const original = codeRef.value.textContent || '';
      const highlighted = hljs.highlight(original, { language: lang }).value;
      codeRef.value.innerHTML = highlighted;
    } catch (error) {
      // If highlighting fails (unknown language), just leave the text as-is
      console.warn(`Syntax highlighting failed for language: ${lang}`, error);
    }
  });

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      copied.value = true;
      renew();
      setTimeout(() => {
        copied.value = false;
        renew();
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return ({ code, language }) => (
    <div class="relative group">
      <pre class="code-block bg-gray-100 dark:bg-[#1e1e1e] p-6 rounded-lg overflow-x-auto mb-6 text-xs md:text-sm border border-gray-200 dark:border-gray-800">
        <code ref={codeRef} class={`language-${language || 'typescript'}`}>
          {code}
        </code>
      </pre>
      <button
        onClick={() => copyToClipboard(code)}
        class="absolute top-4 right-4 px-3 py-1.5 text-xs font-medium rounded-md transition-all
               bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300
               hover:bg-gray-300 dark:hover:bg-gray-600
               opacity-0 group-hover:opacity-100"
      >
        {copied.value ? (
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </span>
        ) : (
          <span class="flex items-center gap-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </span>
        )}
      </button>
    </div>
  );
});
