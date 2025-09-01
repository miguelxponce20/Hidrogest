import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// reconstruimos __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, '..')); // lee .env desde la raíz
  return {
    plugins: [react()],
    define: {
      'process.env': env
    }
  };
});