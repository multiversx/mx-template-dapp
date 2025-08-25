import classNames from 'classnames';
import { MouseEvent, PropsWithChildren, ReactNode } from 'react';
import { Sheet } from 'react-modal-sheet';

import { WithClassnameType } from 'types';

// prettier-ignore
const styles = {
  drawer: 'drawer flex',
  drawerContainer: 'drawer-container rounded-t-3xl! bg-primary! p-6 overflow-hidden border border-secondary',
  drawerContent: 'drawer-content flex-col flex',
  drawerContentHeader: 'drawer-content-header py-2 mb-8 flex justify-between items-center',
  drawerContentHeaderTitle: 'drawer-content-header-title text-2xl text-primary leading-none',
  drawerContentHeaderClose: 'drawer-content-header-close opacity-50 cursor-pointer w-6 h-6 relative before:absolute before:top-1/2 before:left-1/2 before:w-full before:h-0.5 before:bg-tertiary before:transform before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45 after:absolute after:top-1/2 after:left-1/2 after:w-full after:h-0.5 after:bg-tertiary after:transform after:-translate-x-1/2 after:-translate-y-1/2 after:-rotate-45'
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
    <Sheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      detent='content-height'
      className={classNames(styles.drawer, className)}
    >
      <Sheet.Container className={styles.drawerContainer}>
        <Sheet.Content>
          <div className={styles.drawerContent}>
            <div className={styles.drawerContentHeader}>
              <div className={styles.drawerContentHeaderTitle}>{title}</div>

              <div
                onClick={handleDismiss}
                className={styles.drawerContentHeaderClose}
              />
            </div>

            <div>{children}</div>
          </div>
        </Sheet.Content>
      </Sheet.Container>
    </Sheet>
  );
};
