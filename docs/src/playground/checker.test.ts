import { readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import ts from 'typescript';
import { createChecker } from './checker';
import { getProgram, presets, typeExamples } from './scenarios';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const files: Record<string, string> = {};
function collect(directory: string, virtual: string) {
  for (const file of readdirSync(directory, { withFileTypes: true })) {
    const path = resolve(directory, file.name);
    if (file.isDirectory()) collect(path, `${virtual}/${file.name}`);
    else if (
      file.name.endsWith('.ts') &&
      !/\.(?:type-)?test\.ts$/.test(file.name)
    ) {
      files[`${virtual}/${file.name}`] = readFileSync(path, 'utf8');
    }
  }
}
collect(resolve(root, 'src'), '/fp-pack');
const lib = dirname(ts.getDefaultLibFilePath({}));
for (const file of readdirSync(lib)) {
  if (/^lib\..*\.d\.ts$/.test(file))
    files[`/lib/${file}`] = readFileSync(resolve(lib, file), 'utf8');
}
const check = createChecker(files);

describe('playground actual TypeScript checker', () => {
  for (const preset of presets) {
    it(`compiles the visible ${preset.id} program without hints`, () => {
      const report = check(getProgram(preset.state));
      expect(report.diagnostics).toEqual([]);
      expect(report.types.length).toBeGreaterThan(0);
    });
  }
  for (const example of typeExamples) {
    it(`checks ${example.id}: ${example.valid ? 'valid' : 'invalid'}`, () => {
      const report = check(example.code);
      expect(report.diagnostics.length === 0).toBe(example.valid);
      if (!example.valid) expect(report.diagnostics[0].line).toBeGreaterThan(0);
    });
  }
  it('reports inferred intermediate types and a precise diagnostic', () => {
    const report = check(`import { curryN, pipe, evolve } from 'fp-pack';
const saved = curryN(2, (a: number, b = 10) => a + b)(2);
const result = saved(3);
const transformed = pipe({ count: 3 }, evolve({ count: n => n.toFixed() }));
transformed.count.toFixed();`);
    expect(report.types.find(type => type.name === 'result')?.type).toBe(
      'number'
    );
    expect(
      report.types.find(type => type.name === 'transformed')?.type
    ).toContain('count: string');
    expect(report.types.find(type => type.name === 'saved')?.type).toContain(
      'CurriedArgs'
    );
    expect(report.diagnostics.map(diagnostic => diagnostic.code)).toEqual([
      2551,
    ]);
  });
});
