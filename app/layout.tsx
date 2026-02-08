import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Auth0Provider } from '@auth0/nextjs-auth0/client'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'WalletLiquid — Paper Trade Crypto Derivatives',
  description: 'Learn and practice trading crypto futures and options with zero risk. Interactive courses, real-time prices, full simulation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#0A0A0F] text-gray-100 antialiased">
        <Auth0Provider>
          {children}
        </Auth0Provider>
      </body>
    </html>
  )
}
