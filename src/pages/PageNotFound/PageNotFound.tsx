import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

export const PageNotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className='flex flex-col h-[calc(100vh-200px)] justify-center items-center'>
      <FontAwesomeIcon icon={faSearch} className='fa-3x mb-2' />

      <h4 className='mt-3 text-xl'>Page not found</h4>
      <span className='empty-details text-lg'>{pathname}</span>
    </div>
  );
};
