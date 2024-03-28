import { GlobalSelectorEnum, RoutesEnum } from '../../utils/enums.ts';
import { openProviderModal, checkUrl } from '../../utils/actions.ts';

describe('Check Ledger Modal', () => {
  beforeEach(async () => {
    await browser.url('https://integration.template-dapp.multiversx.com/');
    await $(GlobalSelectorEnum.connectBtn).click();
  });

  afterEach(async () => {
    await browser.reloadSession();
  });

  it('should properly open ledger modal from wallet tab', async () => {
    const providerData = {
      selector: GlobalSelectorEnum.ledgerBtn,
      route: RoutesEnum.ledger
    };
    await openProviderModal(providerData);
  });
  it('should properly open the ledger modal from dApp tab', async () => {
    await $(GlobalSelectorEnum.ledgerBtn).click();
    await browser.pause(5000);
    await expect($(GlobalSelectorEnum.ledgerBtn)).toBeDisplayed();
  });
});
