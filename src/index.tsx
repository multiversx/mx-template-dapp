import { defineCustomElements } from '@multiversx/sdk-dapp-ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { initApp } from 'lib';
import { App } from './App';
import { config } from './initConfig';

defineCustomElements();

initApp(config).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
