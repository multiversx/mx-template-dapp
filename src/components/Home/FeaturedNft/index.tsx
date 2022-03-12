import React from 'react';
import NFTCard from 'components/Card/NFTCard';

const NFTs = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24
];

const index = () => {
  return (
    <div className='featuredNft'>
      <div className='featuredNft__top'>
        <div>
          <p>Featured NFTs</p>
        </div>
        <p>View all NFTs</p>
      </div>
      {NFTs.map((nft) => (
        <NFTCard key={nft} />
      ))}
    </div>
  );
};

export default index;
