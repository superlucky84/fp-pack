import { CodeBlockWithCopy } from '@/components/CodeBlockWithCopy';
import { CodeBlock } from '@/components/CodeBlock';

const ADDON_CODE = `You are a coding agent with fp-pack functional programming enforcement enabled.

ACTIVATION CONDITIONS:

These constraints apply ONLY when fp-pack is installed in the current project.

Before enforcing fp-pack patterns, verify fp-pack availability:
1. Check if \`package.json\` contains fp-pack in dependencies or devDependencies
2. Check if \`node_modules/fp-pack\` directory exists
3. Check if fp-pack imports are present in existing code

If fp-pack is NOT installed:
- Do not enforce these constraints
- Use standard coding practices appropriate for the project
- Never suggest installing fp-pack unless explicitly requested

If fp-pack IS installed:
- Enforce all constraints below strictly
- Refuse code that violates these patterns
- Suggest fp-pack alternatives for all imperative code

BEHAVIORAL CONSTRAINTS:

1. COMPOSITION PRIORITY
   - Use \`pipe\` for all synchronous data transformations
   - Use \`pipeAsync\` for all asynchronous operations
   - Never write imperative loops (for, while, forEach)
   - Never chain native array methods (.map().filter().slice())
   - All data flow must be expressed through function composition

2. MUTATION PROHIBITION
   - Never mutate objects or arrays
   - Never use assignment operators on existing data structures
   - Never modify function parameters
   - All updates must create new immutable values

3. OBJECT-ORIENTED PATTERN PROHIBITION
   - Never create classes for business logic
   - Never use inheritance hierarchies
   - Never implement OOP design patterns (Factory, Strategy, etc.)
   - Prefer function composition over object methods

4. DECLARATIVE CONTROL FLOW
   - Use \`ifElse\` instead of if/else statements
   - Use \`when\`/\`unless\` for conditional execution
   - Use \`cond\` instead of switch statements
   - All branching logic must remain within pipe chains

5. SIDE EFFECT HANDLING
   - Use \`pipeSideEffect\` / \`pipeAsyncSideEffect\` for early termination patterns
   - Use \`pipeSideEffectStrict\` / \`pipeAsyncSideEffectStrict\` for strict type unions
   - Wrap side effects in \`SideEffect.of()\`
   - Call \`runPipeResult\` OUTSIDE pipelines for execution
   - Never use try-catch within pipelines (use SideEffect pattern)

6. LAZY EVALUATION FOR LARGE DATA
   - Use \`stream/*\` functions for processing large datasets
   - Never materialize entire datasets when lazy evaluation is possible
   - Prefer \`toArray\` only when final materialization is required

7. ERROR HANDLING
   - Errors and exceptional paths must use SideEffect pattern
   - Never throw exceptions within pipe chains
   - Use \`isSideEffect\` for type-safe error branching
   - Call \`runPipeResult\` or \`matchSideEffect\` outside pipelines

8. CODE REJECTION POLICY
   - Refuse to write imperative loops
   - Refuse to implement class-based solutions
   - Refuse to mutate data structures
   - Suggest fp-pack alternatives when requested patterns violate constraints

IMPORT PATHS:
- Core functions: \`import { pipe, map, filter } from 'fp-pack'\`
- Async functions: \`import { pipeAsync, delay } from 'fp-pack'\`
- SideEffect pattern: \`import { pipeSideEffect, pipeSideEffectStrict, SideEffect, isSideEffect, runPipeResult } from 'fp-pack'\`
- Stream functions: \`import { map, filter, toArray } from 'fp-pack/stream'\`

ENFORCEMENT:
When user requests violate these constraints, respond with:
1. Explanation of why the request violates fp-pack principles
2. Alternative solution using fp-pack patterns
3. Code example demonstrating the fp-pack approach

When existing code violates these constraints, either:
1. Refactor to fp-pack patterns automatically
2. Warn about violations and suggest refactoring

REFERENCE MATERIALS (NOT PART OF BEHAVIORAL RULES):

This document is the **sole authoritative specification** for fp-pack-first coding behavior.

If you need detailed usage examples, API patterns, or additional explanations
for human readers, the following reference material may exist:

node_modules/fp-pack/dist/skills/fp-pack.md

This reference material is **optional**. Agents must follow the behavioral
constraints defined in this document regardless of whether external
documentation exists or is accessible.`;

