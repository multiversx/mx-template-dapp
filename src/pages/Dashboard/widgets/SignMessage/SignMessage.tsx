import {
  faArrowsRotate,
  faBroom,
  faPaste,
  faPenNib
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MouseEvent, useState } from 'react';
import { Button, OutputContainer } from 'components';
import { Address, getAccountProvider, Message, useGetAccount } from 'lib';
import { ItemsIdEnum } from 'pages/Dashboard/dashboard.types';
import { SignFailure, SignSuccess } from './components';

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
    <div id={ItemsIdEnum.signMessage} className='flex flex-col gap-6'>
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
              className='text-tertiary text-sm font-semibold flex items-center bg-tertiary rounded-md cursor-pointer px-1'
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
          <Button
            data-testid='closeTransactionSuccessBtn'
            id='closeButton'
            onClick={handleClear}
            icon={state === 'success' ? faBroom : faArrowsRotate}
            label={state === 'error' ? 'Try again' : 'Clear'}
          />
        ) : (
          <Button
            data-testid='signMsgBtn'
            onClick={handleSubmit}
            icon={faPenNib}
            label='Sign'
          />
        )}
      </div>
    </div>
  );
};
