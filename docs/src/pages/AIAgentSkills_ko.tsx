import { CodeBlock } from '@/components/CodeBlock';

export const AIAgentSkills_ko = () => (
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <h1 class="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-6">
      AI Agent Skills
    </h1>

    <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">
      AI 코딩 어시스턴트가 fp-pack 스타일의 함수형 코드를 자동으로 작성하도록 도와줍니다
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
      AI Agent Skills란?
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      fp-pack에는 AI 코딩 어시스턴트(Claude Code, GitHub Copilot, Cursor 등)가 자동으로 fp-pack 스타일의 함수형 코드를 작성하도록 돕는 AI agent skills 파일이 포함되어 있습니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      프로젝트에 이 skills 파일이 있으면 AI 어시스턴트가:
    </p>

    <ul class="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300 mb-6">
      <li>순수 변환에는 기본적으로 <code class="text-sm">pipe</code>/<code class="text-sm">pipeAsync</code> 사용</li>
      <li>SideEffect가 필요할 때 <code class="text-sm">pipeSideEffect</code>/<code class="text-sm">pipeAsyncSideEffect</code> 사용</li>
      <li>엄격한 effect 유니온이 필요할 때 strict 변형(<code class="text-sm">pipeSideEffectStrict</code>/<code class="text-sm">pipeAsyncSideEffectStrict</code>) 사용</li>
      <li>try-catch 대신 <code class="text-sm">SideEffect</code> 패턴 사용</li>
      <li>대용량 데이터셋에는 <code class="text-sm">stream/*</code> 함수 선호</li>
      <li>fp-pack 유틸리티를 사용해 선언적이고 함수형인 코드 작성</li>
    </ul>

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Claude Code 설정
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      skills 파일을 프로젝트의 <code class="text-sm">.claude/skills/</code> 디렉토리로 복사하세요:
    </p>

    <CodeBlock
      language="bash"
      code={`# Unix/macOS/Linux
cp node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/

# Windows (PowerShell)
Copy-Item node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/

# 또는 수동으로 디렉토리를 만들고 복사
mkdir -p .claude/skills
cp node_modules/fp-pack/dist/skills/fp-pack.md .claude/skills/`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      Codex 설정
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      Codex skill을 프로젝트의 <code class="text-sm">$CODEX_HOME/skills/</code> 디렉토리(기본값: <code class="text-sm">~/.codex/skills</code>)로 복사하세요:
    </p>

    <CodeBlock
      language="bash"
      code={`# Unix/macOS/Linux
mkdir -p ~/.codex/skills/fp-pack
cp node_modules/fp-pack/dist/skills/fp-pack/SKILL.md ~/.codex/skills/fp-pack/SKILL.md

# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path "$HOME/.codex/skills/fp-pack"
Copy-Item node_modules/fp-pack/dist/skills/fp-pack/SKILL.md $HOME/.codex/skills/fp-pack/SKILL.md`}
    />

    <hr class="border-t border-gray-200 dark:border-gray-700 my-10" />

    <h2 class="text-2xl md:text-3xl font-medium text-gray-900 dark:text-white mb-4">
      작동 방식
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      설정이 완료되면 AI 어시스턴트가 코드 작성을 도울 때 자동으로 fp-pack 코딩 패턴을 적용합니다.
    </p>

    <h3 class="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4 mt-8">
      예시: Skills 파일 적용 전
    </h3>

    <CodeBlock
      language="typescript"
      code={`// AI가 명령형 코드를 제안할 수 있음
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
      예시: Skills 파일 적용 후
    </h3>

    <CodeBlock
      language="typescript"
      code={`// AI가 fp-pack 함수형 스타일을 제안
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
      Skills 파일 위치
    </h2>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      설치 후 skills 파일은 <code class="text-sm">node_modules/fp-pack/dist/skills/fp-pack.md</code>에 있습니다.
    </p>

    <p class="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
      {' '}
      <a
        href="https://github.com/superlucky84/fp-pack/blob/main/fp-pack.md"
        target="_blank"
        rel="noopener noreferrer"
        class="text-blue-600 dark:text-blue-400 hover:underline"
      >
        GitHub 리포지토리
      </a>
      에서도 확인할 수 있습니다.
    </p>

    <div class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800 mt-6">
      <p class="text-sm md:text-base text-blue-900 dark:text-blue-200 leading-relaxed">
        <span class="font-medium">💡 팁:</span> skills 파일을 설정한 후 "이 코드를 fp-pack으로 리팩토링해줘" 또는 "pipe와 map을 사용해서 이 함수를 작성해줘"와 같이 AI 어시스턴트에게 질문하면 자동으로 패턴을 적용해줍니다.
      </p>
    </div>
  </div>
);
