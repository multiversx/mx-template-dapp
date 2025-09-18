import classNames from 'classnames';
import { Fragment, MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { Sheet } from 'react-modal-sheet';

import { WithClassnameType } from 'types';

import styles from './drawer.styles';

interface DrawerPropsType extends PropsWithChildren, WithClassnameType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: ReactNode;
}

export const Drawer = ({
  isOpen,
  setIsOpen,
  children,
  title,
  className
}: DrawerPropsType) => {
  const handleDismiss = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  return (
    <Fragment>
      <div
        onClick={handleDismiss}
        className={classNames(styles.drawerBackdrop, {
          [styles.drawerBackdropVisible]: isOpen
        })}
      />

      <Sheet
        isOpen={isOpen}
        detent='content-height'
        onClose={() => setIsOpen(false)}
        className={classNames(styles.drawer, className)}
        dragVelocityThreshold={200}
        dragCloseThreshold={0.3}
      >
        <Sheet.Container className={styles.drawerContainer}>
          <Sheet.Content>
            <div className={styles.drawerContentWrapper}>
              <div className={styles.drawerContentHeader}>
                <div className={styles.drawerContentHeaderTitle}>{title}</div>

                <div
                  onClick={handleDismiss}
                  className={styles.drawerContentHeaderClose}
                />
              </div>

              <div className={styles.drawerContent}>{children}</div>
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </Fragment>
  );
};
