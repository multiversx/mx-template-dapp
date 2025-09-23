import { expect, Page } from '@playwright/test';

import { SelectorsEnum } from './testdata';

export const getCurrentBalance = async (page: Page): Promise<number> => {
  const topInfoElement = page.getByTestId(SelectorsEnum.topInfo);
  await topInfoElement.scrollIntoViewIfNeeded();
  const balanceElement = topInfoElement.getByTestId(SelectorsEnum.balance);
  await expect(balanceElement).toBeVisible();

  // Get the integer part
  const intElement = balanceElement.locator(
    `[data-testid="${SelectorsEnum.formatAmountInt}"]`
  );
  await expect(intElement).toBeVisible();
  const intText = await intElement.textContent();

  // Get the decimals part
  const decimalsElement = balanceElement.locator(
    `[data-testid="${SelectorsEnum.formatAmountDecimals}"]`
  );
  await expect(decimalsElement).toBeVisible();
  const decimalsText = await decimalsElement.textContent();

  // Combine integer and decimals to form the complete number
  const fullNumber = `${intText}${decimalsText}`;
  return parseFloat(fullNumber || '0');
};
