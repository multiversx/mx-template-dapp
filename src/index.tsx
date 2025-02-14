import { createRoot } from 'react-dom/client';
import './styles/globals.css';
import { App } from './App';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);
root.render((<App />) as any);
