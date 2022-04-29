# Connect Go React SDK

## How to use

### Wrap application in an `AuthProvider`

```js
import AuthProvider from 'connect-go-oidc-react'

const authProviderConfig = {
  issuer: 'FILL_IN', // eg. https://example.com
  client_id: 'FILL_IN',
  redirect_uri: 'FILL_IN', // eg. https://localhost:3000/callback
  post_logout_redirect_uri: 'FILL_IN', // eg. https://localhost:3000
  autoSilentRenew: true,
  checkSession: false,
  requestUserInfo: true,
  secondsToRefreshAccessTokenBeforeExp: 3000, // Wait ten minutes before refreshing
  scope: 'openid offline_access',
  silent_redirect_uri: 'FILL_IN', // eg. https://localhost:3000/silent-renew
}

export default function App() {
  ;<AuthProvider config={authProviderConfig}>
    {/* The rest of your application */}
  </AuthProvider>
}
```

### Create routes for `/callback` and `/silent-renew`

In order for Connect Go to correctly authenticate users with your application,
we'll need a route to go to after login which will automatically make your application see them as logged in.
Additionally, we'll want to create a route for silently authenticating the user behind the scenes to prevent their tokens to go expired.

This can be done however you want, but we'll demonstrate how to do it using React Router.

```js
<AuthProvider config={authProviderConfig}>
  <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route path="callback" element={<AuthCallback />} />
        <Route path="silent-renew" element={<SilentRenew />} />
      </Route>
    </Routes>
  </BrowserRouter>
</AuthProvider>
```

```js
// <AuthCallback />

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'connect-go-oidc-react'

export default function AuthCallback() {
  const { auth } = useAuth()
  const navigate = useNavigate()

  async function handleCallback() {
    await auth.loginCallback()
    navigate('/')
  }

  useEffect(() => {
    handleCallback()
  }, [])

  return null
}
```

```js
// <SilentRenew />

import { useEffect } from "react";
import { OIDCClient } from "connect-go-oidc-react";

export default function SilentRenew() {
  useEffect(() => {
    const oidcClient = new OIDCClient({
      issuer: import.meta.env.VITE_OIDC_ISSUER as string,
      client_id: import.meta.env.VITE_CLIENT_ID as string,
    });

    oidcClient.loginCallback();
  }, []);

  return null;
}
```

These two views are all you need to get authentication set up inside of your application.

### Access authentication information

Anywhere inside of a component within your application you can use the `useAuth` hook provided by the library to gain access to authentication information.

```js
const { auth, isLoggedIn, user, tokens, checkingLogin } = useAuth()
```

#### `auth`

Here, you can access utility functions like `.login()` and `.logout()` to intiate the login and logout functions, respectively.

#### `isLoggedIn`

A quick boolean to determine if a user is logged in or not.

#### `user`

Provides user information from the connect go api, containing useful information like the user's ID or email.

#### `tokens`

Access to the user's tokens.

#### `checkingLogin`

Logging in is an asynchronous process and it can be useful to know if it is in the process of doing so. This is how you would do that.
