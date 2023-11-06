import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitebook from "vite-plugin-vitebook"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitebook(
    {
      htmlTemplatePath: {
        fullPath: '/home/ganbatte/Desktop/project/vitelearn/src/vitebook/template.html',
        replace: '/src/main.ts'
      },
      scriptTemplatePath: {
        fullPath: '/home/ganbatte/Desktop/project/vitelearn/src/vitebook/main.ts',
        replace: '../App.vue'
      }
    }
  )],
})
