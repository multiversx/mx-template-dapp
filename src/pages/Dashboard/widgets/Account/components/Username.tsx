import { Label } from 'components/Label';
import { DataTestIdsEnum } from 'localConstants';
import { ProfileType } from 'types';
import { AccountType } from 'types/sdkDappCore.types';
import { trimUsernameDomain } from 'utils/sdkDappCore';

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
