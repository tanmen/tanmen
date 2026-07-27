// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Tailwind v4 is wired via the official Vite plugin. The PostCSS route stopped
// working on Astro 7 / Vite 8, where the built-in @import resolver treats the
// bare `@import "tailwindcss"` specifier as a file path.
// https://astro.build/config
export default defineConfig({
  site: 'https://tanmen.work',
  // Astro 7 changed the default to 'jsx', which strips whitespace between tags
  // the way React does. That collapses gaps like `● 2020-08-17` inside plain
  // (non-flex) inline runs, so keep the v6 behaviour.
  compressHTML: true,
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
