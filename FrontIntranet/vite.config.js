import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
//debemos configurara con los valores 
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Esto permite acceder desde fuera del contenedor
    port: 5174,        // El puerto que has mapeado en Docker
    watch: {
      usePolling: true,          // 👈 NECESARIO para Docker en Mac/Windows
      interval: 100,             // 👈 Opcional: reduce la latencia
    },
    strictPort: true,
  },
})
