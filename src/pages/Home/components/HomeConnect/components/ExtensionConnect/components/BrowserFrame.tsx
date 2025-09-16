import { ReactComponent as X } from 'assets/img/x.svg';

// prettier-ignore
const styles = {
browserFrameContainer: 'browser-frame-container w-full flex flex-col',
browserFrameTopBar: 'browser-frame-top-bar w-full h-[32px] bg-primary rounded-t-2xl pl-4 py-1 pr-2.5 flex items-center justify-between transition-all duration-200 ease-out',
browserFrameTopBarLeft: 'browser-frame-top-bar-left flex gap-2',
browserFrameTopBarLeftDot: 'browser-frame-top-bar-left-dot w-2 h-2 rounded-full bg-icon transition-all duration-200 ease-out',
browserFrameTopBarRight: 'browser-frame-top-bar-right flex gap-2 items-center',
browserFrameTopBarRightDots: 'browser-frame-top-bar-right-dots flex flex-col gap-0.5',
browserFrameTopBarRightDot: 'browser-frame-top-bar-right-dot w-0.75 h-0.75 rounded-full bg-icon transition-all duration-200 ease-out',
browserFrameScreenBg: 'browser-frame-screen-bg w-full h-[330px] bg-primary rounded-b-2xl px-2 pb-2 transition-all duration-200 ease-out',
browserFrameScreen: 'browser-frame-screen bg-secondary w-full h-full rounded-2xl transition-all duration-200 ease-out'
} satisfies Record<string, string>;

export const BrowserFrame = () => (
  <div className={styles.browserFrameContainer}>
    <div className={styles.browserFrameTopBar}>
      <div className={styles.browserFrameTopBarLeft}>
        {[...Array(3)].map((_, index) => (
          <span key={index} className={styles.browserFrameTopBarLeftDot} />
        ))}
      </div>

      <div className={styles.browserFrameTopBarRight}>
        <X />

        <div className={styles.browserFrameTopBarRightDots}>
          {[...Array(3)].map((_, index) => (
            <span key={index} className={styles.browserFrameTopBarRightDot} />
          ))}
        </div>
      </div>
    </div>

    <div className={styles.browserFrameScreenBg}>
      <div className={styles.browserFrameScreen} />
    </div>
  </div>
);
