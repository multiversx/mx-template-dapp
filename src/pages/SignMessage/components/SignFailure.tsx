import React from 'react';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import {
  useSignMessage,
  useGetSignMessageInfoStatus
} from '@multiversx/sdk-dapp/hooks/signMessage';
import { PageState } from '@multiversx/sdk-dapp/UI';
import { Link } from 'react-router-dom';

export const SignFailure = () => {
  const { onAbort } = useSignMessage();
  const { errorMessage } = useGetSignMessageInfoStatus();

  const handleLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    onAbort();
  };

  return (
    <PageState
      className='px-4 py-0'
      icon={faCircleXmark}
      iconClass='warning'
      title='Message not signed'
      description={errorMessage}
      action={
        <Link
          data-testid='closeTransactionSuccessBtn'
          id='closeButton'
          className='btn btn-primary mb-3'
          to={window.location.pathname}
          onClick={handleLeave}
        >
          Try again
        </Link>
      }
    />
  );
};
