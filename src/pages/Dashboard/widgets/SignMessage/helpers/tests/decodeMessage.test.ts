import { decodeMessage } from '../decodeMessage';

const address =
  'erd1wh9c0sjr2xn8hzf02lwwcr4jk2s84tat9ud2kaq6zr7xzpvl9l5q8awmex';
const signature =
  '0x079da60c478e32d5ddd2fba135708f025db08a6e0c3c440edac664ab151f0bb7c7efc303d96c4b290ff29aaf02f121e986bacbc33fe735fe2b49e7ba911fc608';
const rawMessage = 'hello world';
const signedMessage = '0x68656c6c6f20776f726c64';

describe('decodeMessage', () => {
  it('should decode message', async () => {
    const { decodedMessage, encodedMessage } = decodeMessage({
      address,
      signature,
      message: rawMessage
    });

    // Assert the result is correct based on your mock data
    expect(decodedMessage).toBe(rawMessage);
    expect(encodedMessage).toBe(signedMessage);
  });
});
