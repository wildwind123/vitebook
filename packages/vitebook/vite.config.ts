import { defineConfig } from "vite";
import path from "path";
import vitebook from "./src/lib/pluginsource/vitebook.ts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitebook(
    {
      htmlTemplatePath: {
        fullPath: path.resolve(__dirname, './index.html'),
        replace: '/src/main.ts'
      },
      scriptTemplatePath: {
        fullPath: path.resolve(__dirname, './src/main2.ts'),
        replace: './counter.ts'
      }
    }
  )],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/pluginsource/vitebook.ts"),
      name: "vitebook",
      fileName: "vitebook",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["fsevents", "fs", "vite", "path", "url"],
    },
    outDir: "src/lib/plugin",
  },
});
