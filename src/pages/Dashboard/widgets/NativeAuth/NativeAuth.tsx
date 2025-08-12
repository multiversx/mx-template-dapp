import { useEffect } from 'react';
import {
  AddressComponent,
  Label,
  MissingNativeAuthError,
  OutputContainer
} from 'components';
import {
  DECIMALS,
  DIGITS,
  FormatAmountController,
  MvxFormatAmount,
  useGetLoginInfo,
  useGetNetworkConfig
} from 'lib';
import { Username } from 'pages/Dashboard/components/LeftPanel/components/Account/components';
import { ItemsIdEnum } from 'pages/Dashboard/dashboard.types';
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
    <div id={ItemsIdEnum.nativeAuth} className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <Label>Address</Label>

        <OutputContainer isLoading={isLoading}>
          <div className='flex justify-between items-center gap-3'>
            <AddressComponent address={profile?.address ?? 'N/A'} />
          </div>
        </OutputContainer>
      </div>

      <div className='flex gap-8 w-full'>
        <div className='flex flex-col gap-2 sm:w-1/3'>
          <Label>Herotag</Label>

          <OutputContainer isLoading={isLoading}>
            <Username address={profile?.address || ''} />
          </OutputContainer>
        </div>

        <div className='flex flex-col gap-2 sm:w-1/3'>
          <Label>Shard</Label>

          <OutputContainer isLoading={isLoading}>
            <p>{profile?.shard ?? 'N/A'}</p>
          </OutputContainer>
        </div>

        <div className='flex flex-col gap-2 sm:w-1/3'>
          <Label>Balance</Label>

          <OutputContainer isLoading={isLoading}>
            {' '}
            <div className='flex gap-1'>
              <MvxFormatAmount
                isValid={isValid}
                valueInteger={valueInteger}
                valueDecimal={valueDecimal}
                label={label}
                data-testid='balance'
              />
            </div>
          </OutputContainer>
        </div>
      </div>
    </div>
  );
};
