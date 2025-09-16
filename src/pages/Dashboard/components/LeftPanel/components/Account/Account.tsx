import {
  faChevronUp,
  faLayerGroup,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';

import { ReactComponent as XLogo } from 'assets/img/x-logo.svg';
import { Label } from 'components';
import {
  DECIMALS,
  DIGITS,
  FormatAmountController,
  MvxFormatAmount,
  MvxTrim,
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib';

import { Username } from './components';
import { useGetUserHerotag } from './hooks/useGetUserHerotag';

// prettier-ignore
const styles = {
  connectedAccountContainer: 'connected-account flex flex-col gap-4',
  connectedAccountHeader: 'connected-account-header flex justify-between items-center',
  connectedAccountHeaderTitle: 'connected-account-header-title text-base transition-all duration-200 ease-out text-secondary',
  connectedAccountHeaderIcon: 'connected-account-header-icon text-primary transition-transform duration-200 ease-out',
  connectedAccountHeaderIconRotated: 'rotate-180',
  connectedAccountDetails: 'connected-account-details flex flex-col',
  connectedAccountDetailsHidden: 'hidden',
  connectedAccountInfo: 'connected-account-info flex h-14 gap-2 items-center',
  connectedAccountInfoIcon: 'connected-account-info-icon min-w-10 min-h-10 max-h-10 max-w-10 flex items-center justify-center text-tertiary border border-secondary rounded-lg overflow-hidden p-1.5 transition-all duration-200 ease-out',
  connectedAccountInfoText: 'connected-account-info-text truncate flex flex-col',
  connectedAccountInfoTextValue: 'connected-account-info-text-value text-primary transition-all duration-200 ease-out text-base',
  connectedAccountDetailsIcon: 'connected-account-details-icon w-6 h-6',
  connectedAccountDetailsHerotag: 'connected-account-details-herotag rounded-full',
  connectedAccountDetailsXLogo: 'connected-account-details-xlogo fill-primary w-6 h-6 transition-all duration-200 ease-out',
  connectedAccountDetailsTrimAddress: 'w-max'
} satisfies Record<string, string>;

interface AccountDetailsType {
  icon: ReactNode | string;
  label: string;
  value: string | ReactNode;
}

export const Account = () => {
  const { network } = useGetNetworkConfig();
  const { address, account } = useGetAccountInfo();

  const { isValid, valueDecimal, valueInteger, label } =
    FormatAmountController.getData({
      digits: DIGITS,
      decimals: DECIMALS,
      egldLabel: network.egldLabel,
      input: account.balance
    });

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  const [herotag, profileUrl] = useGetUserHerotag(address);

  const accountDetails: AccountDetailsType[] = [
    {
      icon: (
        <FontAwesomeIcon
          icon={faWallet}
          className={styles.connectedAccountDetailsIcon}
        />
      ),
      label: 'Address',
      value: (
        <MvxTrim
          dataTestId='accountAddress'
          text={address}
          className={styles.connectedAccountDetailsTrimAddress}
        />
      )
    },
    {
      icon: herotag ? (
        profileUrl ? (
          <img
            src={profileUrl}
            className={styles.connectedAccountDetailsHerotag}
          />
        ) : (
          herotag.slice(0, 3)
        )
      ) : (
        '@'
      ),
      label: 'Herotag',
      value: <Username address={address} />
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faLayerGroup}
          className={styles.connectedAccountDetailsIcon}
        />
      ),
      label: 'Shard',
      value: account.shard
    },
    {
      icon: <XLogo className={styles.connectedAccountDetailsXLogo} />,
      label: 'Balance',
      value: (
        <MvxFormatAmount
          isValid={isValid}
          valueInteger={valueInteger}
          valueDecimal={valueDecimal}
          label={label}
          data-testid='balance'
          decimalClass='opacity-70'
          labelClass='opacity-70'
        />
      )
    }
  ];

  return (
    <div className={styles.connectedAccountContainer}>
      <div className={styles.connectedAccountHeader}>
        <h2 className={styles.connectedAccountHeaderTitle}>
          Connected account details
        </h2>

        <FontAwesomeIcon
          icon={faChevronUp}
          className={classNames(styles.connectedAccountHeaderIcon, {
            [styles.connectedAccountHeaderIconRotated]: isCollapsed
          })}
          onClick={toggleCollapse}
        />
      </div>

      <div
        data-testid='topInfo'
        className={classNames(styles.connectedAccountDetails, {
          [styles.connectedAccountDetailsHidden]: isCollapsed
        })}
      >
        {accountDetails.map((accountDetail, index) => (
          <div key={index} className={styles.connectedAccountInfo}>
            <div className={styles.connectedAccountInfoIcon}>
              {accountDetail.icon}
            </div>

            <p className={styles.connectedAccountInfoText}>
              <Label>{accountDetail.label}</Label>
              <span className={styles.connectedAccountInfoTextValue}>
                {accountDetail.value}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
