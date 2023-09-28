import { useState } from 'react';
import type { MouseEvent } from 'react';
import {
  faFileSignature,
  faBroom,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetSignMessageSession } from '@multiversx/sdk-dapp/hooks/signMessage/useGetSignMessageSession';
import { Button } from 'components/Button';
import { OutputContainer } from 'components/OutputContainer';
import { useGetLastSignedMessageSession, useSignMessage } from 'hooks';
import { SignedMessageStatusesEnum } from 'types';
import { SignFailure, SignSuccess } from './components';

export const SignMessage = () => {
  const { sessionId, signMessage, onAbort } = useSignMessage();
  const signedMessageInfo = useGetLastSignedMessageSession();
  const messageSession = useGetSignMessageSession(sessionId);

  const [message, setMessage] = useState('');

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (signedMessageInfo) {
      onAbort();
    }

    if (!message.trim()) {
      return;
    }

    signMessage({
      message,
      callbackRoute: window.location.href
    });

    setMessage('');
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAbort();
  };

  const isError =
    [
      SignedMessageStatusesEnum.cancelled,
      SignedMessageStatusesEnum.failed
    ].includes(signedMessageInfo?.status) && messageSession?.message;

  const isSuccess =
    messageSession?.message &&
    signedMessageInfo?.status === SignedMessageStatusesEnum.signed;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex gap-2 items-start'>
        <Button onClick={handleSubmit} disabled={!message}>
          <FontAwesomeIcon icon={faFileSignature} className='mr-1' />
          Sign
        </Button>

        {(isSuccess || isError) && (
          <Button
            data-testid='closeTransactionSuccessBtn'
            id='closeButton'
            onClick={handleClear}
          >
            <FontAwesomeIcon
              icon={isSuccess ? faBroom : faArrowsRotate}
              className='mr-1'
            />
            {isError ? 'Try again' : 'Clear'}
          </Button>
        )}
      </div>
      <OutputContainer>
        {!isSuccess && !isError && (
          <textarea
            placeholder='Write message here'
            className='resize-none rounded-md w-full h-32 rounded-lg focus:outline-none focus:border-blue-500'
            onChange={(event) => setMessage(event.currentTarget.value)}
          />
        )}

        {isSuccess && (
          <SignSuccess messageToSign={messageSession?.message ?? ''} />
        )}

        {isError && <SignFailure />}
      </OutputContainer>
    </div>
  );
};
