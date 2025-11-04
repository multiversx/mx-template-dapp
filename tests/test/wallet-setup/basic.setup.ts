import { defineWalletSetup } from '@synthetixio/synpress';
import { getExtensionId, MetaMask } from '@synthetixio/synpress/playwright';

// Get password and mnemonic from environment variables
const METAMASK_ADDRESS = process.env.METAMASK_ADDRESS;
const METAMASK_MNEMONIC = process.env.METAMASK_MNEMONIC;
const METAMASK_PASSWORD = process.env.METAMASK_PASSWORD;

// Validate that required environment variables are present
if (!METAMASK_PASSWORD || !METAMASK_MNEMONIC || !METAMASK_ADDRESS) {
  throw new Error(
    'METAMASK_PASSWORD, METAMASK_MNEMONIC, and METAMASK_ADDRESS environment variables are missing. Please set them in .env.test.local for local development or as a GitHub Secret for CI.'
  );
}

// Define the basic wallet setup with hash override to fix cache mismatch issue
// This is a workaround for the Synpress cache hash calculation difference between CLI and test runtime
const walletSetup = {
  ...defineWalletSetup(METAMASK_PASSWORD, async (context, walletPage) => {
    const extensionId = await getExtensionId(context, 'MetaMask');
    const metamask = new MetaMask(
      context,
      walletPage,
      METAMASK_PASSWORD,
      extensionId
    );
    await metamask.importWallet(METAMASK_MNEMONIC);
  }),
  // Harcode hash to fix cache mismatch issue
  // Find a better way to fix this in the future
  hash: '880a8ff1e48d99ce5f2d'
};

export default walletSetup;
