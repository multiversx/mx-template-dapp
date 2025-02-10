import './styles/globals.css';

import { App } from './App';
import { initApp } from 'lib/sdkDappCore';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { config } from './initConfig';

initApp(config).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
