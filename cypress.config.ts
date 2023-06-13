import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl:'https://integration-template-dapp.multiversx.com/',
    setupNodeEvents(on, config) {
    
      // implement node event listeners here
    },
  },
});
