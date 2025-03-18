/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),nodePolyfills()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts', // Configurazione globale per i test
  },
})

