import {
  faFileSignature,
  faBroom,
  faArrowsRotate
} from '@fortawesome/free-solid-svg-icons';
import { Button } from 'components/Button';
import { SignFailure, SignSuccess } from './components';
import {
  accountSelector,
  getAccountProvider,
  useSelector
} from 'lib/sdkDappCore';
import { OutputContainer } from 'components/OutputContainer';
import { Address, Message } from 'lib/sdkCore';
import { useState, MouseEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const SignMessage = () => {
  const [message, setMessage] = useState('');
  const [signedMessage, setSignedMessage] = useState<Message | null>(null);
  const [state, setState] = useState<'pending' | 'success' | 'error'>(
    'pending'
  );

  const [signatrue, setSignatrue] = useState('');
  const { address } = useSelector(accountSelector);
  const provider = getAccountProvider();

  const handleSubmit = async () => {
    try {
      const messageToSign = new Message({
        address: new Address(address),
        data: Buffer.from(message)
      });
      const signedMessage = await provider.signMessage(messageToSign);

      if (!signedMessage?.signature) {
        setState('error');
        return;
      }

      setState('success');
      setSignatrue(Buffer.from(signedMessage?.signature).toString('hex'));
      setSignedMessage(signedMessage);
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

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex gap-2 items-start'>
        {['success', 'error'].includes(state) ? (
          <Button
            data-testid='closeTransactionSuccessBtn'
            id='closeButton'
            onClick={handleClear}
          >
            <>
              <FontAwesomeIcon
                icon={state === 'success' ? faBroom : faArrowsRotate}
                className='mr-1'
              />
              {state === 'error' ? 'Try again' : 'Clear'}
            </>
          </Button>
        ) : (
          <Button data-testid='signMsgBtn' onClick={handleSubmit}>
            <>
              <FontAwesomeIcon icon={faFileSignature} className='mr-1' />
              Sign
            </>
          </Button>
        )}
      </div>
      <OutputContainer>
        {!['success', 'error'].includes(state) && (
          <textarea
            placeholder='Write message here1'
            className='resize-none w-full h-32 rounded-lg focus:outline-none focus:border-blue-500'
            onChange={(event) => {
              setMessage(event.currentTarget.value);
            }}
            onKeyUp={(event) => {
              setMessage(event.currentTarget.value);
            }}
          />
        )}

        {state === 'success' && signedMessage != null && (
          <SignSuccess signedMessage={signedMessage} signature={signatrue} />
        )}

        {state === 'error' && <SignFailure />}
      </OutputContainer>
    </div>
  );
};
