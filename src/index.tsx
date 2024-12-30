/* @refresh reload */
import './styles/globals.css';

import { App } from './App';
import { initApp } from 'lib/sdkDappCore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { EnvironmentsEnum } from './types';
import { defineCustomElements } from './lib/sdkDappCoreUi';

// TODO: Doesn't work
// Error: Constructor for "pending-transactions-modal#undefined" was not found
// Error: Constructor for "transaction-toast-list#undefined" was not found

Promise.all([
  defineCustomElements(window),
  initApp({
    storage: { getStorageCallback: () => sessionStorage },
    dAppConfig: {
      nativeAuth: true,
      environment: EnvironmentsEnum.devnet,
      network: {
        // walletAddress: "https://localhost:3002",
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
