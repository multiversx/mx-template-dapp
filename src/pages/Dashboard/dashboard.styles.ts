// prettier-ignore
export default {
  dashboardContainer: 'dashboard-container flex w-screen min-h-screen relative border-t border-b border-secondary transition-all duration-200',
  mobilePanelContainer: 'mobile-panel-container fixed bottom-0 left-0 right-0 z-50 max-h-full overflow-y-auto lg:static lg:max-h-none lg:overflow-visible',
  desktopPanelContainer: 'desktop-panel-container lg:flex',
  dashboardContent: 'dashboard-content flex flex-col gap-6 justify-center items-center flex-1 w-full overflow-auto border-l border-secondary p-4 lg:p-6 transition-all duration-200 ease-out',
  dashboardContentMobilePanelOpen: 'dashboard-content-mobile-panel-open opacity-20 lg:opacity-100 pointer-events-none',
  dashboardWidgets: 'dashboard-widgets flex flex-col gap-6  w-full max-w-320'
} satisfies Record<string, string>;
