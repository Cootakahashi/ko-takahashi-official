import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        // sitemap は scripts/sitemap.mjs が唯一の生成器。
        // vite-plugin-sitemap の i18n は suffix/prefix 形式しか出せず、
        // このサイトの `?lang=xx` を表現できないため外した
        // （存在しないURLを検索エンジンに渡してしまう）。
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
