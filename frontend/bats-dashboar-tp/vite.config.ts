import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 54992,
    proxy: {
      '/batstats': {
        target: 'http://localhost:33899',
        changeOrigin: true,
      },
    },
  },
  define: {
    global: 'window',
    self: 'window',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    exclude: [...configDefaults.exclude, 'node_modules/**/*'],
  },
});
