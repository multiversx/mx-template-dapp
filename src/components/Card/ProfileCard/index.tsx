import React from 'react';
import { Button, Col } from 'react-bootstrap';

const index = () => {
  return (
    <Col
    // sm={6} lg={4} xl={3}
    >
      <div className='profileCard'>
        <div className='profileCard__top'>
          <img
            src='https://f8n-production.imgix.net/creators/profile/UkraineDAO_Banner.jpeg?q=30&auto=format%2Ccompress&fit=crop&min-h=200&min-w=400'
            alt=''
          />
          <div>
            <img
              src='https://f8n-production.imgix.net/creators/profile/UkraineDAO_Banner.jpeg?q=30&auto=format%2Ccompress&fit=crop&min-h=200&min-w=400'
              alt=''
            />
          </div>
        </div>
        <div className='profileCard__bottom'>
          <h3>UkraineDAO</h3>
          <h4>@UkraineDAO</h4>
          <div>
            <div>
              <p>140</p>
              <p>Followers</p>
            </div>
            <Button variant='light'>Follow</Button>
          </div>
        </div>
      </div>
    </Col>
  );
};

export default index;
