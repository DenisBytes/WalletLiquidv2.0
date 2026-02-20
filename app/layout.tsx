import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google'
import { Auth0Provider } from '@auth0/nextjs-auth0/client'
import { ThemeProvider } from '@/components/ui/theme-provider'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  style: ['normal', 'italic'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'WalletLiquid — Paper Trade Crypto Derivatives',
  description: 'Learn and practice trading crypto futures and options with zero risk. Interactive courses, real-time prices, full simulation.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-surface text-text-primary antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Auth0Provider>
            {children}
          </Auth0Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
