import { expect, Page } from '@playwright/test';

import { SelectorsEnum } from './testdata';

// Check if the template is connected to the web wallet by veryfing that
// the top info contains the wallet address
export const checkConnectionToWallet = async (
  page: Page,
  walletAddress: string
) => {
  await expect(page.getByTestId(SelectorsEnum.topInfo)).toContainText(
    walletAddress
  );
};
