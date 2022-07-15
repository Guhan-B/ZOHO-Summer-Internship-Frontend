import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import Router from './shared/Router';
import store from "./store";

import "./shared/styles/index.module.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router/>
    </Provider>
  </React.StrictMode>
);

/*
    TODO:
    1. Add passoword reset page
    2. Field for changing team status in administrator dashboard
    3. Unenroll from tournament in participant dashboard
    4. Responsiveness
*/
