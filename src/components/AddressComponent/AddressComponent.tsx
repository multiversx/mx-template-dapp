import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { contractAddress } from 'config';
import {
  ACCOUNTS_ENDPOINT,
  getExplorerLink,
  MvxCopyButton,
  MvxTrim,
  useGetNetworkConfig
} from 'lib';

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
    <>
      <p className='text-primary transition-all duration-300 font-normal text-xs xs:text-sm pt-1 lg:pt-0 overflow-auto'>
        {isHeader ? (
          <MvxTrim text={address} className='!w-max' />
        ) : (
          <span className='break-words lg:break-normal'>{address}</span>
        )}
      </p>

      <div
        className={classNames(
          'flex gap-1 text-primary transition-all duration-300',
          { '!text-link': isHeader }
        )}
      >
        <MvxCopyButton text={address} />

        <a href={explorerLink} target='_blank' rel='noreferrer'>
          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
        </a>
      </div>
    </>
  );
};
