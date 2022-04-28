import { OIDCClient } from "@plusauth/plusauth-oidc-client-js";
import { atom } from "jotai";
import { TokensAtomT } from "./interfaces";

export const authAtom = atom<OIDCClient>(null as unknown as OIDCClient);
export const userAtom = atom<any>(null);
export const tokensAtom = atom<TokensAtomT | null>(null);
