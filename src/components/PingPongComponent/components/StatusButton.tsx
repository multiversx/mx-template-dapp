import { faCheck, faSync, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastManager } from '@multiversx/sdk-dapp/out/managers/internal';
import { createRoot } from 'react-dom/client';

import { MvxButton } from 'lib/sdkDappUI/sdkDappUI.components';

import { useDidUserPing } from './useDidUserPing';

export const StatusButton = () => {
  const didUserPing = useDidUserPing();

  const onCheckStatus = async () => {
    const hasPing = await didUserPing();

    ToastManager.getInstance().createCustomToast({
      toastId: 'status-toast',
      hasCloseButton: false,
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
  const removeToast = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    ToastManager.getInstance().closeToast('status-toast');
  };

  return (
    <div className='flex items-start gap-3 text-white max-w-[520px]'>
      <FontAwesomeIcon icon={hasPing ? faCheck : faTimes} className='mt-1' />

      <div className='flex-1 basis-0 min-w-0 w-[420px] max-w-[420px] overflow-hidden'>
        <h4 className='font-bold leading-tight'>
          {hasPing ? 'User has pinged' : 'User has not pinged'}
        </h4>

        <a
          onClick={removeToast}
          className='text-white underline underline-offset-4 transition-opacity hover:opacity-80 cursor-pointer'
        >
          Close
        </a>
      </div>
    </div>
  );
};
