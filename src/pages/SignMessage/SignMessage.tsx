import React from 'react';
import {
  useSignMessage,
  useGetSignMessageInfoStatus,
  useGetLastSignedMessageSession
} from '@multiversx/sdk-dapp/hooks/signMessage';
import { SignedMessageStatusesEnum } from '@multiversx/sdk-dapp/types';
import { Loader } from '@multiversx/sdk-dapp/UI';
import { SignFailure, SignSuccess } from './components';

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
      <div className='d-flex flex-fill align-items-center container'>
        <div className='container py-4'>
          <div className='row'>
            <div className='col-12 col-md-10 mx-auto'>
              <div className='card shadow-sm border-0'>
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isError = [
    SignedMessageStatusesEnum.cancelled,
    SignedMessageStatusesEnum.failed
  ].includes(signedMessageInfo.status);

  const isSuccess =
    signedMessageInfo.status === SignedMessageStatusesEnum.signed;

  if (isError) {
    return <SignFailure />;
  }

  if (isSuccess) {
    return <SignSuccess />;
  }

  return null;
};
