import React from 'react';
import { Spinner } from 'react-bootstrap';
import NFTCard from 'components/Card/NFTCard';

const NFTs = [1, 2, 3, 4, 5, 6, 7, 8];

const index = () => {
  return (
    <div className='trending'>
      <div className='trending__top'>
        <div>
          <Spinner animation='grow' size='sm' />
          <p>Trending auctions</p>
        </div>
        <p>View all auctions</p>
      </div>
      {NFTs.map((nft) => (
        <NFTCard key={nft} />
      ))}
    </div>
  );
};

export default index;
