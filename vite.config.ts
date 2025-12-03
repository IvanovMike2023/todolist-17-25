import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import pluginChecker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),pluginChecker({ typescript: true })],
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
})
