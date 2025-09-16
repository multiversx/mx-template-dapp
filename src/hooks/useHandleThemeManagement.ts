import { MouseEvent, useEffect, useState } from 'react';

import { ThemesEnum } from 'lib';

export interface ThemeOptionType {
  identifier: `${ThemesEnum}` | 'mvx:vibe-theme';
  label: string;
}

export const useHandleThemeManagement = () => {
  const attributeHandle = 'data-mvx-theme';

  const allThemeOptions: ThemeOptionType[] = [
    { identifier: 'mvx:dark-theme', label: 'TealLab' },
    { identifier: 'mvx:vibe-theme', label: 'VibeMode' },
    { identifier: 'mvx:light-theme', label: 'BrightLight' }
  ];

  const [rootTheme, setRootTheme] = useState(
    document.documentElement.getAttribute(attributeHandle)
  );

  const activeTheme = allThemeOptions.find(
    (themeOption) => themeOption.identifier === rootTheme
  );

  const handleThemeSwitch =
    (themeOptionIdentifier: ThemeOptionType['identifier']) =>
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      setRootTheme(themeOptionIdentifier);

      document.documentElement.setAttribute(
        attributeHandle,
        themeOptionIdentifier
      );
    };

  useEffect(() => {
    const observer = new MutationObserver(() =>
      setRootTheme(document.documentElement.getAttribute(attributeHandle))
    );

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeHandle]
    });

    return () => observer.disconnect();
  }, []);

  return {
    activeTheme,
    allThemeOptions,
    handleThemeSwitch
  };
};
