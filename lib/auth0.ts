import { Auth0Client } from '@auth0/nextjs-auth0/server'
import { NextResponse } from 'next/server'

export const auth0 = new Auth0Client({
  authorizationParameters: {
    redirect_uri: `${process.env.APP_BASE_URL}/auth/callback`,
  },
  appBaseUrl: process.env.APP_BASE_URL,
  routes: {
    callback: '/auth/callback',
    login: '/auth/login',
    logout: '/auth/logout',
  },
  async onCallback() {
    return NextResponse.redirect(new URL('/dashboard', process.env.APP_BASE_URL))
  },
})
