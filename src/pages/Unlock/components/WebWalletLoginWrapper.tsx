import React, { useEffect, useRef, useState } from 'react';
import { WebWalletLoginButtonPropsType } from '@multiversx/sdk-dapp/UI/webWallet/WebWalletLoginButton/WebWalletLoginButton';
import { useWebWalletLogin } from '@multiversx/sdk-dapp/hooks/login/useWebWalletLogin';
import {
  CrossWindowLoginButton,
  WebWalletLoginButton as WebWalletUrlLoginButton
} from 'components/sdkDappComponents';

export const WebWalletLoginConfigEnum = {
  crossWindow: 'crossWindow',
  url: 'url'
};

export const WebWalletLoginWrapper = ({
  config,
  ...commonProps
}: WebWalletLoginButtonPropsType & {
  config: (keyof typeof WebWalletLoginConfigEnum)[];
}) => {
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  const [onInitiateLogin] = useWebWalletLogin({
    ...commonProps
  });

  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutside = [dropdownRef, anchorRef].every((ref) => {
        return ref.current && !ref.current.contains(event.target as Node);
      });
      if (isOutside) {
        setShowOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, anchorRef]);

  const onDropdownClick = () => {
    setShowOptions((current) => !current);
  };

  const handleLegacyUrlLogin = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    onInitiateLogin();
  };

  const hasBothOptions = config.length === 2;

  if (hasBothOptions) {
    return (
      <div className='flex items-center'>
        <CrossWindowLoginButton
          loginButtonText='Web Wallet'
          data-testid='webWalletLoginBtn'
          className='!mr-0 !rounded-none !rounded-l-md'
          {...commonProps}
        />
        <div
          style={{
            position: 'relative'
          }}
        >
          <button
            data-testid='legacyWebWalletLoginDropdownButton'
            className='flex-shrink-0 z-10 inline-flex items-center py-3.5 px-2 text-sm font-medium text-center text-gray-200 rounded-r-md border border-gray-200 dark:border-gray-700 dark:text-white hover:bg-gray-200 hover:text-gray-400 focus:ring-2 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            type='button'
            ref={dropdownRef}
            onClick={onDropdownClick}
          >
            <svg
              className='w-2.5 h-2'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 4 4 4-4'
              />
            </svg>
          </button>
          <div
            style={{
              position: 'absolute',
              inset: '0px auto auto 0px',
              margin: '0px',
              transform: 'translate3d(-148px, 40px, 0px)'
            }}
            className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
              showOptions ? 'block' : 'hidden'
            }`}
          >
            <ul
              className='py-2 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdown-button'
            >
              <li>
                <a
                  onClick={handleLegacyUrlLogin}
                  data-testid='legacyWebWalletLoginButton'
                  href='#'
                  ref={anchorRef}
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Web Wallet URL login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (config.includes('url')) {
    return (
      <WebWalletUrlLoginButton
        loginButtonText='Web Wallet'
        data-testid='webWalletLoginBtn'
        {...commonProps}
      />
    );
  }

  return (
    <CrossWindowLoginButton
      loginButtonText='Web Wallet'
      data-testid='webWalletLoginBtn'
      {...commonProps}
    />
  );
};
