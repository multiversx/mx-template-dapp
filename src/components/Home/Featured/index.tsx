import React from 'react';
import Featured from 'components/Card/FeaturedCard';

const NFTs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const index = () => {
  return (
    <div className='featured'>
      <div className='featured__top'>
        <div>
          <p>Featured Collection</p>
        </div>
        <p>View all auctions</p>
      </div>
      <div className='featured__bottomCard'>
        {NFTs.map((nft) => (
          <Featured key={nft} />
        ))}
      </div>
    </div>
  );
};

export default index;
