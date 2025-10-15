import { TextDecoder, TextEncoder } from 'util';

Object.assign(global, {
  TextDecoder,
  TextEncoder,
  setImmediate: jest.useRealTimers
});

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

Object.defineProperty(BigInt.prototype, 'toJSON', {
  value() {
    return this.toString();
  },
  configurable: true,
  writable: true
});

expect.addSnapshotSerializer({
  test: (val: any) => typeof val === 'bigint',
  print: (val: any) => `${val.toString()}n`
});
