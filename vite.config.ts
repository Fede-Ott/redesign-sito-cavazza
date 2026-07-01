import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function assetResolver() {
  return {
    name: 'asset-resolver',
    resolveId(id) {
      if (id.includes(':asset/')) {
        const filename = id.split(':asset/')[1]
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    assetResolver(),
    // The React and Tailwind plugins are required for the project, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    watch: {
      // Some assets may be locked by OneDrive or other system processes on Windows.
      ignored: ['**/src/assets/**'],
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
