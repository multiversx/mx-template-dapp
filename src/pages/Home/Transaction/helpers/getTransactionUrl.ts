import { parseAmount, WALLET_PROVIDER_SEND_TRANSACTION_URL } from 'lib';

/**
 * For documentation, check out {@link https://docs.multiversx.com/wallet/webhooks#send-transaction-hook send transaciton hook}
 */
export const getTransactionUrl = (walletAddress: string) => {
  const walletBaseUrl = `${walletAddress}/${WALLET_PROVIDER_SEND_TRANSACTION_URL}`;

  const receiver =
    'erd1deaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaddeaqtv0gag'; // add your receiver address here
  const data = 'Hello_world';
  const value = parseAmount('0.01');
  const callbackUrl = encodeURIComponent(window.location.origin);
  const gasLimit = '116500'; // Minimum gasLimit for guarded wallets

  const searchParams = {
    receiver,
    value,
    data,
    callbackUrl,
    gasLimit
  };

  const search = new URLSearchParams(searchParams).toString();

  const walletUrl = `${walletBaseUrl}?${search}`;
  return walletUrl;
};
