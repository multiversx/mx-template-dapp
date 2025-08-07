import { Outlet } from 'react-router-dom';
import { HeroComponent, HowToConnectComponent } from './components';

export const NewHome = () => (
  <div className='flex flex-col items-center justify-center gap-10 bg-transparent px-1 lg:px-2 pb-10 max-w-320 w-screen rounded-3xl'>
    <HeroComponent />

    <HowToConnectComponent />

    <Outlet />
  </div>
);
