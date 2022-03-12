import * as React from 'react';
import Featured from 'components/Home/Featured';
import FeaturedNft from 'components/Home/FeaturedNft';
import FeaturedProfile from 'components/Home/FeaturedProfile';
import Hero from 'components/Home/Hero';
import Trending from 'components/Home/Trending';

const Home = () => {
  return (
    <div className='container-xl'>
      <Hero />
      <Trending />
      <Featured />
      <FeaturedNft />
      <FeaturedProfile />
    </div>
  );
};

export default Home;
