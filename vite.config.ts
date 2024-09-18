import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/Jobber",
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        fallback: '404.html',
      }
    }
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
})
