import { SelectorsEnum } from './testdata';
import { InMemoryProviderType } from './types';

const authenticateWithInMemoryProvider = async ({
  page,
  loginMethod
}: InMemoryProviderType) => {
  await page.getByTestId(SelectorsEnum.addressInput).fill(loginMethod.address);
  await page
    .getByTestId(SelectorsEnum.privateKeyInput)
    .fill(loginMethod.privateKey);

  await page.getByTestId(SelectorsEnum.submitButton).click();
};

export const connectInMemoryProvider = async ({
  page,
  loginMethod
}: InMemoryProviderType) => {
  await page.getByTestId(SelectorsEnum.inMemoryButton).click();

  if (!loginMethod.address || !loginMethod.privateKey) {
    throw new Error(
      'Both address and private key are required when using an in memory provider.'
    );
  }

  await authenticateWithInMemoryProvider({
    page,
    loginMethod
  });
};
