import { Address, Message } from 'lib';
import { decodeMessage } from '../decodeMessage';

const address =
  'erd1axhx4kenjlae6sknq7zjg2g4fvzavv979r2fg425p62wkl84avtqsf7vvv';
const signature =
  '795b8437bdbcc9c2a3f610a96d95bd393d23d584d40121ea388999ebd9a34157117a665c86a0285cb207e7da23f4fced848f81c218ebab735da22a5cdb00f803';
const rawMessage = 'hello world';
const signedMessage = '0x68656c6c6f20776f726c64';

describe('decodeMessage', () => {
  it('should decode message', async () => {
    const { decodedMessage, encodedMessage } = decodeMessage({
      signature,
      message: new Message({
        data: new Uint8Array(Buffer.from(rawMessage)),
        address: new Address(address)
      })
    });

    // Assert the result is correct based on your mock data
    expect(decodedMessage).toBe(rawMessage);
    expect(encodedMessage).toBe(signedMessage);
  });
});
