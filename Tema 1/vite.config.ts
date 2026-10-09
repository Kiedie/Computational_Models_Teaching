import { defineConfig } from 'vite'

export default defineConfig({
  // La versión actual de Slidev genera un CSS que lightningcss no sabe minificar.
  build: { cssMinify: false },
})
