import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, OIDCClientOptions } from "./oidc";
import AuthCallback from "./AuthCallback";
import HomeView from "./HomeView";
import SilentRenew from "./SilentRenew";

const config: OIDCClientOptions = {
  issuer: import.meta.env.VITE_OIDC_ISSUER as string,
  client_id: import.meta.env.VITE_CLIENT_ID as string,
  redirect_uri: "https://localhost:3000/callback",
  post_logout_redirect_uri: "https://localhost:3000",
  autoSilentRenew: true,
  checkSession: false,
  requestUserInfo: true,
  secondsToRefreshAccessTokenBeforeExp: 3000, // Wait ten minutes before refreshing
  scope: "openid offline_access",
  silent_redirect_uri: "https://localhost:3000/silent-renew",
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider config={config}>
        <Routes>
          <Route path="/">
            <Route index element={<HomeView />} />
            <Route path="callback" element={<AuthCallback />} />
            <Route path="silent-renew" element={<SilentRenew />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
