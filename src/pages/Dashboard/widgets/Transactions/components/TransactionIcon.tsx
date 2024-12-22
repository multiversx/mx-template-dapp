import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';
import { faHourglass } from '@fortawesome/free-solid-svg-icons/faHourglass';
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTransactionMessages, getTransactionStatus } from 'lib/sdkDappCore';
import lodash from 'lodash';
import { WithTransactionPropsType } from '../types';

export const TransactionIcon = ({ transaction }: WithTransactionPropsType) => {
  const transactionMessages = getTransactionMessages(transaction);

  const { failed, invalid, pending } = getTransactionStatus(transaction);

  let icon;
  if (failed) {
    icon = faTimes;
  }
  if (invalid) {
    icon = faBan;
  }
  if (pending) {
    icon = faHourglass;
  }

  const showErrorText = (failed || invalid) && transactionMessages.length > 0;
  const errorText = showErrorText ? transactionMessages.join(',') : '';

  const tooltip = `${lodash.upperFirst(transaction.status)} ${errorText}`;

  if (!icon) {
    return null;
  }

  return (
    <FontAwesomeIcon
      title={tooltip}
      icon={icon}
      size={icon === faTimes ? '1x' : 'sm'}
    />
  );
};
