import { expect } from '@playwright/test';

import { SelectorsEnum } from './testdata';
import { CheckButtonStatusType } from './types';

export const checkButtonStatus = async ({
  page,
  type,
  lastClickedButton
}: CheckButtonStatusType) => {
  const container = page.locator(`#ping-pong-${type}`);
  const pingButton = container.getByTestId(SelectorsEnum.pingButton);
  const pongButton = container.getByTestId(SelectorsEnum.pongButton);

  // Check that ping button became disabled by looking for disabled attribute
  if (lastClickedButton === 'ping') {
    await expect(pingButton.locator('button')).toHaveAttribute('disabled');
    return;
  }

  if (lastClickedButton === 'pong') {
    await expect(pongButton.locator('button')).toHaveAttribute('disabled');
    return;
  }
};
