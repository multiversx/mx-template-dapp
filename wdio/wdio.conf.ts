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
    smoke: ['./test/specs/PemScreen/PemSpec.e2e.ts'],
    smoke1: []
  },
  // Patterns to exclude.
  exclude: [],

  maxInstances: 1,
  // specFileRetries: 5,
  specFileRetriesDeferred: true,

  capabilities: [
    {
      browserName: 'chrome',
      // browserVersion: '116.0.5793.0',
      'goog:chromeOptions': {
        args: [
          '--disable-infobars',
          '--start-maximized',
          '--no-sandbox'
          // '--headless=new'
        ]
      },
      acceptInsecureCerts: true
    }
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  // connectionRetryTimeout: 120000,
  // connectionRetryCount: 5,
  framework: 'mocha',

  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000
  },
  before: () => {}
};
