// prettier-ignore
const styles = {
  signFailureContainer: 'sign-failure-container flex flex-col',
  signFailureErrorMessage: 'sign-failure-error-message flex gap-1'
} satisfies Record<string, string>;

interface SignFailurePropsType {
  errorMessage?: string;
}

export const SignFailure = ({ errorMessage }: SignFailurePropsType) => (
  <div className={styles.signFailureContainer}>
    <p>Message could not be signed</p>

    <p className={styles.signFailureErrorMessage}>
      Reason: <span>{errorMessage ?? '-'}</span>
    </p>
  </div>
);
