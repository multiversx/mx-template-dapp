// prettier-ignore
export const styles = {
  heroContainer: 'hero-container shadow-xl shadow-secondary/15 flex flex-col items-center justify-between w-full lg:h-160 rounded-3xl bg-cover bg-no-repeat bg-center p-8 lg:p-20 border border-secondary backdrop-blur-md transition-all duration-200 ease-out',
  heroSectionTop: 'hero-section-top flex flex-col items-start lg:items-center justify-center gap-10',
  heroSectionTopContent: 'hero-section-top-content flex flex-col lg:items-center justify-center gap-6',
  heroTitle: 'hero-title !text-primary text-[42px] lg:text-[84px] font-medium leading-[1] tracking-[-2.52px] transition-all duration-200 ease-out',
  heroDescription: 'hero-description text-secondary text-xl lg:text-2xl lg:text-center leading-[1.5] tracking-[-0.24px] max-w-138 transition-all duration-200 ease-out',
  heroSectionTopButtons: 'hero-section-top-buttons flex flex-col lg:flex-row items-start lg:items-center justify-start gap-6',
  heroSectionTopDocButton: 'hero-section-top-doc-button flex items-center px-3 text-btn-secondary bg-btn-secondary hover:bg-btn-primary hover:text-btn-primary font-bold rounded-xl h-8 lg:h-10 transition-all duration-200 ease-out',
  heroSectionTopDocButtonText: 'hero-section-top-doc-button-text px-4',
  heroSectionTopDocButtonIcon: 'hero-section-top-doc-button-icon px-3',
  heroSectionBottom: 'hero-section-bottom hidden lg:!flex gap-6',
  heroSectionBottomThemeOptions: 'hero-section-bottom-theme-options text-btn opacity-60 hover:opacity-100 flex flex-col items-center gap-2 w-20 relative cursor-pointer transition-all duration-200 ease-out',
  heroSectionBottomThemeOptionsOpacityFull: 'opacity-100',
  heroSectionBottomThemeOption: 'hero-section-bottom-theme-option flex flex-col items-center gap-1 relative',
  themeOptionIcon: 'theme-option-icon fill-primary transition-all duration-200 ease-out',
  themeOptionTitle: 'theme-option-title text-primary transition-all duration-200 ease-out',
  themeOptionActiveDot: 'theme-option-active-dot w-2 h-2 rounded-full bg-tertiary transition-all duration-200 ease-out',
  themeOptionActiveLabel: 'theme-option-active-label flex items-center justify-center px-1 absolute -top-1.5 left-10 z-10 text-xs text-accent uppercase bg-accent border border-accent rounded-md transition-all duration-200 ease-out'
} satisfies Record<string, string>;
