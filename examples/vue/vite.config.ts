import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitebook from "vite-plugin-vitebook"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitebook(
    {
      htmlTemplatePath: {
        fullPath: path.resolve(__dirname, './index.html'),
        replace: '/src/main.ts'
      },
      scriptTemplatePath: {
        fullPath: path.resolve(__dirname, './src/main.ts'),
        replace: './App.vue'
      }
    }
  )],
})
