import { Message } from 'utils/sdkCore';

export const decodeMessage = ({
  message,
  signature
}: {
  message: Message;
  signature: string;
}): { encodedMessage: string; decodedMessage: string } => {
  const messageObj = JSON.parse(JSON.stringify(message));
  messageObj.signature = `0x${signature}`;

  const encodedMessage =
    '0x' +
    Array.from(message.data, (byte) => byte.toString(16).padStart(2, '0')).join(
      ''
    );

  return {
    encodedMessage: encodedMessage,
    decodedMessage: Buffer.from(message?.data).toString()
  };
};
