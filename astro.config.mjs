import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://mrgreen000.github.io',
  // Use base path only in production (GitHub Pages)
  base: import.meta.env.PROD ? '/agency/' : '/',
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  }
});
