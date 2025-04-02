import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // Öffnet den Browser automatisch
  },
  build: {
    outDir: 'build', // Output-Verzeichnis für den Build
  },
});