import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
  server: {
    host: '0.0.0.0', // allows access from other devices on the network
    port: 5175,      // optional, only if you want a fixed port
    historyApiFallback: true, // support SPA routing in dev
    middlewareMode: false, // ensure server is not in middleware mode
    fs: {
      strict: false, // allow serving files outside root if necessary
    },
    hmr: true // keep hot module reload active
  }
})