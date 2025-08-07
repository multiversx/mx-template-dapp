import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { HeaderElementContainer } from '../HeaderElementContainer';

export const SwitchThemeButton = () => {
  const theme = document.documentElement.getAttribute('data-mvx-theme');

  const [themeIcon, setThemeIcon] = useState(
    theme === 'mvx:dark-theme' ? faMoon : faSun
  );

  const handleChangeTheme = () => {
    if (themeIcon === faSun) {
      document.documentElement.setAttribute('data-mvx-theme', 'mvx:dark-theme');
      setThemeIcon(faMoon);
    } else {
      document.documentElement.setAttribute(
        'data-mvx-theme',
        'mvx:light-theme'
      );
      setThemeIcon(faSun);
    }
  };

  return (
    <HeaderElementContainer onClickFunction={handleChangeTheme}>
      <FontAwesomeIcon icon={themeIcon} />
    </HeaderElementContainer>
  );
};
