import { getStore, createBoundedUseStore } from 'lib/sdkDappCore';

const store = getStore();

export const useStore = createBoundedUseStore(store);
