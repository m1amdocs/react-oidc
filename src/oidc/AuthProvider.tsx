import { OIDCClient } from "@plusauth/plusauth-oidc-client-js";
import { IPlusAuthClientOptions } from "@plusauth/plusauth-oidc-client-js/types/interfaces";
import { Provider as JotaiProvider, useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "./hooks";
import { authAtom, tokensAtom, userAtom } from "./atoms";
import privateScope from "./scope";

type AuthProviderProps = {
  config: IPlusAuthClientOptions;
  children: React.ReactNode;
};

type ProviderProps = { oidcClient: OIDCClient; children: React.ReactNode };

function Provider({ oidcClient, children }: ProviderProps) {
  const [user, setUser] = useAtom(userAtom, privateScope);
  const [_tokens, setTokens] = useAtom(tokensAtom, privateScope);
  const [initialized, setInitialized] = useState(oidcClient["initialized"]);

  oidcClient.once("user_login", (res) => {
    setUser(res["user"]);
    setTokens({
      accessToken: res["access_token"],
      expiresIn: res["expires_in"],
      idToken: res["id_token"],
      idTokenRaw: res["id_token_raw"],
      tokenType: res["token_type"],
      refreshToken: res["refresh_token"],
    });
  });

  oidcClient.on("user_logout", () => {
    setUser(null);
    setTokens(null);
  });

  async function initialize() {
    if (!initialized) {
      await oidcClient.initialize(false);
      await oidcClient.isLoggedIn(true);
    }
    await oidcClient?.getUser();
    setInitialized(true);
  }

  useEffect(() => {
    initialize();
  }, [oidcClient]);

  if (initialized) {
    return <>{children}</>;
  } else {
    return null;
  }
}

export function AuthProvider({ config, children }: AuthProviderProps) {
  const oidcClient = useMemo(() => new OIDCClient(config), [config]);

  return (
    <JotaiProvider
      initialValues={[
        [authAtom, oidcClient],
        [userAtom, oidcClient.user],
      ]}
      scope={privateScope}
    >
      <Provider oidcClient={oidcClient}>{children}</Provider>
    </JotaiProvider>
  );
}
