// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';
import db from '@astrojs/db';
import auth from 'auth-astro';

// https://astro.build/config
export default defineConfig({
  integrations: [db(), auth()],
  vite: {plugins: [tailwindcss()]},
  output: "server",
  adapter: node({mode: "standalone"}),
  
});