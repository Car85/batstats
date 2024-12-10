import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 54992,
    proxy: {
      'batstats':{
        target: 'http://localhost:33899',
        changeOrigin:true,
      }
    }
  },
});
