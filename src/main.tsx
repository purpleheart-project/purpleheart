import 'antd/dist/antd.css';
import './locales/i18n'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import './pages/userWorker'

import App from './App';

// @ts-ignore
self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId: any, label: string) {
    if (label === 'json') {
      return '/json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return '/css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return '/html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return '/ts.worker.bundle.js';
    }
    return '/editor.worker.bundle.js';
  }
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <App></App>
  </BrowserRouter>,
);
