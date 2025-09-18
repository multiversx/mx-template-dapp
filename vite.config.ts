import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import type { PluginOption } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ command }) => ({
  server: {
    port: Number(process.env.PORT) || 3000,
    strictPort: true,
    host: true,
    https: true,
    watch: {
      usePolling: false,
      useFsEvents: false
    },
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    basicSsl(),
    tsconfigPaths(),
    svgrPlugin(),
    nodePolyfills({
      globals: { Buffer: true, global: true, process: true }
    }),
    ...(command === 'build'
      ? [analyzer({ analyzerMode: 'server' }) as unknown as PluginOption]
      : [])
  ],
  resolve: {
    dedupe: ['@multiversx/sdk-core']
  },
  css: {
    postcss: './postcss.config.js'
  },
  build: {
    outDir: 'build'
  },
  preview: {
    port: 3002,
    https: true,
    host: 'localhost',
    strictPort: true
  }
}));
