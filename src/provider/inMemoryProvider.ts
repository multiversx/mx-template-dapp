import {
  Address,
  Message,
  MessageComputer,
  Transaction,
  UserSecretKey,
  UserSigner
} from '@multiversx/sdk-core/out';
import { IDAppProviderAccount } from '@multiversx/sdk-dapp-utils/out';
import { IProvider } from 'types/sdkCoreTypes';
import { signTransactions } from '@multiversx/sdk-dapp-core/out/core/providers/strategies/helpers/signTransactions/signTransactions';
// TODO: fix import ?
// import { PendingTransactionsEventsEnum } from '@multiversx/sdk-dapp-core-ui/src/components/pending-transactions-modal/pending-transactions-modal.types';

const ADDRESS_KEY = 'address';

const notInitializedError = (caller: string) => () => {
  throw new Error(`Unable to perform ${caller}, Provider not initialized`);
};

let privateKey = '';

export class InMemoryProvider implements IProvider {
  private _account: IDAppProviderAccount = {
    address: sessionStorage.getItem(ADDRESS_KEY) || ''
  };

  constructor(address?: string) {
    if (address) {
      this.setAccount({
        address
      });
    }
  }

  isInitialized = () => Boolean(this._account.address);

  isConnected = () => Boolean(privateKey);

  getTokenLoginSignature = () => this._account.signature;

  setAccount = (value: IDAppProviderAccount) => {
    sessionStorage.setItem(ADDRESS_KEY, value.address);
    this._account = value;
  };

  getAccount = () => this._account;

  getAddress = async () => this._account.address;

  init = async () => true;

  getType = () => 'inMemoryProvider';

  signTransaction = async (transaction: Transaction) => {
    const signer = new UserSigner(
      UserSecretKey.fromString(this._getPrivateKey('signTransaction'))
    );
    const signature = await signer.sign(transaction.serializeForSigning());
    transaction.applySignature(new Uint8Array(signature));
    return transaction;
  };

  signTransactions = async (transactions: Transaction[]) => {
    const signedTransactions = await signTransactions({
      transactions,
      handleSign: this.signTransactions
    });

    return signedTransactions;
  };

  login = async (options?: {
    token?: string;
  }): Promise<{
    address: string;
    signature: string;
  }> => {
    return new Promise(async (resolve) => {
      const address = window.prompt('Enter the address:') || '';
      this._getPrivateKey('login');

      this.setAccount({
        address
      });
      const token = options?.token;

      if (!token) {
        resolve({
          address,
          signature: ''
        });
        return;
      }

      const message = `${address}${token}{}`;
      const msg = new Message({
        address: new Address(address),
        data: new Uint8Array(Buffer.from(message))
      });
      const signedMessage = await this.signMessage(msg);
      const signature = Buffer.from(String(signedMessage?.signature)).toString(
        'hex'
      );

      this.setAccount({
        address,
        signature
      });

      resolve({
        address,
        signature
      });
    });
  };

  logout = async () => {
    sessionStorage.removeItem(ADDRESS_KEY);
    privateKey = '';
    this._account = {
      address: ''
    };
    return true;
  };

  signMessage = async (message: Message) => {
    const signer = new UserSigner(
      UserSecretKey.fromString(this._getPrivateKey('signMessage'))
    );
    const messageComputer = new MessageComputer();

    const messageToSign = new Uint8Array(
      messageComputer.computeBytesForSigning(message)
    );

    const signature = await signer.sign(Buffer.from(messageToSign));
    message.signature = new Uint8Array(signature);

    return message;
  };

  private _getPrivateKey = (action: string) => {
    if (!privateKey) {
      const userPrivateKey = window.prompt('Enter the private key:') || '';
      if (userPrivateKey == null) {
        this.logout();
        const throwError = notInitializedError(action);
        return throwError();
      } else {
        privateKey = userPrivateKey;
      }
    }
    return privateKey;
  };
}
