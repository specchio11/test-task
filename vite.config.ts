import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Repo name on GitHub: https://github.com/<owner>/test-task
// → GitHub Pages will serve at https://<owner>.github.io/test-task/
// Set BASE_PATH at build time (e.g. via GH Actions) if the repo is ever renamed.
const base = process.env.BASE_PATH ?? '/test-task/';

export default defineConfig({
  base,
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
});
