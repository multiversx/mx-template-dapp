import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'E2E Report',
    inlineAssets: true,
    saveAllAttempts: true,
    mochaFile: 'results/my-test-output-[hash].xml',
    overwrite: false,
    html: false,
    json: true,
    embeddedScreenshots: true
  },
  e2e: {
    baseUrl: 'https://integration.template-dapp.multiversx.com/',
    defaultCommandTimeout: 30000,
    responseTimeout: 70000,
    requestTimeout: 70000,
    chromeWebSecurity: false,
    screenshotOnRunFailure: true,
    video: true,
    videoUploadOnPasses: false,
    testIsolation: false
  }
});
