import {
  faChevronUp,
  faLayerGroup,
  faWallet
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';

import XLogo from 'assets/img/x-logo.svg?react';
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
      icon: <FontAwesomeIcon icon={faWallet} className='w-6 h-6' />,
      label: 'Address',
      value: <MvxTrim text={address} className='w-max' />
    },
    {
      icon: herotag ? (
        profileUrl ? (
          <img src={profileUrl} className='rounded-full' />
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
      icon: <FontAwesomeIcon icon={faLayerGroup} className='w-6 h-6' />,
      label: 'Shard',
      value: account.shard
    },
    {
      icon: <XLogo className='fill-primary w-6 h-6' />,
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
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h2 className='text-base transition-all duration-300 text-secondary'>
          Connected account details
        </h2>

        <FontAwesomeIcon
          icon={faChevronUp}
          className={`text-primary transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
          onClick={toggleCollapse}
        />
      </div>

      <div
        className={classNames('flex flex-col', { hidden: isCollapsed })}
        data-testid='topInfo'
      >
        {accountDetails.map((accountDetail, index) => (
          <div key={index} className='flex h-14 gap-2 items-center'>
            <div
              className='min-w-10 min-h-10 max-h-10 max-w-10 flex items-center justify-center text-tertiary border border-secondary rounded-lg overflow-hidden p-1.5
            transition-all duration-300'
            >
              {accountDetail.icon}
            </div>

            <p className='truncate flex flex-col'>
              <Label>{accountDetail.label}</Label>
              <span className='text-primary transition-all duration-300 text-base'>
                {accountDetail.value}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
