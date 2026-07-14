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

  // The testid is on a native <button>, so assert it became disabled directly.
  if (lastClickedButton === 'ping') {
    await expect(pingButton).toBeDisabled();
    return;
  }

  if (lastClickedButton === 'pong') {
    await expect(pongButton).toBeDisabled();
    return;
  }
};
