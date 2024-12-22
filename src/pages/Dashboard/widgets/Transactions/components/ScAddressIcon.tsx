import React from 'react';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons/faFileAlt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isContract } from 'lib/sdkDappCore';

export interface ScAddressIconPropsType {
  initiator: string;
  secondInitiator?: string;
}

export const ScAddressIcon = ({
  initiator,
  secondInitiator
}: ScAddressIconPropsType) => {
  const showIcon = isContract(initiator) || isContract(secondInitiator ?? '');

  if (showIcon) {
    return (
      <FontAwesomeIcon
        title='Smart Contract'
        icon={faFileAlt}
        className='mr-1 text-secondary'
      />
    );
  }

  return null;
};
