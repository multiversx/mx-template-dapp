import classNames from 'classnames';
import { Fragment, MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { Sheet } from 'react-modal-sheet';

import { WithClassnameType } from 'types';

// prettier-ignore
const styles = {
  drawer: 'drawer flex',
  drawerBackdrop: 'drawer-backdrop bg-primary! transition-opacity duration-200 fixed inset-0 opacity-0 pointer-events-none z-40 ease-in-out md:hidden',
  drawerBackdropVisible: 'opacity-90 pointer-events-auto!',
  drawerContainer: 'drawer-container rounded-t-3xl! bg-primary! p-6 overflow-hidden border border-secondary before:absolute before:top-3 before:left-1/2 before:w-32 before:h-1 before:bg-secondary before:transform before:-translate-x-1/2',
  drawerContentWrapper: 'drawer-content-wrapper flex-col flex',
  drawerContentHeader: 'drawer-content-header py-2 mb-8 flex justify-between items-center',
  drawerContentHeaderTitle: 'drawer-content-header-title font-medium text-2xl text-primary leading-none',
  drawerContentHeaderClose: 'drawer-content-header-close opacity-50 cursor-pointer w-5 h-5 relative before:absolute before:top-1/2 before:left-1/2 before:w-full before:h-0.5 before:bg-tertiary before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 after:absolute after:top-1/2 after:left-1/2 after:w-full after:h-0.5 after:bg-tertiary after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45',
  drawerContent: 'drawer-content'
} satisfies Record<string, string>;

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
