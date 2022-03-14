import React from 'react';
import { Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NFTCard from 'components/Card/NFTCard';
import NFTImage1 from '../../../assets/img/nft-img/nft-crypto.gif';
import NFTImage2 from '../../../assets/img/nft-img/nft2.gif';

const data = [NFTImage1, NFTImage2, NFTImage1, NFTImage2, NFTImage1, NFTImage2];

const index = () => {
  return (
    <div className='trending'>
      <div className='trending__top'>
        <div>
          <Spinner animation='grow' size='sm' />
          <p>Trending auctions</p>
        </div>
        <Link to='/nfts'>
          <p>View all auctions</p>
        </Link>
      </div>
      <Row xs={1} md={2} lg={3} xl={3} className='g-4'>
        {data.map((img, i) => (
          <NFTCard key={i} image={img} />
        ))}
      </Row>
    </div>
  );
};

export default index;
