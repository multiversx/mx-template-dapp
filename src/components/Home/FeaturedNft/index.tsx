import React from 'react';
import { Button, Row } from 'react-bootstrap';
import NFTCard from 'components/Card/NFTCard';
import NFTImg1 from '../../../assets/img/nft-img/nft-crypto.gif';

const data = [NFTImg1, NFTImg1, NFTImg1, NFTImg1];

const index = () => {
  return (
    <div className='featuredNft'>
      <div className='featuredNft__top'>
        <div>
          <h2>Featured NFTs</h2>
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
