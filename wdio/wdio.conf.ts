import type { Options } from '@wdio/types';

export const config: Options.Testrunner = {
  runner: 'local',
  execArgv: ['--inspect'],

  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: './tsconfig.json',
      transpileOnly: true
    }
  },

  specs: ['./test/specs/**/*.ts'],
  suites: {
    smoke: [
      './test/specs/KeystoreScreen/Keystore.e2e.ts',
      './test/specs/URLScripts/URLScripts.ts',
      './test/specs/NegativeTests/NegativeTests.e2e.ts'
    ]
  },
  // Patterns to exclude.
  exclude: [],

  maxInstances: 1,
  specFileRetries: 1,
  specFileRetriesDeferred: true,

  capabilities: [
    {
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--disable-infobars',
          '--start-maximized',
          '--no-sandbox',
          '--headless=new'
        ]
      },
      acceptInsecureCerts: true
    }
  ],

  logLevel: 'error',
  bail: 0,
  waitforTimeout: 250000,
  connectionRetryTimeout: 12000,
  connectionRetryCount: 2,
  framework: 'mocha',
  groupLogsByTestSpec: true,
  reporters: ['spec', 'concise'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 250000
  },
  before: () => {}
};
