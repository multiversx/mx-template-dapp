import React from 'react';
import { useLocalStorage } from 'hooks';
import { getCredentials } from 'services/auth';
import Actions from './Actions';
import TopInfo from './TopInfo';
import Transactions from './Transactions';

const Dashboard = () => {
  const [, setCredentials] = useLocalStorage('credentials', {});

  React.useEffect(() => {
    (async () => {
      const {
        accessToken,
        accessTokenExpirationTime,
        refreshToken,
        refreshTokenExpirationTime
      } = await getCredentials();
      setCredentials({
        accessToken,
        accessTokenExpirationTime,
        refreshToken,
        refreshTokenExpirationTime
      });
    })();
  }, []);

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm rounded border-0'>
            <div className='card-body p-1'>
              <div className='card rounded border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  <Actions />
                </div>
              </div>
              <Transactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
