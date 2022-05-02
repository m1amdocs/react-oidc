import { OIDCClient } from '@plusauth/plusauth-oidc-client-js'
import { Atom, Provider as JotaiProvider, useAtom } from 'jotai'
import React, { useEffect, useMemo, useState } from 'react'
import {
  authAtom, tokensAtom, userAtom, privateScope,
} from '../atoms'
import { OIDCClientOptions } from '../interfaces'

export type AuthProviderProps = {
  config: OIDCClientOptions
  children: React.ReactNode
}

export type ProviderProps = {
  oidcClient: OIDCClient
  children: React.ReactNode
}

function Provider({ oidcClient, children }: ProviderProps) {
  const [, setUser] = useAtom(userAtom, privateScope)
  const [, setTokens] = useAtom(tokensAtom, privateScope)
  const [initialized, setInitialized] = useState(false)

  oidcClient.once('user_login', (res) => {
    setUser(res.user)
    setTokens({
      accessToken: res.access_token,
      expiresIn: res.expires_in,
      idToken: res.id_token,
      idTokenRaw: res.id_token_raw,
      tokenType: res.token_type,
      refreshToken: res.refresh_token,
    })
  })

  oidcClient.on('user_logout', () => {
    setUser(null)
    setTokens(null)
  })

  async function initialize() {
    if (!initialized) {
      await oidcClient.initialize(false)
      await oidcClient.isLoggedIn(true)
      setInitialized(true)
    }
    await oidcClient?.getUser()
  }

  useEffect(() => {
    initialize()
  }, [oidcClient])

  if (initialized) {
    return <>{children}</>
  }
  return null
}

export function AuthProvider({ config, children }: AuthProviderProps) {
  const oidcClient = useMemo(() => new OIDCClient(config), [config])
  const initialValues = [
    [authAtom, oidcClient],
    [userAtom, oidcClient.user],
  ] as Iterable<readonly [Atom<unknown>, unknown]>

  return (
    <JotaiProvider initialValues={initialValues} scope={privateScope}>
      <Provider oidcClient={oidcClient}>{children}</Provider>
    </JotaiProvider>
  )
}
