# Vitebook
Storybook alternative, this is alpha version

Supported all framework which support vite. Work only dev command.


## How use

### Example config of vue 3

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitebook from "vite-plugin-vitebook"
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vitebook(
    {
      htmlTemplatePath: {
        fullPath: path.resolve(__dirname, './index.html'), // this is html template
        replace: '/src/main.ts' // this will replaced from scriptTemplatePath.scriptTemplatePath
      },
      scriptTemplatePath: {
        fullPath: path.resolve(__dirname, './src/main.ts'), // this is script template
        replace: './App.vue' // this will replaced selected book
      }
    }
  )],
})

```
### Then run vite with host config, for this change package.json

```json
 "scripts": {
    "dev": "vite --host",
    ...
  },
```

### Open url 
```
http://book.127-0-0-1.nip.io:5173/
<!-- this url will open ip 127.0.0.1:5173 -->
```
### Create story

```
Example.story.vue
<!-- should will appear on http://book.127-0-0-1.nip.io:5173/ -->
```

### source code

```url
https://github.com/wildwind123/vitebook
```