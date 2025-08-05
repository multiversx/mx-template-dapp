import { AccountType, trimUsernameDomain } from 'lib';
import { DataTestIdsEnum } from 'localConstants';
import { ProfileType } from 'types';
import { useGetUserHerotag } from '../hooks/useGetUserHerotag';

export const Username = (props: {
  account?: AccountType | ProfileType | null;
  address: string;
}) => {
  const { address } = props;

  const [herotag] = useGetUserHerotag(address);

  return (
    <p className='flex gap-0.5'>
      <span className='text-accent'>{herotag ? '@' : ''}</span>

      <span data-testid={DataTestIdsEnum.heroTag}>
        {herotag ? trimUsernameDomain(herotag) : 'N/A'}
      </span>
    </p>
  );
};
