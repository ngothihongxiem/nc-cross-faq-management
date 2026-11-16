import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

// Logic lives in plain modules (utils, composables with injected seams), so tests run in Node
// without the Nuxt runtime. `~` and `@` point at src/, `#shared` at shared/, as in Nuxt.
const srcDir = fileURLToPath(new URL('./src', import.meta.url))
const sharedDir = fileURLToPath(new URL('./shared', import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '~': srcDir,
      '@': srcDir,
      '#shared': sharedDir,
    },
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['{src,shared,server}/**/*.{test,spec}.ts'],
  },
})
