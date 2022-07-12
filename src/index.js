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

/*
    TODO:
    1. Add passoword reset page
    2. Field for changing team status in administrator dashboard
    3. Unenroll from tournament in participant dashboard
    4. Responsiveness
*/
