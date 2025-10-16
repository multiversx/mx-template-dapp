/**
 * Synpress configuration for MetaMask wallet testing
 *
 * This configuration centralizes Synpress settings for the project.
 * Synpress v4 uses a simpler configuration approach without defineConfig.
 */
export default {
  // Cache directory for Synpress browser extensions and wallet data
  // This directory is already ignored in .gitignore
  cacheDir: '.cache-synpress',

  // Path to the wallet setup file that configures MetaMask
  wallet: './tests/test/wallet-setup/basic.setup.ts',

  // Browser configuration
  headless: process.env.CI === 'true',

  // Debug options for troubleshooting
  debug: process.env.DEBUG === 'true',

  // Additional browser launch options
  browserArgs: [
    '--start-maximized',
    '--disable-web-security',
    '--disable-features=VizDisplayCompositor'
  ]
};
