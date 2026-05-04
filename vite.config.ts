import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

const BACKEND_URL = process.env.VITE_BACKEND_PROXY ?? 'http://127.0.0.1:8000'

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': { target: BACKEND_URL, changeOrigin: true },
      '/admin': { target: BACKEND_URL, changeOrigin: true },
      '/static': { target: BACKEND_URL, changeOrigin: true },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
    },
  },
})
