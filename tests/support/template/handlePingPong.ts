import { TEST_CONSTANTS } from './constants';
import { SelectorsEnum } from './testdata';
import { HandlePingPongType } from './types';

export const handlePingPong = async ({ page, type }: HandlePingPongType) => {
  const container = page.locator(`#ping-pong-${type}`);
  const pingButton = container.getByTestId(SelectorsEnum.pingButton);
  const pongButton = container.getByTestId(SelectorsEnum.pongButton);

  // The testid is on a native <button>, so read its disabled state directly.
  const isPingEnabled = !(await pingButton.isDisabled());
  const isPongEnabled = !(await pongButton.isDisabled());

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
