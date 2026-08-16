import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter} from 'react-router-dom';
import StoreContextProvider from './context/StoreContext.jsx';

// Create root and render App
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
    <StoreContextProvider>
      <App />
      </StoreContextProvider>
    </BrowserRouter>
  
)
