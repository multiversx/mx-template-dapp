import { useEffect } from 'react';
import { Label, MissingNativeAuthError, OutputContainer } from 'components';
import { FormatAmount, useGetAccount, useGetLoginInfo } from 'lib';
import { Username } from '../Account/components';
import { useGetProfile } from './hooks';

export const NativeAuth = () => {
  const { tokenLogin, isLoggedIn } = useGetLoginInfo();
  const account = useGetAccount();
  const { isLoading, profile, getProfile } = useGetProfile();

  useEffect(() => {
    // On page refresh, tokenInfo is null which implies that we do not have access to loginInfo data
    if (isLoggedIn && tokenLogin?.nativeAuthToken) {
      // native auth network call example
      getProfile();
    }
  }, [isLoggedIn]);

  if (!tokenLogin?.nativeAuthToken && !isLoading) {
    return <MissingNativeAuthError />;
  }

  if (!profile && !isLoading) {
    return (
      <OutputContainer>
        <div className='flex items-center gap-1'>
          <p>Unable to load profile</p>
        </div>
      </OutputContainer>
    );
  }

  return (
    <OutputContainer isLoading={isLoading}>
      <p>
        <Label>Address:</Label> {account.address ?? 'N/A'}
      </p>

      <Username account={profile} />
      <p>
        <Label>Shard: </Label> {account.shard ?? 'N/A'}
      </p>

      <div className='flex gap-1'>
        <Label>Balance:</Label>
        <FormatAmount value={account.balance} data-testid='balance' />
      </div>
    </OutputContainer>
  );
};
