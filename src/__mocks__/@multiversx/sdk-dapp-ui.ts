// Mock for @multiversx/sdk-dapp-ui package
// This prevents Jest from trying to load web components that aren't compatible with jsdom

export const getDetectedBrowser = jest.fn(() => ({
  name: 'chrome',
  version: '120.0.0'
}));

export const BrowserEnum = {
  CHROME: 'chrome',
  FIREFOX: 'firefox',
  SAFARI: 'safari',
  EDGE: 'edge',
  OPERA: 'opera',
  UNKNOWN: 'unknown'
} as const;

export default {
  getDetectedBrowser,
  BrowserEnum
};
