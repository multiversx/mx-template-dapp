import { BATCH_TRANSACTIONS_SC } from 'config';
import { Address, GAS_PRICE, Transaction, VERSION } from 'lib';
import { TransactionProps } from 'types';

export const getWrapAndMultiTransferESDTsTransactions = ({
  address,
  chainID,
  nonce
}: TransactionProps): Transaction[] => {
  return [
    new Transaction({
      chainID,
      gasLimit: BigInt(4200000),
      gasPrice: BigInt(GAS_PRICE),
      nonce: BigInt(nonce),
      receiver: Address.newFromBech32(
        BATCH_TRANSACTIONS_SC.egld_wEGLD.contract
      ),
      sender: Address.newFromBech32(address),
      value: BigInt('1000000000000000000'),
      version: VERSION,
      data: Uint8Array.from(Buffer.from(BATCH_TRANSACTIONS_SC.egld_wEGLD.data))
    }),
    new Transaction({
      chainID,
      gasLimit: BigInt(25500000),
      gasPrice: BigInt(GAS_PRICE),
      nonce: BigInt(nonce),
      receiver: Address.newFromBech32(
        BATCH_TRANSACTIONS_SC.wEGLD_USDC.contract
      ),
      sender: Address.newFromBech32(address),
      value: BigInt('0'),
      version: VERSION,
      data: Uint8Array.from(Buffer.from(BATCH_TRANSACTIONS_SC.wEGLD_USDC.data))
    }),
    new Transaction({
      chainID,
      gasLimit: BigInt(2000000),
      gasPrice: BigInt(GAS_PRICE),
      nonce: BigInt(nonce),
      receiver: Address.newFromBech32(address),
      sender: Address.newFromBech32(address),
      value: BigInt('0'),
      version: VERSION,
      data: Uint8Array.from(
        Buffer.from(
          'MultiESDTNFTTransfer@' +
            address +
            '@02@' +
            '5745474C442D613238633539@00@0de0b6b3a7640000@' +
            '555344432D333530633465@00@0de0b6b3a7640000'
        )
      )
    })
  ];
};
