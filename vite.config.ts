import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/PageLove', // nome do repositório
  plugins: [react()],
})
