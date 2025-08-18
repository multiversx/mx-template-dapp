import { safeWindow } from '@multiversx/sdk-dapp';

import { BrowserEnum } from 'localConstants/browser.enum';

export const getDetectedBrowser = () => {
  const nav = safeWindow?.navigator;
  const userAgent = nav?.userAgent || '';

  if (/Firefox/.test(userAgent)) {
    return BrowserEnum.Firefox;
  }

  if (nav && typeof (nav as any).brave !== 'undefined') {
    return BrowserEnum.Brave;
  }
  if (userAgent.toLowerCase().includes('brave')) {
    return BrowserEnum.Brave;
  }

  if (/Chrome/.test(userAgent)) {
    return BrowserEnum.Chrome;
  }
};
