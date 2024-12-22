import { useEffect, useState } from 'react';
import { getState } from 'lib/sdkDappCore';

export function useStore() {
  const [state, setState] = useState(getState());

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
