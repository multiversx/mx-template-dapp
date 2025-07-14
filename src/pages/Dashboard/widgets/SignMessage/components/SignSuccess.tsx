import { Label } from 'components';
import { CopyButton, Message } from 'lib';
import { decodeMessage } from '../helpers';

interface VerifyMessagePropsType {
  message: Message;
  signature: string;
  address: string;
}

export const SignSuccess = (props: VerifyMessagePropsType) => {
  if (props.message == null) {
    return null;
  }

  const { encodedMessage, decodedMessage } = decodeMessage({
    message: props.message,
    signature: props.signature
  });

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col w-[calc(100%-50px)]'>
        <div className='flex flex-row w-full gap-2'>
          <Label>Signature:</Label>

          <textarea
            readOnly
            className='w-full resize-none outline-none bg-transparent'
            rows={2}
            defaultValue={props.signature}
          />
          <CopyButton text={props.signature} />
        </div>

        <div className='flex flex-row w-full gap-2'>
          <Label>Encoded message:</Label>
          <p>{encodedMessage}</p>
        </div>

        <div className='flex flex-row w-full gap-2'>
          <Label>Decoded message:</Label>
          <textarea
            readOnly
            className='resize-none outline-none text-green-700 bg-transparent'
            rows={1}
            value={decodedMessage}
            placeholder='Decoded message'
          />
        </div>
      </div>
    </div>
  );
};
