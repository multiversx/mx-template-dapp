import { useEffect } from 'react';
import { Label } from 'components/Label';
import { MissingNativeAuthError } from 'components/MissingNativeAuthError';
import { OutputContainer } from 'components/OutputContainer';
import { useGetProfile } from './hooks';
import { Username } from '../Account/components';
import {
  getIsLoggedIn,
  getState,
  // networkSelector,
  tokenLoginSelector
} from 'lib/sdkDappCore';

export const NativeAuth = () => {
  const isLoggedIn = getIsLoggedIn();
  const { isLoading, profile, getProfile } = useGetProfile();
  // const network = networkSelector(getState());
  const tokenLogin = tokenLoginSelector(getState());

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
      <p>
        <Label>Address:</Label> {profile?.address ?? 'N/A'}
      </p>

      <Username account={profile} />
      <p>
        <Label>Shard: </Label> {profile?.shard ?? 'N/A'}
      </p>

      <div className='flex gap-1'>
        <Label>Balance:</Label>
        {/*<FormatAmount*/}
        {/*  value={profile?.balance ?? '0'}*/}
        {/*  showLabel={profile?.balance !== '0'}*/}
        {/*  egldLabel={network.egldLabel}*/}
        {/*  data-testid='balance'*/}
        {/*/>*/}
      </div>
    </OutputContainer>
  );
};
