import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { copyFileSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Run after pnpm build. Optional arguments are paths to additional tsc entrypoints.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const consumer = mkdtempSync(join(tmpdir(), 'fp-pack-consumer-'));
const run = (command, args, cwd = consumer) => execFileSync(command, args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
try {
  // The publish dry run propagates npm_config_dry_run to child processes.
  // This local-only smoke test still needs a real tarball and installation.
  const packed = JSON.parse(run('npm', ['pack', '--dry-run=false', '--json', '--pack-destination', consumer], root));
  const metadata = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
  assert.equal(packed[0].version, metadata.version);
  const files = new Set(packed[0].files.map(file => file.path));
  for (const path of [
    'CHANGELOG.md', 'dist/fp-pack.umd.js', 'dist/fp-pack-stream.umd.js',
    ...Object.values(metadata.exports).flatMap(entry => Object.values(entry).map(path => path.replace(/^\.\//, ''))),
  ]) assert.ok(files.has(path), `Missing published file: ${path}`);
  assert.ok(![...files].some(path => path.startsWith('dist/') && path.includes('.type-test.')), 'Type-test declarations leaked into dist');
  writeFileSync(join(consumer, 'package.json'), JSON.stringify({ private: true, type: 'module' }));
  run('npm', ['install', '--dry-run=false', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', join(consumer, packed[0].filename)]);
  const installed = join(consumer, 'node_modules/fp-pack');
  assert.equal(JSON.parse(readFileSync(join(installed, 'package.json'), 'utf8')).version, metadata.version);
  for (const path of ['dist/skills/fp-pack/SKILL.md', 'dist/ai-addons/fp-pack-agent-addon.md']) {
    const content = readFileSync(join(installed, path), 'utf8');
    assert.ok(content.includes(metadata.version), `Missing version in ${path}`);
    assert.ok(!content.includes('{{version}}'), `Unresolved version in ${path}`);
  }
  copyFileSync(join(root, 'research/pipe-soundness/consumer.ts'), join(consumer, 'consumer.ts'));
  // Reuse the full inference regression corpus through the package's public exports.
  const regressions = readFileSync(join(root, 'src/implement/composition/pipe.inference.type-test.ts'), 'utf8')
    .replace(/import (\w+) from '[^']+';/g, "import { $1 } from 'fp-pack';");
  writeFileSync(join(consumer, 'regressions.ts'), regressions);
  writeFileSync(join(consumer, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', strict: true,
      declaration: true, emitDeclarationOnly: true, types: [], outDir: './declarations',
    }, include: ['consumer.ts', 'regressions.ts'],
  }));
  const compilers = [join(root, 'node_modules/typescript/bin/tsc'), ...process.argv.slice(2).map(p => resolve(p))];
  for (const compiler of compilers) {
    run(process.execPath, [compiler, '-p', join(consumer, 'tsconfig.json')]);
    console.log(`${run(process.execPath, [compiler, '--version']).trim()}: packed consumer + declaration emit passed`);
  }
  run(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict';
    import { pipe, pipeWithDeps, pipeAsyncSideEffect, from, SideEffect, isSideEffect } from 'fp-pack';
    import { range, toArray } from 'fp-pack/stream';
    assert.equal(pipe(2, x => x + 1, x => x * 2), 6);
    assert.deepEqual(await pipe(range(0, 3), toArray), [0, 1, 2]);
    const work = pipeWithDeps(pipeAsyncSideEffect)(from(2), async (n, deps) => n + deps.add, n => n.toFixed());
    assert.equal(await work()({ add: 3 }), '5');
    let called = false;
    const stopped = await pipeAsyncSideEffect(1, () => SideEffect.of(() => 'STOP'), () => { called = true; return 2; });
    assert.ok(isSideEffect(stopped)); assert.equal(called, false);
  `]);
  run(process.execPath, ['--input-type=commonjs', '-e', `
    (async () => {
    const assert = require('node:assert/strict');
    const { pipe, pipeStrict, pipeSideEffect, SideEffect, runPipeResult } = require('fp-pack');
    const { range, toArray } = require('fp-pack/stream');
    assert.equal(pipe(2, x => x + 1, x => x * 2), 6);
    assert.equal(pipeStrict(2, x => x + 1, x => x * 2), 6);
    assert.deepEqual(Object.keys(pipe), []);
    assert.deepEqual(await pipe(range(0, 3), toArray), [0, 1, 2]);
    let called = false;
    const stopped = pipeSideEffect(1, () => SideEffect.of(() => 'STOP'), () => { called = true; return 2; });
    assert.equal(runPipeResult(stopped), 'STOP'); assert.equal(called, false);
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `]);
  console.log(`Packed ${metadata.version} metadata, ESM and CommonJS runtime passed. Consumer artifacts: ${consumer}`);
} catch (error) {
  if (error.stdout) process.stderr.write(error.stdout);
  if (error.stderr) process.stderr.write(error.stderr);
  throw error;
}
