import {
  faArrowsRotate,
  faBroom,
  faPaste,
  faPenNib
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { MouseEvent, useState } from 'react';

import { OutputContainer } from 'components';
import { Address, getAccountProvider, Message, useGetAccount } from 'lib';
import { ItemsIdentifiersEnum } from 'pages/Dashboard/dashboard.types';

import { SignFailure, SignSuccess } from './components';

// prettier-ignore
const styles = {
  signMessageContainer: 'sign-message-container flex flex-col gap-6',
  signMessage: 'sign-message flex flex-col gap-2',
  signMessageLabel: 'sign-message-label text-secondary transition-all duration-200 ease-out text-sm font-normal',
  signMessageText: 'sign-message-text text-secondary transition-all duration-200 ease-out resize-none w-full h-32 rounded-lg focus:outline-none',
  signMessagePasteButtonContainer: 'sign-message-paste-button-container w-full flex justify-end',
  signMessagePasteButton: 'sign-message-paste-button text-tertiary text-sm font-semibold flex items-center bg-btn-tertiary rounded-md cursor-pointer px-1 transition-all duration-200 ease-out',
  signMessagePasteButtonText: 'sign-message-paste-button-text p-1',
  signMessageButton: 'sign-message-button flex gap-2 items-start',
  signButtonContent: 'sign-button-content text-sm font-normal'
} satisfies Record<string, string>;

export const SignMessage = () => {
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState<Message | null>(null);
  const [state, setState] = useState<'pending' | 'success' | 'error'>(
    'pending'
  );

  const [signatrue, setSignatrue] = useState('');
  const { address } = useGetAccount();
  const provider = getAccountProvider();

  const isDefaultState = !['success', 'error'].includes(state);

  const hasMessage = message.trim().length > 0;

  const handleSubmit = async () => {
    if (!hasMessage) {
      return;
    }

    try {
      const messageToSign = new Message({
        address: new Address(address),
        data: new Uint8Array(Buffer.from(message))
      });

      const signedMessageResult = await provider.signMessage(messageToSign);

      if (!signedMessageResult?.signature) {
        setState('error');
        return;
      }

      setState('success');
      setSignatrue(Buffer.from(signedMessageResult?.signature).toString('hex'));
      setSignedMessage(signedMessageResult);
      setMessage('');
    } catch (error) {
      console.error(error);
      setState('error');
    }
  };

  const handleClear = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSignatrue('');
    setState('pending');
  };

  const handlePasteClick = async () => {
    const message = await navigator.clipboard.readText();

    setMessage(message);
  };

  return (
    <div
      id={ItemsIdentifiersEnum.signMessage}
      className={styles.signMessageContainer}
    >
      <div className={styles.signMessage}>
        <label className={styles.signMessageLabel}>Message</label>
        <OutputContainer>
          {isDefaultState && (
            <textarea
              placeholder='Write message here'
              className={styles.signMessageText}
              value={message}
              onChange={(event) => {
                setMessage(event.currentTarget.value);
              }}
              onKeyUp={(event) => {
                setMessage(event.currentTarget.value);
              }}
            />
          )}

          {state === 'success' && signedMessage != null && (
            <SignSuccess
              message={signedMessage}
              signature={signatrue}
              address={address}
            />
          )}

          {isDefaultState && (
            <div className={styles.signMessagePasteButtonContainer}>
              <button
                onClick={handlePasteClick}
                className={styles.signMessagePasteButton}
              >
                <span className={styles.signMessagePasteButtonText}>Paste</span>

                <FontAwesomeIcon
                  icon={faPaste}
                  className={styles.signMessagePasteButtonText}
                />
              </button>
            </div>
          )}

          {state === 'error' && <SignFailure />}
        </OutputContainer>
      </div>

      <div className={styles.signMessageButton}>
        {['success', 'error'].includes(state) ? (
          <MvxButton
            data-testid='closeTransactionSuccessBtn'
            id='closeButton'
            onClick={handleClear}
            size='small'
          >
            <FontAwesomeIcon
              icon={state === 'success' ? faBroom : faArrowsRotate}
              className={styles.signButtonContent}
            />

            <span className={styles.signButtonContent}>
              {state === 'error' ? 'Try again' : 'Clear'}
            </span>
          </MvxButton>
        ) : (
          <MvxButton
            data-testid='signMsgBtn'
            onClick={handleSubmit}
            size='small'
            disabled={!hasMessage}
          >
            <FontAwesomeIcon
              icon={faPenNib}
              className={styles.signButtonContent}
            />

            <span className={styles.signButtonContent}>Sign</span>
          </MvxButton>
        )}
      </div>
    </div>
  );
};
