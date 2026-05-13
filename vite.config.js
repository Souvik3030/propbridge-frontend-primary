import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy:{
      '/api':{
        target: 'http://65.1.249.176/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/sanctum': {
        target: 'http://65.1.249.176/',
        changeOrigin: true,
      },
      '/storage': {
        target: 'http://65.1.249.176/',
        changeOrigin: true,
      }
    }
  }
})
