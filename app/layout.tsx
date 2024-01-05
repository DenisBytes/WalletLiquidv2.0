import { fontSyncopate } from "./ui/Fonts"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./ui/global.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className= {`${fontSyncopate.className} antialiased bg-[] `}>
        <main className="lg:block">
          {children}
        </main>
        <SpeedInsights />
      </body>
    </html>
  )
}
