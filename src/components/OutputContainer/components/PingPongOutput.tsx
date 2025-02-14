import { ContractAddress, Label } from 'components';
import { SignedTransactionType } from 'types';
import { TransactionsOutput } from './TransactionsOutput';

type PingPongOutputType = {
  timeRemaining: string;
  pongAllowed: boolean;
  transactions?: SignedTransactionType[] | null;
};

export const PingPongOutput = ({
  timeRemaining,
  pongAllowed,
  transactions
}: PingPongOutputType) => {
  if (!transactions) {
    return null;
  }

  return (
    <>
      <ContractAddress />
      <TransactionsOutput transactions={transactions} />
      {!pongAllowed && (
        <p>
          <Label>Time remaining: </Label>
          <span className='text-red-600'>{timeRemaining}</span> until able to
          pong
        </p>
      )}
    </>
  );
};
