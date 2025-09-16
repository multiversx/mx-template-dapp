import { Outlet } from 'react-router-dom';

import { HomeHero } from './components/HomeHero';
import { HomeConnect } from './components/HomeConnect';

// prettier-ignore
const styles = {
  homeContainer: 'home-container flex flex-col items-center justify-center gap-10 bg-transparent px-2 pb-10 max-w-320 w-screen rounded-3xl overflow-hidden'
} satisfies Record<string, string>;

export const Home = () => (
  <div className={styles.homeContainer}>
    <HomeHero />
    <HomeConnect />
    <Outlet />
  </div>
);
