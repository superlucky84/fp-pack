import { CodeBlock } from '@/components/CodeBlock';

export const AIAgentSkills = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      AI Agent Skills
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      Help AI coding assistants write fp-pack-style functional code automatically
    </p>

    <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mb-8">
      <h3 class="text-lg font-medium text-purple-900 dark:text-purple-200 mb-2">
        Experimental by Design
      </h3>
      <p class="text-sm text-purple-800 dark:text-purple-300">
        This specification explores how fp-pack can be applied as a first-class behavioral constraint for AI coding agents.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      What is AI Agent Skills?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack includes an AI agent skills package that helps AI coding assistants (Claude Code, GitHub Copilot, Cursor, etc.) automatically write fp-pack-style functional code.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      When you have this skills package in your project, AI assistants will:
    </p>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li>Prefer value-first <code class="text-sm">pipe(data, ...)</code>/<code class="text-sm">pipeAsync(data, ...)</code> for inference</li>
      <li>Default to using <code class="text-sm">pipe</code>/<code class="text-sm">pipeAsync</code> for pure transformations</li>
      <li>Use <code class="text-sm">pipeSideEffect</code>/<code class="text-sm">pipeAsyncSideEffect</code> when SideEffect is involved</li>
      <li>Use strict variants (<code class="text-sm">pipeSideEffectStrict</code>/<code class="text-sm">pipeAsyncSideEffectStrict</code>) when you need strict effect unions</li>
      <li>Use the <code class="text-sm">SideEffect</code> pattern instead of try-catch</li>
      <li>Prefer <code class="text-sm">stream/*</code> functions for large datasets</li>
      <li>Write declarative, functional code using fp-pack utilities</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Setup for Claude Code
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Copy the skills folder to your project's <code class="text-sm">.claude/skills/</code> directory:
    </p>

    <CodeBlock
      language="bash"
      code={`# Unix/macOS/Linux
mkdir -p .claude/skills/fp-pack
cp -R node_modules/fp-pack/dist/skills/fp-pack/* .claude/skills/fp-pack/

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path .claude/skills/fp-pack
Copy-Item node_modules/fp-pack/dist/skills/fp-pack/* .claude/skills/fp-pack -Recurse

# Or manually create the directory and copy
mkdir -p .claude/skills/fp-pack
cp -R node_modules/fp-pack/dist/skills/fp-pack/* .claude/skills/fp-pack/`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      If your tool expects a single file, point it to <code class="text-sm">.claude/skills/fp-pack/SKILL.md</code> or link that file to <code class="text-sm">.claude/skills/fp-pack.md</code>.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Setup for Codex
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Copy the Codex skill to your project's <code class="text-sm">$CODEX_HOME/skills/</code> directory (default: <code class="text-sm">~/.codex/skills</code>):
    </p>

    <CodeBlock
      language="bash"
      code={`# Unix/macOS/Linux
mkdir -p ~/.codex/skills/fp-pack
cp -R node_modules/fp-pack/dist/skills/fp-pack/* ~/.codex/skills/fp-pack/

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "$HOME/.codex/skills/fp-pack"
Copy-Item node_modules/fp-pack/dist/skills/fp-pack/* $HOME/.codex/skills/fp-pack -Recurse`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Recommended: Add CLAUDE.md to Your Project
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      For better reliability, create a <code class="text-sm">CLAUDE.md</code> file in your project root. This ensures AI agents read the fp-pack skills package before writing code.
    </p>

    <CodeBlock
      language="markdown"
      code={`# Project Instructions for AI Agents

## ⚠️ CRITICAL: fp-pack Requirements

**Before writing ANY code, you MUST:**

1. Read \`.claude/skills/fp-pack/SKILL.md\` **completely**
2. Follow the anti-patterns section **strictly**
3. Use the patterns shown in real-world examples

**Non-negotiable rules:**
- Prefer \`pipe(data, ...)\` for inference; use \`from(value)\` for zero-arg pipelines (avoid \`() => value\`)
- Use \`pipeSideEffect\` for SideEffect handling, NOT \`pipe\`
- Call \`runPipeResult\` OUTSIDE pipelines, NEVER inside
- Use immutable operations, NO mutations

**This is not optional - violating these patterns will break the codebase.**`}
    />

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 mt-6">
      Place this file as <code class="text-sm">CLAUDE.md</code> in your project root. Claude Code will automatically read this file at the start of every conversation.
    </p>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      How It Works
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Once configured, AI assistants will automatically apply fp-pack coding patterns when helping you write code.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      Example: Before Skills File
    </h3>

    <CodeBlock
      language="typescript"
      code={`// AI might suggest imperative code
async function processUsers(users: User[]) {
  const results = [];
  for (const user of users) {
    if (user.age >= 18) {
      const name = user.name.toUpperCase();
      results.push(name);
      if (results.length >= 10) break;
    }
  }
  return results;
}`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      Example: After Skills File
    </h3>

    <CodeBlock
      language="typescript"
      code={`// AI suggests fp-pack functional style
import { pipe, filter, map, take } from 'fp-pack';

const processUsers = pipe(
  filter((user: User) => user.age >= 18),
  map(user => user.name.toUpperCase()),
  take(10)
);

const results = processUsers(users);`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Skills File Location
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The skills package is located at <code class="text-sm">node_modules/fp-pack/dist/skills/fp-pack/</code> after installation (includes <code class="text-sm">SKILL.md</code>, <code class="text-sm">examples/</code>, <code class="text-sm">reference/</code>, and <code class="text-sm">constraints/</code>).
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      You can also view it in the{' '}
      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/skills/fp-pack/SKILL.md"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 dark:text-blue-400 hover:underline"
      >
        GitHub repository
      </a>.
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mt-6">
      <p class="text-sm md:text-base text-blue-900 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 Tip:</span> After setting up the skills package, you can ask your AI assistant questions like "refactor this code using fp-pack" or "write this function using pipe and map", and it will automatically apply the patterns.
      </p>
    </div>
  </div>
);
