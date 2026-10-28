/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Proxy /api/countries to the REST Countries v3.1 dataset to avoid CORS.
      '/api/countries': {
        target: 'https://gitlab.com/restcountries/restcountries/-/raw/master/src/main/resources',
        changeOrigin: true,
        rewrite: () => '/countriesV3.1.json'
      }
    }
  },
  test: {
    environment: 'jsdom'
  }
})
