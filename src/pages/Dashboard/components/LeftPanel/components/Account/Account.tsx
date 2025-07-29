import {
  faChevronUp,
  faLayerGroup,
  faWallet,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
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

  const accountDetails: AccountDetailsType[] = [
    {
      icon: faWallet,
      label: 'Address',
      value: address
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
        <h2 className='text-base text-secondary'>Connected account details</h2>

        <FontAwesomeIcon icon={faChevronUp} className='text-primary' />
      </div>

      <div className='flex flex-col' data-testid='topInfo'>
        {accountDetails.map((accountDetail, index) => (
          <div key={index} className='flex gap-2 items-center'>
            <FontAwesomeIcon
              icon={accountDetail.icon}
              className='border border-primary rounded-lg p-1.5 text-primary'
            />

            <p className='truncate flex flex-col'>
              <Label>{accountDetail.label}</Label>
              <span className='text-primary text-base'>
                {accountDetail.value}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
