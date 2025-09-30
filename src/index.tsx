import ReactDOM from 'react-dom/client';

import { initApp } from 'lib';

import { App } from './App';
import { config } from './initConfig';

initApp(config).then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
