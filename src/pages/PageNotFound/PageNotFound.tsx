import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation } from 'react-router-dom';

// prettier-ignore
const styles = {
  pageNotFoundContainer: 'page-not-found-container flex flex-col w-full  max-w-prose h-[calc(100vh-200px)] justify-center items-center',
  pageNotFound: 'page-not-found flex flex-col p-6 items-center justify-center gap-2 rounded-xl bg-primary w-full transition-all duration-200 ease-out',
  pageNotFoundSearchIcon: 'page-not-found-search-icon fa-3x mb-2 text-secondary transition-all duration-200 ease-out',
  pageNotFoundContent: 'page-not-found-content flex flex-col items-center',
  pageNotFoundTitle: 'page-not-found-title mt-3 text-xl text-primary transition-all duration-200 ease-out',
  pageNotFoundPath: 'page-not-found-path page-not-found-path text-lg text-secondary transition-all duration-200 ease-out'
} satisfies Record<string, string>;

export const PageNotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className={styles.pageNotFoundContainer}>
      <div className={styles.pageNotFound}>
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.pageNotFoundSearchIcon}
        />

        <div className={styles.pageNotFoundContent}>
          <h4 className={styles.pageNotFoundTitle}>Page not found</h4>

          <span className={styles.pageNotFoundPath}>{pathname}</span>
        </div>
      </div>
    </div>
  );
};
