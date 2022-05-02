import React from 'react'
import { mount } from 'enzyme'
import { AuthProvider } from './AuthProvider'
import { OIDCClientOptions } from '../interfaces'

const config: OIDCClientOptions = {
  issuer: 'https://nxt-ulm-stg.m1amdocs.io/oidc',
  client_id: 'testPublicId',
  redirect_uri: 'https://localhost:3000/callback',
  post_logout_redirect_uri: 'https://localhost:3000',
  autoSilentRenew: true,
  checkSession: false,
  requestUserInfo: true,
  secondsToRefreshAccessTokenBeforeExp: 3000, // Wait ten minutes before refreshing
  scope: 'openid offline_access',
  silent_redirect_uri: 'https://localhost:3000/silent-renew',
}

describe('AuthProvider', () => {
  it('renders', () => {
    const wrapper = mount(<AuthProvider config={config}>hi</AuthProvider>)
    expect(wrapper).toBeDefined()
  })
})
