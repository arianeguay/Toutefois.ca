import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Proxy API requests to the WordPress backend
      '/wp-json': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false
      }
    }
  },
})
