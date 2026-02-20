import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    AUTH0_DOMAIN: !!process.env.AUTH0_DOMAIN,
    AUTH0_CLIENT_ID: !!process.env.AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET: !!process.env.AUTH0_CLIENT_SECRET,
    AUTH0_SECRET: !!process.env.AUTH0_SECRET,
    APP_BASE_URL: process.env.APP_BASE_URL ?? null,
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL ?? null,
  })
}
