import React from 'react';
import { Button } from 'react-bootstrap';

const Hero = () => {
  return (
    <div className='row my-2'>
      <div className='col-md-6'>
        <img
          className='img-fluid'
          src='https://f8n-production-collection-assets.imgix.net/0x8F793086437A5Aa2204EA18C9aFEb9d7023AD839/124/QmQ5goL32oD6Yb6YWsri5UHfBZ1rEoTQFw6sixTKUo2nv4/nft.jpg?q=80&auto=format%2Ccompress&cs=srgb&max-w=1680&max-h=1680'
          alt='hero-img'
        />
      </div>
      <div className='col-md-6'>
        {/*  */}
        <div>
          <h1 className='hero_title text-break text-dark'>Who we are #92</h1>
          <div className='row'>
            <div className='col-md-6'>
              <h5 className='text-secondary'>Created by</h5>
              <button className='btn twice_btn'>
                <img
                  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0rarM9V28hOnv9NSjiQCIwTzd_-WKbJ0MjA&usqp=CAU'
                  alt='chip-img'
                />
                <h5 className='text-dark'>@obscuradao</h5>
              </button>
            </div>
            <div className='col-md-6'>
              <div className='col-md-6'>
                <h5 className='text-secondary'>Created by</h5>
                <button className='btn twice_btn'>
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0rarM9V28hOnv9NSjiQCIwTzd_-WKbJ0MjA&usqp=CAU'
                    alt='chip-img'
                  />
                  <h5 className='text-dark'>@obscuradao</h5>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='row'>
          <div className='col-md-6'>
            <h6>Current bid</h6>
            <h1>0.35 ETH</h1>
            <h6>$910.09</h6>
          </div>
          <div className='col-md-6'>
            <h6>Action ends in</h6>
            <div>
              <div>10</div>
              <div>hours</div>
              <div>39</div>
              <div>minutes</div>
              <div>05</div>
              <div>seconds</div>
            </div>
            <Button className='bg-dark'>View NFT</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
