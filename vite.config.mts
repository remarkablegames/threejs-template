import { resolve } from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  build: {
    assetsInlineLimit: 0,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'babylon',
              test: /node_modules[\\/]@babylonjs[\\/]core/,
            },
          ],
        },
      },
    },
  },

  plugins: [tailwindcss(), createHtmlPlugin()],

  resolve: {
    alias: {
      src: resolve(import.meta.dirname, './src'),
    },
  },
});
