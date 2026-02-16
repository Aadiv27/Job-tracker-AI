// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';   // ← built-in, no install needed
import path from 'node:path';              // ← built-in

// Emulate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // '@' now points to /src folder correctly
      '@': path.resolve(__dirname, './src'),
    },
  },
});