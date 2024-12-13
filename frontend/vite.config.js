import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    outDir: "../backend/public", // Construir el frontend en la carpeta del backend para render
  },
  server: {
    proxy: {
      /* "/api": "http://localhost:3000",  */ // Proxy para evitar problemas de CORS para render
      "/api": "https://hito4-integracion-backend.onrender.com",
    },
  },
});
