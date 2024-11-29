import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// สร้าง root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// ใช้ createRoot แทน ReactDOM.render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
