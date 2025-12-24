import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';

// Render React app
const rootElement = document.getElementById('app-root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
