import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthProvider } from '../Auth/context/AuthProvider'
import { AppRouter } from '../Router/AppRouter';
import {BrowserRouter} from 'react-router-dom';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
)
