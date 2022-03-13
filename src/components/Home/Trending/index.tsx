import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import NFTCard from 'components/Card/NFTCard';
import NFTImage1 from '../../../assets/img/nft-img/nft1.jpg';
import NFTImage2 from '../../../assets/img/nft-img/nft2.jpg';
import NFTImage3 from '../../../assets/img/nft-img/nft3.jpg';

const data = [NFTImage1, NFTImage2, NFTImage3, NFTImage2, NFTImage3, NFTImage1];

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
      <Row xs={1} md={2} lg={3} xl={4} className='g-4'>
        {data.map((img, i) => (
          <NFTCard key={i} image={img} />
        ))}
      </Row>
    </div>
  );
};

export default index;
