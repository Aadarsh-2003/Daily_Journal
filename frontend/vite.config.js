import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import jsconfigPaths from "vite-jsconfig-paths"
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),jsconfigPaths()],
})
