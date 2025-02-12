import './styles/globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { initApp } from 'utils/sdkDappCore';
import { App } from './App';
import { config } from './initConfig';

initApp(config).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
