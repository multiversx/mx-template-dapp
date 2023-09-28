import type { AccountType } from '@multiversx/sdk-dapp/types';
import { Label } from 'components/Label';
import { trimUsernameDomain } from 'helpers/sdkDappHelpers';

export const Username = (props: { account: AccountType }) => {
  const { account } = props;

  if (!account) {
    return null;
  }

  return (
    <p>
      <Label>Herotag: </Label>
      <span daata-testid='heroTag'>
        {account.username ? trimUsernameDomain(account.username) : 'N/A'}
      </span>
    </p>
  );
};
