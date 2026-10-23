/// <reference types="vite/client" />
import { createChecker } from './checker';

const sourceFiles = import.meta.glob(
  [
    '../../../src/**/*.ts',
    '!../../../src/**/*.test.ts',
    '!../../../src/**/*.type-test.ts',
  ],
  { query: '?raw', import: 'default', eager: true }
);
const libraryFiles = import.meta.glob(
  '../../../node_modules/typescript/lib/lib.*.d.ts',
  {
    query: '?raw',
    import: 'default',
    eager: true,
  }
);
const files: Record<string, string> = {};
for (const [path, text] of Object.entries(sourceFiles))
  files[path.replace('../../../src/', '/fp-pack/')] = String(text);
for (const [path, text] of Object.entries(libraryFiles))
  files[`/lib/${path.split('/').pop()}`] = String(text);
const check = createChecker(files);

self.onmessage = (event: MessageEvent<{ id: number; code: string }>) => {
  const { id, code } = event.data;
  try {
    self.postMessage({ id, report: check(code) });
  } catch (error) {
    self.postMessage({
      id,
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
