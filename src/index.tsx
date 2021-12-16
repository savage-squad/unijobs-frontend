import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { handlerRefreshTokenInterceptor } from './hooks/auth';

handlerRefreshTokenInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
