import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tauri from "vite-plugin-tauri";

export default defineConfig({
  plugins: [
    react(),
    tauri({
      // Opciones opcionales:
      // outDir: 'dist',          // carpeta donde Vite escribe los assets (por defecto "dist")
      // binaryName: 'batstats'   // nombre del binario (por defecto = package.name)
    })
  ],
 clearScreen: false,
 server: {
   open: false,
 },
});
