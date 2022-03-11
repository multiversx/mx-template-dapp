import * as React from 'react';
import Featured from 'components/Home/Featured';
import Hero from 'components/Home/Hero';
import Trending from 'components/Home/Trending';

const Home = () => {
  return (
    <div className='container-xl'>
      <Hero />
      <Trending />
      <Featured />
    </div>
  );
};

export default Home;
