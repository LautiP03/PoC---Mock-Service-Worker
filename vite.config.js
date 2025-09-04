import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permite usar funciones globales como describe, test, expect, render
    environment: 'jsdom', // ¡MUY IMPORTANTE! Indica a Vitest que simule un DOM
    setupFiles: './src/setupTests.js', // Asegúrate de que este archivo exista y esté bien configurado
  },
})
