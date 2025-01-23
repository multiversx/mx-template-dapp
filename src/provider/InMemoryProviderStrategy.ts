import { Message, Transaction } from '@multiversx/sdk-core/out';
import { IDAppProviderOptions, Nullable } from '@multiversx/sdk-dapp-utils/out';
import { IProvider } from 'types/sdkCoreTypes';
import {
  authenticateInMemoryProvider,
  getAddress,
  inMemoryProvider
} from './inMemoryProvider';
import { signTransactions } from '@multiversx/sdk-dapp-core/out/core/providers/strategies/helpers/signTransactions/signTransactions';
import { createUIElement } from '@multiversx/sdk-dapp-core/out/utils/createUIElement';
import { PendingTransactionsModal } from '@multiversx/sdk-dapp-core-ui/dist/components/pending-transactions-modal';
import { PendingTransactionsStateManager } from '@multiversx/sdk-dapp-core/out/core/managers/PendingTransactionsStateManager/PendingTransactionsStateManager';
// TODO: fix import ?
// import { PendingTransactionsEventsEnum } from '@multiversx/sdk-dapp-core-ui/src/components/pending-transactions-modal/pending-transactions-modal.types';

export class InMemoryProviderStrategy {
  private address: string = '';
  private provider: IProvider | null = null;
  private _signTransactions:
    | ((
        transactions: Transaction[],
        options?: IDAppProviderOptions
      ) => Promise<Nullable<Transaction[]>>)
    | null = null;
  private _signMessage:
    | ((message: Message) => Promise<Nullable<Message>>)
    | null = null;

  constructor(address?: string) {
    this.address = address || '';
  }

  public createProvider = async (): Promise<IProvider> => {
    this.initialize();

    if (!this.provider) {
      this.provider = inMemoryProvider;
      this._signTransactions =
        inMemoryProvider.signTransactions.bind(inMemoryProvider);
      this._signMessage = inMemoryProvider.signMessage.bind(inMemoryProvider);
    }

    return this.buildProvider();
  };

  private buildProvider = async () => {
    if (!this.provider) {
      throw new Error('Provider not instantiated');
    }

    const provider = this.provider as unknown as IProvider;
    provider.setAccount({ address: this.address });
    provider.signTransactions = this.signTransactions;
    provider.login = this.login;
    provider.signMessage = this.signMessage;

    return provider;
  };

  private initialize = () => {
    if (this.address) {
      return;
    }

    const address = getAddress();

    if (!address) {
      return;
    }

    this.address = address;
  };

  private signTransactions = async (transactions: Transaction[]) => {
    if (!this._signTransactions) {
      throw new Error('Sign transactions method is not initialized');
    }

    const signedTransactions = await signTransactions({
      transactions,
      handleSign: this._signTransactions
    });

    return signedTransactions;
  };

  private login = async (options?: {
    callbackUrl?: string;
    token?: string;
  }) => {
    if (!this.provider) {
      throw new Error('Provider not instantiated');
    }

    const { address, signature } = await authenticateInMemoryProvider(
      options?.token
    );

    return {
      address,
      signature
    };
  };

  private signMessage = async (message: Message) => {
    if (!this.provider || !this._signMessage) {
      throw new Error('Provider not instantiated');
    }

    const modalElement = await createUIElement<PendingTransactionsModal>(
      'pending-transactions-modal'
    );

    const { eventBus, manager, onClose } =
      await this.getModalHandlers(modalElement);

    eventBus.subscribe('CLOSE', onClose);

    manager.updateData({
      isPending: true,
      title: 'Message Signing',
      subtitle: 'Check your Ledger device to sign the message'
    });

    try {
      const signedMessage = await this._signMessage(message);

      return signedMessage;
    } finally {
      onClose();
      eventBus.unsubscribe('CLOSE', onClose);
    }
  };

  private getModalHandlers = async (modalElement: PendingTransactionsModal) => {
    const eventBus = await modalElement.getEventBus();

    if (!eventBus) {
      throw new Error('eventBus is not initialized');
    }

    const manager = new PendingTransactionsStateManager(eventBus);

    const onClose = () => {
      modalElement.remove();
      manager.closeAndReset();
    };

    return { eventBus, manager, onClose };
  };
}
