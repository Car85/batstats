import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tauri from "vite-plugin-tauri";
import postcss from "postcss";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tauri({
      // Opciones opcionales:
      // outDir: 'dist',          // carpeta donde Vite escribe los assets (por defecto "dist")
      // binaryName: 'batstats'   // nombre del binario (por defecto = package.name)
    })
  ],
 css: { postcss },
 clearScreen: false,
 server: {
   port: 5173,
   stricPort: true,
 },
});
