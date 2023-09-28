import { OutputContainer } from '../OutputContainer';

export const MissingNativeAuthError = () => (
  <OutputContainer>
    <div className='flex items-center gap-1'>
      <p>
        Information could
        <span className='ml-1 mr-1 inline-block px-2 py-1 text-sm font-semibold leading-none bg-red-500 text-white rounded'>
          NOT
        </span>
        be displayed because
        <span className='ml-1 mr-1 inline-block px-2 py-1 text-sm font-semibold leading-none bg-blue-500 text-white rounded'>
          nativeAuth
        </span>
        is not active
      </p>
    </div>
  </OutputContainer>
);
