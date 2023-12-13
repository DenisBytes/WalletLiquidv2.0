import { fontSyncopate } from "./ui/Fonts"
import './ui/global.css'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className= {`${fontSyncopate.className} antialiased `}>
        <main className="hidden md:block">
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  )
}
