import './styles/globals.css';

import { App } from './App';
import { initApp } from 'lib/sdkDappCore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EnvironmentsEnum } from './types';

Promise.all([
  initApp({
    storage: { getStorageCallback: () => sessionStorage },
    dAppConfig: {
      nativeAuth: true,
      environment: EnvironmentsEnum.devnet,
      network: {
        walletAddress: 'https://devnet-wallet.multiversx.com'
      }
    }
  })
]).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
