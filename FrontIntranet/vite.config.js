import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    watch: {
      usePolling: true,
      interval: 100,
    },
    strictPort: true,
    allowedHosts: ['a57ef87e98be.ngrok-free.app'], // 👈 Aquí está el fix
  },
})
