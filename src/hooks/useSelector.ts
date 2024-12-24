import { getStore, createBoundedUseStore, StoreType } from 'lib/sdkDappCore';

type ExtractState<S> = S extends { getState: () => infer X } ? X : StoreType;

export const useSelector = <T>(
  selector: (state: ExtractState<StoreType>) => T
) => {
  const store = createBoundedUseStore(getStore());
  return store(selector);
};
