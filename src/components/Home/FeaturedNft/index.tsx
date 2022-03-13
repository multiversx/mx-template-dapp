import React from 'react';
import { Button, Row } from 'react-bootstrap';
import NFTCard from 'components/Card/NFTCard';
import { featuredNftData } from './featuredNftData';

const index = () => {
  return (
    <div className='featuredNft'>
      <div className='featuredNft__top'>
        <div>
          <h2>Featured NFTs</h2>
        </div>
        <p>View all NFTs</p>
      </div>
      <Row className=''>
        {featuredNftData.map((img, i) => (
          <NFTCard key={i} image={img} />
        ))}
      </Row>
      <div className='featuredNft__bottom'>
        <Button variant='light'>View all NFTs</Button>
      </div>
    </div>
  );
};

export default index;
