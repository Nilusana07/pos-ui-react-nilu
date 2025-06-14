// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use createRoot for React 18+
import './index.css'; // This is where your Tailwind CSS directives are imported
import App from './App.js'; // Import your main App component

// Get the root DOM element where your React app will be mounted.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your React application into the root element.
// React.StrictMode helps in identifying potential problems in an application.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you're using Create React App, you might have reportWebVitals here.
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();

