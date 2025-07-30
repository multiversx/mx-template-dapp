import {
  faChevronUp,
  faLayerGroup,
  faWallet,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { Label } from 'components';
import {
  DECIMALS,
  DIGITS,
  FormatAmountController,
  MvxFormatAmount,
  useGetAccountInfo,
  useGetNetworkConfig
} from 'lib';
import { Username } from './components';

interface AccountDetailsType {
  icon: IconDefinition;
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

  const accountDetails: AccountDetailsType[] = [
    {
      icon: faWallet,
      label: 'Address',
      value: <div className='truncate'>{address}</div>
    },
    {
      icon: faWallet,
      label: 'Herotag',
      value: <Username account={account} />
    },
    {
      icon: faLayerGroup,
      label: 'Shard',
      value: account.shard
    },
    {
      icon: faLayerGroup,
      label: 'Balance',
      value: (
        <MvxFormatAmount
          isValid={isValid}
          valueInteger={valueInteger}
          valueDecimal={valueDecimal}
          label={label}
          data-testid='balance'
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
          <div key={index} className='flex gap-2 items-center'>
            <FontAwesomeIcon
              icon={accountDetail.icon}
              className='border border-primary rounded-lg p-1.5 text-primary transition-all duration-300'
            />

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
