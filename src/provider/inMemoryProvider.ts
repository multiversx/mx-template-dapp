import {
  Address,
  Message,
  MessageComputer,
  UserSecretKey,
  UserSigner
} from '@multiversx/sdk-core/out';
import { Transaction, IProvider } from 'types/sdkCoreTypes';

const ADDRESS_KEY = 'address';

let privateKey: string | null = null;
let address: string = sessionStorage.getItem(ADDRESS_KEY) || '';
let account = {
  address
};

export const getAddress = () =>
  address || sessionStorage.getItem(ADDRESS_KEY) || '';

export const setProviderPrivateKey = (key: typeof privateKey) =>
  (privateKey = key);

export const setProviderAddress = (value: typeof address) => {
  sessionStorage.setItem(ADDRESS_KEY, account.address);
  address = value;
  account.address = value;
};

export const authenticateInMemoryProvider = (
  token?: string
): Promise<{
  address: string;
  signature: string;
}> =>
  new Promise(async (resolve) => {
    const address = window.prompt('Enter the address:') || '';
    const privateKey = window.prompt('Enter the private key:') || '';
    setProviderPrivateKey(privateKey);
    setProviderAddress(address);

    if (!token) {
      resolve({
        address,
        signature: ''
      });
    }

    const message = `${address}${token}{}`;
    const msg = new Message({
      ...(address ? { address: new Address(address) } : {}),
      data: new Uint8Array(Buffer.from(message))
    });
    const signedMessage = await inMemoryProvider.signMessage(msg);
    const signature = Buffer.from(String(signedMessage?.signature)).toString(
      'hex'
    );

    resolve({
      address,
      signature
    });
  });

const notInitializedError = (caller: string) => () => {
  throw new Error(`Unable to perform ${caller}, Provider not initialized`);
};

export const inMemoryProvider: IProvider = {
  init: async () => {
    return Boolean(address);
  },
  getType() {
    return 'custom';
  },
  getTokenLoginSignature() {
    return undefined;
  },
  getAccount: () => account,
  setAccount: (newAccount: typeof account) => {
    setProviderAddress(newAccount.address);
  },
  login: notInitializedError('login'),
  logout: () => {
    setProviderPrivateKey(null);
    setProviderAddress('');
    return new Promise((resolve, reject) => {
      if (privateKey) {
        reject('Unable to perform logout');
      } else {
        resolve(true);
      }
    });
  },
  getAddress: async () => address ?? '',
  isInitialized: () => Boolean(privateKey),
  isConnected: () => false,
  signTransaction: async (transaction: Transaction) => {
    if (!privateKey) {
      const throwError = notInitializedError('signTransaction');
      return throwError();
    }
    const signer = new UserSigner(UserSecretKey.fromString(privateKey));
    const signature = await signer.sign(transaction.serializeForSigning());
    transaction.applySignature(new Uint8Array(signature));

    return transaction;
  },

  signMessage: async (message: Message) => {
    if (!privateKey) {
      const throwError = notInitializedError('signMessage');
      return throwError();
    }

    const signer = new UserSigner(UserSecretKey.fromString(privateKey));
    const messageComputer = new MessageComputer();

    const messageToSign = new Uint8Array(
      messageComputer.computeBytesForSigning(message)
    );

    const signature = await signer.sign(Buffer.from(messageToSign));
    message.signature = new Uint8Array(signature);

    return message;
  },
  signTransactions: async (transactions: Transaction[]) => {
    if (!privateKey) {
      const throwError = notInitializedError('signTransactions');
      return throwError();
    }
    const signedTransactions: Transaction[] = [];
    const signer = new UserSigner(UserSecretKey.fromString(privateKey));

    for (const transaction of transactions) {
      const signature = await signer.sign(transaction.serializeForSigning());

      transaction.signature = new Uint8Array(signature);
      signedTransactions.push(transaction);
    }

    return signedTransactions;
  }
};
