import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ToastManager } from 'lib';

// prettier-ignore
const styles = {
  toastContainer: 'toast-container flex items-start gap-3 text-primary max-w-130',
  toastIcon: 'toast-icon mt-1 text-success',
  toastContent: 'toast-content flex-1 basis-0 min-w-0 w-105 max-w-105 overflow-hidden',
  toastMessage: 'toast-message font-bold leading-tight',
  toastClose: 'toast-close text-primary text-sm underline underline-offset-4 transition-opacity ease-in-out duration-200 hover:opacity-80 cursor-pointer'
} satisfies Record<string, string>;

export const ToastContent = () => {
  const removeToast = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    ToastManager.getInstance().closeToast('swap-lock-toast');
  };

  return (
    <div className={styles.toastContainer}>
      <FontAwesomeIcon icon={faCheck} className={styles.toastIcon} />

      <div className={styles.toastContent}>
        <h4 className={styles.toastMessage}>Transactions successfully sent!</h4>

        <a onClick={removeToast} className={styles.toastClose}>
          Close
        </a>
      </div>
    </div>
  );
};
