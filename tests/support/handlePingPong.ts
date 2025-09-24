import { SelectorsEnum } from './testdata';
import { TEST_CONSTANTS } from './constants';
import { HandlePingPongType } from './types';

export const handlePingPong = async ({ page, type }: HandlePingPongType) => {
  const container = page.locator(`#ping-pong-${type}`);
  const pingButton = container.getByTestId(SelectorsEnum.pingButton);
  const pongButton = container.getByTestId(SelectorsEnum.pongButton);

  // Check if buttons are enabled by looking for absence of disabled attribute
  const isPingEnabled =
    (await pingButton.locator('button').getAttribute('disabled')) === null;
  const isPongEnabled =
    (await pongButton.locator('button').getAttribute('disabled')) === null;

  if (isPingEnabled) {
    await pingButton.click();
    return 'ping';
  }

  if (isPongEnabled) {
    await pongButton.click();
    return 'pong';
  }

  throw new Error(
    `Neither Ping nor Pong button are enabled! Did you send a Ping or Pong within ${
      TEST_CONSTANTS.PING_PONG_COOLDOWN / 1000 / 60
    } minutes?`
  );
};
