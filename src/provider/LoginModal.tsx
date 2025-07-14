import React from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Button } from 'components';

const modalStyles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px'
  },
  input: {
    padding: '8px',
    marginTop: '5px',
    backgroundColor: '#FFF',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '15px'
  },
  button: {
    backgroundColor: '#2563eb',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    ':hover': {
      backgroundColor: '#1d4ed8'
    }
  }
};

const containerStyles = {
  ...modalStyles,
  overlay: {
    position: 'relative' as const
  },
  modal: {
    padding: modalStyles.modal.padding,
    borderRadius: '8px',
    width: '100%',
    maxWidth: '100%'
  }
};

interface ModalProps {
  onSubmit: (values: { privateKey: string; address: string }) => void;
  onClose: () => void;
  needsAddress?: boolean;
  anchor?: HTMLElement;
}

const Modal = ({ onSubmit, onClose, needsAddress, anchor }: ModalProps) => {
  const styles = anchor ? containerStyles : modalStyles;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const privateKey = formData.get('privateKey')?.toString() || '';
    const address = formData.get('address')?.toString() || '';

    if ((needsAddress && !address) || !privateKey) {
      alert(`Please enter ${needsAddress ? 'address and' : ''} private key`);
      return;
    }

    onSubmit({ privateKey, address });
  };

  return createPortal(
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Authenticate</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {needsAddress && (
            <div>
              <label>
                Address
                <input
                  style={styles.input}
                  type='text'
                  name='address'
                  placeholder='Public key'
                  autoFocus
                  required
                />
              </label>
            </div>
          )}
          <div>
            <label>
              Private Key
              <input
                style={styles.input}
                type='text'
                name='privateKey'
                placeholder='Private key'
                autoFocus={!needsAddress}
                required
              />
            </label>
          </div>
          <div style={styles.buttonGroup}>
            <Button onClick={onClose} {...{ style: styles.button }}>
              Cancel
            </Button>
            <Button type='submit' {...{ style: styles.button }}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>,
    anchor || document.body
  );
};

export class LoginModal {
  private static instance: LoginModal;
  private _modalRoot: HTMLDivElement;

  private constructor() {
    this._modalRoot = document.createElement('div');
    document.body.appendChild(this._modalRoot);
  }

  public static getInstance(): LoginModal {
    if (!LoginModal.instance) {
      LoginModal.instance = new LoginModal();
    }
    return LoginModal.instance;
  }

  public showModal(options?: {
    needsAddress: boolean;
    anchor?: HTMLElement;
  }): Promise<{
    privateKey: string;
    address: string;
  }> {
    return new Promise((resolve) => {
      const root = createRoot(this._modalRoot);

      const handleSubmit = (values: {
        privateKey: string;
        address: string;
      }) => {
        root.unmount();
        resolve(values);
      };

      const handleClose = () => {
        root.unmount();
        resolve({ privateKey: '', address: '' });
      };

      root.render(
        <Modal
          onSubmit={handleSubmit}
          onClose={handleClose}
          needsAddress={options?.needsAddress}
          anchor={options?.anchor}
        />
      );
    });
  }
}
