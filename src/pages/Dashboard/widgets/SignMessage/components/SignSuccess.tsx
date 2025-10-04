import { Label } from 'components';
import { CopyButton, Message } from 'lib';
import { DataTestIdsEnum } from 'localConstants';

import { decodeMessage } from '../helpers';

// prettier-ignore
const styles = {
  signSuccessContainer: 'sign-success-container flex flex-col gap-6',
  signSuccess: 'sign-success flex flex-col w-[calc(100%-50px)]',
  signatureContainer: 'signature-container flex flex-row w-full gap-2',
  signatureText: 'signature-text w-full resize-none outline-none bg-transparent',
  encodedMessageContainer: 'encoded-message-container flex flex-row w-full gap-2',
  encodedMessageText: 'encoded-message-text flex-1 break-all',
  decodedMessageContainer: 'decoded-message-container flex flex-row w-full gap-2',
  decodedMessageText: 'decoded-message-text flex-1 break-all resize-none outline-none text-green-700 bg-transparent'
} satisfies Record<string, string>;

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
    <div className={styles.signSuccessContainer}>
      <div className={styles.signSuccess}>
        <div className={styles.signatureContainer}>
          <Label>Signature:</Label>

          <textarea
            data-testid={DataTestIdsEnum.messageSignature}
            readOnly
            className={styles.signatureText}
            rows={2}
            defaultValue={props.signature}
          />

          <CopyButton text={props.signature} />
        </div>

        <div className={styles.encodedMessageContainer}>
          <Label>Encoded message:</Label>

          <p data-testid={DataTestIdsEnum.encodedMessage} className={styles.encodedMessageText}>{encodedMessage}</p>
        </div>

        <div className={styles.decodedMessageContainer}>
          <Label>Decoded message:</Label>

          <p data-testid={DataTestIdsEnum.decodedMessage} className={styles.decodedMessageText}>{decodedMessage}</p>
        </div>
      </div>
    </div>
  );
};
