import React from 'react';
import { Spinner } from 'react-bootstrap';
import { ReactComponent as ElrondLogoSymbol } from './../../../assets/img/elrond-symbol.svg';

const index = () => {
  return (
    <div className='NFTCard'>
      <div className='NFTCard__imageSection'>
        <img
          className='NFTCard__image'
          src='https://f8n-ipfs-production.imgix.net/QmeRcRXVrCmUk41r3ZwhN5tQqqPshvsJFjx4X9YcqSDvA6/nft.png?q=80&auto=format%2Ccompress&cs=srgb&h=640'
          alt=''
        />
        <div className='NFTCard__elrond'>
          <img
            src='https://f8n-production.imgix.net/creators/profile/otovfpd2w-2021-11-19-0-41-29-jpg-134zbc.jpg?q=50&w=40&h=40&auto=format%2Ccompress&fit=crop&dpr=2'
            alt=''
          />
        </div>
      </div>

      <div className='NFTCard__details'>
        <h2 className='NFTCard__detailsTitle'>desolate</h2>
        <div className='NFTCard__detailsBrand'>
          <img
            src='https://f8n-production.imgix.net/collections/diavph7y8-%EB%A1%9C%EA%B3%A0%20%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B8%EA%B1%B0%20%EB%B3%B5%EC%82%AC.jpg?q=50&w=24&h=24&auto=format%2Ccompress&fit=crop&dpr=2&frame=1'
            alt=''
          />
          <p>Foundation</p>
        </div>
        <p className='NFTCard__detailsCurrentBid'>Current Bid</p>
        <div className='NFTCard__detailsBidPrice'>
          <p>25.00 ETH</p>
          <div>
            <Spinner
              animation='grow'
              size='sm'
              variant='light'
              className='NFTCard__detailsBidSpinner'
            />
            <p>LIVE</p>
            <p>11h</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default index;
