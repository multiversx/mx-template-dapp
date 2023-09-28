import type { ComponentType } from 'react';
import { useEffect, memo } from 'react';

export const withPageTitle =
  (title: string, Component: ComponentType) => () => {
    const Memoized = memo(Component);

    useEffect(() => {
      document.title = title;
    }, []);
    return <Memoized />;
  };
