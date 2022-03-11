import React from 'react';
import { Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className='hero'>
      <div className='hero__imageSection'>
        <img
          className='hero__image'
          src='https://f8n-production-collection-assets.imgix.net/0xd058C94f4EDf80e6457c430d38e5f38C0f9F7608/7/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680'
          alt='hero_image'
        />
      </div>
      <div className='hero__details'>
        <h1 className='hero__detailsTitle'>robe</h1>
        <div className='hero__detailsTop'>
          <div className='hero__detailsCreatedBy'>
            <p className='hero__detailsCreatedByTitle'>Created by</p>
            <div>
              <img
                src='https://f8n-production.imgix.net/creators/profile/hhhb3bkym-000889210032-jpg-6q7yz2.jpg?q=50&w=36&h=36&auto=format%2Ccompress&fit=crop&dpr=2'
                alt='created_by'
              />
              <p>@rozumnyib</p>
            </div>
          </div>
          <div className='hero__detailsCollection'>
            <p className='hero__detailsCollectionTitle'>Collection</p>
            <div>
              <img
                src='https://f8n-production.imgix.net/collections/v0451l09m-000053.JPG?q=50&w=28&h=28&auto=format%2Ccompress&fit=crop&dpr=2'
                alt='collection'
              />
              <p>Marks on my soul</p>
            </div>
          </div>
        </div>

        <div className='hero__detailsBottom'>
          <div className='hero__detailsBottomCurrentBid'>
            <p>Current bid</p>
            <p>0.12 ETH</p>
            <p>$305.69</p>
          </div>
          <div className='hero__detailsBottomEndsIn'>
            <p className='hero__detailsBottomEndsInTitle'>Auction ends in</p>
            <div>
              <div>
                <p>15</p>
                <p>hours</p>
              </div>
              <div>
                <p>38</p>
                <p>minutes</p>
              </div>
              <div>
                <p>41</p>
                <p>seconds</p>
              </div>
            </div>
          </div>
        </div>
        <Button className='hero__detailsButton'>View NFT</Button>
      </div>
    </div>
  );
};

export default Hero;
