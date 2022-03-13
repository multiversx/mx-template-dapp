import React from 'react';
import NFTCard from 'components/Card/NFTCard';
import NFTImg1 from '../../../assets/img/nft-img/nft-crypto.gif';

const data = [NFTImg1, NFTImg1, NFTImg1, NFTImg1];

const index = () => {
  return (
    <div className='featuredNft'>
      <div className='featuredNft__top'>
        <div>
          <p>Featured NFTs</p>
        </div>
        <p>View all NFTs</p>
      </div>
      {data.map((img, i) => (
        <NFTCard key={i} image={img} />
      ))}
    </div>
  );
};

export default index;
