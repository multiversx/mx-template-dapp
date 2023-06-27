import React from 'react';
import packageJSON from '../../../../package.json';
import { ReactComponent as HeartIcon } from '../../../assets/img/heart.svg';

const dappVersion = process.env.REACT_APP_CACHE_BUST;

export const Footer = () => {
  return (
    <footer className='text-center mt-2 mb-3'>
      <div>
        <a
          {...{
            target: '_blank'
          }}
          className='d-flex align-items-center'
          href='https://multiversx.com/'
        >
          Made with <HeartIcon className='mx-1' /> by the MultiversX team
        </a>
      </div>
      <br />
      {dappVersion && (
        <small className='text-muted version mt-1'>
          Build {packageJSON.version}-{dappVersion}
        </small>
      )}
    </footer>
  );
};
