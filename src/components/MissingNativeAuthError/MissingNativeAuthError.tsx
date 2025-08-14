import { OutputContainer } from '../OutputContainer';

// prettier-ignore
const styles = {
  errorContainer: 'error-container flex items-center gap-1',
  emphasizedText: 'emphasized-text ml-1 mr-1 inline-block px-2 py-1 text-sm font-semibold leading-none bg-red-500 text-white rounded',
  nativeAuthText: 'native-auth-text ml-1 mr-1 inline-block px-2 py-1 text-sm font-semibold leading-none bg-primary text-primary rounded'
} satisfies Record<string, string>;

export const MissingNativeAuthError = () => (
  <OutputContainer>
    <div className={styles.errorContainer}>
      <p>
        Information could
        <span className={styles.emphasizedText}>NOT</span>
        be displayed because
        <span className={styles.nativeAuthText}>nativeAuth</span>
        is not active
      </p>
    </div>
  </OutputContainer>
);
