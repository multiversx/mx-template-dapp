import React from 'react';
import styles from './../dashboard.module.scss';
import { Actions } from './Actions';
import { TopInfo } from './TopInfo';

export const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm border-0'>
            <div className='card-body p-1'>
              <div className='card border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <TopInfo />
                  <Actions />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.transactions}>{children}</div>
        </div>
      </div>
    </div>
  );
};
