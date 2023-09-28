import { BatchTransactionsType } from '../types';

export const getSwapAndLockTransactions = (
  address: string
): BatchTransactionsType => {
  return {
    transactions: [
      {
        sender: address,
        receiver:
          'erd1qqqqqqqqqqqqqpgq7ykazrzd905zvnlr88dpfw06677lxe9w0n4suz00uh',
        gasLimit: '4200000',
        data: 'wrapEgld',
        value: '1000000000000000000'
      },
      {
        sender: address,
        value: '0',
        receiver:
          'erd1qqqqqqqqqqqqqpgqq67uv84ma3cekpa55l4l68ajzhq8qm3u0n4s20ecvx',
        gasLimit: '25500000',
        data: 'ESDTTransfer@5745474c442d643763366262@06f05b59d3b20000@73776170546f6b656e734669786564496e707574@555344432d386434303638@01'
      },
      {
        sender: address,
        value: '0',
        receiver:
          'erd1qqqqqqqqqqqqqpgquu5rsa4ee6l4azz6vdu4hjp8z4p6tt8m0n4suht3dy',
        gasLimit: '12000000',
        data: 'ESDTTransfer@5745474c442d643763366262@06f05b59d3b20000@73776170546f6b656e734669786564496e707574@4d45582d646332383963@01'
      },
      {
        sender: address,
        value: '0',
        receiver:
          'erd1qqqqqqqqqqqqqpgqp6qrf7yp4l25c08384vgdghz7wz0f60h0n4s0m88l4',
        gasLimit: '10000000',
        data: 'ESDTTransfer@4d45582d646332383963@0de0b6b3a7640000@6c6f636b546f6b656e73@05a0'
      }
    ],
    order: [[0], [1, 2], [3]]
  };
};
