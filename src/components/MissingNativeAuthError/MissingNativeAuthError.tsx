import { OutputContainer } from '../OutputContainer';

// prettier-ignore
const styles = {
  errorContainer: 'error-container flex items-center gap-1',
  emphasizedText: 'emphasized-text text-red-500 font-bold',
  nativeAuthText: 'native-auth-text font-bold italic leading-none text-primary transition-all duration-200 ease-out'
} satisfies Record<string, string>;

export const MissingNativeAuthError = () => (
  <OutputContainer>
    <div className={styles.errorContainer}>
      <p>
        Information could
        <span className={styles.emphasizedText}> NOT </span>
        be displayed because
        <span className={styles.nativeAuthText}> nativeAuth </span>
        is not active
      </p>
    </div>
  </OutputContainer>
);
