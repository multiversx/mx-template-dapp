import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { FunctionComponent, SVGProps, useState } from 'react';
import brightLightIcon from 'assets/img/bright-light-icon.svg?react';
import tealLabIcon from 'assets/img/teal-lab-icon.svg?react';
import vibeModeIcon from 'assets/img/vibe-mode-icon.svg?react';
import { Button } from 'components';

interface ThemeOptionsType {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  title: string;
  label: string;
}

const themeOptions: ThemeOptionsType[] = [
  {
    icon: tealLabIcon,
    title: 'TealLab',
    label: 'Customizable'
  },
  {
    icon: vibeModeIcon,
    title: 'VibeMode',
    label: 'Vibrant'
  },
  {
    icon: brightLightIcon,
    title: 'BrightLight',
    label: 'Ownable'
  }
];

export const HeroComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleHeaderThemeChange = (index: number) => {
    if (index === 0) {
      document.documentElement.setAttribute('data-mvx-theme', 'mvx:dark-theme');
    } else if (index === 1) {
      document.documentElement.setAttribute('data-mvx-theme', 'mvx:vibe-theme');
    } else if (index === 2) {
      document.documentElement.setAttribute(
        'data-mvx-theme',
        'mvx:light-theme'
      );
    }

    setActiveIndex(index);
  };

  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-between w-full h-160 rounded-3xl bg-contain bg-no-repeat bg-center p-20',
        {
          'bg-dark-theme': activeIndex === 0,
          'bg-vibe-theme': activeIndex === 1,
          'bg-light-theme': activeIndex === 2
        }
      )}
    >
      <div className='flex flex-col items-center justify-center gap-10'>
        <div className='flex flex-col items-center justify-center gap-6'>
          <h1 className='!text-primary text-7xl font-medium leading-[1] tracking-[-2.52px]'>
            dApp Template
          </h1>

          <p className='text-secondary text-2xl text-center leading-[1.5] tracking-[-0.24px] max-w-138'>
            The sdk-dapp starter project for any dApp built on the MultiversX
            blockchain.
          </p>
        </div>

        <div className='flex items-center justify-start gap-6'>
          <Button label='Connect Wallet' />

          <a
            href=''
            className='text-primary bg-btn-secondary max-w-66 max-h-12 px-3 py-1.5 rounded-xl'
          >
            <span className='px-4 font-medium'>See Documentation</span>

            <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </div>
      </div>

      <div className='flex gap-6 '>
        {themeOptions.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              onClick={() => handleHeaderThemeChange(index)}
              className={classNames(
                'text-primary opacity-60 flex flex-col items-center gap-2 w-20 relative',
                {
                  'opacity-100': index === activeIndex
                }
              )}
            >
              <div className='flex flex-col items-center gap-1 relative'>
                <Icon className='fill-primary' />

                <span className='text-primary'>{item.title}</span>
              </div>

              {index === activeIndex && (
                <>
                  <span className='w-2 h-2 rounded-full bg-tertiary' />

                  <div className='flex items-center justify-center px-1 absolute -top-1.5 left-10 z-10 text-xs text-accent uppercase bg-accent-variant border border-accent rounded-md'>
                    {item.label}
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
