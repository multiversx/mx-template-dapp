import React, { PropsWithChildren } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { routeNames } from 'routes';

export const StatisticsLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-12 col-md-10 mx-auto'>
          <div className='card shadow-sm border-0'>
            <div className='card-body p-1'>
              <div className='card border-0 bg-primary'>
                <div className='card-body text-center p-4'>
                  <div className='row'>
                    <div className='col-12 text-left'>
                      <Link to={routeNames.dashboard} className='text-white'>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back to Dashboard
                      </Link>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 mt-4'>
                      <h3 className='text-white'>Statistics</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
