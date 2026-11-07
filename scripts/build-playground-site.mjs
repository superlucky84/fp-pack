import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// A standalone demo build; the normal documentation keeps its GitHub Pages base.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, process.argv[2] ?? 'demo-dist');
const origin = process.argv[3] ? new URL(process.argv[3]).origin : undefined;
const build = spawnSync('npm', ['--prefix', 'docs', 'run', 'build', '--', '--base=/', '--outDir', output], {
  cwd: root, stdio: 'inherit',
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);
const indexPath = resolve(output, 'index.html');
let html = readFileSync(indexPath, 'utf8')
  .replace('<html lang="en">', '<html lang="ko">')
  .replaceAll('fp-pack - Functional Programming Utilities', 'fp-pack · Flow Lab')
  .replaceAll(
    'fp-pack documentation for functional programming utilities, streams, and composition tools in TypeScript.',
    'Interactive fp-pack experiments with real pipelines, curryN, lazy streams and live TypeScript inference.',
  )
  .replace(/<title>.*?<\/title>/s, '<title>fp-pack · Flow Lab</title>')
  .replace('<head>', `<head>\n    <script>if (!location.hash) location.hash = '/ko/playground';</script>`);
if (origin) html = html.replaceAll('https://superlucky84.github.io/fp-pack/', `${origin}/`);
writeFileSync(indexPath, html);
console.log(`Standalone playground ready: ${output}`);
