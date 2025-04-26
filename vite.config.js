import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0', // <-- allows access from other devices on the network
    port: 5175       // <-- optional, only if you want a fixed port
  }
})