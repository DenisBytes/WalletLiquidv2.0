import { fontSyncopate } from "./ui/Fonts"
import './ui/global.css'

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
      </body>
    </html>
  )
}
