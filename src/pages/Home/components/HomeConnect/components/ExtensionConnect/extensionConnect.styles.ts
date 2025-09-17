// prettier-ignore
export const styles = {
  extensionCardContainer: 'extension-card-container bg-secondary p-8 lg:p-10 lg:h-115 rounded-2xl lg:rounded-3xl flex flex-col lg:flex-row justify-between gap-10 w-full transition-all duration-200 ease-out',
  extensionCardContent: 'extension-card-content flex flex-col gap-10 max-w-120',
  extensionCardText: 'extension-card-text flex flex-col gap-4',
  extensionCardTitle: 'extension-card-title text-3xl text-primary font-medium tracking-[-0.96px] leading-[1] transition-all duration-200 ease-out',
  extensionCardDescription: 'extension-card-description text-secondary text-xl tracking-[-0.21px] leading-[1.5] transition-all duration-200 ease-out',
  extensionCardDownloadSection: 'extension-card-download-section flex items-center justify-between max-w-80',
  extensionCardLink: 'extension-card-link text-accent hover:opacity-75 text-sm sm:text-lg font-semibold transition-all duration-200 ease-out',
  extensionCardLinkTitle: 'extension-card-link-title p-2 xs:p-3',
  extensionCardLogos: 'extension-card-logos flex gap-2.5 items-center',
  extensionCardImage: 'relative max-w-100 w-full pb-10',
  extensionCardCircles: 'extension-card-circles absolute -right-22 -top-10 z-50', 
  extensionCardScreen: 'extension-card-image absolute top-10 right-4'
} satisfies Record<string, string>;
