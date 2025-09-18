// prettier-ignore
export const styles = {
  header: 'header flex items-center justify-between px-4 h-16 md:h-20 md:px-10',
  headerLogo: 'header-logo transition-opacity duration-200',
  headerNavigation: 'header-navigation flex items-center gap-2 lg:gap-4',
  headerNavigationButtons: 'header-navigation-buttons flex gap-2 lg:gap-4',
  headerNavigationButton: 'header-navigation-button flex justify-center items-center w-8 lg:w-10 h-8 lg:h-10 rounded-xl cursor-pointer relative after:rounded-xl after:absolute after:bg-btn-variant hover:after:bg-btn-hover  after:transition-all after:duration-200 after:ease-out after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none hover:after:opacity-100',
  headerNavigationButtonIcon: 'header-navigation-button-icon flex justify-center relative text-xs lg:text-base z-1 items-center text-tertiary',
  headerNavigationTooltip: 'header-navigation-tooltip p-1 leading-none whitespace-nowrap text-tertiary',
  headerNavigationNetwork: 'header-navigation-network h-8 border border-secondary rounded-xl lg:h-10 relative w-22 flex items-center justify-center leading-none capitalize text-tertiary before:absolute before:rounded-full before:w-2 before:lg:w-2.5 before:h-2 before:lg:h-2.5 before:bg-btn-primary before:z-2 before:-top-0.25 before:lg:-top-0.5 before:-left-0.25 before:lg:-left-0.5 after:absolute after:bg-primary after:rounded-lg after:opacity-40 after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none',
  headerNavigationNetworkLabel: 'header-navigation-network-label relative z-1',
  headerNavigationConnectDesktop: 'header-navigation-connect-desktop h-8 lg:h-10 hidden sm:block!',
  headerNavigationConnectMobile: 'header-navigation-connect-mobile w-8 h-8 bg-btn-tertiary cursor-pointer flex justify-center items-center sm:hidden text-xs rounded-xl',
  headerNavigationConnectIcon: 'header-navigation-connect-icon text-accent',
  headerNavigationAddress: 'header-navigation-address h-8 lg:h-10 w-8 lg:w-full text-primary justify-center text-xs rounded-xl lg:text-base lg:pr-4 lg:pl-5 max-w-100 flex relative lg:border lg:border-secondary lg:rounded-full items-center gap-3 after:absolute after:bg-btn-tertiary after:rounded-xl lg:after:rounded-full after:opacity-40 after:left-0 after:right-0 after:top-0 after:bottom-0 after:pointer-events-none',
  headerNavigationAddressWallet: 'header-navigation-address-wallet relative z-1 text-accent hidden lg:flex!',
  headerNavigationAddressExplorer: 'header-navigation-address-explorer min-w-0 relative z-1 hidden lg:block!',
  headerNavigationAddressLogout: 'header-navigation-address-logout text-tertiary cursor-pointer relative z-1 transition-all duration-200 ease-out hover:text-accent',
} satisfies Record<string, string>;
