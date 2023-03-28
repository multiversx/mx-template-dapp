import React from 'react';

import { Loader } from 'components';
import {
  useGetLastSignedMessageSession,
  useGetSignMessageInfoStatus,
  useSignMessage
} from 'hooks';
import { SignedMessageStatusesEnum } from 'types';
import { SignFailure, SignMessageWrapper, SignSuccess } from './components';

export const SignMessage = () => {
  const { signMessage } = useSignMessage();
  const { isPending } = useGetSignMessageInfoStatus();
  const signedMessageInfo = useGetLastSignedMessageSession();
  const [message, setMessage] = React.useState('');

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    signMessage({
      message,
      callbackRoute: window.location.href
    });
  };

  if (isPending) {
    return <Loader />;
  }

  if (!signedMessageInfo) {
    return (
      <SignMessageWrapper>
        <div className='sign-message'>
          <h1 className='card-title'>Sign Message</h1>
          <div className='card-body p-1 d-flex flex-column'>
            <textarea
              className='form-control my-3'
              onChange={(event) => setMessage(event.currentTarget.value)}
            />
            <button className='btn btn-primary' onClick={handleSubmit}>
              Sign
            </button>
          </div>
        </div>
      </SignMessageWrapper>
    );
  }

  const isError = [
    SignedMessageStatusesEnum.cancelled,
    SignedMessageStatusesEnum.failed
  ].includes(signedMessageInfo.status);

  const isSuccess =
    signedMessageInfo.status === SignedMessageStatusesEnum.signed;

  if (isError) {
    return (
      <SignMessageWrapper>
        <SignFailure />;
      </SignMessageWrapper>
    );
  }

  if (isSuccess) {
    return (
      <SignMessageWrapper>
        <SignSuccess />;
      </SignMessageWrapper>
    );
  }

  return null;
};
