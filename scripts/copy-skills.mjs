import { mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);

const skillsRoot = `${projectRoot}/dist/skills`;
const codexSkillDir = `${skillsRoot}/fp-pack`;
const aiAddonsRoot = `${projectRoot}/dist/ai-addons`;

// Create dist/skills and dist/ai-addons directories
mkdirSync(skillsRoot, { recursive: true });
mkdirSync(codexSkillDir, { recursive: true });
mkdirSync(aiAddonsRoot, { recursive: true });

const packageJson = JSON.parse(
  readFileSync(`${projectRoot}/package.json`, 'utf8')
);
const version = packageJson.version ?? '0.0.0';

// Process fp-pack.md (skills document)
const skillsSource = readFileSync(`${projectRoot}/fp-pack.md`, 'utf8');
const skillsWithVersion = skillsSource.replace('{{version}}', version);

// Copy fp-pack.md to dist/skills/ with version injected
writeFileSync(`${skillsRoot}/fp-pack.md`, skillsWithVersion);

const codexFrontmatter = `---\nname: fp-pack\ndescription: Use when working in projects that use fp-pack; follow pipe, SideEffect, and curry guidelines.\nmetadata:\n  short-description: fp-pack workflow\n---\n\n`;
const codexSkillContent = `${codexFrontmatter}${skillsWithVersion}`;

// Copy fp-pack.md to dist/skills/fp-pack/SKILL.md for Codex with YAML frontmatter
writeFileSync(`${codexSkillDir}/SKILL.md`, codexSkillContent);

console.log('✓ Copied fp-pack.md to dist/skills/');
console.log('✓ Copied SKILL.md to dist/skills/fp-pack/');

// Process fp-pack-agent-addon.md (agent role add-on)
const addonSource = readFileSync(`${projectRoot}/fp-pack-agent-addon.md`, 'utf8');
const addonWithVersion = addonSource.replace(/^(# fp-pack Agent Role Add-on)/m, `$1\n\nDocument Version: ${version}`);

// Copy fp-pack-agent-addon.md to dist/ai-addons/ with version injected
writeFileSync(`${aiAddonsRoot}/fp-pack-agent-addon.md`, addonWithVersion);

console.log('✓ Copied fp-pack-agent-addon.md to dist/ai-addons/');
