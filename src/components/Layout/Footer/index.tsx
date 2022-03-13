import React from 'react';
import { Button } from 'react-bootstrap';
import { ReactComponent as ElrondLogoSymbol } from './../../../assets/img/elrond-symbol.svg';

const Footer = () => {
  return (
    <footer>
      <div className='footer container-xl'>
        <div className='footer__top'>
          <div className='footer__topItems'>
            <h3>About</h3>
            <h3>Blog</h3>
            <h3>Press</h3>
            <h3>Careers</h3>
            <h3>Community Guidelines</h3>
            <h3>Help</h3>
          </div>
          <div className='footer__topSubscribe'>
            <h3>Newsletters</h3>
            <p>
              Stay up to date on new releases, interviews, events, and updates
              from Foundation’s community.
            </p>
            <Button>Subscribe</Button>
          </div>
        </div>
        <div className='footer__bottom'>
          <div className='footer__bottomTop'>
            <ElrondLogoSymbol className='footer__logo' />
            <p>Terms of service</p>
            <p>Privacy</p>
          </div>
          <div className='footer__bottomBottom'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
              <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
              <line x1='17.5' y1='6.5' x2='17.51' y2='6.5' />
            </svg>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
