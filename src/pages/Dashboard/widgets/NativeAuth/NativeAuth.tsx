import { useEffect } from 'react';
import { Label, MissingNativeAuthError, OutputContainer } from 'components';
import {
  DECIMALS,
  DIGITS,
  FormatAmountController,
  MvxFormatAmount,
  useGetLoginInfo,
  useGetNetworkConfig
} from 'lib';
import { Username } from '../Account/components';
import { useGetProfile } from './hooks';

export const NativeAuth = () => {
  const { tokenLogin, isLoggedIn } = useGetLoginInfo();
  const { isLoading, profile, getProfile } = useGetProfile();
  const { network } = useGetNetworkConfig();
  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network.egldLabel,
      input: profile?.balance ?? '0'
    });

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
        <MvxFormatAmount
          isValid={isValid}
          valueInteger={valueInteger}
          valueDecimal={valueDecimal}
          label={label}
          data-testid='balance'
        />
      </div>
    </OutputContainer>
  );
};
