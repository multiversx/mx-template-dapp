import { AuthRedirectWrapper, PageWrapper } from 'wrappers';
import { Transaction } from './Transaction';

export const Home = () => {
  return (
    <AuthRedirectWrapper requireAuth={false}>
      <PageWrapper>
        <div className='flex flex-col-reverse sm:flex-row items-center h-full w-full'>
          <div className='flex items-start sm:items-center h-full sm:w-1/2 sm:bg-center'>
            <div className='flex flex-col gap-2 max-w-[70sch] text-center sm:text-left text-xl font-medium md:text-2xl lg:text-3xl'>
              <div>
                Template dApp <br />
                <span className='text-gray-400'>
                  The sdk-dapp starter project for any dApp{' '}
                  <br className='hidden xl:block' />
                  built on the MultiversX blockchain.
                </span>
              </div>
              <Transaction />
            </div>
          </div>
          <div className='h-4/6 bg-mvx-white bg-contain bg-center bg-no-repeat w-1/2 bg-center' />
        </div>
      </PageWrapper>
    </AuthRedirectWrapper>
  );
};
