import { faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MvxButton } from '@multiversx/sdk-dapp-ui/react';
import { ToastManager } from '@multiversx/sdk-dapp/out/managers/internal';
import { createRoot } from 'react-dom/client';

import { useDidUserPing } from './useDidUserPing';

export const StatusButton = () => {
  const didUserPing = useDidUserPing();

  const onCheckStatus = async () => {
    const hasPing = await didUserPing();

    ToastManager.getInstance().createCustomToast({
      toastId: 'status-toast',
      instantiateToastElement: () => {
        const toastBody = document.createElement('div');
        const root = createRoot(toastBody);
        root.render(<ToastContent hasPing={hasPing} />);
        return toastBody;
      }
    });
  };

  return (
    <div className='flex-none rounded-xl border border-white/40 p-[1px]'>
      <MvxButton
        data-testid='btnPing'
        onClick={onCheckStatus}
        size='small'
        variant='secondary'
      >
        <FontAwesomeIcon
          icon={faSync}
          className='button-content text-sm font-normal'
        />
        Ping Status
      </MvxButton>
    </div>
  );
};

const ToastContent = ({ hasPing }: { hasPing: boolean }) => {
  if (hasPing) {
    return (
      <p className='text-white'>
        ✅ Pinged <CloseToastButton />
      </p>
    );
  }

  return (
    <p>
      ❌ Not pinged <CloseToastButton />
    </p>
  );
};

const CloseToastButton = () => {
  const removeToast = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    ToastManager.getInstance().closeToast('status-toast');
  };
  return (
    <a
      onClick={removeToast}
      className='text-white underline underline-offset-4 transition-opacity hover:opacity-80 cursor-pointer'
    >
      OK
    </a>
  );
};
