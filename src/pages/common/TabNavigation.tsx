import React from 'react';
import { NavLink } from 'react-router-dom';

const TabNavigation = () => {
  return (
    <div className='container-xl'>
      <div className='tab'>
        <div className='tab__menu'>
          <ul>
            <NavLink
              to='/nfts'
              className={(navData) =>
                navData.isActive ? 'active-style' : 'none'
              }
            >
              <li>
                NFTs <span>175,455</span>
              </li>
            </NavLink>
            <NavLink
              to='/collections'
              className={(navData) =>
                navData.isActive ? 'active-style' : 'none'
              }
            >
              <li>
                Collections <span>175,455</span>
              </li>
            </NavLink>
            <NavLink
              to='/profiles'
              className={(navData) =>
                navData.isActive ? 'active-style' : 'none'
              }
            >
              <li>
                Profiles <span>175,455</span>
              </li>
            </NavLink>
          </ul>
        </div>
        <div className='tab__filter'>
          <p>Sort by</p>
          <select className='form-control' id='exampleFormControlSelect1'>
            <option>Total Volume</option>
            <option>Total Volume</option>
            <option>Total Volume</option>
            <option>Total Volume</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;
