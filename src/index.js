import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';

// Import Provider and your store
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* Wrap your App with the Provider and pass the Redux store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
