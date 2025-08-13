import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// prettier-ignore
const styles = {
  loaderContainer: 'loader-container flex justify-center items-center h-screen',
  loaderIcon: 'loader-icon text-4xl text-primary'
} satisfies Record<string, string>;

export const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <FontAwesomeIcon icon={faSpinner} spin className={styles.loaderIcon} />
    </div>
  );
};
