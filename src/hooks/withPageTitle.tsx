import { memo, useEffect } from 'react';
import type { ComponentType } from 'react';

export const withPageTitle =
  (title: string, Component: ComponentType) => () => {
    const Memoized = memo(Component);

    useEffect(() => {
      document.title = title;
    }, []);
    return <Memoized />;
  };
