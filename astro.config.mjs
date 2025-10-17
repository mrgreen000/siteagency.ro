import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.siteagency.ro',
  base: '/',
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  }
});
