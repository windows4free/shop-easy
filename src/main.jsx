import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import App from './App.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PayPalScriptProvider options={{
        'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
        currency: 'USD',
      }}>
        <App />
      </PayPalScriptProvider>
    </BrowserRouter>
  </React.StrictMode>
)