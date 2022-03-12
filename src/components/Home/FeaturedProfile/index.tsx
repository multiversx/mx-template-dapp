import React from 'react';
import ProfileCard from 'components/Card/ProfileCard';

const profiles = [1, 2, 3, 4];

const index = () => {
  return (
    <div>
      <div className='featuredProfile'>
        <div className='featuredProfile__top'>
          <div>
            <p>Featured Profiles</p>
          </div>
          <p>View all profiles</p>
        </div>
        <div className='featuredProfile__cards'>
          {profiles.map((profile) => (
            <ProfileCard key={profile} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default index;
