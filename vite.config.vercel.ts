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
    // Increase warning threshold — we're splitting properly below
    chunkSizeWarningLimit: 400,
    rollupOptions: {
      input: resolve(__dirname, 'index.spa.html'),
      output: {
        // Manual chunk splitting for optimal caching
        manualChunks: {
          // Core React runtime — almost never changes
          'vendor-react': ['react', 'react-dom'],
          // TanStack router + query — changes on lib updates
          'vendor-tanstack': [
            '@tanstack/react-router',
            '@tanstack/react-query',
          ],
          // Supabase SDK
          'vendor-supabase': ['@supabase/supabase-js'],
          // Zod + form handling
          'vendor-forms': ['zod', '@hookform/resolvers', 'react-hook-form'],
          // Heavy Radix UI primitives
          'vendor-radix': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-label',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
            '@radix-ui/react-switch',
          ],
          // UI utilities
          'vendor-ui': ['lucide-react', 'sonner', 'class-variance-authority', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
  // Improve dev server performance
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@tanstack/react-router',
      '@tanstack/react-query',
      '@supabase/supabase-js',
    ],
  },
});
