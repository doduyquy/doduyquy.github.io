// @ts-check
import { defineConfig } from 'astro/config';
// for UI
import tailwindcss from '@tailwindcss/vite';
// for markdown
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';


// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }
});