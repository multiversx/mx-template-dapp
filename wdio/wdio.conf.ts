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
    smoke: ['./test/specs/PemScreen/PemSpec.e2e.ts']
  },
  // Patterns to exclude.
  exclude: [],

  maxInstances: 5,
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
    },
    {
      browserName: 'safari'
    }
  ],
  logLevel: 'error',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  framework: 'mocha',
  groupLogsByTestSpec: true,
  reporters: ['spec', 'concise'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },
  before: () => {}
};
