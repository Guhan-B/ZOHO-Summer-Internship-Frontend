import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import Router from './shared/Router';
import AuthenticationProvider from './providers/authentication';
import ErrorProvider from './providers/error';

import "./shared/styles/index.scss"

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ErrorProvider>
    <AuthenticationProvider>
      <Router/>
    </AuthenticationProvider>
  </ErrorProvider>
);