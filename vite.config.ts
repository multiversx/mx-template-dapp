import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
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
    })
  ],
  build: {
    outDir: 'build',
    rollupOptions: {
      external: [
        '@multiversx/sdk-core',
        '@multiversx/sdk-extension-provider',
        '@multiversx/sdk-hw-provider',
        '@multiversx/sdk-native-auth-client',
        '@multiversx/sdk-network-providers',
        '@multiversx/sdk-opera-provider',
        '@multiversx/sdk-wallet',
        '@multiversx/sdk-wallet-connect-provider',
        '@multiversx/sdk-web-wallet-provider'
      ]
    }
  },
  preview: {
    port: 3002,
    https: true,
    host: 'localhost',
    strictPort: true
  }
});
