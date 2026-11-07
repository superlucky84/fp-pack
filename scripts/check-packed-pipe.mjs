import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { copyFileSync, mkdtempSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
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
  const usabilityFiles = [
    'src/implement/composition/curryN.type-test.ts',
    'src/implement/composition/data-inference.type-test.ts',
    'src/implement/composition/boundary-inference.type-test.ts',
    'src/implement/composition/inference-hardening.type-test.ts',
    'src/stream/inference.type-test.ts',
  ];
  const additionalFiles = usabilityFiles.map((path, index) => {
    const filename = `usability-${index}.ts`;
    const content = readFileSync(join(root, path), 'utf8')
      .replace(/from '(?:\.\.\/)+stream\/index'/g, "from 'fp-pack/stream'")
      .replace(/from '(?:\.\.\/)+index'/g, "from 'fp-pack'")
      .replace(/from '\.\/index'/g, "from 'fp-pack/stream'");
    writeFileSync(join(consumer, filename), content);
    return filename;
  });
  // Compile the marked, user-facing examples verbatim against the installed API.
  const pages = join(root, 'docs/src/pages');
  const docSources = [join(root, 'README.md'), ...readdirSync(pages).filter(p => p.endsWith('.tsx')).map(p => join(pages, p))];
  let exampleCount = 0;
  for (const path of docSources) {
    const content = readFileSync(path, 'utf8');
    const pattern = path.endsWith('.md')
      ? /<!-- inference-usability:[^\n]* -->\s*```(?:typescript|ts)\n([\s\S]*?)```/g
      : /\{\/\* inference-usability:[^\n]* \*\/\}\s*<CodeBlock\s+language="typescript"\s+code=\{`([\s\S]*?)`\}/g;
    for (const match of content.matchAll(pattern)) {
      const filename = `docs-example-${exampleCount++}.ts`;
      writeFileSync(join(consumer, filename), match[1] + '\nexport {};\n');
      additionalFiles.push(filename);
    }
  }
  assert.ok(exampleCount >= 10, 'Missing marked inference documentation examples');
  writeFileSync(join(consumer, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022', module: 'ESNext', moduleResolution: 'Bundler', strict: true,
      declaration: true, emitDeclarationOnly: true, exactOptionalPropertyTypes: true, types: [], outDir: './declarations',
    }, include: ['consumer.ts', 'regressions.ts', ...additionalFiles],
  }));
  const compilers = [join(root, 'node_modules/typescript/bin/tsc'), ...process.argv.slice(2).map(p => resolve(p))];
  for (const compiler of compilers) {
    run(process.execPath, [compiler, '-p', join(consumer, 'tsconfig.json')]);
    console.log(`${run(process.execPath, [compiler, '--version']).trim()}: packed consumer + declaration emit passed (${exampleCount} documentation examples)`);
  }
  run(process.execPath, ['--input-type=module', '-e', `
    import assert from 'node:assert/strict';
    import { pipe, pipeWithDeps, pipeAsyncSideEffect, from, SideEffect, isSideEffect, evolve, mergeDeep, path, curryN } from 'fp-pack';
    import { range, toArray, toAsync, filter, take, flatten } from 'fp-pack/stream';
    assert.equal(pipe(2, x => x + 1, x => x * 2), 6);
    assert.deepEqual(await pipe(range(0, 3), toArray), [0, 1, 2]);
    const work = pipeWithDeps(pipeAsyncSideEffect)(from(2), async (n, deps) => n + deps.add, n => n.toFixed());
    assert.equal(await work()({ add: 3 }), '5');
    let called = false;
    const stopped = await pipeAsyncSideEffect(1, () => SideEffect.of(() => 'STOP'), () => { called = true; return 2; });
    assert.ok(isSideEffect(stopped)); assert.equal(called, false);
    assert.equal(pipe({ count: 2 }, evolve({ count: n => n.toFixed() })).count, '2');
    assert.deepEqual(mergeDeep({ nested: { count: 'old', keep: true } }, { nested: { count: 2 } }), { nested: { count: 2, keep: true } });
    assert.equal(path(['length'], [1, 2]), 2);
    const firstTwo = take(2);
    assert.deepEqual([...firstTwo([1, 2, 3])], [1, 2]);
    assert.deepEqual(await toArray(firstTwo(Promise.resolve([1, 2, 3]))), [1, 2]);
    assert.deepEqual(await pipe([1, 2, 3], toAsync, filter(async n => n > 1), toArray), [2, 3]);
    assert.deepEqual(await toArray(flatten(toAsync([Promise.resolve([1, 2])]))), [1, 2]);
    const addDefault = (a, b = 10) => a + b;
    assert.equal(curryN(1, addDefault)(2), 12);
    assert.equal(curryN(2, addDefault)(2)(3), 5);
    assert.equal(curryN(3, (...values) => values.length)(1)(2, 3, 4), 4);
  `]);
  run(process.execPath, ['--input-type=commonjs', '-e', `
    (async () => {
    const assert = require('node:assert/strict');
    const { pipe, pipeStrict, pipeSideEffect, SideEffect, runPipeResult, evolve, curryN } = require('fp-pack');
    const { range, toArray, toAsync, filter, take } = require('fp-pack/stream');
    assert.equal(pipe(2, x => x + 1, x => x * 2), 6);
    assert.equal(pipeStrict(2, x => x + 1, x => x * 2), 6);
    assert.deepEqual(Object.keys(pipe), []);
    assert.deepEqual(await pipe(range(0, 3), toArray), [0, 1, 2]);
    let called = false;
    const stopped = pipeSideEffect(1, () => SideEffect.of(() => 'STOP'), () => { called = true; return 2; });
    assert.equal(runPipeResult(stopped), 'STOP'); assert.equal(called, false);
    assert.equal(pipe({ count: 2 }, evolve({ count: n => n.toFixed() })).count, '2');
    assert.deepEqual([...take(2)([1, 2, 3])], [1, 2]);
    assert.deepEqual(await pipe([1, 2, 3], toAsync, filter(async n => n > 1), toArray), [2, 3]);
    assert.equal(curryN(2, (a, b = 10) => a + b)(2)(undefined), 12);
    assert.equal(curryN(0, () => 42)(), 42);
    })().catch(error => { console.error(error); process.exitCode = 1; });
  `]);
  console.log(`Packed ${metadata.version} metadata, ESM and CommonJS runtime passed. Consumer artifacts: ${consumer}`);
} catch (error) {
  if (error.stdout) process.stderr.write(error.stdout);
  if (error.stderr) process.stderr.write(error.stderr);
  throw error;
}
