import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import { getTestIdSelector } from './testIdSelector';
import { WebWalletLoginMethodType } from './types';

const confirmWithKeystore = async (walletPage: Page, password: string) => {
  try {
    // Check if page is still valid
    if (walletPage.isClosed()) {
      throw new Error(
        'Wallet page has been closed before keystore confirmation'
      );
    }

    await walletPage.getByTestId(SelectorsEnum.passwordInput).fill(password);
    await walletPage.getByTestId(SelectorsEnum.submitButton).click();
  } catch (error) {
    console.error('Error in confirmWithKeystore:', error);
    throw error;
  }
};

const confirmWithPem = async (walletPage: Page, pemPath: string) => {
  try {
    // Check if page is still valid before using setInputFiles
    if (walletPage.isClosed()) {
      throw new Error('Wallet page has been closed before setInputFiles call');
    }

    await walletPage.setInputFiles(
      getTestIdSelector(SelectorsEnum.walletFile),
      pemPath
    );
    await walletPage.getByTestId(SelectorsEnum.submitButton).click();
  } catch (error) {
    console.error('Error in confirmWithPem:', error);
    throw error;
  }
};

export const confirmWalletTransaction = async (
  page: Page,
  loginMethod: WebWalletLoginMethodType
) => {
  try {
    // Debug logging can be enabled by setting DEBUG_CONFIRM_WALLET=true
    if (process.env.DEBUG_CONFIRM_WALLET === 'true') {
      console.log('🔧 confirmWalletTransaction Debug:');
      console.log('  - Page closed:', page.isClosed());
      console.log('  - Login method keystore:', !!loginMethod.keystore);
      console.log('  - Login method pem:', !!loginMethod.pem);
      console.log('  - Keystore path:', loginMethod.keystore);
      console.log('  - Pem path:', loginMethod.pem);
    }

    switch (true) {
      // Authenticate with keystore
      case Boolean(loginMethod.keystore):
        await confirmWithKeystore(page, loginMethod.password ?? '');
        return;

      // Authenticate with PEM
      case Boolean(loginMethod.pem):
        await confirmWithPem(page, loginMethod.pem!);
        return;

      // No authentication method provided
      default:
        if (process.env.DEBUG_CONFIRM_WALLET === 'true') {
          console.log('  - No authentication method provided');
        }
        return;
    }
  } catch (error) {
    console.error('Error in confirmWalletTransaction:', error);
    throw error;
  }
};
