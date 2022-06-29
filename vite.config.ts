import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression  from 'vite-plugin-compression'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteCompression()],
  resolve: { alias: { '@': path.resolve(__dirname, "src") } },
  server: {
    host: '0.0.0.0'
  }
})
