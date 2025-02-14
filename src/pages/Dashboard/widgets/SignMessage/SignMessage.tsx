import { useState } from 'react';
import type { MouseEvent } from 'react';
import {
  faFileSignature,
  faBroom,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, OutputContainer } from 'components';
import { useSignMessage, useGetSignMessageSession } from 'lib';
import { WidgetProps } from 'types';
import { SignedMessageStatusesEnum } from 'types';
import { SignFailure, SignSuccess } from './components';

export const SignMessage = ({ callbackRoute }: WidgetProps) => {
  const { sessionId, signMessage, onAbort } = useSignMessage();
  const messageSession = useGetSignMessageSession(sessionId);

  const [message, setMessage] = useState('');

  const handleSubmit = (e: MouseEvent) => {
    e.preventDefault();

    if (messageSession) {
      onAbort();
    }

    if (!message.trim()) {
      return;
    }

    signMessage({
      message,
      callbackRoute
    });

    setMessage('');
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAbort();
  };

  const isError = messageSession
    ? [
        (SignedMessageStatusesEnum.cancelled, SignedMessageStatusesEnum.failed)
      ].includes(messageSession.status) && messageSession?.message
    : false;

  const isSuccess =
    messageSession?.message &&
    messageSession?.status === SignedMessageStatusesEnum.signed;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-2 items-start'>
        <Button
          data-testid='signMsgBtn'
          onClick={handleSubmit}
          disabled={!message}
        >
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
            className='resize-none w-full h-32 rounded-lg focus:outline-none focus:border-blue-500'
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
