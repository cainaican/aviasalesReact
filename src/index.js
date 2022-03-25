import './index.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App.jsx'
import { store } from './store/store';
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);