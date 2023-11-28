import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/index.js'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google'
import 'react-toastify/dist/ReactToastify.css'

const clientId = "983403015607-ob8852cqt2m61jh8puq07p56bqc06tdf.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
      <ToastContainer />
      <App />
    </GoogleOAuthProvider>
    </Provider>
    
  </React.StrictMode>
)
