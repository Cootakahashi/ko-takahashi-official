import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        Sitemap({
          hostname: 'https://ko-takahashi.com',
          dynamicRoutes: ['/story', '/schedule', '/articles', '/about', '/links'],
          changefreq: 'weekly',
          priority: 0.8,
          lastmod: new Date().toISOString(),
        }),
      ],
      // NOTE: API keys must NOT be exposed to client bundles.
      // Use server-side API routes or edge functions instead.
      // define: { 'process.env.GEMINI_API_KEY': ... } — removed for security.
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              'three': ['three', '@react-three/fiber', '@react-three/drei'],
              'framer': ['framer-motion'],
            }
          }
        }
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
