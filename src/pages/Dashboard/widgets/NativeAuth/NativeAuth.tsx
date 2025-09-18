import { useEffect } from 'react';

import { Label, MissingNativeAuthError, OutputContainer } from 'components';
import {
  ACCOUNTS_ENDPOINT,
  DECIMALS,
  DIGITS,
  FormatAmountController,
  MvxDataWithExplorerLink,
  MvxFormatAmount,
  useGetAccount,
  useGetLoginInfo,
  useGetNetworkConfig
} from 'lib';
import { Username } from 'pages/Dashboard/components/LeftPanel/components/Account/components';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import { useGetProfile } from './hooks';

// prettier-ignore
const styles = {
  nativeAuthContainer: 'native-auth-container flex flex-col gap-8',
  nativeAuthAddressContainer: 'native-auth-address-container flex flex-col gap-2',
  nativeAuthAddress: 'native-auth-address flex justify-between w-full',
  nativeAuthDetails: 'native-auth-details flex gap-8 w-full',
  nativeAuthDetailContainer: 'native-auth-detail-container flex flex-col gap-2 sm:w-1/3',
  nativeAuthAmount: 'native-auth-amount flex gap-1',
  nativeAuthMissingProfile: 'native-auth-missing-profile flex items-center gap-1'
} satisfies Record<string, string>;

export const NativeAuth = () => {
  const { network } = useGetNetworkConfig();
  const { tokenLogin, isLoggedIn } = useGetLoginInfo();
  const account = useGetAccount();
  const { isLoading, profile, getProfile } = useGetProfile();
  const explorerAddress = network.explorerAddress;

  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network.egldLabel,
      input: account.balance
    });

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
      <div id={ItemsIdentifiersEnum.nativeAuth}>
        <OutputContainer>
          <div className={styles.nativeAuthMissingProfile}>
            <p>Unable to load profile</p>
          </div>
        </OutputContainer>
      </div>
    );
  }

  return (
    <div
      id={ItemsIdentifiersEnum.nativeAuth}
      className={styles.nativeAuthContainer}
    >
      <div className={styles.nativeAuthAddressContainer}>
        <Label>Address</Label>

        <OutputContainer isLoading={isLoading}>
          <MvxDataWithExplorerLink
            withTooltip={true}
            data={profile?.address ?? 'N/A'}
            className={styles.nativeAuthAddress}
            explorerLink={`${explorerAddress}/${ACCOUNTS_ENDPOINT}/${profile?.address}`}
          />
        </OutputContainer>
      </div>

      <div className={styles.nativeAuthDetails}>
        <div className={styles.nativeAuthDetailContainer}>
          <Label>Herotag</Label>

          <OutputContainer isLoading={isLoading}>
            <Username address={profile?.address || ''} />
          </OutputContainer>
        </div>

        <div className={styles.nativeAuthDetailContainer}>
          <Label>Shard</Label>

          <OutputContainer isLoading={isLoading}>
            <p>{profile?.shard ?? 'N/A'}</p>
          </OutputContainer>
        </div>

        <div className={styles.nativeAuthDetailContainer}>
          <Label>Balance</Label>

          <OutputContainer isLoading={isLoading}>
            <div className={styles.nativeAuthAmount}>
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
