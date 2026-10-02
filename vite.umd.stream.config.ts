import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/stream/index.ts'),
      name: 'FpPackStream',
    },
    rollupOptions: {
      external: [],
      output: ['fp-pack-stream.umd.js', 'fp-pack-stream.umd.cjs'].map((entryFileNames) => ({
        format: 'umd' as const,
        name: 'FpPackStream',
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
