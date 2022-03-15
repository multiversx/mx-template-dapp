import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NFTCard from 'components/Card/NFTCard';
import { routeNames } from 'routes';
import NFTImg1 from '../../../assets/img/nft-img/nft-crypto.gif';

const data = [NFTImg1, NFTImg1, NFTImg1, NFTImg1];

const index = () => {
  return (
    <div className='featuredNft'>
      <div className='featuredNft__top'>
        <div>
          <h2>Featured NFTs</h2>
        </div>
        <Link to={routeNames.nfts} className='link'>
          <p>View all NFTs</p>
        </Link>
      </div>
      <Row xs={1} sm={2} md={3} xxl={4} className='g-4'>
        {data.map((img, i) => (
          <NFTCard key={i} image={img} />
        ))}
      </Row>
    </div>
  );
};

export default index;
