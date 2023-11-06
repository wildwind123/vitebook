import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib/vitebook.ts"),
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
