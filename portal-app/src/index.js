import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";
import './index.css';
import './custom.scss';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { sessionStorage } from 'aws-amplify/utils';
import GlobalVar from './Data/GlobalVar';

cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

const cognitoAuthConfig = {
  authority: GlobalVar.AUTHORITY,
  client_id: GlobalVar.APP_CLIENT_ID,
  redirect_uri: GlobalVar.HOME_URL,
  response_type: "code",
  scope: "aws.cognito.signin.user.admin email openid phone",
};

const root = ReactDOM.createRoot(document.getElementById("root"));

// wrap the application with AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
        <App />
    </AuthProvider>
  </React.StrictMode>
);