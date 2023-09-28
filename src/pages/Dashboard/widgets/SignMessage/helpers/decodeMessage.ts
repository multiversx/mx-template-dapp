import { verifyMessage } from 'hooks';
import { Address, SignableMessage } from 'utils';

export const decodeMessage = ({
  address,
  message,
  signature
}: {
  address: string;
  message: string;
  signature: string;
}): { encodedMessage: string; decodedMessage: string } => {
  const messageToSign = new SignableMessage({
    address: new Address(address),
    message: Buffer.from(message)
  });

  const messageObj = JSON.parse(JSON.stringify(messageToSign));
  messageObj.signature = `0x${signature}`;

  const newMessage = verifyMessage(JSON.stringify(messageObj));

  const encodedMessage =
    '0x' +
    Array.from(messageToSign.message, (byte) =>
      byte.toString(16).padStart(2, '0')
    ).join('');

  return {
    encodedMessage: encodedMessage,
    decodedMessage: newMessage.message ?? ''
  };
};
