import { defineWalletSetup } from '@synthetixio/synpress';
import { getExtensionId, MetaMask } from '@synthetixio/synpress/playwright';

// Get password and mnemonic from environment variables
export const METAMASK_PASSWORD = process.env.METAMASK_PASSWORD;
export const METAMASK_MNEMONIC = process.env.METAMASK_MNEMONIC;
export const METAMASK_ADDRESS = process.env.METAMASK_ADDRESS;

// Validate that required environment variables are present
if (!METAMASK_PASSWORD || !METAMASK_MNEMONIC || !METAMASK_ADDRESS) {
  throw new Error(
    'METAMASK_PASSWORD, METAMASK_MNEMONIC, and METAMASK_ADDRESS environment variables are missing. Please set them in .env.test.local for local development or as a GitHub Secret for CI.'
  );
}

// Define the basic wallet setup with hash override to fix cache mismatch issue
// This is a workaround for the Synpress cache hash calculation difference between CLI and test runtime
const setup = {
  ...defineWalletSetup(METAMASK_PASSWORD, async (context, walletPage) => {
    // This is a workaround for the fact that the MetaMask extension ID changes, and this ID is required to detect the pop-ups.
    // It won't be needed in the near future! 😇
    const extensionId = await getExtensionId(context, 'MetaMask');

    // Create a new MetaMask instance
    const metamask = new MetaMask(
      context,
      walletPage,
      METAMASK_PASSWORD,
      extensionId
    );

    // Import the wallet using the seed phrase
    await metamask.importWallet(METAMASK_MNEMONIC);
  })
};

export default setup;
