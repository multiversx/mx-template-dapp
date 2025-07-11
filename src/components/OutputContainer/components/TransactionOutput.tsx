import { Label } from 'components';
import {
  ACCOUNTS_ENDPOINT,
  DECIMALS,
  DIGITS,
  FormatAmountController,
  MvxExplorerLink,
  MvxFormatAmount,
  SignedTransactionType,
  TRANSACTIONS_ENDPOINT,
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib';

export const TransactionOutput = ({
  transaction
}: {
  transaction: SignedTransactionType;
}) => {
  const { network } = useGetNetworkConfig();
  const { account } = useGetAccountInfo();
  const decodedData = transaction.data
    ? Buffer.from(transaction.data, 'base64').toString('ascii')
    : 'N/A';

  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network.egldLabel,
      input: account.balance
    });

  console.log('Transaction: ', transaction);

  return (
    <div className='flex flex-col'>
      <p>
        <Label>Hash:</Label>
        <MvxExplorerLink
          link={`${network.explorerAddress}/${TRANSACTIONS_ENDPOINT}/${transaction.hash}`}
          className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
        >
          {transaction.hash}
        </MvxExplorerLink>
      </p>
      <p>
        <Label>Receiver:</Label>
        <MvxExplorerLink
          link={`${network.explorerAddress}/${ACCOUNTS_ENDPOINT}/${transaction.receiver}`}
          className='border-b border-dotted border-gray-500 hover:border-solid hover:border-gray-800'
        >
          {transaction.receiver}
        </MvxExplorerLink>
      </p>

      <p>
        <Label>Amount: </Label>
        <MvxFormatAmount
          isValid={isValid}
          valueInteger={valueInteger}
          valueDecimal={valueDecimal}
          label={label}
          data-testid='balance'
        />
      </p>
      <p>
        <Label>Gas price: </Label>
        {transaction.gasPrice}
      </p>
      <p>
        <Label>Gas limit: </Label>
        {transaction.gasLimit}
      </p>
      <p className='whitespace-nowrap'>
        <Label>Data: </Label> {decodedData}
      </p>
    </div>
  );
};
