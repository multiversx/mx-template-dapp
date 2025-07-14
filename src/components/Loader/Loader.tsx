import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Loader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <FontAwesomeIcon
        icon={faSpinner}
        spin
        className='text-4xl text-blue-500'
      />
    </div>
  );
};
