import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import {
  useSignMessage,
  useGetLastSignedMessageSession
} from '@multiversx/sdk-dapp/hooks/signMessage';
import { PageState } from '@multiversx/sdk-dapp/UI';
import { CopyButton } from '@multiversx/sdk-dapp/UI/CopyButton';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';

export const SignSuccess = () => {
  const { onAbort } = useSignMessage();
  const signedMessageInfo = useGetLastSignedMessageSession();

  if (!signedMessageInfo?.signature) {
    return null;
  }

  const { signature } = signedMessageInfo;

  const handleLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    onAbort();
  };

  return (
    <PageState
      className='py-0'
      icon={faCheck}
      iconClass='success'
      title='Message signed'
      description={
        <>
          <div className='text-secondary text-left'>Signature:</div>
          <div className='textarea-with-copy'>
            <textarea
              readOnly
              className='form-control cursor-text'
              rows={7}
              defaultValue={signature}
            />
            <CopyButton className='mt-2' text={signature} />
          </div>
        </>
      }
      action={
        <Link
          data-testid='closeTransactionSuccessBtn'
          id='closeButton'
          className='btn btn-primary mb-3 mt-0'
          onClick={handleLeave}
          to={routeNames.signMessage}
        >
          Done
        </Link>
      }
    />
  );
};
