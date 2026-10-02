import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// A single candidate per arity preserves contextual typing in both entry styles.
// The typed variadic fallback handles longer chains without inventing contextual any.
export const contextualSteps = 32;
const check = process.argv.includes('--check');
const root = new URL('../', import.meta.url);

function update(relative, begin, end, generate) {
  const file = fileURLToPath(new URL(relative, root));
  const before = readFileSync(file, 'utf8');
  const start = before.indexOf(begin);
  const finish = before.indexOf(end, start);
  if (start < 0 || finish < 0) throw new Error(`Missing generation markers: ${relative}`);
  const after = before.slice(0, start) + generate() + before.slice(finish);
  if (check && before !== after) throw new Error(`Regenerate pipe overloads: ${relative}`);
  if (!check && before !== after) writeFileSync(file, after);
}

for (const name of ['pipe', 'pipeAsync', 'pipeSideEffect', 'pipeAsyncSideEffect']) {
  const async = name.includes('Async');
  const effect = name.includes('SideEffect');
  update(`src/implement/${async ? 'async' : 'composition'}/${name}.ts`,
    `function ${name}<I>`, `function ${name}<Fns extends`, () => {
      const lines = [`function ${name}<I>(first: I): Result<I, []>;`];
      for (let n = 1; n <= contextualSteps; n++) {
        const returns = Array.from({ length: n }, (_, i) => `R${i + 1}`);
        const steps = returns.map((r, i) => {
          let input = i === 0 ? 'Head<I>' : returns[i - 1];
          if (i > 0 && effect) input = `NonSideEffect<${async ? `Awaited<${input}>` : input}>`;
          const fn = async ? `AsyncOrSync<${input}, ${r}>` : `(value: ${input}) => ${r}`;
          return `s${i + 1}: ${fn}`;
        });
        lines.push(`function ${name}<I, ${returns.join(', ')}>(\n  ${['first: I', ...steps].join(',\n  ')}\n): Result<I, [${returns.join(', ')}]>;`);
      }
      return lines.join('\n') + '\n\n';
    });
}

update('src/implement/composition/pipeWithDeps.ts', '// BEGIN GENERATED SIGNATURES', '// END GENERATED SIGNATURES', () => {
  const lines = ['// BEGIN GENERATED SIGNATURES', 'export type PipeWithDeps<Mode extends PipeMode> = {', '  <I>(first: I): Result<Mode, I, [], []>;'];
  for (let n = 1; n <= contextualSteps; n++) {
    const returns = Array.from({ length: n }, (_, i) => `R${i + 1}`);
    const deps = returns.map((_, i) => `D${i + 1}`);
    const generics = ['I', ...returns.flatMap((r, i) => [r, deps[i]])];
    const steps = returns.map((r, i) => `s${i + 1}: (value: ${i === 0 ? 'Head<Mode, I>' : `NextInput<Mode, ${returns[i - 1]}>`}, deps: ${deps[i]}) => ${r}`);
    lines.push(`  <${generics.join(', ')}>(\n    ${['first: I', ...steps].join(',\n    ')}\n  ): Result<Mode, I, [${returns.join(', ')}], [${deps.join(', ')}]>;`);
  }
  lines.push('  <I, Steps extends [FallbackStep, ...FallbackStep[]]>(first: I, ...steps: CheckedSteps<Mode, Head<Mode, I>, Steps>): Result<Mode, I, Returns<Steps>, Dependencies<Steps>>;', '};', '');
  return lines.join('\n');
});
