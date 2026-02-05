import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/PII-Website-MachineLearning/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
