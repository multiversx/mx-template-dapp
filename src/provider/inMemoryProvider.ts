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
import { LoginModal } from './LoginModal';

const ADDRESS_KEY = 'address';

const notInitializedError = (caller: string) => () => {
  throw new Error(`Unable to perform ${caller}, Provider not initialized`);
};

let privateKey = '';

export class InMemoryProvider implements IProvider {
  private modal = LoginModal.getInstance();
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

  isInitialized() {
    return Boolean(this._account.address);
  }

  isConnected(): boolean {
    return Boolean(privateKey);
  }

  getTokenLoginSignature(): string | undefined {
    return this._account.signature;
  }

  setAccount(value: IDAppProviderAccount) {
    sessionStorage.setItem(ADDRESS_KEY, value.address);
    this._account = value;
  }

  getAccount(): IDAppProviderAccount | null {
    return this._account;
  }

  async getAddress(): Promise<string | undefined> {
    return this._account.address;
  }

  async init() {
    return true;
  }

  getType() {
    return 'inMemoryProvider';
  }

  async signTransaction(transaction: Transaction) {
    const _privateKey = await this._getPrivateKey('signTransaction');
    const signer = new UserSigner(UserSecretKey.fromString(_privateKey));
    const signature = await signer.sign(transaction.serializeForSigning());
    transaction.applySignature(new Uint8Array(signature));
    return transaction;
  }

  private async _signTransactions(transactions: Transaction[]) {
    const signedTransactions: Transaction[] = [];
    for (const transaction of transactions) {
      const signedTransaction = await this.signTransaction(transaction);
      signedTransactions.push(signedTransaction);
    }
    return signedTransactions;
  }

  async signTransactions(transactions: Transaction[]) {
    const hasPrivateKey = await this._getPrivateKey('signTransactions');

    if (!hasPrivateKey) {
      throw Error('Unable to sign transactions.');
    }

    const signedTransactions = await signTransactions({
      transactions,
      handleSign: this._signTransactions.bind(this)
    });

    return signedTransactions;
  }

  async login(options?: { token?: string }): Promise<{
    address: string;
    signature: string;
  }> {
    return new Promise(async (resolve, reject) => {
      const { address, privateKey: userPrivateKey } =
        await this.modal.showModal({
          needsAddress: true
        });

      if (!address || !userPrivateKey) {
        return reject('User cancelled login');
      }

      privateKey = userPrivateKey;
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
  }

  async logout() {
    sessionStorage.removeItem(ADDRESS_KEY);
    privateKey = '';
    this._account = {
      address: ''
    };
    return true;
  }

  async signMessage(message: Message) {
    const _privateKey = await this._getPrivateKey('signTransaction');

    const signer = new UserSigner(UserSecretKey.fromString(_privateKey));
    const messageComputer = new MessageComputer();

    const messageToSign = new Uint8Array(
      messageComputer.computeBytesForSigning(message)
    );

    const signature = await signer.sign(Buffer.from(messageToSign));
    message.signature = new Uint8Array(signature);

    return message;
  }

  private async _getPrivateKey(action: string) {
    if (!privateKey) {
      const { privateKey: userPrivateKey } = await this.modal.showModal();

      if (!userPrivateKey) {
        await this.logout();
        const throwError = notInitializedError(action);
        return throwError();
      }

      privateKey = userPrivateKey;
    }
    return privateKey;
  }
}
