import type { Options } from '@wdio/types';
import fetch from 'node-fetch';

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
    smoke: ['./test/specs/KeystoreScreen/Keystore.e2e.ts']
  },
  // Patterns to exclude.
  exclude: [],

  maxInstances: 1,
  specFileRetries: 2,
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

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 2,
  framework: 'mocha',

  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },
  before: () => {}
};
