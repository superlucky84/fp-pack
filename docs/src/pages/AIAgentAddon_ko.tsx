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

export const AIAgentAddon_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      AI Agent Role Add-on
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      AI 코딩 에이전트에 fp-pack 패턴을 조건부로 강제하는 재사용 가능한 행동 모듈
    </p>

    <div class="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800 mb-8">
      <h3 class="text-lg font-medium text-purple-900 dark:text-purple-200 mb-2">
        실험적 설계 (Experimental by Design)
      </h3>
      <p class="text-sm text-purple-800 dark:text-purple-300">
        이 명세는 fp-pack을 AI 코딩 에이전트의 일급 행동 제약으로 어떻게 적용할 수 있는지 탐구합니다.
      </p>
    </div>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Agent Role Add-on이란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack Agent Role Add-on은 AI 코딩 에이전트(OpenCode, 커스텀 에이전트, IDE 확장 등)를 위한 복사-붙여넣기 가능한 행동 확장입니다. 프로젝트별 설정인 skills 파일과 달리, 이 add-on은 에이전트의 시스템 프롬프트에 직접 추가되어 모든 프로젝트에서 작동합니다.
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mb-6">
      <p class="text-sm md:text-base text-blue-900 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 핵심 차이점:</span> Skills 파일은 프로젝트별 설정입니다. Agent add-on은 프로젝트 컨텍스트에 따라 조건부로 활성화되는 전역 에이전트 행동입니다.
      </p>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      주요 기능
    </h3>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li><strong>조건부 활성화:</strong> fp-pack이 프로젝트에서 감지될 때만 패턴을 강제합니다</li>
      <li><strong>자동 감지:</strong> <code class="text-sm">package.json</code>, <code class="text-sm">node_modules</code>, 기존 import를 확인합니다</li>
      <li><strong>비-fp-pack 프로젝트 존중:</strong> fp-pack이 설치되지 않은 경우 표준 코딩 방식을 사용합니다</li>
      <li><strong>단일 설정:</strong> 다양한 기술 스택을 가진 여러 프로젝트에서 작동합니다</li>
      <li><strong>복사-붙여넣기 준비 완료:</strong> 복잡한 설정 없이, 에이전트 시스템 프롬프트에 붙여넣기만 하면 됩니다</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      언제 이 Add-on을 사용하나요?
    </h2>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      ✅ 다음과 같은 경우 사용:
    </h3>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li>fp-pack을 사용하는 프로젝트와 사용하지 않는 프로젝트를 오가며 작업하는 경우</li>
      <li>fp-pack이 감지되면 자동으로 패턴 강제를 원하는 경우</li>
      <li>팀이 프로젝트별로 선택적으로 fp-pack을 채택하는 경우</li>
      <li>프로젝트 컨텍스트에 적응하는 단일 에이전트 설정이 필요한 경우</li>
    </ul>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      ❌ 다음과 같은 경우 사용하지 않음:
    </h3>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li>fp-pack을 전혀 사용하지 않는 프로젝트에서만 작업하는 경우</li>
      <li>함수형 패턴 적용 시점을 수동으로 제어하고 싶은 경우</li>
      <li>에이전트 설정이 전역이 아니라 프로젝트별인 경우</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Add-on 추가 방법
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      아래의 행동 제약 조건 블록을 복사해서 AI 에이전트의 시스템 프롬프트 또는 설정에 붙여넣으세요.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      이 블록 복사
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      "Copy" 버튼을 클릭해서 전체 add-on 설정을 복사하세요:
    </p>

    <CodeBlockWithCopy
      language="text"
      code={ADDON_CODE}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      통합 예제
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
        [여기에 fp-pack 제약 조건 블록을 붙여넣으세요]`}
    />

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-6">
      커스텀 에이전트 시스템 프롬프트
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

  <!-- 여기에 fp-pack 행동 제약 조건 삽입 -->
  <coding-constraints>
    [여기에 fp-pack 제약 조건 블록을 붙여넣으세요]
  </coding-constraints>

  <workflow>
    [your agent workflow]...
  </workflow>
</your-existing-agent-role>`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      작동 방식
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Add-on은 조건부 로직을 사용하여 프로젝트 컨텍스트에 따라 행동을 조정합니다:
    </p>

    <div class="space-y-6 mb-6">
      <div class="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h4 class="text-lg font-medium text-green-900 dark:text-green-200 mb-2">
          ✅ fp-pack이 설치된 경우
        </h4>
        <p class="text-sm text-green-800 dark:text-green-300">
          에이전트는 모든 fp-pack 패턴을 엄격히 강제하고, 명령형 코드를 거부하며, 함수형 대안을 제안합니다.
        </p>
      </div>

      <div class="bg-gray-50 dark:bg-gray-800/20 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h4 class="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">
          ⚪ fp-pack이 설치되지 않은 경우
        </h4>
        <p class="text-sm text-gray-700 dark:text-gray-400">
          에이전트는 프로젝트에 적합한 표준 코딩 방식을 사용하고, fp-pack을 언급하지 않으며, 기존 규칙을 존중합니다.
        </p>
      </div>
    </div>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      감지 메커니즘
    </h3>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
      에이전트는 다음을 통해 fp-pack 가용성을 확인합니다:
    </p>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li><code class="text-sm">package.json</code> 의존성 선언 (가장 신뢰할 수 있음)</li>
      <li><code class="text-sm">node_modules</code> 디렉토리 존재 (설치 확인)</li>
      <li>기존 import 문 (사용 확인)</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      전체 문서
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      완전한 add-on 문서는 설치 후 <code class="text-sm">node_modules/fp-pack/dist/ai-addons/fp-pack-agent-addon.md</code>에서 확인할 수 있습니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      {' '}
      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/fp-pack-agent-addon.md"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 dark:text-blue-400 hover:underline"
      >
        GitHub 리포지토리
      </a>
      에서도 확인할 수 있습니다.
    </p>

    <div class="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800 mt-6">
      <p class="text-sm md:text-base text-yellow-900 dark:text-yellow-200 leading-relaxed">
        <span class="font-medium">⚠️ 중요:</span> 이 add-on은 시스템 프롬프트를 지원하는 에이전트용으로 설계되었습니다. 프로젝트별 AI 지원(Claude Code의 skills 등)이 필요한 경우 <a href="/ko/ai-agent-skills" class="text-yellow-700 dark:text-yellow-300 hover:underline">AI Agent Skills</a> 파일을 대신 사용하세요.
      </p>
    </div>
  </div>
);
