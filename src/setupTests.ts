import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, {
  TextDecoder,
  TextEncoder,
  setImmediate: jest.useRealTimers
});
