import { expect, Page } from '@playwright/test';

import { PingPongEnum, SelectorsEnum } from './testdata';

export const checkButtonStatus = async ({
  page,
  type,
  lastClickedButton
}: {
  page: Page;
  type: PingPongEnum;
  lastClickedButton: 'ping' | 'pong' | null;
}) => {
  const container = page.locator(`#ping-pong-${type}`);
  const pingButton = container.getByTestId(SelectorsEnum.btnPing);
  const pongButton = container.getByTestId(SelectorsEnum.btnPong);

  // Check that ping button became disabled by looking for disabled attribute
  if (lastClickedButton === 'ping') {
    await expect(pingButton.locator('button')).toHaveAttribute('disabled');
    return;
  }

  if (lastClickedButton === 'pong') {
    await expect(pongButton.locator('button')).toHaveAttribute('disabled');
    return;
  }

  throw new Error(
    'No button click information found. Did you call handlePingPong first?'
  );
};
