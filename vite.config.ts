import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: process.env.GITHUB_PAGES === 'true' ? '/AeroBMSCE_TASK_REPO/' : '/',
    plugins: [react(), tailwindcss()],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      // Configure development server hot reloading.
      hmr: process.env.DISABLE_HMR !== 'true',

      // Allow file watching to be disabled when needed.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});