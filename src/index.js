import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
// import store from "./store/store"
import { Provider } from 'react-redux';
import {  configureStore } from '@reduxjs/toolkit';
import Categoryslices from './store/slices/Categoryslices';
import { Auth0Provider } from '@auth0/auth0-react';

const store=configureStore({
    reducer:{
        category:Categoryslices
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain="YOUR_AUTH0_DOMAIN"
    clientId="YOUR_AUTH0_CLIENT_ID"
    authorizationParams={{
      redirect_uri: window.location.origin}}
  >

  
  
    <Provider store={store}>
    <React.StrictMode>
    <BrowserRouter>
      
    <App />
    
    </BrowserRouter>
    </React.StrictMode>
    </Provider>
    </Auth0Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
