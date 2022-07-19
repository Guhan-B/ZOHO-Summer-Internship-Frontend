import React from 'react';
import ReactDOM from 'react-dom/client';

import Router from './shared/Router';
import AuthenticationProvider from './providers/authentication';

import "./shared/styles/index.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthenticationProvider>
      <Router/>
    </AuthenticationProvider>
  </React.StrictMode>
);

/*
    TODO:
    1. Add passoword reset page
    2. Field for changing team status in administrator dashboard
    3. Unenroll from tournament in participant dashboard
    4. Responsiveness
*/
