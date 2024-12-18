import './styles/globals.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { defineCustomElements } from '@multiversx/sdk-dapp-core-ui/loader';

defineCustomElements(window);

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render((<App />) as any);
