// prettier-ignore
export const styles = {
  sideMenuContainer: 'side-menu-container flex flex-col gap-4',
  sideMenuHeader: 'side-menu-header flex items-center justify-between',
  sideMenuHeaderTitle: 'side-menu-header-title text-base transition-all duration-200 ease-out text-secondary',
  sideMenuHeaderIcon: 'side-menu-header-icon text-primary transition-transform duration-200 ease-out',
  sideMenuHeaderIconRotated: 'rotate-180',
  sideMenuItems: 'side-menu-items flex flex-col transition-all duration-200 ease-out',
  sideMenuItemsHidden: 'hidden',
  sideMenuItem: 'side-menu-item flex items-center gap-2 p-2 cursor-pointer text-tertiary hover:text-primary hover:bg-primary hover:font-bold transition-all duration-200 ease-out fill-tertiary hover:fill-primary hover:rounded-lg',
  sideMenuItemActive: 'side-menu-item-active text-primary bg-primary fill-primary rounded-lg font-bold transition-all duration-200 ease-out',
  sideMenuItemTitle: 'side-menu-item-title transition-all duration-200 ease-out text-sm'
} satisfies Record<string, string>;
