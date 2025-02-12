import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron/simple';



//const getRandomPort = () => Math.floor(Math.random() * (4000 - 3000 + 1)) + 3000;


export default defineConfig(async () => {

  return {
    plugins: [
      react(), 
      electron({
        main: {
          entry: 'electron/main.ts',
        },
        preload: {
          input: "electron/preload.ts",
        },
        
      })
    ],
    build: {
      outDir: 'dist',
    },
    server: {
     // port: getRandomPort(),
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
