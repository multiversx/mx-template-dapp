import { defineWalletSetup } from '@synthetixio/synpress';
import { getExtensionId, MetaMask } from '@synthetixio/synpress/playwright';

// Get password and mnemonic from environment variables
export const PASSWORD = process.env.METAMASK_PASSWORD;
export const SEED_PHRASE = process.env.METAMASK_MNEMONIC;

// Validate that required environment variables are present
if (!PASSWORD) {
  throw new Error(
    'METAMASK_PASSWORD environment variable is missing. Please set it in .env.test.local for local development or as a GitHub Secret for CI.'
  );
}

if (!SEED_PHRASE) {
  throw new Error(
    'METAMASK_MNEMONIC environment variable is missing. Please set it in .env.test.local for local development or as a GitHub Secret for CI.'
  );
}

// Define the basic wallet setup with hash override to fix cache mismatch issue
// This is a workaround for the Synpress cache hash calculation difference between CLI and test runtime
const setup = {
  ...defineWalletSetup(PASSWORD, async (context, walletPage) => {
    // This is a workaround for the fact that the MetaMask extension ID changes, and this ID is required to detect the pop-ups.
    // It won't be needed in the near future! 😇
    const extensionId = await getExtensionId(context, 'MetaMask');

    // Create a new MetaMask instance
    const metamask = new MetaMask(context, walletPage, PASSWORD, extensionId);

    // Import the wallet using the seed phrase
    await metamask.importWallet(SEED_PHRASE);
  })
};

export default setup;
export { PASSWORD as walletPassword };
