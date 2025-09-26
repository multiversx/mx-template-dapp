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
import { Address } from 'lib';
import { TransactionProps } from 'types';
import { contractAddress } from 'config';

export const getWrapAndMultiTransferEsdtsTransactions = async ({
  address,
  chainID
}: TransactionProps) => {
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
      gasLimit: BigInt(25500000),
      nativeTransferAmount: 1000000000000000000n
    }
  );

  const args = [new TokenIdentifierValue('USDC-350c4e'), new U32Value(1)];

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
        new TokenTransfer({ token: wEgldToken, amount: 500000000000000000n }) //0.5 xWEGLD
      ]
    }
  );

  const multiTransferOneUsdcHalfWEgld =
    await factory.createTransactionForTransfer(Address.newFromBech32(address), {
      receiver: Address.newFromBech32(contractAddress),
      tokenTransfers: [
        new TokenTransfer({
          token: wEgldToken,
          amount: 500000000000000000n //0.5 xWEGLD
        }),
        new TokenTransfer({
          token: usdcToken,
          amount: 1000000n // 1 USDC
        })
      ]
    });

  return { wrapOneEgld, swapHalfWEgldToUsdc, multiTransferOneUsdcHalfWEgld };
};
