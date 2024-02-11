import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import './CSS/App.css'
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
            <App />
      </BrowserRouter>
);
