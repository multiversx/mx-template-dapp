import { Page } from '@playwright/test';
import { SelectorsEnum } from './testdata';
import { waitUntilStable } from './waitUntilStable';

const RETRY_DELAY_BASE = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const attemptClickElement = async (
  notificationPage: Page,
  action: { type: 'testId' | 'checkbox' | 'button'; name: string }
) => {
  const selectorMap = {
    testId: notificationPage.getByTestId(action.name),
    checkbox: notificationPage.getByRole('checkbox', { name: action.name }),
    button: notificationPage.getByRole('button', { name: action.name })
  };

  const element = selectorMap[action.type];
  if (!element) throw new Error(`Unknown element type: ${action.type}`);

  // 🔍 Debugging logs
  console.log(
    `[Debugging][attemptClickElement] Attempting ${action.type}:${action.name}`
  );
  console.log(
    '[Debugging][attemptClickElement] notificationPage.isClosed():',
    notificationPage.isClosed()
  );
  console.log(
    '[Debugging][attemptClickElement] notificationPage.url():',
    notificationPage.url()
  );

  try {
    await element.waitFor({ state: 'visible', timeout: 10000 });
    console.log(
      `[Debugging][attemptClickElement] Element "${action.name}" visible`
    );
    await element.click();
    console.log(`[Debugging][attemptClickElement] Clicked "${action.name}"`);
  } catch (error) {
    console.log(
      `[Debugging][attemptClickElement] Error clicking "${action.name}":`,
      error.message
    );
    if (notificationPage.isClosed()) {
      console.log(
        `[Debugging][attemptClickElement] Page closed mid-click for "${action.name}"`
      );
      return;
    }

    // Screenshot for CI debugging
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      await notificationPage.screenshot({
        path: `./screenshots/debug-click-${action.name}-${timestamp}.png`,
        fullPage: true
      });
      console.log(
        `[Debugging][attemptClickElement] Screenshot saved for "${action.name}"`
      );
    } catch (ssError) {
      console.log(
        `[Debugging][attemptClickElement] Screenshot failed: ${ssError.message}`
      );
    }

    throw new Error(
      `[attemptClickElement] Failed to click ${action.type}:${action.name} — ${error.message}`
    );
  }
};

export const handleMetaMaskSnapApproval = async (
  notificationPage: Page,
  maxRetries = 5
): Promise<void> => {
  const actions = [
    { type: 'testId', name: SelectorsEnum.snapPrivacyWarningScroll },
    { type: 'button', name: 'Accept' },
    { type: 'button', name: 'Connect' },
    { type: 'button', name: 'Install' },
    { type: 'checkbox', name: 'MultiversX' },
    { type: 'button', name: 'Confirm' },
    { type: 'button', name: 'Ok' },
    { type: 'button', name: 'Approve' }
  ] as const;

  console.log('[Debugging][handleMetaMaskSnapApproval] START');
  console.log(
    '[Debugging][handleMetaMaskSnapApproval] notificationPage URL:',
    notificationPage.url()
  );
  console.log(
    '[Debugging][handleMetaMaskSnapApproval] isClosed:',
    notificationPage.isClosed()
  );

  try {
    const title = await notificationPage.title().catch(() => 'N/A');
    console.log(
      `[Debugging][handleMetaMaskSnapApproval] Page title: "${title}"`
    );
  } catch (e) {
    console.log(
      `[Debugging][handleMetaMaskSnapApproval] Failed to get title: ${e.message}`
    );
  }

  let attempt = 0;
  while (attempt <= maxRetries) {
    try {
      console.log(
        `[Debugging][handleMetaMaskSnapApproval] Attempt ${
          attempt + 1
        }/${maxRetries}`
      );

      await waitUntilStable(notificationPage);
      console.log(
        '[Debugging][handleMetaMaskSnapApproval] Page stable, executing actions...'
      );

      for (const action of actions) {
        await attemptClickElement(notificationPage, action);
      }

      console.log(
        '[Debugging][handleMetaMaskSnapApproval] ✅ All actions succeeded'
      );
      break;
    } catch (error) {
      attempt++;
      console.warn(
        `[handleMetaMaskSnapApproval] Attempt ${attempt}/${maxRetries} failed: ${error.message}`
      );

      // Capture debugging info and screenshot
      console.log(
        '[Debugging][handleMetaMaskSnapApproval] notificationPage.isClosed():',
        notificationPage.isClosed()
      );
      console.log(
        '[Debugging][handleMetaMaskSnapApproval] notificationPage.url():',
        notificationPage.url()
      );

      try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        await notificationPage.screenshot({
          path: `./screenshots/debug-attempt-${attempt}-${timestamp}.png`,
          fullPage: true
        });
        console.log(
          '[Debugging][handleMetaMaskSnapApproval] Screenshot captured for failed attempt'
        );
      } catch (ssError) {
        console.log(
          `[Debugging][handleMetaMaskSnapApproval] Screenshot failed: ${ssError.message}`
        );
      }

      if (attempt <= maxRetries) {
        const delay = RETRY_DELAY_BASE * 2 ** (attempt - 1);
        console.log(
          `[Debugging][handleMetaMaskSnapApproval] Retrying in ${delay}ms...`
        );
        await sleep(delay);

        if (!notificationPage.isClosed()) {
          try {
            console.log(
              '[Debugging][handleMetaMaskSnapApproval] Reloading notification page...'
            );
            await notificationPage.reload();
            await waitUntilStable(notificationPage);
            console.log(
              '[Debugging][handleMetaMaskSnapApproval] Reload complete'
            );
          } catch (reloadError) {
            console.warn(
              `[handleMetaMaskSnapApproval] Failed to reload: ${reloadError.message}`
            );
          }
        }
        continue;
      }

      console.error(
        `[handleMetaMaskSnapApproval] ❌ Failed after ${maxRetries} retries: ${error.message}`
      );
    }
  }

  console.log('[Debugging][handleMetaMaskSnapApproval] END');
};
