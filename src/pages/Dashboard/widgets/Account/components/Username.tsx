import { AccountType } from 'types/sdkDappCoreTypes';
import { Label } from 'components/Label';
import { DataTestIdsEnum, ProfileType } from 'types';
import { trimUsernameDomain } from 'lib/sdkDappCore';

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
