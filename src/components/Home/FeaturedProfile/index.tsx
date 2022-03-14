import React from 'react';
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProfileCard from 'components/Card/ProfileCard';

const profiles = [1, 2, 3, 4, 5];

const index = () => {
  return (
    <div>
      <div className='featuredProfile'>
        <div className='featuredProfile__top'>
          <div>
            <p>Featured Profiles</p>
          </div>
          <Link to='/profiles' className='link'>
            <p>View all profiles</p>
          </Link>
        </div>
        <Row xs={1} sm={2} md={3} xxl={4}>
          {profiles.map((profile) => (
            <ProfileCard key={profile} />
          ))}
        </Row>
      </div>
    </div>
  );
};

export default index;
