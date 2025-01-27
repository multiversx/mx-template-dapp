import React, { useState, useCallback, useRef } from 'react';
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
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
    marginTop: '15px'
  }
};

export class LoginModal {
  private static instance: LoginModal;
  private modalContainer: HTMLDivElement;
  private root: ReturnType<typeof createRoot>;

  private constructor() {
    this.modalContainer = document.createElement('div');
    document.body.appendChild(this.modalContainer);
    this.root = createRoot(this.modalContainer);
  }

  public static getInstance(): LoginModal {
    if (!LoginModal.instance) {
      LoginModal.instance = new LoginModal();
    }
    return LoginModal.instance;
  }

  public showModal(options?: { needsAddress: boolean }): Promise<{
    privateKey: string;
    address: string;
  }> {
    return new Promise((resolve) => {
      const ModalComponent = () => {
        const privateKeyRef = useRef<HTMLInputElement>(null);
        const addressRef = useRef<HTMLInputElement>(null);
        const [isOpen, setIsOpen] = useState(true);

        const handleSubmit = useCallback((e: React.FormEvent) => {
          e.preventDefault();
          const privateKey = privateKeyRef.current?.value || '';
          const address = addressRef.current?.value || '';

          if ((options?.needsAddress && !address) || !privateKey) {
            alert(
              `Please enter ${
                options?.needsAddress ? 'address and' : ''
              } private key`
            );
            return;
          }

          setIsOpen(false);
          resolve({ privateKey, address });
        }, []);

        const handleClose = useCallback(() => {
          setIsOpen(false);
          resolve({ privateKey: '', address: '' });
        }, []);

        if (!isOpen) {
          return null;
        }

        return createPortal(
          <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
              <h2>Authenticate</h2>
              <form onSubmit={handleSubmit} style={modalStyles.form}>
                {options?.needsAddress && (
                  <div>
                    <label>
                      Address
                      <input
                        style={modalStyles.input}
                        type='text'
                        ref={addressRef}
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
                      style={modalStyles.input}
                      type='text'
                      ref={privateKeyRef}
                      autoFocus={!options?.needsAddress}
                      required
                    />
                  </label>
                </div>
                <div style={modalStyles.buttonGroup}>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type='submit'>Submit</Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        );
      };

      this.root.render(<ModalComponent />);
    });
  }
}
