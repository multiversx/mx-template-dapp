import { expect, Page } from '@playwright/test';
import { GlobalDataEnum, GlobalSelectorEnum, OriginPageEnum } from './enums';

// Access Daap
export const accessDapp = async (page: Page) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Connect' }).click();
};

// Batch Transactions
export const batchTransactions = async (
  page: Page,
  transactionType: string
) => {
  const selector = page.locator(`[data-testid="${transactionType}"]`);
  let i = transactionType === 'swap-lock' ? 1 : 0;
  await selector.click();
  const walletPage = await findPageByUrlSubstring(
    page,
    OriginPageEnum.multiversxWallet
  );
  await page.waitForTimeout(5000);
  await confirmPass(walletPage);
  for (i; i < 5; i++) {
    await page.waitForTimeout(500);
    await walletPage.click(GlobalSelectorEnum.signBtn);
  }
  await walletPage.close();
};

// Check URL
export const checkUrl = async (page: Page, path: string) => {
  const url = page.url();
  expect(url).toContain(path);
};

// Confirm Pass
export const confirmPass = async (page: Page) => {
  await page
    .getByTestId(GlobalSelectorEnum.accesPass)
    .fill(GlobalDataEnum.globalPassword);
  await page.click(GlobalSelectorEnum.accesWalletBtn);
};

// Confirm PEM File
export const confirmPem = async (page: Page, pemFile: string) => {
  await uploadFile(page, pemFile);
  await page.click(GlobalSelectorEnum.accesWalletBtn);
};

// Confirm Transaction
export const confirmTransaction = async (page: Page) => {
  await page.click(GlobalSelectorEnum.signBtn);
  await page.close();
};

/**
 * Finds and returns a page from the context whose URL includes the given substring.
 * Throws an error if no such page is found.
 */
export const findPageByUrlSubstring = async (page: Page, urlSubstring) => {
  await page.waitForTimeout(3000);
  const allPages = await page.context().pages();
  const foundPage = allPages.find((p) => p.url().includes(urlSubstring));
  if (!foundPage) {
    throw new Error(`No page found with URL containing: ${urlSubstring}`);
  }
  return foundPage;
};

export const handlePopup = async (page: Page) => {
  await page.waitForTimeout(3000);
  await page.getByRole('button', { name: 'View All' }).click();
  await page.locator(GlobalSelectorEnum.transactionLink).first().click();
  const explorerPage = findPageByUrlSubstring(
    page,
    OriginPageEnum.explorerPage
  );

  await (await explorerPage).waitForLoadState();
  await expect((await explorerPage).getByText('Success')).toBeVisible({
    timeout: 90000
  });
  await (await explorerPage).close();
};

// Init Transaction
export const initTransaction = async (page: Page) => {
  await page.getByTestId(GlobalSelectorEnum.signAndBatchType).click();
};

// Login
export const login = async (
  page: Page,
  payload: {
    selector: string;
    file: string;
    address: string;
    urlConnect?: boolean;
  }
) => {
  let walletPage;
  walletPage = payload.urlConnect ? page : '';

  if (payload.urlConnect) {
    await page
      .locator(GlobalSelectorEnum.legacyWebWalletLoginDropdownButton)
      .nth(1)
      .click();
    await page.locator(GlobalSelectorEnum.legacyDropdownValue).nth(1).click();
  } else {
    await page
      .locator('div')
      .filter({ hasText: /^MultiversX Web Wallet$/ })
      .first()
      .click();
  }
  walletPage = await findPageByUrlSubstring(
    page,
    OriginPageEnum.multiversxWallet
  );
  await walletPage.click(payload.selector);
  await uploadFile(walletPage, payload.file);

  if (payload.selector === GlobalSelectorEnum.keystoreBtn) {
    await confirmPass(walletPage);
    await walletPage.click(`[data-testid*=${payload.address}]`);
    await walletPage.getByText('Acces').nth(2).scrollIntoViewIfNeeded();
    await walletPage
      .getByTestId(GlobalSelectorEnum.confirmBtn)
      .dispatchEvent('click');
  } else {
    await walletPage.click(GlobalSelectorEnum.accesWalletBtn);
  }
};

// Logout
export const logout = async (page: Page) => {
  await page.goto(GlobalDataEnum.daapWindow);
  await page.click(GlobalSelectorEnum.logoutBtn);
  expect(page.locator(GlobalSelectorEnum.unlockPage)).toBeVisible();
};

// Open Provider Modal
export const openProviderModal = async (
  page: Page,
  payload: { selector: string; route: string }
) => {
  await page.click(GlobalSelectorEnum.crossWindowLoginBtn);
  const walletPage = await page.context().waitForEvent('page');
  await walletPage.click(payload.selector);
  await checkUrl(walletPage, payload.route);
  await walletPage.close();
};

// Ping Pong Handler
export const pingPongHandler = async (
  page: Page,
  type: string,
  provider = 'keystore'
) => {
  await page.waitForTimeout(3000);
  const btn = await page.locator(`[data-testid="btnPing${type}"]`);
  const isDisabled = await btn.isDisabled();
  if (isDisabled) {
    await scTransaction({ page, type: `btnPong${type}`, provider });
  } else {
    await scTransaction({ page, type: `btnPing${type}`, provider });
  }
};

export const scTransaction = async ({
  page,
  type,
  provider
}: scTransaction) => {
  await page.waitForTimeout(3000);
  const btn = await page.locator(`[data-testid="${type}"]`);
  const isDisabled = await btn.isDisabled();
  if (isDisabled) {
    return;
  }
  await page.waitForTimeout(3000);
  await btn.click();
  const walletPage = await findPageByUrlSubstring(
    page,
    OriginPageEnum.multiversxWallet
  );
  if (provider === 'pem') {
    await confirmPem(walletPage, GlobalDataEnum.pemFile);
  } else {
    await confirmPass(walletPage);
  }

  await walletPage.click(GlobalSelectorEnum.signBtn);
  await handlePopup(page);
  await walletPage.close();
};

// SC Transaction
interface scTransaction {
  page: Page;
  type: string;
  provider?: string;
}

// Upload File
export const uploadFile = async (page: Page, file: string) => {
  await page.getByText('Select a file').click();
  await page.setInputFiles(GlobalSelectorEnum.inputFile, file);
};

// Validate Toast
export const validateToast = async (page: Page, selector: string) => {
  const toast = page.locator(`[data-testid*=${selector}]`);
  const text = await toast.innerText();
  expect(text).toContain('Processing');
};

// Validate Transaction
export const validateTransaction = async (page: Page, svgIndex: number) => {
  const svgElements = page.locator(
    'svg[data-icon="arrow-up-right-from-square"]'
  );
  const [explorerPage] = await Promise.all([
    page.waitForEvent('popup'),
    svgElements.nth(svgIndex).click()
  ]);
  // const explorerPage = await page.context().waitForEvent('page');
  await explorerPage
    .locator('span*=Success')
    .waitFor({ state: 'visible', timeout: 85000 });
};
