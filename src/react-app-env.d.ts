import type { FormatAmount } from '@multiversx/sdk-dapp-core-ui/dist/types/components/format-amount';
import type { ExplorerLink } from '@multiversx/sdk-dapp-core-ui/dist/types/components/explorer-link';
import type { TransactionsTable } from '@multiversx/sdk-dapp-core-ui/dist/types/components/transactions-table';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'format-amount': FormatAmount;
      'explorer-link': ExplorerLink;
      'transactions-table': TransactionsTable;
    }
  }
}
