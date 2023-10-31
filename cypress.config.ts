import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://integration.template-dapp.multiversx.com/',
    defaultCommandTimeout: 30000,
    responseTimeout: 70000,
    requestTimeout: 70000,
    chromeWebSecurity: false,
    screenshotOnRunFailure: false,
    video: false,
    videoUploadOnPasses: false,
    testIsolation: false
  }
});
