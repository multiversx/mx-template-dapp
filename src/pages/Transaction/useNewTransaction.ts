import * as Dapp from "@elrondnetwork/dapp";
import {
  Transaction,
  GasPrice,
  Address,
  TransactionPayload,
  Balance,
  ChainID,
  TransactionVersion,
  GasLimit,
} from "@elrondnetwork/erdjs";
import {
  gasPrice,
  version,
  gasLimit as configGasLimit,
  gasPerDataByte,
} from "config";
import { RawTransactionType } from "helpers/types";

export default function useNewTransaction() {
  const { chainId } = Dapp.useContext();

  return (rawTransaction: RawTransactionType) => {
    const gasLimit = rawTransaction.gasLimit
      ? new GasLimit(rawTransaction.gasLimit)
      : Dapp.calculateGasLimit({
          data: rawTransaction.data || "",
          gasLimit: configGasLimit,
          gasPerDataByte,
        });
    return new Transaction({
      value: Balance.egld(rawTransaction.value),
      data: new TransactionPayload(rawTransaction.data),
      receiver: new Address(rawTransaction.receiver),
      gasLimit,
      gasPrice: new GasPrice(gasPrice),
      chainID: new ChainID(chainId.valueOf()),
      version: new TransactionVersion(version),
    });
  };
}
