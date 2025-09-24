import {
  SmartContractTransactionsFactory,
  Token,
  TokenIdentifierValue,
  TokenTransfer,
  TransactionsFactoryConfig,
  TransferTransactionsFactory,
  U32Value
} from '@multiversx/sdk-core/out';

import { BATCH_TRANSACTIONS_SC } from 'config';
import { Address, Transaction } from 'lib';
import { TransactionProps } from 'types';

export const getWrapAndMultiTransferEsdtsTransactions = async ({
  address,
  chainID
}: TransactionProps): Promise<Transaction[]> => {
  const factoryConfig = new TransactionsFactoryConfig({ chainID });
  const factory = new TransferTransactionsFactory({ config: factoryConfig });
  const factorySC = new SmartContractTransactionsFactory({
    config: factoryConfig
  });
  const wEgldToken = new Token({ identifier: 'WEGLD-a28c59' });
  const usdcToken = new Token({ identifier: 'USDC-350c4e' });

  const wrapOneEgld = await factorySC.createTransactionForExecute(
    Address.newFromBech32(address),
    {
      contract: Address.newFromBech32(
        BATCH_TRANSACTIONS_SC.egld_wEGLD.contract
      ),
      function: 'wrapEgld',
      gasLimit: BigInt(10000000000000),
      arguments: [],
      nativeTransferAmount: 1000000000000000000n
    }
  );

  const args: any[] = [
    new TokenIdentifierValue('USDC-350c4e'),
    new U32Value(1)
  ];

  const swapHalfWEgldToUsdc = await factorySC.createTransactionForExecute(
    Address.newFromBech32(address),
    {
      contract: Address.newFromBech32(
        BATCH_TRANSACTIONS_SC.wEGLD_USDC.contract
      ),
      function: 'swapTokensFixedInput',
      gasLimit: BigInt(25500000),
      arguments: args,
      tokenTransfers: [
        new TokenTransfer({ token: wEgldToken, amount: 500000000000000000n })
      ]
    }
  );

  const multiTransferOneUsdcHalfWEgld =
    await factory.createTransactionForTransfer(Address.newFromBech32(address), {
      receiver: Address.newFromBech32(address),
      tokenTransfers: [
        new TokenTransfer({
          token: usdcToken,
          amount: 1000000n
        }),
        new TokenTransfer({
          token: wEgldToken,
          amount: 500000000000000000n
        })
      ]
    });

  return [wrapOneEgld, swapHalfWEgldToUsdc, multiTransferOneUsdcHalfWEgld];
};
