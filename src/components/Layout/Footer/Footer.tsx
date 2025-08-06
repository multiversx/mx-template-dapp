import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Footer = () => {
  return (
    <footer className='mx-auto w-full max-w-prose pb-6 pl-6 pr-6 text-center text-gray-400'>
      <div className='flex flex-col items-center text-sm '>
        <a
          href='/disclaimer'
          className='text-neutral-500 hover:cursor-pointer hover:underline px-4 py-3'
        >
          Disclaimer
        </a>

        <a
          href='https://multiversx.com/'
          target='_blank'
          className='flex text-[#989898] items-center gap-1 hover:underline'
        >
          <FontAwesomeIcon icon={faCopyright} />
          <span>2025 MultiversX. All rights reserved</span>
        </a>
      </div>
    </footer>
  );
};
