import { defineConfig, configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

async function loadTsconfigPaths() {
  // Use dynamic import inside an async function
  const tsconfigPaths = (await import('vite-tsconfig-paths')).default;
  return tsconfigPaths;
}

export default defineConfig(async () => {
  const tsconfigPaths = await loadTsconfigPaths(); // load dynamically

  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 54992,
      proxy: {
        '/batstats': {
          target: 'http://localhost:33899',
          changeOrigin: true,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts',
      exclude: ['node_modules', 'dist', 'coverage', '**/*.d.ts'],
    },
  };
});
