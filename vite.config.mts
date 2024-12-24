import { defineConfig } from 'vitest/config'
import tsconfigpath from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigpath()],
})
