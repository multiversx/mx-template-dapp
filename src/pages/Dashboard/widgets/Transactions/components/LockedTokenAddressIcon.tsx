import React, { useEffect, useState } from 'react';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addressIsValid, getTokenDetails } from 'lib/sdkDappCore';
import { TokenOptionType } from 'types/sdkDappCoreTypes';

export const LockedTokenAddressIcon = ({
  address,
  tokenId
}: {
  address: string;
  tokenId: string;
}) => {
  const [tokenDetails, setTokenDetails] = useState<TokenOptionType>();

  const getTokenDetailsFromApi = async () => {
    const token = await getTokenDetails({ tokenId });
    setTokenDetails(token);
  };

  useEffect(() => {
    getTokenDetailsFromApi();
  }, []);

  const lockedAccounts = tokenDetails?.assets?.lockedAccounts;
  if (lockedAccounts) {
    const validLockedAccounts = Object.keys(lockedAccounts).filter(
      (account) => {
        if (addressIsValid(account)) {
          return account === address;
        }

        return addressIsValid(lockedAccounts[account])
          ? lockedAccounts[account] === address
          : false;
      }
    );
    const lockedAccountName =
      tokenDetails?.assets?.lockedAccounts?.[validLockedAccounts[0]];

    return lockedAccountName ? (
      <FontAwesomeIcon
        title={lockedAccountName}
        icon={faLock}
        size='xs'
        className='mr-1 text-secondary'
      />
    ) : null;
  }

  return null;
};
