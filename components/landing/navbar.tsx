'use client'

import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src="/logo.svg" alt="WalletLiquid" className="w-7 h-7" />
          <span className="font-semibold text-text-primary text-[15px] tracking-tight">
            WalletLiquid
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/auth/login"
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-lg text-sm font-medium bg-accent text-accent-fg hover:bg-accent-hover transition-colors"
          >
            Start Trading
          </a>
        </div>
      </div>
    </nav>
  )
}
