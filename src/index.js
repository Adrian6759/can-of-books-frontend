import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider

      domain='dev-efjjpw0v61fwnjlj.us.auth0.com'
      clientId='ywktnpke6zSIu0ejIMQTYRcWjj5WcN8p'
      redirectUri='http://localhost:3000'>

    <App />

    </Auth0Provider>
  </React.StrictMode>
);
