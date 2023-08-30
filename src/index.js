import React from 'react';
import ReactDOM from 'react-dom/client';

// css style sheets
import './normalize.css';
import './index.css';

// App component
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);