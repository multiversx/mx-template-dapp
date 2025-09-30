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
import { FormatAmount, MvxTrim, useGetAccount } from 'lib';
import { DataTestIdsEnum } from 'localConstants';

import { Username } from './components';
import { useGetUserHerotag } from './hooks/useGetUserHerotag';
import styles from './account.styles';

interface AccountDetailsType {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}

export const Account = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const { address, balance, shard } = useGetAccount();
  const { herotag, profileUrl } = useGetUserHerotag();

  const toggleCollapse = () => {
    setIsCollapsed((isCollapsed) => !isCollapsed);
  };

  const img = profileUrl && (
    <img src={profileUrl} className={styles.connectedAccountDetailsHerotag} />
  );

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
      icon: herotag ? img || herotag.slice(0, 3) : '@',
      label: 'Herotag',
      value: <Username />
    },
    {
      icon: (
        <FontAwesomeIcon
          icon={faLayerGroup}
          className={styles.connectedAccountDetailsIcon}
        />
      ),
      label: 'Shard',
      value: <span data-testid={DataTestIdsEnum.addressShard}>{shard}</span>
    },
    {
      icon: <XLogo className={styles.connectedAccountDetailsXLogo} />,
      label: 'Balance',
      value: (
        <FormatAmount
          value={balance}
          data-testid='balance'
          decimalClass='opacity-70'
          labelClass='opacity-70'
          showLabel={true}
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
          onClick={toggleCollapse}
          className={classNames(styles.connectedAccountHeaderIcon, {
            [styles.connectedAccountHeaderIconRotated]: isCollapsed
          })}
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

            <div className={styles.connectedAccountInfoText}>
              <Label>{accountDetail.label}</Label>

              <span className={styles.connectedAccountInfoTextValue}>
                {accountDetail.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
