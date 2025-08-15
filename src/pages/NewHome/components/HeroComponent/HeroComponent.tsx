import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import classNames from 'classnames';
import {
  FunctionComponent,
  MouseEvent,
  SVGProps,
  useEffect,
  useState
} from 'react';

import brightLightIcon from 'assets/img/bright-light-icon.svg?react';
import tealLabIcon from 'assets/img/teal-lab-icon.svg?react';
import vibeModeIcon from 'assets/img/vibe-mode-icon.svg?react';

interface ThemeOptionType {
  identifier: string;
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  label: string;
  backgroundClass: string;
}

const themeOptions: ThemeOptionType[] = [
  {
    identifier: 'mvx:dark-theme',
    icon: tealLabIcon,
    title: 'TealLab',
    label: 'Customizable',
    backgroundClass: 'bg-dark-theme'
  },
  {
    identifier: 'mvx:vibe-theme',
    icon: vibeModeIcon,
    title: 'VibeMode',
    label: 'Vibrant',
    backgroundClass: 'bg-vibe-theme'
  },
  {
    identifier: 'mvx:light-theme',
    icon: brightLightIcon,
    title: 'BrightLight',
    label: 'Ownable',
    backgroundClass: 'bg-light-theme'
  }
];

export const HeroComponent = () => {
  const [rootTheme, setRootTheme] = useState(
    document.documentElement.getAttribute('data-mvx-theme')
  );

  const activeTheme = themeOptions.find(
    (themeOption) => themeOption.identifier === rootTheme
  );

  const handleThemeSwitch =
    (themeOption: ThemeOptionType) => (event: MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      setRootTheme(themeOption.identifier);

      document.documentElement.setAttribute(
        'data-mvx-theme',
        themeOption.identifier
      );
    };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute('data-mvx-theme');
      setRootTheme(theme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-mvx-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-between w-full lg:h-160 rounded-3xl bg-cover bg-no-repeat bg-center p-8 lg:p-20 border border-secondary backdrop-blur-md',
        activeTheme?.backgroundClass
      )}
    >
      <div className='flex flex-col items-start lg:items-center justify-center gap-10'>
        <div className='flex flex-col lg:items-center justify-center gap-6'>
          <h1 className='!text-primary text-[42px] lg:text-[84px] font-medium leading-[1] tracking-[-2.52px]'>
            dApp Template
          </h1>

          <p className='text-secondary text-xl lg:text-2xl lg:text-center leading-[1.5] tracking-[-0.24px] max-w-138'>
            The sdk-dapp starter project for any dApp built on the MultiversX
            blockchain.
          </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-start gap-6'>
          <MvxButton size='small'>Connect Wallet</MvxButton>

          <MvxButton
            size='small'
            variant='secondary'
            className='bg-btn-secondary hover:bg-btn-primary rounded-xl'
          >
            See Documentation
            <FontAwesomeIcon icon={faArrowRight} />
          </MvxButton>
        </div>
      </div>

      <div className='hidden lg:!flex gap-6 '>
        {themeOptions.map((themeOption) => {
          const Icon = themeOption.icon;
          return (
            <div
              key={themeOption.identifier}
              onClick={handleThemeSwitch(themeOption)}
              className={classNames(
                'text-primary opacity-60 hover:opacity-100 flex flex-col items-center gap-2 w-20 relative cursor-pointer',
                {
                  'opacity-100':
                    themeOption.identifier === activeTheme?.identifier
                }
              )}
            >
              <div className='flex flex-col items-center gap-1 relative'>
                <Icon className='fill-primary' />

                <span className='text-primary'>{themeOption.title}</span>
              </div>

              {themeOption.identifier === activeTheme?.identifier && (
                <>
                  <span className='w-2 h-2 rounded-full bg-tertiary' />

                  <div className='flex items-center justify-center px-1 absolute -top-1.5 left-10 z-10 text-xs text-accent uppercase bg-accent border border-accent rounded-md'>
                    {themeOption.label}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
