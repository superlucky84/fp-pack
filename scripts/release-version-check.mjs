// Decides whether the manual release workflow publishes package.json's version.
// Already on npm: notice, publish=false. Newer stable x.y.z: publish=true.
// Lower than npm's latest or a prerelease: fail. With GITHUB_OUTPUT set, writes
// `publish` and `version` for later steps.
import { execFileSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';

const { name, version } = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const fail = (message) => {
  console.log(`::error::${message}`);
  process.exit(1);
};

const parse = (value) => /^(\d+)\.(\d+)\.(\d+)$/.exec(value)?.slice(1).map(Number);
const compare = (a, b) => a.reduce((result, part, i) => result || part - b[i], 0);

const publishedVersions = () => {
  try {
    const output = execFileSync('npm', ['view', name, 'versions', '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    const versions = JSON.parse(output);
    return Array.isArray(versions) ? versions : [versions];
  } catch (error) {
    // Never published means a first release; any other registry error stops the run.
    if (String(error.stderr ?? '').includes('E404')) return [];
    throw error;
  }
};

const current = parse(version);
if (!current) {
  fail(`${name}@${version} is not a stable x.y.z version. Publish prereleases manually with a dist-tag.`);
}

const versions = publishedVersions();
const publish = !versions.includes(version);
if (publish) {
  const latest = versions.map(parse).filter(Boolean).sort(compare).at(-1);
  if (latest && compare(current, latest) < 0) {
    fail(`${name}@${version} is lower than the published ${latest.join('.')}. Bump package.json.`);
  }
  console.log(`${name}@${version} is not on npm yet${latest ? ` (latest ${latest.join('.')})` : ''}; publishing.`);
} else {
  console.log(`::notice::${name}@${version} is already on npm; nothing to publish. Bump package.json to release.`);
}

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `publish=${publish}\nversion=${version}\n`);
}
