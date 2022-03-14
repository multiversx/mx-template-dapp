import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Featured from 'components/Card/FeaturedCard';

const NFTs = [1, 2, 3, 4, 5, 6, 7, 8];

const index = () => {
  return (
    <div className='featured'>
      <div className='featured__top'>
        <div>
          <p>Featured Collection</p>
        </div>
        <Link to='/collections' className='link'>
          <p>View all collections</p>
        </Link>
      </div>
      <Row xs={1} sm={2} md={3} xxl={4} className='g-4'>
        {NFTs.map((nft) => (
          <Featured key={nft} />
        ))}
      </Row>
    </div>
  );
};

export default index;
