import { Label } from 'components/Label';
import { trimUsernameDomain } from 'lib';
import { AccountType } from 'lib/sdkDapp/sdkDappCore.types';
import { DataTestIdsEnum } from 'localConstants';
import { ProfileType } from 'types';

export const Username = (props: {
  account: AccountType | ProfileType | null;
}) => {
  const { account } = props;

  if (!account) {
    return null;
  }

  return (
    <p>
      <Label>Herotag: </Label>
      <span data-testid={DataTestIdsEnum.heroTag}>
        {account.username ? trimUsernameDomain(account.username) : 'N/A'}
      </span>
    </p>
  );
};
