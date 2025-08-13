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

const styles = {
  buttonContent: 'button-content text-sm font-normal'
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

  const handleSubmit = async () => {
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
    <div id={ItemsIdentifiersEnum.signMessage} className='flex flex-col gap-6'>
      <div className='flex flex-col gap-2'>
        <label className='text-secondary transition-all duration-300 text-sm font-normal'>
          Message
        </label>
        <OutputContainer>
          {!['success', 'error'].includes(state) && (
            <textarea
              placeholder='Write message here'
              className='text-secondary transition-all duration-300 resize-none w-full h-32 rounded-lg focus:outline-none'
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

          <div className='w-full flex justify-end'>
            <button
              onClick={handlePasteClick}
              className='text-tertiary text-sm font-semibold flex items-center bg-btn-tertiary rounded-md cursor-pointer px-1 transition-all duration-300'
            >
              <span className='p-1'>Paste</span>

              <FontAwesomeIcon icon={faPaste} className='p-1' />
            </button>
          </div>

          {state === 'error' && <SignFailure />}
        </OutputContainer>
      </div>

      <div className='flex gap-2 items-start'>
        {['success', 'error'].includes(state) ? (
          <MvxButton
            data-testid='closeTransactionSuccessBtn'
            id='closeButton'
            onClick={handleClear}
            size='small'
          >
            <FontAwesomeIcon
              icon={state === 'success' ? faBroom : faArrowsRotate}
              className={styles.buttonContent}
            />

            <span className={styles.buttonContent}>
              {state === 'error' ? 'Try again' : 'Clear'}
            </span>
          </MvxButton>
        ) : (
          <MvxButton
            data-testid='signMsgBtn'
            onClick={handleSubmit}
            size='small'
          >
            <FontAwesomeIcon icon={faPenNib} className={styles.buttonContent} />

            <span className={styles.buttonContent}>Sign</span>
          </MvxButton>
        )}
      </div>
    </div>
  );
};
