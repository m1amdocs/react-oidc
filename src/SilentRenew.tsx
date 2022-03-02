import { useEffect } from "react";
import { OIDCClient } from "./oidc";

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
