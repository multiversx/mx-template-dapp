import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const id = 'mxcwp_confirmation-dialog';
const mountedEvent = `${id}-mounted`;
const confirmEvent = `${id}-confirm`;
const getConfirmButton = () =>
  window.document.getElementById(`${id}-confirm-btn`);

export const CrossWindowConfirm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(5);

  useEffect(() => {
    function handleCustomEvent() {
      const element = getConfirmButton();
      if (element) {
        element.innerHTML = '';
      }
      setIsMounted(true);
    }

    window.addEventListener(mountedEvent, handleCustomEvent);

    return () => {
      window.removeEventListener(mountedEvent, handleCustomEvent);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || count < 0) {
      return;
    }

    if (count <= 0) {
      const event = new CustomEvent(confirmEvent, {
        bubbles: true,
        composed: true
      });
      const element = window.document.getElementById(id) ?? document.body;
      element.dispatchEvent(event);
    }

    const timeoutId = setInterval(
      () => setCount((current) => current - 1),
      1000
    );

    return () => clearTimeout(timeoutId);
  }, [count, isMounted]);

  const element = getConfirmButton();

  if (!isMounted || !element) {
    return null;
  }

  const Component: any = <span>Confirming in {count}</span>;

  return <>{createPortal(Component, element ?? document.body)}</>;
};
