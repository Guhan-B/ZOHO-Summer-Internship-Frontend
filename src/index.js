import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './shared/Router';

import "./shared/styles/index.module.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router/>
  </React.StrictMode>
);
