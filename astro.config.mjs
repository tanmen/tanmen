// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Tailwind v4 is wired via PostCSS (postcss.config.mjs) instead of the Vite
// plugin, which is currently incompatible with Astro 6's rolldown-vite.
// https://astro.build/config
export default defineConfig({
  site: 'https://tanmen.work',
  integrations: [react(), mdx(), sitemap()],
});
