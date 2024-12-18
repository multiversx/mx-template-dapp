import { useEffect, useState } from 'react';
import { getStore } from 'lib/sdkDappCore';

export function useStore() {
  const store = getStore();
  const [state, setState] = useState(store.getState());

  const unsubscribe = store.subscribe((newState) => {
    setState(newState);
  });

  useEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  return state;
}
