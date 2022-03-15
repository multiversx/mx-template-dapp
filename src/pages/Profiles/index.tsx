import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import ProfileSidebar from './ProfileSidebar';

const Profile = () => {
  return (
    <div className='container-xl'>
      <div className='my-3 nfts__container'>
        <div className='d-none d-md-block'>
          {/* sidebar */}
          <ProfileSidebar />
        </div>

        {/* content */}
        <div className='nftContent'>
          <Row>
            {Array.from({ length: 6 }).map((item, _idx) => (
              <Col key={_idx} md='6' xxl='4'>
                <div className='profileCard'>
                  <div className='profileCard__top'>
                    <img
                      src='https://api.time.com/wp-content/uploads/2021/03/nft-art-4.jpg'
                      alt=''
                    />
                    <div>
                      <img
                        src='https://api.time.com/wp-content/uploads/2021/03/nft-art-4.jpg'
                        alt=''
                      />
                    </div>
                  </div>
                  <div className='profileCard__bottom'>
                    <h3>UkraineDAO</h3>
                    <h4>@UkraineDAO</h4>
                    <div className='border-top-0 mt-0'>
                      <p className='text-dark fs-5'>
                        I used to work for the government. Now I work for the
                        public. President, Freedom of the Press Foundation
                      </p>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Profile;
