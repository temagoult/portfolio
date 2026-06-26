import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'node:path'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [vue(), vuetify({
    autoImport: true,
    styles: {
      configFile: path.posix.join(
        fileURLToPath(new URL('./src/styles/settings.scss', import.meta.url)).replace(/\\/g, '/')
      )
    }
  }), cloudflare()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})