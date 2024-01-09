import { fontSyncopate } from "./ui/Fonts"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./ui/global.css"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wallet Liquid',
  description: "Welcome to Wallet Liquid, your gateway to mastering crypto derivatives trading! Elevate your expertise in futures and options through comprehensive courses and a cutting-edge paper trading platform. Learn, practice, and refine your strategies in a risk-free environment, empowering yourself with the skills needed to navigate the dynamic world of cryptocurrency derivatives. Get started today and embark on a journey of education, simulation, and skill enhancement in crypto derivatives trading at Wallet Liquid.",
  metadataBase: new URL('https://wallet-liquidv2-0.vercel.app'),
};

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
