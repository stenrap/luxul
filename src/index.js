import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

/* Required plugin for Material UI library elements */
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
