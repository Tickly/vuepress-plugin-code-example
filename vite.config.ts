import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: path.resolve(__dirname, 'src/index.ts')
    }
  }
})