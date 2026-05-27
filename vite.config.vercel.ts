/**
 * Vercel-specific Vite config — pure client-side SPA (no SSR, no CF Workers).
 * Usage: vite build --config vite.config.vercel.ts
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    TanStackRouterVite({ quoteStyle: 'single' }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  define: {
    'import.meta.env.SSR': JSON.stringify(false),
  },
  build: {
    outDir: 'dist/spa',
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'index.spa.html'),
    },
  },
});
