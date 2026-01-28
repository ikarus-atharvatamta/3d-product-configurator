import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),'tailwind-scrollbar','tailwind-scrollbar-hide'],
  server:{
    allowedHosts: ["nonacutely-incised-catherine.ngrok-free.dev"]
  }
})
