import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { HeaderElementContainer } from '../HeaderElementContainer';

export const SwitchThemeButton = () => {
  const [themeIcon, setThemeIcon] = useState(faMoon);
  const handleChangeTheme = () => {
    if (themeIcon === faSun) {
      document.documentElement.setAttribute('data-theme', 'mvx:dark-theme');
      setThemeIcon(faMoon);
    } else {
      document.documentElement.setAttribute('data-theme', 'mvx:light-theme');
      setThemeIcon(faSun);
    }
  };

  return (
    <HeaderElementContainer onClickFunction={handleChangeTheme}>
      <FontAwesomeIcon icon={themeIcon} />
    </HeaderElementContainer>
  );
};
