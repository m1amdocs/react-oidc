import { IPlusAuthClientOptions as OIDCClientOptions } from "@plusauth/plusauth-oidc-client-js/types/interfaces";

export type { OIDCClientOptions };

export type TokensAtomT = {
  accessToken: string;
  expiresIn: number;
  idToken: object;
  idTokenRaw: string;
  tokenType: string;
  refreshToken: string;
};
