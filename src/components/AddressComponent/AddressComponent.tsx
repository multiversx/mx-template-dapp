import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { Fragment } from 'react';

import { contractAddress } from 'config';
import {
  ACCOUNTS_ENDPOINT,
  getExplorerLink,
  MvxCopyButton,
  MvxTrim,
  useGetNetworkConfig
} from 'lib';

// prettier-ignore
const styles = {
  addressContainer: 'address-container text-primary transition-all duration-200 ease-out font-normal text-xs xs:text-sm pt-1 lg:pt-0 overflow-auto',
  address: 'address break-words lg:break-normal',
  trimmedAddress: 'trimmed-address !w-max',
  addressButtons: 'address-buttons flex gap-1 transition-all duration-200 ease-out',
  addressButton: 'address-button text-primary hover:text-accent transition-all duration-200 ease-out',
  addressButtonHeader: '!text-link hover:!text-primary transition-all duration-200 ease-out'
} satisfies Record<string, string>;

interface AddressComponentPropsType {
  address: string;
  isHeader?: boolean;
}

export const AddressComponent = ({
  address,
  isHeader = false
}: AddressComponentPropsType) => {
  const {
    network: { explorerAddress }
  } = useGetNetworkConfig();

  const explorerLink = getExplorerLink({
    to: `/${ACCOUNTS_ENDPOINT}/${contractAddress}`,
    explorerAddress
  });

  return (
    <Fragment>
      <p className={styles.addressContainer}>
        {isHeader ? (
          <MvxTrim text={address} className={styles.trimmedAddress} />
        ) : (
          <span className={styles.address}>{address}</span>
        )}
      </p>

      <div className={styles.addressButtons}>
        <MvxCopyButton
          text={address}
          className={classNames(styles.addressButton, {
            [styles.addressButtonHeader]: isHeader
          })}
        />

        <a
          href={explorerLink}
          target='_blank'
          rel='noreferrer'
          className={classNames(styles.addressButton, {
            [styles.addressButtonHeader]: isHeader
          })}
        >
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </div>
    </Fragment>
  );
};
