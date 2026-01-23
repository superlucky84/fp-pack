import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from 'fs';
import { dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);

const skillsSourceRoot = `${projectRoot}/skills`;
const skillsDistRoot = `${projectRoot}/dist/skills`;
const aiAddonsRoot = `${projectRoot}/dist/ai-addons`;

// Reset dist/skills and create dist/ai-addons directories
rmSync(skillsDistRoot, { recursive: true, force: true });
mkdirSync(skillsDistRoot, { recursive: true });
mkdirSync(aiAddonsRoot, { recursive: true });

const packageJson = JSON.parse(
  readFileSync(`${projectRoot}/package.json`, 'utf8')
);
const version = packageJson.version ?? '0.0.0';

const copySkillsTree = (sourceDir, targetDir) => {
  mkdirSync(targetDir, { recursive: true });
  const entries = readdirSync(sourceDir, { withFileTypes: true });

  entries.forEach((entry) => {
    const sourcePath = join(sourceDir, entry.name);
    const targetPath = join(targetDir, entry.name);

    if (entry.isDirectory()) {
      copySkillsTree(sourcePath, targetPath);
      return;
    }

    if (!entry.isFile()) {
      return;
    }

    if (extname(entry.name) === '.md') {
      const content = readFileSync(sourcePath, 'utf8');
      const withVersion = content.replace(/{{version}}/g, version);
      writeFileSync(targetPath, withVersion);
      return;
    }

    copyFileSync(sourcePath, targetPath);
  });
};

// Copy skills directory to dist/skills with version injected in markdown files
copySkillsTree(skillsSourceRoot, skillsDistRoot);

console.log('✓ Copied skills/ to dist/skills/');

// Process fp-pack-agent-addon.md (agent role add-on)
const addonSource = readFileSync(`${projectRoot}/fp-pack-agent-addon.md`, 'utf8');
const addonWithVersion = addonSource.replace(/^(# fp-pack Agent Role Add-on)/m, `$1\n\nDocument Version: ${version}`);

// Copy fp-pack-agent-addon.md to dist/ai-addons/ with version injected
writeFileSync(`${aiAddonsRoot}/fp-pack-agent-addon.md`, addonWithVersion);

console.log('✓ Copied fp-pack-agent-addon.md to dist/ai-addons/');
