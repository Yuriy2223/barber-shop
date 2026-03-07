import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import injectHTML from 'vite-plugin-html-inject';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  plugins: [
    tailwindcss(),
    injectHTML(),
    ViteImageOptimizer({
      png: { quality: 70 },
      jpeg: { quality: 70 },
      webp: { quality: 70 },
    }),
  ],
  server: {
    host: true,
    // port: 3000,
  },
});
