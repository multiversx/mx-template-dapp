import { useEffect } from 'react';
import { Label } from 'components/Label';
import { MissingNativeAuthError } from 'components/MissingNativeAuthError';
import { OutputContainer } from 'components/OutputContainer';
import { FormatAmount } from 'components/sdkDappComponents';
import { trimUsernameDomain } from 'helpers/sdkDappHelpers';
import { useGetLoginInfo, useGetNetworkConfig } from 'hooks';
import { useGetProfile } from './hooks';

export const NativeAuth = () => {
  const { tokenLogin, isLoggedIn } = useGetLoginInfo();
  const { isLoading, profile, getProfile } = useGetProfile();
  const { network } = useGetNetworkConfig();

  useEffect(() => {
    // On page refresh, tokenInfo is null which implies that we do not have access to loginInfo data
    if (isLoggedIn && tokenLogin?.nativeAuthToken) {
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
      {profile?.username && (
        <p>
          <Label>Herotag:</Label> {trimUsernameDomain(profile.username)}
        </p>
      )}
      {profile?.address && (
        <p>
          <Label>Address:</Label> {profile.address}
        </p>
      )}
      {profile?.balance && (
        <div className='flex gap-1'>
          <Label>Balance:</Label>
          <FormatAmount
            value={profile.balance}
            showLabel={profile.balance !== '0'}
            egldLabel={network.egldLabel}
            data-testid='balance'
          />
        </div>
      )}
    </OutputContainer>
  );
};
