import { OIDCClient } from '@plusauth/plusauth-oidc-client-js';
import { atom } from 'jotai';
import { TokensAtomT } from '../interfaces';

export const authAtom = atom<OIDCClient | null>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const userAtom = atom<any>(null);
export const tokensAtom = atom<TokensAtomT | null>(null);
export const privateScope = Symbol('auth');
