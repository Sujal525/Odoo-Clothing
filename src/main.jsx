import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = 'dev-5wgaqrcdm6n6wbio.us.auth0.com';
const clientId = 'T41l2aHyVUQwIlhPOCmDsDpSe6CYrlEX';

const onRedirectCallback = (appState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
