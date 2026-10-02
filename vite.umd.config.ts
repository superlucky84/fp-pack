import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FpPack',
    },
    rollupOptions: {
      external: [],
      output: ['fp-pack.umd.js', 'fp-pack.umd.cjs'].map((entryFileNames) => ({
        format: 'umd' as const,
        name: 'FpPack',
        entryFileNames,
        globals: {},
      })),
      treeshake: {
        moduleSideEffects: false,
      },
    },
    sourcemap: true,
    emptyOutDir: false,
  },
});
