import { lmount, mountCallback, ref } from 'lithent';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import javascript from 'highlight.js/lib/languages/javascript';
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('tsx', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('bash', bash);

interface CodeBlockProps {
  code: string;
  language?: string;
}

export const CodeBlock = lmount<CodeBlockProps>(() => {
  const codeRef = ref<HTMLElement | null>(null);

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

  return ({ code, language }) => (
    <pre class="code-block bg-gray-100 dark:bg-[#1e1e1e] p-6 rounded-lg overflow-x-auto mb-6 text-xs md:text-sm border border-gray-200 dark:border-gray-800">
      <code ref={codeRef} class={`language-${language || 'typescript'}`}>
        {code}
      </code>
    </pre>
  );
});
