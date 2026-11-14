import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

// Logic lives in plain modules (utils, composables with injected seams), so tests run in Node
// without the Nuxt runtime. `~` and `@` point at src/, as in Nuxt.
const srcDir = fileURLToPath(new URL('./src', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '~': srcDir,
      '@': srcDir,
    },
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['src/**/*.{test,spec}.ts'],
  },
})
