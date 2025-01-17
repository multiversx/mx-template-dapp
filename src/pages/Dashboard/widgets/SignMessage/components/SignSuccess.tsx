import { Label } from 'components/Label';
import { decodeMessage } from '../helpers';
import { useGetAccount } from 'lib/sdkDappCore';
import { Message } from '@multiversx/sdk-core/out';

export const SignSuccess = (props: {
  signedMessage: Message | null;
  signature: string;
}) => {
  const { address } = useGetAccount();

  if (props.signedMessage == null) {
    return null;
  }

  const { encodedMessage, decodedMessage } = decodeMessage({
    address,
    message: props.signedMessage,
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
            value={props.signature}
          />
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
