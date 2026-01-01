import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite';
import lithentVitePlugin from '@lithent/lithent-vite';

export default defineConfig({
  base: '/fp-kit/',
  plugins: [
    lithentVitePlugin(),
    tailwindcss(),
    checker({
      typescript: true,
      eslint: {
        useFlatConfig: true,
        lintCommand: 'eslint "src/**/*.{ts,tsx}"',
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    emptyOutDir: false,
    sourcemap: true,
  },
  server: {
    open: '/index.html',
  },
});
