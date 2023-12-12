import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToElement = () => {
  const location = useLocation();

  useEffect(() => {
    const [, anchor] = location.hash.split('#');

    if (anchor) {
      const element = document.getElementById(anchor);

      if (element) {
        element.scrollIntoView();
      }
    }
  }, [location.hash]);
};
