import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://second-brain-app-4kkn.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
