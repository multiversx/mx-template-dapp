import type { FormatAmount } from '@multiversx/sdk-dapp-core-ui/dist/types/components/format-amount';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'format-amount': FormatAmount;
    }
  }
}
