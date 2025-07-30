import { Account, SideMenu } from './components';

export const LeftPanel = () => {
  return (
    <div className='flex flex-col w-80 p-6 gap-4 sticky top-0 h-screen'>
      <Account />

      <div className='w-full h-0.25 bg-primary transition-all duration-300' />

      <SideMenu />
    </div>
  );
};
