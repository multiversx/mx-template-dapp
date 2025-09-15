import { OutputContainer } from '../OutputContainer';

// prettier-ignore
const styles = {
  missingNativeAuthError: 'missing-native-auth-error flex items-center gap-1',
  missingNativeAuthErrorText: 'missing-native-auth-error-text',
  missingNativeAuthErrorDanger: 'missing-native-auth-error-danger text-red-500 font-bold',
  missingNativeAuthErrorItalic: 'missing-native-auth-error-italic font-bold italic leading-none text-primary transition-all duration-200 ease-out'
} satisfies Record<string, string>;

export const MissingNativeAuthError = () => (
  <OutputContainer>
    <p className={styles.missingNativeAuthError}>
      <span className={styles.missingNativeAuthErrorText}>
        Information could
      </span>

      <span className={styles.missingNativeAuthErrorDanger}>NOT</span>
      <span className={styles.missingNativeAuthErrorText}>
        be displayed because
      </span>

      <span className={styles.missingNativeAuthErrorItalic}>nativeAuth</span>
      <span className={styles.missingNativeAuthErrorText}>is not active</span>
    </p>
  </OutputContainer>
);
