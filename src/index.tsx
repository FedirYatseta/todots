import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './client/private/PrivateRoute';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log('render')
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);
