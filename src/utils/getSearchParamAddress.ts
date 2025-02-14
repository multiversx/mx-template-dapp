import { addressIsValid, getWindowLocation } from '../lib/sdkDapp/sdkDappCore';

export const getSearchParamAddress = () => {
  const { search } = getWindowLocation();
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams as any);
  const address: string = params?.address;
  if (addressIsValid(address)) {
    return address;
  }
  return null;
};
