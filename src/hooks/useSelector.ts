import { StoreType } from '@multiversx/sdk-dapp-core/out/store/store.types';
import { useStore } from './useStore';

type ExtractState<S> = S extends { getState: () => infer X } ? X : StoreType;

export const useSelector = <T>(
  selector: (state: ExtractState<StoreType>) => T
) => {
  return useStore(selector);
};
