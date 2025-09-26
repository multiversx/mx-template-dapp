// prettier-ignore
const styles = {
    disclaimerContainer: 'disclaimer-container prose-sm mx-auto my-auto  max-w-prose',
    disclaimerTitle: 'disclaimer-title mb-4 font-medium text-2xl text-primary',
    disclaimerContent: 'disclaimer-content flex flex-col gap-4 text-secondary'
} satisfies Record<string, string>;

export const Disclaimer = () => (
  <div className={styles.disclaimerContainer}>
    <h2 className={styles.disclaimerTitle}>Disclaimer</h2>

    <div className={styles.disclaimerContent}>
      <p>
        This template is provided "as is" and "as available", at your own risk,
        without warranty of any kind, either expressed or implied, including but
        not limited to warranties of title or implied warranties of
        merchantability or fitness for a particular purpose. No oral advice or
        written or electronically delivered information given by MultiversX or
        its affiliates, or any of its staff, providers, merchants, sponsors or
        licensors, or the like, shall create any warranty. Use this template is
        at your sole risk.
      </p>
      <p>
        In no event shall MultiversX be liable for any injury, expenses, lost
        profits, loss or damage, weather direct, indirect, incidental, or
        consequential, or any other pecuniary loss or expense arising out of
        your access, use or inability to use this template, even if we are
        expressly advised of the possibility of such damages.
      </p>
    </div>
  </div>
);
