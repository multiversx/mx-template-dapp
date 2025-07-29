import { Account, SideMenu } from './components';

export const LeftPanel = () => {
  return (
    <div className='flex flex-col w-80 p-6 gap-4'>
      <Account />

      <div className='w-full h-0.25 bg-primary' />

      <SideMenu />
    </div>
  );
};