export const AIAgentAddon = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      AI Agent Role Add-on
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      A reusable behavior module that conditionally enforces fp-pack patterns in AI coding agents
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
      What is Agent Role Add-on?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The fp-pack Agent Role Add-on is a copy-paste ready behavior extension for AI coding agents (OpenCode, custom agents, IDE extensions, etc.). Unlike skills files that are project-specific, this add-on is attached directly to your agent's system prompt, making it work across all your projects.
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
      <p class="text-sm md:text-base text-blue-900 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 Key Difference:</span> Skills files are per-project configurations. Agent add-ons are global agent behaviors that activate conditionally based on project context.
      </p>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      Key Features
    </h3>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li><strong>Conditional Activation:</strong> Only enforces fp-pack patterns when fp-pack is detected in the project</li>
      <li><strong>Auto-Detection:</strong> Checks <code class="text-sm">package.json</code>, <code class="text-sm">node_modules</code>, and existing imports</li>
      <li><strong>Respects Non-fp-pack Projects:</strong> Uses standard coding practices when fp-pack isn't installed</li>
      <li><strong>Single Configuration:</strong> Works across multiple projects with different technology stacks</li>
      <li><strong>Copy-Paste Ready:</strong> No complex setup, just paste into your agent's system prompt</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      When to Use This Add-on
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      ✅ Use When:
    </h3>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li>You work across multiple projects, some using fp-pack and others not</li>
      <li>You want automatic pattern enforcement when fp-pack is detected</li>
      <li>Your team adopts fp-pack selectively per project</li>
      <li>You need a single agent configuration that adapts to project context</li>
    </ul>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      ❌ Don't Use When:
    </h3>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li>You exclusively work on projects that never use fp-pack</li>
      <li>You prefer manual control over when to apply functional patterns</li>
      <li>Your agent configuration is project-specific rather than global</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      How to Attach This Add-on
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Copy the behavioral constraints block below and paste it into your AI agent's system prompt or configuration.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Copy This Block
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      Click the "Copy" button to copy the entire add-on configuration:
    </p>

    <CodeBlockWithCopy
      language="text"
      code={ADDON_CODE}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Integration Examples
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      OpenCode (.opencode/config.yaml)
    </h3>

    <CodeBlock
      language="yaml"
      code={`agent:
  role: "Your Agent Role"
  extensions:
    - type: "fp-pack-addon"
      content: |
        [Paste the fp-pack constraints block here]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      Custom Agent System Prompt
    </h3>

    <CodeBlock
      language="text"
      code={`<your-existing-agent-role>
  <identity>
    You are a [your agent description]...
  </identity>

  <capabilities>
    [your agent capabilities]...
  </capabilities>

  <!-- INSERT fp-pack BEHAVIORAL CONSTRAINTS HERE -->
  <coding-constraints>
    [Paste the fp-pack constraints block here]
  </coding-constraints>

  <workflow>
    [your agent workflow]...
  </workflow>
</your-existing-agent-role>`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      How It Works
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The add-on uses conditional logic to adapt its behavior based on the project context:
    </p>

    <div class="space-y-6 mb-6">
      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="text-lg font-medium text-green-900 dark:text-green-200 mb-2">
          ✅ When fp-pack is installed
        </h4>
        <p class="text-sm text-green-800 dark:text-green-300">
          The agent strictly enforces all fp-pack patterns, refuses imperative code, and suggests functional alternatives.
        </p>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800/20 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 class="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">
          ⚪ When fp-pack is NOT installed
        </h4>
        <p class="text-sm text-gray-700 dark:text-gray-400">
          The agent uses standard coding practices appropriate for the project, never mentions fp-pack, and respects existing conventions.
        </p>
      </div>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      Detection Mechanism
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      The agent verifies fp-pack availability through:
    </p>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li><code class="text-sm">package.json</code> dependency declarations (most reliable)</li>
      <li><code class="text-sm">node_modules</code> directory presence (installation confirmation)</li>
      <li>Existing import statements (usage confirmation)</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Full Documentation
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      The complete add-on documentation is available at <code class="text-sm">node_modules/fp-pack/dist/ai-addons/fp-pack-agent-addon.md</code> after installation.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      You can also view it in the{' '}
      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/fp-pack-agent-addon.md"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 dark:text-blue-400 hover:underline"
      >
        GitHub repository
      </a>.
    </p>

    <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-6">
      <p class="text-sm md:text-base text-yellow-900 dark:text-yellow-200 leading-relaxed">
        <span class="font-medium">⚠️ Important:</span> This add-on is designed for agents with system prompt support. For project-specific AI assistance (like Claude Code's skills), use the <a href="/ai-agent-skills" class="text-yellow-700 dark:text-yellow-300 hover:underline">AI Agent Skills</a> file instead.
      </p>
    </div>
  </div>
);
