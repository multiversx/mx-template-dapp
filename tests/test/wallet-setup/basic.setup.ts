import { defineWalletSetup } from '@synthetixio/synpress';
import { getExtensionId, MetaMask } from '@synthetixio/synpress/playwright';

// Get password and mnemonic from environment variables
export const METAMASK_MNEMONIC = process.env.METAMASK_MNEMONIC;
export const METAMASK_ADDRESS = process.env.METAMASK_ADDRESS;
export const METAMASK_PASSWORD = process.env.METAMASK_PASSWORD;

// Validate that required environment variables are present
if (!METAMASK_MNEMONIC || !METAMASK_ADDRESS || !METAMASK_PASSWORD) {
  throw new Error(
    'METAMASK_MNEMONIC, METAMASK_ADDRESS, and METAMASK_PASSWORD environment variables are missing. Please set them in .env.test.local for local development or as a GitHub Secret for CI.'
  );
}

export default defineWalletSetup(
  METAMASK_PASSWORD,
  async (context, walletPage) => {
    // Get the extension ID for the MetaMask extension
    const extensionId = await getExtensionId(context, 'MetaMask');

    // Create a new MetaMask instance
    // The MetaMask instance is used to import the wallet using the seed phrase
    const metamask = new MetaMask(
      context,
      walletPage,
      METAMASK_PASSWORD,
      extensionId
    );

    // The seed phrase is used to import the wallet
    await metamask.importWallet(METAMASK_MNEMONIC);
  }
);
