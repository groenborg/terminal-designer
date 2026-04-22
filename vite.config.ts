/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  base: "/terminal-designer/",
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
});
